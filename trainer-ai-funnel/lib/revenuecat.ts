import { Purchases } from '@revenuecat/purchases-js';

// Your RevenueCat Web Billing Public API Key
// TODO: Replace with your actual API key from RevenueCat dashboard
// Web Billing Public API Key from RevenueCat Dashboard (starts with rcb_)
const IS_SANDBOX = process.env.NODE_ENV === 'development' || true; // Force sandbox for now as requested
const WEB_BILLING_PUBLIC_API_KEY = IS_SANDBOX 
  ? process.env.NEXT_PUBLIC_REVENUECAT_API_KEY_SANDBOX || process.env.NEXT_PUBLIC_REVENUECAT_API_KEY || ''
  : process.env.NEXT_PUBLIC_REVENUECAT_API_KEY || '';

let purchasesInstance: Purchases | null = null;

const ANON_ID_KEY = 'rc_anon_id';

function getAnonymousId(): string {
  if (typeof window === 'undefined') return 'server_side';
  
  let anonId = localStorage.getItem(ANON_ID_KEY);
  if (!anonId) {
    anonId = `anon_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
    localStorage.setItem(ANON_ID_KEY, anonId);
  }
  return anonId;
}

export function configureRevenueCat(appUserId?: string): Purchases {
  if (purchasesInstance) {
    return purchasesInstance;
  }

  const idToUse = appUserId || getAnonymousId();
  purchasesInstance = Purchases.configure(WEB_BILLING_PUBLIC_API_KEY, idToUse);
  
  console.log(`RevenueCat configured with unique uuid: ${idToUse} (${IS_SANDBOX ? 'SANDBOX' : 'LIVE'} mode)`);
  
  return purchasesInstance;
}

export async function aliasRevenueCat(newUserId: string): Promise<void> {
  const purchases = getPurchases();
  if (!purchases) {
    console.error('Cannot alias: RevenueCat not configured');
    return;
  }

  const currentId = purchases.getAppUserId();
  const isAnonymous = purchases.isAnonymous();
  
  // Only alias if the current ID is anonymous and different from the new one
  if (isAnonymous && currentId !== newUserId) {
    try {
      console.log(`Attempting UUID Swap: ${currentId} -> ${newUserId}`);
      // identifyUser creates an alias if the current user is anonymous
      await purchases.identifyUser(newUserId);
      console.log(`UUID Swap successful, the user is now: ${newUserId} instead of their original user id ${currentId}`);
      // Cleanup anon ID from storage after successful merge
      localStorage.removeItem(ANON_ID_KEY);
    } catch (e) {
      console.error('Error during UUID Swap:', e);
    }
  } else {
    console.log(`No swap needed. Current ID: ${currentId}, New ID: ${newUserId}, IsAnonymous: ${isAnonymous}`);
  }
}

export function getPurchases(): Purchases | null {
  return purchasesInstance;
}

