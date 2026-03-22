'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MiniCTAProps {
  label: string;            // e.g. "Explore Brand Development"
  route: string;            // e.g. "/brand-development"
  secondaryLabel?: string;  // e.g. "Are You a Muslim Creator? Join the Roster"
  secondaryRoute?: string;
  isVisible: boolean;
  onNavigate: (route: string) => void; // Parent handles navigation + transition
}

export default function MiniCTA({
  label,
  route,
  secondaryLabel,
  secondaryRoute,
  isVisible,
  onNavigate,
}: MiniCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

  // Continuous chevron bounce
  useEffect(() => {
    if (!chevronRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(chevronRef.current, {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 0.85,
        ease: 'power1.inOut',
      });
    });
    return () => ctx.revert();
  }, []);

  // Entrance / exit driven by isVisible
  useEffect(() => {
    if (!containerRef.current || !cardRef.current) return;

    if (isVisible) {
      gsap.set(containerRef.current, { pointerEvents: 'auto' });
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' }
      );
    } else {
      gsap.to(cardRef.current, {
        autoAlpha: 0,
        y: 20,
        duration: 0.3,
        ease: 'power1.in',
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
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-5"
      style={{ zIndex: 10 }}
      aria-hidden={!isVisible}
    >
      {/* Animated content card */}
      <div
        ref={cardRef}
        className="flex flex-col items-center gap-4"
        style={{ opacity: 0, visibility: 'hidden' }}
      >
        {/* Primary CTA button */}
        <button
          onClick={() => onNavigate(route)}
          tabIndex={isVisible ? 0 : -1}
          className="rounded-full bg-amber-500 px-8 py-4 font-cinzel text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-colors duration-200 hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:text-base"
        >
          {label}
        </button>

        {/* Optional secondary CTA */}
        {secondaryLabel && secondaryRoute && (
          <button
            onClick={() => onNavigate(secondaryRoute)}
            tabIndex={isVisible ? 0 : -1}
            className="rounded-full border border-white/30 px-6 py-2.5 font-raleway text-xs font-light tracking-widest text-white/80 transition-colors duration-200 hover:border-white/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:text-sm"
          >
            {secondaryLabel}
          </button>
        )}

        {/* Scroll-down indicator */}
        <div className="mt-2 flex flex-col items-center gap-1.5" aria-hidden="true">
          <span className="font-raleway text-xs font-light tracking-widest text-neutral-400">
            or keep scrolling
          </span>
          <svg
            ref={chevronRef}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-400"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>
  );
}
