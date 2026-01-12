'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { t } from '@/lib/i18n';

interface NotHardAtAllProps {
  onSelectBody?: (bodyFat: string) => void;
}

// Sparkle component for the transformation effect
function TransformationSparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top-left sparkle */}
      <svg
        className="absolute -top-3 -left-3 w-3 h-3 animate-sparkle-1"
        viewBox="0 0 24 24"
        fill="black"
      >
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
      
      {/* Top-right sparkle */}
      <svg
        className="absolute -top-2 -right-2 w-2.5 h-2.5 animate-sparkle-2"
        viewBox="0 0 24 24"
        fill="black"
      >
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
      
      {/* Bottom-left sparkle */}
      <svg
        className="absolute -bottom-2 -left-2 w-2 h-2 animate-sparkle-3"
        viewBox="0 0 24 24"
        fill="black"
      >
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
      
      {/* Bottom-right sparkle */}
      <svg
        className="absolute -bottom-3 -right-3 w-2.5 h-2.5 animate-sparkle-4"
        viewBox="0 0 24 24"
        fill="black"
      >
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
    </div>
  );
}

export function NotHardAtAll({ onSelectBody }: NotHardAtAllProps) {
  void onSelectBody;
  const { state } = useOnboarding();
  
  // Get the saved body fat selections
  const currentBodyFat = state.answers['currentBody'] || 'X';
  const idealBodyFat = state.answers['idealBody'] || 'Y';

  return (
    <div className="flex flex-col h-full items-center">
      {/* Title */}
      <h1 className="text-[22px] font-semibold text-black text-center mb-3">
        {t('notHardTitle', state.language)}
      </h1>
      
      {/* Subtitle */}
      <p className="text-[#A5A4A4] font-semibold text-sm text-center mb-8 px-4">
        {t('notHardSubtitle', state.language)}
      </p>
      
      {/* Two boxes with arrow */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-4">
          {/* Left box - Current body fat */}
          <div className="w-[100px] h-[140px] bg-[#E5E5E5] rounded-2xl flex items-center justify-center">
            <span className="text-xl font-semibold text-[#808080]">
              {currentBodyFat}
            </span>
          </div>
          
          {/* Arrow */}
          <svg
            className="w-8 h-8 text-[#808080]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
          
          {/* Right box with sparkles - Ideal body fat */}
          <div className="relative">
            <TransformationSparkles />
            <div className="w-[130px] h-[140px] bg-[#E5E5E5] rounded-2xl flex items-center justify-center">
              <span className="text-xl font-semibold text-[#808080]">
                {idealBodyFat}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add sparkle animations via inline style tag */}
      <style jsx>{`
        @keyframes sparkle-pulse-1 {
          0%, 100% { opacity: 0.3; transform: rotate(0deg); }
          50% { opacity: 0.9; transform: rotate(180deg); }
        }
        @keyframes sparkle-pulse-2 {
          0%, 100% { opacity: 0.5; transform: rotate(0deg); }
          50% { opacity: 0.3; transform: rotate(180deg); }
        }
        @keyframes sparkle-pulse-3 {
          0%, 100% { opacity: 0.7; transform: rotate(0deg); }
          50% { opacity: 0.8; transform: rotate(180deg); }
        }
        @keyframes sparkle-pulse-4 {
          0%, 100% { opacity: 0.4; transform: rotate(0deg); }
          50% { opacity: 0.9; transform: rotate(180deg); }
        }
        :global(.animate-sparkle-1) {
          animation: sparkle-pulse-1 1.5s ease-in-out infinite;
        }
        :global(.animate-sparkle-2) {
          animation: sparkle-pulse-2 1.8s ease-in-out infinite 0.3s;
        }
        :global(.animate-sparkle-3) {
          animation: sparkle-pulse-3 1.6s ease-in-out infinite 0.5s;
        }
        :global(.animate-sparkle-4) {
          animation: sparkle-pulse-4 2s ease-in-out infinite 0.2s;
        }
      `}</style>
    </div>
  );
}

