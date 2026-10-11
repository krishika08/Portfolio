"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// Geometry: a K built from three solid strokes and sampled into points, plus
// a shell of dust. Units: the K spans y ∈ [-1, 1]. Each point stores a start
// (scattered) and a target (on the K) position; the vertex shader blends them.
// ---------------------------------------------------------------------------

interface Quality {
  letter: number;
  dust: number;
  floorStep: number;
  dpr: number;
}

const FULL: Quality = { letter: 7000, dust: 1600, floorStep: 0.5, dpr: 2 };
const LITE: Quality = { letter: 3200, dust: 700, floorStep: 0.75, dpr: 1.5 };

const DEPTH = 0.16;

type Vec2 = [number, number];
type Vec3 = [number, number, number];

interface Stroke {
  /** Point on the stroke for t ∈ [0, 1] along it and s ∈ [-1, 1] across it. */
  at: (t: number, s: number) => Vec2;
  area: number;
}

const bar = (x0: number, x1: number): Stroke => ({
  at: (t, s) => [x0 + ((s + 1) / 2) * (x1 - x0), -1 + t * 2],
  area: (x1 - x0) * 2,
});

const arm = (from: Vec2, to: Vec2, width: number): Stroke => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy);
  const nx = -dy / length;
  const ny = dx / length;
  return {
    at: (t, s) => [from[0] + dx * t + nx * s * (width / 2), from[1] + dy * t + ny * s * (width / 2)],
    area: length * width,
  };
};

const STROKES: Stroke[] = [bar(-0.62, -0.3), arm([-0.3, -0.04], [0.6, 1.0], 0.3), arm([-0.16, 0.16], [0.64, -1.0], 0.3)];

function buildGeometry({ letter, dust }: Quality) {
  const total = letter + dust;
  const start = new Float32Array(total * 3);
  const target = new Float32Array(total * 3);
  const seed = new Float32Array(total);
  const kind = new Float32Array(total);
  const areaSum = STROKES.reduce((sum, stroke) => sum + stroke.area, 0);

  let i = 0;
  const put = (s: Vec3, t: Vec3, k: number) => {
    start.set(s, i * 3);
    target.set(t, i * 3);
    seed[i] = Math.random();
    kind[i] = k;
    i++;
  };
  const sphere = (radius: number): Vec3 => {
    const u = Math.random() * 2 - 1;
    const a = Math.random() * Math.PI * 2;
    const r = radius * Math.cbrt(Math.random());
    const q = Math.sqrt(1 - u * u);
    return [r * q * Math.cos(a), r * u, r * q * Math.sin(a)];
  };

  for (const stroke of STROKES) {
    const count = Math.round((stroke.area / areaSum) * letter);
    for (let n = 0; n < count && i < letter; n++) {
      // A third of the points trace the stroke's outline on the front and
      // back faces, which keeps the letter crisp; the rest fill its volume.
      const edge = Math.random() < 0.4;
      const t = Math.random();
      const s = edge ? (Math.random() < 0.5 ? -1 : 1) : Math.random() * 2 - 1;
      const [x, y] = stroke.at(t, s);
      if (y < -1 || y > 1) continue;
      const z = edge ? (Math.random() < 0.5 ? -DEPTH : DEPTH) : (Math.random() * 2 - 1) * DEPTH;
      put(sphere(3.6), [x, y, z], edge ? 2 : 0);
    }
  }
  while (i < letter) {
    const [x, y] = STROKES[0]!.at(Math.random(), Math.random() * 2 - 1);
    put(sphere(3.6), [x, y, (Math.random() * 2 - 1) * DEPTH], 0);
  }
  while (i < total) {
    const p = sphere(3.4);
    const len = Math.hypot(p[0], p[1], p[2]) || 1;
    const r = 1.7 + Math.random() * 1.7;
    const d: Vec3 = [(p[0] / len) * r, (p[1] / len) * r * 0.7, (p[2] / len) * r];
    put(d, d, 1);
  }
  return { start, target, seed, kind, count: total };
}

function buildFloor(step: number) {
  const lines: number[] = [];
  // Lines across (x) travel toward the viewer; lines receding (z) stay put.
  for (let z = -7; z <= 3; z += step) lines.push(-7, z, 1, 7, z, 1);
  for (let x = -7; x <= 7; x += step) lines.push(x, -7, 0, x, 3.5, 0);
  return new Float32Array(lines);
}

// ---------------------------------------------------------------------------
// Shaders (GLSL ES 1.0 for the widest support). smoothstep edges ascend.
// ---------------------------------------------------------------------------

const PROJECT = `
  uniform vec2 uRot;
  uniform float uAspect;
  uniform vec2 uShift;
  const float F = 3.6;
  const float CAMERA = 4.0;
  vec3 orient(vec3 p, float yaw, float pitch) {
    float cy = cos(yaw), sy = sin(yaw), cx = cos(pitch), sx = sin(pitch);
    p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
    return vec3(p.x, cx * p.y - sx * p.z, sx * p.y + cx * p.z);
  }
`;

const POINT_VS = `
  attribute vec3 aStart;
  attribute vec3 aTarget;
  attribute float aSeed;
  attribute float aKind;
  uniform float uTime;
  uniform float uAssemble;
  uniform float uScatter;
  uniform float uPx;
  uniform vec2 uMouse;
  uniform float uMouseOn;
  varying float vAlpha;
  varying float vTint;
  ${PROJECT}
  void main() {
    float isDust = step(0.5, aKind) * (1.0 - step(1.5, aKind));
    float local = clamp((uAssemble - aSeed * 0.45) / 0.55, 0.0, 1.0);
    float k = 1.0 - pow(1.0 - local, 3.0);
    vec3 p = mix(aStart, aTarget, k);
    p = mix(p, aStart * 1.35, uScatter * (1.0 - isDust));
    p += 0.014 * vec3(sin(uTime * 1.7 + aSeed * 61.0), sin(uTime * 1.3 + aSeed * 37.0), sin(uTime * 1.1 + aSeed * 17.0));
    float spin = uTime * 0.06 * isDust;
    p = vec3(cos(spin) * p.x + sin(spin) * p.z, p.y, -sin(spin) * p.x + cos(spin) * p.z);
    p = orient(p, uRot.x, uRot.y);

    float d = CAMERA - p.z;
    vec2 ndc = vec2(p.x * F / d / uAspect, p.y * F / d) + uShift;
    vec2 diff = (ndc - uMouse) * vec2(uAspect, 1.0);
    float dist = length(diff);
    float push = uMouseOn * (1.0 - smoothstep(0.0, 0.34, dist)) * 0.1 * (1.0 - isDust);
    ndc += (diff / max(dist, 0.0001)) * push / vec2(uAspect, 1.0);

    gl_Position = vec4(ndc, 0.0, 1.0);
    float size = aKind > 1.5 ? 4.2 : (isDust > 0.5 ? 1.9 : 3.3);
    gl_PointSize = size * uPx * (CAMERA / d) * (1.0 + push * 6.0);
    vAlpha = (isDust > 0.5 ? 0.32 : 0.55 + 0.4 * k) * (1.0 - smoothstep(2.4, 8.0, d));
    vTint = aSeed;
  }
`;

const POINT_FS = `
  precision mediump float;
  varying float vAlpha;
  varying float vTint;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    float a = (1.0 - smoothstep(0.05, 0.5, r)) * vAlpha;
    vec3 cobalt = vec3(0.31, 0.5, 1.0);
    vec3 white = vec3(0.9, 0.94, 1.0);
    vec3 signal = vec3(0.84, 0.95, 0.29);
    vec3 c = mix(cobalt, white, step(0.86, vTint));
    c = mix(c, signal, step(0.95, vTint));
    gl_FragColor = vec4(c * a, a);
  }
`;

const LINE_VS = `
  attribute vec3 aLine;
  uniform float uTime;
  varying float vFade;
  ${PROJECT}
  void main() {
    // aLine = (x, z, travels). The floor plane sits under the K.
    vec3 p = vec3(aLine.x, -1.32, aLine.y + aLine.z * mod(uTime * 0.35, 0.5));
    p = orient(p, uRot.x * 0.35, 0.0);
    float d = CAMERA - p.z;
    gl_Position = vec4(p.x * F / d / uAspect + uShift.x, p.y * F / d + uShift.y, 0.0, 1.0);
    vFade = (1.0 - smoothstep(3.2, 10.5, d)) * smoothstep(0.6, 1.6, d) * (1.0 - smoothstep(3.0, 7.0, abs(p.x)));
  }
`;

const LINE_FS = `
  precision mediump float;
  varying float vFade;
  void main() {
    float a = 0.42 * vFade;
    gl_FragColor = vec4(vec3(0.31, 0.5, 1.0) * a, a);
  }
`;

function compile(gl: WebGLRenderingContext, vs: string, fs: string) {
  const program = gl.createProgram();
  if (!program) return null;
  for (const [type, source] of [
    [gl.VERTEX_SHADER, vs],
    [gl.FRAGMENT_SHADER, fs],
  ] as const) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

function attribute(gl: WebGLRenderingContext, program: WebGLProgram, name: string, data: Float32Array, size: number) {
  const location = gl.getAttribLocation(program, name);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return () => {
    if (location < 0) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
  };
}

interface KFieldProps {
  /** Reports whether the scene could start (false: keep the static K). */
  onStatus?: (ok: boolean) => void;
  /** Horizontal offset of the K in clip space (-1…1). */
  shiftX?: number;
  className?: string;
}

/**
 * The hero's signature: a WebGL particle K over a travelling blueprint
 * floor. Points assemble on load, breathe, turn toward the pointer, part
 * around it, and scatter as the hero scrolls away. Plain WebGL (no
 * library). Paused off-screen and in background tabs; a single still frame
 * under reduced motion; a lighter particle budget on phones and
 * low-core devices. Decorative.
 */
export function KField({ onStatus, shiftX = 0, className }: KFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef(onStatus);

  useEffect(() => {
    statusRef.current = onStatus;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true });
    const points = gl && compile(gl, POINT_VS, POINT_FS);
    const floor = gl && compile(gl, LINE_VS, LINE_FS);
    if (!gl || !points || !floor) {
      statusRef.current?.(false);
      return;
    }

    const lite = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4;
    const quality = lite ? LITE : FULL;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const geometry = buildGeometry(quality);
    const bindPoints = [
      attribute(gl, points, "aStart", geometry.start, 3),
      attribute(gl, points, "aTarget", geometry.target, 3),
      attribute(gl, points, "aSeed", geometry.seed, 1),
      attribute(gl, points, "aKind", geometry.kind, 1),
    ];
    const floorData = buildFloor(quality.floorStep);
    const bindFloor = attribute(gl, floor, "aLine", floorData, 3);
    const u = (program: WebGLProgram, name: string) => gl.getUniformLocation(program, name);
    const pu = {
      time: u(points, "uTime"),
      assemble: u(points, "uAssemble"),
      scatter: u(points, "uScatter"),
      px: u(points, "uPx"),
      mouse: u(points, "uMouse"),
      mouseOn: u(points, "uMouseOn"),
      rot: u(points, "uRot"),
      aspect: u(points, "uAspect"),
      shift: u(points, "uShift"),
    };
    const lu = { time: u(floor, "uTime"), rot: u(floor, "uRot"), aspect: u(floor, "uAspect"), shift: u(floor, "uShift") };

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.clearColor(0, 0, 0, 0);

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, quality.dpr);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const pointer = { x: 0, y: 0, inside: 0 };
    const state = { yaw: 0, pitch: 0.06, mouseOn: 0, mouseX: 0, mouseY: 0 };
    const born = performance.now();
    let frame = 0;
    let running = false;

    const draw = (now: number) => {
      const t = still ? 0 : (now - born) / 1000;
      const assemble = still ? 1 : Math.min(t / 2.6, 1);
      const rect = canvas.getBoundingClientRect();
      const scatter = still ? 0 : Math.min(Math.max(-rect.top / (rect.height * 0.9), 0), 1);

      const autoYaw = still ? -0.32 : Math.sin(t * 0.22) * 0.38 - 0.18;
      state.yaw += (autoYaw + pointer.x * 0.55 - state.yaw) * 0.05;
      state.pitch += (0.06 + pointer.y * -0.22 - state.pitch) * 0.05;
      state.mouseOn += (pointer.inside - state.mouseOn) * 0.08;
      state.mouseX += (pointer.x - state.mouseX) * 0.25;
      state.mouseY += (pointer.y - state.mouseY) * 0.25;
      const aspect = canvas.width / canvas.height;

      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(floor);
      bindFloor();
      gl.uniform1f(lu.time, t);
      gl.uniform2f(lu.rot, state.yaw, state.pitch);
      gl.uniform1f(lu.aspect, aspect);
      gl.uniform2f(lu.shift, shiftX, 0);
      gl.drawArrays(gl.LINES, 0, floorData.length / 3);

      gl.useProgram(points);
      bindPoints.forEach((bind) => bind());
      gl.uniform1f(pu.time, t);
      gl.uniform1f(pu.assemble, assemble);
      gl.uniform1f(pu.scatter, scatter);
      gl.uniform1f(pu.px, dpr);
      gl.uniform2f(pu.mouse, state.mouseX, state.mouseY);
      gl.uniform1f(pu.mouseOn, still ? 0 : state.mouseOn);
      gl.uniform2f(pu.rot, state.yaw, state.pitch);
      gl.uniform1f(pu.aspect, aspect);
      gl.uniform2f(pu.shift, shiftX, 0);
      gl.drawArrays(gl.POINTS, 0, geometry.count);
    };

    const loop = (now: number) => {
      draw(now);
      frame = running ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (still || running || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    draw(performance.now());
    statusRef.current?.(true);

    const sizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    sizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()));
    viewObserver.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.inside = event.pointerType === "mouse" && Math.abs(pointer.x) <= 1 && Math.abs(pointer.y) <= 1 ? 1 : 0;
    };
    const onLost = (event: Event) => {
      event.preventDefault();
      stop();
      statusRef.current?.(false);
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointer, { passive: true });
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      stop();
      sizeObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("webglcontextlost", onLost);
    };
  }, [shiftX]);

  return <canvas ref={canvasRef} className={cn("size-full", className)} />;
}
