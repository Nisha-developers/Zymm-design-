import { API_URL, USE_MOCK, getClientId } from '../config';
import { respondMock } from './mockAgent';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const THINK_MS = import.meta.env.MODE === 'test' ? 0 : 900;

// Live mode: ask the Django backend (Qwen3 through OpenRouter). Throws if anything goes wrong so the caller can fall back.
async function respondLive({ conversation, text }) {
  const response = await fetch(`${API_URL}/api/assistant/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Client-Id': getClientId() },
    body: JSON.stringify({ sessionId: conversation?.sessionId ?? undefined, text }),
    signal: AbortSignal.timeout(60000),
  });
  if (!response.ok) throw new Error(`Backend answered ${response.status}`);
  const data = await response.json();
  const jobs = data.results?.find((r) => r.kind === 'jobs')?.data.items ?? [];
  const cards = jobs.map((job, i) => ({
    id: String(job.id), title: job.title, company: job.company, location: job.location, salary: job.salary,
    match: job.match != null ? `${job.match}% Match` : '', description: job.description ?? '', total: jobs.length, index: i,
  }));
  return { text: data.text, cards: cards.length ? cards : undefined, agent: null, sessionId: data.sessionId };
}

// One entry point for the whole app. Mock mode never touches the network; live mode falls back to mock if the backend fails.
export async function respond(args) {
  if (USE_MOCK) {
    await sleep(THINK_MS + (import.meta.env.MODE === 'test' ? 0 : Math.random() * 600));
    return respondMock(args);
  }
  try {
    return await respondLive(args);
  } catch (error) {
    console.warn('Backend unavailable, using mock data instead:', error);
    await sleep(THINK_MS);
    return { ...(await respondMock(args)), fallback: true };
  }
}
