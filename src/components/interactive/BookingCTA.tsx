'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCalendly } from '@/hooks/useCalendly';

interface BookingCTAProps {
  heading: string;      // e.g. "Ready to build something that matters?"
  subheading?: string;  // e.g. Arabic quote — rendered RTL
  description?: string; // e.g. "Free 30-minute strategy call..."
  calendlyUrl: string;  // Calendly scheduling URL (or placeholder)
  onBooked: () => void; // Triggers cinematic outro
  isVisible: boolean;
}

export default function BookingCTA({
  heading,
  subheading,
  description,
  calendlyUrl,
  onBooked,
  isVisible,
}: BookingCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { containerRef: calendlyContainerRef, isLoaded } = useCalendly({
    url: calendlyUrl,
    onScheduled: onBooked,
  });

  // Entrance / exit animation driven by isVisible
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    if (isVisible) {
      gsap.set(containerRef.current, { pointerEvents: 'auto' });
      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power2.out' }
      );
    } else {
      gsap.to(contentRef.current, {
        autoAlpha: 0,
        y: 20,
        duration: 0.35,
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
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center overflow-y-auto px-4 py-12"
      style={{ zIndex: 10 }}
      aria-hidden={!isVisible}
    >
      <div
        ref={contentRef}
        className="flex w-full max-w-2xl flex-col items-center gap-6"
        style={{ opacity: 0, visibility: 'hidden' }}
      >
        {/* Heading */}
        <h2 className="text-center font-cinzel text-2xl font-bold uppercase tracking-widest text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] md:text-3xl lg:text-4xl">
          {heading}
        </h2>

        {/* Optional Arabic subheading */}
        {subheading && (
          <p
            className="text-center font-raleway text-base font-light leading-relaxed text-neutral-300 md:text-lg"
            dir="rtl"
            lang="ar"
          >
            {subheading}
          </p>
        )}

        {/* Optional description */}
        {description && (
          <p className="text-center font-raleway text-sm font-light leading-relaxed text-neutral-400 md:text-base">
            {description}
          </p>
        )}

        {/* Calendly inline widget mount point */}
        <div
          ref={calendlyContainerRef}
          className="w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md"
          style={{ minHeight: '320px' }}
          aria-label="Schedule a booking"
        />

        {/* Fallback button — shown until the widget initialises */}
        {!isLoaded && (
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isVisible ? 0 : -1}
            className="rounded-full bg-amber-500 px-8 py-4 font-cinzel text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-colors duration-200 hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:text-base"
          >
            Book Your Free Strategy Call
          </a>
        )}
      </div>
    </div>
  );
}
