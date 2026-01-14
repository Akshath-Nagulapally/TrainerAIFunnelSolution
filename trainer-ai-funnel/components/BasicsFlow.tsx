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
    current: true,
  },
  {
    number: 2,
    title: 'Goal',
    description: 'What are you here for?',
  },
  {
    number: 3,
    title: 'Program',
    description: 'Your full personalized program.',
  },
];

export function BasicsFlow() {
  return (
    <div className="flex flex-col items-start w-full max-w-md mx-auto px-6">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          {/* Step Row */}
          <div className="flex gap-6 items-start w-full">
            {/* Circle */}
            <div className="flex-shrink-0">
              <div
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0
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
            <div className="flex flex-col justify-center flex-1 pt-2">
              <h3 className="text-2xl font-bold text-black">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 leading-snug">
                {step.description}
              </p>
            </div>
          </div>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div className="flex-shrink-0 ml-8">
              <div className="w-1 h-12 bg-black"></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
