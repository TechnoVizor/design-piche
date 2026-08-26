import * as THREE from "three";
import type { Building } from "@/lib/piche-data";

/** Storey height, bay width, row-house section width. */
export const FH = 3.0;
export const UW = 4.4;
export const ROW_FH = 2.85;
export const RW = 6.4;

export type Materials = ReturnType<typeof createMaterials>;

export function createMaterials() {
  return {
    facade: {
      stucco: new THREE.MeshStandardMaterial({ color: 0xeae7df, roughness: 0.92 }),
      renderWarm: new THREE.MeshStandardMaterial({ color: 0xd6cbb8, roughness: 0.94 }),
      brick: new THREE.MeshStandardMaterial({ color: 0xb08a6a, roughness: 0.96 }),
    },
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
    sedum: new THREE.MeshStandardMaterial({ color: 0x6f8f52, roughness: 1 }),
    deck: new THREE.MeshStandardMaterial({ color: 0xa98a63, roughness: 0.95 }),
    planter: new THREE.MeshStandardMaterial({ color: 0x2f4a2b, roughness: 1 }),
    lawn: new THREE.MeshStandardMaterial({ color: 0x8a9c6d, roughness: 1 }),
    paving: new THREE.MeshStandardMaterial({ color: 0xcac7bc, roughness: 1 }),
    asphalt: new THREE.MeshStandardMaterial({ color: 0xa9a7a0, roughness: 1 }),
    water: new THREE.MeshStandardMaterial({ color: 0x4a6d80, roughness: 0.18, metalness: 0.5 }),
    sand: new THREE.MeshStandardMaterial({ color: 0xcfc3a4, roughness: 1 }),
    hedge: new THREE.MeshStandardMaterial({ color: 0x25502f, roughness: 1 }),
    foliage: new THREE.MeshStandardMaterial({ color: 0x14361f, roughness: 1 }),
    foliageLight: new THREE.MeshStandardMaterial({ color: 0x2f5a32, roughness: 1 }),
    trunk: new THREE.MeshStandardMaterial({ color: 0x5c4736, roughness: 1 }),
    car: new THREE.MeshStandardMaterial({ color: 0xf3f3f0, roughness: 0.35, metalness: 0.2 }),
    carDark: new THREE.MeshStandardMaterial({ color: 0x2b3440, roughness: 0.25, metalness: 0.4 }),
    play: new THREE.MeshStandardMaterial({ color: 0xc4703f, roughness: 0.9 }),
  };
}

export function box(
  sx: number,
  sy: number,
  sz: number,
  mat: THREE.Material,
  x: number,
  y: number,
  z: number,
  shadow = true,
) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
  m.position.set(x, y, z);
  if (shadow) {
    m.castShadow = true;
    m.receiveShadow = true;
  }
  return m;
}

export type BuildingParts = {
  group: THREE.Group;
  /** Invisible click targets, one per apartment per facade side. */
  picks: THREE.Mesh[];
  /** Window panes, re-tinted when a floor is selected. */
  windows: THREE.Mesh[];
};

/** Roof dressing shared by both building kinds. */
function addRoof(g: THREE.Group, b: Building, M: Materials, W: number, D: number, top: number) {
  const deckMat = b.roof === "green" ? M.sedum : b.roof === "terrace" ? M.deck : M.roof;
  g.add(box(W + 0.2, 0.22, D + 0.2, deckMat, 0, top + 0.11, 0));

  // parapet on all four sides
  g.add(box(W + 0.4, 0.75, 0.3, M.trim, 0, top + 0.6, D / 2 + 0.1));
  g.add(box(W + 0.4, 0.75, 0.3, M.trim, 0, top + 0.6, -D / 2 - 0.1));
  g.add(box(0.3, 0.75, D + 0.4, M.trim, -W / 2 - 0.1, top + 0.6, 0));
  g.add(box(0.3, 0.75, D + 0.4, M.trim, W / 2 + 0.1, top + 0.6, 0));

  if (b.roof === "flat") {
    // Stair head plus the rank of vent units seen in the reference aerials.
    g.add(box(3.4, 1.7, 3.2, M.roof, -W / 4, top + 1.05, -1.2));
    const n = Math.max(2, Math.round(W / 5));
    for (let i = 0; i < n; i++) {
      g.add(box(1.0, 0.7, 1.0, M.metal, -W / 2 + 2 + (i * (W - 4)) / (n - 1 || 1), top + 0.57, 2.2));
    }
  } else if (b.roof === "green") {
    g.add(box(3.0, 1.6, 2.8, M.roof, -W / 4, top + 1.0, -1.4));
    for (let i = 0; i < 3; i++) {
      g.add(box(W * 0.6, 0.3, 0.9, M.planter, 0, top + 0.37, -D / 4 + i * (D / 4), false));
    }
  } else {
    // terrace: paved bays, planters and a scatter of furniture
    g.add(box(3.0, 1.6, 2.8, M.roof, -W / 4, top + 1.0, -1.4));
    const seats = Math.max(2, Math.round(W / 6));
    for (let i = 0; i < seats; i++) {
      const px = -W / 2 + 3 + (i * (W - 6)) / (seats - 1 || 1);
      g.add(box(1.6, 0.12, 1.6, M.paving, px, top + 0.29, 1.6, false));
      g.add(box(0.9, 0.45, 0.9, M.dark, px, top + 0.57, 1.6));
      g.add(box(1.1, 0.5, 0.7, M.planter, px, top + 0.47, -1.8));
    }
  }
}

/** Glazed stair slot and side windows on the gable ends. */
function addGables(g: THREE.Group, b: Building, M: Materials, W: number, H: number) {
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
}

function apartmentBlock(b: Building, M: Materials, accent: THREE.Material | null): BuildingParts {
  const g = new THREE.Group();
  g.position.set(b.x, 0, b.z);
  g.rotation.y = b.rot;

  const picks: THREE.Mesh[] = [];
  const windows: THREE.Mesh[] = [];
  const W = UW * b.bays;
  const H = FH * b.floors;
  const D = b.depth;

  g.add(box(W + 0.6, 0.7, D + 0.6, M.plinth, 0, 0.35, 0));
  g.add(box(W, H, D, M.facade[b.facade], 0, H / 2 + 0.5, 0));

  // Full-height stairwell stripe — the red-brown panel in the references.
  if (accent) {
    const ax = -W / 2 + UW * (b.entranceBay - 0.5);
    [1, -1].forEach((sd) => {
      g.add(box(UW - 0.5, H - 0.2, 0.12, accent, ax * sd, 0.5 + H / 2 - 0.1, (D / 2 + 0.07) * sd, false));
    });
  }

  [1, -1].forEach((sd) => {
    for (let f = 1; f <= b.floors; f++) {
      const y0 = 0.5 + (f - 1) * FH;
      for (let u = 1; u <= b.bays; u++) {
        const bx = (-W / 2 + UW * (u - 0.5)) * sd;
        const front = (D / 2) * sd;
        const q = (v: number) => front + v * sd;
        const isEntrance = f === 1 && u === b.entranceBay && sd === 1;

        g.add(box(UW - 1.0, FH - 1.5, 0.1, M.trim, bx, y0 + FH * 0.52, q(0.03), false));
        const win = box(UW - 1.4, FH - 1.8, 0.08, M.glass, bx, y0 + FH * 0.52, q(0.1), false);
        win.userData = { building: b.id, floor: f, bay: u };
        win.material = (M.glass as THREE.MeshStandardMaterial).clone();
        windows.push(win);
        g.add(win);
        g.add(box(0.1, FH - 1.8, 0.1, M.trim, bx, y0 + FH * 0.52, q(0.13), false));

        if (isEntrance) {
          g.add(box(UW - 0.6, FH - 0.9, 0.12, M.glass, bx, y0 + (FH - 0.9) / 2, q(0.06), false));
          g.add(box(UW + 1.6, 0.22, 2.4, M.trim, bx, y0 + FH - 0.55, q(1.2), true));
          g.add(box(UW + 1.0, 0.14, 1.6, M.paving, bx, 0.12, q(1.4), true));
        } else if (b.balcony === "projecting") {
          const bw = UW - 0.7;
          g.add(box(bw, 0.18, 1.7, M.trim, bx, y0 + 0.12, q(0.85), true));
          g.add(box(bw, 1.05, 0.05, M.rail, bx, y0 + 0.68, q(1.68), false));
          g.add(box(0.05, 1.05, 1.7, M.rail, bx - bw / 2, y0 + 0.68, q(0.85), false));
          g.add(box(0.05, 1.05, 1.7, M.rail, bx + bw / 2, y0 + 0.68, q(0.85), false));
          g.add(box(bw + 0.1, 0.06, 0.07, M.metal, bx, y0 + 1.23, q(1.68), false));
          g.add(box(0.07, 0.06, 1.7, M.metal, bx - bw / 2, y0 + 1.23, q(0.85), false));
          g.add(box(0.07, 0.06, 1.7, M.metal, bx + bw / 2, y0 + 1.23, q(0.85), false));
        } else if (b.balcony === "loggia") {
          // Recessed: the opening is cut back into the mass, rail sits flush.
          const bw = UW - 0.8;
          g.add(box(bw, FH - 0.5, 0.08, M.dark, bx, y0 + FH * 0.45, q(-0.34), false));
          g.add(box(bw, 0.16, 0.8, M.trim, bx, y0 + 0.1, q(-0.02), false));
          g.add(box(bw, 1.02, 0.05, M.rail, bx, y0 + 0.64, q(0.12), false));
          g.add(box(bw + 0.1, 0.06, 0.07, M.metal, bx, y0 + 1.18, q(0.12), false));
          g.add(box(0.16, FH, 0.5, M.trim, bx - bw / 2 - 0.1, y0 + FH / 2, q(-0.1), false));
          g.add(box(0.16, FH, 0.5, M.trim, bx + bw / 2 + 0.1, y0 + FH / 2, q(-0.1), false));
        }

        const pickMat = new THREE.MeshBasicMaterial({
          color: 0x13b5ca,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });
        const pick = box(UW - 0.25, FH - 0.35, 0.06, pickMat, bx, y0 + FH * 0.5, q(1.75), false);
        pick.userData = { building: b.id, floor: f, bay: u };
        picks.push(pick);
        g.add(pick);
      }
      for (let u = 0; u <= b.bays; u++) {
        g.add(box(0.42, FH, 0.34, M.trim, -W / 2 + UW * u, y0 + FH / 2, (D / 2 + 0.06) * sd, false));
      }
      g.add(box(W + 0.16, 0.26, 0.34, M.trim, 0, y0 + FH - 0.13, (D / 2 + 0.06) * sd, false));
    }
  });

  addGables(g, b, M, W, H);
  addRoof(g, b, M, W, D, 0.5 + H);

  return { group: g, picks, windows };
}

function rowTerrace(b: Building, M: Materials, accent: THREE.Material | null): BuildingParts {
  const g = new THREE.Group();
  g.position.set(b.x, 0, b.z);
  g.rotation.y = b.rot;

  const picks: THREE.Mesh[] = [];
  const windows: THREE.Mesh[] = [];
  const W = RW * b.bays;
  const H = ROW_FH * 2;
  const D = b.depth;

  g.add(box(W + 0.5, 0.5, D + 0.5, M.plinth, 0, 0.25, 0));
  g.add(box(W, H, D, M.facade[b.facade], 0, H / 2 + 0.35, 0));

  for (let u = 1; u <= b.bays; u++) {
    const bx = -W / 2 + RW * (u - 0.5);
    const front = D / 2;

    // Every other section wears the accent panel, so the terrace reads as
    // separate homes rather than one long block.
    if (accent && u % 2 === 0) {
      g.add(box(RW - 0.4, H - 0.1, 0.12, accent, bx, H / 2 + 0.35, front + 0.07, false));
    }

    for (let f = 1; f <= 2; f++) {
      const y0 = 0.35 + (f - 1) * ROW_FH;
      const wide = f === 1 ? RW - 2.6 : RW - 2.2;
      g.add(box(wide + 0.5, ROW_FH - 1.2, 0.1, M.trim, bx + 0.7, y0 + ROW_FH * 0.55, front + 0.03, false));
      const win = box(wide, ROW_FH - 1.45, 0.08, M.glass, bx + 0.7, y0 + ROW_FH * 0.55, front + 0.1, false);
      win.userData = { building: b.id, floor: 1, bay: u };
      win.material = (M.glass as THREE.MeshStandardMaterial).clone();
      windows.push(win);
      g.add(win);

      // rear glazing
      g.add(box(wide, ROW_FH - 1.45, 0.08, M.glass, bx, y0 + ROW_FH * 0.55, -front - 0.1, false));
    }

    // front door, canopy and path
    g.add(box(1.15, 2.15, 0.12, M.dark, bx - 1.9, 0.35 + 1.07, front + 0.06, false));
    g.add(box(2.0, 0.16, 1.1, M.trim, bx - 1.9, 0.35 + 2.32, front + 0.5, true));
    g.add(box(1.6, 0.1, 2.6, M.paving, bx - 1.9, 0.1, front + 1.6, true));

    // private garden: patio, hedge divider, a small tree
    g.add(box(RW - 1.0, 0.08, 3.2, M.paving, bx, 0.08, -front - 1.9, false));
    if (u < b.bays) {
      g.add(box(0.5, 1.0, 5.4, M.hedge, bx + RW / 2, 0.5, -front - 2.9));
    }
    g.add(box(0.26, 1.5, 0.26, M.trunk, bx + 1.4, 0.75, -front - 4.4));
    const crown = new THREE.Mesh(new THREE.SphereGeometry(1.15, 12, 10), M.foliageLight);
    crown.position.set(bx + 1.4, 2.6, -front - 4.4);
    crown.castShadow = true;
    g.add(crown);

    // one click target per house, spanning both storeys
    const pickMat = new THREE.MeshBasicMaterial({
      color: 0x13b5ca,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const pick = box(RW - 0.3, H - 0.3, 0.06, pickMat, bx, H / 2 + 0.35, front + 0.9, false);
    // A house-sized target is easy to click but too loud when every house in
    // the terrace is tinted at once, so ambient status tint is damped.
    pick.userData = { building: b.id, floor: 1, bay: u, soft: true };
    picks.push(pick);
    g.add(pick);

    if (u < b.bays) {
      g.add(box(0.3, H + 0.5, D + 0.3, M.trim, bx + RW / 2, (H + 0.5) / 2, 0, false));
    }
  }

  const top = 0.35 + H;
  g.add(box(W + 0.3, 0.24, D + 0.3, b.roof === "green" ? M.sedum : M.roof, 0, top + 0.12, 0));
  g.add(box(W + 0.5, 0.45, 0.26, M.trim, 0, top + 0.45, D / 2 + 0.15));
  g.add(box(W + 0.5, 0.45, 0.26, M.trim, 0, top + 0.45, -D / 2 - 0.15));

  return { group: g, picks, windows };
}

/** Turn one building spec into geometry, click targets and window panes. */
export function buildBuilding(b: Building, M: Materials): BuildingParts {
  const accent =
    b.accent === undefined
      ? null
      : new THREE.MeshStandardMaterial({ color: b.accent, roughness: 0.9 });
  return b.kind === "row" ? rowTerrace(b, M, accent) : apartmentBlock(b, M, accent);
}

/**
 * Half-extents along the world axes, with the building's own rotation folded
 * in — a wing turned 90° is wide in Z, not in X.
 */
export function footprint(b: Building) {
  const halfW = ((b.kind === "row" ? RW : UW) * b.bays) / 2;
  const halfD = b.depth / 2;
  const c = Math.abs(Math.cos(b.rot));
  const s = Math.abs(Math.sin(b.rot));
  return { halfW, halfD, extentX: halfW * c + halfD * s, extentZ: halfW * s + halfD * c };
}
