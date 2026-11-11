import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RefreshCw, Copy, Check } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const LoveQuoteGenerator: React.FC = () => {
  const quotes = birthdayConfig.romanticQuotes;

  // Shuffle queue without repeating until all 15 shown
  const initialShuffle = useMemo(() => {
    return Array.from({ length: quotes.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  }, [quotes.length]);

  const [queue, setQueue] = useState<number[]>(initialShuffle);
  const [queueIndex, setQueueIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentQuoteIndex = queue[queueIndex];
  const currentQuote = quotes[currentQuoteIndex];

  const handleNextQuote = () => {
    // Occasional tiny sparkle burst
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.65 },
      colors: ['#D9B76E', '#FFF4EA', '#E88CA8'],
      scalar: 0.8,
    });

    if (queueIndex + 1 >= queue.length) {
      // Reshuffle for next loop
      const nextShuffle = Array.from({ length: quotes.length }, (_, i) => i).sort(
        () => Math.random() - 0.5
      );
      setQueue(nextShuffle);
      setQueueIndex(0);
    } else {
      setQueueIndex((prev) => prev + 1);
    }
  };

  const handleCopyQuote = () => {
    navigator.clipboard?.writeText?.(currentQuote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quotes" className="relative py-28 px-4 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] rounded-full bg-gradient-to-tr from-[#E88CA8]/15 via-[#D9B76E]/12 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-10 z-10">
        {/* Section Heading */}
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
              Poetry of the moment
            </span>
            <Sparkles className="w-4 h-4 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            A Little Love, A Little Magic
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/85 max-w-md mx-auto font-light">
            Each click summons a fresh thought, curated especially for Nafisa.
          </p>
        </motion.div>

        {/* Dynamic Quote Box */}
        <div className="relative max-w-2xl mx-auto">
          {/* Outer glow ring */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#D9B76E]/20 via-[#E88CA8]/20 to-[#D9B76E]/20 blur-xl opacity-80" />

          <div className="relative min-h-[220px] rounded-3xl bg-gradient-to-b from-[#2e1024]/85 via-[#240e1d]/90 to-[#180713]/95 border-2 border-[#D9B76E]/40 p-8 sm:p-12 shadow-2xl backdrop-blur-md flex flex-col justify-between items-center">
            {/* Header / Counter */}
            <div className="w-full flex justify-between items-center text-xs text-[#D9B76E] tracking-[0.25em] uppercase font-semibold border-b border-[#D9B76E]/20 pb-3">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-[#E88CA8] text-[#E88CA8]" />
                Quote {queueIndex + 1} of {quotes.length}
              </span>
              <button
                onClick={handleCopyQuote}
                className="inline-flex items-center gap-1 text-[11px] text-[#FFF4EA]/70 hover:text-[#D9B76E] transition-colors cursor-pointer"
                title="Copy quote"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Main Quote Content */}
            <div className="py-6 my-auto">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentQuote}
                  initial={{ opacity: 0, y: 15, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.97 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#FFF4EA] leading-relaxed font-light"
                >
                  &ldquo;{currentQuote}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bottom Footer Details */}
            <div className="w-full pt-3 flex justify-between items-center border-t border-[#D9B76E]/20 text-xs">
              <span className="font-script text-xl text-[#F7C5D0]">
                To Nafisa · With Love
              </span>
              <span className="text-[#FFF4EA]/50 italic">
                From Abdul Ahad
              </span>
            </div>
          </div>
        </div>

        {/* Action Button: SHOW ME SOMETHING BEAUTIFUL */}
        <div>
          <button
            onClick={handleNextQuote}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#E88CA8] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_35px_rgba(217,183,110,0.4)] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#6e112c]" />
            <span>Show Me Something Beautiful</span>
            <RefreshCw className="w-4 h-4 text-[#6e112c] group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
};
