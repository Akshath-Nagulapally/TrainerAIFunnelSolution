'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { useState } from 'react';
import { TrialTimeline } from '@/components/ui/TrialTimeline';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrial: () => void;
}

const MONTHLY_PRICE = 9.99;
const YEARLY_PRICE = 29.99;

export function PaywallModal({ isOpen, onClose, onStartTrial }: PaywallModalProps) {
  const { state } = useOnboarding();
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  const monthlyDaily = (MONTHLY_PRICE / 30).toFixed(2);
  const yearlyDaily = (YEARLY_PRICE / 365).toFixed(2);
  const yearlyOriginalPrice = (YEARLY_PRICE * 12).toFixed(2);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl p-8 mx-6 max-w-sm w-full shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        {/* Content */}
        <div className="space-y-4">
          {/* Trial Timeline */}
          <div className="w-full mb-4">
            <TrialTimeline />
          </div>

          {/* Monthly Plan */}
          <button
            onClick={() => setSelectedPlan('monthly')}
            className={`w-full rounded-2xl border p-5 transition-all duration-300 transform ${
              selectedPlan === 'monthly'
                ? 'border-black scale-100 bg-white'
                : 'border-gray-200 scale-95 opacity-60 hover:scale-97 bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-gray-600 text-sm mb-1">Monthly</p>
                <p className="text-3xl font-bold text-black">${MONTHLY_PRICE.toFixed(2)}</p>
              </div>
              <div className="text-right bg-orange-50 px-4 py-2 rounded-lg">
                <p className="text-2xl font-bold text-black">${monthlyDaily}</p>
                <p className="text-xs text-gray-600">per day</p>
              </div>
            </div>
          </button>

          {/* Yearly Plan */}
          <button
            onClick={() => setSelectedPlan('yearly')}
            className={`relative transition-all duration-300 transform ${
              selectedPlan === 'yearly'
                ? 'scale-100'
                : 'scale-95'
            }`}
          >
            {/* Top badges */}
            {selectedPlan === 'yearly' && (
              <div className="absolute -top-4 left-0 right-0 flex justify-between px-4 pointer-events-none">
                <div className="bg-black rounded-full px-4 py-2 text-white text-xs font-bold animate-in fade-in duration-300">
                  3 DAYS FREE
                </div>
                <div className="bg-black rounded-full px-4 py-2 text-white text-xs font-bold animate-in fade-in duration-300">
                  SAVE 75%
                </div>
              </div>
            )}

            {/* Main card */}
            <div className={`border-4 rounded-3xl p-6 bg-white transition-all duration-300 ${
              selectedPlan === 'yearly'
                ? 'border-black'
                : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-bold text-black">Yearly</span> - 3 day free trial
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm text-gray-400 line-through">${yearlyOriginalPrice}</span>
                    <p className="text-3xl font-bold text-black">${YEARLY_PRICE.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-right bg-orange-50 px-4 py-2 rounded-lg">
                  <p className="text-2xl font-bold text-black">${yearlyDaily}</p>
                  <p className="text-xs text-gray-600">per day</p>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Auto-charge notice */}
        <p className="text-center text-sm text-gray-500 my-6">
          Trainer AI will auto-charge <span className="font-semibold">${YEARLY_PRICE.toFixed(2)}/year</span><br />
          unless you cancel on trainer-ai.app
        </p>
        
        {/* Start Trial Button */}
        <button
          onClick={onStartTrial}
          className="w-full h-[56px] rounded-[28px] bg-black text-white font-bold text-lg hover:bg-gray-900 transition-colors mb-3"
        >
          Start Free Trial
        </button>
        
        {/* Maybe Later */}
        <button
          onClick={onClose}
          className="w-full text-gray-500 font-semibold hover:text-gray-600 transition-colors py-2"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}

