import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw, X, Feather } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { audioEngine } from '../services/audioEngine';

interface PieceOfMyHeartProps {
  onPetalSurge?: () => void;
}

export const PieceOfMyHeart: React.FC<PieceOfMyHeartProps> = ({ onPetalSurge }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [secretModalOpen, setSecretModalOpen] = useState(false);
  const { pieceOfMyHeart } = birthdayConfig;

  const handleHeartClick = () => {
    setIsRevealed(true);
    setShowSecondMessage(false);
    onPetalSurge?.();
    audioEngine.playSparkle();

    // Release dozens of tiny floating hearts and golden sparkles
    confetti({
      particleCount: 85,
      spread: 110,
      origin: { y: 0.6 },
      colors: ['#E88CA8', '#F7C5D0', '#D9B76E', '#FFF4EA', '#bd244b'],
      scalar: 1.25,
    });

    setTimeout(() => {
      audioEngine.playChimeChord();
    }, 400);

    // After a few seconds, reveal the second message
    setTimeout(() => {
      setShowSecondMessage(true);
      confetti({
        particleCount: 45,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#D9B76E', '#F7C5D0'],
      });
    }, 2800);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playPop();
    setIsRevealed(false);
    setShowSecondMessage(false);
  };

  const handleOpenSecret = () => {
    audioEngine.playChimeChord();
    setSecretModalOpen(true);
  };

  const surroundingHearts = [
    { id: 1, radius: 125, speed: 7, delay: 0, size: 22, color: '#E88CA8' },
    { id: 2, radius: 160, speed: 9, delay: 1.5, size: 17, color: '#D9B76E' },
    { id: 3, radius: 195, speed: 11, delay: 3, size: 24, color: '#F7C5D0' },
    { id: 4, radius: 140, speed: 8, delay: 4, size: 19, color: '#FFF4EA' },
    { id: 5, radius: 175, speed: 10, delay: 2, size: 16, color: '#bd244b' },
  ];

  return (
    <section id="heart-piece" className="relative py-28 px-4 overflow-hidden text-center">
      {/* Background Soft Romantic Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[580px] rounded-full bg-gradient-to-tr from-[#91173d]/25 via-[#D9B76E]/15 to-transparent blur-[130px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-12 z-10">
        {/* Section Heading */}
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
              From the quiet depths of the heart
            </span>
            <Heart className="w-4 h-4 fill-[#E88CA8] text-[#E88CA8]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            {pieceOfMyHeart.heading}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/85 max-w-md mx-auto font-light">
            {pieceOfMyHeart.subheading}
          </p>
        </motion.div>

        {/* 3D Heart with Realistic Heartbeat Rhythm */}
        <div className="relative py-12 flex items-center justify-center min-h-[380px] select-none perspective-[1000px]">
          {/* Orbiting Miniature Hearts */}
          {surroundingHearts.map((orb) => (
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
                  filter: `drop-shadow(0 0 10px ${orb.color})`,
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

          {/* Large Glowing 3D Heart (Heartbeat rhythm: beat 1 -> beat 2 -> pause) */}
          <motion.div
            onClick={handleHeartClick}
            animate={
              isRevealed
                ? { scale: [1, 1.25, 1.15], rotate: [0, 2, -2, 0] }
                : {
                    // Lub-Dub Natural Heartbeat:
                    // 0%: 1.0 -> 14%: 1.12 -> 28%: 1.0 -> 42%: 1.20 -> 56%: 1.0 -> 100%: 1.0 (relaxing pause)
                    scale: [1.0, 1.12, 1.0, 1.20, 1.0, 1.0],
                    filter: [
                      'drop-shadow(0 0 20px rgba(232,140,168,0.5))',
                      'drop-shadow(0 0 35px rgba(217,183,110,0.8))',
                      'drop-shadow(0 0 20px rgba(232,140,168,0.5))',
                      'drop-shadow(0 0 45px rgba(232,140,168,0.9))',
                      'drop-shadow(0 0 20px rgba(232,140,168,0.5))',
                      'drop-shadow(0 0 20px rgba(232,140,168,0.5))',
                    ],
                  }
            }
            transition={{
              duration: isRevealed ? 0.8 : 2.4,
              repeat: isRevealed ? 0 : Infinity,
              ease: 'easeInOut',
              times: isRevealed ? undefined : [0, 0.14, 0.28, 0.42, 0.56, 1.0],
            }}
            whileHover={{ scale: 1.15, cursor: 'pointer' }}
            className="relative z-20 group"
            title="Click to feel my heart"
          >
            {/* Ambient Inner Halo */}
            <div className="absolute -inset-10 rounded-full bg-radial from-[#E88CA8]/35 via-[#D9B76E]/20 to-transparent blur-2xl pointer-events-none" />

            {/* Realistic 3D SVG Heart */}
            <svg
              className="w-40 h-40 sm:w-48 sm:h-48 transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="pieceHeartGrad" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#FFF0F5" />
                  <stop offset="25%" stopColor="#f48fb1" />
                  <stop offset="55%" stopColor="#c2185b" />
                  <stop offset="85%" stopColor="#880e4f" />
                  <stop offset="100%" stopColor="#350615" />
                </radialGradient>
                <linearGradient id="pieceGoldSheen" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFF4EA" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#D9B76E" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Heart Silhouette with 3D Depth */}
              <path
                d="M50 88 C20 62 4 44 4 26 C4 13 14 4 27 4 C36 4 45 9 50 17 C55 9 64 4 73 4 C86 4 96 13 96 26 C96 44 80 62 50 88 Z"
                fill="url(#pieceHeartGrad)"
                stroke="#D9B76E"
                strokeWidth="1.2"
                style={{ filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.65))' }}
              />

              {/* Specular Curved Highlight */}
              <path
                d="M26 10 C18 10 12 16 12 24 C12 30 16 38 22 46"
                stroke="url(#pieceGoldSheen)"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>
        </div>

        {/* Revealed Messages on Click */}
        <div className="min-h-[160px] flex items-center justify-center">
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 20 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-2xl w-full p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#2e1024] via-[#240e1d] to-[#150612] border-2 border-[#D9B76E]/60 shadow-[0_0_50px_rgba(217,183,110,0.3)] space-y-6"
              >
                <div className="flex justify-center text-[#D9B76E]">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>

                <div className="space-y-4">
                  <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider gold-gradient-text uppercase leading-snug">
                    &ldquo;{pieceOfMyHeart.heartReveal1}&rdquo;
                  </h3>

                  <AnimatePresence>
                    {showSecondMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-cormorant italic text-xl sm:text-2xl text-[#F7C5D0] pt-2"
                      >
                        &ldquo;{pieceOfMyHeart.heartReveal2}&rdquo;
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-2 flex justify-center gap-4">
                  <button
                    onClick={handleReplay}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FFF4EA] border border-[#D9B76E]/50 hover:bg-[#D9B76E]/15 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#D9B76E]" />
                    <span>Feel It Again</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isRevealed && (
            <p className="text-xs text-[#FFF4EA]/50 italic">
              Tap the glowing heart to hear what it whispers for you.
            </p>
          )}
        </div>

        {/* PART 5: Small Glowing Heart Button for the Secret Love Message */}
        <div className="pt-4 flex flex-col items-center gap-2">
          <button
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

      {/* PART 5: SECRET LOVE MESSAGE MODAL */}
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
              initial={{ scale: 0.88, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#2e1024] via-[#200c1c] to-[#120510] border-2 border-[#D9B76E]/60 shadow-[0_0_60px_rgba(217,183,110,0.3)] space-y-7"
            >
              <button
                onClick={() => setSecretModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF4EA] transition-colors cursor-pointer"
                aria-label="Close note"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex justify-center text-[#E88CA8]">
                <Heart className="w-10 h-10 fill-current animate-pulse" />
              </div>

              <div className="space-y-4 text-left">
                <p className="font-cormorant italic text-sm tracking-[0.2em] uppercase text-[#D9B76E] font-semibold text-center">
                  {pieceOfMyHeart.secretNote.intro}
                </p>

                <div className="space-y-3 font-cormorant text-xl sm:text-2xl text-[#FFF4EA] leading-relaxed font-light">
                  <p className="font-semibold text-[#F7C5D0] text-2xl">
                    {pieceOfMyHeart.secretNote.line1}
                  </p>
                  <p>{pieceOfMyHeart.secretNote.line2}</p>
                  <p>{pieceOfMyHeart.secretNote.line3}</p>
                  <p className="text-[#D9B76E] pt-2">{pieceOfMyHeart.secretNote.line4}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D9B76E]/30 text-right">
                <p className="font-script text-3xl sm:text-4xl text-[#E88CA8]">
                  {pieceOfMyHeart.secretNote.signature}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
