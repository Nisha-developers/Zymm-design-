// Line icons for the desktop layout (24px grid, stroke = currentColor).
const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const HomeIcon = (p) => (
  <svg {...base} {...p}><path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" /><path d="M9.5 20v-4.5h5V20" /></svg>
);
export const CompassIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></svg>
);
export const WalletIcon = (p) => (
  <svg {...base} {...p}><rect x="3.5" y="6" width="17" height="13" rx="2.5" /><path d="M3.5 10h17M16 14.5h1.5" /><path d="M6 6l9-2.5 1 2.5" /></svg>
);
export const ChatIcon = (p) => (
  <svg {...base} {...p}><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth="2.2" /></svg>
);
export const HistoryIcon = (p) => (
  <svg {...base} {...p}><path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" /><path d="M3.5 4.5V8H7" /><path d="M12 8v4.2l2.8 1.8" /></svg>
);
export const ShareNodesIcon = (p) => (
  <svg {...base} {...p}><circle cx="18" cy="5.5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="18.5" r="2.5" /><path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1" /></svg>
);
export const HeadphonesIcon = (p) => (
  <svg {...base} {...p}><path d="M4 15v-3a8 8 0 0 1 16 0v3" /><rect x="3.5" y="14" width="4" height="6" rx="1.5" /><rect x="16.5" y="14" width="4" height="6" rx="1.5" /></svg>
);
export const SettingsIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>
);
export const SearchIcon = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const UploadIcon = (p) => (
  <svg {...base} {...p}><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5" /><path d="M4 14v4.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V14" /></svg>
);
export const UserPlusIcon = (p) => (
  <svg {...base} {...p}><circle cx="10" cy="8" r="3.5" /><path d="M3.5 20a6.5 6.5 0 0 1 10-5.5" /><circle cx="17.5" cy="17.5" r="3.5" /><path d="M17.5 16v3M16 17.5h3" /></svg>
);
export const RocketIcon = (p) => (
  <svg {...base} {...p}><path d="M14 4.5c3-1 5.5-1 5.5-1s0 2.5-1 5.5L13 14.5 9.5 11z" /><path d="M9.5 11 6 10.5 8.5 8h4M13 14.5l.5 3.5L16 15.5v-4M6.5 15.5c-1.5.5-2 3-2 3s2.5-.5 3-2" /></svg>
);
export const PlusIcon = (p) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const SparkleIcon = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none"><path d="M10 3.5c.4 3.6 2 5.6 5.5 6.5-3.5.9-5.1 2.9-5.5 6.5-.4-3.6-2-5.6-5.5-6.5 3.5-.9 5.1-2.9 5.5-6.5z" /><path d="M18 13.5c.2 1.8 1 2.8 2.5 3.2-1.5.4-2.3 1.4-2.5 3.3-.2-1.9-1-2.9-2.5-3.3 1.5-.4 2.3-1.4 2.5-3.2z" /></svg>
);
export const WaveIcon = (p) => (
  <svg {...base} {...p}><path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 10.5v3" /></svg>
);
export const SendIcon = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none"><path d="M12 3.5 19.5 20 12 16.2 4.5 20z" /></svg>
);
export const ArrowUpIcon = (p) => (
  <svg {...base} {...p} strokeWidth="2.2"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
);
export const ArrowRightIcon = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ChevronDownIcon = (p) => (
  <svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const NoteIcon = (p) => (
  <svg {...base} {...p}><path d="M4 20V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8l-6 6H6a2 2 0 0 1-2-2z" /><path d="M14 20v-4a2 2 0 0 1 2-2h4M8 9h8M8 13h4" /></svg>
);
export const PersonIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" /></svg>
);
export const ChartIcon = (p) => (
  <svg {...base} {...p}><path d="M4 20h16M6.5 20V10h3v10M10.5 20V5h3v15M14.5 20v-7h3v7" /></svg>
);
export const QuoteIcon = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none"><path d="M5 17.5h4.5V12H7c0-2 .8-3.2 2.5-3.7V6C6.4 6.6 5 8.8 5 12.5zM13.5 17.5H18V12h-2.5c0-2 .8-3.2 2.5-3.7V6c-3.1.6-4.5 2.8-4.5 6.5z" /></svg>
);
export const CloseIcon = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
