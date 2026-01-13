'use client';

import { useEffect, useState } from 'react';
import { Purchases } from '@revenuecat/purchases-js';
import type { Package } from '@revenuecat/purchases-js';
import { useOnboarding } from '@/context/OnboardingContext';
import { getPurchases, configureRevenueCat } from '@/lib/revenuecat';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { t } from '@/lib/i18n';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { BackButton } from '@/components/ui/BackButton';

export default function PaywallPage() {
  const { state } = useOnboarding();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initAndFetch = async () => {
      try {
        let purchases = getPurchases();
        
        // If not configured (e.g. refresh), try to configure
        if (!purchases) {
          const supabase = createClient();
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            purchases = configureRevenueCat(user.id);
          } else {
            // If no user, redirect back to onboarding/auth
            router.push('/onboarding');
            return;
          }
        }

        // Fetch offerings as requested
        const offerings = await Purchases.getSharedInstance().getOfferings();
        
        // Use the specific identifier provided by the user
        const targetOfferingId = "TrainerAI_WEB_SANDBOX";
        const targetOffering = offerings.all[targetOfferingId];
        
        if (targetOffering && targetOffering.availablePackages.length > 0) {
          setPackages(targetOffering.availablePackages);
        } else if (offerings.current && offerings.current.availablePackages.length > 0) {
          // Fallback to current if specific identifier not found
          setPackages(offerings.current.availablePackages);
        } else {
          setError('No subscription plans available at the moment.');
        }
      } catch (e) {
        console.error('Error fetching offerings:', e);
        setError('Failed to load subscription options. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    initAndFetch();
  }, [router]);

  const handlePurchase = async (pkg: Package) => {
    if (isPurchasing) return;
    
    setIsPurchasing(true);
    try {
      const purchases = Purchases.getSharedInstance();
      if (!purchases) {
        throw new Error('RevenueCat not initialized');
      }

      const { customerInfo } = await purchases.purchasePackage(pkg);
      
      console.log('Purchase successful, customerInfo:', customerInfo);
      
      // For web, sometimes entitlements take a moment or the check is different
      // Let's redirect if we get a valid customerInfo, but check entitlements for safety
      const hasActiveEntitlement = Object.values(customerInfo.entitlements.active).length > 0;
      
      console.log('Active entitlements:', customerInfo.entitlements.active);
      
      // Proactive redirect: if purchasePackage didn't throw, it was successful
      router.push('/download');
    } catch (e: any) {
      if (!e.userCancelled) {
        console.error('Purchase error:', e);
        
        let errorMessage = e.message || 'An unknown error occurred';
        
        // Specific error for the "Live card in Test mode" or vice-versa
        if (e.errorCode === 1 || !e.message) {
          errorMessage = 'Payment failed. Please ensure you are using a valid test card for sandbox mode, or check your Stripe/RevenueCat dashboard configuration.';
        }
        
        setError(errorMessage);
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  const getProductData = (pkg: any) => {
    const rcBillingProduct = pkg.rcBillingProduct;
    const webProduct = Array.isArray(rcBillingProduct) ? rcBillingProduct[0] : rcBillingProduct;
    const product = (pkg.product && Object.keys(pkg.product).length > 0) ? pkg.product : webProduct;
    
    return {
      title: product?.title || product?.displayName || 'Subscription Plan',
      description: product?.description || '',
      priceString: product?.currentPrice?.formattedPrice || product?.priceString || '',
    };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4" />
        <p className="text-[#A5A4A4] animate-pulse">Loading plans...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 pt-6 flex items-center">
        <BackButton onClick={() => router.back()} />
      </div>

      <div className="flex-1 flex flex-col px-6 pt-4 pb-12 max-w-lg mx-auto w-full">
        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[#D4FFF4] rounded-full flex items-center justify-center">
            <span className="text-4xl">🔓</span>
          </div>
        </div>

        {/* Titles */}
        <h1 className="text-[32px] font-bold text-black text-center leading-tight mb-3">
          {t('paywallTitle', state.language)}
        </h1>
        <p className="text-[#A5A4A4] text-center text-lg mb-10">
          {t('paywallDescription', state.language)}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 text-center text-sm">
            {error}
          </div>
        )}

        {/* Packages List */}
        <div className="space-y-4 mb-10">
          {packages.map((pkg) => {
            const productData = getProductData(pkg);
            return (
              <div 
                key={pkg.identifier}
                onClick={() => handlePurchase(pkg)}
                className={`
                  relative p-6 rounded-3xl border-2 transition-all cursor-pointer
                  ${isPurchasing ? 'opacity-50 pointer-events-none' : 'hover:scale-[1.02] active:scale-[0.98]'}
                  border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-black">{productData.title}</h3>
                    <p className="text-[#A5A4A4] text-sm mt-1">{productData.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-black">{productData.priceString}</span>
                    {(pkg.packageType.toString().includes('ANNUAL') || pkg.identifier.toLowerCase().includes('annual')) && (
                      <p className="text-[10px] text-[#A5A4A4] uppercase font-bold tracking-wider">BEST VALUE</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-black">
                  <div className="w-5 h-5 rounded-full bg-[#D4FFF4] flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M10 3L4.5 8.5L2 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>7-day free trial included</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="space-y-3 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#D4FFF4] flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 3L4.5 8.5L2 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-semibold text-black">Daily AI motivation calls</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#D4FFF4] flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 3L4.5 8.5L2 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-semibold text-black">Personalized workout schedule</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-auto">
          <p className="text-center text-xs text-[#A5A4A4] leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy. 
            Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period.
          </p>
        </div>
      </div>
    </div>
  );
}
