'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { t } from '@/lib/i18n';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface FavouriteExcuseProps {
  onSelectBody?: (bodyFat: string) => void;
}

// Map excuse to audio file name
function mapExcuseToAudioFile(excuse: string, language: 'en' | 'es'): string {
  const languageSuffix = language === 'es' ? '_spanish' : '_english';
  const excuseLower = excuse.trim().toLowerCase();
  
  let baseName: string;
  switch (excuseLower) {
    case "i'll do it in 5 minutes":
    case "lo haré en 5 minutos":
      baseName = 'fiveminutes';
      break;
    case "i'll do it tomorrow":
    case "lo haré mañana":
      baseName = 'tomorrow';
      break;
    case "i'm too sore today":
    case "estoy muy adolorido hoy":
      baseName = 'sore';
      break;
    case 'after this test next week':
    case 'después del examen de la próxima semana':
      baseName = 'testtomorrow';
      break;
    default:
      baseName = 'demo';
  }
  
  return `/audio/${baseName}${languageSuffix}.wav`;
}

// Sparkles decoration component
function SparklesDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ width: '150px', height: '150px', left: '-35px', top: '-35px' }}>
      {/* Top left sparkle */}
      <div className="absolute top-[20%] left-[10%] animate-pulse">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" 
                fill="#FFD700" stroke="#FFD700" strokeWidth="1"/>
        </svg>
      </div>
      {/* Top right sparkle */}
      <div className="absolute top-[15%] right-[10%] animate-pulse" style={{ animationDelay: '0.3s' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" 
                fill="#FFD700" stroke="#FFD700" strokeWidth="1"/>
        </svg>
      </div>
      {/* Bottom left sparkle */}
      <div className="absolute bottom-[20%] left-[5%] animate-pulse" style={{ animationDelay: '0.6s' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" 
                fill="#FFD700" stroke="#FFD700" strokeWidth="1"/>
        </svg>
      </div>
      {/* Bottom right sparkle */}
      <div className="absolute bottom-[15%] right-[5%] animate-pulse" style={{ animationDelay: '0.9s' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" 
                fill="#FFD700" stroke="#FFD700" strokeWidth="1"/>
        </svg>
      </div>
    </div>
  );
}

// Animated bars visualizer component
function AnimatedBarsVisualizer() {
  return (
    <>
      <style>{`
        @keyframes soundbar {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
      `}</style>
      <div className="flex items-center justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 bg-black rounded-full"
            style={{
              animation: 'soundbar 0.8s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
              height: '28px',
            }}
          />
        ))}
      </div>
    </>
  );
}

export function FavouriteExcuse({ onSelectBody }: FavouriteExcuseProps) {
  void onSelectBody;
  const { state } = useOnboarding();
  const selectedExcuse = state.answers['excuse'] || '';
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTryButton, setShowTryButton] = useState(true);
  const [buttonScale, setButtonScale] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Pulse animation for button
  useEffect(() => {
    if (!showTryButton || isPlaying) return;
    
    const interval = setInterval(() => {
      setButtonScale(prev => prev === 1 ? 1.05 : 1);
    }, 750);
    
    return () => clearInterval(interval);
  }, [showTryButton, isPlaying]);

  const handleTryIt = () => {
    if (!selectedExcuse) return;
    
    setShowTryButton(false);
    
    const audioFile = mapExcuseToAudioFile(selectedExcuse, state.language);
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    audioRef.current = new Audio(audioFile);
    audioRef.current.onended = () => {
      setIsPlaying(false);
      setShowTryButton(true);
    };
    audioRef.current.onerror = () => {
      setIsPlaying(false);
      setShowTryButton(true);
    };
    audioRef.current.play().catch(() => {
      setIsPlaying(false);
      setShowTryButton(true);
    });
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Title section */}
      <div className="text-left mb-4">
        <p className="text-[22px] font-semibold text-black">
          {t('youLabel', state.language)}: {selectedExcuse}
        </p>
        <p className="text-[22px] font-semibold text-black">
          {t('trainerAILabel', state.language)}:
        </p>
      </div>
      
      {/* iPhone frame with Try it button or visualizer */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-0">
        <div className="relative w-full max-w-[200px] aspect-[9/19]">
          {/* Loading spinner */}
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-3xl z-20">
              <div className="w-8 h-8 border-3 border-gray-200 border-t-black rounded-full animate-spin" />
            </div>
          )}
          {/* iPhone frame image */}
          <Image
            src="iphone-frame.svg"
            alt="Phone"
            fill
            className={`object-contain transition-opacity duration-200 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            priority
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Overlay content - Try it button or visualizer */}
          <div className="absolute inset-0 flex items-center justify-center">
            {showTryButton && !isPlaying ? (
              <div className="relative">
                {/* Sparkles decoration */}
                <SparklesDecoration />
                
                {/* Try it button */}
                <button
                  onClick={handleTryIt}
                  className="relative z-10 px-6 py-3 bg-white border-[5px] border-black rounded-2xl 
                             font-semibold text-base text-black
                             hover:scale-105 active:scale-95"
                  style={{
                    transform: `scale(${buttonScale})`,
                    transition: 'transform 0.75s ease-in-out',
                  }}
                >
                  {t('tryIt', state.language)}
                </button>
              </div>
            ) : isPlaying ? (
              <AnimatedBarsVisualizer />
            ) : null}
          </div>
        </div>
      </div>
      
      {/* Demo disclaimer */}
      <p className="text-center text-sm font-semibold text-black mt-4">
        {t('demoDisclaimer', state.language)}
      </p>
    </div>
  );
}
