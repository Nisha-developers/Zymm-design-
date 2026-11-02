import { useEffect, useRef } from 'react';

// The orb never rotates as a whole. It is drawn in 3 layers on a canvas:
// Layer 1 = white core, Layer 2 = fibres around it, Layer 3 = 10 rings.
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
const FIBRE_COUNT = 400;
const SHINE_STOPS = 32;
const RIBBON_POINTS = 56;
const TAU = Math.PI * 2;

// Fixed seed, so the orb looks the same on every load.
let seed = 7;
const random = (min, max) => {
  seed = (seed * 16807) % 2147483647;
  return min + (seed / 2147483647) * (max - min);
};

const RINGS = Array.from({ length: RING_COUNT }, (_, i) => ({
  tilt: (i / RING_COUNT) * TAU + random(-0.2, 0.2),
  squash: random(0.3, 0.9),
  radius: random(0.43, 0.475),
  comet: random(0, TAU),
  wobble: random(0, TAU),
  glint: i % 2 === 0,
}));

// Layer 2 is grouped by colour and drawn as one path per group, which keeps every frame cheap.
// Wisps are the long curved streaks further out, sparks are the short dashes around the core.
const FIBRE_GROUPS = [
  { colour: '90, 255, 110', width: 0.0034, opacity: 0.55, near: 0.2, far: 0.34, length: [0.04, 0.09], curl: 0.6 },
  { colour: '50, 225, 85', width: 0.005, opacity: 0.45, near: 0.18, far: 0.34, length: [0.04, 0.09], curl: 0.7 },
  { colour: '170, 255, 170', width: 0.0024, opacity: 0.55, near: 0.2, far: 0.33, length: [0.03, 0.08], curl: 0.5 },
  { colour: '120, 255, 130', width: 0.003, opacity: 0.95, near: 0.03, far: 0.17, length: [0.006, 0.016], curl: 0.1 },
  { colour: '240, 255, 235', width: 0.0028, opacity: 0.95, near: 0.03, far: 0.15, length: [0.005, 0.014], curl: 0.1 },
].map((group, index) => ({ ...group, phase: index * 1.7, fibres: [] }));

for (let i = 0; i < FIBRE_COUNT; i++) {
  const group = FIBRE_GROUPS[i % FIBRE_GROUPS.length];
  group.fibres.push({
    angle: random(0, TAU),
    distance: random(group.near, group.far),
    speed: random(0.5, 1.5),
    phase: random(0, TAU),
    length: random(group.length[0], group.length[1]),
  });
}

function drawBody(ctx) {
  // Smoky glass: almost black in the middle, green further out, then a grey-green rim that fades to nothing.
  const body = ctx.createRadialGradient(0, 0, 0, 0, 0, 0.5);
  body.addColorStop(0, 'rgba(10, 110, 35, 1)');
  body.addColorStop(0.2, 'rgba(1, 26, 9, 1)');
  body.addColorStop(0.5, 'rgba(0, 8, 3, 1)');
  body.addColorStop(0.66, 'rgba(6, 62, 24, 1)');
  body.addColorStop(0.8, 'rgba(34, 110, 56, 1)');
  body.addColorStop(0.92, 'rgba(38, 74, 48, 0.96)');
  body.addColorStop(0.97, 'rgba(70, 92, 76, 0.6)');
  body.addColorStop(1, 'rgba(100, 112, 102, 0)');
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(0, 0, 0.5, 0, TAU);
  ctx.fill();
}

// The green patches of light inside the glass, on the left and right.
function drawGlassLight(ctx) {
  for (const side of [-1, 1]) {
    const light = ctx.createRadialGradient(side * 0.38, 0.02, 0, side * 0.38, 0.02, 0.17);
    light.addColorStop(0, 'rgba(70, 230, 100, 0.55)');
    light.addColorStop(1, 'rgba(40, 200, 80, 0)');
    ctx.fillStyle = light;
    ctx.beginPath();
    ctx.arc(side * 0.38, 0.02, 0.17, 0, TAU);
    ctx.fill();
  }
}

function drawFibres(ctx, inner, time, level) {
  ctx.lineCap = 'round';
  for (const group of FIBRE_GROUPS) {
    ctx.strokeStyle = `rgba(${group.colour}, ${group.opacity * (0.7 + 0.3 * Math.sin(time * 0.9 + group.phase))})`;
    ctx.lineWidth = group.width;
    ctx.beginPath();
    for (const f of group.fibres) {
      const angle = f.angle + Math.sin(inner * f.speed + f.phase) * 0.16;
      // The voice opens the core like a mouth and pushes the fibres outward.
      const distance = (f.distance + Math.sin(inner * f.speed * 0.7 + f.phase * 2) * 0.015) * (1 + level * 0.25);
      const heading = angle + Math.PI / 2 + Math.sin(f.phase) * 1.2 + Math.sin(inner * 0.6 + f.phase) * 0.2;
      const bend = heading + group.curl + Math.sin(inner + f.phase) * 0.2;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(
        x + Math.cos(heading) * f.length,
        y + Math.sin(heading) * f.length,
        x + Math.cos(heading) * f.length + Math.cos(bend) * f.length * 0.7,
        y + Math.sin(heading) * f.length + Math.sin(bend) * f.length * 0.7,
      );
    }
    ctx.stroke();
  }
}

function drawCore(ctx, inner, level) {
  const radius = 0.2 * (1 + Math.sin(inner * 1.6) * 0.05 + level * 0.4);
  const core = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
  core.addColorStop(0, 'rgba(255, 255, 255, 1)');
  core.addColorStop(0.2, 'rgba(250, 255, 250, 1)');
  core.addColorStop(0.36, 'rgba(120, 255, 140, 0.6)');
  core.addColorStop(0.6, 'rgba(40, 235, 80, 0.2)');
  core.addColorStop(1, 'rgba(30, 220, 70, 0)');
  ctx.save();
  ctx.rotate(0.55);
  ctx.scale(1.35, 0.62); // a wide, heavy shape, tilted like the core in the design
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawRing(ctx, ring, spin, inner, time) {
  const tilt = ring.tilt + spin;
  const squash = ring.squash + Math.sin(inner * 0.8 + ring.wobble) * 0.03;
  const comet = ring.comet + spin * 3;
  const shine = (theta) => Math.min(1, Math.max(0, Math.cos(theta - comet)) ** 4 + 0.8 * Math.max(0, Math.cos(theta - comet - Math.PI)) ** 6);
  const front = (theta) => 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(theta)); // the far side of a ring is dimmer

  // The ribbon is khaki, and only turns cream-white where it catches the light.
  const mix = (a, b, t) => Math.round(a + (b - a) * t);
  const paint = (base, dim, bright) => {
    const gradient = ctx.createConicGradient(0, 0, 0);
    for (let i = 0; i <= SHINE_STOPS; i++) {
      const theta = (i / SHINE_STOPS) * TAU;
      const light = shine(theta);
      const colour = dim.map((value, channel) => mix(value, bright[channel], light)).join(', ');
      gradient.addColorStop(i / SHINE_STOPS, `rgba(${colour}, ${Math.min(1, (base + light) * front(theta))})`);
    }
    return gradient;
  };

  // Scaling a circle gives the tilted-ring look, and the ribbon gets thinner where it turns away.
  ctx.save();
  ctx.rotate(tilt);
  ctx.scale(1, squash);
  ctx.globalCompositeOperation = 'source-over';

  // A dark edge just inside the ribbon, which makes it read as a solid band in the glass.
  ctx.beginPath();
  ctx.arc(0, 0, ring.radius - 0.008, 0, TAU);
  ctx.strokeStyle = paint(0.35, [48, 46, 24], [70, 80, 40]);
  ctx.lineWidth = 0.004;
  ctx.stroke();

  // A ribbon that swells where it is bright and tapers to a thread between.
  ctx.beginPath();
  for (const side of [1, -1]) {
    for (let i = 0; i <= RIBBON_POINTS; i++) {
      const theta = ((side === 1 ? i : RIBBON_POINTS - i) / RIBBON_POINTS) * TAU;
      const radius = ring.radius + side * (0.0035 + 0.0075 * shine(theta));
      ctx.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
    }
    ctx.closePath();
  }
  ctx.fillStyle = paint(0.5, [146, 142, 84], [252, 250, 228]);
  ctx.fill();

  // A fine green strand beside it gives the ring a brushed look.
  ctx.globalCompositeOperation = 'lighter';
  ctx.beginPath();
  ctx.arc(0, 0, ring.radius * 0.955, 0, TAU);
  ctx.strokeStyle = paint(0.1, [60, 190, 90], [150, 255, 165]);
  ctx.lineWidth = 0.0025;
  ctx.stroke();
  ctx.restore();

  const cos = Math.cos(tilt);
  const sin = Math.sin(tilt);
  const at = (theta) => {
    const x = Math.cos(theta) * ring.radius;
    const y = Math.sin(theta) * ring.radius * squash;
    return [x * cos - y * sin, x * sin + y * cos];
  };

  // Every other ring carries a star-shaped glint, plus sparks riding along it.
  if (ring.glint) {
    const [x, y] = at(comet);
    const strength = front(comet);
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 0.11);
    glow.addColorStop(0, `rgba(255, 255, 245, ${0.95 * strength})`);
    glow.addColorStop(0.25, `rgba(190, 255, 190, ${0.4 * strength})`);
    glow.addColorStop(1, 'rgba(80, 255, 120, 0)');
    ctx.fillStyle = glow;
    for (const [angle, thin] of [[0, 0.7], [tilt, 0.09], [tilt + Math.PI / 2, 0.09]]) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(1, thin);
      ctx.beginPath();
      ctx.arc(0, 0, 0.11, 0, TAU);
      ctx.fill();
      ctx.restore();
    }
  }

  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const [x, y] = at(comet * 0.8 + i * 2.1 + ring.wobble);
    ctx.moveTo(x + 0.004, y);
    ctx.arc(x, y, 0.004, 0, TAU);
  }
  ctx.fillStyle = `rgba(255, 255, 255, ${0.65 + 0.35 * Math.sin(time * 2 + ring.wobble)})`;
  ctx.fill();
}

// Sized from the screen, so the orb always fits without scrolling.
const ORB_SIZE = 'h-[min(72vw,42dvh,420px)] w-[min(72vw,42dvh,420px)] lg:h-[min(420px,46dvh)] lg:w-[min(420px,46dvh)] [@media(max-height:500px)]:h-[30dvh] [@media(max-height:500px)]:w-[30dvh]';

export default function Orb({ isListening = true, state, levelRef }) {
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

      ctx.globalCompositeOperation = 'source-over';
      drawBody(ctx);
      ctx.globalCompositeOperation = 'lighter';
      drawGlassLight(ctx);
      drawFibres(ctx, inner, now / 1000, smooth);
      drawCore(ctx, inner, smooth);
      for (const ring of RINGS) drawRing(ctx, ring, spin, inner, now / 1000);

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [levelRef]);

  return (
    <div className="relative flex items-center justify-center w-full shrink-0">
      <div ref={glowRef} className={`absolute inset-0 m-auto rounded-full bg-green-500/20 blur-3xl ${current === 'idle' ? 'animate-pulse' : ''} ${ORB_SIZE}`}></div>

      <div ref={scaleRef} className="relative flex items-center justify-center will-change-transform">
        <div className={`relative flex items-center justify-center ${ORB_SIZE}`}>
          <canvas ref={canvasRef} role="img" aria-label="AI Orb" className="block h-full w-full" />
        </div>
      </div>
    </div>
  );
}
