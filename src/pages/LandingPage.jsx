import Hero from "../components/Landing/Hero";
import SectionFour from "../components/Landing/SectionFour";
import SectionThree from "../components/Landing/SectionThree";
import SectionTwo from "../components/Landing/SectionTwo";
import SectionFive from "../components/Landing/SectionFive";
import SectionSix from "../components/Landing/SectionSix";
import SectionSeven from "../components/Landing/SectionSeven";
import Footer from "../components/Landing/Footer";
import ChatWidget from "../components/Landing/ChatWidget";
const PAGE_STYLE = `
  html, body {
    overscroll-behavior: none;   /* no bounce / pull-to-refresh glow */
    scroll-behavior: auto;       /* no built-in smooth scrolling */
    scrollbar-width: none;       /* hide scrollbar (Firefox) */
  }
  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    display: none;               /* hide scrollbar (Chrome, Safari, Edge) */
  }
`;

const LandingPage = () => {
  return (
    <main className="min-h-[170vh] bg-[#eeeff1]">
       <style>{PAGE_STYLE}</style>
      <Hero />
       <SectionTwo />
       <SectionThree/>
       <SectionFour />
       <SectionFive />
       <SectionSix />
       <SectionSeven />
       <Footer />
       <ChatWidget />
    </main>
  );
};

export default LandingPage;