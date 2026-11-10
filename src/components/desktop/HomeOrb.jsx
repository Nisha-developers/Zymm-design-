import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParticlesOrb } from '../particles-orb/particles-orb';
import { simulateLevel } from '../../lib/voice';

// Scales with the window height so the whole home screen fits in one viewport.
const sizeFor = () => Math.round(Math.min(170, Math.max(96, window.innerHeight * 0.16)));

// The desktop home orb runs in the "listening" state with a simulated voice level,
// so it spins and ripples exactly like it does while someone is talking to Zymm.
export default function HomeOrb() {
  const navigate = useNavigate();
  const levelRef = useRef(0);
  const [size, setSize] = useState(sizeFor);

  useEffect(() => {
    const onResize = () => setSize(sizeFor());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const stop = simulateLevel((level) => {
      levelRef.current = level * 0.6; // a little calmer than a real voice
    });
    return stop;
  }, []);

  return (
    <button
      type="button"
      onClick={() => navigate('/assistant', { state: { conversationId: null } })}
      aria-label="Talk to Zymm"
      className="shrink-0 cursor-pointer rounded-full transition-transform duration-300 hover:scale-[1.04]"
    >
      <ParticlesOrb
        state="listening"
        size={size}
        speed={1}
        colorFrom="#2D8583"
        colorTo="#36A49F"
        levelRef={levelRef}
        dotThickness={0.7}
        brightness={0.7}
        label="Zymm assistant orb"
      />
    </button>
  );
}
