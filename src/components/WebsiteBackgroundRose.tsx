import React, { useEffect, useState, memo } from 'react';
import roseImg from '../assets/images/uploaded_rose_transparent.webp';

/**
 * WebsiteBackgroundRose
 * 
 * Features the user's exact uploaded red rose with transparent background.
 * Horizontally and vertically centered as the single permanent decorative
 * background element across the entire website, maintaining its exact
 * aspect ratio and natural flowing smoke stem.
 */
export const WebsiteBackgroundRose: React.FC = memo(() => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;
    let current = 0;
    let target = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      target = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    const update = () => {
      current += (target - current) * 0.1;
      setScrollProgress(current);

      if (Math.abs(target - current) > 0.001) {
        rafId = requestAnimationFrame(update);
      } else {
        rafId = null;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Subtle scroll-linked ambient presence (opacity gently enriches from 0.70 at top to 0.88 deeper in)
  const opacity = 0.70 + scrollProgress * 0.18;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Soft atmospheric burgundy/plum halo behind the flower */}
      <div
        className="absolute w-[460px] sm:w-[620px] md:w-[720px] h-[580px] sm:h-[750px] md:h-[850px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(229,43,80,0.18) 0%, rgba(64,13,36,0.26) 45%, transparent 75%)',
          opacity: 0.8 + scrollProgress * 0.2,
        }}
      />

      {/* Main Single Centered Rose Container */}
      <div
        className="relative flex items-center justify-center w-[300px] sm:w-[380px] md:w-[440px] lg:w-[480px] max-h-[82vh] transition-opacity duration-500"
        style={{
          opacity,
        }}
      >
        <img
          src={roseImg}
          alt="Romantic Red Rose"
          loading="eager"
          decoding="async"
          className="w-full h-auto object-contain pointer-events-none select-none transition-all duration-300"
          style={{
            filter:
              'drop-shadow(0 25px 45px rgba(64,13,36,0.6)) drop-shadow(0 8px 20px rgba(0,0,0,0.75))',
            // Soft gradient mask to softly dissolve the very bottom tip of the stem into the dark ground
            WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
});
