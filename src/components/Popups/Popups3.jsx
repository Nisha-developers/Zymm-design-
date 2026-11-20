import { useState } from "react";

const CODE = "MEMBER25"; // change to your real code

function Diamond() {
  return (
    <svg viewBox="0 0 200 170" className="h-44 w-auto" aria-hidden="true">
      <defs>
        <linearGradient id="gTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c6f24a" />
          <stop offset="50%" stopColor="#e9a6f0" />
          <stop offset="100%" stopColor="#ffb36b" />
        </linearGradient>
        <linearGradient id="gMid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d9f56a" />
          <stop offset="100%" stopColor="#f6c7ff" />
        </linearGradient>
        <linearGradient id="gLeft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9fd8ff" />
          <stop offset="100%" stopColor="#6aa6d8" />
        </linearGradient>
        <linearGradient id="gBot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d7a5ff" />
          <stop offset="55%" stopColor="#ff9fd0" />
          <stop offset="100%" stopColor="#ffa24d" />
        </linearGradient>
        <linearGradient id="gBotL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bfe3ff" />
          <stop offset="100%" stopColor="#5f8fbf" />
        </linearGradient>
      </defs>

      {/* crown */}
      <polygon points="10,55 45,15 80,15 55,55" fill="url(#gLeft)" />
      <polygon points="45,15 80,15 100,55 55,55" fill="url(#gMid)" />
      <polygon points="80,15 150,15 100,55" fill="url(#gTop)" />
      <polygon points="150,15 185,55 100,55" fill="#c9a8ff" opacity="0.9" />
      <polygon points="150,15 190,55 185,55" fill="#ffb36b" />

      {/* pavilion */}
      <polygon points="10,55 55,55 100,160" fill="url(#gBotL)" />
      <polygon points="55,55 100,55 100,160" fill="url(#gBot)" opacity="0.95" />
      <polygon points="100,55 185,55 100,160" fill="url(#gBot)" />
      <polygon points="100,55 130,55 100,160" fill="#fff" opacity="0.18" />

      {/* sparkles */}
      <path d="M30 20 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="#bff0ff" />
      <path d="M115 20 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="#fff" />
    </svg>
  );
}
function Wordmark() {
  return (
    <svg
      viewBox="0 0 220 50"
      className="h-[50px] w-[220px]"
      role="img"
      aria-label="Wethrift"
    >
      <defs>
        <path id="wethrift-arc" d="M 10 26 Q 110 46 210 26" />
      </defs>
      <text
        fill="#1b1b5e"
        fontSize="26"
        fontFamily="'Bowlby One SC', sans-serif"
        textAnchor="middle"
      >
        <textPath href="#wethrift-arc" startOffset="50%">
          WETHRIFT
        </textPath>
      </text>
    </svg>
  );
}

export default function Popups3({ onClose }) {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const close = () => {
    setOpen(false);
    onClose && onClose();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 font-['Inter',sans-serif]"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-[330px] flex-col items-center rounded-[28px] bg-white px-5 pb-5 pt-6 text-center shadow-2xl"
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-3 text-xl leading-none text-gray-400"
        >
          ×
        </button>

                <Wordmark />

        <h2 className="mt-3 text-[22px] font-semibold leading-tight tracking-tight text-[#1f1f1f]">
          Exclusive member discounts
        </h2>
        <p className="mt-1 text-[13px] font-medium text-gray-500">
          $25 off selected purchases
        </p>

        <div className="my-4">
          <Diamond />
        </div>

        <button
          onClick={copy}
          className="w-full rounded-full bg-gradient-to-r from-[#f9d976] via-[#e4ec6a] to-[#b6f23c] py-3.5 text-[15px] font-semibold text-[#1f1f1f] transition-transform active:scale-[0.98]"
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
    </div>
  );
}