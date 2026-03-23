'use client';

import Link from 'next/link';
import { useEffect, useState, useRef, useCallback } from 'react';

const SERVICES = [
  { label: 'Brand Development', href: '/brand-development' },
  { label: 'Video Marketing', href: '/video-marketing' },
  { label: 'Social Media Marketing', href: '/social-media' },
  { label: 'UGC & Influencer Agency', href: '/ugc-influencer' },
  { label: 'SmartSuite', href: '/smartsuite' },
  { label: 'AI Education', href: '/ai-education' },
];

export default function CinematicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect hero overlay to switch to light mode
  useEffect(() => {
    const check = () => {
      const hero = document.getElementById('hero-intro');
      setLightMode(!!hero);
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!servicesOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    setTimeout(() => document.addEventListener('click', handleClick), 0);
    return () => document.removeEventListener('click', handleClick);
  }, [servicesOpen]);

  const openDropdown = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setServicesOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  }, []);

  const linkClass = lightMode
    ? 'text-[#666] hover:text-[#c9a961] text-xs tracking-[2px] uppercase transition-colors duration-200 font-raleway'
    : 'text-white/80 hover:text-white text-xs tracking-[2px] uppercase transition-colors duration-200 font-raleway';

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[200] w-full transition-all duration-500"
      style={{
        background: lightMode
          ? '#faf8f3'
          : scrolled ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)',
        backdropFilter: lightMode ? 'none' : scrolled ? 'blur(12px)' : 'blur(0px)',
        WebkitBackdropFilter: lightMode ? 'none' : scrolled ? 'blur(12px)' : 'blur(0px)',
        borderBottom: lightMode ? '1px solid rgba(201,169,97,0.15)' : 'none',
      }}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity"
          aria-label="Ummah Media — Home"
        >
          <img
            src="/ummah-media-logo-v2.png"
            alt=""
            className="h-8 w-8 object-contain"
          />
          <span className={`font-cinzel text-sm tracking-[4px] uppercase ${lightMode ? 'text-[#1a1a1a]' : 'text-white'}`}>
            Ummah Media
          </span>
        </Link>

        {/* Bismillah — centered between logo and nav */}
        <span className={`hidden md:block text-sm font-normal font-amiri ${lightMode ? 'text-[#c9a961]' : 'text-white/50'}`} dir="rtl">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </span>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={linkClass}>
            Home
          </Link>

          {/* Services Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
          >
            <button
              className={`${linkClass} flex items-center gap-1`}
              onClick={() => setServicesOpen(!servicesOpen)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg py-2 shadow-2xl transition-all duration-200 ${
                lightMode
                  ? 'border border-[#c9a961]/20 bg-[#faf8f3] backdrop-blur-none'
                  : 'border border-white/10 bg-black/80 backdrop-blur-xl'
              } ${
                servicesOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              {SERVICES.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className={`block px-4 py-2.5 text-xs tracking-[1.5px] uppercase transition-colors duration-150 font-raleway ${
                    lightMode
                      ? 'text-[#666] hover:text-[#c9a961] hover:bg-[#c9a961]/5'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setServicesOpen(false)}
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/work" className={linkClass}>
            Work
          </Link>
          <Link href="/about" className={linkClass}>
            About
          </Link>
          <Link href="/contact" className={linkClass}>
            Contact
          </Link>

        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white/80 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden border-t border-white/5 bg-black/90 backdrop-blur-xl transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          <Link
            href="/"
            className={`${linkClass} block py-3`}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          {/* Mobile Services Accordion */}
          <button
            className={`${linkClass} flex items-center justify-between w-full py-3 text-left`}
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            aria-expanded={mobileServicesOpen}
          >
            Services
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              mobileServicesOpen ? 'max-h-[300px]' : 'max-h-0'
            }`}
          >
            {SERVICES.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="block pl-4 py-2.5 text-xs tracking-[1.5px] uppercase text-white/50 hover:text-white transition-colors font-raleway"
                onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
              >
                {service.label}
              </Link>
            ))}
          </div>

          <Link
            href="/work"
            className={`${linkClass} block py-3`}
            onClick={() => setMobileOpen(false)}
          >
            Work
          </Link>
          <Link
            href="/about"
            className={`${linkClass} block py-3`}
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`${linkClass} block py-3`}
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
