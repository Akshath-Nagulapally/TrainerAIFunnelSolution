import { Purchases } from '@revenuecat/purchases-js';

// Your RevenueCat Web Billing Public API Key
// TODO: Replace with your actual API key from RevenueCat dashboard
// Web Billing Public API Key from RevenueCat Dashboard (starts with rcb_)
const WEB_BILLING_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_REVENUECAT_API_KEY || '';

let purchasesInstance: Purchases | null = null;

export function configureRevenueCat(appUserId: string): Purchases {
  if (purchasesInstance) {
    return purchasesInstance;
  }

  purchasesInstance = Purchases.configure(WEB_BILLING_PUBLIC_API_KEY, appUserId);
  
  console.log('RevenueCat configured for user:', appUserId);
  
  return purchasesInstance;
}

export function getPurchases(): Purchases | null {
  return purchasesInstance;
}

