'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getPageConfig } from '@/lib/scenes';
import type { Scene } from '@/lib/scenes';
import type { PageId } from '@/lib/frame-utils';
import PageTransition from '@/components/transitions/PageTransition';
import BookingCTA from '@/components/interactive/BookingCTA';
import MiniCTA from '@/components/interactive/MiniCTA';

const ScrollCanvas = dynamic(
  () => import('@/components/scroll-engine/ScrollCanvas'),
  { ssr: false }
);

interface ServiceFunnelPageProps {
  pageId: PageId;
  /**
   * Map of scene ID -> React node to render at that scene's pause point.
   * When provided for a scene, it replaces the default MiniCTA/BookingCTA
   * that would otherwise be shown based on scene.interactive.
   */
  interactiveContent?: Record<string, React.ReactNode>;
}

export default function ServiceFunnelPage({
  pageId,
  interactiveContent = {},
}: ServiceFunnelPageProps) {
  const router = useRouter();
  const config = getPageConfig(pageId);

  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [targetRoute, setTargetRoute] = useState<string | null>(null);

  // Called by ScrollCanvas when a scene finishes playing
  const handleSceneChange = useCallback((scene: Scene) => {
    setCurrentScene(scene);
  }, []);

  // Navigation handler: trigger cinematic transition then push route
  const handleNavigate = useCallback((route: string) => {
    setTargetRoute(route);
    setTransitioning(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    if (targetRoute) {
      router.push(targetRoute);
    }
  }, [router, targetRoute]);

  // Booking completion handler (Phase 5: cinematic outro)
  const handleBooked = useCallback(() => {
    console.log('[ServiceFunnelPage] Booking confirmed — cinematic outro queued (Phase 5).');
  }, []);

  // Determine what interactive UI to show for the current scene
  const renderInteractiveOverlay = () => {
    if (!currentScene) return null;

    const sceneId = currentScene.id;

    // If caller provided explicit content for this scene, render it
    if (interactiveContent[sceneId] !== undefined) {
      return interactiveContent[sceneId];
    }

    const interactiveType = currentScene.interactive;

    // Booking scene: last scene of every service page
    if (interactiveType === 'booking') {
      return (
        <BookingCTA
          heading={currentScene.text ?? "Let's build something that matters."}
          calendlyUrl="https://calendly.com/ummahmedia/strategy"
          onBooked={handleBooked}
          isVisible
        />
      );
    }

    // Mini-CTA for intermediate scenes (cards, accordion, module-explorer)
    if (
      interactiveType === 'mini-cta' ||
      interactiveType === 'cards' ||
      interactiveType === 'accordion' ||
      interactiveType === 'module-explorer'
    ) {
      // Derive a sensible default route from the pageId
      const serviceRoutes: Record<PageId, string> = {
        homepage: '/',
        'brand-development': '/brand-development',
        'video-marketing': '/video-marketing',
        'social-media': '/social-media',
        'ugc-influencer': '/ugc-influencer',
        smartsuite: '/smartsuite',
        'ai-education': '/ai-education',
      };
      const route = serviceRoutes[pageId];

      return (
        <MiniCTA
          label="Get Started"
          route={route}
          isVisible
          onNavigate={handleNavigate}
        />
      );
    }

    return null;
  };

  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <p className="font-cinzel tracking-widest">Page not found.</p>
      </div>
    );
  }

  return (
    <>
      <ScrollCanvas
        pageId={config.pageId}
        scenes={config.scenes}
        totalFrames={config.totalFrames}
        onSceneChange={handleSceneChange}
      >
        {renderInteractiveOverlay()}
      </ScrollCanvas>

      {/* Cinematic page transition overlay */}
      <PageTransition
        isActive={transitioning}
        onComplete={handleTransitionComplete}
      />
    </>
  );
}
