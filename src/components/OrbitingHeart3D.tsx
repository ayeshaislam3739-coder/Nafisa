import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

export const OrbitingHeart3D: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleHeartClick = () => {
    setIsExpanded(true);
    audioEngine.playSparkle();
    setTimeout(() => {
      audioEngine.playChimeChord();
    }, 300);

    // Heart explosion confetti
    confetti({
      particleCount: 90,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#E88CA8', '#F7C5D0', '#D9B76E', '#FFF4EA', '#bd244b'],
      scalar: 1.3,
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 160,
        origin: { y: 0.65 },
        colors: ['#D9B76E', '#F7C5D0'],
      });
    }, 250);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  const orbitingHearts = [
    { id: 1, radius: 120, speed: 6, delay: 0, size: 20, color: '#E88CA8' },
    { id: 2, radius: 150, speed: 8, delay: 1.5, size: 16, color: '#D9B76E' },
    { id: 3, radius: 180, speed: 10, delay: 3, size: 22, color: '#F7C5D0' },
    { id: 4, radius: 135, speed: 7, delay: 4.5, size: 18, color: '#FFF4EA' },
    { id: 5, radius: 165, speed: 9, delay: 2, size: 15, color: '#bd244b' },
  ];

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full bg-gradient-to-tr from-[#bd244b]/20 via-[#D9B76E]/15 to-transparent blur-[130px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-10 z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <span className="font-script text-3xl sm:text-4xl text-[#F7C5D0]">
            The Heart of the Celebration
          </span>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            A Beating World for Nafisa
          </h2>

          <p className="text-sm sm:text-base text-[#FFF4EA]/75 max-w-md mx-auto font-light">
            Touch the glowing heart to release the love orbiting within.
          </p>
        </motion.div>

        {/* 3D Heart & Orbital System */}
        <div className="relative py-12 flex items-center justify-center min-h-[380px]">
          {/* Orbiting Satellites (Rendered when not expanded) */}
          {!isExpanded &&
            orbitingHearts.map((orb) => (
              <motion.div
                key={orb.id}
                animate={{ rotate: 360 }}
                transition={{
                  duration: orb.speed,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: orb.delay,
                }}
                className="absolute pointer-events-none"
                style={{
                  width: `${orb.radius * 2}px`,
                  height: `${orb.radius * 2}px`,
                }}
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    filter: `drop-shadow(0 0 8px ${orb.color})`,
                  }}
                >
                  <svg
                    width={orb.size}
                    height={orb.size}
                    viewBox="0 0 24 24"
                    fill={orb.color}
                    stroke="none"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </motion.div>
            ))}

          {/* Central 3D Glowing Heart */}
          <motion.div
            onClick={handleHeartClick}
            animate={
              isExpanded
                ? { scale: [1, 1.25, 1.15], rotate: [0, 2, -2, 0] }
                : {
                    scale: [1, 1.12, 1, 1.08, 1],
                    filter: [
                      'drop-shadow(0 0 20px rgba(232,140,168,0.5))',
                      'drop-shadow(0 0 45px rgba(217,183,110,0.8))',
                      'drop-shadow(0 0 20px rgba(232,140,168,0.5))',
                    ],
                  }
            }
            transition={{
              scale: { duration: isExpanded ? 0.8 : 2.5, repeat: isExpanded ? 0 : Infinity, ease: 'easeInOut' },
              filter: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            whileHover={{ scale: 1.15, cursor: 'pointer' }}
            className="relative z-20 group"
            title="Click the heart!"
          >
            {/* Ambient Aura */}
            <div className="absolute -inset-8 rounded-full bg-radial from-[#E88CA8]/30 via-[#D9B76E]/20 to-transparent blur-xl pointer-events-none" />

            {/* Realistic 3D SVG Heart */}
            <svg
              className="w-36 h-36 sm:w-44 sm:h-44 transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 3D Volumetric Radial Gradient */}
                <radialGradient id="heart3dGrad" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#FFF0F5" />
                  <stop offset="25%" stopColor="#f48fb1" />
                  <stop offset="60%" stopColor="#c2185b" />
                  <stop offset="90%" stopColor="#880e4f" />
                  <stop offset="100%" stopColor="#3e0719" />
                </radialGradient>
                {/* Gold rim sheen */}
                <linearGradient id="goldSheen" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFF4EA" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#D9B76E" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Heart Path */}
              <path
                d="M50 88 C20 62 4 44 4 26 C4 13 14 4 27 4 C36 4 45 9 50 17 C55 9 64 4 73 4 C86 4 96 13 96 26 C96 44 80 62 50 88 Z"
                fill="url(#heart3dGrad)"
                stroke="#D9B76E"
                strokeWidth="1.2"
                style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))' }}
              />

              {/* Specular curved highlight on top-left lobe */}
              <path
                d="M26 10 C18 10 12 16 12 24 C12 30 16 38 22 46"
                stroke="url(#goldSheen)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>
        </div>

        {/* Revealed Quote & Interaction Result */}
        <div className="min-h-[140px] flex items-center justify-center">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 20 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-2xl w-full p-8 rounded-3xl bg-gradient-to-b from-[#2e1024] via-[#240e1d] to-[#150612] border-2 border-[#D9B76E]/60 shadow-[0_0_50px_rgba(217,183,110,0.3)] space-y-5"
              >
                <div className="flex justify-center text-[#D9B76E]">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>

                <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider gold-gradient-text uppercase leading-snug">
                  &ldquo;IF I COULD SEND YOU ONE THING, IT WOULD BE ALL THE HAPPINESS YOUR HEART CAN HOLD.&rdquo;
                </h3>

                <p className="font-cormorant italic text-lg sm:text-xl text-[#F7C5D0]">
                  Every pulse of this heart carries my warmest thoughts for you, Nafisa.
                </p>

                <div>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FFF4EA] border border-[#D9B76E]/50 hover:bg-[#D9B76E]/15 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send Another Pulse</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isExpanded && (
            <p className="text-xs text-[#FFF4EA]/50 italic">
              Click the center heart to send love outward across the stars.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
