'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface AccordionItem {
  title: string;
  description: string;
  icon?: string;
}

interface InfoAccordionProps {
  isVisible: boolean;
  items: AccordionItem[];
}

export default function InfoAccordion({ isVisible, items }: InfoAccordionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState(0);

  // Entrance / exit animation driven by isVisible
  useEffect(() => {
    if (!containerRef.current || !listRef.current) return;

    const rows = listRef.current.querySelectorAll<HTMLElement>('[data-row]');

    if (isVisible) {
      gsap.set(containerRef.current, { pointerEvents: 'auto' });
      gsap.fromTo(
        rows,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.08,
        }
      );
    } else {
      gsap.to(rows, {
        autoAlpha: 0,
        y: 12,
        duration: 0.25,
        ease: 'power1.in',
        stagger: 0.04,
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
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 py-12"
      style={{ zIndex: 10 }}
      aria-hidden={!isVisible}
    >
      <div
        ref={listRef}
        className="w-full max-w-[600px] overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 6rem)' }}
      >
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              data-row
              className={`border-b ${isOpen ? 'border-white/20' : 'border-white/10'}`}
              style={{ opacity: 0, visibility: 'hidden' }}
            >
              {/* Header */}
              <button
                className="flex w-full items-center gap-3 bg-black/30 px-4 py-3 text-left backdrop-blur-sm transition-colors duration-200 hover:bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                tabIndex={isVisible ? 0 : -1}
              >
                {item.icon && (
                  <span className="shrink-0 text-lg" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span className="flex-1 font-cinzel text-sm font-bold uppercase tracking-wide text-white">
                  {item.title}
                </span>
                {/* Chevron */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`shrink-0 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Collapsible content — CSS grid trick for smooth height */}
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="px-4 py-3 font-raleway text-sm leading-relaxed text-white/70">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
