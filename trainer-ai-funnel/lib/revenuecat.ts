import { Purchases } from '@revenuecat/purchases-js';

// Your RevenueCat Web Billing Public API Key
// TODO: Replace with your actual API key from RevenueCat dashboard
// Web Billing Public API Key from RevenueCat Dashboard (starts with rcb_)
const IS_SANDBOX = process.env.NODE_ENV === 'development' || true; // Force sandbox for now as requested
const WEB_BILLING_PUBLIC_API_KEY = IS_SANDBOX 
  ? process.env.NEXT_PUBLIC_REVENUECAT_API_KEY_SANDBOX || process.env.NEXT_PUBLIC_REVENUECAT_API_KEY || ''
  : process.env.NEXT_PUBLIC_REVENUECAT_API_KEY || '';

let purchasesInstance: Purchases | null = null;

export function configureRevenueCat(appUserId: string): Purchases {
  if (purchasesInstance) {
    if (purchasesInstance.getAppUserId() === appUserId) {
        return purchasesInstance;
    }
    // If ID changed, we should probably warn or re-configure, but for now let's just re-configure to be safe
    console.warn(`Re-configuring RevenueCat. Old ID: ${purchasesInstance.getAppUserId()}, New ID: ${appUserId}`);
  }

  purchasesInstance = Purchases.configure(WEB_BILLING_PUBLIC_API_KEY, appUserId);
  
  console.log(`RevenueCat configured with user ID: ${appUserId} (${IS_SANDBOX ? 'SANDBOX' : 'LIVE'} mode)`);
  
  return purchasesInstance;
}

export function getPurchases(): Purchases | null {
  return purchasesInstance;
}
