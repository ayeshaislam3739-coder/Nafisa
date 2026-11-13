import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import { VintageLetterCard } from './VintageLetterCard';
import { birthdayConfig } from '../config/birthdayConfig';

type RevealPhase = 'idle' | 'cracking' | 'opened';

export const OrbitingHeart3D: React.FC = () => {
  const [phase, setPhase] = useState<RevealPhase>('idle');
  const prefersReducedMotion = useReducedMotion();

  const handleHeartBreak = () => {
    if (phase !== 'idle') return;

    if (prefersReducedMotion) {
      setPhase('opened');
      return;
    }

    setPhase('cracking');

    setTimeout(() => {
      setPhase('opened');
      confetti({
        particleCount: 45,
        spread: 85,
        origin: { y: 0.58 },
        colors: ['#D9B76E', '#FFE9B5', '#9E1938', '#FFF4EA'],
        scalar: 1.05,
        disableForReducedMotion: true,
      });
    }, 420);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhase('idle');
  };

  const isOpened = phase === 'opened';
  const isCracking = phase === 'cracking';

  return (
    <section id="heart-reveal" className="relative py-10 sm:py-14 px-4 overflow-hidden">
      {/* Deep Cinematic Crimson & Gold Ambient Lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[420px] rounded-full opacity-35 blur-[110px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(160, 18, 48, 0.55) 0%, rgba(217, 183, 110, 0.16) 45%, transparent 72%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center space-y-5 z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-1.5"
        >
          <span className="font-script text-3xl sm:text-4xl text-[#D9B76E]">
            The Heart of the Celebration
          </span>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            Inside My Heart
          </h2>
        </motion.div>

        {/* Breaking Heart & Centered Antique Note Reveal Stage */}
        <div className="relative py-4 flex flex-col items-center justify-center min-h-[250px]">
          {/* Warm Golden Light Emitting From Center When Cracking/Open */}
          <AnimatePresence>
            {(isCracking || isOpened) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: isOpened ? 0.85 : 0.65, scale: isOpened ? 1.35 : 0.95 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255, 232, 168, 0.48) 0%, rgba(217, 183, 110, 0.22) 42%, transparent 72%)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Split 3D Crimson Heart Visual */}
          <div
            className={`relative flex items-center justify-center transition-all duration-700 ${
              isOpened ? 'mb-4 sm:mb-0' : ''
            }`}
          >
            <button
              type="button"
              onClick={handleHeartBreak}
              disabled={phase !== 'idle'}
              aria-label="Tap the glowing crimson heart to open the love note inside"
              className={`relative group focus:outline-none ${
                phase === 'idle' ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              {/* Soft Pulsing Crimson Halo (Idle) */}
              {!isOpened && (
                <div
                  className="absolute -inset-6 rounded-full pointer-events-none transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(185, 17, 56, 0.42) 0%, rgba(217, 183, 110, 0.16) 50%, transparent 74%)',
                  }}
                />
              )}

              {/* Seamless Left + Right 3D Crimson Heart Halves */}
              <motion.div
                animate={
                  phase === 'idle' && !prefersReducedMotion
                    ? { scale: [1, 1.06, 1, 1.09, 1] }
                    : { scale: 1 }
                }
                transition={
                  phase === 'idle'
                    ? {
                        duration: 2.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        times: [0, 0.14, 0.28, 0.42, 1],
                      }
                    : { duration: 0.3 }
                }
                className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center"
              >
                {/* Left Heart Half */}
                <motion.svg
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={
                    isOpened
                      ? { x: -96, y: -10, rotate: -14, scale: 0.72, opacity: 0.85 }
                      : isCracking
                      ? { x: -3, rotate: -1.5 }
                      : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full drop-shadow-[0_14px_26px_rgba(0,0,0,0.75)]"
                >
                  <defs>
                    <radialGradient id="crimsonHeartLeft" cx="32%" cy="28%" r="72%">
                      <stop offset="0%" stopColor="#FF7A96" />
                      <stop offset="22%" stopColor="#CE1B46" />
                      <stop offset="60%" stopColor="#850B29" />
                      <stop offset="90%" stopColor="#4A0415" />
                      <stop offset="100%" stopColor="#260109" />
                    </radialGradient>
                    <linearGradient id="crimsonGoldRimL" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFF4D4" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#D9B76E" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M50 88 C20 62 4 44 4 26 C4 13 14 4 27 4 C36 4 45 9 50 17 L47 34 L53 52 L48 70 Z"
                    fill="url(#crimsonHeartLeft)"
                    stroke={isCracking || isOpened ? '#FFE49E' : '#D9B76E'}
                    strokeWidth={isCracking || isOpened ? '1.35' : '0.9'}
                  />
                  {/* Specular Volumetric Highlight */}
                  <path
                    d="M25 11 C17 11 12 17 12 25 C12 31 16 39 22 47"
                    stroke="url(#crimsonGoldRimL)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </motion.svg>

                {/* Right Heart Half */}
                <motion.svg
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={
                    isOpened
                      ? { x: 96, y: -10, rotate: 14, scale: 0.72, opacity: 0.85 }
                      : isCracking
                      ? { x: 3, rotate: 1.5 }
                      : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full drop-shadow-[0_14px_26px_rgba(0,0,0,0.75)]"
                >
                  <defs>
                    <radialGradient id="crimsonHeartRight" cx="55%" cy="28%" r="72%">
                      <stop offset="0%" stopColor="#E63960" />
                      <stop offset="30%" stopColor="#A61135" />
                      <stop offset="70%" stopColor="#66061D" />
                      <stop offset="100%" stopColor="#260109" />
                    </radialGradient>
                  </defs>

                  <path
                    d="M50 88 L48 70 L53 52 L47 34 L50 17 C55 9 64 4 73 4 C86 4 96 13 96 26 C96 44 80 62 50 88 Z"
                    fill="url(#crimsonHeartRight)"
                    stroke={isCracking || isOpened ? '#FFE49E' : '#D9B76E'}
                    strokeWidth={isCracking || isOpened ? '1.35' : '0.9'}
                  />
                </motion.svg>

                {/* Glowing Golden Center Crack Line during Cracking */}
                <AnimatePresence>
                  {isCracking && (
                    <motion.svg
                      viewBox="0 0 100 100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                    >
                      <motion.path
                        d="M50 17 L47 34 L53 52 L48 70 L50 88"
                        stroke="#FFF4CC"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        style={{ filter: 'drop-shadow(0 0 8px #FFE08A)' }}
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Initial Instruction Prompt */}
              {!isOpened && (
                <motion.div
                  initial={{ opacity: 0.85 }}
                  animate={{ opacity: isCracking ? 0 : [0.82, 1, 0.82] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="mt-4 space-y-1.5"
                >
                  <p className="font-playfair text-xs sm:text-sm tracking-[0.26em] uppercase font-semibold text-[#D9B76E]">
                    CLICK TO DISCOVER WHAT&apos;S INSIDE
                  </p>
                  <p className="text-xs text-[#FFF4EA]/65 italic">
                    There&apos;s an ancient love note waiting inside this heart
                  </p>
                </motion.div>
              )}
            </button>
          </div>

          {/* Centered Antique Love Note Emerging Smoothly From Inside the Parted Heart */}
          <AnimatePresence>
            {isOpened && (
              <motion.div
                initial={{ opacity: 0, scale: 0.84, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 12 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 w-full max-w-xl mx-auto mt-1"
              >
                <VintageLetterCard
                  variant="secret"
                  showWaxSeal
                  waxSealLabel="From Inside My Heart"
                  className="px-6 pb-6 pt-1 sm:px-10 sm:pb-8 text-center"
                >
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-center gap-2 text-[#7A1530]">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-cormorant text-xs tracking-[0.28em] uppercase font-bold">
                        For My Dearest {birthdayConfig.birthdayName}
                      </span>
                      <Sparkles className="w-4 h-4" />
                    </div>

                    <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-[#2A0B14] uppercase leading-snug">
                      &ldquo;IF I COULD SEND YOU ONE THING, IT WOULD BE ALL THE HAPPINESS YOUR HEART CAN HOLD.&rdquo;
                    </h3>

                    <p className="font-cormorant italic text-lg sm:text-xl text-[#4D1221] leading-relaxed">
                      Every pulse of this heart carries my warmest thoughts for you, Nafisa.
                    </p>

                    <div className="pt-2 border-t border-[#7A1530]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="font-script text-2xl sm:text-3xl text-[#7A1530]">
                        With love, {birthdayConfig.creatorName}
                      </span>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-[#5C0E23] border border-[#7A1530]/40 hover:bg-[#7A1530]/10 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Seal Heart Again</span>
                      </button>
                    </div>
                  </div>
                </VintageLetterCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
