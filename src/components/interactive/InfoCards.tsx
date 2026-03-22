'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CardItem {
  title: string;
  description: string;
  icon?: string; // emoji
}

interface InfoCardsProps {
  isVisible: boolean;
  items: CardItem[];
  columns?: 2 | 3 | 4; // default 2
}

export default function InfoCards({
  isVisible,
  items,
  columns = 2,
}: InfoCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Entrance / exit animation driven by isVisible
  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll<HTMLElement>('[data-card]');

    if (isVisible) {
      gsap.set(containerRef.current, { pointerEvents: 'auto' });
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
        }
      );
    } else {
      gsap.to(cards, {
        autoAlpha: 0,
        y: 16,
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

  const colClass =
    columns === 4
      ? 'grid-cols-2 lg:grid-cols-4'
      : columns === 3
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1 sm:grid-cols-2';

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 py-12"
      style={{ zIndex: 10 }}
      aria-hidden={!isVisible}
    >
      <div
        className="w-full max-w-5xl overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 6rem)' }}
      >
        <div
          ref={gridRef}
          className={`grid gap-4 ${colClass}`}
        >
          {items.map((item, i) => (
            <div
              key={i}
              data-card
              className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm"
              style={{ opacity: 0, visibility: 'hidden' }}
            >
              {item.icon && (
                <span className="mb-2 block text-2xl" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <h3 className="mb-1 font-cinzel text-sm font-bold uppercase tracking-wide text-white">
                {item.title}
              </h3>
              <p className="font-raleway text-sm leading-relaxed text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
