import { useSyncExternalStore } from 'react';

// All chats live in localStorage. A conversation looks like:
// { id, title, kind: 'chat' | 'task', status: null | 'running' | 'done' | 'failed', variant: 'home' | 'topic' | 'orb',
//   suggestion, agent, sessionId, createdAt, updatedAt,
//   messages: [{ id, role: 'user' | 'bot', text, cards?, agent?, edited?, createdAt }] }
const KEY = 'zymm.chats.v1';
const MAX_CHATS = 200;
const STALE_TASK_MS = 2 * 60 * 1000;
const listeners = new Set();
let cache = null;

const uid = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function read() {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '[]');
    cache = Array.isArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next) {
  cache = next.slice(0, MAX_CHATS);
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // storage full or blocked: the app keeps working from memory
  }
  listeners.forEach((listener) => listener());
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === KEY) {
      cache = null;
      listeners.forEach((listener) => listener());
    }
  });
}

const change = (id, fn) =>
  write(read().map((chat) => (chat.id === id ? { ...fn(chat), updatedAt: Date.now() } : chat)));

export const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export const useConversations = () => useSyncExternalStore(subscribe, read);
export const getConversation = (id) => read().find((chat) => chat.id === id) ?? null;
export const titleFrom = (text) => text.replace(/\s+/g, ' ').trim().slice(0, 42) || 'New chat';

export function createConversation({
  title = 'New chat',
  kind = 'chat',
  variant = 'home',
  suggestion = false,
  status = null,
  messages = [],
} = {}) {
  const now = Date.now();
  const chat = {
    id: uid(), title, kind, variant, suggestion, status, agent: null, sessionId: null,
    createdAt: now, updatedAt: now,
    messages: messages.map((m) => ({ id: uid(), createdAt: now, ...m })),
  };
  write([chat, ...read()]);
  return chat;
}

export function addMessage(id, message) {
  const saved = { id: uid(), createdAt: Date.now(), ...message };
  change(id, (chat) => ({ ...chat, messages: [...chat.messages, saved] }));
  return saved;
}

export const updateMessage = (id, messageId, changes) =>
  change(id, (chat) => ({
    ...chat,
    messages: chat.messages.map((m) => (m.id === messageId ? { ...m, ...changes } : m)),
  }));

// Keep everything up to and including messageId (used when the user edits an earlier message).
export const truncateAfter = (id, messageId) =>
  change(id, (chat) => {
    const index = chat.messages.findIndex((m) => m.id === messageId);
    return index < 0 ? chat : { ...chat, messages: chat.messages.slice(0, index + 1) };
  });

export const patchConversation = (id, changes) => change(id, (chat) => ({ ...chat, ...changes }));
export const deleteConversation = (id) => write(read().filter((chat) => chat.id !== id));

// Sidebar groups: tasks that are running now, normal + suggestion chats, and every task.
export function groupConversations(list) {
  const recent = list.filter((c) => c.messages.length > 0).sort((a, b) => b.updatedAt - a.updatedAt);
  return {
    actionable: recent.filter((c) => c.kind === 'task' && c.status === 'running'),
    chats: recent.filter((c) => c.kind === 'chat'),
    tasks: recent.filter((c) => c.kind === 'task'),
  };
}

// A task left "running" by a page reload can never finish, so don't leave it stuck in Actionable.
export function recoverStaleTasks() {
  const now = Date.now();
  const stale = read().some((c) => c.kind === 'task' && c.status === 'running' && now - c.updatedAt > STALE_TASK_MS);
  if (stale) {
    write(read().map((c) =>
      c.kind === 'task' && c.status === 'running' && now - c.updatedAt > STALE_TASK_MS ? { ...c, status: 'failed' } : c));
  }
}
