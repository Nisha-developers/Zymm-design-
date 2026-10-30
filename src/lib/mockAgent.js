import { jobRoles } from '../data/jobData';
import { getRandomBotResponse } from '../data/botResponses';

// Demo "brain". It asks the questions a real recruiter would ask and only shows job cards once it is clear what you want.
// Each reply is { text, cards?, agent } where `agent` is the conversation's progress (saved with the chat, so you can continue later).
const CITIES = ['new york', 'san francisco', 'los angeles', 'seattle', 'austin', 'chicago', 'boston', 'london', 'toronto', 'lagos', 'remote'];
const YES = /\b(yes|yeah|yep|yup|sure|ok|okay|correct|right|go ahead|do it|please|show me|go)\b/i;
const NO = /\b(no|nope|nah|none|any|anywhere|anything|whatever|doesn'?t matter|don'?t care|flexible|skip)\b/i;
const FILLER = /^(i('m| am)? (looking for|want|need)|find me|show me|search for|look for|get me|something in|somewhere in|in|a|an|the|some)\s+/i;
const WORD_NUMBERS = { fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90, 'one hundred': 100, 'a hundred': 100, hundred: 100 };

const QUESTIONS = {
  role: 'What kind of role are you looking for?',
  location: 'Where would you like to work? Tell me a city, or say remote.',
  salary: 'Is there a minimum yearly salary I should respect? You can say no minimum.',
};
const ORDER = [['role', 'role'], ['location', 'location'], ['salary', 'salaryMin']];

const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());
const tidy = (s) => s.replace(/[.!?]+$/g, '').trim();

export function parseSalary(text, asking) {
  const k = text.match(/\$?\s*(\d{2,3})\s*k\b/i);
  if (k) return Number(k[1]);
  const full = text.match(/\$\s*(\d{2,3})[,\s]?(\d{3})\b/);
  if (full) return Math.round((Number(full[1]) * 1000 + Number(full[2])) / 1000);
  const spoken = text.match(/\b(fifty|sixty|seventy|eighty|ninety|one hundred|a hundred|hundred)\s+thousand\b/i);
  if (spoken) return WORD_NUMBERS[spoken[1].toLowerCase()];
  if (/no minimum|any salary/i.test(text)) return 0;
  if (asking === 'salary') {
    if (NO.test(text)) return 0;
    const n = text.match(/\b(\d{2,3})\b/);
    if (n && Number(n[1]) <= 500) return Number(n[1]);
  }
  return undefined;
}

export function parseLocation(text, asking) {
  const lower = text.toLowerCase();
  const city = CITIES.find((c) => lower.includes(c));
  if (city) return titleCase(city);
  if (asking === 'location') {
    if (NO.test(text)) return 'Anywhere';
    const value = tidy(text.replace(FILLER, '')).slice(0, 40);
    return value ? titleCase(value) : undefined;
  }
  const m = text.match(/\b(?:in|near|around)\s+([A-Z][A-Za-z.'-]+(?:\s+[A-Z][A-Za-z.'-]+){0,2})/);
  return m ? m[1] : undefined;
}

export function parseRole(text, asking) {
  const m =
    text.match(/(?:find|search(?: for)?|look(?:ing)? for|show|get)\s+(?:me\s+)?(?:some\s+|a\s+|an\s+)?(.+?)\s+(?:jobs?|roles?|positions?|openings?)\b/i) ||
    text.match(/\b([a-z][a-z ]{2,38}?)\s+(?:jobs?|roles?|positions?|openings?)\b/i);
  if (m) {
    const role = tidy(m[1].replace(/^((me|some|a|an|the|new|more|other|any)\s+)+/i, ''));
    const isCommand = /^(start|begin|launch|create|run|open|i|my|our|your)\b/i.test(role); // "Start New Job Hunt Campaign" is not a role
    if (role && !isCommand && !/^(i|me|some|any|new|more|other|the|a|an)$/i.test(role)) return role;
  }
  if (asking === 'role' && !NO.test(text)) {
    return tidy(text.replace(FILLER, '').replace(/\b(jobs?|roles?|positions?)\b/gi, '')).slice(0, 50) || undefined;
  }
  return undefined;
}

function detectIntent(text) {
  if (/job hunt|campaign|hiring manager/i.test(text)) return 'job_search';
  if (/\b(jobs?|roles?|positions?|openings?|hiring|vacanc\w+)\b/i.test(text) && /\b(find|search|look|show|get|want|need|any|looking)\b/i.test(text)) return 'job_search';
  return null;
}

const summary = (s) => `${s.role} jobs in ${s.location}${s.salaryMin ? `, paying at least $${s.salaryMin}k` : ''}`;

function titleFor(role, fallback, i) {
  if (!role) return fallback;
  const prefix = ['Senior ', '', 'Lead ', '', 'Junior '][i % 5];
  const known = /engineer|developer|designer|manager|analyst|scientist|specialist|lead|director/i.test(role);
  return `${prefix}${titleCase(role)}${known ? '' : ' Specialist'}`;
}

export function mockSearch(slots) {
  const total = 14 + Math.floor(Math.random() * 30);
  const count = 5;
  const cards = Array.from({ length: count }, (_, i) => {
    const base = jobRoles[i % jobRoles.length];
    const low = (slots.salaryMin || 90) + i * 5;
    return {
      ...base,
      id: `${Date.now()}-${i}`,
      title: titleFor(slots.role, base.title, i),
      location: slots.location,
      salary: `$${low}k–$${low + 40}k`,
      match: `${97 - i * 3}% Match`,
      total: count,
    };
  });
  return {
    text: `I found ${total} positions matching your request. Here are the ${count} strongest matches. Would you like me to apply to any of them for you?`,
    cards,
  };
}

function jobSearchStep(previous, text) {
  const state = { intent: 'job_search', slots: { ...(previous?.slots ?? {}) }, asking: previous?.asking ?? null };
  const before = JSON.stringify(state.slots);
  const role = parseRole(text, state.asking);
  const location = parseLocation(text, state.asking);
  const salary = parseSalary(text, state.asking);
  if (role) state.slots.role = role;
  if (location) state.slots.location = location;
  if (salary !== undefined) state.slots.salaryMin = salary;
  const changed = JSON.stringify(state.slots) !== before;

  if (state.asking === 'confirm' && !changed) {
    if (YES.test(text)) return { ...mockSearch(state.slots), agent: null };
    return { text: 'No problem. What should I change: the role, the location or the salary?', agent: { ...state, asking: 'change' } };
  }
  if (state.asking === 'change' && !changed) {
    return { text: "I didn't catch that. You can say something like “in Boston”, “at least 100k” or “product design jobs”.", agent: state };
  }
  const missing = ORDER.find(([, slot]) => state.slots[slot] === undefined);
  if (missing) {
    const intro = state.asking === null && !changed ? 'Happy to help you find work. ' : '';
    return { text: intro + QUESTIONS[missing[0]], agent: { ...state, asking: missing[0] } };
  }
  return { text: `Just to be sure: ${summary(state.slots)}. Shall I pull them up?`, agent: { ...state, asking: 'confirm' } };
}

export async function respondMock({ conversation, text }) {
  const active = conversation?.agent ?? null;
  const intent = active?.intent ?? detectIntent(text);
  if (intent === 'job_search') return jobSearchStep(active, text);
  if (/^\s*(hi|hello|hey)\b/i.test(text)) {
    return { text: "Hi! I'm Zymm, your personal headhunter. Tell me what kind of job you're after and I'll find the best matches.", agent: null };
  }
  return { text: getRandomBotResponse().join(' '), agent: null };
}
