import DesktopHomeInput from '../DesktopHomeInput';
import DesktopTopBar from './DesktopTopBar';
import HomeOrb from './HomeOrb';
import { ArrowRightIcon, ChartIcon, NoteIcon, PersonIcon } from './icons';

// Copy lives here so it's easy to change without touching the layout.
const ANNOUNCEMENT = 'Zymm Mobile for iPhone is here';
const TITLE = 'Your Daily Productivity Partner';
const SUBTITLE = 'Get answers, run job hunts, and manage projects with AI built to support your day-to-day.';
const SUGGESTIONS = [
  { icon: NoteIcon, text: 'Help me write a cover letter' },
  { icon: PersonIcon, text: 'Any advice for me?' },
  { icon: ChartIcon, text: 'Help me organise the work data' },
];

// Desktop home hero (md and up). Mobile keeps Header + PromptPills + PopularTopics.
// Exactly one screen tall: spacing and sizes use vh so it fits without scrolling.
export default function DesktopHome({ onSend }) {
  return (
    <div className="hidden h-[100dvh] flex-col overflow-hidden md:flex">
      <DesktopTopBar />

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-8">
        <HomeOrb />

        <button
          type="button"
          className="mt-[1.2vh] flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-black/10 bg-white/70 py-1 pl-1 pr-3 text-[12px] text-black shadow-[0_0_28px_rgba(117,244,140,0.22)] dark:border-white/10 dark:bg-[#111] dark:text-white"
        >
          <span className="rounded-full bg-desk-accent px-3 py-1 text-[11px] font-semibold text-white shadow-sm">New</span>
          {ANNOUNCEMENT}
          <ArrowRightIcon width={14} height={14} />
        </button>

        <h1 className="mt-[3vh] shrink-0 text-center text-[clamp(30px,min(3.4vw,5.6vh),50px)] font-semibold leading-[1.1] tracking-[-0.02em] text-black dark:text-white">
          {TITLE}
        </h1>
        <p className="mt-[1.5vh] shrink-0 text-center text-[14px] text-black/55 dark:text-white/55">{SUBTITLE}</p>

        <div className="mt-[3.5vh] w-full max-w-[760px] shrink-0">
          <DesktopHomeInput onSend={onSend} />

          <div className="mt-[1.6vh] grid grid-cols-3 gap-3">
            {SUGGESTIONS.map(({ icon: Icon, text }) => (
              <button
                key={text}
                type="button"
                onClick={() => onSend(text)}
                className="desk-chip flex h-[clamp(38px,5.2vh,46px)] min-w-0 cursor-pointer items-center gap-2.5 rounded-[16px] px-4 text-left text-[13px] text-black/70 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
              >
                <Icon width={18} height={18} className="shrink-0" />
                <span className="truncate">{text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="shrink-0 py-[2.5vh] text-center text-[11.5px] text-black/45 dark:text-white/45">
        Zymm may make mistakes. We recommend checking important information.{' '}
        <a href="#privacy" className="font-medium text-black underline underline-offset-2 dark:text-white">
          Privacy Notice.
        </a>
      </p>
    </div>
  );
}
