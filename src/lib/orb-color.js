// Mix two [r, g, b] colours. t = 0 gives a, t = 1 gives b.
export const mixRgb = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

// [r, g, b] + alpha -> css colour string
export const rgba = (rgb, alpha = 1) =>
  `rgba(${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])}, ${alpha})`;