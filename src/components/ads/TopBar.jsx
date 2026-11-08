import { AdIcon, ChevronRight, DotsIcon, EyeIcon, FolderIcon, GridIcon, PanelIcon, PencilIcon } from './icons';

export default function TopBar({ onToggleTree, isDraft, onToggleDraft, tab, onTab }) {
  return (
    <header className="px-[10px] pt-[14px]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-[10px]">
          <button
            type="button"
            onClick={onToggleTree}
            aria-label="Toggle campaign tree"
            className="flex h-[34px] w-[34px] shrink-0 cursor-pointer items-center justify-center rounded-md border border-[#dddfe2] bg-[#f2f3f5] text-[#4b4f56]"
          >
            <PanelIcon size={15} />
          </button>
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-[10px] overflow-x-auto text-[12px] text-[#606770] [scrollbar-width:none]">
            <span className="flex shrink-0 items-center gap-[6px] whitespace-nowrap"><FolderIcon size={14} />New Campaign</span>
            <ChevronRight className="shrink-0 text-[#8d949e]" />
            <span className="flex shrink-0 items-center gap-[6px] whitespace-nowrap rounded bg-[#e7f0fd] px-[6px] py-[4px] font-medium text-[#1877f2]"><GridIcon size={14} />New Ad Set</span>
            <ChevronRight className="shrink-0 text-[#8d949e]" />
            <span className="flex shrink-0 items-center gap-[6px] whitespace-nowrap"><AdIcon size={14} />1 Ad</span>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden items-center gap-[6px] text-[11px] text-[#606770] sm:flex">
            <span className="h-[6px] w-[6px] rounded-full border border-[#42a65a]" />
            In Draft
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={isDraft}
            aria-label="Draft status"
            onClick={onToggleDraft}
            className={`relative h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full transition-colors ${isDraft ? 'bg-[#1877f2]' : 'bg-[#bec3c9]'}`}
          >
            <span className={`absolute top-[2px] left-[2px] h-[14px] w-[14px] rounded-full bg-white shadow transition-transform ${isDraft ? 'translate-x-[14px]' : ''}`} />
          </button>
          <button
            type="button"
            aria-label="More options"
            className="flex h-[30px] w-[34px] cursor-pointer items-center justify-center rounded-md bg-[#e4e6eb] text-[#4b4f56]"
          >
            <DotsIcon size={14} />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-6 text-[12px] font-medium" role="tablist">
        {[
          { id: 'edit', label: 'Edit', Icon: PencilIcon },
          { id: 'review', label: 'Review', Icon: EyeIcon },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => onTab(id)}
            className={`flex cursor-pointer items-center gap-[6px] border-b-2 px-[10px] pb-[6px] pt-[2px] ${
              tab === id ? 'border-[#1877f2] text-[#1877f2]' : 'border-transparent text-[#606770]'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}