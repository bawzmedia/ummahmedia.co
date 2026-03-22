'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export interface DiagramNode {
  id: string;
  title: string;
  description: string;
  color?: string;
}

export interface AccordionDiagramProps {
  nodes: DiagramNode[];
  isVisible: boolean;
}

export default function AccordionDiagram({ nodes, isVisible }: AccordionDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  // Entrance / exit animation driven by isVisible
  useEffect(() => {
    if (!containerRef.current || !listRef.current) return;

    const rows = listRef.current.querySelectorAll<HTMLElement>('[data-node]');

    if (isVisible) {
      gsap.set(containerRef.current, { pointerEvents: 'auto' });
      gsap.fromTo(
        rows,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.09,
        }
      );
    } else {
      // Collapse any open node
      setOpenId(null);
      gsap.to(rows, {
        autoAlpha: 0,
        y: 16,
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

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 py-12"
      style={{ zIndex: 10 }}
      aria-hidden={!isVisible}
    >
      <div
        ref={listRef}
        className="w-full max-w-[640px] overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 6rem)' }}
      >
        {nodes.map((node) => {
          const isOpen = openId === node.id;
          const accentColor = node.color ?? '#d97706'; // amber-600 default
          return (
            <div
              key={node.id}
              data-node
              className="mb-2 overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-md"
              style={{
                borderLeft: `3px solid ${accentColor}`,
                opacity: 0,
                visibility: 'hidden',
              }}
            >
              {/* Toggle header */}
              <button
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors duration-200 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                onClick={() => handleToggle(node.id)}
                aria-expanded={isOpen}
                tabIndex={isVisible ? 0 : -1}
              >
                <span className="font-cinzel text-sm font-bold uppercase tracking-wide text-white">
                  {node.title}
                </span>
                {/* +/- indicator */}
                <span
                  className="shrink-0 font-raleway text-xl font-light leading-none text-white/60 transition-transform duration-300"
                  aria-hidden="true"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </button>

              {/* Collapsible content — CSS grid trick for smooth height */}
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 pt-1 font-raleway text-sm leading-relaxed text-neutral-300">
                    {node.description}
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
