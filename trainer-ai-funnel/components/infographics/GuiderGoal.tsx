'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { t } from '@/lib/i18n';
import Image from 'next/image';
import { useState } from 'react';

interface GuiderGoalProps {
  onSelectBody?: (bodyFat: string) => void;
}

export function GuiderGoal({ onSelectBody }: GuiderGoalProps) {
  void onSelectBody;
  const { state } = useOnboarding();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center h-full">
      <h1 className="text-[28px] font-semibold text-black mb-8">
        {t('moveOnToGoals', state.language)}
      </h1>
      
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="relative w-[280px] h-[280px]">
          {/* Loading spinner */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg z-10">
              <div className="w-8 h-8 border-3 border-gray-200 border-t-black rounded-full animate-spin" />
            </div>
          )}
          <Image
            src="guider_goal.png"
            alt="Goals"
            fill
            className={`object-contain transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}
