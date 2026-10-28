
export const getRandomBotResponse = () => {
  const responses = [
    "That is a great question. Let me analyze your resume and get back to you.",
    "I can certainly help with that. First, could you tell me what specific role you are targeting?",
    "Got it! I've processed that information. Would you like me to generate a new summary for your profile?",
    "Here is a quick tip: make sure your most recent experience is at the top with quantifiable metrics.",
    "I am ready when you are. We can start from scratch or refine what you already have.",
    "Let's improve your resume to highlight your strongest skills and achievements.",
    "Could you tell me more about your professional experience so I can assist you better?",
    "I can help you write a compelling cover letter tailored to your target role.",
    "Your resume should focus on achievements rather than just listing responsibilities.",
    "Would you like me to help you identify the skills employers are looking for?",
    "Let's make your professional summary clear, concise, and impactful.",
    "I recommend using action verbs to describe your accomplishments and responsibilities.",
    "We can work together to make your profile stand out to potential employers.",
    "Have you considered adding measurable results to your work experience?",
    "I can help you tailor your resume to match a specific job description.",
    "Let's review your skills section and make sure it reflects your current abilities.",
    "A well-written cover letter can help explain why you are a strong candidate for a role.",
    "Tell me about your career goals, and we can build a plan to achieve them.",
    "I can help you prepare answers to common interview questions.",
    "Remember to keep your resume organized and easy for recruiters to scan.",
    "Let's identify your transferable skills and show how they apply to your target position.",
    "Would you like suggestions for improving your LinkedIn profile?",
    "Your achievements can make a stronger impression when supported by numbers and results.",
    "I can help you rewrite your work experience using clear and professional language.",
    "Let's start by identifying the most important requirements for your dream job.",
    "A tailored resume is often more effective than sending the same version to every employer.",
    "Would you like me to help you create a professional headline for your profile?",
    "We can highlight your projects to demonstrate your practical experience and technical abilities.",
    "Before applying, make sure your resume contains relevant keywords from the job description.",
    "I am here to help you improve your resume, prepare for interviews, and explore career opportunities.",
  ];

  // Pick a random response and split it into words for the typing animation
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex].split(" ");
};
