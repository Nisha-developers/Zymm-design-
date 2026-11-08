import { useState } from 'react';
import { CaretDown, CaretUp } from './icons';
import { GrayButton, Label, SearchField, SelectBox } from './fields';
import LocationPicker from './LocationPicker';

const AGES = Array.from({ length: 53 }, (_, i) => String(13 + i));

export default function AudienceForm() {
  const [tab, setTab] = useState('new');
  const [ageMin, setAgeMin] = useState('18');
  const [ageMax, setAgeMax] = useState('35');
  const [expand, setExpand] = useState(false);
  const [showOptions, setShowOptions] = useState(true);

  return (
    <section className="px-3 pb-[6px] pt-[2px] md:px-[13px]">
      <h2 className="text-[13px] font-bold text-[#1c1e21]">Audience</h2>

      <div className="mt-[16px] flex border-b border-[#dddfe2] text-[12px]" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'new'}
          onClick={() => setTab('new')}
          className={`-mb-px cursor-pointer border-b-2 px-[7px] pb-[8px] font-bold ${tab === 'new' ? 'border-[#1877f2] text-[#1c1e21]' : 'border-transparent text-[#606770]'}`}
        >
          Create New Audience
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'saved'}
          onClick={() => setTab('saved')}
          className={`-mb-px ml-[14px] flex cursor-pointer items-center gap-[5px] border-b-2 px-[7px] pb-[8px] ${tab === 'saved' ? 'border-[#1877f2] font-bold text-[#1c1e21]' : 'border-transparent text-[#606770]'}`}
        >
          Use Saved Audience <CaretDown size={8} />
        </button>
      </div>

      {/* Custom audiences */}
      <div className="mt-[21px] flex items-center justify-between">
        <Label>Custom Audiences</Label>
        <button type="button" className="flex cursor-pointer items-center gap-[6px] pr-[11px] text-[12px] text-[#4b4f56]">
          Create New <CaretDown size={8} />
        </button>
      </div>
      <SearchField placeholder="Search existing audiences" className="mt-[4px]" />
      <GrayButton className="mt-[10px]">Exclude</GrayButton>

      {/* Locations */}
      <Label className="mt-[16px] mb-[5px]">Locations</Label>
      <LocationPicker />

      {/* Age */}
      <Label className="mt-[10px] mb-[6px]">Age</Label>
      <div className="flex gap-[5px]">
        <SelectBox ariaLabel="Minimum age" value={ageMin} onChange={setAgeMin} options={AGES} className="w-[72px]" />
        <SelectBox ariaLabel="Maximum age" value={ageMax} onChange={setAgeMax} options={AGES} className="w-[70px]" />
      </div>

      {/* Gender */}
      <Label className="mt-[13px]">Gender</Label>
      <p className="mt-[5px] text-[12px] leading-[15px] text-[#1c1e21]">All genders</p>

      {/* Detailed targeting */}
      <Label className="mt-[14px]">Detailed Targeting</Label>
      <Label small info className="mt-[1px] !text-[#4b4f56]">Include people who match</Label>
      <SearchField
        placeholder="Add demographics, interests or behaviors"
        className="mt-[7px] !h-[28px]"
        right={
          <span className="flex shrink-0 gap-[6px] text-[11.5px] text-[#606770]">
            <span>Suggestions</span>
            <button type="button" className="cursor-pointer text-[#1c1e21]">Browse</button>
          </span>
        }
      />
      <GrayButton className="mt-[9px]">Exclude</GrayButton>

      {/* Expansion */}
      <Label small info className="mt-[8px] !text-[#4b4f56]">Detailed Targeting Expansion</Label>
      <label className="mt-[2px] flex cursor-pointer items-start gap-[7px] text-[12px] leading-[16px] text-[#1c1e21]">
        <input type="checkbox" checked={expand} onChange={(e) => setExpand(e.target.checked)} className="peer sr-only" />
        <span className="mt-[2px] flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[3px] border border-[#bec3c9] bg-white peer-checked:border-[#1877f2] peer-checked:bg-[#1877f2] peer-focus-visible:ring-2 peer-focus-visible:ring-[#1877f2]/40 [&>svg]:hidden peer-checked:[&>svg]:block">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2.5 6.2 2.4 2.3 4.6-5" /></svg>
        </span>
        Reach people beyond your detailed targeting selections when it&apos;s likely to improve performance.
      </label>

      {/* Languages */}
      <Label className="mt-[11px]">Languages</Label>
      <p className="mt-[5px] text-[12px] leading-[15px] text-[#1c1e21]">All languages</p>

      <div className="mt-[6px] border-t border-[#dddfe2]" />
      <button
        type="button"
        onClick={() => setShowOptions((v) => !v)}
        className="mt-[13px] flex cursor-pointer items-center gap-[5px] text-[12px] leading-[15px] text-[#365899]"
      >
        {showOptions ? 'Hide Options' : 'Show More Options'} {showOptions ? <CaretUp size={8} /> : <CaretDown size={8} />}
      </button>

      {showOptions && (
        <div>
          <Label className="mt-[15px]">Connections</Label>
          <p className="mt-[6px] text-[12px] leading-[15px] text-[#1c1e21]">All people</p>
        </div>
      )}

      <div className="mt-[16px] border-t border-[#dddfe2]" />
      <GrayButton className="mt-[16px]">Save This Audience</GrayButton>
    </section>
  );
}