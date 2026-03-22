'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export interface ModuleTile {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ModuleExplorerProps {
  modules: ModuleTile[];
  isVisible: boolean;
}

export default function ModuleExplorer({ modules, isVisible }: ModuleExplorerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Entrance / exit animation driven by isVisible
  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;

    const tiles = gridRef.current.querySelectorAll<HTMLElement>('[data-tile]');

    if (isVisible) {
      gsap.set(containerRef.current, { pointerEvents: 'auto' });
      gsap.fromTo(
        tiles,
        { autoAlpha: 0, y: 28, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
        }
      );
    } else {
      setExpandedId(null);
      gsap.to(tiles, {
        autoAlpha: 0,
        y: 20,
        scale: 0.96,
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

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

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
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {modules.map((mod) => {
            const isExpanded = expandedId === mod.id;
            return (
              <div
                key={mod.id}
                data-tile
                className={[
                  'cursor-pointer rounded-xl border bg-white/5 backdrop-blur-md transition-all duration-300',
                  isExpanded
                    ? 'border-amber-500/60 bg-white/10'
                    : 'border-white/10 hover:border-white/25',
                ].join(' ')}
                style={{ opacity: 0, visibility: 'hidden' }}
                onClick={() => handleToggle(mod.id)}
                role="button"
                tabIndex={isVisible ? 0 : -1}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle(mod.id);
                  }
                }}
              >
                {/* Tile header — always visible */}
                <div className="flex items-center justify-between gap-3 p-5">
                  <h3 className="font-cinzel text-sm font-bold uppercase tracking-wide text-white">
                    {mod.title}
                  </h3>
                  <span
                    className="shrink-0 font-raleway text-xl font-light leading-none text-white/50 transition-transform duration-300"
                    aria-hidden="true"
                    style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    +
                  </span>
                </div>

                {/* Expanded content */}
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/10 px-5 pb-5 pt-4">
                      <p className="mb-3 font-raleway text-sm leading-relaxed text-neutral-300">
                        {mod.description}
                      </p>
                      {mod.deliverables.length > 0 && (
                        <ul className="space-y-1.5">
                          {mod.deliverables.map((d, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 font-raleway text-xs text-neutral-400"
                            >
                              <span
                                className="mt-0.5 shrink-0 text-amber-500"
                                aria-hidden="true"
                              >
                                ›
                              </span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
