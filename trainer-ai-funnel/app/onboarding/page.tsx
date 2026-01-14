'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { screens } from '@/lib/screens';
import { infoScreens, surveyQuestions, basicQuestions } from '@/lib/questions';
import { InfoScreen } from '@/components/templates/InfoScreen';
import { QuestionScreen } from '@/components/templates/QuestionScreen';
import { InfographicScreen } from '@/components/templates/InfographicScreen';
import { DummyAuth } from '@/components/screens/DummyAuth';
import { PaywallModal } from '@/components/PaywallModal';
import { getPurchases, configureRevenueCat } from '@/lib/revenuecat';
import { SlideTransition } from '@/components/ui/SlideTransition';
import { BasicsFlow } from '@/components/BasicsFlow';
import { GoalsFlow } from '@/components/GoalsFlow';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { t } from '@/lib/i18n';
import dynamic from 'next/dynamic';

// Dynamically import infographics
const GuiderGoal = dynamic(() => import('@/components/infographics/GuiderGoal').then(mod => mod.GuiderGoal), { ssr: false });
const PersonalizeAgent = dynamic(() => import('@/components/infographics/PersonalizeAgent').then(mod => mod.PersonalizeAgent), { ssr: false });
const CurrentBodyComposition = dynamic(() => import('@/components/infographics/CurrentBodyComposition').then(mod => mod.CurrentBodyComposition), { ssr: false });
const IdealBodyComposition = dynamic(() => import('@/components/infographics/IdealBodyComposition').then(mod => mod.IdealBodyComposition), { ssr: false });
const NotHardAtAll = dynamic(() => import('@/components/infographics/NotHardAtAll').then(mod => mod.NotHardAtAll), { ssr: false });
const LongTermConsistency = dynamic(() => import('@/components/infographics/LongTermConsistency').then(mod => mod.LongTermConsistency), { ssr: false });
const NinetySixPercent = dynamic(() => import('@/components/infographics/NinetySixPercent').then(mod => mod.NinetySixPercent), { ssr: false });
const FavouriteExcuse = dynamic(() => import('@/components/infographics/FavouriteExcuse').then(mod => mod.FavouriteExcuse), { ssr: false });
const GoalChart = dynamic(() => import('@/components/infographics/GoalChart').then(mod => mod.GoalChart), { ssr: false });
const SocialCred = dynamic(() => import('@/components/infographics/SocialCred').then(mod => mod.SocialCred), { ssr: false });

// Map of infographic components
const infographicComponents: Record<string, React.ComponentType<{ onSelectBody?: (bodyFat: string) => void }>> = {
  GuiderGoal,
  PersonalizeAgent,
  CurrentBodyComposition,
  IdealBodyComposition,
  NotHardAtAll,
  LongTermConsistency,
  NinetySixPercent,
  FavouriteExcuse,
  GoalChart,
  SocialCred,
};

function StepHandler() {
  const { goToStep } = useOnboarding();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    if (searchParams.get('reset') === '1') {
      localStorage.removeItem('onboardingState');
      const stepParam = searchParams.get('step');
      const step = stepParam ? parseInt(stepParam, 10) : 0;
      goToStep(step);
      router.replace('/onboarding');
      return;
    }

    const stepId = searchParams.get('step');
    if (stepId === 'auth') {
      const authIndex = screens.findIndex(s => s.id === 'auth');
      if (authIndex !== -1) {
        goToStep(authIndex);
        // Clear the search param so it doesn't keep resetting
        router.replace('/onboarding');
      }
    }
  }, [searchParams, goToStep, router]);
  
  return null;
}

export default function OnboardingPage() {
  const { state, nextStep, prevStep, setAnswer } = useOnboarding();
  const [showPaywall, setShowPaywall] = useState(false);
  const [socialCredLoading, setSocialCredLoading] = useState(true);
  const router = useRouter();
  
  const currentScreen = screens[state.currentStep];
  
  if (!currentScreen) {
    // End of onboarding - show completion
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
        <div className="text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-semibold text-black mb-4">
            Welcome to Trainer AI!
          </h1>
          <p className="text-[#A5A4A4] text-lg">
            Your fitness journey starts now.
          </p>
        </div>
      </div>
    );
  }

  const handleContinue = () => {
    // Configure RevenueCat at the very first interaction (tutorial stage)
    if (state.currentStep === 0) {
      configureRevenueCat();
    }

    // Check if we're on the notification screen (last screen before paywall)
    if (currentScreen.id === 'notification') {
      router.push('/paywall');
    } else {
      nextStep();
    }
  };

  const handlePaywallClose = () => {
    setShowPaywall(false);
    nextStep(); // Move to completion even if they close
  };

  const handleStartTrial = () => {
    setShowPaywall(false);
    // Redirect to download page on successful payment
    router.push('/download');
  };

  // Determine which page in pagination (for tutorial screens)
  const getTutorialPage = () => {
    if (currentScreen.id === 'welcome') return 0;
    if (currentScreen.id === 'tutorial1') return 1;
    if (currentScreen.id === 'tutorial2') return 2;
    return 0;
  };

  // Render based on screen type
  const renderScreen = () => {
    switch (currentScreen.template) {
      case 'InfoScreen': {
        const screenData = infoScreens[currentScreen.id];
        if (!screenData) {
          // Fallback for missing screen data
          return (
            <div className="flex flex-col items-center justify-center min-h-screen">
              <p>Screen not found: {currentScreen.id}</p>
              <button onClick={nextStep} className="mt-4 px-4 py-2 bg-black text-white rounded">
                Continue
              </button>
            </div>
          );
        }
        
        const title = Array.isArray(screenData.title[state.language]) 
          ? screenData.title[state.language] as string[]
          : screenData.title[state.language] as string;
        
        // Custom content for specific screens
        let customContent: React.ReactNode = undefined;
        if (currentScreen.id === 'basicsStart') {
          customContent = <BasicsFlow />;
        } else if (currentScreen.id === 'guiderGoal') {
          customContent = <GoalsFlow />;
        }
        
        return (
          <InfoScreen
            title={title}
            subtitle={screenData.subtitle?.[state.language]}
            image={currentScreen.id === 'basicsStart' || currentScreen.id === 'guiderGoal' ? undefined : screenData.image}
            customContent={customContent}
            buttonText={screenData.buttonText[state.language]}
            onContinue={handleContinue}
            onBack={state.currentStep > 0 ? prevStep : undefined}
            showPaginationDots={screenData.showPaginationDots}
            currentPage={getTutorialPage()}
            totalPages={screenData.totalPages}
            showProgressBar={!screenData.showPaginationDots && state.currentStep > 2}
            showBackButton={state.currentStep > 0}
            checkmark={currentScreen.id === 'payment'}
            priceInfo={currentScreen.id === 'payment' || currentScreen.id === 'notification' 
              ? t('paymentPriceInfo', state.language) 
              : undefined}
            tryItAudio={screenData.tryItAudio?.[state.language]}
            tryItButtonText={screenData.tryItButtonText?.[state.language]}
            showLoadingAnimation={currentScreen.id === 'demo'}
            loadingDuration={3000}
            priority={state.currentStep === 0}
          />
        );
      }

      case 'QuestionScreen': {
        // Find the question config
        const allQuestions = [...basicQuestions, ...surveyQuestions];
        const questionConfig = allQuestions.find(q => q.id === currentScreen.id);
        
        if (!questionConfig || questionConfig.type !== 'question') {
          return (
            <div className="flex flex-col items-center justify-center min-h-screen">
              <p>Question not found: {currentScreen.id}</p>
              <button onClick={nextStep} className="mt-4 px-4 py-2 bg-black text-white rounded">
                Continue
              </button>
            </div>
          );
        }

        const question = questionConfig.question?.[state.language] || '';
        const options = questionConfig.options?.[state.language] || [];
        const selectedAnswer = state.answers[currentScreen.id] || null;

        return (
          <QuestionScreen
            question={question}
            options={options}
            selectedAnswer={selectedAnswer}
            onSelect={(answer) => setAnswer(currentScreen.id, answer)}
            onContinue={handleContinue}
            onBack={prevStep}
          />
        );
      }

      case 'InfographicScreen': {
        // Find the infographic config
        const infographicConfig = surveyQuestions.find(q => q.id === currentScreen.id);
        const ComponentToRender = infographicConfig?.component 
          ? infographicComponents[infographicConfig.component]
          : null;

        if (!ComponentToRender) {
          return (
            <div className="flex flex-col items-center justify-center min-h-screen">
              <p>Infographic not found: {currentScreen.id}</p>
              <button onClick={nextStep} className="mt-4 px-4 py-2 bg-black text-white rounded">
                Continue
              </button>
            </div>
          );
        }

        const infoScreenData = infoScreens[currentScreen.id];
        
        // Prepare props for PersonalizeAgent
        const componentProps: any = {};
        if (infographicConfig?.component === 'PersonalizeAgent') {
          componentProps.isRevealed = currentScreen.id === 'demo';
        }

        // Track loading state for SocialCred component
        if (infographicConfig?.component === 'SocialCred') {
          componentProps.onLoadingComplete = () => setSocialCredLoading(false);
        }

        // Check if this is a body composition selection screen that needs validation
        const isBodyCompositionScreen = ['currentBody', 'idealBody'].includes(currentScreen.id);
        const hasSelectedBody = state.answers[currentScreen.id];
        const isDisabled = isBodyCompositionScreen && !hasSelectedBody;

        // Disable button for SocialCred until loading is complete
        const isSocialCredDisabled = currentScreen.id === 'socialCred' && socialCredLoading;

        return (
          <InfographicScreen
            onContinue={handleContinue}
            onBack={prevStep}
            buttonText={infoScreenData?.buttonText[state.language] || t('continueLabel', state.language)}
            disabled={isDisabled || isSocialCredDisabled}
          >
            <ComponentToRender 
              {...componentProps}
              onSelectBody={(bodyFat) => setAnswer(currentScreen.id, bodyFat)}
            />
          </InfographicScreen>
        );
      }

      case 'DummyAuth': {
        return <DummyAuth onContinue={handleContinue} />;
      }

      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <p>Unknown template: {currentScreen.template}</p>
            <button onClick={nextStep} className="mt-4 px-4 py-2 bg-black text-white rounded">
              Continue
            </button>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={null}>
        <StepHandler />
      </Suspense>
      <SlideTransition stepKey={state.currentStep}>
        {renderScreen()}
      </SlideTransition>
      <PaywallModal
        isOpen={showPaywall}
        onClose={handlePaywallClose}
        onStartTrial={handleStartTrial}
      />
    </main>
  );
}

