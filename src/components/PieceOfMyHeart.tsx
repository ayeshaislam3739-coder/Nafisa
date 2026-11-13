import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw, X, Feather } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { VintageLetterCard } from './VintageLetterCard';

interface PieceOfMyHeartProps {
  onPetalSurge?: () => void;
}

type EmblemPhase = 'locked' | 'unlocking' | 'revealed';

export const PieceOfMyHeart: React.FC<PieceOfMyHeartProps> = ({ onPetalSurge }) => {
  const [phase, setPhase] = useState<EmblemPhase>('locked');
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [secretModalOpen, setSecretModalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { pieceOfMyHeart } = birthdayConfig;

  const isUnlocking = phase === 'unlocking';
  const isRevealed = phase === 'revealed';

  const handleUnlockEmblem = () => {
    if (phase !== 'locked') return;

    onPetalSurge?.();
    setShowSecondMessage(false);

    if (prefersReducedMotion) {
      setPhase('revealed');
      setShowSecondMessage(true);
      return;
    }

    // Step 1: Brighten center golden light before parting
    setPhase('unlocking');

    setTimeout(() => {
      setPhase('revealed');

      // Release delicate crimson & champagne-gold sparkles
      confetti({
        particleCount: 48,
        spread: 88,
        origin: { y: 0.6 },
        colors: ['#D9B76E', '#FFE6A8', '#9E1938', '#FFF4EA', '#E88CA8'],
        scalar: 1.1,
        disableForReducedMotion: true,
      });

      setTimeout(() => {
        setShowSecondMessage(true);
        confetti({
          particleCount: 26,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#D9B76E', '#F7C5D0'],
          disableForReducedMotion: true,
        });
      }, 1700);
    }, 460);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhase('locked');
    setShowSecondMessage(false);
  };

  const handleOpenSecret = () => {
    setSecretModalOpen(true);
  };

  // Lightweight floating golden particles & tiny crimson hearts around the monogram
  const floatingAccents = [
    { id: 'p1', type: 'heart', x: -112, y: -56, size: 12, delay: 0, duration: 4.4 },
    { id: 'p2', type: 'spark', x: 116, y: -48, size: 7, delay: 0.9, duration: 3.8 },
    { id: 'p3', type: 'heart', x: 108, y: 66, size: 11, delay: 1.5, duration: 4.8 },
    { id: 'p4', type: 'spark', x: -108, y: 64, size: 6, delay: 0.4, duration: 4.1 },
    { id: 'p5', type: 'spark', x: 0, y: -118, size: 7, delay: 1.2, duration: 3.6 },
    { id: 'p6', type: 'heart', x: -134, y: 8, size: 9, delay: 2.1, duration: 5.0 },
    { id: 'p7', type: 'spark', x: 136, y: 12, size: 6, delay: 1.8, duration: 4.2 },
  ];

  return (
    <section id="heart-piece" className="relative py-12 sm:py-16 px-4 overflow-hidden text-center">
      {/* Background Soft Romantic Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[460px] rounded-full bg-gradient-to-tr from-[#7A102B]/28 via-[#D9B76E]/15 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-6 z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9E1938]/20 border border-[#D9B76E]/35 text-[#F7C5D0] text-xs uppercase tracking-[0.25em] font-semibold">
            <Heart className="w-3.5 h-3.5 fill-[#D9B76E] text-[#D9B76E]" />
            <span>A LITTLE PIECE OF MY HEART ❤️</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            {pieceOfMyHeart.heading}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/85 max-w-md mx-auto font-light">
            There&apos;s something hidden behind our emblem. Unlock it and see.
          </p>
        </motion.div>

        {/* Personalized Intertwined N + A Love Emblem Stage */}
        <div className="relative py-3 sm:py-5 flex flex-col items-center justify-center min-h-[270px] sm:min-h-[300px] select-none">
          {/* Warm Golden Center Radiance on Unlock & Reveal */}
          <AnimatePresence>
            {(isUnlocking || isRevealed) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.35 }}
                animate={{
                  opacity: isRevealed ? 0.85 : 1,
                  scale: isRevealed ? 1.35 : 1.05,
                }}
                exit={{ opacity: 0, scale: 0.35 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255, 236, 179, 0.55) 0%, rgba(217, 183, 110, 0.25) 40%, rgba(158, 25, 56, 0.14) 65%, transparent 78%)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Subtle Floating Crimson Hearts & Golden Particles Around Monogram */}
          {!prefersReducedMotion && !isRevealed && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {floatingAccents.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ x: item.x * 0.82, y: item.y * 0.82, opacity: 0.45 }}
                  animate={{
                    y: [item.y * 0.85, item.y * 0.85 - 10, item.y * 0.85],
                    opacity: [0.38, 0.9, 0.38],
                    scale: [0.92, 1.15, 0.92],
                  }}
                  transition={{
                    duration: item.duration,
                    repeat: Infinity,
                    delay: item.delay,
                    ease: 'easeInOut',
                  }}
                  className="hidden sm:block absolute"
                >
                  {item.type === 'heart' ? (
                    <svg
                      width={item.size}
                      height={item.size}
                      viewBox="0 0 24 24"
                      fill="#C82348"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(200,35,72,0.65))' }}
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <div
                      className="rounded-full bg-[#FFE8A8]"
                      style={{
                        width: item.size,
                        height: item.size,
                        boxShadow: '0 0 10px 2px rgba(217, 183, 110, 0.75)',
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Unified Interactive N + A Monogram Button */}
          <motion.button
            type="button"
            onClick={handleUnlockEmblem}
            disabled={phase !== 'locked'}
            aria-label="Unlock the N and A monogram love emblem"
            animate={
              phase === 'locked' && !prefersReducedMotion
                ? { scale: [1, 1.032, 1] }
                : isUnlocking
                ? { scale: 1.07 }
                : { scale: 1 }
            }
            transition={
              phase === 'locked'
                ? { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.45, ease: 'easeOut' }
            }
            whileHover={phase === 'locked' ? { scale: 1.05 } : undefined}
            whileTap={phase === 'locked' ? { scale: 0.98 } : undefined}
            className={`relative z-20 focus:outline-none touch-manipulation ${
              phase === 'locked' ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            {/* Ambient Champagne Gold & Deep Crimson Glow Halo */}
            <motion.div
              animate={
                isUnlocking
                  ? { opacity: 1, scale: 1.18 }
                  : isRevealed
                  ? { opacity: 0.35, scale: 0.95 }
                  : { opacity: [0.55, 0.85, 0.55], scale: [0.98, 1.04, 0.98] }
              }
              transition={
                phase === 'locked'
                  ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.5 }
              }
              className="absolute -inset-7 rounded-full pointer-events-none blur-2xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(217, 183, 110, 0.34) 0%, rgba(158, 25, 56, 0.32) 48%, transparent 76%)',
              }}
            />

            {/* Monogram Container (Houses Backing Crest + Splitting Left "N" & Right "A" Wings) */}
            <div
              className={`relative mx-auto transition-all duration-700 ${
                isRevealed
                  ? 'w-44 h-44 sm:w-52 sm:h-52 -mb-6 sm:-mb-8'
                  : 'w-56 h-56 sm:w-64 sm:h-64'
              }`}
            >
              {/* Inner Enameled Crimson-Velvet Medallion Base (Fades smoothly away as wings separate) */}
              <motion.svg
                viewBox="0 0 240 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                  opacity: isRevealed ? 0 : isUnlocking ? 0.95 : 1,
                  scale: isRevealed ? 0.82 : 1,
                }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.85)]"
              >
                <defs>
                  <radialGradient id="emblemVelvetBg" cx="42%" cy="35%" r="68%">
                    <stop offset="0%" stopColor="#6E0E28" />
                    <stop offset="48%" stopColor="#380614" />
                    <stop offset="88%" stopColor="#190208" />
                    <stop offset="100%" stopColor="#0C0104" />
                  </radialGradient>
                  <linearGradient id="emblemGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF5D6" />
                    <stop offset="35%" stopColor="#E4C170" />
                    <stop offset="70%" stopColor="#B88E38" />
                    <stop offset="100%" stopColor="#F5DC9C" />
                  </linearGradient>
                  <linearGradient id="emblemInnerEtch" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F5DCA0" stopOpacity="0.55" />
                    <stop offset="50%" stopColor="#D9B76E" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#F5DCA0" stopOpacity="0.55" />
                  </linearGradient>
                </defs>

                {/* Deep Velvet Medallion Core */}
                <circle
                  cx="120"
                  cy="120"
                  r="94"
                  fill="url(#emblemVelvetBg)"
                  stroke="url(#emblemGoldRim)"
                  strokeWidth="2.2"
                />

                {/* Engraved Filigree Inner Hairline Circle */}
                <circle
                  cx="120"
                  cy="120"
                  r="85"
                  stroke="url(#emblemInnerEtch)"
                  strokeWidth="0.9"
                  strokeDasharray="3 4"
                />

                {/* Top Romantic Heart Jewel Finial */}
                <path
                  d="M120 26 C117.5 22.5 113 21.5 110.5 24 C108 26.5 109 30.5 112.5 33.5 L120 39 L127.5 33.5 C131 30.5 132 26.5 129.5 24 C127 21.5 122.5 22.5 120 26 Z"
                  fill="#9E1938"
                  stroke="url(#emblemGoldRim)"
                  strokeWidth="1.2"
                />

                {/* Bottom Ornamental Diamond & Scroll Finial */}
                <path
                  d="M120 202 L124.5 208 L120 214 L115.5 208 Z"
                  fill="url(#emblemGoldRim)"
                />
                <path
                  d="M96 205 Q108 210 115 208 M144 205 Q132 210 125 208"
                  stroke="url(#emblemGoldRim)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </motion.svg>

              {/* Golden Central Seam Flare During Unlock */}
              <AnimatePresence>
                {isUnlocking && (
                  <motion.svg
                    viewBox="0 0 240 240"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 w-full h-full z-30 pointer-events-none"
                  >
                    <circle
                      cx="120"
                      cy="122"
                      r="34"
                      fill="rgba(255, 238, 185, 0.38)"
                      style={{ filter: 'blur(14px)' }}
                    />
                    <line
                      x1="120"
                      y1="38"
                      x2="120"
                      y2="202"
                      stroke="#FFF6D6"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      style={{ filter: 'drop-shadow(0 0 10px #FFE394)' }}
                    />
                  </motion.svg>
                )}
              </AnimatePresence>

              {/* LEFT EMBLEM WING — Ornate Frame Left Arc + Calligraphic Letter "N" (Nafisa) */}
              <motion.svg
                viewBox="0 0 240 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={
                  isRevealed
                    ? { x: -72, y: -6, rotate: -10, scale: 0.78, opacity: 0.55 }
                    : isUnlocking
                    ? { x: -5, rotate: -1.2 }
                    : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full z-10 drop-shadow-[0_6px_16px_rgba(0,0,0,0.75)]"
              >
                <defs>
                  <linearGradient id="goldLetterN" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF7DF" />
                    <stop offset="32%" stopColor="#ECCB7E" />
                    <stop offset="68%" stopColor="#C1943C" />
                    <stop offset="100%" stopColor="#FCE7AD" />
                  </linearGradient>
                  <linearGradient id="crimsonEnamelN" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#B81D43" />
                    <stop offset="55%" stopColor="#7A0B26" />
                    <stop offset="100%" stopColor="#420413" />
                  </linearGradient>
                </defs>

                {/* Delicate Left Outer Wreath & Crescent Arc */}
                <path
                  d="M116 18 A102 102 0 0 0 116 222"
                  stroke="url(#goldLetterN)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.88"
                />
                {/* Left Laurel Leaf Accents along Outer Frame */}
                <path
                  d="M24 98 C16 95 14 88 20 84 C25 89 26 94 24 98 Z M19 122 C11 120 9 113 15 109 C20 113 21 118 19 122 Z M24 146 C16 146 14 139 19 135 C24 139 25 143 24 146 Z"
                  fill="url(#goldLetterN)"
                  opacity="0.82"
                />

                {/* Intertwined Letter "N" (Metallic Gold Outline + Burgundy Engraved Depth + Specular Edge) */}
                {/* Left upright thin stem */}
                <path
                  d="M56 78 L62.5 78 L62.5 164 L56 164 Z"
                  fill="url(#crimsonEnamelN)"
                  stroke="url(#goldLetterN)"
                  strokeWidth="1.9"
                  strokeLinejoin="round"
                />
                {/* Bold calligraphic diagonal bar */}
                <path
                  d="M57 78 L66.5 78 L118 164 L108.5 164 Z"
                  fill="url(#crimsonEnamelN)"
                  stroke="url(#goldLetterN)"
                  strokeWidth="1.9"
                  strokeLinejoin="round"
                />
                {/* Right upright slender stem */}
                <path
                  d="M111.5 78 L118 78 L118 164 L111.5 164 Z"
                  fill="url(#crimsonEnamelN)"
                  stroke="url(#goldLetterN)"
                  strokeWidth="1.9"
                  strokeLinejoin="round"
                />
                {/* Ornamental Serif Caps on "N" */}
                <path
                  d="M50 78 H68 M50 164 H68 M106 78 H124"
                  stroke="url(#goldLetterN)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                {/* Illuminated Specular Highlight along N */}
                <path
                  d="M59.2 81 V160 M62.5 82 L113 160"
                  stroke="#FFF6DD"
                  strokeOpacity="0.68"
                  strokeWidth="0.95"
                  strokeLinecap="round"
                />
              </motion.svg>

              {/* RIGHT EMBLEM WING — Ornate Frame Right Arc + Interlaced Calligraphic Letter "A" (Abdul Ahad) */}
              <motion.svg
                viewBox="0 0 240 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={
                  isRevealed
                    ? { x: 72, y: -6, rotate: 10, scale: 0.78, opacity: 0.55 }
                    : isUnlocking
                    ? { x: 5, rotate: 1.2 }
                    : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full z-20 drop-shadow-[0_6px_16px_rgba(0,0,0,0.75)]"
              >
                <defs>
                  <linearGradient id="goldLetterA" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFF7DF" />
                    <stop offset="35%" stopColor="#ECCB7E" />
                    <stop offset="70%" stopColor="#C1943C" />
                    <stop offset="100%" stopColor="#FCE7AD" />
                  </linearGradient>
                  <linearGradient id="crimsonEnamelA" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C4214A" />
                    <stop offset="55%" stopColor="#820C29" />
                    <stop offset="100%" stopColor="#460515" />
                  </linearGradient>
                </defs>

                {/* Delicate Right Outer Wreath & Crescent Arc */}
                <path
                  d="M124 18 A102 102 0 0 1 124 222"
                  stroke="url(#goldLetterA)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.88"
                />
                {/* Right Laurel Leaf Accents */}
                <path
                  d="M216 98 C224 95 226 88 220 84 C215 89 214 94 216 98 Z M221 122 C229 120 231 113 225 109 C220 113 219 118 221 122 Z M216 146 C224 146 226 139 221 135 C216 139 215 143 216 146 Z"
                  fill="url(#goldLetterA)"
                  opacity="0.82"
                />

                {/* Deep Burgundy Halo Behind Interlocking A Crossings for Woven Over/Under Illusion */}
                <path
                  d="M146 65 L105 164"
                  stroke="#22030B"
                  strokeWidth="6.8"
                  strokeLinecap="round"
                />

                {/* Intertwined Letter "A" — Graceful Slender Left Leg + Bold Engraved Right Leg */}
                <path
                  d="M144.5 63 L151.5 63 L186 164 L175 164 L147.5 80 L110 164 L103 164 Z"
                  fill="url(#crimsonEnamelA)"
                  stroke="url(#goldLetterA)"
                  strokeWidth="1.95"
                  strokeLinejoin="round"
                />

                {/* Serifs at Base of "A" */}
                <path
                  d="M97 164 H116 M169 164 H191"
                  stroke="url(#goldLetterA)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />

                {/* Sweeping Calligraphic Crossbar Ribbon Weaving Across N & A */}
                <path
                  d="M101 135 C121 121 153 142 178 128"
                  stroke="#2B040E"
                  strokeWidth="6.4"
                  strokeLinecap="round"
                />
                <path
                  d="M101 135 C121 121 153 142 178 128"
                  stroke="url(#goldLetterA)"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />

                {/* Tiny Engraved Center Heart-Jewel Binding N + A at Apex Union */}
                <path
                  d="M148 52.5 C146.5 50.5 143.5 50 142 51.5 C140.5 53 141 55.5 143.5 57.3 L148 60.5 L152.5 57.3 C155 55.5 155.5 53 154 51.5 C152.5 50 149.5 50.5 148 52.5 Z"
                  fill="#B81D43"
                  stroke="url(#goldLetterA)"
                  strokeWidth="1"
                />

                {/* Specular Bevel Highlight along A */}
                <path
                  d="M148 70 L180 160 M144.5 72 L106.5 160"
                  stroke="#FFF6DD"
                  strokeOpacity="0.65"
                  strokeWidth="0.95"
                  strokeLinecap="round"
                />
              </motion.svg>
            </div>
          </motion.button>

          {/* Signature Monogram Title & Unlock Button Below Emblem */}
          {!isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isUnlocking ? 0.45 : 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mt-4 flex flex-col items-center gap-2.5 z-20"
            >
              <div className="space-y-1">
                <h3 className="font-playfair text-base sm:text-xl font-bold tracking-[0.26em] uppercase gold-gradient-text">
                  NAFISA &amp; ABDUL AHAD
                </h3>
                <p className="text-[11px] sm:text-xs font-cormorant italic tracking-[0.24em] uppercase text-[#FFF4EA]/75">
                  TWO INITIALS, ONE BEAUTIFUL STORY.
                </p>
              </div>

              <button
                type="button"
                onClick={handleUnlockEmblem}
                disabled={phase !== 'locked'}
                className="mt-1 inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full bg-gradient-to-r from-[#9E1938]/55 via-[#D9B76E]/25 to-[#9E1938]/55 border border-[#D9B76E]/70 hover:border-[#FFE5A3] text-xs tracking-[0.22em] uppercase font-bold text-[#FFF4EA] hover:bg-[#D9B76E]/30 transition-all cursor-pointer shadow-[0_0_24px_rgba(217,183,110,0.28)] group"
              >
                <Heart className="w-3.5 h-3.5 fill-[#E88CA8] text-[#E88CA8] group-hover:scale-125 transition-transform" />
                <span>UNLOCK OUR LOVE</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D9B76E]" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Preserved Ancient Love Note Revealed Smoothly Behind the Opened N + A Emblem */}
        <div className="flex items-center justify-center">
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.86, y: 22 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 18 }}
                transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-2xl w-full z-20"
              >
                <VintageLetterCard
                  variant="secret"
                  showWaxSeal
                  waxSealLabel="From My Heart"
                  className="p-6 sm:p-9 space-y-4"
                >
                  <div className="space-y-3 pt-1">
                    <h3 className="font-playfair text-2xl sm:text-3xl font-bold tracking-wide text-[#2A0B14] uppercase leading-snug">
                      &ldquo;{pieceOfMyHeart.heartReveal1}&rdquo;
                    </h3>

                    <AnimatePresence>
                      {showSecondMessage && (
                        <motion.p
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7 }}
                          className="font-cormorant italic text-xl sm:text-2xl text-[#6E122B] pt-1 font-medium"
                        >
                          &ldquo;{pieceOfMyHeart.heartReveal2}&rdquo;
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      type="button"
                      onClick={handleReplay}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-[#6E122B] border border-[#6E122B]/40 hover:bg-[#6E122B]/10 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Feel It Again</span>
                    </button>
                  </div>
                </VintageLetterCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PART 5: Small Glowing Heart Button for the Secret Love Message (Preserved) */}
        <div className="pt-3 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleOpenSecret}
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#2b1022]/80 hover:bg-[#3d142d] border border-[#D9B76E]/40 hover:border-[#D9B76E] shadow-lg transition-all duration-300 cursor-pointer"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E88CA8] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E88CA8]" />
            </span>
            <span className="text-xs tracking-wider uppercase text-[#FFF4EA]/90 font-medium group-hover:text-white">
              A Quiet Note from Abdul Ahad
            </span>
            <Feather className="w-3.5 h-3.5 text-[#D9B76E]" />
          </button>
          <span className="text-[11px] text-[#FFF4EA]/50 italic">
            A small secret kept just for this moment
          </span>
        </div>
      </div>

      {/* PART 5: SECRET LOVE MESSAGE MODAL (Preserved Unchanged) */}
      <AnimatePresence>
        {secretModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSecretModalOpen(false)}
          >
            {/* Heart-shaped light radiance */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-[#E88CA8]/15 blur-[120px] pointer-events-none" />

            <motion.div
              initial={{ scale: 0.88, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full"
            >
              <VintageLetterCard
                variant="secret"
                showWaxSeal
                waxSealLabel="A Secret Sealed For Nafisa"
                className="p-6 sm:p-11 space-y-6 text-left"
              >
                <button
                  type="button"
                  onClick={() => setSecretModalOpen(false)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-[#7A1530]/10 hover:bg-[#7A1530]/20 text-[#4D0E1F] transition-colors cursor-pointer"
                  aria-label="Close note"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                  <p className="font-cormorant italic text-sm tracking-[0.2em] uppercase text-[#7A122E] font-bold text-center">
                    {pieceOfMyHeart.secretNote.intro}
                  </p>

                  <div className="space-y-3 font-cormorant text-xl sm:text-2xl text-[#260D14] leading-relaxed font-medium">
                    <p className="font-bold text-[#7A122E] text-2xl">
                      {pieceOfMyHeart.secretNote.line1}
                    </p>
                    <p>{pieceOfMyHeart.secretNote.line2}</p>
                    <p>{pieceOfMyHeart.secretNote.line3}</p>
                    <p className="text-[#5C1225] italic pt-1">{pieceOfMyHeart.secretNote.line4}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#7A1530]/25 text-right">
                  <p className="font-script text-3xl sm:text-4xl text-[#7A122E]">
                    {pieceOfMyHeart.secretNote.signature}
                  </p>
                </div>
              </VintageLetterCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
