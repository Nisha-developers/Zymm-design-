import ChatInterface from '../components/ChatInterface';
import DesktopHomeInput from '../components/DesktopHomeInput';
import Header from '../components/Header';
import PhoneMockup from '../components/PhoneMockup';
import PopularTopics from '../components/PopularTopics';
import PromptPills from '../components/PromptPills';

export default function HomePage() {
  return (
    <PhoneMockup>
      <ChatInterface
        isHomepageChat
        emptyState={({ onSend }) => (
          <div className="flex flex-col">
            <div className="flex flex-col md:min-h-[80vh] md:items-center md:justify-center">
              <Header />
              <DesktopHomeInput onSend={onSend} />
              <PromptPills />
            </div>
            <PopularTopics />
          </div>
        )}
      />
    </PhoneMockup>
  );
}