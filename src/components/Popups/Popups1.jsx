import { useState } from "react";
// import woman from "../assets/woman.png"; // transparent PNG cutout

const gradient = {
  background: `
    radial-gradient(circle at 0% 0%, #9dbd5a 0%, transparent 38%),
    radial-gradient(circle at 15% 100%, #b65cff 0%, transparent 35%),
    linear-gradient(135deg, #f9a84a 0%, #ff7a59 35%, #ff4fa8 75%, #e24fd6 100%)
  `,
};

export default function Popups1({ onClose }) {
  const [open, setOpen] = useState(true);

  const close = () => {
    setOpen(false);
    onClose && onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/75 p-4"
      onClick={close}
    >
      <div
        style={gradient}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[420px] w-full max-w-[610px] items-end rounded-[14px] font-['Fredoka',sans-serif] text-white shadow-[0_14px_30px_rgba(0,0,0,0.45)] sm:h-[380px] sm:items-center"
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#8a3a00] p-0 text-base leading-none text-[#8a3a00]"
        >
          ×
        </button>

        <img
          src=''
          alt="Model in orange dress"
          className="pointer-events-none absolute bottom-0 left-0 h-[55%] w-auto object-contain object-left-bottom sm:h-full"
        />

        <div className="ml-auto w-[60%] px-5 pb-6 sm:ml-[42%] sm:w-auto sm:p-0 sm:pr-9">
          <h2 className="mb-3.5 text-xl font-semibold leading-tight">
            "Stunning New Dresses Collection!"
          </h2>
          <p className="mb-8 text-[12.5px] leading-normal">
            Step into elegance with our latest collection of stunning dresses.
            Whether you're looking for the perfect evening gown, a chic summer
            dress, or a trendy cocktail outfit, we have something for every
            occasion.
          </p>
          <div className="flex gap-2">
            <button className="rounded-md bg-[#6e0012] px-4 py-2.5 text-xs font-semibold transition-colors hover:bg-[#8a0017]">
              Shop the collection
            </button>
            <button className="rounded-md bg-[#6e0012] px-4 py-2.5 text-xs font-semibold transition-colors hover:bg-[#8a0017]">
              Explore our dresses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}