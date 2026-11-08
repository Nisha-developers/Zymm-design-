import { useState } from 'react';
import { CaretDown, PinIcon, SearchIcon, ShieldCheck } from './icons';
import { SelectBox } from './fields';

const MODES = [
  'People living in or recently in this location',
  'People living in this location',
  'People recently in this location',
  'People traveling in this location',
];

export default function LocationPicker() {
  const [mode, setMode] = useState(MODES[0]);

  return (
    <div>
      <SelectBox ariaLabel="Location type" value={mode} onChange={setMode} options={MODES} className="[&_select]:h-[28px]" />

      <div className="mt-[7px] overflow-hidden rounded-[3px] border border-[#ccd0d5] bg-[#f0f2f5]">
        <div className="px-[10px] pb-[7px] pt-[11px] text-[12px] leading-[15px] text-[#1c1e21]">United States</div>
        <div className="mx-[10px] mb-[10px] flex h-[31px] items-center gap-2 rounded-[3px] bg-white px-[9px] text-[12px] text-[#1c1e21] shadow-[0_0_0_1px_#e4e6eb]">
          <ShieldCheck />
          United States
        </div>
        <div className="flex h-[29px] items-center gap-2 border-t border-[#ccd0d5] bg-white px-[9px] text-[12px]">
          <PinIcon />
          <span className="flex items-center gap-[5px] text-[#1c1e21]">
            Include <CaretDown size={7} className="text-[#4b4f56]" />
          </span>
          <SearchIcon size={13} className="text-[#4b4f56]" />
          <input
            type="text"
            placeholder="Search Locations"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#606770]"
          />
          <button type="button" className="cursor-pointer text-[#4b4f56]">Browse</button>
        </div>
      </div>

      <button type="button" className="mt-[3px] cursor-pointer text-[10.5px] leading-[15px] text-[#365899]">Add Locations in Bulk</button>
    </div>
  );
}