import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import IconWrapper from './components/IconWrapper';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import TopicPage from './pages/TopicPage';
import AssistantPage from './pages/AssistantPage';
import JobCardsPage from './pages/JobCardsPage';

function PageLayout({
  children,
  showSidebar,
  showFloatingSidebarToggle = true,
  floatingSidebarTogglePosition = 'left',
  showSidebarToggle = true,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () =>
      showSidebar &&
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 768px)').matches,
  );

  useEffect(() => {
    if (!showSidebar) return undefined;

    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const syncSidebarWithViewport = (event) => {
      setIsSidebarOpen(event.matches);
    };

    desktopQuery.addEventListener('change', syncSidebarWithViewport);
    return () => desktopQuery.removeEventListener('change', syncSidebarWithViewport);
  }, [showSidebar]);

  const toggleSidebar = () => {
    setIsSidebarOpen((previousState) => !previousState);
  };

  const content =
    typeof children === 'function'
      ? children({
          openSidebar: () => setIsSidebarOpen(true),
          toggleSidebar,
        })
      : children;

  return (
    <div className="flex min-h-screen">
      {showSidebar && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onToggle={toggleSidebar}
          showToggle={showSidebarToggle}
        />
      )}

      <main
        className="relative min-w-0 flex-1"
        style={{
          '--sidebar-center-offset':
            showSidebar && isSidebarOpen ? '160px' : '0px',
          '--sidebar-width-offset':
            showSidebar && isSidebarOpen ? '320px' : '0px',
          '--desktop-content-padding':
            showSidebar && !isSidebarOpen ? '128px' : '80px',
          '--desktop-input-width':
            showSidebar && isSidebarOpen
              ? 'calc(100% - 320px - 160px)'
              : 'calc(100% - 256px)',
        }}
      >
        {showSidebar && showFloatingSidebarToggle && !isSidebarOpen && (
          <div
            className={`fixed top-4 z-30 ${
              floatingSidebarTogglePosition === 'right'
                ? 'right-4 md:right-6'
                : 'left-4 md:left-6'
            } ${floatingSidebarTogglePosition === 'right' ? 'hidden md:block' : ''}`}
          >
            <IconWrapper onClick={toggleSidebar} aria-label="Open sidebar">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </IconWrapper>
          </div>
        )}
        {content}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageLayout showSidebar>
            <HomePage />
          </PageLayout>
        }
      />
      <Route
        path="/topics/:topicId"
        element={
          <PageLayout showSidebar={true}>
            <TopicPage />
          </PageLayout>
        }
      />
      <Route
        path="/assistant"
        element={
          <PageLayout
            showSidebar
            showFloatingSidebarToggle={false}
            showSidebarToggle={false}
          >
            {({ toggleSidebar }) => (
              <AssistantPage onMenuClick={toggleSidebar} />
            )}
          </PageLayout>
        }
      />
      <Route
        path="/job-cards"
        element={
          <PageLayout showSidebar={false}>
            <JobCardsPage />
          </PageLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
