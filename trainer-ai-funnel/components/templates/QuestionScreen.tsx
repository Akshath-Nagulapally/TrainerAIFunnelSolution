'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { OptionButton } from '@/components/ui/OptionButton';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { BackButton } from '@/components/ui/BackButton';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { calculateProgress } from '@/lib/screens';
import { t } from '@/lib/i18n';

interface QuestionScreenProps {
  question: string;
  options: string[];
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
  onContinue: () => void;
  onBack?: () => void;
}

export function QuestionScreen({
  question,
  options,
  selectedAnswer,
  onSelect,
  onContinue,
  onBack,
}: QuestionScreenProps) {
  const { state } = useOnboarding();
  const progress = calculateProgress(state.currentStep);

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-white">
      <div className="flex flex-col h-full w-full max-w-lg mx-auto">
      {/* Header with back button and progress bar */}
      <div className="flex-shrink-0 flex items-center gap-4 px-6 pt-4">
        {onBack ? (
          <BackButton onClick={onBack} />
        ) : (
          <div className="w-10" />
        )}
        
        <div className="flex-1">
          <ProgressBar progress={progress} />
        </div>
        
        <LanguageToggle />
      </div>

      {/* Question */}
      <div className="flex-shrink-0 px-6 pt-6">
        <h1 className="text-[24px] font-semibold text-black leading-tight">
          {question}
        </h1>
      </div>

      {/* Options */}
      <div className="flex-1 px-6 pt-6 flex flex-col justify-center min-h-0">
        <div className="flex flex-col gap-3 max-w-md mx-auto w-full">
          {options.map((option) => (
            <OptionButton
              key={option}
              text={option}
              isSelected={selectedAnswer === option}
              onClick={() => onSelect(option)}
            />
          ))}
        </div>
      </div>

      {/* Continue button */}
      <div className="flex-shrink-0 px-6 pb-8">
        <PrimaryButton
          text={t('next', state.language)}
          onClick={onContinue}
          disabled={!selectedAnswer}
        />
      </div>
      </div>
    </div>
  );
}

