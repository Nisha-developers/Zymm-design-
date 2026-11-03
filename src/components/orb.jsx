import { useEffect, useRef, useState } from 'react';
import orbImage from '../assets/download.png';

// The orb is your image. When the page loads, it is split in memory (the file is never changed) into:
// Layer 3 = the rings, Layer 2 = the dark transparent glass, Layer 1 = the sharp green particles and white core.
// Stacked with no movement they give back your image. The orb never rotates; only the rings travel clockwise.
// rings: how fast every ring travels clockwise (degrees per second, the same for all of them)
// drift: how far layers 1 and 2 sway (degrees), much less than the rings, and never with them
const MOTION = {
  idle: { rings: 3, drift: 1.2, brightness: 1 },
  listening: { rings: 4, drift: 1.5, brightness: 1 },
  processing: { rings: 10, drift: 2, brightness: 1 },
  speaking: { rings: 5, drift: 1.5, brightness: 1 },
  error: { rings: 0.5, drift: 0.4, brightness: 0.45 },
};

// Where the sphere sits inside download.png (500x500), measured from the file.
const CENTRE_X = 0.493;
const CENTRE_Y = 0.497;
const RADIUS = 0.418;
const ORIGIN = `${CENTRE_X * 100}% ${CENTRE_Y * 100}%`;
// Fades the edge out just inside the outer line, so the line is gone and the rings blend into the page.
const EDGE = `radial-gradient(circle closest-side at ${ORIGIN}, #000 77%, transparent 84%)`;

// Sized from the screen, so the orb always fits without scrolling.
const ORB_SIZE = 'h-[min(72vw,42dvh,420px)] w-[min(72vw,42dvh,420px)] lg:h-[min(420px,46dvh)] lg:w-[min(420px,46dvh)] [@media(max-height:500px)]:h-[30dvh] [@media(max-height:500px)]:w-[30dvh]';
// The sphere fills 84% of the image, so the image is drawn larger to make the sphere fill the orb area.
const STACK = 'pointer-events-none absolute left-[-9.2%] top-[-9.4%] h-[119.6%] w-[119.6%] max-w-none select-none';
const LAYER = 'absolute inset-0 h-full w-full will-change-transform';

const smoothstep = (from, to, value) => {
  const t = Math.min(1, Math.max(0, (value - from) / (to - from)));
  return t * t * (3 - 2 * t);
};

// Lightest or darkest value around each pixel. Erode then dilate removes thin bright lines (rings, particles)
// and keeps the smooth dark glass behind them.
function spread(source, size, radius, pick) {
  const across = new Uint8ClampedArray(source.length);
  const result = new Uint8ClampedArray(source.length);
  const pass = (from, to, step, lineStep) => {
    for (let line = 0; line < size; line++) {
      for (let i = 0; i < size; i++) {
        for (let channel = 0; channel < 3; channel++) {
          let value = pick === 'min' ? 255 : 0;
          for (let k = Math.max(0, i - radius); k <= Math.min(size - 1, i + radius); k++) {
            const sample = from[(line * lineStep + k * step) * 4 + channel];
            value = pick === 'min' ? Math.min(value, sample) : Math.max(value, sample);
          }
          to[(line * lineStep + i * step) * 4 + channel] = value;
        }
      }
    }
  };
  pass(source, across, 1, size);
  pass(across, result, size, 1);
  return result;
}

// Softens the glass so it has no blocky edges.
function blur(source, size, radius) {
  const across = new Uint8ClampedArray(source.length);
  const result = new Uint8ClampedArray(source.length);
  const pass = (from, to, step, lineStep) => {
    for (let line = 0; line < size; line++) {
      for (let i = 0; i < size; i++) {
        for (let channel = 0; channel < 3; channel++) {
          let total = 0;
          let count = 0;
          for (let k = Math.max(0, i - radius); k <= Math.min(size - 1, i + radius); k++) {
            total += from[(line * lineStep + k * step) * 4 + channel];
            count++;
          }
          to[(line * lineStep + i * step) * 4 + channel] = total / count;
        }
      }
    }
  };
  pass(source, across, 1, size);
  pass(across, result, size, 1);
  return result;
}

function splitLayers(image) {
  const size = image.naturalWidth;
  const work = document.createElement('canvas');
  work.width = size;
  work.height = size;
  const context = work.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, 0, 0, size, size);
  const original = context.getImageData(0, 0, size, size).data;
  const glass = blur(blur(spread(spread(original, size, 3, 'min'), size, 3, 'max'), size, 4), size, 4);

  const glassLayer = new ImageData(size, size);
  const particleLayer = new ImageData(size, size);
  const ringLayer = new ImageData(size, size);
  const lum = (data, i) => data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const alpha = original[i + 3];
      const fromCentre = Math.hypot(x / size - CENTRE_X, y / size - CENTRE_Y) / RADIUS;
      // Anything clearly brighter than the glass behind it is a ring, a particle or the core.
      const detail = smoothstep(4, 28, lum(original, i) - lum(glass, i));
      // Rings are pale yellow-green (lots of red); the particles are deep green. Rings live in the outer part of the sphere.
      const ring = detail * smoothstep(55, 135, original[i]) * smoothstep(0.32, 0.5, fromCentre);
      const particle = detail * (1 - ring);

      for (let channel = 0; channel < 3; channel++) {
        glassLayer.data[i + channel] = glass[i + channel];
        particleLayer.data[i + channel] = original[i + channel];
        ringLayer.data[i + channel] = original[i + channel];
      }
      glassLayer.data[i + 3] = alpha;
      particleLayer.data[i + 3] = alpha * particle;
      ringLayer.data[i + 3] = alpha * ring;
    }
  }
  return [glassLayer, particleLayer, ringLayer];
}

export default function Orb({ isListening = true, state, levelRef }) {
  const current = state ?? (isListening ? 'listening' : 'processing');
  const [ready, setReady] = useState(false);
  const scaleRef = useRef(null);
  const glowRef = useRef(null);
  const orbRef = useRef(null);
  const glassRef = useRef(null);
  const particlesRef = useRef(null);
  const ringsRef = useRef(null);
  const stateRef = useRef(current);

  useEffect(() => {
    stateRef.current = current;
  }, [current]);

  // Split the image into its 3 layers once. Until that is done, the plain image is shown.
  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (cancelled) return;
      try {
        const layers = splitLayers(image);
        [glassRef, particlesRef, ringsRef].forEach((ref, index) => {
          ref.current.width = image.naturalWidth;
          ref.current.height = image.naturalWidth;
          ref.current.getContext('2d').putImageData(layers[index], 0, 0);
        });
        setReady(true);
      } catch {
        // The plain image stays on screen if the browser cannot read it.
      }
    };
    image.src = orbImage;
    return () => {
      cancelled = true;
    };
  }, []);

  // Written straight to the DOM every frame, so a loud voice never causes React re-renders.
  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const speed = { ...MOTION[stateRef.current] };
    let smooth = 0;
    let spin = 0;
    let clock = 0;
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
        // All rings travel clockwise at one speed; a louder voice makes them travel faster.
        spin = (spin + speed.rings * (1 + smooth * 3) * delta) % 360;
        clock += delta;
      }
      const breathing = Math.sin(clock / 1.6) * 0.012;

      if (ringsRef.current) ringsRef.current.style.transform = `rotate(${spin.toFixed(2)}deg)`;
      if (glassRef.current) {
        glassRef.current.style.transform = `rotate(${(Math.sin(clock / 9) * speed.drift * 0.6).toFixed(2)}deg)`;
      }
      if (particlesRef.current) {
        // The core and particles open like a mouth: loud = big, quiet = small.
        const sway = Math.sin(clock / 6 + 1) * speed.drift;
        particlesRef.current.style.transform = `rotate(${sway.toFixed(2)}deg) scale(${(1 + breathing + smooth * 0.12).toFixed(3)})`;
      }
      if (orbRef.current) orbRef.current.style.opacity = speed.brightness.toFixed(3);
      if (scaleRef.current) {
        // The whole orb pops with the voice: louder voice = bigger orb, quieter voice = smaller orb
        scaleRef.current.style.transform = `scale(${(reduceMotion ? 1 : 1 + breathing + smooth * 0.2).toFixed(3)})`;
      }
      if (glowRef.current && name !== 'idle') {
        // overall volume = overall intensity
        glowRef.current.style.opacity = String(name === 'error' ? 0.25 : name === 'processing' ? 0.9 : 0.55 + smooth * 0.45);
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [levelRef]);

  const layerStyle = { transformOrigin: ORIGIN };

  return (
    <div className="relative flex items-center justify-center w-full shrink-0">
      <div ref={glowRef} className={`absolute inset-0 m-auto rounded-full bg-green-500/20 blur-3xl ${current === 'idle' ? 'animate-pulse' : ''} ${ORB_SIZE}`}></div>

      <div ref={scaleRef} className="relative flex items-center justify-center will-change-transform">
        <div ref={orbRef} role="img" aria-label="AI Orb" className={`relative ${ORB_SIZE}`}>
          <div className={STACK} style={{ WebkitMaskImage: EDGE, maskImage: EDGE }}>
            {!ready && <img src={orbImage} alt="" draggable="false" className="absolute inset-0 h-full w-full" />}
            <canvas ref={glassRef} style={layerStyle} className={LAYER} />
            <canvas ref={particlesRef} style={layerStyle} className={LAYER} />
            <canvas ref={ringsRef} style={layerStyle} className={LAYER} />
          </div>
        </div>
      </div>
    </div>
  );
}
