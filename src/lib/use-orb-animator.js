import { useEffect, useRef } from 'react';
import { clamp01, STATE_NAMES } from './orb-state';

const EASE = 6;           // state crossfade speed (higher = faster)
const LEVEL_ATTACK = 18;  // how fast the voice level rises
const LEVEL_RELEASE = 8;  // how fast it falls

const oneHot = (state) => {
  const w = {};
  for (const n of STATE_NAMES) w[n] = n === state ? 1 : 0;
  return w;
};

export function useOrbAnimator(hostRef, { state = 'idle', levelRef, speed = 1, onFrame } = {}) {
  const frameRef = useRef(null);
  if (frameRef.current === null) {
    frameRef.current = { weights: oneHot(state), phase: 0, level: 0, reduced: false, dt: 0 };
  }

  const stateRef = useRef(state);
  const speedRef = useRef(speed);
  const onFrameRef = useRef(onFrame);

  useEffect(() => {
    stateRef.current = STATE_NAMES.includes(state) ? state : 'idle';
  }, [state]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);
  useEffect(() => {
    onFrameRef.current = onFrame;
  }, [onFrame]);

  useEffect(() => {
    const frame = frameRef.current;
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    frame.reduced = !!mq?.matches;
    const onMotionChange = (e) => {
      frame.reduced = e.matches;
    };
    mq?.addEventListener?.('change', onMotionChange);

    let last = performance.now();
    let raf;

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const current = stateRef.current;

      // Crossfade the state weights toward the current state
      const k = 1 - Math.exp(-EASE * dt);
      for (const n of STATE_NAMES) {
        frame.weights[n] += ((n === current ? 1 : 0) - frame.weights[n]) * k;
      }

      // Voice level only matters while listening or speaking
      const live = current === 'listening' || current === 'speaking';
      const target = live ? clamp01(levelRef?.current ?? 0) : 0;
      const rate = target > frame.level ? LEVEL_ATTACK : LEVEL_RELEASE;
      frame.level += (target - frame.level) * (1 - Math.exp(-rate * dt));

      // Reduced motion freezes the animation clock
      frame.dt = frame.reduced ? 0 : dt;
      frame.phase += frame.dt * speedRef.current;

      onFrameRef.current?.(frame);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      mq?.removeEventListener?.('change', onMotionChange);
    };
  }, [levelRef, hostRef]);

  return { frameRef };
}