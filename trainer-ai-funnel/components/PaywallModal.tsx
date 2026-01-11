'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { t } from '@/lib/i18n';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrial: () => void;
}

export function PaywallModal({ isOpen, onClose, onStartTrial }: PaywallModalProps) {
  const { state } = useOnboarding();

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
        <div className="text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-[#D4FFF4] rounded-full flex items-center justify-center">
            <span className="text-4xl">🔓</span>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-semibold text-black mb-2">
            {t('paywallTitle', state.language)}
          </h2>
          
          {/* Description */}
          <p className="text-[#A5A4A4] mb-8">
            {t('paywallDescription', state.language)}
          </p>
          
          {/* Features */}
          <div className="space-y-3 mb-8 text-left">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#D4FFF4] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5L2 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-semibold">Daily AI motivation calls</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#D4FFF4] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5L2 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-semibold">Personalized workout schedule</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#D4FFF4] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5L2 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-semibold">Cancel anytime</span>
            </div>
          </div>
          
          {/* Start Trial Button */}
          <button
            onClick={onStartTrial}
            className="w-full h-[56px] rounded-[28px] bg-black text-white font-semibold text-lg hover:bg-gray-800 transition-colors mb-4"
          >
            {t('startFreeTrial', state.language)}
          </button>
          
          {/* Maybe Later */}
          <button
            onClick={onClose}
            className="text-[#A5A4A4] font-semibold hover:text-gray-600 transition-colors"
          >
            {t('maybeLater', state.language)}
          </button>
        </div>
      </div>
    </div>
  );
}

