'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface BookingCTAProps {
  isVisible: boolean;
  headline: string;
  subheadline?: string;
  calendlyUrl?: string;
  onBookingComplete?: () => void;
  showContinueLink?: boolean;
  onContinue?: () => void;
}

const DEFAULT_CALENDLY_URL = 'https://calendly.com/ummahmedia/discovery';

export default function BookingCTA({
  isVisible,
  headline,
  subheadline,
  calendlyUrl = DEFAULT_CALENDLY_URL,
  onBookingComplete,
  showContinueLink = false,
  onContinue,
}: BookingCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const iframeSrc = `${calendlyUrl}?hide_gdpr_banner=1&hide_event_type_details=1&background_color=0a0a0a&text_color=ededed&primary_color=ffffff`;

  // Fade in / fade out driven by isVisible
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    if (isVisible) {
      gsap.set(containerRef.current, { pointerEvents: 'auto' });
      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power2.out' }
      );
    } else {
      gsap.to(contentRef.current, {
        autoAlpha: 0,
        y: 16,
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

  // Notify parent when booking is complete via postMessage from Calendly
  useEffect(() => {
    if (!onBookingComplete) return;

    const handleMessage = (e: MessageEvent) => {
      if (
        e.data?.event === 'calendly.event_scheduled' ||
        e.data?.type === 'calendly.event_scheduled'
      ) {
        onBookingComplete();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onBookingComplete]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 py-10 overflow-y-auto"
      style={{ zIndex: 20 }}
      aria-hidden={!isVisible}
    >
      <div
        ref={contentRef}
        className="flex w-full flex-col items-center gap-6"
        style={{ opacity: 0, visibility: 'hidden', maxWidth: '600px' }}
      >
        {/* Headline block */}
        <div className="text-center">
          <h2
            className="font-cinzel text-3xl font-normal uppercase tracking-[0.15em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] sm:text-4xl md:text-5xl"
          >
            {headline}
          </h2>
          {subheadline && (
            <p className="mt-3 font-raleway text-base font-light tracking-wide text-white/70 sm:text-lg">
              {subheadline}
            </p>
          )}
        </div>

        {/* Calendly embed */}
        <div className="relative w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
          {/* Loading skeleton */}
          {!iframeLoaded && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              aria-label="Loading booking calendar"
            >
              {/* Spinner */}
              <svg
                className="h-8 w-8 animate-spin text-white/30"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {/* Skeleton rows */}
              <div className="flex w-3/4 flex-col gap-3 mt-2">
                <div className="h-3 w-full rounded-full bg-white/10 animate-pulse" />
                <div className="h-3 w-5/6 rounded-full bg-white/10 animate-pulse" />
                <div className="h-3 w-4/6 rounded-full bg-white/10 animate-pulse" />
              </div>
            </div>
          )}

          <iframe
            src={iframeSrc}
            width="100%"
            height="500"
            frameBorder="0"
            title="Book a discovery call with Ummah Media"
            allow="payment"
            style={{ display: 'block', opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        {/* "Or continue exploring" — homepage only */}
        {showContinueLink && (
          <button
            onClick={onContinue}
            tabIndex={isVisible ? 0 : -1}
            className="mt-2 flex flex-col items-center gap-1 font-raleway text-xs font-light tracking-widest text-white/40 transition-colors duration-200 hover:text-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
          >
            <span>Or continue exploring</span>
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
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
