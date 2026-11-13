import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RefreshCw, Copy, Check } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { VintageLetterCard } from './VintageLetterCard';

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
    <section id="quotes" className="relative py-12 sm:py-16 px-4 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[420px] rounded-full bg-gradient-to-tr from-[#7A102B]/24 via-[#D9B76E]/12 to-transparent blur-[110px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-7 z-10">
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
            <span>A LITTLE LOVE NOTE FOR YOU</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            A Little Love, A Little Magic
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/85 max-w-lg mx-auto font-light">
            Click to discover a little romantic thought.
          </p>
        </motion.div>

        {/* Dynamic Antique Parchment Quote Box */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#D9B76E]/18 via-[#9E1938]/18 to-[#D9B76E]/18 blur-xl opacity-80" />

          <VintageLetterCard
            variant="romance"
            className="min-h-[200px] p-6 sm:p-10 flex flex-col justify-between items-center"
          >
            {/* Header / Counter */}
            <div className="w-full flex justify-between items-center text-xs text-[#7A122E] tracking-[0.24em] uppercase font-bold border-b border-[#7A1530]/20 pb-3">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-[#9E1938] text-[#9E1938]" />
                Quote {queueIndex + 1} of {quotes.length}
              </span>
              <button
                onClick={handleCopyQuote}
                className="inline-flex items-center gap-1 text-[11px] text-[#5C1225] hover:text-[#7A122E] transition-colors cursor-pointer font-semibold"
                title="Copy quote"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Main Quote Content */}
            <div className="py-5 my-auto">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentQuote}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-cormorant italic text-2xl sm:text-3xl text-[#260D14] leading-relaxed font-medium"
                >
                  &ldquo;{currentQuote}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bottom Footer Details */}
            <div className="w-full pt-3 flex justify-between items-center border-t border-[#7A1530]/20 text-xs">
              <span className="font-script text-2xl text-[#7A122E]">
                To Nafisa · With Love
              </span>
              <span className="text-[#5C1225] italic font-medium">
                From Abdul Ahad
              </span>
            </div>
          </VintageLetterCard>
        </div>

        {/* Action Button: SHOW ME SOMETHING BEAUTIFUL */}
        <div>
          <button
            onClick={handleNextQuote}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#D9B76E] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(217,183,110,0.4)] cursor-pointer"
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
