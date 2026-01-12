'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { t } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { configureRevenueCat } from '@/lib/revenuecat';

interface DummyAuthProps {
  onContinue: () => void;
}

export function DummyAuth({ onContinue }: DummyAuthProps) {
  const { state } = useOnboarding();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Check if user is already signed in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsSignedIn(true);
        setUserId(user.id);
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const handleContinue = () => {
    // Configure RevenueCat with the user's ID
    if (userId) {
      configureRevenueCat(userId);
    }
    onContinue();
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });
  };

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-white">
      <div className="flex flex-col h-full w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 pt-4">
        <div className="w-10" />
        <LanguageToggle />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        {/* Title */}
        <h1 className="text-[28px] font-semibold text-black text-center mb-8">
          {t('authTitle', state.language)}
        </h1>

        {isCheckingAuth ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
          </div>
        ) : !isSignedIn ? (
          <div className="space-y-4 max-w-md mx-auto w-full">
            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full h-[56px] rounded-[28px] bg-white border-[3px] border-black flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-semibold text-base text-black">
                {isLoading ? 'Redirecting...' : t('signInWithGoogle', state.language)}
              </span>
            </button>

            {/* Apple Sign In */}
            <button
              onClick={handleAppleSignIn}
              disabled={isLoading}
              className="w-full h-[56px] rounded-[28px] bg-black flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="font-semibold text-base text-white">
                {isLoading ? 'Redirecting...' : t('signInWithApple', state.language)}
              </span>
            </button>

          </div>
        ) : (
          /* Success State */
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-green-600 mb-2">
              {t('signInSuccessTitle', state.language)}
            </h2>
            <p className="text-[#A5A4A4] text-center text-sm">
              {t('signInSuccessMessage', state.language)}
            </p>
          </div>
        )}
      </div>

      {/* Continue button */}
      {isSignedIn && !isCheckingAuth && (
        <div className="flex-shrink-0 px-6 pb-8">
          <PrimaryButton
            text={t('continueLabel', state.language)}
            onClick={handleContinue}
          />
        </div>
      )}
      </div>
    </div>
  );
}
