const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24' }

export const ArrowLeft = (p) => <svg {...base} strokeWidth="2" {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
export const Camera = (p) => <svg {...base} strokeWidth="2" {...p}><path d="M4 8h3l2-2h6l2 2h3v11H4z" /><circle cx="12" cy="13" r="3" /></svg>
export const Close = (p) => <svg {...base} strokeWidth="2.4" {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
export const ArrowUp = (p) => <svg {...base} strokeWidth="2.2" {...p}><path d="M12 20V5M5 12l7-7 7 7" /></svg>
export const ChatBubble = (p) => <svg {...base} strokeWidth="2" {...p}><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
