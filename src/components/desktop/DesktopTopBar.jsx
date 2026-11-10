import { useState } from 'react';
import { RocketIcon, UploadIcon, UserPlusIcon } from './icons';

const pill =
  'flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-[13px] font-medium transition-colors ' +
  'border-black/10 bg-white/70 text-black hover:bg-white ' +
  'dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]';

export function ShareButton({ className = '' }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked */
    }
  };
  return (
    <button type="button" onClick={share} className={`${pill} ${className}`}>
      <UploadIcon width={16} height={16} />
      {copied ? 'Copied' : 'Share'}
    </button>
  );
}

export default function DesktopTopBar() {
  // h-[76px] lines the buttons up with the floating hamburger (top-4, 44px tall) and gives the bar some top padding.
  return (
    <header className="relative flex h-[76px] shrink-0 items-center justify-end px-6">
      <button type="button" className={`${pill} absolute left-1/2 -translate-x-1/2`}>
        <RocketIcon width={16} height={16} />
        Upgrade to Pro
      </button>

      <div className="flex items-center gap-2">
        <ShareButton />
        <button type="button" className={pill}>
          <UserPlusIcon width={16} height={16} />
          Invite Users
        </button>
      </div>
    </header>
  );
}
