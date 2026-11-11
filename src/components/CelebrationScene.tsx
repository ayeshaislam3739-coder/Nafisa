import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, PartyPopper } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface BalloonItem {
  id: number;
  x: number;
  color: string;
  delay: number;
  speed: number;
  popped: boolean;
}

export const CelebrationScene: React.FC = () => {
  const [balloons, setBalloons] = useState<BalloonItem[]>([
    { id: 1, x: 10, color: 'from-[#bd244b] to-[#6b0f2a]', delay: 0, speed: 17, popped: false },
    { id: 2, x: 28, color: 'from-[#D9B76E] to-[#916e25]', delay: 2, speed: 21, popped: false },
    { id: 3, x: 50, color: 'from-[#E88CA8] to-[#993b5a]', delay: 1, speed: 18, popped: false },
    { id: 4, x: 72, color: 'from-[#B9A5E8] to-[#634896]', delay: 3, speed: 20, popped: false },
    { id: 5, x: 88, color: 'from-[#F7C5D0] to-[#c7657f]', delay: 1.5, speed: 19, popped: false },
  ]);

  // Periodic celebratory soft fireworks (paused when hidden)
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.hidden) return;
      const x = 0.2 + Math.random() * 0.6;
      const y = 0.15 + Math.random() * 0.25;
      confetti({
        particleCount: 20,
        startVelocity: 25,
        spread: 360,
        ticks: 70,
        origin: { x, y },
        colors: ['#D9B76E', '#F7C5D0', '#E88CA8', '#FFF4EA'],
        scalar: 0.85,
        disableForReducedMotion: true,
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const popBalloon = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { x, y },
      colors: ['#D9B76E', '#FFF4EA', '#E88CA8', '#F7C5D0', '#bd244b'],
      scalar: 1.0,
    });

    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    // Re-spawn balloon after 4 seconds
    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((b) => (b.id === id ? { ...b, popped: false } : b))
      );
    }, 4000);
  };

  const triggerSparkleBurst = (e?: React.MouseEvent) => {
    const x = e ? e.clientX / window.innerWidth : 0.5;
    const y = e ? e.clientY / window.innerHeight : 0.65;

    confetti({
      particleCount: 45,
      spread: 85,
      origin: { x, y },
      colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8'],
      shapes: ['star', 'circle'],
    });
  };

  return (
    <section id="celebration" className="relative py-24 px-4 overflow-hidden">
      {/* Floating Interactive Balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {balloons.map((b) =>
          !b.popped ? (
            <motion.div
              key={b.id}
              initial={{ y: '110vh' }}
              animate={{ y: '-25vh' }}
              transition={{
                duration: b.speed,
                repeat: Infinity,
                delay: b.delay,
                ease: 'linear',
              }}
              className="absolute pointer-events-auto cursor-pointer"
              style={{ left: `${b.x}%` }}
              onClick={(e) => popBalloon(b.id, e)}
              title="Click to pop!"
            >
              <div className="relative flex flex-col items-center group">
                <div
                  className={`w-14 h-18 sm:w-16 sm:h-21 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-t ${b.color} shadow-xl shadow-black/50 group-hover:scale-115 transition-transform duration-200 relative overflow-hidden`}
                >
                  {/* Balloon reflection highlight */}
                  <div className="absolute top-2 left-3 w-3.5 h-6 rounded-full bg-white/45 blur-[1.2px] rotate-[-22deg]" />
                </div>
                {/* Knot */}
                <div className="w-2.5 h-2 bg-white/35 rounded-xs -mt-0.5" />
                {/* Wavy golden ribbon string */}
                <div className="w-0.5 h-20 bg-gradient-to-b from-[#D9B76E]/60 via-[#E88CA8]/40 to-transparent" />
              </div>
            </motion.div>
          ) : null
        )}
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2">
            <Heart className="w-4 h-4 fill-[#E88CA8] text-[#E88CA8]" />
            <span className="font-script text-3xl sm:text-4xl text-[#F7C5D0]">
              A magical tribute for someone extraordinary
            </span>
            <Heart className="w-4 h-4 fill-[#E88CA8] text-[#E88CA8]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            {birthdayConfig.grandTitle}
          </h2>

          <p className="text-sm sm:text-base text-[#FFF4EA]/85 max-w-lg mx-auto font-light leading-relaxed">
            I hope today brings you as much happiness, warmth, and peace as you effortlessly bring into my life.
          </p>
        </motion.div>

        {/* Celebratory interactive card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-7 sm:p-10 rounded-3xl bg-[#2e1024]/60 border border-[#D9B76E]/35 backdrop-blur-md shadow-2xl space-y-7 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 text-[#D9B76E]">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-xs tracking-[0.3em] uppercase font-bold text-[#D9B76E]">
              Joy · Peace · Warmth
            </span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>

          <p className="font-cormorant italic text-xl sm:text-2xl md:text-3xl text-[#FFF4EA]/90 leading-relaxed font-light">
            &ldquo;I truly wish that your day is filled with laughter, peaceful moments, and all the quiet happiness you deserve so deeply.&rdquo;
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={triggerSparkleBurst}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#E88CA8] hover:scale-105 transition-all shadow-md cursor-pointer"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Launch Sparkles</span>
            </button>
            <span className="text-xs text-[#FFF4EA]/65 italic">
              Tip: Click any floating balloon above to pop it!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
