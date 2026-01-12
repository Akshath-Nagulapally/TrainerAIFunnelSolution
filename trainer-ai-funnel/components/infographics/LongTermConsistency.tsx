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
    // Animate bars on mount
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const chartHeight = 160;

  return (
    <div className="flex flex-col h-full">
      {/* Title with mixed colors */}
      <h1 className="text-[24px] font-semibold text-center mb-3 leading-tight">
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
      
      {/* Subtext */}
      <p className="text-[14px] font-semibold text-black text-center mb-4">
        {isSpanish 
          ? 'Los investigadores dicen que la probabilidad de que abandones es del 90%!'
          : 'Researchers say, the probability that you quit is 96%!'}
      </p>
      
      {/* Consistency Bar Chart */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Chart Title */}
        <p className="text-sm font-semibold text-gray-500 text-center mb-2">
          {isSpanish ? 'Tasa de Compromiso con el Gimnasio' : 'Gym Commitment Rate'}
        </p>
        
        {/* Chart Area */}
        <div className="flex items-end justify-center flex-1 min-h-0">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between text-[10px] text-gray-400 pr-2" style={{ height: chartHeight }}>
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          
          {/* Grid + Bars Container */}
          <div className="relative max-w-[240px] flex-1" style={{ height: chartHeight }}>
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-gray-200 w-full" />
              ))}
            </div>
            
            {/* Bars */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end px-2 h-full">
              {/* YouTube Bar */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-semibold text-red-500 mb-1">15%</span>
                <div 
                  className="w-12 bg-red-500 rounded-t-md transition-all duration-[1200ms] ease-out"
                  style={{ height: chartHeight * 0.15 * animationProgress }}
                />
              </div>
              
              {/* Personal Trainer Bar */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-semibold text-blue-500 mb-1">20%</span>
                <div 
                  className="w-12 bg-blue-500 rounded-t-md transition-all duration-[1200ms] ease-out"
                  style={{ height: chartHeight * 0.20 * animationProgress }}
                />
              </div>
              
              {/* Trainer AI Bar */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[11px] font-semibold text-black">80%</span>
                  <span className="text-[9px] font-bold text-white bg-black px-1 py-0.5 rounded">4x</span>
                </div>
                <div 
                  className="w-12 bg-black rounded-t-md transition-all duration-[1200ms] ease-out"
                  style={{ height: chartHeight * 0.80 * animationProgress }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* X-axis labels */}
        <div className="flex justify-center mt-2" style={{ gap: '24px', paddingLeft: '28px' }}>
          <span className="text-[11px] text-gray-500 w-12 text-center">YouTube</span>
          <span className="text-[11px] text-gray-500 w-12 text-center">Coach</span>
          <span className="text-[11px] font-semibold text-black w-14 text-center whitespace-nowrap">Trainer AI</span>
        </div>
      </div>
      
      {/* Bottom text */}
      <p className="text-[11px] text-gray-400 text-center mt-3 px-2">
        {isSpanish 
          ? 'Nuestro programa previene la "recaída del gimnasio" manteniéndote constante y responsable, de una vez por todas.'
          : 'Our program prevents "gym relapse" by keeping you consistent and accountable, once and for all.'}
      </p>
    </div>
  );
}
