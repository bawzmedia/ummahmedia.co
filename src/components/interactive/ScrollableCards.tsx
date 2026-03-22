'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface CardItem {
  title: string;
  description: string;
}

export interface ScrollableCardsProps {
  items: CardItem[];
  isVisible: boolean;
}

export default function ScrollableCards({ items, isVisible }: ScrollableCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const cards = trackRef.current.querySelectorAll<HTMLElement>('[data-card]');

    if (isVisible) {
      gsap.set(containerRef.current, { pointerEvents: 'auto' });
      gsap.fromTo(
        cards,
        { autoAlpha: 0, x: 60 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.1,
        }
      );
    } else {
      gsap.to(cards, {
        autoAlpha: 0,
        x: 40,
        duration: 0.25,
        ease: 'power1.in',
        stagger: 0.05,
        onComplete: () => {
          if (containerRef.current) {
            gsap.set(containerRef.current, { pointerEvents: 'none' });
          }
        },
      });
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 py-12"
      style={{ zIndex: 10 }}
      aria-hidden={!isVisible}
    >
      {/* Scrollable track wrapper — constrains visible height */}
      <div
        className="w-full max-w-6xl"
        style={{ maxHeight: 'calc(100vh - 6rem)' }}
      >
        {/* Horizontal scroll track */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto pb-2"
          style={{
            scrollbarWidth: 'none',
          }}
        >
          <style>{`
            [data-scrollable-track]::-webkit-scrollbar { display: none; }
          `}</style>
          {items.map((item, i) => (
            <div
              key={i}
              data-card
              className="min-w-[280px] shrink-0 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
              style={{ opacity: 0, visibility: 'hidden' }}
            >
              <h3 className="mb-2 font-cinzel text-sm font-bold uppercase tracking-wide text-white">
                {item.title}
              </h3>
              <p className="font-raleway text-sm leading-relaxed text-neutral-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
