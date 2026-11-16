const Heading = ({ lines, className = "" }) => {
  return (
    <h2
      className={`px-2 md:px-5 text-left text-[clamp(2.5rem,8vw,8rem)] md:w-[60%] font-normal leading-[1.05] tracking-[-0.045em] text-[#0a0a0a]  md:text-left ${className}`}
    >
      {lines}
    </h2>
  );
};

export default Heading;