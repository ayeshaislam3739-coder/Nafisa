import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { OpeningExperience } from './components/OpeningExperience';
import { AtmosphereBackground } from './components/AtmosphereBackground';
import { RosePetalSystem } from './components/RosePetalSystem';
import { HeartCursorTrail } from './components/HeartCursorTrail';
import { HiddenHeartSecret } from './components/HiddenHeartSecret';
import { Navigation } from './components/Navigation';
import { BirthdayHero } from './components/BirthdayHero';
import { EmotionalStory } from './components/EmotionalStory';
import { CelebrationScene } from './components/CelebrationScene';
import { BirthdayCake } from './components/BirthdayCake';
import { InteractiveLoveButtons } from './components/InteractiveLoveButtons';
import { OrbitingHeart3D } from './components/OrbitingHeart3D';
import { LoveLetter } from './components/LoveLetter';
import { PieceOfMyHeart } from './components/PieceOfMyHeart';
import { MessageCapsules } from './components/MessageCapsules';
import { SomethingToTellYou } from './components/SomethingToTellYou';
import { CelebrationClock } from './components/CelebrationClock';
import { LoveQuoteGenerator } from './components/LoveQuoteGenerator';
import { SurpriseGift } from './components/SurpriseGift';
import { LoveFireworks } from './components/LoveFireworks';
import { FinalCelebration } from './components/FinalCelebration';
import { MusicController } from './components/MusicController';
import { audioEngine } from './services/audioEngine';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [petalDensity, setPetalDensity] = useState(1);

  const handleEnterWorld = () => {
    setHasEntered(true);
    // Start mind-relaxing romantic melody upon user click interaction
    audioEngine.play();
  };

  const handlePetalSurge = () => {
    setPetalDensity(2.4);
    setTimeout(() => {
      setPetalDensity(1);
    }, 6000);
  };

  const handleCelebrateAction = () => {
    handlePetalSurge();
    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.3 },
      colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8'],
    });

    const el = document.getElementById('finale');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiscover = () => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-[#FFF4EA] selection:bg-[#E88CA8]/30 selection:text-[#FFF4EA] overflow-x-hidden">
      {/* Multi-Layered Atmosphere Background with Subtle Parallax */}
      <AtmosphereBackground />

      {/* Interactive Glowing Heart Cursor Trail for desktop & touch */}
      <HeartCursorTrail />

      {/* Infinite Realistic Falling Rose Petals (Always Active) */}
      <RosePetalSystem densityMultiplier={petalDensity} />

      {/* Secret Surprise: The Hidden Heart */}
      <HiddenHeartSecret />

      {/* Cinematic Opening Screen (Until Nafisa enters) */}
      {!hasEntered ? (
        <OpeningExperience onEnter={handleEnterWorld} />
      ) : (
        <div className="relative z-10 transition-opacity duration-1000">
          {/* Top Navigation Bar */}
          <Navigation onCelebrateClick={handleCelebrateAction} />

          {/* Main Birthday Hero */}
          <BirthdayHero onDiscover={handleDiscover} />

          {/* Part 4 Emotional Messages: "IF I COULD TELL YOU ONE THING..." */}
          <EmotionalStory />

          {/* Grand Birthday Celebration */}
          <CelebrationScene />

          {/* Interactive 3D Birthday Cake */}
          <BirthdayCake />

          {/* Interactive Love Buttons: "DISCOVER MY HEART" */}
          <InteractiveLoveButtons />

          {/* Advanced 3D Love Heart Animation & Orbiting Satellites */}
          <OrbitingHeart3D />

          {/* Love Letter 2.0 with Satin Ribbon, Roses & Line-by-Line Reveal */}
          <LoveLetter />

          {/* PART 2 & PART 5: "A LITTLE PIECE OF MY HEART" (Replaced Memory Gallery) */}
          <PieceOfMyHeart onPetalSurge={handlePetalSurge} />

          {/* Surprise Message Capsules: "OPEN THESE LITTLE PIECES OF LOVE" */}
          <MessageCapsules />

          {/* PART 4 Personal Love Message: "THERE'S SOMETHING I WANT TO TELL YOU..." */}
          <SomethingToTellYou />

          {/* Celebration Chronometer: "EVERY SECOND IS A REASON TO CELEBRATE YOU" */}
          <CelebrationClock />

          {/* Romantic Love Quote Generator: "A LITTLE LOVE, A LITTLE MAGIC" */}
          <LoveQuoteGenerator />

          {/* Special Surprise Reveal Gift Box */}
          <SurpriseGift />

          {/* Celestial Radiance: "LIGHT UP YOUR HAPPINESS" */}
          <LoveFireworks onPetalSurge={handlePetalSurge} />

          {/* Final Emotional Message & Replayable Grand Celebration */}
          <FinalCelebration onPetalSurge={handlePetalSurge} />

          {/* Floating Persistent Universal Mind-Relaxing Music Controller */}
          <MusicController />
        </div>
      )}
    </div>
  );
}
