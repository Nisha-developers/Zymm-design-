import { addMessage, createConversation, patchConversation } from './chatStore';

// Applying is a task: it shows under "Actionable Requests" while it runs, then moves to "Recent Task Requests".
// Demo mode only records the application. Live mode (next step) emails the employer your resume and an introduction.
const KEY = 'zymm.applied.v1';
export const jobKey = (job) => `${job.title}|${job.company}`;

function appliedSet() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) || '[]'));
  } catch {
    return new Set();
  }
}

export const isApplied = (job) => appliedSet().has(jobKey(job));

function markApplied(job) {
  const set = appliedSet();
  set.add(jobKey(job));
  try {
    localStorage.setItem(KEY, JSON.stringify([...set]));
  } catch {
    // ignore: the task itself is still saved
  }
}

export function startApplication(job, { delay = 3500 } = {}) {
  const label = `${job.title} at ${job.company}`;
  const task = createConversation({
    title: `Apply: ${label}`,
    kind: 'task',
    status: 'running',
    variant: 'topic',
    messages: [
      { role: 'user', text: `Apply to ${label}` },
      { role: 'bot', text: `Preparing your application for ${label}…` },
    ],
  });
  markApplied(job);
  setTimeout(() => {
    addMessage(task.id, { role: 'bot', text: `Done. Your application for ${label} is recorded. (Demo mode: no email was actually sent.)` });
    patchConversation(task.id, { status: 'done' });
  }, delay);
  return task.id;
}
