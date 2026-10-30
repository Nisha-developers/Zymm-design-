import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PhoneMockup from '../components/PhoneMockup';
import ChatInterface from '../components/ChatInterface';
import { createConversation, titleFrom, useConversations } from '../lib/chatStore';

export default function TopicPage() {
  const { topicId } = useParams();
  const { state, key } = useLocation();
  const navigate = useNavigate();
  const conversations = useConversations();
  const existing = conversations.find((chat) => chat.id === topicId);
  const handled = useRef(null);

  useEffect(() => {
    if (existing || handled.current === key) return;
    handled.current = key;
    const text = state?.initialMessage;
    if (!text) {
      navigate('/', { replace: true }); // an unknown link: nothing to open
      return;
    }
    // A suggestion (pill or popular topic) starts a saved chat; it is answered as soon as it opens.
    const chat = createConversation({
      title: titleFrom(text),
      variant: 'topic',
      suggestion: true,
      messages: [{ role: 'user', text }],
    });
    navigate(`/topics/${chat.id}`, { replace: true });
  }, [existing, key, state, navigate]);

  if (!existing) return null;

  return (
    <PhoneMockup>
      <ChatInterface
        key={existing.id}
        conversationId={existing.id}
        isOrbChat={existing.variant === 'orb'}
        isHomepageChat={existing.variant === 'home'}
      />
    </PhoneMockup>
  );
}
