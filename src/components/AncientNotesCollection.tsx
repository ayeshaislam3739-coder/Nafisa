import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, MailOpen, Feather, Sparkles, X } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { VintageLetterCard, VintageLetterVariant } from './VintageLetterCard';

interface CollectionNote {
  id: string;
  anchorId?: string;
  badge: string;
  title: string;
  subtitle: string;
  variant: VintageLetterVariant;
  waxLabel: string;
  salutation: string;
  paragraphs: string[];
  closing: string;
  signOff: string;
}

const COLLECTION_NOTES: CollectionNote[] = [
  {
    id: 'ancient-note',
    badge: 'Template I · The Ancient Love Letter',
    title: `A Letter from ${birthdayConfig.creatorName}`,
    subtitle: 'Preserved heartfelt birthday letter filled with wishes and warmth.',
    variant: 'ancient',
    waxLabel: 'Personally Sealed For Nafisa',
    salutation: birthdayConfig.loveLetter.salutation,
    paragraphs: birthdayConfig.loveLetter.paragraphs,
    closing: birthdayConfig.loveLetter.closing,
    signOff: birthdayConfig.loveLetter.signOff,
  },
  {
    id: 'romance-note',
    anchorId: 'tell-you',
    badge: 'Template II · The Vintage Romance Letter',
    title: birthdayConfig.somethingToTellYou.heading,
    subtitle: 'Personal note written to bring a smile and celebrate everything you mean.',
    variant: 'romance',
    waxLabel: 'Dedicated to Nafisa',
    salutation: 'Dearest Nafisa,',
    paragraphs: birthdayConfig.somethingToTellYou.paragraphs,
    closing: birthdayConfig.somethingToTellYou.closing,
    signOff: birthdayConfig.somethingToTellYou.signOff,
  },
  {
    id: 'secret-note',
    badge: 'Template III · The Secret Message',
    title: 'A Quiet Note from My Heart',
    subtitle: 'A tender secret note kept quietly for someone deeply treasured.',
    variant: 'secret',
    waxLabel: 'Kept Secret For Nafisa',
    salutation: birthdayConfig.pieceOfMyHeart.secretNote.intro,
    paragraphs: [
      birthdayConfig.pieceOfMyHeart.secretNote.line1,
      birthdayConfig.pieceOfMyHeart.secretNote.line2,
      birthdayConfig.pieceOfMyHeart.secretNote.line3,
      birthdayConfig.pieceOfMyHeart.secretNote.line4,
    ],
    closing: birthdayConfig.hiddenHeartSecret.message2,
    signOff: birthdayConfig.pieceOfMyHeart.secretNote.signature,
  },
  {
    id: 'forever-note',
    badge: 'Template IV · The Forever Letter',
    title: 'This World Is More Beautiful With You',
    subtitle: 'An eternal wish celebrating your kindness, joy, and light.',
    variant: 'forever',
    waxLabel: 'The Forever Letter',
    salutation: birthdayConfig.finalLetter.salutation,
    paragraphs: birthdayConfig.finalLetter.paragraphs,
    closing: birthdayConfig.finalLetter.closingLine,
    signOff: birthdayConfig.finalLetter.signOff,
  },
];

export const AncientNotesCollection: React.FC = () => {
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<CollectionNote | null>(null);

  const handleSelectNote = (note: CollectionNote) => {
    setOpeningId(note.id);
    confetti({
      particleCount: 24,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#D9B76E', '#9E1938', '#FFF4EA'],
      scalar: 0.85,
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      setOpeningId(null);
      setActiveNote(note);
    }, 360);
  };

  return (
    <section id="tell-you" className="relative py-10 sm:py-14 px-4 sm:px-6 overflow-hidden">
      {/* Warm Candlelight Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[420px] rounded-full opacity-22 blur-[120px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(217, 183, 110, 0.25), rgba(122, 16, 43, 0.28), transparent 72%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto space-y-7 z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-2 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-[#D9B76E] font-semibold">
            <Feather className="w-3.5 h-3.5" />
            <span>Preserved Handwritten Keepsakes</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold uppercase tracking-wide text-[#FFF4EA]">
            Ancient Love Note Collection
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/80 font-light">
            Select any sealed parchment envelope below to break the wax seal and read its timeless words.
          </p>
        </motion.div>

        {/* Four Organized Vintage Envelope / Letter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {COLLECTION_NOTES.map((note, idx) => {
            const isOpening = openingId === note.id;
            return (
              <motion.button
                key={note.id}
                type="button"
                onClick={() => handleSelectNote(note)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.08 }}
                className="group relative text-left cursor-pointer focus:outline-none"
              >
                <VintageLetterCard
                  variant={note.variant}
                  className="p-5 sm:p-6 transition-transform duration-300 group-hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <p className="font-cormorant text-[11px] uppercase tracking-[0.22em] font-bold text-[#7A122E]">
                        {note.badge}
                      </p>
                      <h3 className="font-playfair text-lg sm:text-xl font-bold text-[#240910] leading-snug">
                        {note.title}
                      </h3>
                      <p className="font-cormorant italic text-base sm:text-lg text-[#4D1221] leading-snug">
                        {note.subtitle}
                      </p>
                    </div>

                    {/* Mini Burgundy Wax Seal */}
                    <motion.div
                      animate={
                        isOpening
                          ? { scale: [1, 1.25, 0.85], rotate: [0, -8, 8, 0] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.35 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9E1938] via-[#6B0E24] to-[#360410] border-2 border-[#D9B76E] shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                    >
                      <Heart className="w-5 h-5 fill-[#D9B76E]/90 text-[#F8E2B0]" />
                    </motion.div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#7A1530]/20 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-[#7A122E]">
                    <span className="inline-flex items-center gap-1.5">
                      <MailOpen className="w-3.5 h-3.5" />
                      <span>{isOpening ? 'Breaking Seal...' : 'Tap to Unseal Letter'}</span>
                    </span>
                    <span className="font-script normal-case text-xl tracking-normal text-[#5C1225]">
                      {note.signOff}
                    </span>
                  </div>
                </VintageLetterCard>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Unsealed Vintage Note Reading Modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveNote(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 18 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              <VintageLetterCard
                variant={activeNote.variant}
                showWaxSeal
                waxSealLabel={activeNote.waxLabel}
                className="p-6 sm:p-10 space-y-4"
              >
                <button
                  onClick={() => setActiveNote(null)}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-[#7A1530]/10 hover:bg-[#7A1530]/20 text-[#4D0E1F] transition-colors cursor-pointer"
                  aria-label="Close letter"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.24em] text-[#7A122E] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activeNote.badge}</span>
                </div>

                <div className="max-h-[58vh] overflow-y-auto pr-2 space-y-4 text-left scrollbar-thin">
                  <p className="font-script text-3xl sm:text-4xl text-[#7A122E]">
                    {activeNote.salutation}
                  </p>

                  <div className="space-y-3.5 font-cormorant text-lg sm:text-xl text-[#260D14] leading-relaxed font-medium">
                    {activeNote.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#7A1530]/25 text-right space-y-1">
                    <p className="font-cormorant italic text-base text-[#5C1225]">
                      {activeNote.closing}
                    </p>
                    <p className="font-script text-3xl sm:text-4xl text-[#7A122E]">
                      {activeNote.signOff}
                    </p>
                  </div>
                </div>
              </VintageLetterCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
