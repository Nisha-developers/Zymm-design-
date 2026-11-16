import ScrollImage from "./ScrollImage";
import sectionThreeImg from "../../assets/section-three.jpg";
import Heading from "./Heading";

const SectionThree = () => {
  return (
    <div>
    <ScrollImage
      src={sectionThreeImg}
      alt="Future net worth projection shown on the Autonomous app"
    />
     <Heading lines={'Autonomous surfaces what needs your attention and proactively takes the next step.'} className="mt-30"/>
     </div>
  );
};

export default SectionThree;