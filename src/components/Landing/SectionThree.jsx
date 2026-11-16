import sectionThreeImg from "../assets/section-three.png";

const SectionThree = () => {
  return (
    <section className="w-full bg-[#eeeff1] px-3 pb-12 md:pb-20">
      <img
        src={sectionThreeImg}
        alt="Future net worth projection shown on the Autonomous app"
        className="block h-auto w-full rounded-[28px] bg-[#d2d4d8] md:rounded-[36px]"
      />
    </section>
  );
};

export default SectionThree;