'use client';

import React from 'react';

interface FlowStep {
  number: number;
  title: string;
  description: string;
  current?: boolean;
}

const steps: FlowStep[] = [
  {
    number: 1,
    title: 'Basics',
    description: 'A bit about yourself.',
  },
  {
    number: 2,
    title: 'Goal',
    description: 'What are you here for?',
    current: true,
  },
  {
    number: 3,
    title: 'Program',
    description: 'Your full personalized program.',
  },
];

interface GuiderGoalProps {
  onSelectBody?: (bodyFat: string) => void;
}

export function GuiderGoal({ onSelectBody }: GuiderGoalProps) {
  void onSelectBody;
  return (
    <div className="flex flex-col justify-center w-full h-full">
      <h1 className="text-4xl font-bold text-black mb-12 text-center">Lets move onto goals.</h1>
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          {/* Step Row */}
          <div className="flex gap-8 items-center w-full">
            {/* Circle */}
            <div className="flex-shrink-0">
              <div
                className={`
                  w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold flex-shrink-0
                  ${
                    step.current
                      ? 'bg-red-500 text-white border-4 border-red-600 shadow-lg'
                      : 'bg-black text-white border-4 border-black'
                  }
                `}
              >
                {step.number}
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center flex-1">
              <h3 className="text-3xl font-bold text-black">
                {step.title}
              </h3>
              <p className="text-lg text-gray-400 leading-snug mt-1">
                {step.description}
              </p>
            </div>
          </div>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div className="flex-shrink-0 ml-12">
              <div className="w-1 h-16 bg-black"></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
