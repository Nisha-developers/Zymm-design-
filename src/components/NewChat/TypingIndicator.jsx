export default function TypingIndicator() {
  return (
    <div className="flex max-w-[86%] md:max-w-[68%] animate-rise gap-1.5 self-start rounded-[6px_16px_16px_16px] bg-white px-[18px] py-4" role="status" aria-label="Team is typing">
      {[0, 150, 300].map((d) => (
        <span key={d} style={{ animationDelay: `${d}ms` }} className="h-[7px] w-[7px] animate-blink rounded-full bg-neutral-500" />
      ))}
    </div>
  )
}
