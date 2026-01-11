'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { t } from '@/lib/i18n';

interface FavouriteExcuseProps {
  onSelectBody?: (bodyFat: string) => void;
}

export function FavouriteExcuse({ onSelectBody }: FavouriteExcuseProps) {
  void onSelectBody;
  const { state } = useOnboarding();
  const selectedExcuse = state.answers['excuse'];

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-[22px] font-semibold text-black mb-4">
        {t('favouriteExcuseTitle', state.language)}
      </h1>
      
      <div className="flex-1 flex flex-col justify-center gap-3">
        {selectedExcuse && (
          <div className="bg-[#E5E5E5] rounded-xl p-4">
            <p className="text-base font-semibold text-center italic">
              &quot;{selectedExcuse}&quot;
            </p>
          </div>
        )}
        
        <div className="bg-black text-white rounded-xl p-4">
          <p className="font-semibold text-center text-sm mb-2">
            Sound familiar? 🙈
          </p>
          <p className="text-center text-gray-300 text-xs">
            Trainer AI calls you at your scheduled time, so excuses don&apos;t stand a chance.
          </p>
        </div>

        <div className="bg-[#D4FFF4] rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">📞</span>
            <p className="font-semibold text-sm">AI-Powered Accountability</p>
          </div>
          <p className="text-[#A5A4A4] text-xs">
            Our AI trainer calls you to make sure you show up!
          </p>
        </div>
      </div>
    </div>
  );
}

