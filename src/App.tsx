import React, { useState, useCallback, Suspense, lazy } from 'react';
import confetti from 'canvas-confetti';
import { OpeningExperience } from './components/OpeningExperience';
import { AtmosphereBackground } from './components/AtmosphereBackground';
import { RosePetalSystem } from './components/RosePetalSystem';
import { HeartCursorTrail } from './components/HeartCursorTrail';
import { Navigation } from './components/Navigation';
import { BirthdayHero } from './components/BirthdayHero';
import { PermanentRoseBouquet } from './components/PermanentRoseBouquet';
import { DiscoveryGuide } from './components/DiscoveryGuide';

// Code splitting: Lazy load below-the-fold components for instant initial loading
const EmotionalStory = lazy(() => import('./components/EmotionalStory').then(m => ({ default: m.EmotionalStory })));
const CelebrationScene = lazy(() => import('./components/CelebrationScene').then(m => ({ default: m.CelebrationScene })));
const BirthdayCake = lazy(() => import('./components/BirthdayCake').then(m => ({ default: m.BirthdayCake })));
const InteractiveLoveButtons = lazy(() => import('./components/InteractiveLoveButtons').then(m => ({ default: m.InteractiveLoveButtons })));
const OrbitingHeart3D = lazy(() => import('./components/OrbitingHeart3D').then(m => ({ default: m.OrbitingHeart3D })));
const LoveLetter = lazy(() => import('./components/LoveLetter').then(m => ({ default: m.LoveLetter })));
const PieceOfMyHeart = lazy(() => import('./components/PieceOfMyHeart').then(m => ({ default: m.PieceOfMyHeart })));
const MessageCapsules = lazy(() => import('./components/MessageCapsules').then(m => ({ default: m.MessageCapsules })));
const SomethingToTellYou = lazy(() => import('./components/SomethingToTellYou').then(m => ({ default: m.SomethingToTellYou })));
const CelebrationClock = lazy(() => import('./components/CelebrationClock').then(m => ({ default: m.CelebrationClock })));
const LoveQuoteGenerator = lazy(() => import('./components/LoveQuoteGenerator').then(m => ({ default: m.LoveQuoteGenerator })));
const SurpriseGift = lazy(() => import('./components/SurpriseGift').then(m => ({ default: m.SurpriseGift })));
const LoveFireworks = lazy(() => import('./components/LoveFireworks').then(m => ({ default: m.LoveFireworks })));
const FinalCelebration = lazy(() => import('./components/FinalCelebration').then(m => ({ default: m.FinalCelebration })));
const HiddenHeartSecret = lazy(() => import('./components/HiddenHeartSecret').then(m => ({ default: m.HiddenHeartSecret })));

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [petalDensity, setPetalDensity] = useState(1);

  const handleEnterWorld = useCallback(() => {
    setHasEntered(true);
  }, []);

  const handlePetalSurge = useCallback(() => {
    setPetalDensity(1.8);
    setTimeout(() => {
      setPetalDensity(1);
    }, 4500);
  }, []);

  const handleCelebrateAction = useCallback(() => {
    handlePetalSurge();
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.3 },
      colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8'],
    });

    const el = document.getElementById('finale');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [handlePetalSurge]);

  const handleDiscover = useCallback(() => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative min-h-screen text-[#FFF4EA] selection:bg-[#E88CA8]/30 selection:text-[#FFF4EA] overflow-x-hidden">
      {/* Multi-Layered Atmosphere Background with Pure CSS Gradients */}
      <AtmosphereBackground />

      {/* Permanent Romantic Rose Bouquet in the background across all sections */}
      <PermanentRoseBouquet />

      {/* Lightweight Glowing Heart Cursor Trail for desktop */}
      <HeartCursorTrail />

      {/* Optimized Realistic Falling Rose Petals (Always Active, Paused on Tab Hide) */}
      <RosePetalSystem densityMultiplier={petalDensity} />

      {/* Cinematic Opening Screen (Until Nafisa enters) */}
      {!hasEntered ? (
        <OpeningExperience onEnter={handleEnterWorld} />
      ) : (
        <div className="relative z-10 transition-opacity duration-700">
          {/* Top Navigation Bar */}
          <Navigation onCelebrateClick={handleCelebrateAction} />

          {/* Main Birthday Hero (Loaded immediately) */}
          <BirthdayHero onDiscover={handleDiscover} />

          {/* Interactive Discovery Guide near the top */}
          <DiscoveryGuide />

          {/* Below-the-fold components with smooth Suspense boundary */}
          <Suspense fallback={<div className="min-h-[120px]" />}>
            {/* Secret Keepsake Button */}
            <HiddenHeartSecret />

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

            {/* PART 2 & PART 5: "A LITTLE PIECE OF MY HEART" */}
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
          </Suspense>
        </div>
      )}
    </div>
  );
}
