'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { useEffect, useState } from 'react';

interface GoalChartProps {
  goalType?: string;
  onSelectBody?: (bodyFat: string) => void;
}

export function GoalChart({ goalType, onSelectBody }: GoalChartProps) {
  void onSelectBody;
  const { state } = useOnboarding();
  const goal = goalType || state.answers['goal'] || 'Maintain';
  
  const [trainerProgress, setTrainerProgress] = useState(0);
  const [traditionalProgress, setTraditionalProgress] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setTrainerProgress(100), 100);
    const timer2 = setTimeout(() => setTraditionalProgress(100), 300);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const trainerPoints = goal.toLowerCase().includes('lose') 
    ? '0,100 50,70 100,50 150,35 200,25 250,10'
    : '0,90 50,75 100,55 150,40 200,25 250,10';
  const traditionalPoints = '0,80 50,55 100,75 150,50 200,70 250,55';

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-[18px] font-semibold text-black mb-3">
        {goal.toLowerCase().includes('lose') ? 'Your Weight' : 
         goal.toLowerCase().includes('gain') ? 'Your Gains' : 'Your Progress'}
      </h1>
      
      {/* Chart */}
      <div className="flex-1 relative bg-gray-50 rounded-xl p-3 min-h-0">
        <svg viewBox="0 0 250 120" className="w-full h-full max-h-[160px]">
          {[0, 25, 50, 75, 100].map((y) => (
            <line key={y} x1="0" y1={y + 10} x2="250" y2={y + 10} stroke="#E5E5E5" strokeDasharray="4,4" />
          ))}
          <polyline points={traditionalPoints} fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 400, strokeDashoffset: 400 - (traditionalProgress * 4), transition: 'stroke-dashoffset 1.5s ease-out' }} />
          <polyline points={trainerPoints} fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 400, strokeDashoffset: 400 - (trainerProgress * 4), transition: 'stroke-dashoffset 1.5s ease-out' }} />
          {trainerProgress === 100 && <circle cx="250" cy="10" r="5" fill="#000000" />}
          {traditionalProgress === 100 && <circle cx="250" cy="55" r="5" fill="#EF4444" />}
        </svg>
        <div className="flex justify-between mt-1 px-1">
          {[1, 2, 3, 4, 5, 6].map((week) => (
            <span key={week} className="text-[10px] text-[#A5A4A4]">W{week}</span>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-[2px] bg-black rounded" />
          <span className="font-semibold text-xs">Trainer.ai</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-[2px] bg-red-500 rounded" />
          <span className="font-semibold text-xs text-red-500">Traditional</span>
        </div>
      </div>
      
      <p className="text-center text-[#A5A4A4] font-semibold text-xs">
        Stop the cycle. Trainer.ai keeps you consistent.
      </p>
    </div>
  );
}

