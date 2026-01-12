'use client';

import { useEffect, useState } from 'react';
import { getPurchases } from '@/lib/revenuecat';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { PurchasesError, ErrorCode } from '@revenuecat/purchases-js';
import type { Package } from '@revenuecat/purchases-js';

export default function PaywallPage() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  // Demo mode flag - when RevenueCat isn't available
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    async function fetchOfferingsAndUser() {
      const purchases = getPurchases();
      
      if (!purchases) {
        // Enable demo mode to show UI without RevenueCat
        setIsDemoMode(true);
        setIsLoading(false);
        return;
      }

      try {
        // Get user email from Supabase for skipping email collection in Stripe
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          setCustomerEmail(user.email);
        }

        // Fetch offerings - RevenueCat will auto-detect currency based on geolocation
        const offerings = await purchases.getOfferings();
        
        // Try current (default) offering first, then fall back to specific offering
        const currentOffering = offerings.current ?? offerings.all['TrainerAI_Web_Offerrings'];
        
        if (currentOffering && currentOffering.availablePackages.length > 0) {
          setPackages(currentOffering.availablePackages);
        } else {
          setError('No packages available in offering');
        }
        
        setIsLoading(false);
      } catch (e) {
        console.error('Error fetching offerings:', e);
        setError(e instanceof Error ? e.message : 'Error fetching offerings');
        setIsLoading(false);
      }
    }

    fetchOfferingsAndUser();
  }, []);

  // Demo pricing when RevenueCat isn't configured
  const demoMonthlyPrice = 9.99;
  const demoAnnualTotalPrice = 29.49;

  // Extract annual and monthly packages
  const annualPkg = packages.find(p => 
    p.identifier.toLowerCase().includes('annual') || 
    p.identifier.toLowerCase().includes('yearly')
  );
  const monthlyPkg = packages.find(p => 
    p.identifier.toLowerCase().includes('monthly')
  );

  // Get currency symbol from RevenueCat (defaults to $)
  const currencySymbol = monthlyPkg?.rcBillingProduct.currentPrice.currency === 'USD' 
    ? '$' 
    : (monthlyPkg?.rcBillingProduct.currentPrice.currency ?? '$');

  // Calculate prices (use demo values if in demo mode)
  const monthlyPrice = isDemoMode 
    ? demoMonthlyPrice
    : (monthlyPkg?.rcBillingProduct.currentPrice.amountMicros 
      ? monthlyPkg.rcBillingProduct.currentPrice.amountMicros / 1_000_000 
      : 9.99);
  
  const annualTotalPrice = isDemoMode
    ? demoAnnualTotalPrice
    : (annualPkg?.rcBillingProduct.currentPrice.amountMicros 
      ? annualPkg.rcBillingProduct.currentPrice.amountMicros / 1_000_000 
      : 29.49);
  
  const annualMonthlyPrice = annualTotalPrice / 12;
  
  // Calculate savings percentage
  const savingsPercent = monthlyPrice > 0 
    ? Math.round(((monthlyPrice - annualMonthlyPrice) / monthlyPrice) * 100) 
    : 75;

  // Use RevenueCat's formatted price if available (handles currency formatting)
  const getFormattedMonthlyPrice = () => {
    if (isDemoMode) return `$${demoMonthlyPrice.toFixed(2)}`;
    return monthlyPkg?.rcBillingProduct.currentPrice.formattedPrice ?? `$${monthlyPrice.toFixed(2)}`;
  };

  const getFormattedAnnualMonthlyPrice = () => {
    // For annual, we calculate monthly equivalent, so we format it ourselves
    if (isDemoMode) return `$${annualMonthlyPrice.toFixed(2)}`;
    return `${currencySymbol}${annualMonthlyPrice.toFixed(2)}`;
  };

  const handlePurchase = async () => {
    // In demo mode, just redirect to download
    if (isDemoMode) {
      router.push('/download');
      return;
    }

    const purchases = getPurchases();
    const pkg = selectedPlan === 'annual' ? annualPkg : monthlyPkg;
    
    if (!purchases || !pkg) {
      setError('Unable to process purchase');
      return;
    }

    setIsPurchasing(true);
    setError(null);

    try {
      // Pass customerEmail to skip email collection step in Stripe checkout
      const purchaseParams: { rcPackage: Package; customerEmail?: string } = {
        rcPackage: pkg,
      };
      
      if (customerEmail) {
        purchaseParams.customerEmail = customerEmail;
      }

      const { customerInfo } = await purchases.purchase(purchaseParams);
      
      if (Object.keys(customerInfo.entitlements.active).includes('Paid')) {
        console.log('Paid access granted!');
      }
      
      router.push('/download');
    } catch (e) {
      if (e instanceof PurchasesError && e.errorCode === ErrorCode.UserCancelledError) {
        console.log('User cancelled purchase');
      } else {
        console.error('Purchase error:', e);
        setError(e instanceof Error ? e.message : 'Purchase failed');
      }
    } finally {
      setIsPurchasing(false);
    }
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  // Show message if not logged in (RevenueCat not configured)
  if (isDemoMode) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white px-6">
        <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="#9CA3AF"/>
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-black mb-2">Not logged in</h2>
        <p className="text-gray-500 text-center mb-6">Please sign in to continue with your subscription.</p>
        <button
          onClick={() => router.push('/onboarding')}
          className="px-6 py-3 bg-black text-white rounded-full font-semibold"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  if (error && packages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white px-6">
        <p className="text-red-500 text-center mb-4">{error}</p>
        <button
          onClick={() => router.push('/onboarding')}
          className="px-6 py-3 bg-black text-white rounded-full"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Title Section */}
      <div className="shrink-0 pt-6 pb-2 px-6 md:pt-10 md:pb-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-black text-center leading-tight">
          Start your 3-day FREE trial to continue.
        </h1>
      </div>

      {/* Timeline Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-2 min-h-0">
        <div className="relative flex flex-col max-w-sm w-full">
          {/* Gradient Line */}
          <div className="absolute left-[18px] md:left-[22px] top-[18px] md:top-[22px] bottom-[18px] md:bottom-[22px] w-[2px] md:w-[3px] timeline-gradient rounded-full" />
          
          {/* Day 1 */}
          <div className="flex items-start gap-3 mb-2 md:mb-4">
            <div className="relative z-10 w-9 h-9 md:w-11 md:h-11 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="md:w-[18px] md:h-[18px]">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="white" strokeWidth="2"/>
                <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="1.5" fill="white"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-semibold text-black leading-tight">Day 1</h3>
              <p className="text-[11px] md:text-sm text-gray-500 leading-snug">
                Unlock all the app&apos;s features, like the ability to talk your Trainer AI.
              </p>
            </div>
          </div>

          {/* Day 2 */}
          <div className="flex items-start gap-3 mb-2 md:mb-4">
            <div className="relative z-10 w-9 h-9 md:w-11 md:h-11 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="md:w-[18px] md:h-[18px]">
                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-semibold text-black leading-tight">Day 2</h3>
              <p className="text-[11px] md:text-sm text-gray-500 leading-snug">
                Reminder that your trial is ending.
              </p>
            </div>
          </div>

          {/* Day 3 */}
          <div className="flex items-start gap-3">
            <div className="relative z-10 w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#F5C542] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="md:w-[18px] md:h-[18px]">
                <path d="M2 17L4 7L8.5 11L12 4L15.5 11L20 7L22 17H2Z" fill="white"/>
                <path d="M4 20C4 19.4477 4.44772 19 5 19H19C19.5523 19 20 19.4477 20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20Z" fill="white"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-semibold text-black leading-tight">Day 3</h3>
              <p className="text-[11px] md:text-sm text-gray-500 leading-snug">
                You will be charged on this day. You can cancel anytime before.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="shrink-0 h-px bg-gray-200 mx-6" />

      {/* Pricing Cards Section */}
      <div className="shrink-0 px-6 py-3 md:py-4">
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          {/* Annual Card */}
          <button
            onClick={() => setSelectedPlan('annual')}
            className={`relative rounded-xl border-2 p-3 text-left transition-all ${
              selectedPlan === 'annual' 
                ? 'border-gray-300 bg-white' 
                : 'border-gray-200 bg-white'
            }`}
          >
            {/* 3 Days FREE Badge */}
            <div className="absolute -top-2.5 left-3 bg-black text-white text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full">
              3 Days FREE
            </div>
            
            <div className="flex items-start justify-between mt-1">
              <div>
                <p className="font-semibold text-black text-sm">Annual</p>
                <p className="text-sm text-black italic">
                  {getFormattedAnnualMonthlyPrice()} / month
                </p>
                <p className="text-xs font-semibold text-black mt-0.5">
                  Save {savingsPercent}%
                </p>
              </div>
              {/* Selection Indicator */}
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                selectedPlan === 'annual' ? 'bg-purple-500' : 'border-2 border-gray-300'
              }`}>
                {selectedPlan === 'annual' && (
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M11.5 4L5.5 10L2.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          </button>

          {/* Monthly Card */}
          <button
            onClick={() => setSelectedPlan('monthly')}
            className={`relative rounded-xl border-2 p-3 text-left transition-all ${
              selectedPlan === 'monthly' 
                ? 'border-gray-300 bg-white' 
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between mt-1">
              <div>
                <p className="font-semibold text-black text-sm">Monthly</p>
                <p className="text-sm text-black">
                  {getFormattedMonthlyPrice()} / month
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Standard
                </p>
              </div>
              {/* Selection Indicator */}
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                selectedPlan === 'monthly' ? 'bg-purple-500' : 'border-2 border-gray-300'
              }`}>
                {selectedPlan === 'monthly' && (
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M11.5 4L5.5 10L2.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* CTA Button */}
      <div className="shrink-0 px-6 pb-6 md:pb-8">
        <button
          onClick={handlePurchase}
          disabled={isPurchasing}
          className="w-full max-w-sm mx-auto block h-12 md:h-14 rounded-2xl bg-black text-white font-semibold text-sm md:text-base hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPurchasing ? 'Processing...' : 'Get Started'}
        </button>
        
        {error && (
          <p className="text-red-500 text-center text-xs mt-2">{error}</p>
        )}
      </div>

      {/* Purchase Processing Overlay */}
      {isPurchasing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4" />
            <p className="text-black">Processing purchase...</p>
          </div>
        </div>
      )}
    </div>
  );
}
