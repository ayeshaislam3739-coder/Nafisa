import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import uploadedRoseUrl from '../assets/images/uploaded_rose_transparent.webp';
import pinkRoseImg from '../assets/images/flower_pink_rose_1794570559305.jpg';

interface BirthdayHeroProps {
  onDiscover: () => void;
}

const NATURAL_HERO_PETALS = [
  { left: '10%', top: '16%', rotate: -22, size: 15, duration: 9, delay: 0.4, tint: '#9E1938' },
  { left: '42%', top: '20%', rotate: 28, size: 13, duration: 11, delay: 1.0, tint: '#D47B92' },
  { left: '18%', top: '68%', rotate: 16, size: 13, duration: 10, delay: 0.8, tint: '#800F2B' },
  { left: '54%', top: '76%', rotate: -34, size: 16, duration: 12, delay: 1.6, tint: '#B22449' },
  { left: '34%', top: '12%', rotate: 12, size: 12, duration: 9.5, delay: 0.2, tint: '#E69FB2' },
];

export const BirthdayHero: React.FC<BirthdayHeroProps> = ({ onDiscover }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center pt-18 sm:pt-20 pb-8 sm:pb-10 px-3 sm:px-6 overflow-hidden"
    >
      {/* Subtle Background Ambient Warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 60% 44%, rgba(217, 183, 110, 0.12) 0%, rgba(122, 16, 43, 0.24) 45%, rgba(10, 2, 5, 0.96) 85%)',
        }}
      />

      {/* Primary Centerpiece: Responsive 16:9 Desktop / Portrait Mobile Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="relative w-full max-w-6xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D9B76E]/35 shadow-[0_28px_80px_rgba(0,0,0,0.92)] bg-[#090104]"
      >
        <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] flex flex-col justify-end sm:justify-center overflow-hidden">
          {/* Responsive WebP Hero Banner Photography (Desktop 1920x1080 16:9 + Mobile 1080x1350 Portrait) */}
          <picture className="absolute inset-0 w-full h-full">
            <source media="(min-width: 640px)" srcSet="/assets/hero-nafisa-desktop.webp" />
            <img
              src="/assets/hero-nafisa-mobile.webp"
              alt="Nafisa portrait"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-top sm:object-center select-none"
            />
          </picture>

          {/* Mobile Bottom Scrim for Clear Typography Readability */}
          <div
            className="sm:hidden absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(12,2,6,0.18) 0%, rgba(14,2,7,0.04) 42%, rgba(12,2,6,0.72) 68%, rgba(8,1,4,0.95) 90%, #090104 100%)',
            }}
          />

          {/* Desktop Left-to-Right Seamless Readability Overlay */}
          <div
            className="hidden sm:block absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(9,1,4,0.88) 0%, rgba(14,2,7,0.68) 38%, rgba(14,2,7,0.12) 62%, transparent 100%)',
            }}
          />

          {/* Subtle Realistic Rose Corner Accents */}
          <img
            src={uploadedRoseUrl}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute -bottom-10 -left-10 w-32 sm:w-44 md:w-52 opacity-60 -rotate-12 drop-shadow-[0_14px_26px_rgba(0,0,0,0.85)] z-10"
          />
          <img
            src={uploadedRoseUrl}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute -bottom-10 -right-10 w-32 sm:w-44 md:w-52 opacity-50 rotate-12 scale-x-[-1] drop-shadow-[0_14px_26px_rgba(0,0,0,0.85)] z-10"
          />

          {/* Soft Blurred Pink Rose Edge Accent */}
          <div
            className="pointer-events-none select-none hidden sm:block absolute -top-10 -left-10 w-40 h-40 rounded-full overflow-hidden opacity-25 blur-[1px] z-10"
            style={{
              maskImage: 'radial-gradient(circle, black 35%, transparent 72%)',
              WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 72%)',
            }}
          >
            <img
              src={pinkRoseImg}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Subtle Background Drifting Rose Petals */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
              {NATURAL_HERO_PETALS.map((petal, idx) => (
                <motion.svg
                  key={idx}
                  viewBox="0 0 24 28"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{
                    opacity: [0, 0.55, 0.45, 0],
                    y: [0, 28, 56, 76],
                    x: [0, idx % 2 === 0 ? 12 : -12, idx % 2 === 0 ? -6 : 8, 0],
                    rotate: [petal.rotate, petal.rotate + 18, petal.rotate - 8],
                  }}
                  transition={{
                    duration: petal.duration,
                    repeat: Infinity,
                    delay: petal.delay,
                    ease: 'easeInOut',
                  }}
                  className="absolute"
                  style={{
                    left: petal.left,
                    top: petal.top,
                    width: petal.size,
                    height: petal.size * 1.15,
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.45))',
                  }}
                >
                  <path
                    d="M12 2 C19 6 22 14 18 22 C15 26 9 26 6 22 C2 14 5 6 12 2 Z"
                    fill={petal.tint}
                    fillOpacity="0.82"
                  />
                </motion.svg>
              ))}
            </div>
          )}

          {/* Preserved Three-Level Cinematic Birthday Typography */}
          <div className="relative z-20 w-full sm:max-w-[54%] px-5 sm:pl-10 md:pl-14 lg:pl-16 sm:pr-4 pb-6 pt-16 sm:py-8 flex flex-col items-center sm:items-start text-center sm:text-left">
            {/* Level 1: Medium Uppercase Serif Title */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair text-sm sm:text-lg md:text-xl lg:text-2xl uppercase tracking-[0.36em] sm:tracking-[0.4em] text-[#F5DC9C] font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            >
              HAPPY BIRTHDAY
            </motion.p>

            {/* Level 2: Largest Most Prominent Main Name — NAFU */}
            <motion.h1
              initial={{ opacity: 0, y: 18, letterSpacing: '0.16em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
              transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-1 sm:mt-1.5 font-playfair text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase leading-none gold-gradient-text drop-shadow-[0_10px_32px_rgba(0,0,0,0.95)]"
            >
              NAFU
            </motion.h1>

            {/* Delicate Hairline Accent Under Name */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.75, delay: 0.8 }}
              className="my-2.5 sm:my-3.5 w-24 sm:w-36 h-px bg-gradient-to-r from-[#D9B76E]/80 via-[#D9B76E]/60 to-transparent"
            />

            {/* Level 3: Personal Message Underneath */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant italic text-base sm:text-xl md:text-2xl text-[#FFF4EA]/95 max-w-md font-light leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
            >
              Today, the world feels a little more beautiful because you were born.
            </motion.p>

            {/* Minimal Scroll Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.15 }}
              className="mt-4 sm:mt-5"
            >
              <button
                type="button"
                onClick={onDiscover}
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#FFF4EA] bg-[#1D040D]/80 hover:bg-[#7A102B]/75 border border-[#D9B76E]/55 hover:border-[#FFE5A3] backdrop-blur-md transition-all cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.65)]"
              >
                <span>Begin Her Story</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#D9B76E] group-hover:translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
