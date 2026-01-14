'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { BackButton } from '@/components/ui/BackButton';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { calculateProgress } from '@/lib/screens';
import { t } from '@/lib/i18n';

interface InfographicScreenProps {
  children: React.ReactNode;
  onContinue: () => void;
  onBack?: () => void;
  buttonText?: string;
  disabled?: boolean;
}

export function InfographicScreen({
  children,
  onContinue,
  onBack,
  buttonText,
  disabled = false,
}: InfographicScreenProps) {
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

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-hidden">
        {children}
      </div>

      {/* Continue button */}
      <div className="flex-shrink-0 px-6 pb-8">
        <PrimaryButton
          text={buttonText || t('continueLabel', state.language)}
          onClick={onContinue}
          disabled={disabled}
        />
      </div>
      </div>
    </div>
  );
}

