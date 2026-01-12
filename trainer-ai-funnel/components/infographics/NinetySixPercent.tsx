'use client';

import Image from 'next/image';
import { useState } from 'react';

interface NinetySixPercentProps {
  onSelectBody?: (bodyFat: string) => void;
}

export function NinetySixPercent({ onSelectBody }: NinetySixPercentProps) {
  void onSelectBody;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <h1 className="text-[22px] font-semibold text-black mb-4 flex-shrink-0">
        <span className="text-red-500">*</span>
        96% of attempts fail without structured support.
      </h1>
      
      <div className="flex-1 overflow-y-auto flex justify-center relative">
        {/* Loading spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="w-8 h-8 border-3 border-gray-200 border-t-black rounded-full animate-spin" />
          </div>
        )}
        <Image
          src="ninetysixpercent_reasons_image.png"
          alt="96% of attempts fail - reasons"
          width={300}
          height={450}
          className={`max-w-[280px] h-auto object-contain transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          priority
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
}
