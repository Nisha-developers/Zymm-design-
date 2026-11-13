export default function MessageBubble({ message }) {
  const mine = message.from === 'me'
  return (
    <div className={`flex max-w-[86%] md:max-w-[68%] animate-rise flex-col ${mine ? 'self-end' : 'self-start'}`}>
      <div
        className={`whitespace-pre-line text-base leading-snug ${
          mine
            ? 'rounded-[16px_6px_6px_16px] bg-user px-[17px] pb-2.5 pt-3 text-neutral-100'
            : 'rounded-[6px_16px_16px_16px] bg-white px-[17px] py-[13px] text-neutral-900'
        }`}
      >
        {message.text}
        {mine && <div className="mt-1.5 text-xs text-muted">{message.time}</div>}
      </div>
    </div>
  )
}
