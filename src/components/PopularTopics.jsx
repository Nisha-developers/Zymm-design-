import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POPULAR_TOPICS } from '../data/popularTopics';

// Mobile home. Collapsed: one row showing exactly 2 cards; swipe sideways for more.
// "See all": 4 rows that swipe sideways together.
export default function PopularTopics() {
  const navigate = useNavigate();
  const [seeAll, setSeeAll] = useState(false);
  const [page, setPage] = useState(0);
  const scrollerRef = useRef(null);

  const pages = Math.ceil(POPULAR_TOPICS.length / 2);

  const toggle = () => {
    setSeeAll((v) => !v);
    setPage(0);
    scrollerRef.current?.scrollTo({ left: 0 });
  };

  // Which pair of cards is in view (for the dots under the collapsed row)
  const onScroll = (e) => {
    const el = e.currentTarget;
    const step = el.clientWidth - 32 + 12; // two cards + the gap after them
    setPage(Math.round(el.scrollLeft / step));
  };

  const open = (topic) =>
    navigate(`/topics/${topic.id}`, { state: { initialMessage: topic.text } });

  return (
    <div className="-mx-4 mt-6 md:hidden">
      <div className="mb-2 flex items-center justify-between px-4">
        <h2 className="text-[18px] font-semibold text-[#1B1B1B] dark:text-white">Popular Topics</h2>
        <button type="button" onClick={toggle} className="cursor-pointer text-[13px] text-black/55 dark:text-white/55">
          {seeAll ? 'Show less' : 'See all'}
        </button>
      </div>

      {/* Edge-to-edge scroller; scroll-padding keeps snapped cards aligned with the page margin */}
      <div
        ref={scrollerRef}
        onScroll={seeAll ? undefined : onScroll}
        className={`hide-scrollbar grid snap-x snap-mandatory scroll-px-4 auto-cols-[calc((100%-12px)/2)] grid-flow-col gap-3 overflow-x-auto overscroll-x-contain px-4 pt-1 pb-6 ${
          seeAll ? 'grid-rows-4' : 'grid-rows-1'
        }`}
      >
        {POPULAR_TOPICS.map((topic) => {
          const Icon = topic.icon;
          return (
            <button
              type="button"
              key={topic.id}
              onClick={() => open(topic)}
              className="glass-card flex h-[152px] snap-start flex-col justify-between rounded-[20px] p-4 text-left transition-transform active:scale-[0.98]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/50 text-[#1B1B1B] dark:border-white/10 dark:bg-white/[0.08] dark:text-white/85">
                <Icon width={20} height={20} />
              </span>
              <p className="line-clamp-2 text-[13px] leading-snug text-[#1B1B1B]/80 dark:text-white/80">{topic.text}</p>
            </button>
          );
        })}
      </div>

      {!seeAll && (
        <div className="-mt-3 flex justify-center gap-1.5" aria-hidden="true">
          {Array.from({ length: pages }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === page ? 'w-4 bg-[#75F48C]/80' : 'w-1.5 bg-black/20 dark:bg-white/25'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
