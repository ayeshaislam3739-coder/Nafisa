import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Menu, X } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { SecretNameRevealModal } from './SecretNameRevealModal';

interface NavigationProps {
  onCelebrateClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onCelebrateClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secretModalOpen, setSecretModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'Memories', href: '#story', hasSurprise: true },
    { label: 'Letter', href: '#letter', hasSurprise: true },
    { label: 'Forever', href: '#celebration', hasSurprise: true },
    { label: 'Boutique', href: '#cake', hasSurprise: true },
    { label: 'Heart', href: '#heart-reveal', hasSurprise: true },
    { label: 'Notes', href: '#tell-you', hasSurprise: true },
    { label: 'Experiences', href: '#experiences', hasSurprise: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active section detection
      const scrollPos = window.scrollY + 200;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.querySelector(navLinks[i].href);
        if (el && (el as HTMLElement).offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].href.slice(1));
          return;
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleTitleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSecretModalOpen(true);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#120308]/92 backdrop-blur-md border-b border-[#D9B76E]/25 py-3 shadow-lg'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6">
          {/* Zone 1: Brand title with subtle secret hint - Clicking triggers Secret Reveal (Part 3) */}
          <button
            onClick={handleTitleClick}
            className="group font-playfair text-xl sm:text-2xl font-bold tracking-wider gold-gradient-text uppercase whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.03] text-left"
            title="Click to discover the secret inside your name"
            aria-label="Secret reveal for Nafisa"
          >
            <span className="relative">
              {birthdayConfig.birthdayName}
              {/* Subtle passing shimmer line */}
              <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D9B76E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="relative flex items-center">
              <Heart className="w-3.5 h-3.5 fill-[#E88CA8] text-[#E88CA8] group-hover:scale-125 transition-transform" />
              {/* Subtle glowing hint sparkle */}
              <Sparkles className="w-3 h-3 text-[#D9B76E] animate-pulse ml-0.5 opacity-80 group-hover:opacity-100" />
            </span>
          </button>

          {/* Zone 2: Desktop nav links with active state & subtle surprise dot (Part 4) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs font-semibold tracking-widest uppercase text-[#FFF4EA]/80">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#D9B76E] cursor-pointer ${
                    isActive ? 'text-[#D9B76E] font-bold' : 'text-[#FFF4EA]/75'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Subtle surprise marker dot */}
                  {link.hasSurprise && (
                    <span className="inline-block w-1 h-1 rounded-full bg-[#E88CA8]/70 ml-1.5 align-middle" />
                  )}
                  {/* Active underline indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#D9B76E] rounded-full" />
                  )}
                </a>
              );
            })}
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
              className="lg:hidden p-2 rounded-full text-[#FFF4EA] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-35 lg:hidden bg-black/85 backdrop-blur-md flex flex-col justify-center px-8 py-16 space-y-6">
          <div className="text-center pb-4 border-b border-[#D9B76E]/20">
            <p className="font-script text-3xl text-[#F7C5D0]">Dedicated with love</p>
            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleTitleClick(e);
              }}
              className="font-playfair text-2xl text-[#D9B76E] font-bold uppercase tracking-wider inline-flex items-center gap-2 mt-1"
            >
              <span>{birthdayConfig.birthdayName}</span>
              <Heart className="w-4 h-4 fill-[#E88CA8] text-[#E88CA8]" />
              <Sparkles className="w-3.5 h-3.5 text-[#D9B76E]" />
            </button>
            <p className="text-[11px] text-[#FFF4EA]/60 italic pt-1">
              Tap her name for a hidden secret
            </p>
          </div>

          <nav className="flex flex-col items-center gap-4 max-h-[50vh] overflow-y-auto">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className={`text-base font-cormorant uppercase tracking-[0.25em] transition-colors py-1.5 cursor-pointer flex items-center gap-2 ${
                    isActive ? 'text-[#D9B76E] font-bold' : 'text-[#FFF4EA] hover:text-[#D9B76E]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasSurprise && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E88CA8]" />
                  )}
                </button>
              );
            })}

            <button
              onClick={handleCelebrate}
              className="mt-3 inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-semibold tracking-widest uppercase text-[#1a0815] bg-[#D9B76E] shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Celebrate Now</span>
            </button>
          </nav>
        </div>
      )}

      {/* Secret Name Reveal Modal (Part 3) */}
      <SecretNameRevealModal
        isOpen={secretModalOpen}
        onClose={() => setSecretModalOpen(false)}
      />
    </>
  );
};
