'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { screens } from '@/lib/screens';
import { infoScreens, surveyQuestions, basicQuestions } from '@/lib/questions';
import { InfoScreen } from '@/components/templates/InfoScreen';
import { QuestionScreen } from '@/components/templates/QuestionScreen';
import { InfographicScreen } from '@/components/templates/InfographicScreen';
import { DummyAuth } from '@/components/screens/DummyAuth';
import { PaywallModal } from '@/components/PaywallModal';
import { SlideTransition } from '@/components/ui/SlideTransition';

// Infographics
import { GuiderGoal } from '@/components/infographics/GuiderGoal';
import { CurrentBodyComposition } from '@/components/infographics/CurrentBodyComposition';
import { IdealBodyComposition } from '@/components/infographics/IdealBodyComposition';
import { NotHardAtAll } from '@/components/infographics/NotHardAtAll';
import { LongTermConsistency } from '@/components/infographics/LongTermConsistency';
import { NinetySixPercent } from '@/components/infographics/NinetySixPercent';
import { FavouriteExcuse } from '@/components/infographics/FavouriteExcuse';
import { GoalChart } from '@/components/infographics/GoalChart';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { t } from '@/lib/i18n';

// Map of infographic components
const infographicComponents: Record<string, React.ComponentType<{ onSelectBody?: (bodyFat: string) => void }>> = {
  GuiderGoal,
  CurrentBodyComposition,
  IdealBodyComposition,
  NotHardAtAll,
  LongTermConsistency,
  NinetySixPercent,
  FavouriteExcuse,
  GoalChart,
};

function ResetHandler() {
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
    }
  }, [searchParams, goToStep, router]);
  
  return null;
}

export default function OnboardingPage() {
  const { state, nextStep, prevStep, setAnswer } = useOnboarding();
  const [showPaywall, setShowPaywall] = useState(false);
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
        
        return (
          <InfoScreen
            title={title}
            subtitle={screenData.subtitle?.[state.language]}
            image={screenData.image}
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

        return (
          <InfographicScreen
            onContinue={handleContinue}
            onBack={prevStep}
          >
            <ComponentToRender 
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
    <>
      <Suspense fallback={null}>
        <ResetHandler />
      </Suspense>
      <SlideTransition stepKey={state.currentStep}>
        {renderScreen()}
      </SlideTransition>
      <PaywallModal
        isOpen={showPaywall}
        onClose={handlePaywallClose}
        onStartTrial={handleStartTrial}
      />
    </>
  );
}

