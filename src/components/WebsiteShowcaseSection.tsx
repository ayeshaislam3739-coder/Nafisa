import React from 'react';
import { motion } from 'motion/react';
import { Heart, BookOpen, Mail, Sparkles, Flower2, KeyRound, ArrowRight } from 'lucide-react';
import uploadedRoseUrl from '../assets/images/uploaded_rose_transparent.webp';
import { birthdayConfig } from '../config/birthdayConfig';

export const WebsiteShowcaseSection: React.FC = () => {
  const scrollToTarget = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const chapterShortcuts = [
    { label: '01 · Our Memories', target: '#story', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { label: '02 · The Ancient Letter', target: '#letter', icon: <Mail className="w-3.5 h-3.5" /> },
    { label: '03 · Flower Boutique', target: '#cake', icon: <Flower2 className="w-3.5 h-3.5" /> },
    { label: '04 · Breaking Heart Note', target: '#heart-reveal', icon: <Heart className="w-3.5 h-3.5" /> },
    { label: '05 · Love Keys & Notes', target: '#discover-heart', icon: <KeyRound className="w-3.5 h-3.5" /> },
  ];

  return (
    <section id="introducing" className="relative py-10 sm:py-14 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left: Live Project Nafisa Visual Showcase Frame (7 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative"
        >
          {/* Ambient crimson/gold glow behind preview */}
          <div
            className="absolute -inset-3 rounded-2xl opacity-55 blur-xl pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 40% 50%, rgba(158, 25, 56, 0.35), rgba(217, 183, 110, 0.14), transparent 75%)',
            }}
          />

          <div className="relative rounded-2xl border border-[#D9B76E]/35 bg-gradient-to-br from-[#19040B]/95 via-[#0E0206]/98 to-[#060103] shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Browser/Stage Top Hairline */}
            <div className="px-4 py-2.5 border-b border-[#D9B76E]/20 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#D9B76E]/85">
              <span>Project {birthdayConfig.birthdayName}</span>
              <span className="text-[#FFF4EA]/55 font-cormorant normal-case italic text-xs tracking-normal">
                Created by {birthdayConfig.creatorName}
              </span>
            </div>

            {/* Inner Composition using actual website rose & interactive chapter index */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center p-5 sm:p-7 gap-5">
              {/* Mini Chapter Index Column */}
              <div className="sm:col-span-6 space-y-2 order-2 sm:order-1">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#D9B76E] font-semibold pb-1">
                  Inside This World
                </p>

                <div className="space-y-1.5">
                  {chapterShortcuts.map((item) => (
                    <button
                      key={item.target}
                      onClick={() => scrollToTarget(item.target)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#250610]/70 hover:bg-[#3A0A1B] border border-[#D9B76E]/20 hover:border-[#D9B76E]/60 text-left text-xs text-[#FFF4EA]/90 transition-all cursor-pointer group"
                    >
                      <span className="inline-flex items-center gap-2 whitespace-nowrap truncate">
                        <span className="text-[#D9B76E]">{item.icon}</span>
                        <span>{item.label}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D9B76E]/60 group-hover:translate-x-0.5 group-hover:text-[#D9B76E] transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Actual Website Rose & Script Seal Visual */}
              <div className="sm:col-span-6 relative flex flex-col items-center justify-center py-3 order-1 sm:order-2">
                <div
                  className="absolute inset-4 rounded-full pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(185, 17, 56, 0.38) 0%, transparent 72%)',
                  }}
                />
                <img
                  src={uploadedRoseUrl}
                  alt="Project Nafisa Crimson Rose"
                  referrerPolicy="no-referrer"
                  className="relative z-10 w-36 sm:w-44 h-auto object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.85)]"
                />
                <p className="relative z-10 mt-2 font-script text-3xl text-[#FFF4EA] drop-shadow">
                  For {birthdayConfig.birthdayName}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Editorial Text Presentation (5 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 text-center lg:text-left space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-[#D9B76E] font-semibold">
            Introducing Project {birthdayConfig.birthdayName}
          </p>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-[#FFF4EA] leading-tight">
            MORE THAN JUST <br className="hidden sm:block" />
            <span className="gold-gradient-text">A WEBSITE...</span>
          </h2>

          {/* Minimalist Gold Heart Flourish */}
          <div className="flex items-center justify-center lg:justify-start gap-3 py-1">
            <span className="w-10 h-px bg-[#D9B76E]/55" />
            <Heart className="w-4 h-4 text-[#D9B76E]" />
            <span className="w-10 h-px bg-[#D9B76E]/55" />
          </div>

          <p className="font-cormorant italic text-xl sm:text-2xl text-[#FFF4EA]/90 leading-relaxed font-light">
            &ldquo;A place where every memory has a meaning, every message carries a feeling, and every little detail is created with love.&rdquo;
          </p>

          <p className="text-sm text-[#FFF4EA]/75 leading-relaxed font-light">
            Take your time, {birthdayConfig.birthdayName}. Follow each chapter below, tap the glowing keepsakes, and unseal every note made for you.
          </p>

          <div className="pt-2">
            <button
              onClick={() => scrollToTarget('#story')}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#D9B76E] hover:scale-[1.03] transition-transform shadow-[0_0_24px_rgba(217,183,110,0.35)] cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#6e112c]" />
              <span>Begin Exploring</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
