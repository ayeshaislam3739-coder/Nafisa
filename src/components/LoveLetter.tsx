import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, X, MailOpen, Feather, RotateCcw, ChevronDown } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { VintageLetterCard } from './VintageLetterCard';

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [revealKey, setRevealKey] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { loveLetter } = birthdayConfig;

  const handleOpenLetter = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    // Wax seal shimmer burst
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.55 },
      colors: ['#D9B76E', '#FFF4EA', '#9E1938', '#F7C5D0'],
      scalar: 0.9,
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      setRevealKey((k) => k + 1);
      setHasScrolled(false);
    }, 650);
  };

  const handleReadAgain = () => {
    setRevealKey((k) => k + 1);
    setHasScrolled(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCloseLetter = () => {
    setIsOpen(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 60) {
      setHasScrolled(true);
    }
  };

  return (
    <section id="letter" className="relative py-10 sm:py-14 px-4 sm:px-6 overflow-hidden">
      {/* Background Romantic Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[440px] rounded-full bg-gradient-to-tr from-[#6D0A22]/25 via-[#D9B76E]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center z-10">
        {/* Left Editorial Column: YOUR WORDS */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="lg:col-span-4 text-center lg:text-left space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#D9B76E] uppercase">
            <Feather className="w-3.5 h-3.5" />
            <span>Preserved For Years</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold uppercase tracking-wide text-[#FFF4EA] leading-tight">
            YOUR <span className="gold-gradient-text">WORDS.</span>
          </h2>

          <div className="flex items-center justify-center lg:justify-start gap-2.5 py-1">
            <span className="w-8 h-px bg-[#D9B76E]/55" />
            <Heart className="w-4 h-4 text-[#D9B76E]" />
            <span className="w-8 h-px bg-[#D9B76E]/55" />
          </div>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#F7C5D0] font-light leading-relaxed">
            A letter from {birthdayConfig.creatorName}. Click the antique wax-sealed envelope to open and read every line.
          </p>
        </motion.div>

        {/* Right Stage: Envelope & Ancient Parchment Letter Assembly (8 Columns) */}
        <div className="lg:col-span-8 relative w-full max-w-2xl mx-auto lg:max-w-none">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* ANTIQUE SEALED ENVELOPE */
              <motion.div
                key="sealed-envelope"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group cursor-pointer perspective-[1200px]"
                onClick={handleOpenLetter}
              >
                {/* Outer Golden Glow */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-[#D9B76E]/18 via-[#9E1938]/24 to-[#D9B76E]/18 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Envelope Body Container */}
                <div className="relative rounded-2xl bg-gradient-to-b from-[#2B0613] via-[#1A030B] to-[#0D0105] border-2 border-[#D9B76E]/55 p-7 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col items-center space-y-6">
                  {/* Animated Top Envelope Flap Fold */}
                  <motion.div
                    animate={
                      isOpening
                        ? { rotateX: 165, opacity: 0.35 }
                        : { rotateX: 0, opacity: 0.9 }
                    }
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'top center' }}
                    className="absolute top-0 inset-x-0 h-20 pointer-events-none overflow-hidden"
                  >
                    <svg
                      viewBox="0 0 600 80"
                      preserveAspectRatio="none"
                      className="w-full h-full"
                    >
                      <path
                        d="M0 0 L300 72 L600 0 Z"
                        fill="rgba(72, 10, 29, 0.72)"
                        stroke="rgba(217, 183, 110, 0.45)"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </motion.div>

                  {/* Gold filigree corners */}
                  <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D9B76E]/65 rounded-tl-md" />
                  <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D9B76E]/65 rounded-tr-md" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D9B76E]/65 rounded-bl-md" />
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D9B76E]/65 rounded-br-md" />

                  {/* Horizontal Crimson Satin Ribbon across envelope */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-7 bg-gradient-to-r from-[#5D0A20]/50 via-[#9E1938]/55 to-[#5D0A20]/50 border-y border-[#D9B76E]/35 pointer-events-none" />

                  {/* Warm golden light peek when unsealing */}
                  {isOpening && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 0.9, scale: 1.6 }}
                      transition={{ duration: 0.55 }}
                      className="absolute top-1/3 left-1/2 -translate-x-1/2 w-56 h-36 rounded-full bg-radial from-[#FFE6A3]/60 via-[#D9B76E]/25 to-transparent blur-xl pointer-events-none"
                    />
                  )}

                  {/* 3D Pressed Crimson Wax Seal */}
                  <div className="relative z-10 pt-2">
                    <motion.div
                      animate={
                        isOpening
                          ? { scale: [1, 1.25, 0.85], opacity: [1, 0.9, 0] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.55 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-[#9E1938] via-[#6A0A22] to-[#32020D] border-2 border-[#D9B76E] shadow-[0_0_25px_rgba(217,183,110,0.45)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                    >
                      <Heart className="w-9 h-9 text-[#D9B76E] fill-[#D9B76E]/90 drop-shadow-sm" />
                    </motion.div>
                  </div>

                  <div className="space-y-1.5 text-center relative z-10">
                    <p className="font-cormorant text-xs tracking-[0.35em] uppercase text-[#D9B76E] font-bold">
                      Personally Sealed for Nafisa
                    </p>
                    <p className="font-playfair text-xl sm:text-2xl text-[#FFF4EA] font-semibold">
                      A Letter from {birthdayConfig.creatorName}
                    </p>
                    <p className="text-xs text-[#FFF4EA]/70 italic pt-0.5">
                      Click the envelope to unseal and read
                    </p>
                  </div>

                  <button
                    type="button"
                    className="relative z-10 inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#D9B76E] hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    <MailOpen className="w-4 h-4 text-[#1a0815]" />
                    <span>Open My Heart</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* TEMPLATE A — THE ANCIENT LOVE LETTER */
              <motion.div
                key="unfolded-letter"
                initial={{ opacity: 0, y: 36, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-left"
              >
                {/* Warm Candlelight Glow Behind Parchment */}
                <div className="absolute -inset-4 rounded-3xl bg-[#D9B76E]/18 blur-2xl pointer-events-none" />

                <VintageLetterCard
                  variant="ancient"
                  showWaxSeal
                  waxSealLabel="A Keepsake of Love · Dedicated to Nafisa"
                  className="p-6 sm:p-11 md:p-12 space-y-5"
                >
                  {/* Top Bar */}
                  <div className="flex justify-between items-center border-b border-[#7A1530]/25 pb-3">
                    <div className="flex items-center gap-2 text-[#7A1530]">
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="font-cormorant text-xs tracking-[0.25em] uppercase font-bold">
                        Sealed With Sincerity
                      </span>
                    </div>

                    <button
                      onClick={handleCloseLetter}
                      className="p-1.5 rounded-full hover:bg-[#7A1530]/10 text-[#4D0E1F] transition-colors cursor-pointer"
                      title="Fold and seal letter"
                      aria-label="Fold and close letter"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Scrollable Ancient Letter Container with Preserved 11 Paragraphs */}
                  <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="max-h-[62vh] sm:max-h-[66vh] overflow-y-auto pr-2 sm:pr-4 space-y-5 scrollbar-thin select-text"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {/* Calligraphy Salutation */}
                    <div className="pt-1">
                      <p className="font-script text-4xl sm:text-5xl text-[#7A122E]">
                        {loveLetter.salutation}
                      </p>
                    </div>

                    {/* Complete 11 Heartfelt Paragraphs (Verbatim) */}
                    <div
                      key={revealKey}
                      className="space-y-4 font-cormorant text-lg sm:text-xl text-[#260D14] leading-relaxed"
                    >
                      {loveLetter.paragraphs.map((para: string, i: number) => {
                        const isSpecialGreeting = para.includes(
                          'Happy Birthday, My Dearest Nafisa'
                        );
                        return (
                          <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.48,
                              delay: 0.06 + Math.min(i * 0.05, 0.55),
                            }}
                            className={
                              isSpecialGreeting
                                ? 'font-playfair font-bold text-2xl sm:text-3xl text-[#7A122E] pt-3 pb-1 tracking-wide'
                                : 'font-medium leading-relaxed'
                            }
                          >
                            {para}
                          </motion.p>
                        );
                      })}
                    </div>

                    {/* Sign-off */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.6 }}
                      className="pt-5 border-t border-[#7A1530]/25 space-y-1 text-right"
                    >
                      <p className="font-cormorant italic text-xl text-[#5C1225]">
                        {loveLetter.closing}
                      </p>
                      <p className="font-script text-4xl sm:text-5xl text-[#7A122E]">
                        {loveLetter.signOff}
                      </p>
                    </motion.div>
                  </div>

                  {/* Floating Scroll Hint */}
                  {!hasScrolled && (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-[#7A122E]/85 font-cormorant italic pt-1 animate-pulse">
                      <span>Scroll down to read my whole letter</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#7A122E]" />
                    </div>
                  )}

                  {/* Interactive Controls */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#7A1530]/20 text-xs">
                    <button
                      onClick={handleReadAgain}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#6E122B] border border-[#6E122B]/35 hover:bg-[#6E122B]/10 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Read From Beginning</span>
                    </button>

                    <button
                      onClick={handleCloseLetter}
                      className="text-[#5C1225] hover:underline transition-all cursor-pointer font-cormorant uppercase tracking-wider text-xs font-bold"
                    >
                      Fold &amp; Close Letter
                    </button>
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
