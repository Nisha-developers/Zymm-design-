import { FolderIcon, SearchIcon } from './icons';

const OutlineGrid = ({ size = 12, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" className={className} aria-hidden="true">
    <rect x="0.5" y="0.5" width="4.5" height="4.5" rx="0.8" />
    <rect x="7" y="0.5" width="4.5" height="4.5" rx="0.8" />
    <rect x="0.5" y="7" width="4.5" height="4.5" rx="0.8" />
    <rect x="7" y="7" width="4.5" height="4.5" rx="0.8" />
  </svg>
);

const ROWS = [
  { id: 'campaign', label: 'New campaign', icon: <FolderIcon size={16} />, indent: 0 },
  { id: 'jobsearch', label: 'New Job search', icon: <OutlineGrid size={12} />, indent: 57 },
  { id: 'job', label: 'Job search', icon: <SearchIcon size={17} />, indent: 96 },
];

export default function CampaignTree() {
  return (
    <nav aria-label="Campaign structure" className="bg-white pl-2 pr-4 pt-8">
      {ROWS.map(({ id, label, icon, indent }) => (
        <div
          key={id}
          className="flex h-[43px] items-center gap-[7px] text-[14px] font-medium text-[#6e6e6e]"
          style={{ paddingLeft: indent }}
        >
          <span className="flex w-[17px] shrink-0 items-center justify-center">{icon}</span>
          <span className="whitespace-nowrap">{label}</span>
        </div>
      ))}
    </nav>
  );
}
