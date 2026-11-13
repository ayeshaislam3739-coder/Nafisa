import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronLeft, ChevronRight, Play, Pause, X, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

import starlitEveningImg from '../assets/images/memory_starlit_evening_1794399773860.jpg';
import goldenSunsetImg from '../assets/images/memory_golden_sunset_1794399775243.jpg';
import roseTerraceImg from '../assets/images/memory_rose_terrace_1794399775399.jpg';
import lanternWishesImg from '../assets/images/memory_lantern_wishes_1794399776778.jpg';
import signatureRoseImg from '../assets/images/boutique_signature_rose_1794570558264.jpg';
import ivoryWhisperImg from '../assets/images/boutique_ivory_whisper_1794570559212.jpg';

interface MemoryItem {
  id: string;
  image: string;
  title: string;
  caption: string;
}

const MEMORY_GALLERY: MemoryItem[] = [
  {
    id: 'mem-1',
    image: starlitEveningImg,
    title: 'Starlit Evening',
    caption: 'Quiet skies that remind me how bright your presence makes every night.',
  },
  {
    id: 'mem-2',
    image: goldenSunsetImg,
    title: 'Golden Hour',
    caption: 'Warm light and peaceful moments worth holding onto forever.',
  },
  {
    id: 'mem-3',
    image: roseTerraceImg,
    title: 'Crimson Petals',
    caption: 'Every bloom carrying an unspoken wish for your happiness.',
  },
  {
    id: 'mem-4',
    image: lanternWishesImg,
    title: 'Floating Wishes',
    caption: 'May every quiet prayer and dream find its way gently to you.',
  },
  {
    id: 'mem-5',
    image: signatureRoseImg,
    title: 'Timeless Affection',
    caption: 'A classic reminder of sincerity, care, and lasting respect.',
  },
  {
    id: 'mem-6',
    image: ivoryWhisperImg,
    title: 'Peaceful Grace',
    caption: 'Moments of calm beauty that make ordinary days feel extraordinary.',
  },
];

export const MemoriesGallerySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxItem, setLightboxItem] = useState<MemoryItem | null>(null);
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

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % messages.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);

  return (
    <section id="story" className="relative py-10 sm:py-14 px-4 sm:px-6 overflow-hidden">
      {/* Subtle Golden Ambient Lighting */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[520px] h-[420px] rounded-full opacity-22 blur-[120px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(217, 183, 110, 0.35), rgba(138, 16, 44, 0.2), transparent 72%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center z-10">
        {/* Left: YOUR MEMORIES + EmotionalStory Thoughts (5 Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="lg:col-span-5 space-y-5 text-center lg:text-left"
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-[#D9B76E] font-semibold">
              Chapter One · If I Could Tell You One Thing
            </p>
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold uppercase tracking-wide text-[#FFF4EA] leading-tight">
              OUR <span className="gold-gradient-text">MEMORIES.</span>
            </h2>
            <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-1">
              <span className="w-8 h-px bg-[#D9B76E]/50" />
              <Heart className="w-4 h-4 text-[#D9B76E]" />
              <span className="w-8 h-px bg-[#D9B76E]/50" />
            </div>
          </div>

          {/* Interactive Preserved LoveStory Thought Box */}
          <div className="rounded-2xl bg-gradient-to-b from-[#1C040D]/92 via-[#120208]/96 to-[#080104] border border-[#D9B76E]/35 p-5 sm:p-6 shadow-xl space-y-4 text-left">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#D9B76E] font-semibold border-b border-[#D9B76E]/20 pb-2.5">
              <span>Thought 0{currentIndex + 1} / 0{messages.length}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#FFF4EA]/75 hover:text-white transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause thoughts' : 'Play thoughts'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#FFF4EA]/75 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous thought"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#FFF4EA]/75 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next thought"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="min-h-[115px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45 }}
                  className="font-cormorant italic text-xl sm:text-2xl text-[#FFF4EA] leading-relaxed font-light"
                >
                  &ldquo;{messages[currentIndex]}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#D9B76E]/15">
              <div className="flex items-center gap-1.5">
                {messages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === i ? 'w-5 bg-[#D9B76E]' : 'w-1.5 bg-white/25 hover:bg-white/45'
                    }`}
                    aria-label={`Select thought ${i + 1}`}
                  />
                ))}
              </div>
              <span className="font-script text-xl text-[#F7C5D0]">
                {birthdayConfig.creatorName}
              </span>
            </div>
          </div>

          <p className="font-playfair text-xs sm:text-sm font-bold tracking-[0.2em] uppercase gold-gradient-text">
            {birthdayConfig.loveStoryBottomText}
          </p>
        </motion.div>

        {/* Right: Framed Our Memories Gallery (7 Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <div className="rounded-2xl border border-[#D9B76E]/35 bg-gradient-to-b from-[#17040B]/95 via-[#0E0206]/98 to-[#060103] p-4 sm:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.82)] space-y-4">
            <div className="flex items-center justify-between border-b border-[#D9B76E]/20 pb-2.5">
              <h3 className="font-script text-3xl text-[#FFF4EA]">Our Memories</h3>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9B76E]/80">
                Tap any frame to view
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {MEMORY_GALLERY.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxItem(item)}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-[#D9B76E]/30 hover:border-[#D9B76E] bg-[#120208] text-left cursor-pointer transition-all duration-300 shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute inset-x-2 bottom-2">
                    <p className="font-playfair text-xs sm:text-sm font-semibold text-[#FFF4EA] truncate">
                      {item.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Memory Lightbox Viewer */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/92 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full rounded-2xl border border-[#D9B76E]/55 bg-[#120308] overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-[#FFF4EA] transition-colors cursor-pointer"
                aria-label="Close memory photo"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-[4/3] w-full bg-black">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 sm:p-6 text-center space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-[#D9B76E]">
                  <Sparkles className="w-3 h-3" />
                  <span>{lightboxItem.title}</span>
                </div>
                <p className="font-cormorant italic text-xl text-[#FFF4EA]">
                  &ldquo;{lightboxItem.caption}&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
