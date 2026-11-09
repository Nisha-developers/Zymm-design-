import { AdIcon, DotsIcon, FolderIcon, GridIcon } from './icons';

const ROWS = [
  { id: 'campaign', label: 'New Campaign', icon: FolderIcon, indent: 0, bg: 'bg-[#f2f7ea]', color: 'text-[#4b4f56]' },
  { id: 'adset', label: 'New Ad Set', icon: GridIcon, indent: 1, bg: 'bg-[#e6eefa]', color: 'text-[#1877f2]' },
  { id: 'ad', label: 'New Ad', icon: AdIcon, indent: 2, bg: 'bg-[#f2f7ea]', color: 'text-[#4b4f56]' },
];

export default function CampaignTree() {
  return (
    <nav aria-label="Campaign structure" className="pt-5 md:pl-[26px] md:pt-[26px]">
      {ROWS.map(({ id, label, icon: Icon, indent, bg, color }) => (
        <div key={id} className={`flex h-[38px] items-center justify-between pr-4 md:pr-[17px] ${bg}`}>
          <div className="flex items-center gap-[7px] text-[13px]" style={{ paddingLeft: 7 + indent * 14 }}>
            <Icon size={14} className={id === 'adset' ? 'text-[#1877f2]' : 'text-[#4b4f56]'} />
            <span className={color}>{label}</span>
          </div>
          <button type="button" aria-label={`${label} options`} className="cursor-pointer text-[#8d949e]">
            <DotsIcon size={14} />
          </button>
        </div>
      ))}
    </nav>
  );
}