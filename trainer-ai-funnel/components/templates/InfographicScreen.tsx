'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { BackButton } from '@/components/ui/BackButton';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { t } from '@/lib/i18n';

interface InfographicScreenProps {
  children: React.ReactNode;
  onContinue: () => void;
  onBack?: () => void;
  buttonText?: string;
}

export function InfographicScreen({
  children,
  onContinue,
  onBack,
  buttonText,
}: InfographicScreenProps) {
  const { state } = useOnboarding();

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-white">
      <div className="flex flex-col h-full w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 pt-4">
        {onBack ? (
          <BackButton onClick={onBack} />
        ) : (
          <div className="w-10" />
        )}
        
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
        />
      </div>
      </div>
    </div>
  );
}

