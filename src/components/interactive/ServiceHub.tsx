'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SERVICES, type ServiceInfo } from '@/lib/services';
import ServiceCard from './ServiceCard';

interface ServiceHubProps {
  isVisible: boolean;
  onServiceSelect: (service: ServiceInfo) => void;
  onContinueScrolling: () => void;
}

export default function ServiceHub({
  isVisible,
  onServiceSelect,
  onContinueScrolling,
}: ServiceHubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

  // Chevron bounce animation (runs continuously while hub is mounted)
  useEffect(() => {
    if (!chevronRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(chevronRef.current, {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 0.9,
        ease: 'power1.inOut',
      });
    });
    return () => ctx.revert();
  }, []);

  // Entrance / exit animation driven by isVisible
  useEffect(() => {
    if (!containerRef.current || !headingRef.current || !cardsRef.current || !indicatorRef.current) return;

    const cards = cardsRef.current.querySelectorAll<HTMLElement>('[data-card]');

    if (isVisible) {
      gsap.set(containerRef.current, { autoAlpha: 1, pointerEvents: 'auto' });

      const tl = gsap.timeline();

      // 1. Heading fades in first
      tl.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: -20 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      // 2. Cards stagger in one by one
      tl.fromTo(
        cards,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=0.2'
      );

      // 3. Scroll indicator appears last
      tl.fromTo(
        indicatorRef.current,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.1'
      );
    } else {
      // Exit: everything fades out quickly
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(containerRef.current, { autoAlpha: 0, pointerEvents: 'none' });
        },
      });

      tl.to(
        [cards, headingRef.current, indicatorRef.current],
        {
          autoAlpha: 0,
          y: -10,
          duration: 0.25,
          ease: 'power1.in',
          stagger: 0.03,
        }
      );
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 py-12"
      style={{
        opacity: 0,
        visibility: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="mb-10 max-w-3xl text-center font-cinzel text-2xl font-bold uppercase tracking-widest text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] md:text-3xl lg:text-4xl"
        style={{ opacity: 0, visibility: 'hidden' }}
      >
        Which service benefits your organization the most?
      </h2>

      {/* 6-card grid: 1 col mobile / 2 col tablet / 3 col desktop */}
      <div
        ref={cardsRef}
        className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service) => (
          <div key={service.id} data-card style={{ opacity: 0, visibility: 'hidden' }}>
            <ServiceCard service={service} onSelect={onServiceSelect} />
          </div>
        ))}
      </div>

      {/* "Or keep scrolling" indicator */}
      <div
        ref={indicatorRef}
        className="mt-10 flex cursor-pointer flex-col items-center gap-2"
        style={{ opacity: 0 }}
        onClick={onContinueScrolling}
        role="button"
        tabIndex={0}
        aria-label="Continue scrolling to explore all services"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onContinueScrolling();
          }
        }}
      >
        <span className="font-raleway text-sm font-light tracking-widest text-neutral-400">
          or keep scrolling
        </span>
        <svg
          ref={chevronRef}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-neutral-400"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}
