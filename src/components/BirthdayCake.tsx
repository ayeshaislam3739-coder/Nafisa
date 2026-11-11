import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Wind, RotateCcw, Heart, Stars } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { audioEngine } from '../services/audioEngine';

export const BirthdayCake: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [selectedWish, setSelectedWish] = useState<string | null>(null);

  const predefinedWishes = [
    'Endless Joy & Laughter',
    'Every Dream Coming True',
    'Peace, Health & Serenity',
    'A Lifetime of Love',
  ];

  const handleMakeWish = () => {
    if (!candlesLit || isBlowing) return;
    setIsBlowing(true);

    // Play native synthesized breath sound
    audioEngine.playBlow();

    // Wind waver sequence followed by extinguishing
    setTimeout(() => {
      setCandlesLit(false);
      setIsBlowing(false);
      setWishMade(true);

      // Gold, rose, and ivory confetti burst
      confetti({
        particleCount: 110,
        spread: 110,
        origin: { y: 0.6 },
        colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8', '#bd244b', '#ffffff'],
        scalar: 1.15,
        shapes: ['circle', 'star'],
      });

      // Lateral fireworks fountains
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.15, y: 0.62 },
          colors: ['#D9B76E', '#F7C5D0'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.85, y: 0.62 },
          colors: ['#D9B76E', '#F7C5D0'],
        });
      }, 350);
    }, 1100);
  };

  const handleRelight = () => {
    audioEngine.playSparkle();
    setCandlesLit(true);
    setWishMade(false);
    setSelectedWish(null);
  };

  return (
    <section id="cake" className="relative py-28 px-4 overflow-hidden">
      {/* Background Soft Candlelight Bloom */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[550px] rounded-full pointer-events-none transition-all duration-1000 ${
          candlesLit
            ? 'bg-gradient-to-tr from-[#D9B76E]/18 via-[#E88CA8]/14 to-transparent blur-[110px]'
            : 'bg-[#2b1022]/20 blur-[90px]'
        }`}
      />

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
            <Sparkles className="w-4 h-4 text-[#D9B76E]" />
            <span className="font-script text-3xl sm:text-4xl text-[#F7C5D0]">
              The Birthday Tradition
            </span>
            <Sparkles className="w-4 h-4 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            Make a Wish, Nafisa
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/85 max-w-md mx-auto font-light">
            {birthdayConfig.cakeSubtitle}
          </p>
        </motion.div>

        {/* 3D Tiered Luxury Cake Assembly */}
        <div className="relative py-6 flex flex-col items-center justify-center select-none perspective-[1000px]">
          {/* Candlelight Ambient Reflection on Table */}
          <div
            className={`w-80 sm:w-104 h-16 rounded-[50%] bg-[#50132b]/80 blur-2xl mx-auto -mb-8 transition-opacity duration-700 ${
              candlesLit ? 'opacity-100' : 'opacity-40'
            }`}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* 3 CANDLES ON TOP */}
            <div className="flex justify-center items-end gap-6 sm:gap-9 mb-[-6px] z-30">
              {[-1, 0, 1].map((offset, idx) => (
                <div key={idx} className="relative flex flex-col items-center">
                  {/* Candle Flame & Dynamic Glow */}
                  <AnimatePresence>
                    {candlesLit && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: isBlowing ? [1, 1.4, 0.4] : [1, 1.12, 0.96, 1],
                          x: isBlowing ? [0, 8 * (offset || 1), 16 * (offset || 1)] : [0, 1.5, -1.5, 0],
                          y: isBlowing ? [0, -4, -8] : [0, -1.5, 0],
                          opacity: isBlowing ? [1, 0.7, 0] : 1,
                        }}
                        exit={{ scale: 0, opacity: 0, transition: { duration: 0.25 } }}
                        transition={{
                          scale: { duration: isBlowing ? 1.1 : 1.6, repeat: isBlowing ? 0 : Infinity, ease: 'easeInOut' },
                          x: { duration: isBlowing ? 1.1 : 2.2, repeat: isBlowing ? 0 : Infinity, ease: 'easeInOut' },
                          y: { duration: isBlowing ? 1.1 : 1.8, repeat: isBlowing ? 0 : Infinity, ease: 'easeInOut' },
                          opacity: { duration: isBlowing ? 1.1 : 0.25 },
                        }}
                        className="relative mb-1 flex flex-col items-center"
                      >
                        {/* Radiant halo */}
                        <div className="absolute -inset-3 rounded-full bg-radial from-[#ffd27d]/60 via-[#ff9e54]/30 to-transparent blur-md pointer-events-none" />

                        {/* Outer flame tip */}
                        <div className="w-4 h-7 rounded-[50%_50%_25%_25%] bg-gradient-to-t from-[#ff6b35] via-[#ffc043] to-[#fffde8] shadow-[0_0_16px_#ffbe3b]" />

                        {/* Inner bright core */}
                        <div className="absolute bottom-1 w-2 h-3.5 rounded-[50%_50%_30%_30%] bg-white/90 blur-[0.3px]" />

                        {/* Oxygen blue base */}
                        <div className="absolute -bottom-0.5 w-2 h-1 rounded-full bg-cyan-400/80 blur-[0.5px]" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Gentle smoke curls after being extinguished */}
                  {!candlesLit && !isBlowing && (
                    <motion.div
                      initial={{ opacity: 0.9, y: 0, scale: 0.4 }}
                      animate={{ opacity: 0, y: -30, scale: 2, x: (idx - 1) * 6 }}
                      transition={{ duration: 1.8, ease: 'easeOut' }}
                      className="w-3 h-3 rounded-full bg-white/40 blur-[2px] mb-1"
                    />
                  )}

                  {/* Cotton wick */}
                  <div className="w-0.5 h-2.5 bg-[#382619] -mb-0.5" />

                  {/* Candle Cylinder (Champagne Gold spiral embossing) */}
                  <div className="w-3.5 sm:w-4.5 h-14 rounded-t-sm bg-gradient-to-r from-[#FFF4EA] via-[#fce4ec] to-[#f48fb1] border-t border-[#D9B76E] shadow-md relative overflow-hidden">
                    <div className="absolute inset-0 opacity-45 bg-[repeating-linear-gradient(55deg,#D9B76E,#D9B76E_2.5px,transparent_2.5px,transparent_7px)]" />
                  </div>
                </div>
              ))}
            </div>

            {/* TIER 1: TOP TIER (Ivory Velvet Ganache with Sugar Roses) */}
            <div className="relative z-20 w-48 sm:w-56">
              {/* Elliptical 3D Top Cap */}
              <div className="w-full h-8 rounded-[50%] bg-gradient-to-r from-[#FFF9F2] via-[#ffeef4] to-[#fce4ec] border border-[#D9B76E]/80 shadow-inner relative flex items-center justify-center">
                {/* Candlelight glow sheen on top cap */}
                {candlesLit && (
                  <div className="absolute inset-x-8 top-1 h-3 rounded-[50%] bg-[#D9B76E]/25 blur-xs" />
                )}
                {/* Edible Sugar Flowers along top cap */}
                <div className="absolute -top-3 inset-x-3 flex justify-between text-xs pointer-events-none">
                  <span>🌹</span>
                  <span>✨</span>
                  <span>🌸</span>
                  <span>✨</span>
                  <span>🌹</span>
                </div>
              </div>

              {/* Tier 1 Cylinder Body */}
              <div className="relative -mt-4 w-full h-14 bg-gradient-to-r from-[#edd3dc] via-[#FFF4EA] to-[#f8c8d5] border-x border-[#D9B76E]/60 shadow-lg flex items-center justify-center">
                <span className="font-script text-2xl text-[#851636] font-bold tracking-wider drop-shadow-xs">
                  Nafisa
                </span>

                {/* Champagne Gold pearl drippings */}
                <div className="absolute -bottom-2.5 inset-x-0 flex justify-around px-2">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2.5 h-3.5 rounded-b-full bg-gradient-to-b from-[#FFF4EA] to-[#f7c5d0] shadow-xs border-b border-[#D9B76E]/60"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* TIER 2: MIDDLE TIER (Romantic Rose & Gold Filigree) */}
            <div className="relative z-15 w-64 sm:w-76 -mt-1">
              {/* Top Cap */}
              <div className="w-full h-9 rounded-[50%] bg-gradient-to-r from-[#fce2ea] via-[#f7c5d0] to-[#e8a3b7] border border-[#D9B76E]/80 shadow-inner" />

              {/* Tier 2 Cylinder Body */}
              <div className="relative -mt-4.5 w-full h-16 bg-gradient-to-r from-[#d97c98] via-[#F7C5D0] to-[#b3486a] border-x border-[#D9B76E]/70 shadow-xl flex items-center justify-center overflow-hidden">
                {/* Gold filigree central garland */}
                <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9B76E] to-transparent shadow-xs" />
                <div className="flex items-center gap-4 text-xs text-[#50132b] font-medium tracking-widest uppercase">
                  <span>✦</span>
                  <span className="font-cormorant tracking-[0.25em] text-[#50132b] font-bold">
                    Pure Grace
                  </span>
                  <span>✦</span>
                </div>

                {/* Scallop Frosting along bottom */}
                <div className="absolute -bottom-2.5 inset-x-0 flex justify-around px-3">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3.5 rounded-b-full bg-gradient-to-b from-[#F7C5D0] to-[#E88CA8] shadow-xs border-b border-[#D9B76E]/50"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* TIER 3: BOTTOM BASE TIER (Deep Velvet Burgundy & Golden Lace) */}
            <div className="relative z-10 w-80 sm:w-96 -mt-1">
              {/* Top Cap */}
              <div className="w-full h-10 rounded-[50%] bg-gradient-to-r from-[#eb9cb5] via-[#E88CA8] to-[#9e274b] border border-[#D9B76E] shadow-inner" />

              {/* Tier 3 Cylinder Body */}
              <div className="relative -mt-5 w-full h-20 bg-gradient-to-r from-[#7a1835] via-[#a8294e] to-[#45091a] border-x border-[#D9B76E] shadow-2xl flex items-center justify-center">
                <div className="flex items-center gap-3 text-[#FFF4EA]/90">
                  <Heart className="w-4 h-4 fill-[#D9B76E] text-[#D9B76E]" />
                  <span className="font-cormorant text-sm sm:text-base tracking-[0.3em] uppercase text-[#FFF4EA] font-semibold">
                    With Love, Abdul Ahad
                  </span>
                  <Heart className="w-4 h-4 fill-[#D9B76E] text-[#D9B76E]" />
                </div>
              </div>
            </div>

            {/* LUXURY GOLDEN PLATTER & CAKE STAND */}
            <div className="relative z-5 -mt-2 flex flex-col items-center">
              <div className="w-92 sm:w-112 h-5 rounded-[50%] bg-gradient-to-r from-[#8c6724] via-[#D9B76E] to-[#8c6724] border-t-2 border-white/60 shadow-[0_15px_30px_rgba(0,0,0,0.6)]" />
              <div className="w-36 h-8 bg-gradient-to-b from-[#b88c32] via-[#8c6724] to-[#594012] rounded-b-xl shadow-lg border-x border-[#D9B76E]/50" />
              <div className="w-56 h-4 rounded-[50%] bg-gradient-to-r from-[#8c6724] via-[#D9B76E] to-[#8c6724] -mt-1 shadow-md" />
            </div>
          </div>
        </div>

        {/* WISH CONTROLS & REVEAL SECTION */}
        <div className="space-y-6 max-w-xl mx-auto">
          {candlesLit ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              {/* Optional Wish Prompts for Nafisa */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-[#D9B76E] font-semibold">
                  Pick a wish to carry into the year ahead:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {predefinedWishes.map((w, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedWish(w)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                        selectedWish === w
                          ? 'bg-[#D9B76E] text-[#1a0815] shadow-md shadow-[#D9B76E]/30 scale-105'
                          : 'bg-[#2b1022]/60 text-[#FFF4EA]/80 border border-[#D9B76E]/30 hover:border-[#D9B76E]'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Make a Wish CTA Button */}
              <div>
                <button
                  onClick={handleMakeWish}
                  disabled={isBlowing}
                  className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full text-sm font-semibold tracking-[0.2em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#E88CA8] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_35px_rgba(217,183,110,0.4)] cursor-pointer disabled:opacity-75"
                >
                  {isBlowing ? (
                    <>
                      <Wind className="w-4 h-4 animate-spin text-[#6e112c]" />
                      <span>Blowing out the candles...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#6e112c]" />
                      <span>Make a Wish, Nafisa</span>
                      <Wind className="w-4 h-4 text-[#6e112c] group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-[#FFF4EA]/60 italic">
                Close your eyes, breathe in the moment, and blow out the candles.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl bg-gradient-to-b from-[#2e1024] via-[#240e1d] to-[#180713] border-2 border-[#D9B76E]/50 shadow-2xl space-y-5"
            >
              <div className="flex justify-center text-[#D9B76E]">
                <Stars className="w-8 h-8 text-[#D9B76E] animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="font-playfair text-2xl sm:text-3xl font-bold tracking-wider gold-gradient-text uppercase leading-snug">
                  {birthdayConfig.cakeWishCompleted}
                </h3>

                {selectedWish && (
                  <p className="font-cormorant italic text-lg sm:text-xl text-[#F7C5D0]">
                    Wish Chosen: &ldquo;{selectedWish}&rdquo;
                  </p>
                )}
              </div>

              <p className="text-sm text-[#FFF4EA]/90 leading-relaxed font-light max-w-md mx-auto">
                I really hope that every wish in your heart comes true this year, Nafisa. You deserve all the peace, smiles, and happiness in the world.
              </p>

              <div className="pt-2">
                <button
                  onClick={handleRelight}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FFF4EA] border border-[#D9B76E]/50 hover:bg-[#D9B76E]/15 hover:border-[#D9B76E] transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D9B76E]" />
                  <span>Light the candles again</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
