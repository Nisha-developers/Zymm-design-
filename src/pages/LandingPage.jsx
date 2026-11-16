import Hero from "../components/Landing/Hero";
import SectionFour from "../components/Landing/SectionFour";
import SectionThree from "../components/Landing/SectionThree";
import SectionTwo from "../components/Landing/SectionTwo";
import SectionFive from "../components/Landing/SectionFive";
import SectionSix from "../components/Landing/SectionSix";
import SectionSeven from "../components/Landing/SectionSeven";
import Footer from "../components/Landing/Footer";
import ChatWidget from "../components/Landing/ChatWidget";


const LandingPage = () => {
  return (
    <main className="min-h-[170vh] bg-[#eeeff1]">
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