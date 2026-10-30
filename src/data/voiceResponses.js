export const conversationFlow = [
  {
    id: 1,
    botText: "Hi Zymm. Can you please do me the favor of exporting all my resumes that were used during the last week of my job hunt?",
    userResponse: "No, I do not.",
    nextBotText: "Okay, no worries!\nLet's start off with your experience and the 3-5 jobs that you feel would be suited for the job that you're seeking!\nName me all the jobs that you'd like to add!",
    nextSubtitle: "Providing Answer..."
  },
  {
    id: 2,
    botText: "Great choices. Now, which of these roles is your most recent experience?",
    userResponse: "The Product Designer role.",
    nextBotText: "Got it. I've highlighted that on your profile. Would you like me to generate a summary based on this role?",
    nextSubtitle: "Providing Answer..."
  }
];

// Demo mode only: what the "microphone" hears, in order. Live mode uses real speech-to-text instead.
const DEMO_SCRIPT = ['Find me marketing jobs', 'In New York', 'At least 90k', 'Yes, go ahead'];
export const mockUtterance = (userMessageCount) => DEMO_SCRIPT[userMessageCount % DEMO_SCRIPT.length];