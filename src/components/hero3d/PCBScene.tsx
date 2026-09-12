"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

const BOARD_W = 6.4;
const BOARD_D = 3.8;

type Pt = { x: number; y: number };

function randRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function generateOrthoPath(w: number, h: number): Pt[] {
  const segments = 4 + Math.floor(Math.random() * 4);
  let x = randRange(-w / 2, w / 2);
  let y = randRange(-h / 2, h / 2);
  const pts: Pt[] = [{ x, y }];
  let horizontal = Math.random() < 0.5;
  for (let s = 0; s < segments; s++) {
    const len = randRange(w * 0.06, w * 0.2);
    if (horizontal) x += (Math.random() < 0.5 ? -1 : 1) * len;
    else y += (Math.random() < 0.5 ? -1 : 1) * len;
    x = Math.max(-w / 2 + 0.2, Math.min(w / 2 - 0.2, x));
    y = Math.max(-h / 2 + 0.2, Math.min(h / 2 - 0.2, y));
    pts.push({ x, y });
    horizontal = !horizontal;
  }
  return pts;
}

function pathLength(pts: Pt[]) {
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  }
  return Math.max(total, 0.001);
}

function pointAtLength(pts: Pt[], len: number, total: number): Pt {
  let target = len % total;
  if (target < 0) target += total;
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const segLen = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    if (acc + segLen >= target) {
      const t = segLen === 0 ? 0 : (target - acc) / segLen;
      return {
        x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t,
        y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t,
      };
    }
    acc += segLen;
  }
  return pts[pts.length - 1];
}

function buildBoardTexture(traceSets: Pt[][]) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d")!;

  const g = ctx.createRadialGradient(360, 200, 40, 512, 320, 720);
  g.addColorStop(0, "#0b1a1c");
  g.addColorStop(0.55, "#071214");
  g.addColorStop(1, "#04090b");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(79,209,255,0.045)";
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  const sx = canvas.width / BOARD_W;
  const sy = canvas.height / BOARD_D;
  traceSets.forEach((pts) => {
    ctx.beginPath();
    pts.forEach((p, i) => {
      const px = (p.x + BOARD_W / 2) * sx;
      const py = (p.y + BOARD_D / 2) * sy;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = "rgba(79,209,255,0.22)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Chips({ count }: { count: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: randRange(-BOARD_W / 2 + 0.5, BOARD_W / 2 - 0.5),
        z: randRange(-BOARD_D / 2 + 0.4, BOARD_D / 2 - 0.4),
        w: randRange(0.28, 0.5),
        d: randRange(0.22, 0.4),
        rot: randRange(0, Math.PI),
      })),
    [count]
  );
  return (
    <>
      {items.map((it, i) => (
        <mesh key={i} position={[it.x, 0.09, it.z]} rotation={[0, it.rot, 0]} castShadow>
          <boxGeometry args={[it.w, 0.07, it.d]} />
          <meshStandardMaterial color="#12161a" roughness={0.5} metalness={0.2} />
        </mesh>
      ))}
    </>
  );
}

function Capacitors({ count }: { count: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: randRange(-BOARD_W / 2 + 0.4, BOARD_W / 2 - 0.4),
        z: randRange(-BOARD_D / 2 + 0.3, BOARD_D / 2 - 0.3),
        r: randRange(0.04, 0.075),
        h: randRange(0.1, 0.2),
      })),
    [count]
  );
  return (
    <>
      {items.map((it, i) => (
        <mesh key={i} position={[it.x, it.h / 2 + 0.06, it.z]}>
          <cylinderGeometry args={[it.r, it.r, it.h, 16]} />
          <meshStandardMaterial color="#c3ccd3" roughness={0.35} metalness={0.5} />
        </mesh>
      ))}
    </>
  );
}

function Connectors() {
  const pins = useMemo(() => Array.from({ length: 14 }, (_, i) => i), []);
  return (
    <group position={[-BOARD_W / 2 + 0.3, 0.1, BOARD_D / 2 - 0.22]}>
      {pins.map((i) => (
        <mesh key={i} position={[i * 0.09, 0, 0]}>
          <boxGeometry args={[0.04, 0.12, 0.1]} />
          <meshStandardMaterial color="#e0bd66" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function FpgaChip() {
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.15, 0.14, 1.0)), []);
  return (
    <group position={[0.4, 0.13, -0.2]}>
      <mesh castShadow>
        <boxGeometry args={[1.15, 0.14, 1.0]} />
        <meshStandardMaterial color="#0d1114" roughness={0.4} metalness={0.25} />
      </mesh>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="#4fd1ff" transparent opacity={0.55} />
      </lineSegments>
      <mesh position={[0, 0.075, 0]}>
        <planeGeometry args={[0.9, 0.72]} />
        <meshBasicMaterial color="#0c1418" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function TracePulses({
  traceSets,
  reducedMotion,
}: {
  traceSets: { pts: Pt[]; len: number; speed: number; phase: number }[];
  reducedMotion: boolean;
}) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = reducedMotion ? 0 : state.clock.elapsedTime;
    traceSets.forEach((tr, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const travel = reducedMotion ? tr.phase * tr.len : t * tr.len * tr.speed + tr.phase * tr.len;
      const p = pointAtLength(tr.pts, travel, tr.len);
      mesh.position.set(p.x, 0.105, p.y);
      const pulse = reducedMotion ? 1 : 0.7 + Math.sin(t * 6 + i) * 0.3;
      mesh.scale.setScalar(pulse);
    });
  });

  return (
    <>
      {traceSets.map((_, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#9be8ff" toneMapped={false} />
        </mesh>
      ))}
    </>
  );
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function PCBScene({
  reducedMotion,
  isMobile,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const tilt = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const baseRotationY = useRef(0);
  const startedAt = useRef<number | null>(null);
  const { camera, viewport } = useThree();

  const traceCount = isMobile ? 8 : 16;
  const rawPaths = useMemo(
    () => Array.from({ length: traceCount }, () => generateOrthoPath(BOARD_W - 0.4, BOARD_D - 0.4)),
    [traceCount]
  );

  const traceSets = useMemo(
    () =>
      rawPaths.map((pts) => ({
        pts,
        len: pathLength(pts),
        speed: randRange(0.05, 0.11),
        phase: Math.random(),
      })),
    [rawPaths]
  );

  const texture = useMemo(() => buildBoardTexture(rawPaths), [rawPaths]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("home");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      scrollRef.current = Math.max(0, Math.min(1, -rect.top / (vh * 0.9)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tracked on window (not the canvas) so the canvas itself can stay
  // pointer-events:none and never block clicks on the text/CTAs above it.
  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // The scene is mounted lazily, well after first paint, so its reveal can
    // simply start on mount — by the time it exists, the visitor is looking
    // at readable text and the board materialises around it.
    let introEased = reducedMotion ? 1 : 0;
    if (!reducedMotion) {
      if (startedAt.current === null) startedAt.current = state.clock.elapsedTime;
      const since = state.clock.elapsedTime - startedAt.current;
      introEased = easeOutCubic(Math.min(1, since / 1.4));

      baseRotationY.current += delta * 0.12;
      const px = pointerRef.current.x;
      const py = pointerRef.current.y;
      tilt.current.x += (py * -0.18 - tilt.current.x) * 0.04;
      tilt.current.y += (px * 0.22 - tilt.current.y) * 0.04;
    }

    group.current.rotation.y = baseRotationY.current + (1 - introEased) * 1.1;
    group.current.rotation.x = 0.32 + tilt.current.x;
    group.current.rotation.z = tilt.current.y * 0.15;
    const scale = 0.82 + 0.18 * introEased;
    group.current.scale.setScalar(scale);

    const introZBoost = (1 - introEased) * 2.4;
    const targetZ = 5.6 - scrollRef.current * 0.9 + introZBoost;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.position.y += (1.15 - scrollRef.current * 0.4 - camera.position.y) * 0.06;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1.1} />
      <hemisphereLight args={["#3fb6e0", "#04070a", 1.4]} />
      <pointLight position={[3, 3, 2]} intensity={80} color="#4fd1ff" distance={16} decay={2} />
      <pointLight position={[-3, 2.4, -2]} intensity={45} color="#ffffff" distance={16} decay={2} />
      <directionalLight position={[2, 4, 3]} intensity={1.2} color="#bfeeff" />

      <group position={[isMobile ? 0 : viewport.width * 0.2, 0, 0]}>
      <group ref={group}>
        <mesh receiveShadow>
          <boxGeometry args={[BOARD_W, 0.1, BOARD_D]} />
          <meshStandardMaterial map={texture} roughness={0.6} metalness={0.12} />
        </mesh>

        <FpgaChip />
        <Chips count={isMobile ? 4 : 7} />
        <Capacitors count={isMobile ? 5 : 10} />
        <Connectors />
        <TracePulses traceSets={traceSets} reducedMotion={reducedMotion} />
      </group>
      </group>
    </>
  );
}
