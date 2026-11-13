import MessageBubble from './MessageBubble.jsx'
import TypingIndicator from './TypingIndicator.jsx'

export default function MessageList({ messages, typing }) {
  return (
    <div className="flex flex-col gap-3 px-3 md:gap-4 md:px-2" aria-live="polite">
      {messages.map((m) => <MessageBubble key={m.id} message={m} />)}
      {typing && <TypingIndicator />}
    </div>
  )
}
