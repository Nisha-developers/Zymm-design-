import PhoneMockup from '../components/PhoneMockup';
import ChatInterface from '../components/ChatInterface';
import { useLocation } from 'react-router-dom';

export default function TopicPage() {
  const location = useLocation();

  return (
    <PhoneMockup>
      <ChatInterface
        initialMessage={location.state?.initialMessage}
        initialMessageKey={location.key}
        initialMessages={location.state?.messages}
        isOrbChat={location.state?.isOrbChat}
      />
    </PhoneMockup>
  );
}