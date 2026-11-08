import { CaretDown, InfoIcon, SearchIcon } from './icons';

export function Label({ children, info = false, small = false, className = '' }) {
  return (
    <div className={`flex items-center gap-[5px] font-bold leading-[15px] text-[#1c1e21] ${small ? 'text-[11px]' : 'text-[12px]'} ${className}`}>
      {children}
      {info && <InfoIcon className="text-[#4b4f56]" />}
    </div>
  );
}

export function GrayButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`h-[27px] cursor-pointer rounded-[3px] bg-[#ebedf0] px-3 text-[12px] font-medium leading-[27px] text-[#4b4f56] hover:bg-[#e1e3e7] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SearchField({ placeholder, right, className = '' }) {
  return (
    <label className={`flex h-[30px] items-center gap-2 rounded-[3px] border border-[#ccd0d5] bg-white px-[10px] ${className}`}>
      <SearchIcon size={14} className="shrink-0 text-[#4b4f56]" />
      <input
        type="text"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[12px] text-[#1c1e21] outline-none placeholder:text-[#606770]"
      />
      {right}
    </label>
  );
}

export function SelectBox({ value, onChange, options, className = '', ariaLabel }) {
  return (
    <div className={`relative ${className}`}>
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[28px] w-full cursor-pointer appearance-none rounded-[3px] border border-[#ccd0d5] bg-white pl-[10px] pr-7 text-[12px] text-[#1c1e21] outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <CaretDown size={8} className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 text-[#4b4f56]" />
    </div>
  );
}