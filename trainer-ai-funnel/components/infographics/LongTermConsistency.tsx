'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { useState, useEffect } from 'react';

interface LongTermConsistencyProps {
  onSelectBody?: (bodyFat: string) => void;
}

export function LongTermConsistency({ onSelectBody }: LongTermConsistencyProps) {
  void onSelectBody;

  const { state } = useOnboarding();
  const [animationProgress, setAnimationProgress] = useState(0);

  const isSpanish = state.language === 'es';

  useEffect(() => {
    const timer = setTimeout(() => setAnimationProgress(1), 100);
    return () => clearTimeout(timer);
  }, []);

  const chartHeight = 220;

  return (
    <div className="flex flex-col h-full items-center">
      <div className="w-full max-w-[360px] flex-1 flex flex-col items-center px-4 pt-4">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-[26px] font-semibold text-center mb-3 leading-tight">
            <span className="text-black">
              {isSpanish ? 'Es fácil ir por un día, pero ' : 'Its easy to go for a day, but '}
            </span>
            <span className="text-red-500 underline">
              {isSpanish ? 'difícil mantenerse ' : 'hard to stay '}
            </span>
            <span className="text-black">
              {isSpanish ? 'a largo plazo.' : 'long term.'}
            </span>
          </h1>
          
          <p className="text-[15px] font-semibold text-black text-center">
            {isSpanish 
              ? 'Los investigadores dicen que la probabilidad de que abandones es del 90%!'
              : 'Researchers say, the probability that you quit is 96%!'}
          </p>
        </div>
        
        {/* Chart Section */}
        <div className="w-full flex-1 flex flex-col items-center justify-center bg-white rounded-2xl py-2">
          <p className="text-base font-semibold text-gray-400 text-center mb-10">
            {isSpanish ? 'Tasa de Compromiso con el Gimnasio' : 'Gym Commitment Rate'}
          </p>
          
          {/* Chart Container - This is the centered element */}
          <div className="relative w-[280px]" style={{ height: chartHeight }}>
            {/* Y-axis labels - Absolute positioned to the left */}
            <div 
              className="absolute right-[calc(100%+12px)] inset-y-0 flex flex-col justify-between text-[11px] text-gray-400 text-right py-1"
              style={{ height: chartHeight }}
            >
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-gray-100 w-full" />
              ))}
            </div>
            
            {/* Bars Grid */}
            <div className="absolute inset-0 grid grid-cols-3 items-end gap-6 px-1">
              {/* YouTube Bar */}
              <div className="flex flex-col items-center">
                <span className="text-[12px] font-semibold text-red-500 mb-2">15%</span>
                <div 
                  className="w-full bg-red-500 rounded-t-sm transition-all duration-[1200ms] ease-out"
                  style={{ height: chartHeight * 0.15 * animationProgress }}
                />
              </div>
              
              {/* Coach Bar */}
              <div className="flex flex-col items-center">
                <span className="text-[12px] font-semibold text-blue-500 mb-2">20%</span>
                <div 
                  className="w-full bg-blue-500 rounded-t-sm transition-all duration-[1200ms] ease-out"
                  style={{ height: chartHeight * 0.20 * animationProgress }}
                />
              </div>
              
              {/* Trainer AI Bar */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-0.5 mb-2">
                  <span className="text-[12px] font-semibold text-black">80%</span>
                  <span className="text-[9px] font-bold text-white bg-black px-1.5 py-0.5 rounded leading-none">4x</span>
                </div>
                <div 
                  className="w-full bg-black rounded-t-sm transition-all duration-[1200ms] ease-out"
                  style={{ height: chartHeight * 0.80 * animationProgress }}
                />
              </div>
            </div>

            {/* X-axis labels - Absolute positioned below */}
            <div className="absolute top-[calc(100%+16px)] inset-x-0 grid grid-cols-3 gap-6 px-1">
              <span className="text-[12px] text-gray-500 text-center leading-tight">YouTube</span>
              <span className="text-[12px] text-gray-500 text-center leading-tight">Coach</span>
              <span className="text-[12px] font-bold text-black text-center leading-tight">Trainer AI</span>
            </div>
          </div>
          
          {/* Bottom padding to account for absolute X-axis labels */}
          <div className="h-12" />
        </div>
        
        {/* Footer Section - Positioned at the bottom of the container */}
        <div className="mt-auto pb-4">
          <p className="text-[14px] text-gray-400 text-center leading-relaxed px-2">
            {isSpanish 
              ? 'Nuestro programa previene la "recaída del gimnasio" manteniéndote constante y responsable, de una vez por todas.'
              : 'Our program prevents "gym relapse" by keeping you consistent and accountable, once and for all.'}
          </p>
        </div>
      </div>
    </div>
  );
}
