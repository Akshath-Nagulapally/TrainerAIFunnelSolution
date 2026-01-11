'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { t } from '@/lib/i18n';

interface NotHardAtAllProps {
  onSelectBody?: (bodyFat: string) => void;
}

export function NotHardAtAll({ onSelectBody }: NotHardAtAllProps) {
  void onSelectBody;
  const { state } = useOnboarding();

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-[22px] font-semibold text-black mb-4">
        {t('notHardTitle', state.language)}
      </h1>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-[#D4FFF4] rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">📊</span>
            <div>
              <p className="font-semibold">Small steps = Big results</p>
              <p className="text-sm text-[#A5A4A4]">Consistency over intensity</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-black flex-shrink-0" />
              <p className="font-semibold text-sm">Just 20 minutes, 3x per week</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-black flex-shrink-0" />
              <p className="font-semibold text-sm">No gym required</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-black flex-shrink-0" />
              <p className="font-semibold text-sm">AI adapts to your schedule</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[#A5A4A4] font-semibold text-sm">
          The journey of a thousand miles begins with a single step.
        </p>
      </div>
    </div>
  );
}

