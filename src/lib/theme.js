const KEY = 'zymm-theme';

export function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage blocked: the theme still applies for this visit */
  }
}

export function getTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

// Call once before React renders so every page starts in the saved theme.
export function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch {
    /* ignore */
  }
  applyTheme(saved === 'dark' ? 'dark' : 'light');
}
