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
  const [expMax, setExpMax] = useState('0');
  const [reachOut, setReachOut] = useState(false);
  const [ex1, setEx1] = useState(false);
  const [ex2, setEx2] = useState(false);

  return (
    <section className="pb-10 text-[#1c1c1c]">
      {/* ---------- Part 1 ---------- */}
      <h2 className="px-[15px] pb-[10px] pt-[2px] text-[16px] font-medium">Audience</h2>
      <div className="border-t border-[#dcdcdc]" />

      <div className="px-[15px]">
        <div className="mt-[12px] flex items-center gap-24" role="tablist">
          <button type="button" role="tab" className="cursor-pointer text-[17px] font-medium">Create new search</button>
          <button type="button" role="tab" className="cursor-pointer text-[17px] font-medium">Use Saved Search</button>
        </div>

        <FieldLabel className="mt-[6px]">Job title</FieldLabel>
        <input type="text" placeholder="Enter career here" className={`${inputCls} mt-[4px]`} />
        <FieldLabel className="mt-[10px]">Job title 2</FieldLabel>
        <input type="text" placeholder="Enter career here" className={`${inputCls} mt-[4px]`} />
        <FieldLabel className="mt-[10px]">Job title 3</FieldLabel>
        <input type="text" placeholder="Enter career here" className={`${inputCls} mt-[4px]`} />
      </div>

      <div className="mt-[18px] border-t border-[#dcdcdc]" />

      {/* ---------- Part 2 ---------- */}
      <div className="px-[15px]">
        <FieldLabel className="mt-[18px]">Locations</FieldLabel>
        <div className="mt-[8px] rounded-[2px] bg-[#f4f4f4] px-[12px] pb-[18px] pt-[16px]">
          <FieldLabel>Country</FieldLabel>
          <input type="text" defaultValue="United States" className={`${inputCls} mt-[8px] !h-[38px] text-[#222]`} />
        </div>
        <button
          type="button"
          aria-label="Add another location"
          className="mt-[14px] flex h-[34px] w-full cursor-pointer items-center rounded-[2px] border border-[#e0e0e0] bg-white pl-[88px] text-[#666]"
        >
          <CaretDown size={11} />
        </button>
        <button type="button" className="mt-[8px] cursor-pointer text-[14px] font-medium text-[#4aa3e6]">Add up to 3 Locations</button>

        <FieldLabel strong className="mt-[26px]">Experience</FieldLabel>
        <div className="mt-[8px] flex w-fit items-center rounded-[4px] border border-[#dcdcdc] bg-white">
          <ExpSelect ariaLabel="Minimum experience" value={expMin} onChange={setExpMin} />
          <span className="h-[28px] w-px bg-[#dcdcdc]" />
          <ExpSelect ariaLabel="Maximum experience" value={expMax} onChange={setExpMax} />
        </div>

        <FieldLabel className="mt-[22px]">Parameters</FieldLabel>
        <input type="text" className={`${inputCls} mt-[8px]`} />

        <FieldLabel className="mt-[20px]">Detailed Targeting</FieldLabel>
        <input type="text" className={`${inputCls} mt-[8px]`} />

        {/* Added: Exclusions field (sits between image 2 and image 3) */}
        <FieldLabel className="mt-[20px]">Exclusions</FieldLabel>
        <input type="text" className={`${inputCls} mt-[8px]`} />
      </div>

      {/* ---------- Part 3 ---------- */}
      <div className="px-[15px]">
        <FieldLabel strong className="mt-[22px]">Include</FieldLabel>
        <div className="mt-[8px]">
          <Check checked={reachOut} onChange={setReachOut} ariaLabel="Have Zymm reach out to recruiters">
            <span className="max-w-[560px] text-[#555]">
              Have Zymm reach out to recruiters discovered on your behalf in order to help boost your chances.
            </span>
          </Check>
        </div>

        <div className="mt-[20px] rounded-[2px] bg-[#f4f4f4] px-[16px] pb-[12px] pt-[18px]">
          <label htmlFor="skills" className="text-[14px] text-[#1c1c1c]">
            Skills <span className="ml-1 text-[11px] text-[#5bd0f0]">(Be sure to separate with comma &quot;,&quot;)</span>
          </label>
          <input id="skills" type="text" className={`${inputCls} mt-[10px]`} />
        </div>

        <FieldLabel strong className="mt-[14px]">Exclude</FieldLabel>
        <input type="text" className={`${inputCls} mt-[8px] max-w-[460px]`} />

        <div className="mt-[22px] flex flex-wrap items-center gap-x-[28px] gap-y-3">
          <Check checked={ex1} onChange={setEx1} ariaLabel="Exclude option one">Exclude</Check>
          <Check checked={ex2} onChange={setEx2} ariaLabel="Exclude option two">Exclude</Check>
        </div>
      </div>

      <div className="mt-[20px] border-t border-[#dff0f0]" />
      <div className="px-[15px]">
        <div className="mt-[16px]">
          <input type="text" aria-label="Extra field" className={`${inputCls} !h-[38px] !w-[142px]`} />
        </div>
      </div>
      <div className="mt-[16px] border-t border-[#e8e8e8]" />

      <div className="px-[15px]">
        <FieldLabel className="mt-[14px]">Interests</FieldLabel>
        <input type="text" className={`${inputCls} mt-[8px]`} />
      </div>
    </section>
  );
}
