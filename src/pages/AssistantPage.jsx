import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Orb from '../components/orb';
import AssistantHeader from '../components/AssistantHeader';
import AssistantInput from '../components/AssistantInput';
import ChatHistory from '../components/ChatHistoryOverlay';
import { getRandomJobCards } from '../data/jobData';
import { conversationFlow } from '../data/voiceResponses';

export default function AssistantPage({ onMenuClick }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [subtitle, setSubtitle] = useState('Zymm is listening..');
  const [history, setHistory] = useState([
    {
      sender: 'bot',
      text: 'Hi Zymm. Can you please do me the favor of exporting all my resumes that were used during the last week of my job hunt',
    },
  ]);
  const hasStartedChat = history.some((message) => message.sender === 'user');

  const handleMicClick = () => {
    if (isProcessing || currentStep >= conversationFlow.length) return;

    const stepData = conversationFlow[currentStep];
    setHistory((previousHistory) => [
      ...previousHistory,
      { sender: 'user', text: stepData.userResponse },
    ]);
    setIsProcessing(true);
    setSubtitle(stepData.nextSubtitle);

    setTimeout(() => {
      setHistory((previousHistory) => [
        ...previousHistory,
        { sender: 'bot', text: stepData.nextBotText },
      ]);
      setSubtitle('Zymm is listening..');
      setIsProcessing(false);
      setCurrentStep((previousStep) => previousStep + 1);
    }, 3000);

    setTimeout(() => {
      const randomCount = Math.floor(Math.random() * 10) + 1;
      const cards = getRandomJobCards(randomCount).map((card) => ({
        ...card,
        total: randomCount,
      }));

      navigate('/job-cards', { state: { cards } });
    }, 4000);
  };

  const handleOpenChat = () => {
    navigate('/topics/orb-chat', {
      state: {
        messages: history,
        isOrbChat: true,
      },
    });
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-page-gradient">
      <div className="shrink-0">
        <AssistantHeader
          title="Personal Assistant"
          subtitle={subtitle}
          onBack={() => navigate(-1)}
          onMenuClick={onMenuClick}
        />
      </div>

      <div className="mt-2 mb-2 shrink-0">
        <Orb isListening={!isProcessing} isChatStarted={hasStartedChat} />
      </div>

      <ChatHistory history={history} />

      <div className="shrink-0">
        <AssistantInput
          onMicClick={handleMicClick}
          onMessageClick={handleOpenChat}
        />
      </div>
    </div>
  );
}
