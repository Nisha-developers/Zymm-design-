const TABS = [
  { id: 'edit', label: 'Edit' },
  { id: 'review', label: 'Review' },
];

export default function TopBar({ tab, onTab }) {
  return (
    <header className="bg-white pb-[10px] pt-[26px]">
      <div className="flex justify-center gap-[34px] text-[15px] text-[#111] md:justify-start md:pl-[188px]" role="tablist">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => onTab(id)}
            className={`cursor-pointer ${tab === id ? 'font-medium' : 'font-normal'}`}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}
