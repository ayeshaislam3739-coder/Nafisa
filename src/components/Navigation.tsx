import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Menu, X } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface NavigationProps {
  onCelebrateClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onCelebrateClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Celebration', href: '#celebration' },
    { label: 'Story', href: '#story' },
    { label: 'Cake', href: '#cake' },
    { label: 'Love Keys', href: '#discover-heart' },
    { label: 'Letter', href: '#letter' },
    { label: 'My Heart', href: '#heart-piece' },
    { label: 'Capsules', href: '#capsules' },
    { label: 'Message', href: '#tell-you' },
    { label: 'Quotes', href: '#quotes' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCelebrate = () => {
    setMobileMenuOpen(false);
    onCelebrateClick();
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#180715]/90 backdrop-blur-md border-b border-[#D9B76E]/20 py-3 shadow-lg'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6">
          {/* Zone 1: Brand title, one line */}
          <a
            href="#"
            className="font-playfair text-xl sm:text-2xl font-bold tracking-wider gold-gradient-text uppercase whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>{birthdayConfig.birthdayName}</span>
            <Heart className="w-3.5 h-3.5 fill-[#E88CA8] text-[#E88CA8]" />
          </a>

          {/* Zone 2: Desktop 4–5 nav links, single-line */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-widest uppercase text-[#FFF4EA]/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="hover:text-[#D9B76E] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleCelebrate}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-[#1a0815] bg-[#D9B76E] hover:bg-[#FFF0D0] transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Celebrate</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-[#FFF4EA] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-35 md:hidden bg-black/80 backdrop-blur-md flex flex-col justify-center px-8 py-16 space-y-6">
          <div className="text-center pb-4 border-b border-[#D9B76E]/20">
            <p className="font-script text-3xl text-[#F7C5D0]">Dedicated with love</p>
            <p className="font-playfair text-xl text-[#D9B76E] font-bold uppercase tracking-wider">
              {birthdayConfig.birthdayName}
            </p>
          </div>

          <nav className="flex flex-col items-center gap-5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-base font-cormorant uppercase tracking-[0.25em] text-[#FFF4EA] hover:text-[#D9B76E] transition-colors py-2 cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={handleCelebrate}
              className="mt-4 inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-semibold tracking-widest uppercase text-[#1a0815] bg-[#D9B76E] shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Celebrate Now</span>
            </button>
          </nav>
        </div>
      )}
    </>
  );
};
