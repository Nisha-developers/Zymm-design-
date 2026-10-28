import orbImage from '../assets/download.png';

export default function Orb({ isListening = true, isChatStarted = false }) {
  return (
    <div className="relative flex items-center justify-center w-full py-2 shrink-0">
      <div className={`absolute inset-0 m-auto rounded-full bg-green-500/20 blur-3xl animate-pulse transition-[width,height] duration-500 ${isChatStarted ? 'w-[140px] h-[140px]' : 'w-[300px] h-[300px] lg:w-[360px] lg:h-[360px]'}`}></div>
      
      <div className={`relative flex items-center justify-center rounded-full transition-[width,height] duration-500 ${isChatStarted ? 'h-[160px] w-[160px]' : 'h-[320px] w-[320px] lg:h-[380px] lg:w-[380px]'} ${isListening ? 'animate-[spin_20s_linear_infinite]' : ''}`}>
        <img 
          src={orbImage}
          alt="AI Orb" 
          className="block h-full w-full object-contain drop-shadow-[0_0_35px_rgba(34,197,94,0.6)]"
        />
      </div>
    </div>
  );
}