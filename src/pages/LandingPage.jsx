import Hero from "../components/Landing/Hero";
import SectionThree from "../components/Landing/SectionThree";
import SectionTwo from "../components/Landing/SectionTwo";

const LandingPage = () => {
  return (
    <main className="min-h-[170vh] bg-[#eeeff1]">
      <Hero />
       <SectionTwo />
       <SectionThree/>
    </main>
  );
};

export default LandingPage;