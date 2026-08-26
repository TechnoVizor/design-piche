import * as THREE from "three";
import type { Site, Unit } from "@/lib/piche-data";
import {
  box,
  buildBuilding,
  createMaterials,
  footprint,
  FH,
  ROW_FH,
  type Materials,
} from "@/lib/piche-buildings";
import {
  cellTone,
  isDimmed,
  windowLit,
  type Cell,
  type Selection,
} from "@/lib/unit-highlight";

export type { Selection };
export type PickData = Cell;

export type SceneCallbacks = {
  onPick(d: PickData): void;
  /** Fired when the pointer lands on bare ground, so the UI can bring the
   *  buildings it had cleared away back. */
  onClear(): void;
  /** Fired when a drag starts, so the UI can switch the rotate button off. */
  onDragStart(): void;
  /** Fired when the wheel was left alone so the page could scroll. */
  onScrollHint(): void;
};

export type SceneHandle = {
  setSite(site: Site, units: Unit[]): void;
  setSelection(sel: Selection): void;
  /** Fades every building but the selected one away, and frames what is left. */
  setIsolated(on: boolean): void;
  setSpin(on: boolean): void;
  /** Pauses the render loop while the viewer is hidden behind the map. */
  setActive(on: boolean): void;
  zoomBy(delta: number): void;
  resetView(): void;
  dispose(): void;
};

const BG = 0xe8e6de;
/** Resting orbit angle. Slightly aerial, like the reference renders. */
const HOME_THETA = -0.55;
const HOME_ELEV = 0.4;
/** How much of a cleared-away building is left behind. 0 is out of the way. */
const GHOST_OPACITY = 0;

const hexCache = new Map<string, number>();
function hexNum(hex: string) {
  let n = hexCache.get(hex);
  if (n === undefined) {
    n = parseInt(hex.slice(1), 16);
    hexCache.set(hex, n);
  }
  return n;
}

/** A material a building can fade, remembered as it was at full strength. */
type FadeTarget = {
  mat: THREE.Material;
  opacity: number;
  transparent: boolean;
  depthWrite: boolean;
};

/**
 * Hands one building private copies of every material it shares with the rest
 * of the site, so it can be faded out on its own. Click targets are left
 * alone: their opacity belongs to the selection overlay, not to the fade.
 */
function collectFadeTargets(
  group: THREE.Group,
  skip: Set<THREE.Object3D>,
  shared: Set<THREE.Material>,
): FadeTarget[] {
  const owned = new Map<THREE.Material, THREE.Material>();
  const targets: FadeTarget[] = [];

  const own = (mat: THREE.Material) => {
    const found = owned.get(mat);
    if (found) return found;
    // Anything already unique to this building — window panes, the stairwell
    // stripe — can be driven directly.
    const copy = shared.has(mat) ? mat.clone() : mat;
    owned.set(mat, copy);
    targets.push({
      mat: copy,
      opacity: copy.opacity,
      transparent: copy.transparent,
      depthWrite: copy.depthWrite,
    });
    return copy;
  };

  group.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh || skip.has(m)) return;
    m.material = Array.isArray(m.material) ? m.material.map(own) : own(m.material);
  });
  return targets;
}

/** One building as the viewer handles it: fadeable, focusable, clickable. */
type BuildingView = {
  id: string;
  group: THREE.Group;
  picks: THREE.Mesh[];
  fades: FadeTarget[];
  /** Where the camera looks when this building has the site to itself. */
  focus: THREE.Vector3;
  /** Framing radius for that same solo view. */
  focusRadius: number;
  /** 0 at full strength, 1 once faded out of the way. */
  ghost: number;
  target: number;
};

function fovFor(w: number, h: number) {
  const aspect = (w || 900) / (h || 620);
  return aspect < 0.9 ? 50 : aspect < 1.3 ? 42 : 34;
}

/** Camera distance that frames a scene of the given radius. */
function fitDist(w: number, h: number, radius: number) {
  const vfov = (fovFor(w, h) * Math.PI) / 180;
  const aspect = (w || 900) / (h || 620);
  const half = Math.min(vfov / 2, Math.atan(Math.tan(vfov / 2) * aspect));
  // A little more than the bare radius so no wing is ever clipped at the edge.
  return Math.max(30, Math.min(240, (radius * 1.22) / Math.tan(half)));
}

/** Small deterministic PRNG so a site looks identical on every render. */
function makeRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

function seedOf(id: string) {
  let h = 19;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 2147483647;
  return h;
}

export function createScene(host: HTMLElement, cb: SceneCallbacks): SceneHandle {
  const w0 = host.clientWidth || 900;
  const h0 = host.clientHeight || 620;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BG);
  scene.fog = new THREE.Fog(BG, 170, 420);

  const camera = new THREE.PerspectiveCamera(fovFor(w0, h0), w0 / h0, 0.5, 700);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setSize(w0, h0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  const el = renderer.domElement;
  el.style.display = "block";
  el.style.touchAction = "pan-y";
  host.appendChild(el);

  scene.add(new THREE.HemisphereLight(0xbfd4ea, 0x9c9686, 0.5));
  const sun = new THREE.DirectionalLight(0xfff1da, 1.25);
  sun.position.set(34, 46, 26);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.03;
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xc4d4e8, 0.2);
  fill.position.set(-28, 18, -24);
  scene.add(fill);

  const M: Materials = createMaterials();
  const sharedMaterials = new Set<THREE.Material>();
  const collect = (v: unknown) => {
    if (v instanceof THREE.Material) sharedMaterials.add(v);
    else if (v && typeof v === "object") Object.values(v).forEach(collect);
  };
  collect(M);

  let siteGroup: THREE.Group | null = null;
  let picks: THREE.Mesh[] = [];
  let windows: THREE.Mesh[] = [];
  let views: BuildingView[] = [];
  let unitByKey = new Map<string, Unit>();
  let radius = 34;
  let lookAtY = 8.5;

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const d0 = fitDist(w0, h0, radius);
  const orb = {
    theta: HOME_THETA,
    elev: HOME_ELEV,
    dist: d0,
    tTheta: HOME_THETA,
    tElev: HOME_ELEV,
    tDist: d0,
  };
  /** Where the orbit is centred, and where it is heading. */
  const siteFocus = new THREE.Vector3(0, lookAtY, 0);
  const lookAt = siteFocus.clone();
  const lookTarget = siteFocus.clone();

  /** Which way each click target faces, so the far facade stays unclickable. */
  const facings = new WeakMap<THREE.Mesh, THREE.Vector3>();
  const UP = new THREE.Vector3(0, 1, 0);

  let hover: THREE.Mesh | null = null;
  let userZoomed = false;
  let spin = true;
  let isolated = false;
  let selection: Selection = { building: "", floor: 1, unit: null };

  /** A hairline around the chosen apartment, so it stays findable. */
  const outlineMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.92,
    // Nudged towards the camera in depth only, so it never fights the balcony
    // rail sitting a few centimetres behind it.
    polygonOffset: true,
    polygonOffsetFactor: -3,
    polygonOffsetUnits: -3,
  });
  let outline: THREE.LineSegments | null = null;

  /* ---------------------------------------------------------------- *
   * Site construction
   * ---------------------------------------------------------------- */

  function disposeSite() {
    if (!siteGroup) return;
    drawOutline(null);
    siteGroup.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      m.geometry?.dispose();
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      mats.forEach((mat) => {
        if (mat && !sharedMaterials.has(mat)) mat.dispose();
      });
    });
    scene.remove(siteGroup);
    siteGroup = null;
    picks = [];
    windows = [];
    views = [];
    hover = null;
  }

  function addTerrain(g: THREE.Group, site: Site, rnd: () => number) {
    const slab = (sx: number, sz: number, mat: THREE.Material, x: number, z: number, y = 0.02) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(sx, sz), mat);
      m.rotation.x = -Math.PI / 2;
      m.position.set(x, y, z);
      m.receiveShadow = true;
      g.add(m);
    };

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), M.lawn);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    g.add(ground);

    const pine = (x: number, z: number, sc: number) => {
      const t = new THREE.Group();
      t.add(box(0.3 * sc, 1.6 * sc, 0.3 * sc, M.trunk, 0, 0.8 * sc, 0));
      for (let i = 0; i < 3; i++) {
        const r = (1.9 - i * 0.5) * sc;
        const hh = (3.0 - i * 0.4) * sc;
        const c = new THREE.Mesh(new THREE.ConeGeometry(r, hh, 12), M.foliage);
        c.position.y = (1.6 + i * 1.9) * sc + hh / 2 - 0.6 * sc;
        c.castShadow = true;
        c.receiveShadow = true;
        t.add(c);
      }
      t.position.set(x, 0, z);
      t.rotation.y = rnd() * 3;
      g.add(t);
    };

    const broadleaf = (x: number, z: number, sc: number) => {
      const t = new THREE.Group();
      t.add(box(0.4 * sc, 2.4 * sc, 0.4 * sc, M.trunk, 0, 1.2 * sc, 0));
      const c = new THREE.Mesh(new THREE.SphereGeometry(1.9 * sc, 12, 10), M.foliageLight);
      c.position.y = 3.9 * sc;
      c.scale.y = 0.85;
      c.castShadow = true;
      t.add(c);
      t.position.set(x, 0, z);
      g.add(t);
    };

    const car = (x: number, z: number, rot: number, dark: boolean) => {
      const c = new THREE.Group();
      c.add(box(4.4, 0.85, 1.9, dark ? M.carDark : M.car, 0, 0.62, 0));
      c.add(box(2.5, 0.7, 1.75, M.glass, -0.2, 1.32, 0));
      [
        [-1.5, 0.95],
        [1.5, 0.95],
        [-1.5, -0.95],
        [1.5, -0.95],
      ].forEach((p) => {
        const wm = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.26, 14), M.dark);
        wm.rotation.x = Math.PI / 2;
        wm.position.set(p[0], 0.36, p[1]);
        wm.castShadow = true;
        c.add(wm);
      });
      c.position.set(x, 0, z);
      c.rotation.y = rot;
      g.add(c);
    };

    const roadZ = radius + 10;
    slab(radius * 4.5, 12, M.asphalt, 0, roadZ);
    slab(radius * 4.5, 1.4, M.paving, 0, roadZ - 6.4);
    slab(radius * 1.5, radius * 0.9, M.paving, 0, radius * 0.34);

    const clearOf = (x: number, z: number) =>
      !site.buildings.some((b) => {
        const f = footprint(b);
        return Math.abs(x - b.x) < f.extentX + 6 && Math.abs(z - b.z) < f.extentZ + 6;
      });

    if (site.terrain === "forest") {
      for (let i = 0; i < 80; i++) {
        const x = -radius * 2.1 + rnd() * radius * 4.2;
        const z = -radius * 1.8 + rnd() * radius * 2.4;
        if (!clearOf(x, z) || (z > -radius * 0.5 && Math.abs(x) < radius)) continue;
        pine(x, z, 0.85 + rnd() * 0.7);
      }
      for (let i = 0; i < 14; i++) pine(-radius * 1.9 + i * radius * 0.29, roadZ + 8 + rnd() * 7, 0.8 + rnd() * 0.5);
      for (let i = 0; i < 6; i++) pine(-radius * 0.8 + i * radius * 0.32, radius * 0.5, 0.75);
      car(-radius * 1.15, roadZ - 10, 0, false);
      car(-radius * 0.95, roadZ - 10, 0, true);
      car(-radius * 0.75, roadZ - 6, Math.PI, false);
    } else if (site.terrain === "urban") {
      slab(radius * 4.5, 12, M.asphalt, 0, -roadZ);
      for (let i = 0; i < 26; i++) {
        const x = -radius * 2.0 + rnd() * radius * 4.0;
        const z = -radius * 1.6 + rnd() * radius * 3.2;
        if (!clearOf(x, z)) continue;
        broadleaf(x, z, 0.8 + rnd() * 0.5);
      }
      // Muted neighbouring blocks so the site reads as part of a city. They
      // sit on the ground, not floating above or sunk into it.
      for (let i = 0; i < 7; i++) {
        const bx = -radius * 2.4 + i * radius * 0.8;
        const bh = 9 + rnd() * 9;
        g.add(box(16 + rnd() * 8, bh, 13, M.roof, bx, bh / 2, -roadZ - 20 - rnd() * 8));
      }
      for (let i = 0; i < 5; i++) car(-radius * 1.3 + i * 7, roadZ - 4, 0, i % 2 === 0);
    } else {
      const water = new THREE.Mesh(new THREE.PlaneGeometry(420, 420), M.water);
      water.rotation.x = -Math.PI / 2;
      water.position.set(radius * 2.6, 0.015, 0);
      g.add(water);
      slab(24, 300, M.sand, radius * 1.55, 0, 0.03);
      for (let i = 0; i < 30; i++) {
        const x = -radius * 2.0 + rnd() * radius * 3.0;
        const z = -radius * 1.7 + rnd() * radius * 3.4;
        if (!clearOf(x, z)) continue;
        (rnd() > 0.5 ? broadleaf : pine)(x, z, 0.8 + rnd() * 0.6);
      }
      // jetty out over the water
      for (let i = 0; i < 8; i++) {
        g.add(box(2.6, 0.2, 2.4, M.deck, radius * 1.8 + i * 2.5, 0.5, 4));
        g.add(box(0.3, 1.0, 0.3, M.trunk, radius * 1.8 + i * 2.5, 0.1, 4));
      }
      for (let i = 0; i < 3; i++) car(-radius * 1.2 + i * 7, roadZ - 4, 0, i % 2 === 1);
    }

    // A playground in the courtyard, as in the Krūmiņsala reference.
    if (site.terrain !== "waterside") {
      const px = radius * 0.55;
      const pz = radius * 0.4;
      slab(11, 8, M.sand, px, pz, 0.04);
      g.add(box(0.35, 2.4, 0.35, M.play, px - 2.4, 1.2, pz));
      g.add(box(0.35, 2.4, 0.35, M.play, px + 2.4, 1.2, pz));
      g.add(box(5.4, 0.3, 0.3, M.play, px, 2.4, pz));
      g.add(box(1.6, 0.2, 1.2, M.dark, px, 0.9, pz + 1.6));
      for (let i = 0; i < 3; i++) g.add(box(2.2, 0.4, 0.7, M.deck, px - 5.5, 0.5, pz - 2 + i * 2));
    }
  }

  function setSite(site: Site, units: Unit[]) {
    disposeSite();

    unitByKey = new Map(units.map((u) => [`${u.building}-${u.floor}-${u.bay}`, u]));
    radius = Math.max(
      26,
      ...site.buildings.map((b) => {
        const f = footprint(b);
        return Math.hypot(Math.abs(b.x) + f.extentX, Math.abs(b.z) + f.extentZ);
      }),
    );
    const tallest = Math.max(...site.buildings.map((b) => b.floors * 3));
    // Aim above the ground plane even for the low terraces, or the horizon
    // rides up the frame and half the view is empty grass.
    lookAtY = Math.max(6, tallest * 0.55);

    const g = new THREE.Group();
    addTerrain(g, site, makeRandom(seedOf(site.id)));

    for (const b of site.buildings) {
      const parts = buildBuilding(b, M);
      g.add(parts.group);
      picks.push(...parts.picks);
      windows.push(...parts.windows);

      // A block carries a target per apartment on both long facades. The one
      // round the back is hidden behind its own building, so record which way
      // each faces and let the raycast ignore whatever points away.
      const out = new THREE.Vector3(0, 0, 1).applyAxisAngle(UP, b.rot);
      for (const p of parts.picks) {
        facings.set(p, out.clone().multiplyScalar(p.position.z < 0 ? -1 : 1));
      }

      const fp = footprint(b);
      const height = b.kind === "row" ? 0.35 + ROW_FH * 2 : 0.5 + FH * b.floors;
      views.push({
        id: b.id,
        group: parts.group,
        picks: parts.picks,
        fades: collectFadeTargets(parts.group, new Set(parts.picks), sharedMaterials),
        focus: new THREE.Vector3(b.x, height * 0.5, b.z),
        // Enough to hold the whole block, tall or wide, without cropping it.
        focusRadius: Math.max(12, Math.hypot(fp.extentX, fp.extentZ), height * 0.9),
        ghost: 0,
        target: 0,
      });
    }

    scene.add(g);
    siteGroup = g;

    const span = radius * 1.5;
    sun.shadow.camera.left = -span;
    sun.shadow.camera.right = span;
    sun.shadow.camera.top = span;
    sun.shadow.camera.bottom = -span;
    sun.shadow.camera.far = span * 4;
    sun.shadow.camera.updateProjectionMatrix();
    sun.position.set(radius, radius * 1.4, radius * 0.8);

    isolated = false;
    userZoomed = false;
    orb.tTheta = HOME_THETA;
    orb.tElev = HOME_ELEV;
    siteFocus.set(0, lookAtY, 0);
    lookAt.copy(siteFocus);
    lookTarget.copy(siteFocus);
    applyIsolation();
    orb.dist = orb.tDist;
    paint();
  }

  /* ---------------------------------------------------------------- *
   * Painting selection state
   * ---------------------------------------------------------------- */

  /** The apartment under the cursor, if the pointer is on a live building. */
  const hoverCell = () => (hover ? (hover.userData as Cell) : null);

  function drawOutline(pick: THREE.Mesh | null) {
    if (outline) {
      outline.removeFromParent();
      outline.geometry.dispose();
      outline = null;
    }
    if (!pick) return;
    // Parented to the click target, so it inherits the building's placement
    // and rotation for free.
    outline = new THREE.LineSegments(new THREE.EdgesGeometry(pick.geometry), outlineMat);
    outline.renderOrder = 3;
    pick.add(outline);
  }

  function paint() {
    const ctx = { selection, hover: hoverCell() };
    let chosen: THREE.Mesh | null = null;

    for (const m of picks) {
      const cell = m.userData as Cell;
      const u = unitByKey.get(`${cell.building}-${cell.floor}-${cell.bay}`) ?? null;
      const tone = cellTone(cell, u, ctx);
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.color.setHex(hexNum(tone.hex));
      mat.opacity = tone.opacity;
      if (u && u.id === selection.unit) chosen = m;
    }

    if ((outline ? outline.parent : null) !== chosen) drawOutline(chosen);

    windows.forEach((m) => {
      const lit = windowLit(m.userData as Cell, ctx);
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.color.setHex(lit ? 0x4a5a68 : 0x2c3945);
      mat.emissive.setHex(lit ? 0x2a3a52 : 0x000000);
    });
  }

  /* ---------------------------------------------------------------- *
   * Clearing the other buildings out of the way
   * ---------------------------------------------------------------- */

  /** Aims the orbit at whatever is left standing. */
  function applyFraming() {
    const solo =
      isolated && views.length > 1
        ? (views.find((v) => v.id === selection.building) ?? null)
        : null;
    lookTarget.copy(solo ? solo.focus : siteFocus);
    if (!userZoomed) {
      orb.tDist = fitDist(host.clientWidth, host.clientHeight, solo ? solo.focusRadius : radius);
    }
  }

  function applyIsolation() {
    views.forEach((v) => {
      v.target = isDimmed(v.id, isolated, selection) ? 1 : 0;
    });
    // A building on its way out must not keep the cursor it was carrying.
    const held = hoverCell();
    if (held && views.some((v) => v.id === held.building && v.target > 0.5)) {
      hover = null;
      el.style.cursor = "grab";
    }
    applyFraming();
  }

  /** Click targets on buildings that have not been cleared away. */
  const liveTargets = () => views.flatMap((v) => (v.target > 0.5 ? [] : v.picks));

  /** Eases each building towards its target strength, once per frame. */
  function stepFades() {
    for (const v of views) {
      if (v.ghost === v.target) continue;
      v.ghost += (v.target - v.ghost) * 0.14;
      if (Math.abs(v.target - v.ghost) < 0.005) v.ghost = v.target;

      const k = 1 - v.ghost * (1 - GHOST_OPACITY);
      for (const f of v.fades) {
        const blend = f.transparent || k < 0.999;
        // Switching blending on and off recompiles the program, so only touch
        // it on the two frames where it actually flips.
        if (f.mat.transparent !== blend) {
          f.mat.transparent = blend;
          f.mat.needsUpdate = true;
        }
        f.mat.opacity = f.opacity * k;
        // A half-faded wall must not go on hiding what stands behind it.
        f.mat.depthWrite = f.depthWrite && k > 0.98;
      }
      v.group.visible = k > 0.004;
    }
  }

  /* ---------------------------------------------------------------- *
   * Input
   * ---------------------------------------------------------------- */

  /**
   * What the pointer is over: the nearest apartment on a facade turned towards
   * the camera, plus whether it grazed a building at all — clicking clean
   * through the site is how the whole site is asked for back.
   */
  const castPick = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    // Only what is still standing: a raycast does not skip hidden meshes.
    const hits = raycaster.intersectObjects(liveTargets(), false);
    const dir = raycaster.ray.direction;
    const front = hits.find((h) => {
      const facing = facings.get(h.object as THREE.Mesh);
      return facing === undefined || facing.dot(dir) < 0;
    });
    return { mesh: front ? (front.object as THREE.Mesh) : null, grazed: hits.length > 0 };
  };

  let down: { x: number; y: number; moved: boolean } | null = null;

  const onPointerDown = (e: PointerEvent) => {
    down = { x: e.clientX, y: e.clientY, moved: false };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!down) {
      const next = castPick(e).mesh;
      if (next !== hover) {
        hover = next;
        el.style.cursor = next ? "pointer" : "grab";
        paint();
      }
      return;
    }
    const dx = e.clientX - down.x;
    const dy = e.clientY - down.y;
    if (Math.abs(dx) + Math.abs(dy) > 4 && !down.moved) {
      down.moved = true;
      cb.onDragStart();
    }
    orb.tTheta -= dx * 0.006;
    orb.tElev = Math.max(0.1, Math.min(0.92, orb.tElev + dy * 0.004));
    down.x = e.clientX;
    down.y = e.clientY;
  };

  const onPointerUp = (e: PointerEvent) => {
    el.style.cursor = "grab";
    if (down && !down.moved) {
      const { mesh, grazed } = castPick(e);
      if (mesh) cb.onPick(mesh.userData as PickData);
      // Bare ground is how you ask for the whole site back. A click that only
      // brushed the far side of a block is a miss, not a request.
      else if (!grazed) cb.onClear();
    }
    down = null;
  };

  const onPointerCancel = () => {
    down = null;
    el.style.cursor = "grab";
  };

  // Plain wheel is left to the page so scrolling never gets trapped; zooming
  // needs ctrl/⌘ (which is also what a trackpad pinch sends) or the buttons.
  const onWheel = (e: WheelEvent) => {
    if (!(e.ctrlKey || e.metaKey)) {
      cb.onScrollHint();
      return;
    }
    e.preventDefault();
    userZoomed = true;
    orb.tDist = Math.max(radius * 0.5, Math.min(radius * 4, orb.tDist + e.deltaY * 0.35));
  };

  el.addEventListener("pointerdown", onPointerDown);
  el.addEventListener("pointermove", onPointerMove);
  el.addEventListener("pointerup", onPointerUp);
  el.addEventListener("pointercancel", onPointerCancel);
  el.addEventListener("wheel", onWheel, { passive: false });

  const ro = new ResizeObserver(() => {
    const cw = host.clientWidth;
    const ch = host.clientHeight;
    if (!cw || !ch) return;
    camera.aspect = cw / ch;
    camera.fov = fovFor(cw, ch);
    camera.updateProjectionMatrix();
    renderer.setSize(cw, ch);
    applyFraming();
  });
  ro.observe(host);

  let raf = 0;
  let active = true;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!active) return;
    if (spin) orb.tTheta += 0.0011;
    orb.theta += (orb.tTheta - orb.theta) * 0.1;
    orb.elev += (orb.tElev - orb.elev) * 0.1;
    orb.dist += (orb.tDist - orb.dist) * 0.08;
    lookAt.lerp(lookTarget, 0.08);
    stepFades();
    const cy = Math.cos(orb.elev);
    const sy = Math.sin(orb.elev);
    camera.position.set(
      lookAt.x + orb.dist * cy * Math.sin(orb.theta),
      4 + orb.dist * sy,
      lookAt.z + orb.dist * cy * Math.cos(orb.theta),
    );
    camera.lookAt(lookAt);
    renderer.render(scene, camera);
  };
  tick();

  return {
    setSite,
    setSelection(sel) {
      selection = sel;
      applyIsolation();
      paint();
    },
    setIsolated(on) {
      isolated = on;
      applyIsolation();
      paint();
    },
    setSpin(on) {
      spin = on;
    },
    setActive(on) {
      active = on;
    },
    zoomBy(delta) {
      userZoomed = true;
      orb.tDist = Math.max(radius * 0.5, Math.min(radius * 4, orb.tDist + delta * radius * 0.25));
    },
    resetView() {
      userZoomed = false;
      orb.tTheta = HOME_THETA;
      orb.tElev = HOME_ELEV;
      applyFraming();
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerCancel);
      el.removeEventListener("wheel", onWheel);
      disposeSite();
      outlineMat.dispose();
      sharedMaterials.forEach((m) => m.dispose());
      renderer.dispose();
      if (el.parentNode === host) host.removeChild(el);
    },
  };
}
