const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const FolderIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" {...line} className={className} aria-hidden="true">
    <path d="M1.5 4.5a1 1 0 0 1 1-1h3.2l1.3 1.5h6.5a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1z" />
  </svg>
);

export const GridIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
    <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" />
    <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" />
    <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" />
    <rect x="9" y="9" width="5.5" height="5.5" rx="1" />
  </svg>
);

export const AdIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" {...line} className={className} aria-hidden="true">
    <rect x="3" y="1.8" width="10" height="12.4" rx="1.5" />
    <path d="M3 5h10" />
  </svg>
);

export const SearchIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" {...line} strokeWidth="1.6" className={className} aria-hidden="true">
    <circle cx="7" cy="7" r="4.6" />
    <path d="M10.5 10.5 14 14" />
  </svg>
);

export const InfoIcon = ({ size = 11, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="currentColor" />
    <rect x="7.1" y="7" width="1.8" height="5" rx=".6" fill="#fff" />
    <circle cx="8" cy="4.8" r="1.1" fill="#fff" />
  </svg>
);

export const CaretDown = ({ size = 8, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor" className={className} aria-hidden="true">
    <path d="M1 3h8L5 7.5z" />
  </svg>
);

export const CaretUp = ({ size = 8, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor" className={className} aria-hidden="true">
    <path d="M1 7h8L5 2.5z" />
  </svg>
);

export const ChevronRight = ({ size = 10, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" {...line} strokeWidth="1.4" className={className} aria-hidden="true">
    <path d="M3.5 1.5 7 5 3.5 8.5" />
  </svg>
);

export const PencilIcon = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" {...line} className={className} aria-hidden="true">
    <path d="M10.5 2.5 13.5 5.5 5.5 13.5 2 14l.5-3.5z" />
    <path d="m9 4 3 3" />
  </svg>
);

export const EyeIcon = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" {...line} className={className} aria-hidden="true">
    <path d="M1 8s2.5-4.5 7-4.5S15 8 15 8s-2.5 4.5-7 4.5S1 8 1 8z" />
    <circle cx="8" cy="8" r="2" />
  </svg>
);

export const DotsIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
    <circle cx="3" cy="8" r="1.2" />
    <circle cx="8" cy="8" r="1.2" />
    <circle cx="13" cy="8" r="1.2" />
  </svg>
);

export const PanelIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden="true">
    <rect x="1.8" y="2.3" width="12.4" height="11.4" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <rect x="2.5" y="3" width="4" height="10" rx="1" fill="currentColor" />
  </svg>
);

export const ShieldCheck = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden="true">
    <path d="M8 1 2.5 3v4.2c0 3.3 2.3 6 5.5 7.8 3.2-1.8 5.5-4.5 5.5-7.8V3z" fill="#42a65a" />
    <path d="m5.3 8 2 2 3.5-3.7" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PinIcon = ({ size = 11, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden="true">
    <path d="M8 1.2a4.6 4.6 0 0 0-4.6 4.6C3.4 9.4 8 14.8 8 14.8s4.6-5.4 4.6-9A4.6 4.6 0 0 0 8 1.2z" fill="#42a65a" />
    <circle cx="8" cy="5.8" r="1.7" fill="#fff" />
  </svg>
);