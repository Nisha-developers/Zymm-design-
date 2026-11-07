import ChatInterface from '../components/ChatInterface';
import Header from '../components/Header';
import PhoneMockup from '../components/PhoneMockup';
import PopularTopics from '../components/PopularTopics';
import PromptPills from '../components/PromptPills';

export default function HomePage() {
  return (
    <PhoneMockup>
      {/* 
        DESKTOP SHELL 
        This container is hidden on mobile (hidden) and becomes a flex row on desktop (lg:flex).
        It handles the Sidebar + Main Content layout.
      */}
      <div className="hidden lg:flex w-full h-screen bg-[#0a0a0c] text-white font-sans overflow-hidden">
        
        {/* ================= SIDEBAR (Desktop Only) ================= */}
        <aside className="w-20 border-r border-white/5 flex flex-col items-center py-6 gap-6 shrink-0">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6">
            <span className="font-bold text-xl">G</span>
          </div>
          {/* Nav Icons Placeholders */}
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            {/* Home Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer">
             {/* Clock Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          {/* ... other icons ... */}
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <main className="flex-1 flex flex-col relative">
          
          {/* Top Navigation Bar */}
          <div className="flex justify-between items-center px-8 py-6 w-full absolute top-0 left-0 z-10">
            <div className="border border-white/10 rounded-xl px-4 py-2 text-sm font-medium bg-black/20">
              ChatPro
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-300 hover:bg-white/5 transition">
                <span>☀️</span> Light Mode
              </button>
              <button className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-300 hover:bg-white/5 transition">
                <span>👤</span> Ashat <span className="text-[10px]">▼</span>
              </button>
            </div>
          </div>

          {/* Center Content Wrapper */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 w-full max-w-4xl mx-auto mt-20">
            
            {/* The Glowing Icon & Badge */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-purple-500 rounded-full blur-2xl opacity-40 absolute"></div>
              <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center relative z-10 mb-6">
                 {/* Placeholder for your flower icon */}
                 <span className="text-3xl">🌸</span>
              </div>
              
              <div className="flex items-center gap-2 bg-[#1a1a1e] border border-white/10 rounded-full px-4 py-1.5">
                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-[10px]">⚡</div>
                <span className="text-xs font-medium text-gray-300">Your AI Productivity Assistant</span>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>

            {/* Render your actual Header component here (it contains your text) */}
            <div className="text-center mb-8">
              {/* Note: Your Header has a specific layout, but we override margins for desktop centering */}
              <Header /> 
            </div>

            {/* ================= THE BIG INPUT BOX ================= */}
            <div className="w-full max-w-3xl relative mb-8 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-[#131316] border border-white/10 rounded-3xl p-6 min-h-[160px] flex flex-col justify-between">
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="text-xl">✨</span>
                  <span className="text-lg">Ask me anything...</span>
                </div>
                
                <div className="flex justify-between items-end mt-8">
                   <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                      <span className="text-xl text-gray-300">+</span>
                   </button>
                   <div className="flex items-center gap-3">
                      <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition text-gray-300">
                         🎤
                      </button>
                      <button className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30 transition text-white">
                         {/* Send Icon */}
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                      </button>
                   </div>
                </div>
              </div>
            </div>

            {/* Render your actual PromptPills and PopularTopics components */}
            {/* We wrap them in a container to control their width on desktop */}
            <div className="w-full max-w-3xl flex flex-col items-center">
               <PromptPills />
               <PopularTopics />
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-8 mb-6">
              <div className="h-[1px] w-24 bg-white/10"></div>
              <span>Smarter tools. A more productive you. 💜</span>
              <div className="h-[1px] w-24 bg-white/10"></div>
            </div>

          </div>
        </main>
      </div>

      {/* 
        MOBILE VIEW 
        This stays exactly as it was. 
        We use `lg:hidden` to hide it on desktop and show the new layout above.
      */}
      <div className="lg:hidden flex flex-col flex-1 w-full h-full">
        <ChatInterface
          isHomepageChat
          emptyState={
            <div className="flex flex-col flex-1">
              <Header />
              <PromptPills />
              <PopularTopics />
            </div> 
          }
        />
      </div>
    </PhoneMockup>
  );
}