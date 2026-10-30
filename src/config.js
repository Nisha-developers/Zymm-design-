// true  = everything runs on mock data + localStorage (no backend needed).
// false = try the Django backend first; if it fails, the app falls back to mock data automatically.
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// No login: one anonymous id per browser, sent to the backend so it can keep this user's data separate.
export function getClientId() {
  try {
    let id = localStorage.getItem('zymm.clientId');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('zymm.clientId', id);
    }
    return id;
  } catch {
    return 'anonymous';
  }
}
