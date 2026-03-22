'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Module {
  id: string;
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: string;
}

interface ModuleExplorerProps {
  isVisible: boolean;
  modules: Module[];
}

export default function ModuleExplorer({ isVisible, modules }: ModuleExplorerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(modules[0]?.id ?? '');

  const activeModule = modules.find((m) => m.id === activeId) ?? modules[0];

  // Entrance / exit animation driven by isVisible
  useEffect(() => {
    if (!containerRef.current || !panelRef.current) return;

    if (isVisible) {
      gsap.set(containerRef.current, { pointerEvents: 'auto' });
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' }
      );
    } else {
      gsap.to(panelRef.current, {
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
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 py-12"
      style={{ zIndex: 10 }}
      aria-hidden={!isVisible}
    >
      <div
        ref={panelRef}
        className="flex w-full max-w-[800px] flex-col gap-4 overflow-y-auto md:flex-row md:gap-0"
        style={{ maxHeight: 'calc(100vh - 6rem)', opacity: 0, visibility: 'hidden' }}
      >
        {/* Tab list — left side on desktop, top on mobile */}
        <div
          className="flex shrink-0 flex-col md:w-48 md:border-r md:border-white/10"
          role="tablist"
          aria-label="SmartSuite modules"
        >
          {modules.map((mod) => {
            const isActive = mod.id === activeId;
            return (
              <button
                key={mod.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`module-panel-${mod.id}`}
                id={`module-tab-${mod.id}`}
                tabIndex={isVisible ? (isActive ? 0 : -1) : -1}
                onClick={() => setActiveId(mod.id)}
                className={`border px-4 py-3 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                  isActive
                    ? 'border-white/20 bg-white/10 text-white'
                    : 'border-white/10 bg-black/30 text-white/60 hover:bg-black/50 hover:text-white/80'
                } w-full backdrop-blur-sm`}
              >
                <span className="mr-2" aria-hidden="true">
                  {mod.icon}
                </span>
                <span className="font-raleway text-sm font-medium">
                  {mod.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail panel — right side on desktop, bottom on mobile */}
        {activeModule && (
          <div
            id={`module-panel-${activeModule.id}`}
            role="tabpanel"
            aria-labelledby={`module-tab-${activeModule.id}`}
            className="flex-1 rounded-b-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm md:rounded-none md:rounded-r-xl"
          >
            {/* Module name */}
            <h3 className="mb-1 font-cinzel text-lg font-bold uppercase tracking-widest text-white">
              {activeModule.name}
            </h3>

            {/* Tagline */}
            <p className="mb-3 font-raleway text-xs font-light uppercase tracking-widest text-amber-400">
              {activeModule.tagline}
            </p>

            {/* Description */}
            <p className="mb-4 font-raleway text-sm leading-relaxed text-white/70">
              {activeModule.description}
            </p>

            {/* Deliverables */}
            {activeModule.deliverables.length > 0 && (
              <ul className="space-y-1.5">
                {activeModule.deliverables.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-raleway text-sm text-white/60"
                  >
                    <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true">
                      &#8250;
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
