import { useEffect, useState } from 'react';
import { ParticlesOrb } from './particles-orb/particles-orb';

// AssistantPage states -> ParticlesOrb states
const STATE_MAP = {
  idle: 'idle',
  connecting: 'connecting',
  listening: 'listening',
  processing: 'thinking',
  thinking: 'thinking',
  speaking: 'speaking',
  error: 'error',
  disabled: 'disabled',
};

// Teal is the dominant particle tone; the renderer supplies the full teal palette.
const EMERALD = '#2D8583';
const NEON = '#36A49F';

const calcSize = (compact) =>
  Math.round(Math.max(
    compact ? 180 : 220,
    Math.min(window.innerWidth * 0.94, window.innerHeight * (compact ? 0.42 : 0.58), compact ? 460 : 540),
  ));

function useOrbSize(compact) {
  const [size, setSize] = useState(() => calcSize(compact));
  useEffect(() => {
    const onResize = () => setSize(calcSize(compact));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [compact]);
  return size;
}

export default function Orb({ state = 'idle', levelRef, compact = false }) {
  const size = useOrbSize(compact);
  const orbState = STATE_MAP[state] ?? 'idle';

  return (
    <div className="relative flex w-full shrink-0 items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute inset-0">
          <ParticlesOrb
            state={orbState}
            size={size}
            speed={1}
            colorFrom={EMERALD}
            colorTo={NEON}
            levelRef={levelRef}
            label="Zymm assistant orb"
          />
        </div>
      </div>
    </div>
  );
}