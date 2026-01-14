'use client';

import React from 'react';

interface FlowStep {
  number: number;
  title: string;
  description: string;
  completed?: boolean;
}

const steps: FlowStep[] = [
  {
    number: 1,
    title: 'Basics',
    description: 'A bit about yourself.',
    completed: true,
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

export function GoalsFlow() {
  return (
    <div className="flex flex-col justify-center w-full h-full">
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
                    step.completed
                      ? 'bg-black text-white border-4 border-black'
                      : step.number === 2
                      ? 'bg-red-500 text-white border-4 border-red-600 shadow-lg'
                      : 'bg-black text-white border-4 border-black'
                  }
                `}
              >
                {step.completed ? (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step.number
                )}
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
