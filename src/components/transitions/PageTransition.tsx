'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PageTransitionProps {
  /** When true, play the transition animation */
  isActive: boolean;
  /** Called when the transition animation finishes */
  onComplete: () => void;
}

/**
 * Full-screen cinematic overlay used when navigating between pages.
 * When isActive becomes true a dark overlay expands from the center (~600ms),
 * then onComplete is called so the parent can router.push() to the next route.
 */
export default function PageTransition({ isActive, onComplete }: PageTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !overlayRef.current) return;

    // Reset to starting state
    gsap.set(overlayRef.current, {
      autoAlpha: 1,
      scale: 0,
      borderRadius: '50%',
    });

    // Expand from center to full screen
    gsap.to(overlayRef.current, {
      scale: 3,
      borderRadius: '0%',
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete,
    });
  }, [isActive, onComplete]);

  // When not active, keep overlay invisible and out of pointer path
  if (!isActive) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0a0a0a',
        // GSAP controls transform; start collapsed
        transform: 'scale(0)',
        opacity: 0,
        pointerEvents: 'all',
        transformOrigin: 'center center',
      }}
    />
  );
}
