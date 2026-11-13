import { SUGGESTIONS } from '../../data/knowledge'

export default function SuggestionChips({ used, onPick }) {
  return (
    <div className="mb-1 mt-3.5 flex flex-wrap gap-2.5 px-3 md:mt-5 md:px-2">
      {SUGGESTIONS.map((s, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onPick(s, i)}
          className={`rounded-full border px-[13px] py-[9px] text-[13px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            used.includes(i) ? 'border-panel bg-panel' : 'border-line hover:bg-[#4e4e4e]'
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
