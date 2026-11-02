import { useEffect, useRef } from 'react';

// The orb never rotates as a whole. It is drawn in 3 layers on a canvas:
// Layer 1 = white core, Layer 2 = particles around it, Layer 3 = 10 rings.
// rings: how fast every ring travels clockwise (radians per second, the same for all 10)
// inner: the clock for layers 1 and 2. They only sway in place, so on screen they move slower than the rings.
const MOTION = {
  idle: { rings: 0.1, inner: 0.25, brightness: 1 },
  listening: { rings: 0.16, inner: 0.32, brightness: 1 },
  processing: { rings: 0.55, inner: 0.45, brightness: 1 },
  speaking: { rings: 0.22, inner: 0.36, brightness: 1 },
  error: { rings: 0.02, inner: 0.04, brightness: 0.35 },
};
const RING_COUNT = 10;
const PARTICLE_COUNT = 300;
const SHINE_STOPS = 32;
const TAU = Math.PI * 2;

// Fixed seed, so the orb looks the same on every load.
let seed = 7;
const random = (min, max) => {
  seed = (seed * 16807) % 2147483647;
  return min + (seed / 2147483647) * (max - min);
};

const RINGS = Array.from({ length: RING_COUNT }, (_, i) => ({
  tilt: (i / RING_COUNT) * TAU + random(-0.2, 0.2),
  squash: random(0.45, 0.95),
  radius: random(0.4, 0.47),
  comet: random(0, TAU),
  wobble: random(0, TAU),
}));

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  angle: random(0, TAU),
  distance: random(0.05, 0.36),
  speed: random(0.5, 1.5),
  phase: random(0, TAU),
  size: random(0.0012, 0.003),
  length: random(0.008, 0.03),
  dark: i % 5 === 0,
}));

function drawBody(ctx) {
  // Soft dark body that fades to nothing: this keeps the colours vivid without an outer circle.
  const body = ctx.createRadialGradient(0, 0, 0, 0, 0, 0.5);
  body.addColorStop(0, 'rgba(0, 45, 14, 0.96)');
  body.addColorStop(0.55, 'rgba(0, 26, 8, 0.94)');
  body.addColorStop(0.72, 'rgba(2, 44, 16, 0.72)');
  body.addColorStop(0.84, 'rgba(6, 70, 26, 0.34)');
  body.addColorStop(0.93, 'rgba(10, 90, 35, 0.1)');
  body.addColorStop(1, 'rgba(10, 90, 35, 0)');
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(0, 0, 0.5, 0, TAU);
  ctx.fill();
}

function drawParticles(ctx, inner, time, level) {
  for (const p of PARTICLES) {
    const angle = p.angle + Math.sin(inner * p.speed + p.phase) * 0.3;
    // The voice opens the core like a mouth and pushes the particles outward.
    const distance = (p.distance + Math.sin(inner * p.speed * 0.7 + p.phase * 2) * 0.03) * (1 + level * 0.3);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const heading = angle + Math.PI / 2 + Math.sin(inner * 0.6 + p.phase) * 0.9;
    const twinkle = 0.55 + 0.45 * Math.sin(time * p.speed * 1.4 + p.phase);

    const bend = heading + Math.sin(inner + p.phase) * 1.2;

    ctx.strokeStyle = p.dark ? `rgba(0, 12, 5, ${0.3 * twinkle})` : `rgba(90, 255, 120, ${0.7 * twinkle})`;
    ctx.lineWidth = p.dark ? p.size * 3 : p.size;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(
      x + Math.cos(heading) * p.length,
      y + Math.sin(heading) * p.length,
      x + Math.cos(bend) * p.length * 2,
      y + Math.sin(bend) * p.length * 2,
    );
    ctx.stroke();
  }
}

function drawCore(ctx, inner, level) {
  const radius = 0.22 * (1 + Math.sin(inner * 1.6) * 0.05 + level * 0.4);
  const core = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
  core.addColorStop(0, 'rgba(255, 255, 255, 1)');
  core.addColorStop(0.12, 'rgba(235, 255, 235, 0.95)');
  core.addColorStop(0.3, 'rgba(110, 255, 130, 0.45)');
  core.addColorStop(0.55, 'rgba(50, 240, 90, 0.14)');
  core.addColorStop(0.8, 'rgba(30, 220, 70, 0.04)');
  core.addColorStop(1, 'rgba(30, 220, 70, 0)');
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, TAU);
  ctx.fill();
}

function drawRing(ctx, ring, spin, inner, time) {
  const tilt = ring.tilt + spin;
  const squash = ring.squash + Math.sin(inner * 0.8 + ring.wobble) * 0.04;
  const comet = ring.comet + spin * 3;

  // Bright streaks and a dimmer far side, painted once around the ring.
  const shineAt = (alpha) => {
    const gradient = ctx.createConicGradient(0, 0, 0);
    for (let i = 0; i <= SHINE_STOPS; i++) {
      const theta = (i / SHINE_STOPS) * TAU;
      const front = 0.5 + 0.5 * Math.sin(theta);
      const shine = Math.max(0, Math.cos(theta - comet)) ** 5 + Math.max(0, Math.cos(theta - comet - Math.PI)) ** 9;
      gradient.addColorStop(i / SHINE_STOPS, alpha(Math.min(1, (0.14 + shine) * (0.4 + 0.6 * front))));
    }
    return gradient;
  };

  ctx.save();
  ctx.rotate(tilt);
  ctx.beginPath();
  ctx.ellipse(0, 0, ring.radius, ring.radius * squash, 0, 0, TAU);
  ctx.strokeStyle = shineAt((a) => `rgba(40, 255, 90, ${a * 0.35})`);
  ctx.lineWidth = 0.022;
  ctx.stroke();
  ctx.strokeStyle = shineAt((a) => `rgba(60, 255, 100, ${a * 0.8})`);
  ctx.lineWidth = 0.008;
  ctx.stroke();
  ctx.strokeStyle = shineAt((a) => `rgba(240, 255, 240, ${a})`);
  ctx.lineWidth = 0.003;
  ctx.stroke();

  // Sparks riding along the ring
  for (let i = 0; i < 3; i++) {
    const theta = comet * 0.8 + i * 2.1 + ring.wobble;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + 0.5 * Math.sin(time * 2 + i + ring.wobble)})`;
    ctx.beginPath();
    ctx.arc(Math.cos(theta) * ring.radius, Math.sin(theta) * ring.radius * squash, 0.004, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

export default function Orb({ isListening = true, isChatStarted = false, state, levelRef }) {
  const current = state ?? (isListening ? 'listening' : 'processing');
  const scaleRef = useRef(null);
  const glowRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef(current);

  useEffect(() => {
    stateRef.current = current;
  }, [current]);

  // Keep the canvas sharp while the orb changes size.
  useEffect(() => {
    const canvas = canvasRef.current;
    const observer = new ResizeObserver(() => {
      const pixels = Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2));
      canvas.width = pixels;
      canvas.height = pixels;
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Written straight to the canvas every frame, so a loud voice never causes React re-renders.
  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const speed = { ...MOTION[stateRef.current] };
    let smooth = 0;
    let spin = 0;
    let inner = 0;
    let last = performance.now();
    let raf;

    const frame = (now) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      const name = stateRef.current;
      const target = MOTION[name] ?? MOTION.idle;
      const reactive = name === 'listening' || name === 'speaking';
      smooth += ((reactive ? (levelRef?.current ?? 0) : 0) - smooth) * 0.2;

      // Ease between states so the orb never jumps.
      for (const key of Object.keys(speed)) speed[key] += (target[key] - speed[key]) * 0.04;
      if (!reduceMotion) {
        spin += speed.rings * delta;
        inner += speed.inner * delta;
      }

      if (scaleRef.current) {
        // louder voice = bigger orb, quieter voice = smaller orb
        scaleRef.current.style.transform = `scale(${(reduceMotion ? 1 : 1 + Math.sin(inner * 1.6) * 0.012 + smooth * 0.18).toFixed(3)})`;
      }
      if (glowRef.current && name !== 'idle') {
        // overall volume = overall intensity
        glowRef.current.style.opacity = String(name === 'error' ? 0.25 : name === 'processing' ? 0.9 : 0.55 + smooth * 0.45);
      }

      const size = canvas.width;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, size, size);
      ctx.setTransform(size, 0, 0, size, size / 2, size / 2);
      ctx.globalAlpha = speed.brightness;
      ctx.lineCap = 'round';

      ctx.globalCompositeOperation = 'source-over';
      drawBody(ctx);
      ctx.globalCompositeOperation = 'lighter';
      drawParticles(ctx, inner, now / 1000, smooth);
      drawCore(ctx, inner, smooth);
      for (const ring of RINGS) drawRing(ctx, ring, spin, inner, now / 1000);

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [levelRef]);

  return (
    <div className="relative flex items-center justify-center w-full py-2 shrink-0">
      <div ref={glowRef} className={`absolute inset-0 m-auto rounded-full bg-green-500/20 blur-3xl ${current === 'idle' ? 'animate-pulse' : ''} transition-[width,height] duration-500 ${isChatStarted ? 'w-[140px] h-[140px]' : 'w-[300px] h-[300px] lg:w-[360px] lg:h-[360px]'}`}></div>

      <div ref={scaleRef} className="relative flex items-center justify-center will-change-transform">
        <div className={`relative flex items-center justify-center transition-[width,height] duration-500 ${isChatStarted ? 'h-[160px] w-[160px]' : 'h-[320px] w-[320px] lg:h-[380px] lg:w-[380px]'}`}>
          <canvas ref={canvasRef} role="img" aria-label="AI Orb" className="block h-full w-full" />
        </div>
      </div>
    </div>
  );
}
