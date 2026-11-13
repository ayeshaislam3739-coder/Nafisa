import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, PartyPopper, Clock } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import goldenSunsetImg from '../assets/images/memory_golden_sunset_1794399775243.jpg';

interface BalloonItem {
  id: number;
  x: number;
  color: string;
  delay: number;
  speed: number;
  popped: boolean;
}

// Target: November 16, 2026 — 12:00 AM Bangladesh Standard Time (Asia/Dhaka, UTC+06:00)
const BIRTHDAY_TARGET_MS = new Date('2026-11-16T00:00:00+06:00').getTime();

interface CountdownState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isCompleted: boolean;
}

function getCountdownState(nowMs: number): CountdownState {
  const diff = BIRTHDAY_TARGET_MS - nowMs;

  if (diff <= 0) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      isCompleted: true,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    isCompleted: false,
  };
}

export const BeginningOfForeverSection: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownState>(() => getCountdownState(Date.now()));
  const [balloons, setBalloons] = useState<BalloonItem[]>([
    { id: 1, x: 8, color: 'from-[#9E1938] to-[#56071B]', delay: 0, speed: 18, popped: false },
    { id: 2, x: 32, color: 'from-[#D9B76E] to-[#8C6822]', delay: 2, speed: 21, popped: false },
    { id: 3, x: 64, color: 'from-[#C8375A] to-[#6E0D26]', delay: 1, speed: 19, popped: false },
    { id: 4, x: 88, color: 'from-[#D9B76E] to-[#A17830]', delay: 3, speed: 20, popped: false },
  ]);

  useEffect(() => {
    if (countdown.isCompleted) return;

    const timer = setInterval(() => {
      const next = getCountdownState(Date.now());
      setCountdown(next);
      if (next.isCompleted) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown.isCompleted]);

  const units = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Minutes', value: countdown.minutes },
    { label: 'Seconds', value: countdown.seconds },
  ];

  const popBalloon = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    confetti({
      particleCount: 30,
      spread: 70,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ['#D9B76E', '#FFF4EA', '#E88CA8', '#9E1938'],
      scalar: 1.0,
    });
    setBalloons((prev) => prev.map((b) => (b.id === id ? { ...b, popped: true } : b)));
    setTimeout(() => {
      setBalloons((prev) => prev.map((b) => (b.id === id ? { ...b, popped: false } : b)));
    }, 4000);
  };

  const triggerSparkleBurst = (e?: React.MouseEvent) => {
    const x = e ? e.clientX / window.innerWidth : 0.5;
    const y = e ? e.clientY / window.innerHeight : 0.6;
    confetti({
      particleCount: 45,
      spread: 85,
      origin: { x, y },
      colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#9E1938'],
      shapes: ['star', 'circle'],
    });
  };

  return (
    <section id="celebration" className="relative py-10 sm:py-14 px-4 sm:px-6 overflow-hidden">
      {/* Interactive Floating Balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {balloons.map((b) =>
          !b.popped ? (
            <motion.div
              key={b.id}
              initial={{ y: '100%' }}
              animate={{ y: '-25%' }}
              transition={{ duration: b.speed, repeat: Infinity, delay: b.delay, ease: 'linear' }}
              className="absolute pointer-events-auto cursor-pointer opacity-75 hover:opacity-100"
              style={{ left: `${b.x}%` }}
              onClick={(e) => popBalloon(b.id, e)}
              title="Tap to pop balloon"
            >
              <div className="relative flex flex-col items-center group">
                <div
                  className={`w-11 h-14 sm:w-13 sm:h-17 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-t ${b.color} shadow-lg group-hover:scale-110 transition-transform relative overflow-hidden`}
                >
                  <div className="absolute top-2 left-2.5 w-2.5 h-4.5 rounded-full bg-white/40 blur-[1px] rotate-[-20deg]" />
                </div>
                <div className="w-0.5 h-12 bg-gradient-to-b from-[#D9B76E]/55 to-transparent" />
              </div>
            </motion.div>
          ) : null
        )}
      </div>

      <div id="moments" className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center z-10">
        {/* Left: Editorial Celebration Heading (5 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="lg:col-span-5 text-center lg:text-left space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-[#D9B76E] font-semibold">
            {birthdayConfig.grandTitle}
          </p>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold uppercase tracking-wide text-[#FFF4EA] leading-tight">
            THE BEGINNING OF <span className="gold-gradient-text">FOREVER</span>
          </h2>

          <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-1">
            <span className="w-8 h-px bg-[#D9B76E]/50" />
            <Heart className="w-4 h-4 fill-[#9E1938] text-[#9E1938]" />
            <span className="w-8 h-px bg-[#D9B76E]/50" />
          </div>

          <p className="font-cormorant italic text-xl sm:text-2xl text-[#FFF4EA]/90 leading-relaxed font-light">
            &ldquo;Some days become memories. Some moments become stories. And some people make every moment worth remembering.&rdquo;
          </p>

          <p className="text-sm text-[#FFF4EA]/75 leading-relaxed font-light">
            I truly wish that your day is filled with laughter, peaceful moments, and all the quiet happiness you deserve so deeply.
          </p>

          <div className="pt-2 flex flex-col items-center lg:items-start gap-2">
            <button
              onClick={triggerSparkleBurst}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs font-semibold tracking-[0.18em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#D9B76E] hover:scale-[1.03] transition-transform shadow-[0_0_24px_rgba(217,183,110,0.35)] cursor-pointer whitespace-nowrap"
            >
              <PartyPopper className="w-4 h-4 text-[#6e112c]" />
              <span>Start The Celebration</span>
            </button>
            <span className="text-[11px] text-[#F7C5D0]/80 italic">
              Tap here or pop any floating balloon
            </span>
          </div>
        </motion.div>

        {/* Right: Storybox-Style Framed Visual + Birthday Countdown (7 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <div className="relative rounded-2xl border border-[#D9B76E]/40 bg-[#0D0206] shadow-[0_24px_60px_rgba(0,0,0,0.85)] overflow-hidden">
            {/* Background Romantic Sunset Visual with Scrim */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <img
                src={goldenSunsetImg}
                alt="Golden hour romantic sky"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center opacity-70"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(14,2,7,0.45) 0%, rgba(18,3,9,0.72) 55%, #0D0206 100%)',
                }}
              />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <span className="font-script text-4xl sm:text-5xl text-[#FFF4EA] drop-shadow">
                  The Beginning of Forever
                </span>
                <span className="text-xs uppercase tracking-[0.26em] text-[#D9B76E] mt-1">
                  {countdown.isCompleted
                    ? 'November 16, 2026 · Your Special Day Has Arrived'
                    : `Counting Down to November 16, 2026 · ${birthdayConfig.birthdayName}'s Birthday`}
                </span>
              </div>
            </div>

            {/* Countdown Digits OR Birthday Celebration State */}
            <div className="relative p-5 sm:p-7 space-y-4 text-center overflow-hidden">
              {!countdown.isCompleted ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {units.map((u) => (
                      <div
                        key={u.label}
                        className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-[#19040C]/90 border border-[#D9B76E]/35 shadow-inner"
                      >
                        <span className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold gold-gradient-text tabular-nums">
                          {u.value}
                        </span>
                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#F7C5D0]/85 mt-1.5 font-medium">
                          {u.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#FFF4EA]/75 font-cormorant italic pt-1">
                    <Clock className="w-3.5 h-3.5 text-[#D9B76E]" />
                    <span>16 November 2026 · 12:00 AM Bangladesh Time (Asia/Dhaka)</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#D9B76E]" />
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="relative py-4 px-3 sm:px-6 rounded-xl bg-gradient-to-b from-[#2A0613]/90 via-[#18030A]/95 to-[#0D0206] border border-[#D9B76E]/55 shadow-[0_0_45px_rgba(217,183,110,0.18)] space-y-3"
                >
                  {/* Subtle Ambient Warm Light & Floating Celebration Hearts/Sparks */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-45"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 40%, rgba(217, 183, 110, 0.25), rgba(158, 25, 56, 0.16) 55%, transparent 80%)',
                    }}
                  />

                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.75, 1, 0.75] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Heart className="w-4 h-4 fill-[#C82348] text-[#D9B76E]" />
                    </motion.div>
                    <Sparkles className="w-4 h-4 text-[#FFE29A] animate-pulse" />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.75, 1, 0.75] }}
                      transition={{ duration: 2.4, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Heart className="w-4 h-4 fill-[#C82348] text-[#D9B76E]" />
                    </motion.div>
                  </div>

                  <h3 className="relative z-10 font-playfair text-2xl sm:text-4xl font-bold uppercase tracking-wider gold-gradient-text">
                    HAPPY BIRTHDAY, NAFISA!
                  </h3>

                  <p className="relative z-10 font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/92 max-w-lg mx-auto leading-relaxed">
                    Today is all about you. May your day be filled with happiness, beautiful memories, and endless love.
                  </p>

                  <div className="relative z-10 pt-2">
                    <button
                      type="button"
                      onClick={triggerSparkleBurst}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase text-[#FFF4EA] border border-[#D9B76E]/60 bg-[#7A102B]/40 hover:bg-[#9E1938]/55 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D9B76E]" />
                      <span>Celebrate This Moment</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
