const InfoCard = ({ text, className = "" }) => {
  return (
    <div
      className={`flex aspect-square items-end rounded-[32px] bg-[#fdfdfd] p-7 sm:rounded-[40px] sm:p-10 ${className}`}
    >
      <p className="max-w-[85%] text-[clamp(1.75rem,5vw,4rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[#0a0a0a]">
        {text}
      </p>
    </div>
  );
};

export default InfoCard;