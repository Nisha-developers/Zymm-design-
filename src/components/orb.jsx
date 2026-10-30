import { useEffect, useRef } from 'react';
import orbImage from '../assets/download.png';

// idle: slow spin + gentle breathing | listening: reacts to your voice | processing: fast swirl | speaking: reacts to Zymm's voice | error: dim, still
const SPIN = {
  idle: 'animate-[spin_20s_linear_infinite]',
  listening: 'animate-[spin_12s_linear_infinite]',
  processing: 'animate-[spin_3s_linear_infinite]',
  speaking: 'animate-[spin_8s_linear_infinite]',
  error: '',
};

export default function Orb({ isListening = true, isChatStarted = false, state, levelRef }) {
  const current = state ?? (isListening ? 'listening' : 'processing');
  const scaleRef = useRef(null);
  const glowRef = useRef(null);

  // Written straight to the DOM every frame, so a loud voice never causes React re-renders.
  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const reactive = current === 'listening' || current === 'speaking';
    const startedAt = performance.now();
    let smooth = 0;
    let raf;
    const frame = (now) => {
      smooth += ((reactive ? (levelRef?.current ?? 0) : 0) - smooth) * 0.2;
      const breathing = current === 'idle' ? Math.sin((now - startedAt) / 1200) * 0.02 : 0;
      if (scaleRef.current) {
        // louder voice = bigger orb, quieter voice = smaller orb
        scaleRef.current.style.transform = `scale(${(reduceMotion ? 1 : 1 + breathing + smooth * 0.18).toFixed(3)})`;
      }
      if (glowRef.current && current !== 'idle') {
        // overall volume = overall intensity
        glowRef.current.style.opacity = String(current === 'error' ? 0.25 : current === 'processing' ? 0.9 : 0.55 + smooth * 0.45);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [current, levelRef]);

  return (
    <div className="relative flex items-center justify-center w-full py-2 shrink-0">
      <div ref={glowRef} className={`absolute inset-0 m-auto rounded-full bg-green-500/20 blur-3xl ${current === 'idle' ? 'animate-pulse' : ''} transition-[width,height] duration-500 ${isChatStarted ? 'w-[140px] h-[140px]' : 'w-[300px] h-[300px] lg:w-[360px] lg:h-[360px]'}`}></div>

      <div ref={scaleRef} className="relative flex items-center justify-center will-change-transform">
        <div className={`relative flex items-center justify-center rounded-full transition-[width,height] duration-500 ${isChatStarted ? 'h-[160px] w-[160px]' : 'h-[320px] w-[320px] lg:h-[380px] lg:w-[380px]'} ${SPIN[current] ?? ''}`}>
          <img
            src={orbImage}
            alt="AI Orb"
            className="block h-full w-full object-contain drop-shadow-[0_0_35px_rgba(34,197,94,0.6)]"
          />
        </div>
      </div>
    </div>
  );
}
