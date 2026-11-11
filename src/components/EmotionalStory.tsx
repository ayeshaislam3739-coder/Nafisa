import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronLeft, ChevronRight, Sparkles, Play, Pause } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const EmotionalStory: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const messages = birthdayConfig.loveStoryMessages;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (!document.hidden) {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, messages.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  return (
    <section id="story" className="relative py-28 px-4 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-[#400D24]/30 via-[#E88CA8]/15 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-10 z-10">
        {/* Section Title */}
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
              Whispers of the soul
            </span>
            <Sparkles className="w-4 h-4 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            If I Could Tell You One Thing...
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/80 max-w-md mx-auto font-light">
            Thoughts held gently in the heart, dedicated to Nafisa.
          </p>
        </motion.div>

        {/* Cinematic Card Display */}
        <div className="relative max-w-2xl mx-auto">
          {/* Outer glow ring */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#D9B76E]/20 via-[#E88CA8]/20 to-[#D9B76E]/20 blur-xl opacity-80" />

          <div className="relative min-h-[220px] sm:min-h-[240px] rounded-3xl bg-gradient-to-b from-[#2e1024]/80 via-[#240e1d]/90 to-[#180713]/95 border-2 border-[#D9B76E]/40 p-8 sm:p-12 shadow-2xl backdrop-blur-md flex flex-col justify-between items-center">
            {/* Step / Chapter index */}
            <div className="w-full flex justify-between items-center text-xs text-[#D9B76E] tracking-[0.25em] uppercase font-semibold border-b border-[#D9B76E]/20 pb-3">
              <span>Chapter 0{currentIndex + 1}</span>
              <span className="text-[#FFF4EA]/50">0{messages.length}</span>
            </div>

            {/* Message animation */}
            <div className="py-6 my-auto">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#FFF4EA] leading-relaxed font-light"
                >
                  &ldquo;{messages[currentIndex]}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Stepper Controls */}
            <div className="w-full pt-4 flex justify-between items-center border-t border-[#D9B76E]/20">
              <div className="flex items-center gap-1.5">
                {messages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === i ? 'w-6 bg-[#D9B76E]' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to thought ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#FFF4EA]/70 hover:text-white transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause auto-play' : 'Resume auto-play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#FFF4EA]/70 hover:text-white transition-colors cursor-pointer"
                  title="Previous message"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#FFF4EA]/70 hover:text-white transition-colors cursor-pointer"
                  title="Next message"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Climax Message & Animated Heart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-6 space-y-4"
        >
          {/* Animated 3D-Style Heart */}
          <div className="flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.15, 1, 1.1, 1],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[#E88CA8] drop-shadow-[0_0_15px_rgba(232,140,168,0.7)]"
            >
              <Heart className="w-10 h-10 fill-current" />
            </motion.div>
          </div>

          <p className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold gold-gradient-text tracking-widest uppercase">
            {birthdayConfig.loveStoryBottomText}
          </p>

          <p className="font-script text-2xl sm:text-3xl text-[#E88CA8]">
            Forever in my thoughts · Abdul Ahad
          </p>
        </motion.div>
      </div>
    </section>
  );
};
