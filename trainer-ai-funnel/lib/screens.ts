import { ScreenConfig } from './types';
import { surveyQuestions, basicQuestions } from './questions';

// Complete screen flow
export const screens: ScreenConfig[] = [
  // Tutorial (3 screens)
  { id: 'welcome', type: 'info', template: 'InfoScreen' },
  { id: 'tutorial1', type: 'info', template: 'InfoScreen' },
  { id: 'tutorial2', type: 'info', template: 'InfoScreen' },
  
  // Basics (4 screens)
  { id: 'personalize', type: 'infographic', template: 'InfographicScreen' },
  { id: 'basicsStart', type: 'info', template: 'InfoScreen' },
  ...basicQuestions.map(q => ({
    id: q.id,
    type: 'question' as const,
    template: 'QuestionScreen',
  })),

  // Goals (survey questions and infographics)
  ...surveyQuestions
    .filter(q => q.id !== 'personalize')
    .map(q => ({
      id: q.id,
      type: q.type,
      template: q.type === 'question' ? 'QuestionScreen' : 'InfographicScreen',
    })),
  
  // Payment (3 screens)
  { id: 'payment', type: 'info', template: 'InfoScreen' },
  { id: 'notification', type: 'info', template: 'InfoScreen' },

  // Auth (1 screen) - Moved to after paywall
  { id: 'auth', type: 'custom', template: 'DummyAuth' },
];

export const totalScreens = screens.length;

// Helper to get screen by index
export function getScreenAtIndex(index: number): ScreenConfig | undefined {
  return screens[index];
}

// Helper to find screen index by id
export function getScreenIndex(id: string): number {
  return screens.findIndex(s => s.id === id);
}

// Calculate progress for progress bar (0-1)
export function calculateProgress(currentIndex: number): number {
  if (currentIndex <= 0) return 0;
  return currentIndex / (screens.length - 1);
}

