'use client';

import { useEffect, useState, useMemo } from 'react';
import { Purchases } from '@revenuecat/purchases-js';
import type { Package } from '@revenuecat/purchases-js';
import { useOnboarding } from '@/context/OnboardingContext';
import { getPurchases, configureRevenueCat } from '@/lib/revenuecat';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { t } from '@/lib/i18n';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { BackButton } from '@/components/ui/BackButton';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { LoadingImage } from '@/components/ui/LoadingImage';

export default function PaywallPage() {
  const { state } = useOnboarding();
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initAndFetch = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          // If not authenticated, redirect to onboarding start (or auth step if we could target it)
          console.log('User not authenticated on paywall. Redirecting to onboarding.');
          router.push('/onboarding');
          return;
        }

        let purchases = getPurchases();
        
        // Always configure with the authenticated user ID
        purchases = configureRevenueCat(user.id);

        const offerings = await Purchases.getSharedInstance().getOfferings();
        
        // In Live mode, we should look for "TrainerAI_Web_Offerrings" or the current offering if specific ID isn't found
        const targetOfferingId = process.env.NEXT_PUBLIC_MODE === 'SANDBOX' ? "TrainerAI_WEB_SANDBOX" : "TrainerAI_Web_Offerrings";
        const targetOffering = offerings.all[targetOfferingId] || offerings.current;
        
        let availablePackages: Package[] = [];
        if (targetOffering && targetOffering.availablePackages.length > 0) {
          availablePackages = targetOffering.availablePackages;
        } else if (offerings.current && offerings.current.availablePackages.length > 0) {
          availablePackages = offerings.current.availablePackages;
        }

        console.log('RevenueCat Offerings:', {
          mode: process.env.NEXT_PUBLIC_MODE,
          targetId: targetOfferingId,
          foundTarget: !!offerings.all[targetOfferingId],
          current: !!offerings.current,
          packages: availablePackages.length
        });

        if (availablePackages.length > 0) {
          // Sort packages: Monthly first, then Annual/Yearly
          const sorted = [...availablePackages].sort((a, b) => {
            const aType = a.packageType.toString().toLowerCase();
            const bType = b.packageType.toString().toLowerCase();
            if (aType.includes('monthly')) return -1;
            if (bType.includes('monthly')) return 1;
            return 0;
          });
          setPackages(sorted);
          
          // Select Annual/Yearly by default
          const annual = sorted.find(p => p.packageType.toString().toLowerCase().includes('annual') || p.identifier.toLowerCase().includes('annual'));
          setSelectedPackage(annual || sorted[sorted.length - 1]);
        } else {
          console.warn('No packages found in offerings');
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

  // Handle initialization/fetch errors or empty packages
  if (error || (!loading && packages.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-500 mb-6">{error || 'No subscription plans available.'}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-black text-white rounded-full font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  const handlePurchase = async () => {
    if (!selectedPackage || isPurchasing) {
      return;
    }
    
    setIsPurchasing(true);
    try {
      const purchases = Purchases.getSharedInstance();
      if (!purchases) {
        throw new Error('RevenueCat not initialized');
      }

      const { customerInfo } = await purchases.purchasePackage(selectedPackage);
      console.log('Purchase successful! Updating user profile and redirecting to download...');
      
      // Update user profile to set is_onboarded = true
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ is_onboarded: true })
          .eq('id', user.id);

        if (updateError) {
          console.error('Error updating user onboarding status:', updateError);
          // We continue to redirect even if profile update fails, as the purchase was successful
        } else {
          console.log('User onboarding status updated successfully.');
        }
      } else {
        console.error('No authenticated user found during purchase processing');
      }

      router.push('/download');
    } catch (e: any) {
      if (!e.userCancelled) {
        if (e.message?.includes('This product is already active for the user')) {
          router.push('/download');
          return;
        }
        setError(e.message || 'Purchase failed');
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  const getPackageInfo = (pkg: any) => {
    const rcBillingProduct = pkg.rcBillingProduct;
    const webProduct = Array.isArray(rcBillingProduct) ? rcBillingProduct[0] : rcBillingProduct;
    const product = (pkg.product && Object.keys(pkg.product).length > 0) ? pkg.product : webProduct;
    
    const formattedPrice = product?.currentPrice?.formattedPrice || '';
    const price = parseFloat(formattedPrice.replace(/[^0-9.]/g, '')) || product?.currentPrice?.price || 0;
    const isAnnual = pkg.packageType.toString().toLowerCase().includes('annual') || pkg.identifier.toLowerCase().includes('annual');
    
    const dailyPrice = isAnnual ? (price / 365) : (price / 31);
    const originalPrice = isAnnual ? (price / 0.25) : null; // Annual price is 25% of original (75% off)

    return {
      title: isAnnual ? 'Yearly' : 'Monthly',
      subtitle: isAnnual ? '- 3 day free trial' : '',
      price: formattedPrice,
      originalPrice: originalPrice ? new Intl.NumberFormat('en-US', { style: 'currency', currency: product?.currentPrice?.currency || 'USD' }).format(originalPrice) : null,
      dailyPriceParts: {
        whole: Math.floor(dailyPrice).toString(),
        decimal: Math.round((dailyPrice % 1) * 100).toString().padStart(2, '0')
      },
      isAnnual
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
    <div className="flex flex-col h-screen bg-white font-sans text-black overflow-hidden">
      {/* Header with Logo */}
      <div className="px-6 py-4 flex flex-col items-center overflow-y-auto flex-1 pb-32">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold tracking-tight">Trainer AI</span>
        </div>
        
        {/* Promo Bar */}
        <div className="w-full max-w-md bg-[#111111] rounded-sm py-2 px-4 flex justify-between items-center mb-8">
          <span className="text-[#A5A4FF] font-bold">75% off!</span>
          <CountdownTimer />
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">
          Your personal plan is ready!
        </h1>

        {/* Tutorial 2/2 Image */}
        {/* className="relative w-full h-[420px] mb-12 mx-auto">*/}
        <div className="relative w-full h-full"> 
          <LoadingImage 
            src="demo_2.png" 
            alt="Tutorial 2/2" 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Pricing Options */}
        <div className="w-full max-w-md space-y-4 mb-4">
          {packages.map((pkg) => {
            const info = getPackageInfo(pkg);
            const isSelected = selectedPackage?.identifier === pkg.identifier;
            
            return (
              <div 
                key={pkg.identifier}
                onClick={() => setSelectedPackage(pkg)}
                className={`relative cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'ring-2 ring-black rounded-3xl' 
                    : 'border border-gray-200 rounded-3xl'
                }`}
              >
                {info.isAnnual && (
                  <>
                    <div className="absolute -top-3 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">
                      3 DAYS FREE
                    </div>
                    <div className="absolute -top-3 right-6 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">
                      SAVE 75%
                    </div>
                  </>
                )}
                
                <div className={`flex items-center justify-between p-5 rounded-3xl ${isSelected ? 'bg-white' : 'bg-white'}`}>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-bold">{info.title}</span>
                      <span className="text-gray-400 text-sm font-medium">{info.subtitle}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {info.originalPrice && (
                        <span className="text-gray-400 line-through font-medium">{info.originalPrice}</span>
                      )}
                      <span className="text-xl font-bold">{info.price}</span>
                    </div>
                  </div>

                  <div className="bg-[#FFF5F0] rounded-2xl px-4 py-2 flex flex-col items-center min-w-[100px]">
                     <div className="flex items-baseline">
                       <span className="text-3xl font-bold">${info.dailyPriceParts.whole}</span>
                       <div className="flex flex-col ml-0.5">
                         <span className="text-sm font-bold leading-none">{info.dailyPriceParts.decimal}</span>
                         <span className="text-[10px] text-gray-500 font-medium">per day</span>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-gray-400 mb-8 max-w-xs">
          Trainer AI will auto-charge {getPackageInfo(selectedPackage || packages[0]).price}/{selectedPackage?.packageType.toString().toLowerCase().includes('annual') ? 'year' : 'month'} unless you cancel on trainerai.app
        </p>
      </div>

      {/* Sticky Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-center z-50">
        <button
          onClick={handlePurchase}
          disabled={isPurchasing}
          className={`w-full max-w-md h-16 bg-black text-white rounded-full font-bold text-xl transition-transform active:scale-95 ${
            isPurchasing ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isPurchasing ? 'Processing...' : 'Get my plan'}
        </button>
      </div>
    </div>
  );
}

