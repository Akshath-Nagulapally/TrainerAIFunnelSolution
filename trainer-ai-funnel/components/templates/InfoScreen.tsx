'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { BackButton } from '@/components/ui/BackButton';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { calculateProgress } from '@/lib/screens';
import { LoadingImage } from '@/components/ui/LoadingImage';
import { useState, useRef, useEffect } from 'react';

interface InfoScreenProps {
  title: string | string[];
  subtitle?: string;
  image?: string;
  buttonText: string;
  onContinue: () => void;
  onBack?: () => void;
  showPaginationDots?: boolean;
  currentPage?: number;
  totalPages?: number;
  showProgressBar?: boolean;
  showBackButton?: boolean;
  extraContent?: React.ReactNode;
  customContent?: React.ReactNode;
  checkmark?: boolean;
  priceInfo?: string;
  tryItAudio?: string;
  tryItButtonText?: string;
  showLoadingAnimation?: boolean;
  loadingDuration?: number; // in milliseconds
}

export function InfoScreen({
  title,
  subtitle,
  image,
  buttonText,
  onContinue,
  onBack,
  showPaginationDots = false,
  currentPage = 0,
  totalPages = 3,
  showProgressBar = false,
  showBackButton = false,
  extraContent,
  customContent,
  checkmark = false,
  priceInfo,
  tryItAudio,
  tryItButtonText,
  showLoadingAnimation = false,
  loadingDuration = 3000,
}: InfoScreenProps) {
  const { state } = useOnboarding();
  const progress = calculateProgress(state.currentStep);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(showLoadingAnimation);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Loading animation effect
  useEffect(() => {
    if (!showLoadingAnimation) return;
    
    setIsLoading(true);
    setLoadingProgress(0);
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / loadingDuration) * 100, 100);
      setLoadingProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 200);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [showLoadingAnimation, loadingDuration]);

  const handleTryIt = () => {
    if (!tryItAudio) return;
    
    if (isPlaying && audioRef.current) {
      // Stop playing
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      // Start playing
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(tryItAudio);
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onerror = () => setIsPlaying(false);
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  const titleArray = Array.isArray(title) ? title : [title];

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-white">
      <div className="flex flex-col h-full w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 pt-4">
        {showBackButton && onBack ? (
          <BackButton onClick={onBack} />
        ) : (
          <div className="w-10" />
        )}
        
        {showProgressBar && (
          <div className="flex-1 mx-4">
            <ProgressBar progress={progress} />
          </div>
        )}
        
        <LanguageToggle />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 overflow-hidden">
        {isLoading ? (
          /* Loading Animation */
          <div className="flex flex-col items-center justify-center w-full">
            <div className="mb-8">
              <div className="w-20 h-20 relative">
                <svg className="animate-spin" viewBox="0 0 80 80" fill="none">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#E5E7EB"
                    strokeWidth="6"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="226"
                    strokeDashoffset={226 - (226 * loadingProgress) / 100}
                    className="transition-all duration-100"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-black mb-2">Finding Your Match</h2>
            <p className="text-[#808080] text-sm mb-6">Analyzing your responses...</p>
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-100 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-[#808080] text-xs mt-2">{Math.round(loadingProgress)}%</p>
          </div>
        ) : (
          <>
            {/* Title */}
            <div className="flex-shrink-0 text-center mb-2">
              {titleArray.map((line, index) => (
                <h1
                  key={index}
                  className={`text-[28px] leading-tight font-semibold ${
                    index === 0 && titleArray.length > 1 ? 'text-[#808080]' : 'text-black'
                  }`}
                >
                  {line}
                </h1>
              ))}
            </div>

            {/* Subtitle */}
            {subtitle && (
              <p className="flex-shrink-0 text-base font-semibold text-black text-center mb-4">
                {subtitle}
              </p>
            )}

            {/* Image or Custom Content */}
            {image ? (
              <div className="flex-1 flex items-center justify-center w-full min-h-0">
                <div className="relative w-full h-full max-w-[280px]">
                  <LoadingImage
                    src={image}
                    alt="Demo"
                    fill
                    className="object-contain"
                    priority
                  />
                  {/* Try It Button - positioned in center of phone frame */}
                  {tryItAudio && tryItButtonText && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={handleTryIt}
                        className={`
                          flex items-center justify-center gap-2
                          px-8 py-4 rounded-full
                          font-semibold text-lg
                          transition-all duration-300 ease-out
                          transform hover:scale-105 active:scale-95
                          bg-white border-2 border-black text-black
                          hover:bg-gray-50
                        `}
                        style={{ fontFamily: 'var(--font-onest), sans-serif', fontWeight: 600 }}
                      >
                        {isPlaying ? (
                          <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <rect x="6" y="4" width="4" height="16" rx="1" />
                              <rect x="14" y="4" width="4" height="16" rx="1" />
                            </svg>
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                            <span>{tryItButtonText}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : customContent ? (
              <div className="flex-1 flex items-center justify-center w-full min-h-0">
                {customContent}
              </div>
            ) : null}

            {/* Extra content (checkmark, etc.) */}
            {extraContent}

            {/* Checkmark row */}
            {checkmark && (
              <div className="flex-shrink-0 flex items-center gap-3 mt-4">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 4.5L6.75 12.75L3 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-base font-semibold text-black">No Payment Due Now</span>
              </div>
            )}

            {/* Pagination dots */}
            {showPaginationDots && (
              <div className="flex-shrink-0 mt-4">
                <PaginationDots total={totalPages} current={currentPage} />
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom section */}
      <div className="flex-shrink-0 px-6 pb-8">
        <PrimaryButton text={buttonText} onClick={onContinue} />
        
        {/* Price info */}
        {priceInfo && (
          <p className="text-center text-[#808080] text-sm mt-3">
            {priceInfo}
          </p>
        )}
      </div>
      </div>
    </div>
  );
}

