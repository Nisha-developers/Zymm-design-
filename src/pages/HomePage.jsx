import ChatInterface from '../components/ChatInterface';
import DesktopHome from '../components/desktop/DesktopHome';
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
            {/* Mobile home (unchanged) */}
            <div className="flex flex-col md:hidden">
              <Header />
              <PromptPills />
            </div>
            {/* Desktop home */}
            <DesktopHome onSend={onSend} />
            <PopularTopics />
          </div>
        )}
      />
    </PhoneMockup>
  );
}
