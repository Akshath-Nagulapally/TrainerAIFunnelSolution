'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { Language, OnboardingState, OnboardingContextType } from '@/lib/types';
import { screens } from '@/lib/screens';

const initialState: OnboardingState = {
  currentStep: 0,
  language: 'en',
  answers: {},
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OnboardingState>(initialState);

  // Load saved state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('onboardingState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch {
        // Invalid saved state, use default
      }
    }
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    localStorage.setItem('onboardingState', JSON.stringify(state));
  }, [state]);

  const setLanguage = useCallback((lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
  }, []);

  const setAnswer = useCallback((questionId: string, answer: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, screens.length - 1),
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(0, Math.min(step, screens.length - 1)),
    }));
  }, []);

  const value: OnboardingContextType = useMemo(() => ({
    state,
    setLanguage,
    setAnswer,
    nextStep,
    prevStep,
    goToStep,
    totalSteps: screens.length,
  }), [state, setLanguage, setAnswer, nextStep, prevStep, goToStep]);

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}

