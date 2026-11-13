const pad = (n) => String(n).padStart(2, '0')
export const formatTime = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`
export const formatStatusTime = (d) => `${d.getHours() % 12 || 12}:${pad(d.getMinutes())}`
