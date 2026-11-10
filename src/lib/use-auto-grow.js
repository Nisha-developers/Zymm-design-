import { useLayoutEffect } from 'react';

// Grows a textarea with its content (like ChatGPT/Claude) up to maxHeight, then it scrolls.
export function useAutoGrow(ref, value, maxHeight = 200) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    const next = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [ref, value, maxHeight]);
}
