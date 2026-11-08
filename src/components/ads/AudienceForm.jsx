import { useState } from 'react';
import { CaretDown } from './icons';

const NUMS = Array.from({ length: 31 }, (_, i) => String(i));

const inputCls =
  'h-[40px] w-full rounded-[4px] border border-[#dcdcdc] bg-white px-3 text-[14px] text-[#222] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] outline-none placeholder:text-[#c4c4c4] focus:border-[#1877f2]';

function FieldLabel({ children, strong = false, className = '' }) {
  return (
    <label className={`block text-[14px] leading-[18px] ${strong ? 'text-[#1c1c1c]' : 'text-[#555]'} ${className}`}>
      {children}
    </label>
  );
}

function Check({ checked, onChange, children, ariaLabel }) {
  return (
    <label className="flex cursor-pointer items-center gap-4 text-[14px] leading-[20px] text-[#555]">
      <input type="checkbox" aria-label={ariaLabel} checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[4px] border border-[#dcdcdc] bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] peer-checked:border-[#1877f2] peer-checked:bg-[#1877f2] peer-focus-visible:ring-2 peer-focus-visible:ring-[#1877f2]/40 [&>svg]:hidden peer-checked:[&>svg]:block">
        <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m2.5 6.2 2.4 2.3 4.6-5" />
        </svg>
      </span>
      {children}
    </label>
  );
}

function ExpSelect({ value, onChange, ariaLabel }) {
  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[38px] w-[82px] cursor-pointer appearance-none bg-transparent pl-[16px] pr-8 text-[18px] text-[#222] outline-none"
      >
        {NUMS.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      <CaretDown size={10} className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 text-[#666]" />
    </div>
  );
}

export default function AudienceForm() {
  const [expMin, setExpMin] = useState('0');