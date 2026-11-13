import TeamAvatars from './TeamAvatars.jsx'
import { Close } from './Icons.jsx'

export default function WelcomeCard({ onClose, className = '' }) {
  return (
    <section className={`mt-1.5 rounded-[26px] bg-card px-3 pb-5 pt-3 text-center ${className}`}>
      <div className="relative flex h-[100px] items-start justify-between rounded-[22px] bg-panel px-4 pt-[18px] text-left">
        <TeamAvatars />
        <span className="absolute bottom-[11px] left-[18px] flex items-center gap-1.5 text-[11px]">
          <i className="h-2 w-2 rounded-full bg-online" /> Our team is online
        </span>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="mt-1.5 grid h-[42px] w-[66px] place-items-center rounded-full bg-[#3c3c3c] text-white transition hover:bg-[#4a4a4a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Close className="h-[18px] w-[18px]" />
        </button>
      </div>
      <h1 className="mb-2.5 mt-5 text-xl font-medium tracking-tight">What can our team help you with?</h1>
      <p className="px-1 text-sm leading-relaxed text-muted">
        Get instant answers about our dishes, booking availability, directions, and everything else you need to know
      </p>
    </section>
  )
}
