import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PopularTopics() {
    const navigate = useNavigate();
    const [seeAll, setSeeAll] = useState(false);
    const [repeatIcons, setRepeatIcons] = useState([1, 2, 3, 4]);
   
       
    const viewAll = () =>{
setSeeAll(true);
setRepeatIcons((prev)=>[...prev, 5, 6, 7])
    }
    
  return (
    <div className="mt-8 px-4 mb-24">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-white text-[18px] md:mt-8 font-semibold [text-shadow:1px_2px_4px_rgba(0,0,0,1)]">
  Popular Topics
</h2>
        <button className={`text-white text-[13px] cursor-pointer ${seeAll ? 'hidden' : ''} `} onClick={viewAll}>See all</button>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {repeatIcons.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() =>
              navigate(`/topics/${item}`, {
                state: { initialMessage: 'Try not to be on the Penny' },
              })
            }
            className="bg-popular-bg rounded-2xl p-4 flex flex-col justify-between"
            style={{height: '128px' }}
          >
            {/* Icon container with exact angle */}
            <div 
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center"
              style={{ transform: 'rotate(88.85deg)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            </div>
            <p className="text-white self-start text-[13px] leading-snug">
              Try not to be on the Penny
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}