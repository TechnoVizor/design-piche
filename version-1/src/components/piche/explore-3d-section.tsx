"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BUILDINGS, buildUnits, formatMoney, type Unit } from "@/lib/piche-data";
import { PicheButton } from "@/components/piche/piche-button";
import { PinOverlayPill } from "@/components/piche/pin-overlay-pill";
import { FilterChip } from "@/components/piche/filter-chip";

const UNITS = buildUnits();

type Selection = { building: string; floor: number; unit: string | null };

function unitAt(building: string, floor: number, u: number): Unit | undefined {
  return UNITS.find(
    (x) => x.building === building && x.floor === floor && x.id.endsWith(`-${u}`),
  );
}

function statusHex(status: Unit["status"]) {
  return status === "available" ? 0x1f7a4d : status === "reserved" ? 0x7e238b : 0x91918c;
}

function fovFor(w: number, h: number) {
  const aspect = (w || 900) / (h || 620);
  return aspect < 0.9 ? 50 : aspect < 1.3 ? 42 : 34;
}

function fitDist(w: number, h: number) {
  const vfov = (fovFor(w, h) * Math.PI) / 180;
  const aspect = (w || 900) / (h || 620);
  const half = Math.min(vfov / 2, Math.atan(Math.tan(vfov / 2) * aspect));
  return Math.max(34, Math.min(160, 31 / Math.tan(half)));
}

type SceneApi = {
  paint: (sel: Selection) => void;
  resetView: () => void;
};

const INITIAL_SELECTION: Selection = { building: "B", floor: 3, unit: "B-3-1" };

export function Explore3DSection() {
  const hostRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<SceneApi | null>(null);
  const spinRef = useRef(true);
  const selectionRef = useRef<Selection>(INITIAL_SELECTION);

  const [selection, setSelection] = useState<Selection>(INITIAL_SELECTION);
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    selectionRef.current = selection;
  }, [selection]);

  useEffect(() => {
    spinRef.current = spin;
  }, [spin]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const w = host.clientWidth || 900;
    const h = host.clientHeight || 620;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe8e6de);
    scene.fog = new THREE.Fog(0xe8e6de, 150, 380);

    const camera = new THREE.PerspectiveCamera(fovFor(w, h), w / h, 0.5, 600);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xbfd4ea, 0x9c9686, 0.5));
    const sun = new THREE.DirectionalLight(0xfff1da, 1.25);
    sun.position.set(34, 46, 26);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -46;
    sun.shadow.camera.right = 46;
    sun.shadow.camera.top = 46;
    sun.shadow.camera.bottom = -46;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 160;
    sun.shadow.bias = -0.0006;
    sun.shadow.normalBias = 0.03;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xc4d4e8, 0.2);
    fill.position.set(-28, 18, -24);
    scene.add(fill);

    const M = {
      stucco: new THREE.MeshStandardMaterial({ color: 0xeae7df, roughness: 0.92, metalness: 0 }),
      trim: new THREE.MeshStandardMaterial({ color: 0xfbfbf9, roughness: 0.78 }),
      plinth: new THREE.MeshStandardMaterial({ color: 0x8f8b81, roughness: 0.95 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x3a3a34, roughness: 0.7 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x2c3945, roughness: 0.12, metalness: 0.75 }),
      rail: new THREE.MeshStandardMaterial({
        color: 0x9fb3c4,
        roughness: 0.08,
        metalness: 0.35,
        transparent: true,
        opacity: 0.42,
      }),
      metal: new THREE.MeshStandardMaterial({ color: 0x8b8b85, roughness: 0.35, metalness: 0.85 }),
      roof: new THREE.MeshStandardMaterial({ color: 0xbfbcb2, roughness: 0.95 }),
      lawn: new THREE.MeshStandardMaterial({ color: 0x8a9c6d, roughness: 1 }),
      paving: new THREE.MeshStandardMaterial({ color: 0xcac7bc, roughness: 1 }),
      asphalt: new THREE.MeshStandardMaterial({ color: 0xa9a7a0, roughness: 1 }),
      hedge: new THREE.MeshStandardMaterial({ color: 0x25502f, roughness: 1 }),
      foliage: new THREE.MeshStandardMaterial({ color: 0x14361f, roughness: 1 }),
      trunk: new THREE.MeshStandardMaterial({ color: 0x5c4736, roughness: 1 }),
      car: new THREE.MeshStandardMaterial({ color: 0xf3f3f0, roughness: 0.35, metalness: 0.2 }),
      carDark: new THREE.MeshStandardMaterial({ color: 0x2b3440, roughness: 0.25, metalness: 0.4 }),
    };

    const city = new THREE.Group();
    scene.add(city);

    const box = (
      sx: number,
      sy: number,
      sz: number,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number,
      shadow = true,
    ) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
      m.position.set(x, y, z);
      if (shadow) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
      return m;
    };

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(1200, 1200), M.lawn);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    city.add(ground);

    const slab = (sx: number, sz: number, mat: THREE.Material, x: number, z: number, y = 0.02) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(sx, sz), mat);
      m.rotation.x = -Math.PI / 2;
      m.position.set(x, y, z);
      m.receiveShadow = true;
      city.add(m);
    };
    slab(150, 12, M.asphalt, 0, 36);
    slab(150, 1.4, M.paving, 0, 29.6);
    slab(46, 26, M.paving, 0, 12);
    slab(4.5, 26, M.paving, -22, 16, 0.03);
    slab(4.5, 26, M.paving, 22, 16, 0.03);
    slab(34, 9, M.asphalt, -34, 28, 0.03);

    const picks: THREE.Mesh[] = [];
    const windowMeshes: THREE.Mesh[] = [];
    const FH = 3.0,
      UW = 4.4,
      UC = 3,
      D = 9.4;

    BUILDINGS.forEach((b) => {
      const g = new THREE.Group();
      g.position.set(b.x, 0, b.z);
      g.rotation.y = b.rot || 0;
      const W = UW * UC,
        H = FH * b.floors;

      g.add(box(W + 0.6, 0.7, D + 0.6, M.plinth, 0, 0.35, 0));
      g.add(box(W, H, D, M.stucco, 0, H / 2 + 0.5, 0));

      [1, -1].forEach((sd) => {
        for (let f = 1; f <= b.floors; f++) {
          const y0 = 0.5 + (f - 1) * FH;
          for (let u = 1; u <= UC; u++) {
            const bx = (-W / 2 + UW * (u - 0.5)) * sd;
            const front = (D / 2) * sd;
            const q = (v: number) => front + v * sd;
            const isEntrance = f === 1 && u === 2 && sd === 1;

            g.add(box(UW - 1.0, FH - 1.5, 0.1, M.trim, bx, y0 + FH * 0.52, q(0.03), false));
            const win = box(UW - 1.4, FH - 1.8, 0.08, M.glass, bx, y0 + FH * 0.52, q(0.1), false);
            win.userData = { building: b.id, floor: f, unit: u };
            win.material = (M.glass as THREE.MeshStandardMaterial).clone();
            windowMeshes.push(win);
            g.add(win);
            g.add(box(0.1, FH - 1.8, 0.1, M.trim, bx, y0 + FH * 0.52, q(0.13), false));

            if (isEntrance) {
              g.add(box(UW - 0.6, FH - 0.9, 0.12, M.glass, bx, y0 + (FH - 0.9) / 2, q(0.06), false));
              g.add(box(UW + 1.6, 0.22, 2.4, M.trim, bx, y0 + FH - 0.55, q(1.2), true));
              g.add(box(UW + 1.0, 0.14, 1.6, M.paving, bx, 0.12, q(1.4), true));
            } else {
              const bw = UW - 0.7;
              g.add(box(bw, 0.18, 1.7, M.trim, bx, y0 + 0.12, q(0.85), true));
              g.add(box(bw, 1.05, 0.05, M.rail, bx, y0 + 0.68, q(1.68), false));
              g.add(box(0.05, 1.05, 1.7, M.rail, bx - bw / 2, y0 + 0.68, q(0.85), false));
              g.add(box(0.05, 1.05, 1.7, M.rail, bx + bw / 2, y0 + 0.68, q(0.85), false));
              g.add(box(bw + 0.1, 0.06, 0.07, M.metal, bx, y0 + 1.23, q(1.68), false));
              g.add(box(0.07, 0.06, 1.7, M.metal, bx - bw / 2, y0 + 1.23, q(0.85), false));
              g.add(box(0.07, 0.06, 1.7, M.metal, bx + bw / 2, y0 + 1.23, q(0.85), false));
            }

            const pickMat = new THREE.MeshBasicMaterial({
              color: 0x435ee5,
              transparent: true,
              opacity: 0,
              depthWrite: false,
            });
            const pick = box(UW - 0.25, FH - 0.35, 0.06, pickMat, bx, y0 + FH * 0.5, q(1.75), false);
            pick.userData = { building: b.id, floor: f, unit: u };
            picks.push(pick);
            g.add(pick);
          }
          for (let u = 0; u <= UC; u++) {
            g.add(box(0.42, FH, 0.34, M.trim, -W / 2 + UW * u, y0 + FH / 2, (D / 2 + 0.06) * sd, false));
          }
          g.add(box(W + 0.16, 0.26, 0.34, M.trim, 0, y0 + FH - 0.13, (D / 2 + 0.06) * sd, false));
        }
      });

      [1, -1].forEach((sx) => {
        const ex = (W / 2) * sx;
        g.add(box(0.12, H - 1.2, 1.9, M.glass, ex + 0.06 * sx, 0.5 + H / 2 - 0.2, 0, false));
        g.add(box(0.16, H - 1.0, 2.3, M.trim, ex + 0.02 * sx, 0.5 + H / 2 - 0.2, 0, false));
        for (let f = 1; f <= b.floors; f++) {
          const y0 = 0.5 + (f - 1) * FH;
          [-2.9, 2.9].forEach((dz) => {
            g.add(box(0.1, FH - 1.9, 1.5, M.glass, ex + 0.05 * sx, y0 + FH * 0.55, dz, false));
            g.add(box(0.14, FH - 1.7, 1.8, M.trim, ex + 0.02 * sx, y0 + FH * 0.55, dz, false));
          });
        }
      });

      const top = 0.5 + H;
      g.add(box(W + 0.2, 0.22, D + 0.2, M.roof, 0, top + 0.11, 0));
      g.add(box(W + 0.4, 0.75, 0.3, M.trim, 0, top + 0.6, D / 2 + 0.1));
      g.add(box(W + 0.4, 0.75, 0.3, M.trim, 0, top + 0.6, -D / 2 - 0.1));
      g.add(box(0.3, 0.75, D + 0.4, M.trim, -W / 2 - 0.1, top + 0.6, 0));
      g.add(box(0.3, 0.75, D + 0.4, M.trim, W / 2 + 0.1, top + 0.6, 0));
      g.add(box(3.4, 1.7, 3.2, M.roof, -W / 4, top + 1.05, -1.2));
      g.add(box(1.1, 0.9, 1.1, M.metal, W / 4, top + 0.65, 1.4));

      city.add(g);
    });

    let seed = 19;
    const rnd = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };
    const pine = (x: number, z: number, sc: number) => {
      const t = new THREE.Group();
      t.add(box(0.3 * sc, 1.6 * sc, 0.3 * sc, M.trunk, 0, 0.8 * sc, 0));
      for (let i = 0; i < 3; i++) {
        const r = (1.9 - i * 0.5) * sc,
          hh = (3.0 - i * 0.4) * sc;
        const c = new THREE.Mesh(new THREE.ConeGeometry(r, hh, 12), M.foliage);
        c.position.y = (1.6 + i * 1.9) * sc + hh / 2 - 0.6 * sc;
        c.castShadow = true;
        c.receiveShadow = true;
        t.add(c);
      }
      t.position.set(x, 0, z);
      t.rotation.y = rnd() * 3;
      city.add(t);
    };
    for (let i = 0; i < 60; i++) {
      const x = -75 + rnd() * 150,
        z = -56 + rnd() * 56;
      const nearBlock = BUILDINGS.some((b) => Math.abs(x - b.x) < 14 && Math.abs(z - b.z) < 15);
      if (nearBlock || (z > -18 && Math.abs(x) < 40)) continue;
      pine(x, z, 0.85 + rnd() * 0.7);
    }
    for (let i = 0; i < 12; i++) pine(-64 + i * 11.5, 44 + rnd() * 7, 0.8 + rnd() * 0.5);
    [
      [-8, 14],
      [8, 14],
      [-15, 24],
      [15, 24],
      [-32, 18],
      [32, 18],
    ].forEach((p) => pine(p[0], p[1], 0.75));

    [
      [-11, 20],
      [11, 20],
    ].forEach((p) => {
      for (let i = 0; i < 5; i++) city.add(box(2.6, 0.9, 1.0, M.hedge, p[0] + i * 2.7 - 5.4, 0.45, p[1]));
    });

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
      city.add(c);
    };
    car(-40, 26, 0, false);
    car(-33, 26, 0, true);
    car(-26, 30.5, Math.PI, false);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const d0 = fitDist(w, h);
    const orb = { theta: -0.55, elev: 0.34, dist: d0, tTheta: -0.55, tElev: 0.34, tDist: d0 };
    let hover: THREE.Mesh | null = null;
    let userZoomed = false;

    const paint = (sel: Selection) => {
      picks.forEach((m) => {
        const d = m.userData as { building: string; floor: number; unit: number };
        const u = unitAt(d.building, d.floor, d.unit);
        const isSel = u && u.id === sel.unit;
        const onFloor = d.building === sel.building && d.floor === sel.floor;
        const hovered = hover === m;
        const mat = m.material as THREE.MeshBasicMaterial;
        if (isSel) {
          mat.color.setHex(0x435ee5);
          mat.opacity = 0.66;
        } else if (hovered) {
          mat.color.setHex(0x435ee5);
          mat.opacity = 0.3;
        } else if (onFloor) {
          mat.color.setHex(statusHex(u ? u.status : "sold"));
          mat.opacity = 0.34;
        } else {
          mat.opacity = 0;
        }
      });
      windowMeshes.forEach((m) => {
        const d = m.userData as { building: string; floor: number };
        const lit = d.building === sel.building && d.floor === sel.floor;
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.color.setHex(lit ? 0x4a5a68 : 0x2c3945);
        mat.emissive.setHex(lit ? 0x2a3a52 : 0x000000);
      });
    };

    const castPick = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(picks, false);
      return hits.length ? hits[0] : null;
    };

    const el = renderer.domElement;
    el.style.display = "block";
    el.style.touchAction = "none";
    let down: { x: number; y: number; moved: boolean } | null = null;

    const onPointerDown = (e: PointerEvent) => {
      down = { x: e.clientX, y: e.clientY, moved: false };
      el.setPointerCapture(e.pointerId);
      host.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!down) {
        const hit = castPick(e);
        const next = (hit ? hit.object : null) as THREE.Mesh | null;
        if (next !== hover) {
          hover = next;
          renderer.domElement.style.cursor = next ? "pointer" : "grab";
          paint(selectionRef.current);
        }
        return;
      }
      const dx = e.clientX - down.x,
        dy = e.clientY - down.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) {
        down.moved = true;
        if (spinRef.current) setSpin(false);
      }
      orb.tTheta -= dx * 0.006;
      orb.tElev = Math.max(0.1, Math.min(0.92, orb.tElev + dy * 0.004));
      down.x = e.clientX;
      down.y = e.clientY;
    };
    const onPointerUp = (e: PointerEvent) => {
      host.style.cursor = "grab";
      if (down && !down.moved) {
        const hit = castPick(e);
        if (hit) {
          const d = hit.object.userData as { building: string; floor: number; unit: number };
          const u = unitAt(d.building, d.floor, d.unit);
          setSelection({ building: d.building, floor: d.floor, unit: u ? u.id : null });
        }
      }
      down = null;
    };
    const onPointerCancel = () => {
      down = null;
      host.style.cursor = "grab";
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      userZoomed = true;
      orb.tDist = Math.max(22, Math.min(170, orb.tDist + e.deltaY * 0.1));
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerCancel);
    el.addEventListener("wheel", onWheel, { passive: false });

    const ro = new ResizeObserver(() => {
      const cw = host.clientWidth,
        ch = host.clientHeight;
      if (!cw || !ch) return;
      camera.aspect = cw / ch;
      camera.fov = fovFor(cw, ch);
      camera.updateProjectionMatrix();
      renderer.setSize(cw, ch);
      const d = fitDist(cw, ch);
      orb.tDist = Math.max(orb.tDist, d * 0.55);
      if (!userZoomed) orb.tDist = d;
    });
    ro.observe(host);

    paint(selectionRef.current);

    let raf = 0;
    const tick = () => {
      if (spinRef.current) orb.tTheta += 0.0011;
      orb.theta += (orb.tTheta - orb.theta) * 0.1;
      orb.elev += (orb.tElev - orb.elev) * 0.1;
      orb.dist += (orb.tDist - orb.dist) * 0.08;
      const cy = Math.cos(orb.elev),
        sy = Math.sin(orb.elev);
      camera.position.set(
        orb.dist * cy * Math.sin(orb.theta),
        4 + orb.dist * sy,
        orb.dist * cy * Math.cos(orb.theta),
      );
      camera.lookAt(0, 8.5, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    apiRef.current = {
      paint,
      resetView: () => {
        userZoomed = false;
        orb.tTheta = -0.55;
        orb.tElev = 0.34;
        orb.tDist = fitDist(el.clientWidth, el.clientHeight);
      },
    };

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerCancel);
      el.removeEventListener("wheel", onWheel);
      renderer.dispose();
      host.removeChild(renderer.domElement);
      apiRef.current = null;
    };
  }, []);

  useEffect(() => {
    apiRef.current?.paint(selection);
  }, [selection]);

  const b = BUILDINGS.find((x) => x.id === selection.building) ?? BUILDINGS[0];
  const mine = UNITS.filter((u) => u.building === selection.building);
  const available = mine.filter((u) => u.status === "available").length;
  const selectedUnit = UNITS.find((u) => u.id === selection.unit);
  const unitsOnFloor = mine.filter((u) => u.floor === selection.floor);

  const floors = [];
  for (let f = b.floors; f >= 1; f--) floors.push(f);

  const tones = {
    available: { bg: "var(--status-success-bg)", fg: "var(--status-success)", label: "Available" },
    reserved: { bg: "#f4e6f7", fg: "var(--accent-purple)", label: "Reserved" },
    sold: { bg: "var(--surface-secondary)", fg: "var(--text-mute)", label: "Sold" },
  } as const;

  const selectFloor = (floor: number) => {
    const first = mine.find((u) => u.floor === floor);
    setSelection({ building: b.id, floor, unit: first ? first.id : null });
  };

  return (
    <section id="explore" className="pt-(--space-section)">
      <div className="mb-(--space-xl) flex flex-col gap-(--space-sm)">
        <h2
          className="m-0 font-(family-name:--font-display) text-(length:--display-lg-size) font-bold text-(--text-primary)"
          style={{ letterSpacing: "-0.8px" }}
        >
          See the houses in 3D
        </h2>
        <p className="m-0 max-w-155 text-(length:--body-md-size) text-(--text-mute)">
          Priežu Rezidences, Mārupe. Drag to rotate the model, press a building
          to open its floors, then pick an apartment to see its price, status
          and plan.
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-(--space-lg) lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="relative min-h-155 overflow-hidden rounded-(--radius-lg-ds) bg-(--surface-card)">
          <div ref={hostRef} className="absolute inset-0 cursor-grab" />

          <div className="absolute top-(--space-lg) left-(--space-lg) flex gap-(--space-sm)">
            <PinOverlayPill>
              {selectedUnit
                ? `${selectedUnit.name} · ${selectedUnit.rooms} rooms · ${selectedUnit.area} m²`
                : "Drag to orbit · scroll to zoom · click an apartment"}
            </PinOverlayPill>
          </div>

          <div className="absolute bottom-(--space-lg) left-(--space-lg) flex flex-wrap items-center gap-x-(--space-lg) gap-y-(--space-md) rounded-(--radius-lg-ds) bg-(--surface-canvas) px-3.5 py-2.5">
            <span className="flex items-center gap-(--space-sm) text-(length:--caption-md-size) text-(--text-body)">
              <span className="h-2.5 w-2.5 rounded-full bg-(--status-success)" />
              Available
            </span>
            <span className="flex items-center gap-(--space-sm) text-(length:--caption-md-size) text-(--text-body)">
              <span className="h-2.5 w-2.5 rounded-full bg-(--accent-purple)" />
              Reserved
            </span>
            <span className="flex items-center gap-(--space-sm) text-(length:--caption-md-size) text-(--text-body)">
              <span className="h-2.5 w-2.5 rounded-full bg-(--text-disabled)" />
              Sold
            </span>
          </div>

          <div className="absolute top-(--space-lg) right-(--space-lg) flex gap-(--space-sm)">
            <PicheButton
              variant="secondary"
              size="sm"
              onClick={() => apiRef.current?.resetView()}
            >
              Reset view
            </PicheButton>
            <PicheButton variant="secondary" size="sm" onClick={() => setSpin((s) => !s)}>
              {spin ? "Stop rotation" : "Rotate"}
            </PicheButton>
          </div>
        </div>

        <aside className="flex flex-col gap-(--space-lg) rounded-(--radius-lg-ds) bg-(--surface-card) p-(--space-xxl)">
          <div className="flex flex-col gap-(--space-xxs)">
            <span className="text-(length:--caption-md-size) font-medium text-(--text-mute)">
              Priežu Rezidences apartments
            </span>
            <span
              className="text-(length:--heading-xl-size) font-bold text-(--text-primary)"
              style={{ letterSpacing: "-1.2px" }}
            >
              {b.name} · Floor {selection.floor}
            </span>
            <span className="text-(length:--body-sm-size) text-(--text-mute)">
              {b.floors} floors · {mine.length} apartments · {available} available
            </span>
          </div>

          <div className="flex flex-col gap-(--space-sm)">
            <span className="text-(length:--body-sm-strong-size) font-bold text-(--text-primary)">Floor</span>
            <div className="flex flex-wrap gap-(--space-sm)">
              {floors.map((f) => (
                <FilterChip key={f} active={f === selection.floor} onClick={() => selectFloor(f)}>
                  Floor {f}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-(--space-sm)">
            <span className="text-(length:--body-sm-strong-size) font-bold text-(--text-primary)">
              Apartments on this floor
            </span>
            <div className="flex flex-col">
              {unitsOnFloor.map((u) => {
                const t = tones[u.status];
                const isSelected = u.id === selection.unit;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setSelection({ building: u.building, floor: u.floor, unit: u.id })}
                    className="-mx-(--space-sm) grid grid-cols-[1fr_auto] items-center gap-x-(--space-md) gap-y-(--space-sm) rounded-(--radius-sm-ds) border-0 border-b border-(--border-hairline) px-(--space-sm) py-(--space-md) text-left hover:bg-(--surface-canvas)"
                    style={{ background: isSelected ? "var(--surface-canvas)" : "transparent" }}
                  >
                    <span className="whitespace-nowrap text-(length:--body-strong-size) font-semibold text-(--text-primary)">
                      {u.name}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-1 text-(length:--caption-md-size) font-medium"
                      style={{ background: t.bg, color: t.fg }}
                    >
                      {t.label}
                    </span>
                    <span className="text-(length:--body-sm-size) text-(--text-mute)">
                      {u.rooms} rooms · {u.area} m²
                    </span>
                    <span className="text-(length:--body-sm-strong-size) font-bold text-(--text-primary)">
                      {formatMoney(u.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-(--space-sm)">
            <PicheButton asChild fullWidth>
              <a href="#contacts">Apply for a viewing</a>
            </PicheButton>
            <a
              href="#contacts"
              className="text-center text-(length:--body-sm-size) font-semibold text-(--text-link)"
            >
              Price list and floor plans →
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
