'use client';

import { useRef, useState, useEffect } from 'react';

interface UseCalendlyOptions {
  url: string;           // Calendly scheduling URL
  onScheduled: () => void; // Called when booking is confirmed
}

interface UseCalendlyReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  isLoaded: boolean;
}

// Minimal type shim for the Calendly global injected by the external script
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
    };
  }
}

export function useCalendly({ url, onScheduled }: UseCalendlyOptions): UseCalendlyReturn {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!url) return;

    const scriptId = 'calendly-widget-script';

    function initWidget() {
      if (!containerRef.current) return;

      if (typeof window.Calendly === 'undefined') {
        // No Calendly global — render a graceful placeholder
        containerRef.current.innerHTML =
          '<p style="color:rgba(255,255,255,0.4);font-family:sans-serif;text-align:center;padding:2rem;">Calendly widget unavailable in this environment.</p>';
        setIsLoaded(true);
        return;
      }

      window.Calendly.initInlineWidget({
        url,
        parentElement: containerRef.current,
      });
      setIsLoaded(true);
    }

    // If the script is already present, init immediately
    if (document.getElementById(scriptId)) {
      initWidget();
      return;
    }

    // Dynamically inject the Calendly embed script
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = initWidget;
    script.onerror = () => {
      // Script failed to load — fall back to placeholder
      if (containerRef.current) {
        containerRef.current.innerHTML =
          '<p style="color:rgba(255,255,255,0.4);font-family:sans-serif;text-align:center;padding:2rem;">Calendly widget unavailable in this environment.</p>';
      }
      setIsLoaded(true);
    };
    document.head.appendChild(script);
  }, [url]);

  // Listen for the Calendly "event scheduled" postMessage
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (
        event.data &&
        typeof event.data === 'object' &&
        event.data.event === 'calendly.event_scheduled'
      ) {
        onScheduled();
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onScheduled]);

  return { containerRef, isLoaded };
}
