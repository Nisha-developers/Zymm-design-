import { useRef, useState } from 'react';
import { CheckIcon, CopyIcon, PencilIcon } from './desktop/icons';
import { useAutoGrow } from '../lib/use-auto-grow';

const BUBBLE = {
  // Chat pages (mobile + desktop): neutral pill that fits its text, like ChatGPT/Claude.
  chat: 'rounded-[20px] bg-black/[0.07] px-4 py-2.5 text-[15px] leading-relaxed text-[#1B1B1B] dark:bg-white/[0.09] dark:text-white md:text-[14px]',
  // Orb page: sits on the dark gradient.
  orb: 'rounded-[20px] bg-white/[0.08] px-4 py-2.5 text-[15px] leading-snug text-white backdrop-blur-sm',
};

const ACTION =
  'flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-black/5 hover:text-black dark:hover:bg-white/10 dark:hover:text-white';

// A message you sent. Copy and Edit appear under it on hover (desktop) or after a tap (touch).
// Editing rewinds the chat to this message and Zymm answers again.
export default function UserBubble({ text, onEdit, edited = false, variant = 'chat', leading = null }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(text);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef(null);
  useAutoGrow(editorRef, editing ? draft : '', 220);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  const save = () => {
    const next = draft.trim();
    setEditing(false);
    if (next && next !== text) onEdit?.(next);
  };

  if (editing) {
    return (
      <div className="flex w-full max-w-[min(100%,560px)] flex-col gap-2 rounded-[20px] border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-[#161a19]">
        <textarea
          ref={editorRef}
          autoFocus
          rows={1}
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
          className="w-full resize-none bg-transparent text-[15px] leading-relaxed text-[#1B1B1B] outline-none dark:text-white md:text-[14px]"
        />
        <div className="flex justify-end gap-2 text-[12px] font-medium">
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="cursor-pointer rounded-full px-3 py-1.5 text-black/60 hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/10"
          >
            Cancel
          </button>
          <button type="button" onClick={save} className="cursor-pointer rounded-full bg-input-grad px-3 py-1.5 text-white">
            Send
          </button>
        </div>
      </div>
    );
  }

  return (
    // tabIndex lets a tap focus the message on touch screens, which reveals the actions (focus-within).
    <div tabIndex={0} className="group flex max-w-[80%] flex-col items-end outline-none md:max-w-[75%]">
      <div className={`flex items-start gap-2 whitespace-pre-wrap [overflow-wrap:anywhere] ${BUBBLE[variant]}`}>
        {leading}
        <p>{text}</p>
      </div>
      <div
        className={`mt-1 flex items-center gap-0.5 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 ${
          variant === 'orb' ? 'text-white/50 [&_button:hover]:!bg-white/10 [&_button:hover]:!text-white' : 'text-black/45 dark:text-white/45'
        }`}
      >
        {edited && <span className="mr-1 text-[11px]">edited</span>}
        <button type="button" onClick={copy} aria-label={copied ? 'Copied' : 'Copy message'} title={copied ? 'Copied' : 'Copy'} className={ACTION}>
          {copied ? <CheckIcon width={15} height={15} /> : <CopyIcon width={15} height={15} />}
        </button>
        {onEdit && (
          <button
            type="button"
            onClick={() => {
              setDraft(text);
              setEditing(true);
            }}
            aria-label="Edit message"
            title="Edit"
            className={ACTION}
          >
            <PencilIcon width={15} height={15} />
          </button>
        )}
      </div>
    </div>
  );
}
