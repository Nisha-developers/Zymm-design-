import Heading from "./Heading";
import InfoCard from "./InfoCard";
const CARDS = [
  "The foundation is a secure financial vault that monitors your assets.",
  "Autonomous builds an understanding of you, your family and goals.",
];

const SectionTwo = () => {
  return (
    <section className="w-full bg-[#eeeff1] py-20 px-3 md:py-32 ">
      <Heading
        lines={
          "Superintelligence that manages your financial life."}
      />
       <div className="mt-20 grid grid-cols-1 gap-4 px-3 md:grid-cols-2 sm:gap-2 md:mt-35 md:px-3">
        {CARDS.map((text) => (
          <InfoCard key={text} text={text} />
        ))}
      </div>
    </section>
  );
};

export default SectionTwo;