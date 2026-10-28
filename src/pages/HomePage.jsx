import ChatInterface from '../components/ChatInterface';
import Header from '../components/Header';
import PhoneMockup from '../components/PhoneMockup';
import PopularTopics from '../components/PopularTopics';
import PromptPills from '../components/PromptPills';

export default function HomePage() {
  return (
    <PhoneMockup>
      <ChatInterface
        isHomepageChat
        emptyState={
          <div className="flex flex-col">
            <Header />
            <PromptPills />
            <PopularTopics />
          </div>
        }
      />
    </PhoneMockup>
  );
}
