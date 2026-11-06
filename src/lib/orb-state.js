export const STATE_NAMES = ['idle', 'connecting', 'listening', 'thinking', 'speaking', 'error', 'disabled'];

// Colours the orb fades toward in the error state
export const ERROR_COLOR_FROM = '#ff6b6b';
export const ERROR_COLOR_TO = '#ff1744';

export const clamp01 = (v) => Math.min(1, Math.max(0, v));

// '#rgb' or '#rrggbb' -> [r, g, b]. Falls back to white if invalid.
export const hexToRgb = (hex) => {
  let h = String(hex ?? '').trim().replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) return [255, 255, 255];
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

// Weighted average of every numeric setting across the states.
// weights = { idle: 0.2, listening: 0.8, ... } and they add up to 1.
export const blendStates = (weights, states) => {
  const out = {};
  for (const key of Object.keys(states.idle)) out[key] = 0;
  for (const name of STATE_NAMES) {
    const w = weights[name] || 0;
    if (w < 0.0005) continue;
    const s = states[name];
    for (const key of Object.keys(out)) out[key] += s[key] * w;
  }
  return out;
};

// CSS variables put on the orb's wrapper element
export const orbVars = ({ size, speed, colorFrom, colorTo }) => ({
  '--orb-size': `${size}px`,
  '--orb-speed': String(speed),
  '--orb-from': colorFrom,
  '--orb-to': colorTo,
});