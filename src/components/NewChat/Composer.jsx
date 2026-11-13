import { useState } from 'react'
import { ArrowUp } from './Icons.jsx'

export default function Composer({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const submit = (e) => {
    e.preventDefault()
    if (!value.trim() || disabled) return
    onSend(value)
    setValue('')
  }
  return (
    <form onSubmit={submit} autoComplete="off" className="flex items-center gap-2.5 rounded-t-[28px] bg-top md:rounded-none md:border-t md:border-white/5 md:bg-phone md:px-6 md:pb-6 px-3.5 pb-[max(18px,env(safe-area-inset-bottom))] pt-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask us anything"
        aria-label="Message"
        className="h-[50px] flex-1 rounded-full bg-phone md:bg-top px-[18px] text-[15px] text-neutral-100 outline-none placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-white/40"
      />
      <button
        type="submit"
        disabled={disabled}
        aria-label="Send message"
        className="grid h-12 w-12 place-items-center rounded-[10px] bg-white text-neutral-900 transition active:scale-90 disabled:opacity-60"
      >
        <ArrowUp className="h-[26px] w-[26px]" />
      </button>
    </form>
  )
}
