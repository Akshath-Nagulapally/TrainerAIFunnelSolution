'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { t } from '@/lib/i18n';
import { useState } from 'react';

const bodyTypes = [
  { id: '30%+', label: '30%+', image: '🏋️' },
  { id: '25-30%', label: '25-30%', image: '🏃' },
  { id: '20-25%', label: '20-25%', image: '💪' },
  { id: '15-20%', label: '15-20%', image: '🔥' },
  { id: '10-15%', label: '10-15%', image: '⚡' },
  { id: '<10%', label: '<10%', image: '🏆' },
];

interface CurrentBodyCompositionProps {
  onSelectBody?: (bodyFat: string) => void;
}

export function CurrentBodyComposition({ onSelectBody }: CurrentBodyCompositionProps) {
  const { state } = useOnboarding();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelectBody?.(id);
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-[22px] font-semibold text-black mb-1">
        {t('currentBodyTitle', state.language)}
      </h1>
      <p className="text-[#A5A4A4] font-semibold text-sm mb-4">
        Select your current body fat percentage
      </p>
      
      <div className="flex-1 grid grid-cols-3 gap-3 content-center">
        {bodyTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-xl
              transition-all duration-200
              ${selected === type.id 
                ? 'bg-black text-white' 
                : 'bg-[#D4FFF4] text-black hover:bg-[#c0f5e8]'
              }
            `}
          >
            <span className="text-2xl mb-1">{type.image}</span>
            <span className="font-semibold text-sm">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

