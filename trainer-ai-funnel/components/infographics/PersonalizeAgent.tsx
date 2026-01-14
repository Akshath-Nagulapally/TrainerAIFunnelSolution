'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { t } from '@/lib/i18n';
import { UserCircle } from 'lucide-react';

interface PersonalizeAgentProps {
  isRevealed?: boolean;
  onSelectBody?: (bodyFat: string) => void;
}

export function PersonalizeAgent({ isRevealed = false }: PersonalizeAgentProps) {
  const { state } = useOnboarding();

  const traits = [
    { label: 'Direction', value: isRevealed ? 85 : '???', progress: 85 },
    { label: 'Drive', value: isRevealed ? 88 : '???', progress: 88 },
    { label: 'Negotiation', value: isRevealed ? 90 : '???', progress: 90 },
    { label: 'Positivity', value: isRevealed ? 87 : '???', progress: 87 },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Text for match screen */}
      {isRevealed ? (
        <>
          <h1 className="text-[32px] font-bold text-black mb-4 text-center leading-tight">
            We found you a match!
          </h1>
          <h2 className="text-[40px] font-extrabold text-black mb-12 text-center">
            Agent #5
          </h2>
        </>
      ) : (
        // Text for personalize screen
        <>
          <h1 className="text-[32px] font-bold text-black mb-4 text-center leading-tight">
            {t('personalizeTitle', state.language) || "Let's personalize your AI Agent"}
          </h1>
          <h2 className="text-[40px] font-extrabold text-black mb-12 text-center">
            Agent #X
          </h2>
        </>
      )}

      {/* Consistent margin for both screens */}
      <div className="relative w-full max-w-[400px] mt-16">
        {/* Box with Border */}
        <div className="bg-white border-[8px] border-black rounded-none pt-28 pb-12 px-12">
          <div className="grid grid-cols-2 gap-x-10 gap-y-10">
            {traits.map((trait) => (
              <div key={trait.label} className="flex flex-col gap-1.5">
                <span className="text-[#B0B0B0] text-xl font-bold leading-none">
                  {trait.label}
                </span>
                <span className="text-black text-3xl font-black leading-none mb-1.5">
                  {trait.value}
                </span>
                {/* Progress Bar */}
                <div className="h-3 w-full bg-[#E5E5E5] rounded-none overflow-hidden">
                  <div 
                    className="h-full bg-[#00E676] rounded-none" 
                    style={{ width: `${trait.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Avatar Circle with Reveal Animation */}
        <div 
          className={`absolute -top-[90px] left-1/2 -translate-x-1/2 w-[180px] h-[180px] rounded-full border-[8px] border-black z-10 overflow-hidden transition-all duration-500 ease-in-out ${
            isRevealed 
              ? 'shadow-lg transform scale-105' 
              : 'shadow-sm bg-[#E6C9A8]'
          }`}
          style={{
            background: isRevealed 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
              : '#E6C9A8'
          }}
        >
          {/* Enhanced Profile Picture Content */}
          {isRevealed ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              {/* Professional User Icon */}
              <div className="w-[100px] h-[100px] rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <UserCircle className="w-[60px] h-[60px] text-white" strokeWidth={1.5} />
              </div>
              {/* Agent Number */}
            </div>
          ) : (
            /* Placeholder for unrevealed state */
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[60px] h-[60px] rounded-full bg-[#D4B996]"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
