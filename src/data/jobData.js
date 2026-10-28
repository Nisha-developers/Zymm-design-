export const jobRoles = [
  {
    title: "Software Engineer",
    company: "Google",
    location: "New York, NY",
    salary: "$140k–$180k",
    description: "ATS systems scan resumes by parsing them into structured data—extracting details like job titles, skills, education, and experience. They then compare this information against the job posting, looking for keyword matches, relevant experience, and alignment with the role's requirements. The closer your resume mirrors the language and expectations of the job description, the higher you rank."
  },
  {
    title: "Frontend Developer",
    company: "Meta",
    location: "Menlo Park, CA",
    salary: "$130k–$170k",
    description: "You will build and maintain user interfaces for millions of users. Experience with React, TypeScript, and modern state management is required. You will work closely with designers to bring UI/UX concepts to life while ensuring performance and accessibility."
  },
  {
    title: "Product Designer",
    company: "Airbnb",
    location: "San Francisco, CA",
    salary: "$120k–$160k",
    description: "Design end-to-end user experiences that delight our community. You will conduct user research, create wireframes, prototype interactions, and collaborate with engineers to ship high-quality features. A strong portfolio demonstrating your design thinking is essential."
  },
  {
    title: "Data Scientist",
    company: "Netflix",
    location: "Los Gatos, CA",
    salary: "$150k–$200k",
    description: "Analyze massive datasets to uncover insights that drive content recommendations. You will build predictive models using machine learning algorithms, experiment with A/B testing frameworks, and communicate findings to stakeholders across the organization."
  },
  {
    title: "Backend Engineer",
    company: "Stripe",
    location: "Remote",
    salary: "$140k–$190k",
    description: "Design and scale the infrastructure that powers global payments. You will work with Go, Ruby, and distributed systems to ensure high availability and security. Experience with microservices and cloud architecture is strongly preferred."
  }
];

// Function to get a random selection of cards (1 to 10)
export const getRandomJobCards = (count) => {
  const cards = [];
  for (let i = 0; i < count; i++) {
    // Pick a random job from the list
    const randomJob = jobRoles[Math.floor(Math.random() * jobRoles.length)];
    
    // Generate a random match percentage between 85% and 99%
    const matchPercentage = Math.floor(Math.random() * (99 - 85 + 1)) + 85;
    
    cards.push({
      ...randomJob,
      id: i + 1,
      match: `${matchPercentage}% Match`
    });
  }
  return cards;
};