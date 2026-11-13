import { useEffect, useRef } from 'react'
import { useChat } from '../hooks/useChat.js'
import NavBar from '../components/NewChat/NavBar.jsx'
import WelcomeCard from '../components/NewChat/WelcomeCard.jsx'
import InfoList from '../components/NewChat/InfoList.jsx'
import DateStamp from '../components/NewChat/DateStamp.jsx'
import MessageList from '../components/NewChat/MessageList.jsx'
import SuggestionChips from '../components/NewChat/SuggestionChips.jsx'
import Composer from '../components/NewChat/Composer.jsx'

/**
 * Mobile: full-screen chat (same as the screenshot).
 * md and up: two-column layout, team info sidebar on the left, conversation on the right.
 * `onClose` runs on the X button and Esc. Defaults to going back one page.
 */
export default function ChatPage({ onClose = () => window.history.back() }) {
  const { messages, typing, usedChips, startedAt, send } = useChat()
  const scroller = useRef(null)

  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="flex h-dvh w-full justify-center bg-neutral-950 font-sans text-neutral-100 md:items-center md:p-6">
      <div className="flex h-full w-full max-w-6xl flex-col overflow-hidden bg-phone pt-[env(safe-area-inset-top)] md:grid md:h-[min(780px,100%)] md:grid-cols-[300px_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)] md:rounded-3xl md:pt-0 md:shadow-2xl md:ring-1 md:ring-white/10 lg:grid-cols-[360px_minmax(0,1fr)]">
        <NavBar />

        <aside className="hidden flex-col gap-6 overflow-y-auto bg-[#343434] p-4 md:flex">
          <WelcomeCard onClose={onClose} className="md:mt-0" />
          <InfoList />
        </aside>

        <section className="flex min-h-0 flex-1 flex-col">
          <div
            ref={scroller}
            className="no-scrollbar -mt-1.5 flex-1 overflow-y-auto rounded-t-[28px] bg-phone px-1.5 pb-4 md:mt-0 md:rounded-none md:px-6 md:pb-6 md:pt-6"
          >
            <WelcomeCard onClose={onClose} className="md:hidden" />
            <DateStamp date={startedAt} />
            <MessageList messages={messages} typing={typing} />
            <SuggestionChips used={usedChips} onPick={send} />
          </div>
          <Composer onSend={send} disabled={typing} />
        </section>
      </div>
    </div>
  )
}
