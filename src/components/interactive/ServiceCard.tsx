'use client';

import type { ServiceInfo } from '@/lib/services';

interface ServiceCardProps {
  service: ServiceInfo;
  onSelect: (service: ServiceInfo) => void;
}

export default function ServiceCard({ service, onSelect }: ServiceCardProps) {
  return (
    <button
      onClick={() => onSelect(service)}
      className="group relative w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 px-6 py-8 text-left backdrop-blur-md transition-all duration-300 ease-out hover:scale-[1.02] hover:border-amber-400/40 hover:bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
      style={{
        boxShadow: '0 0 0 0 rgba(251, 191, 36, 0)',
        transition: 'transform 300ms ease-out, border-color 300ms ease-out, background-color 300ms ease-out, box-shadow 300ms ease-out',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          '0 0 24px 2px rgba(251, 191, 36, 0.18), 0 0 8px 0 rgba(251, 191, 36, 0.10)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          '0 0 0 0 rgba(251, 191, 36, 0)';
      }}
    >
      <h3
        className="mb-3 font-cinzel text-lg font-bold uppercase tracking-widest text-white md:text-xl"
      >
        {service.name}
      </h3>
      <p className="font-raleway text-sm font-light leading-relaxed text-neutral-300 md:text-base">
        {service.tagline}
      </p>

      {/* Subtle arrow indicator */}
      <span
        className="absolute bottom-5 right-5 text-amber-400/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-400/80"
        aria-hidden="true"
      >
        →
      </span>
    </button>
  );
}
