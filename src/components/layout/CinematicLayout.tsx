'use client';

interface CinematicLayoutProps {
  children: React.ReactNode;
}

export default function CinematicLayout({ children }: CinematicLayoutProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:text-sm focus:font-semibold focus:rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
      >
        Skip to content
      </a>
      <main
        id="main-content"
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          background: '#0a0a0a',
        }}
      >
        {children}
      </main>
    </>
  );
}
