'use client';

import { useOnboarding } from '@/context/OnboardingContext';

interface NinetySixPercentProps {
  onSelectBody?: (bodyFat: string) => void;
}

export function NinetySixPercent({ onSelectBody }: NinetySixPercentProps) {
  void onSelectBody;
  const { state } = useOnboarding();
  void state;

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-[22px] font-semibold text-black mb-1">
        <span className="text-red-500">*</span>
        96% of attempts fail without structured support.
      </h1>
      
      <p className="text-[#A5A4A4] font-semibold text-lg mb-4">Why?</p>
      
      <div className="flex-1 flex flex-col justify-center gap-3">
        <div className="bg-[#D4FFF4] rounded-xl p-3 flex items-center gap-3">
          <span className="text-xl">🎯</span>
          <div>
            <p className="font-semibold text-sm">No clear plan</p>
            <p className="text-xs text-[#A5A4A4]">Without structure, motivation fades</p>
          </div>
        </div>
        
        <div className="bg-[#D4FFF4] rounded-xl p-3 flex items-center gap-3">
          <span className="text-xl">📅</span>
          <div>
            <p className="font-semibold text-sm">No accountability</p>
            <p className="text-xs text-[#A5A4A4]">It&apos;s easy to skip when no one knows</p>
          </div>
        </div>
        
        <div className="bg-[#D4FFF4] rounded-xl p-3 flex items-center gap-3">
          <span className="text-xl">💪</span>
          <div>
            <p className="font-semibold text-sm">No daily motivation</p>
            <p className="text-xs text-[#A5A4A4]">Willpower alone isn&apos;t enough</p>
          </div>
        </div>
      </div>

      <p className="text-[#A5A4A4] text-xs text-center mt-3">
        *96% of attempts fail without structured support.
      </p>
    </div>
  );
}

