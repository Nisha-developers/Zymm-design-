import { useState } from "react";
// import model from "../assets/model.jpg"; // the girl with the sunglasses

export default function Popups2({ onClose }) {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");

  const close = () => {
    setOpen(false);
    onClose && onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    close();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#d3fbff] p-4 font-['Montserrat',sans-serif]"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-full w-full max-w-[600px] flex-col overflow-y-auto bg-white shadow-[0_10px_30px_rgba(0,128,140,0.18)] sm:h-[380px] sm:flex-row sm:overflow-hidden"
      >
        {/* Image */}
        <img
          src=''
          alt="Model wearing sunglasses"
          className="h-52 w-full object-cover object-top sm:h-full sm:w-[51.5%]"
        />

        {/* Content */}
        <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-8 text-center sm:px-5 sm:py-0">
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 text-2xl leading-none text-black sm:right-5 sm:top-5"
          >
            ×
          </button>

          <h2 className="text-[22px] font-bold leading-tight text-[#1f1f1f]">
            Unlock <span className="text-[#0b8388]">15% OFF</span> on
            <br />
            your next order
          </h2>

          <p className="mt-3 text-[11px] text-[#1f1f1f]">
            And gain access to exclusive sales and more.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex w-full flex-col items-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-full border border-gray-300 px-4 py-2.5 text-[11px] text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#0b8388]"
            />

            <button
              type="submit"
              className="mt-6 rounded-full bg-[#0b8388] px-7 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#096d71]"
            >
              Get discount code
            </button>
          </form>

          <button
            onClick={close}
            className="mt-4 text-[11px] font-medium text-[#1f1f1f] underline"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}