import {
  BriefcaseIcon, ChatBubbleIcon, CoinsIcon, GlobeIcon, GraduationIcon, LinkedInIcon,
  MailIcon, MicIcon, NoteIcon, PencilIcon, PieIcon, ResumeIcon, SparkleIcon, TargetIcon, TrendIcon, PersonIcon,
} from '../components/desktop/icons';

// Popular Topics on the mobile home. Tapping one starts a chat with its text.
export const POPULAR_TOPICS = [
  { id: 'cv-polish', icon: ResumeIcon, text: 'Polish my CV for product design roles' },
  { id: 'cover-letter', icon: PencilIcon, text: 'Write a cover letter that stands out' },
  { id: 'interview-prep', icon: MicIcon, text: 'Practice a mock interview with me' },
  { id: 'salary', icon: CoinsIcon, text: 'How much should I ask for in salary?' },
  { id: 'remote-jobs', icon: GlobeIcon, text: 'Find remote jobs that hire in Nigeria' },
  { id: 'follow-up', icon: MailIcon, text: 'Follow up after an interview' },
  { id: 'linkedin', icon: LinkedInIcon, text: 'Improve my LinkedIn headline' },
  { id: 'career-switch', icon: TrendIcon, text: 'Plan a switch into tech' },
  { id: 'portfolio', icon: NoteIcon, text: 'What should my portfolio include?' },
  { id: 'skills-gap', icon: TargetIcon, text: 'Which skills am I missing?' },
  { id: 'courses', icon: GraduationIcon, text: 'Short courses that boost my CV' },
  { id: 'networking', icon: ChatBubbleIcon, text: 'Message a recruiter on LinkedIn' },
  { id: 'job-match', icon: BriefcaseIcon, text: 'Jobs that match my experience' },
  { id: 'market', icon: PieIcon, text: 'Which roles are hiring the most?' },
  { id: 'intro', icon: PersonIcon, text: 'Answer “Tell me about yourself”' },
  { id: 'negotiate', icon: SparkleIcon, text: 'Negotiate a job offer politely' },
];
