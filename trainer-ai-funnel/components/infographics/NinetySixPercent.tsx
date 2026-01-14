'use client';

import { useOnboarding } from '@/context/OnboardingContext';

interface NinetySixPercentProps {
  onSelectBody?: (bodyFat: string) => void;
}

// Step item component for the flow diagram
function StepItem({ 
  number, 
  title, 
  isLast,
  titleEn,
  titleEs,
  highlightEn,
  highlightEs,
}: {
  number: number;
  title: string;
  isLast: boolean;
  titleEn: string;
  titleEs: string;
  highlightEn: string;
  highlightEs: string;
}) {
  const { state } = useOnboarding();
  const isSpanish = state.language === 'es';
  const fullTitle = isSpanish ? titleEs : titleEn;
  const highlight = isSpanish ? highlightEs : highlightEn;
  const [beforeHighlight, afterHighlight] = fullTitle.split(highlight);

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Connecting line - goes down from this step to next */}
      {!isLast && (
        <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-1 h-12 bg-black" />
      )}
      
      {/* Step box */}
      <div className="relative z-10 w-full max-w-xs bg-black text-white rounded-3xl px-6 py-4 flex items-center gap-4">
        {/* Number circle */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white text-black font-bold text-lg flex items-center justify-center">
          {number}
        </div>
        
        {/* Title text */}
        <div className="flex-1 text-sm font-semibold leading-tight">
          {beforeHighlight}
          <span className="text-red-500">{highlight}</span>
          {afterHighlight}
        </div>
      </div>
      
      {!isLast && <div className="h-6" />}
    </div>
  );
}

export function NinetySixPercent({ onSelectBody }: NinetySixPercentProps) {
  void onSelectBody;
  const { state } = useOnboarding();
  const isSpanish = state.language === 'es';

  const steps = [
    {
      number: 1,
      titleEn: 'No toolkit to deal with low motivation',
      titleEs: 'Sin herramientas para lidiar con baja motivación',
      highlightEn: 'toolkit',
      highlightEs: 'herramientas',
    },
    {
      number: 2,
      titleEn: 'Soreness creates a constant battle in our minds',
      titleEs: 'El dolor crea una batalla constante en nuestras mentes',
      highlightEn: 'Soreness',
      highlightEs: 'El dolor',
    },
    {
      number: 3,
      titleEn: 'Nobody can fight themselves forever',
      titleEs: 'Nadie puede luchar contra sí mismo para siempre',
      highlightEn: 'Nobody can',
      highlightEs: 'Nadie puede',
    },
    {
      number: 4,
      titleEn: 'One missed day is all it takes to trigger quitting behavior',
      titleEs: 'Un día perdido es todo lo que se necesita para desencadenar el comportamiento de abandono',
      highlightEn: 'One missed day',
      highlightEs: 'Un día perdido',
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <h1 className="text-[22px] font-semibold text-black mb-4 flex-shrink-0">
        <span className="text-red-500">*</span>
        {isSpanish ? '96% de los intentos fracasan sin apoyo estructurado.' : '96% of people quit excersize in days.'}
      </h1>
      
      <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center px-4 py-6">
        <div className="flex flex-col items-center gap-2 w-full">
          {steps.map((step, index) => (
            <StepItem
              key={step.number}
              number={step.number}
              title={isSpanish ? step.titleEs : step.titleEn}
              isLast={index === steps.length - 1}
              titleEn={step.titleEn}
              titleEs={step.titleEs}
              highlightEn={step.highlightEn}
              highlightEs={step.highlightEs}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
