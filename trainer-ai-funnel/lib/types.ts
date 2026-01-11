// Language type
export type Language = 'en' | 'es';

// Screen types
export type ScreenType = 'info' | 'question' | 'infographic' | 'custom';

export interface ScreenConfig {
  id: string;
  type: ScreenType;
  template: string;
}

// Question types
export interface QuestionConfig {
  id: string;
  type: 'question' | 'infographic';
  question?: {
    en: string;
    es: string;
  };
  options?: {
    en: string[];
    es: string[];
  };
  component?: string; // For infographics
}

// Info screen data
export interface InfoScreenData {
  id: string;
  title: {
    en: string | string[];
    es: string | string[];
  };
  subtitle?: {
    en: string;
    es: string;
  };
  image: string;
  buttonText: {
    en: string;
    es: string;
  };
  showPaginationDots?: boolean;
  totalPages?: number;
}

// Onboarding state
export interface OnboardingState {
  currentStep: number;
  language: Language;
  answers: Record<string, string>;
}

// Onboarding context
export interface OnboardingContextType {
  state: OnboardingState;
  setLanguage: (lang: Language) => void;
  setAnswer: (questionId: string, answer: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  totalSteps: number;
}

