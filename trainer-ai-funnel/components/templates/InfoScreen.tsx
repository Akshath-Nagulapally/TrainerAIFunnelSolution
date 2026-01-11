'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { BackButton } from '@/components/ui/BackButton';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { calculateProgress } from '@/lib/screens';
import Image from 'next/image';

interface InfoScreenProps {
  title: string | string[];
  subtitle?: string;
  image: string;
  buttonText: string;
  onContinue: () => void;
  onBack?: () => void;
  showPaginationDots?: boolean;
  currentPage?: number;
  totalPages?: number;
  showProgressBar?: boolean;
  showBackButton?: boolean;
  extraContent?: React.ReactNode;
  checkmark?: boolean;
  priceInfo?: string;
}

export function InfoScreen({
  title,
  subtitle,
  image,
  buttonText,
  onContinue,
  onBack,
  showPaginationDots = false,
  currentPage = 0,
  totalPages = 3,
  showProgressBar = false,
  showBackButton = false,
  extraContent,
  checkmark = false,
  priceInfo,
}: InfoScreenProps) {
  const { state } = useOnboarding();
  const progress = calculateProgress(state.currentStep);

  const titleArray = Array.isArray(title) ? title : [title];

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-white">
      <div className="flex flex-col h-full w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 pt-4">
        {showBackButton && onBack ? (
          <BackButton onClick={onBack} />
        ) : (
          <div className="w-10" />
        )}
        
        {showProgressBar && (
          <div className="flex-1 mx-4">
            <ProgressBar progress={progress} />
          </div>
        )}
        
        <LanguageToggle />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 overflow-hidden">
        {/* Title */}
        <div className="flex-shrink-0 text-center mb-2">
          {titleArray.map((line, index) => (
            <h1
              key={index}
              className={`text-[28px] leading-tight font-semibold ${
                index === 0 && titleArray.length > 1 ? 'text-[#808080]' : 'text-black'
              }`}
            >
              {line}
            </h1>
          ))}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="flex-shrink-0 text-base font-semibold text-black text-center mb-4">
            {subtitle}
          </p>
        )}

        {/* Image */}
        <div className="flex-1 flex items-center justify-center w-full min-h-0">
          <div className="relative w-full h-full max-w-[280px]">
            <Image
              src={image}
              alt="Demo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Extra content (checkmark, etc.) */}
        {extraContent}

        {/* Checkmark row */}
        {checkmark && (
          <div className="flex-shrink-0 flex items-center gap-3 mt-4">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 4.5L6.75 12.75L3 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-base font-semibold text-black">No Payment Due Now</span>
          </div>
        )}

        {/* Pagination dots */}
        {showPaginationDots && (
          <div className="flex-shrink-0 mt-4">
            <PaginationDots total={totalPages} current={currentPage} />
          </div>
        )}
      </div>

      {/* Bottom section */}
      <div className="flex-shrink-0 px-6 pb-8">
        <PrimaryButton text={buttonText} onClick={onContinue} />
        
        {/* Price info */}
        {priceInfo && (
          <p className="text-center text-[#808080] text-sm mt-3">
            {priceInfo}
          </p>
        )}
      </div>
      </div>
    </div>
  );
}

