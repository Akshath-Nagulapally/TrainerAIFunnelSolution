'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { Language } from '@/lib/types';

export function LanguageToggle() {
  const { state, setLanguage } = useOnboarding();

  const toggleLanguage = () => {
    const newLang: Language = state.language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
      title={state.language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
    >
      <span className="text-lg">
        {state.language === 'en' ? '🇺🇸' : '🇪🇸'}
      </span>
    </button>
  );
}

