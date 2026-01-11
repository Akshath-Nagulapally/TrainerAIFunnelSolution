'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { t } from '@/lib/i18n';

interface LongTermConsistencyProps {
  onSelectBody?: (bodyFat: string) => void;
}

export function LongTermConsistency({ onSelectBody }: LongTermConsistencyProps) {
  void onSelectBody;
  const { state } = useOnboarding();

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-[20px] font-semibold text-black mb-4">
        {t('longTermTitle', state.language)}
      </h1>
      
      {/* Visual comparison */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        {/* Short term */}
        <div className="bg-red-50 rounded-xl p-3 border-2 border-red-200 flex flex-col">
          <div className="text-center mb-2">
            <span className="text-2xl">😤</span>
          </div>
          <p className="font-semibold text-center text-red-600 text-sm mb-2">Short-term</p>
          <ul className="text-xs text-red-500 space-y-1">
            <li>• Burns out fast</li>
            <li>• Unsustainable</li>
            <li>• Yo-yo effect</li>
          </ul>
        </div>
        
        {/* Long term */}
        <div className="bg-[#D4FFF4] rounded-xl p-3 border-2 border-green-300 flex flex-col">
          <div className="text-center mb-2">
            <span className="text-2xl">😊</span>
          </div>
          <p className="font-semibold text-center text-green-700 text-sm mb-2">Long-term</p>
          <ul className="text-xs text-green-600 space-y-1">
            <li>• Lasting results</li>
            <li>• Builds habits</li>
            <li>• Sustainable</li>
          </ul>
        </div>
      </div>

      <div className="bg-black text-white rounded-xl p-4 mt-4">
        <p className="font-semibold text-center text-sm">
          Trainer AI helps you stay consistent with daily motivation.
        </p>
      </div>
    </div>
  );
}

