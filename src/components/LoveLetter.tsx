import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, X, MailOpen, Feather, RotateCcw } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { audioEngine } from '../services/audioEngine';

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [revealKey, setRevealKey] = useState(0);
  const { loveLetter } = birthdayConfig;

  const handleOpenLetter = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    audioEngine.playChimeChord();

    // Wax seal shimmer burst
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.55 },
      colors: ['#D9B76E', '#FFF4EA', '#bd244b', '#E88CA8'],
      scalar: 0.9,
    });

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      setRevealKey((k) => k + 1);
    }, 700);
  };

  const handleReadAgain = () => {
    audioEngine.playSparkle();
    setRevealKey((k) => k + 1);
  };

  const handleCloseLetter = () => {
    audioEngine.playPop();
    setIsOpen(false);
  };

  return (
    <section id="letter" className="relative py-28 px-4 overflow-hidden">
      {/* Background Romantic Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[550px] rounded-full bg-gradient-to-tr from-[#400D24]/30 via-[#D9B76E]/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-12 z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2">
            <Feather className="w-4 h-4 text-[#D9B76E]" />
            <span className="font-script text-3xl sm:text-4xl text-[#F7C5D0]">
              From the depths of the heart
            </span>
            <Feather className="w-4 h-4 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            A Letter from {birthdayConfig.creatorName}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/85 max-w-md mx-auto font-light">
            Some words are meant to be cherished forever.
          </p>
        </motion.div>

        {/* Envelope & Letter Assembly */}
        <div className="relative max-w-xl mx-auto">
          {!isOpen ? (
            /* ENVELOPE 2.0 CARD */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group cursor-pointer perspective-[1200px]"
              onClick={handleOpenLetter}
            >
              {/* Outer Golden Glow */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-[#D9B76E]/20 via-[#E88CA8]/25 to-[#D9B76E]/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Envelope Body Container */}
              <div className="relative rounded-3xl bg-gradient-to-b from-[#331127] via-[#240e1d] to-[#150612] border-2 border-[#D9B76E]/50 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col items-center space-y-7">
                {/* Gold filigree corners */}
                <div className="absolute top-3 left-3 w-9 h-9 border-t-2 border-l-2 border-[#D9B76E]/70 rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-9 h-9 border-t-2 border-r-2 border-[#D9B76E]/70 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-9 h-9 border-b-2 border-l-2 border-[#D9B76E]/70 rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-9 h-9 border-b-2 border-r-2 border-[#D9B76E]/70 rounded-br-lg" />

                {/* Delicate Roses Decoration */}
                <div className="absolute top-4 inset-x-8 flex justify-between pointer-events-none opacity-80 text-sm">
                  <span>🌹</span>
                  <span>🌸</span>
                </div>

                {/* Horizontal Pink Satin Ribbon across envelope */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-r from-[#f7c5d0]/30 via-[#e88ca8]/40 to-[#f7c5d0]/30 border-y border-[#D9B76E]/30 pointer-events-none" />

                {/* Envelope Flap Triangles Visual */}
                <div className="w-full flex items-center justify-center">
                  <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#D9B76E]/60 to-transparent" />
                </div>

                {/* 3D Wax Seal with Heart & Ribbons */}
                <div className="relative z-10">
                  <motion.div
                    animate={isOpening ? { scale: [1, 1.25, 0.9], opacity: [1, 0.8, 0] } : {}}
                    transition={{ duration: 0.6 }}
                    className="w-22 h-22 rounded-full bg-gradient-to-br from-[#8c1839] via-[#610a22] to-[#30030e] border-2 border-[#D9B76E] shadow-[0_0_25px_rgba(217,183,110,0.4)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  >
                    <Heart className="w-10 h-10 text-[#D9B76E] fill-[#D9B76E]/90 drop-shadow-sm" />
                  </motion.div>
                  {/* Subtle seal rim shimmer */}
                  <div className="absolute inset-0 rounded-full border border-white/30 animate-pulse pointer-events-none" />
                </div>

                <div className="space-y-1.5 text-center relative z-10">
                  <p className="font-cormorant text-xs tracking-[0.35em] uppercase text-[#D9B76E] font-bold">
                    Personally Sealed for Nafisa
                  </p>
                  <p className="font-playfair text-xl sm:text-2xl text-[#FFF4EA] font-semibold">
                    A Letter from {birthdayConfig.creatorName}
                  </p>
                </div>

                <button
                  type="button"
                  className="relative z-10 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#E88CA8] hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <MailOpen className="w-4 h-4 text-[#1a0815]" />
                  <span>Open My Heart</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* UNFOLDED LUXURY PARCHMENT LETTER */
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-left"
            >
              {/* Outer Golden Aura */}
              <div className="absolute -inset-4 rounded-3xl bg-[#D9B76E]/20 blur-2xl pointer-events-none" />

              {/* Parchment Paper Canvas */}
              <div className="relative rounded-3xl bg-[#FFF9F2] text-[#2b1022] p-8 sm:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.7)] border-4 border-[#D9B76E]/50 space-y-7 overflow-hidden">
                {/* Antique Parchment Texture pattern */}
                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(#400D24 1.2px, transparent 1.2px)',
                    backgroundSize: '18px 18px',
                  }}
                />

                {/* Deckled Edge Header Bar */}
                <div className="flex justify-between items-center border-b border-[#D9B76E]/40 pb-4">
                  <div className="flex items-center gap-2 text-[#851636]">
                    <Heart className="w-4 h-4 fill-current" />
                    <span className="font-cormorant text-xs tracking-[0.25em] uppercase font-bold text-[#851636]">
                      A Keepsake of Love · Dedicated to Nafisa
                    </span>
                  </div>

                  <button
                    onClick={handleCloseLetter}
                    className="p-1.5 rounded-full hover:bg-[#ebd5b3]/50 text-[#400D24] transition-colors cursor-pointer"
                    title="Fold and seal letter"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Salutation */}
                <div className="pt-2">
                  <p className="font-script text-4xl sm:text-5xl text-[#7a1230]">
                    {loveLetter.salutation}
                  </p>
                </div>

                {/* Line-by-Line Body Paragraphs with re-triggerable key */}
                <div key={revealKey} className="space-y-4 font-cormorant text-lg sm:text-xl text-[#2f1323] leading-relaxed">
                  {loveLetter.paragraphs.map((para: string, i: number) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
                      className={i === 0 ? 'font-bold text-2xl sm:text-3xl text-[#851636]' : 'font-normal'}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                {/* Sign-off */}
                <div className="pt-6 border-t border-[#D9B76E]/40 space-y-1.5 text-right">
                  <p className="font-cormorant italic text-lg text-[#61122a]">
                    {loveLetter.closing}
                  </p>
                  <p className="font-script text-3xl sm:text-5xl text-[#851636]">
                    {loveLetter.signOff}
                  </p>
                </div>

                {/* Interactive Controls: READ IT AGAIN and Close */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#D9B76E]/20 text-xs">
                  <button
                    onClick={handleReadAgain}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#851636] border border-[#851636]/30 hover:bg-[#851636]/10 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Read It Again</span>
                  </button>

                  <button
                    onClick={handleCloseLetter}
                    className="text-[#61122a] hover:underline transition-all cursor-pointer font-cormorant uppercase tracking-wider text-xs"
                  >
                    Fold & Close Letter
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
