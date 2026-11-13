import { useCallback, useEffect, useRef, useState } from 'react'
import { findAnswer } from '../data/knowledge'
import { formatTime } from '../components/utils/time'

let nextId = 1

export function useChat() {
  const [messages, setMessages] = useState([{ id: 0, from: 'bot', text: 'How can we help?' }])
  const [typing, setTyping] = useState(false)
  const [usedChips, setUsedChips] = useState([])
  const [startedAt] = useState(() => new Date())
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  const send = useCallback((text, chipIndex) => {
    const value = text.trim()
    if (!value || typing) return
    if (chipIndex != null) setUsedChips((u) => [...u, chipIndex])
    setMessages((m) => [...m, { id: nextId++, from: 'me', text: value, time: formatTime(new Date()) }])
    setTyping(true)
    const answer = findAnswer(value)
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { id: nextId++, from: 'bot', text: answer }])
      setTyping(false)
    }, 900 + Math.min(answer.length * 8, 900))
  }, [typing])

  return { messages, typing, usedChips, startedAt, send }
}
