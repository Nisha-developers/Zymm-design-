import { useState } from 'react';

// A message the user can fix (for example when the microphone heard the wrong words). Saving resends it.
export default function EditableText({ text, onSave, edited = false, textClassName = '' }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(text);

  const save = () => {
    const next = draft.trim();
    setEditing(false);
    if (next && next !== text) onSave(next);
  };

  if (editing) {
    return (
      <div className="flex flex-col gap-2">
        <textarea
          autoFocus
          rows={2}
          value={draft}
          aria-label="Edit your message"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              save();
            }
            if (e.key === 'Escape') setEditing(false);
          }}
          className="w-full resize-none rounded-lg bg-white/20 p-2 text-[15px] outline-none ring-1 ring-white/40"
        />
        <div className="flex justify-end gap-3 text-[12px]">
          <button type="button" onClick={() => setEditing(false)} className="cursor-pointer opacity-70 hover:opacity-100">Cancel</button>
          <button type="button" onClick={save} className="cursor-pointer font-semibold">Save &amp; resend</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <p className={textClassName}>{text}</p>
      {onSave && (
        <div className="mt-2 flex items-center justify-end gap-2 text-[11px] opacity-60">
          {edited && <span>edited</span>}
          <button
            type="button"
            aria-label="Edit message"
            onClick={() => {
              setDraft(text);
              setEditing(true);
            }}
            className="flex cursor-pointer items-center gap-1 hover:opacity-100"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            Edit
          </button>
        </div>
      )}
    </>
  );
}
