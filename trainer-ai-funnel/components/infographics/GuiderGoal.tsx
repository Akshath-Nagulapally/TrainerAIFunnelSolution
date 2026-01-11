'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { t } from '@/lib/i18n';
import Image from 'next/image';

interface GuiderGoalProps {
  onSelectBody?: (bodyFat: string) => void;
}

export function GuiderGoal({ onSelectBody }: GuiderGoalProps) {
  void onSelectBody;
  const { state } = useOnboarding();

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-[28px] font-semibold text-black mb-8">
        {t('moveOnToGoals', state.language)}
      </h1>
      
      <div className="flex-1 flex items-start">
        <div className="relative w-[280px] h-[280px]">
          <Image
            src="/images/guider_goal.svg"
            alt="Goals"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

