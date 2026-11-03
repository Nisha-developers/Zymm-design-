import { useEffect, useRef } from 'react';
import orbImage from '../assets/download.png';

// The orb is your image, untouched. It is shown 3 times, each copy cut out with a soft mask:
// Layer 3 = the outer band with the rings, Layer 2 = the inside, Layer 1 = the white core.
// The orb itself never rotates; only the ring band travels clockwise, and the inside barely moves.
// rings: how fast the ring band travels clockwise (degrees per second)
// sway: how far the inside drifts (degrees), always much less than the rings
const MOTION = {
  idle: { rings: 2.5, sway: 1.5, brightness: 1 },
  listening: { rings: 3.5, sway: 2, brightness: 1 },
  processing: { rings: 9, sway: 2.5, brightness: 1 },
  speaking: { rings: 4, sway: 2, brightness: 1 },
  error: { rings: 0.5, sway: 0.5, brightness: 0.45 },
};

// Where the sphere sits inside download.png (500x500): centre and edge, measured from the file.
const CENTRE = '49.3% 49.7%';
const mask = (stops) => {
  const gradient = `radial-gradient(circle closest-side at ${CENTRE}, ${stops})`;
  return { WebkitMaskImage: gradient, maskImage: gradient, transformOrigin: CENTRE };
};
// The edge fades out just inside the outer line, so the line is gone and the rings blend into the page.
// The inside reaches the edge underneath the ring band, so there is never a gap between the two.
const RING_BAND = mask('transparent 44%, #000 56%, #000 77%, transparent 84%');
const INSIDE = mask('#000 0%, #000 77%, transparent 84%');
const CORE = { ...mask('#000 0%, #000 8%, transparent 26%'), mixBlendMode: 'screen' };

// Sized from the screen, so the orb always fits without scrolling.
const ORB_SIZE = 'h-[min(72vw,42dvh,420px)] w-[min(72vw,42dvh,420px)] lg:h-[min(420px,46dvh)] lg:w-[min(420px,46dvh)] [@media(max-height:500px)]:h-[30dvh] [@media(max-height:500px)]:w-[30dvh]';
// The sphere fills 84% of the image, so the image is drawn larger to make the sphere fill the orb area.
const IMAGE = 'pointer-events-none absolute left-[-9.2%] top-[-9.4%] h-[119.6%] w-[119.6%] max-w-none select-none';

export default function Orb({ isListening = true, state, levelRef }) {
  const current = state ?? (isListening ? 'listening' : 'processing');
  const scaleRef = useRef(null);
  const glowRef = useRef(null);
  const orbRef = useRef(null);
  const ringsRef = useRef(null);
  const insideRef = useRef(null);
  const coreRef = useRef(null);
  const stateRef = useRef(current);

  useEffect(() => {
    stateRef.current = current;
  }, [current]);

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
        // A louder voice makes the rings travel faster.
        spin = (spin + speed.rings * (1 + smooth * 3) * delta) % 360;
        clock += delta;
      }
      const breathing = Math.sin(clock / 1.6) * 0.012;

      if (ringsRef.current) ringsRef.current.style.transform = `rotate(${spin.toFixed(2)}deg)`;
      if (insideRef.current) {
        const sway = Math.sin(clock / 7) * speed.sway;
        insideRef.current.style.transform = `rotate(${sway.toFixed(2)}deg) scale(${(1 + breathing + smooth * 0.06).toFixed(3)})`;
      }
      if (coreRef.current) {
        // The core opens like a mouth: loud = big and bright, quiet = small and soft.
        coreRef.current.style.transform = `scale(${(1 + breathing * 2 + smooth * 0.35).toFixed(3)})`;
        coreRef.current.style.opacity = String((0.2 + smooth * 0.8).toFixed(3));
      }
      if (orbRef.current) orbRef.current.style.opacity = speed.brightness.toFixed(3);
      if (scaleRef.current) {
        // louder voice = bigger orb, quieter voice = smaller orb
        scaleRef.current.style.transform = `scale(${(reduceMotion ? 1 : 1 + breathing + smooth * 0.18).toFixed(3)})`;
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

  return (
    <div className="relative flex items-center justify-center w-full shrink-0">
      <div ref={glowRef} className={`absolute inset-0 m-auto rounded-full bg-green-500/20 blur-3xl ${current === 'idle' ? 'animate-pulse' : ''} ${ORB_SIZE}`}></div>

      <div ref={scaleRef} className="relative flex items-center justify-center will-change-transform">
        <div ref={orbRef} role="img" aria-label="AI Orb" className={`relative ${ORB_SIZE}`}>
          <img src={orbImage} alt="" draggable="false" ref={insideRef} style={INSIDE} className={`${IMAGE} will-change-transform`} />
          <img src={orbImage} alt="" draggable="false" ref={ringsRef} style={RING_BAND} className={`${IMAGE} will-change-transform`} />
          <img src={orbImage} alt="" draggable="false" ref={coreRef} style={CORE} className={`${IMAGE} will-change-transform`} />
        </div>
      </div>
    </div>
  );
}
