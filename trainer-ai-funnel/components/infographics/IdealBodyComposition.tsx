'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { useState } from 'react';
import Image from 'next/image';

const bodyTypes = [
  { id: '3-4%', label: '3-4%', image: 'threetofour_man.png' },
  { id: '5-7%', label: '5-7%', image: 'fivetoseven_man.png' },
  { id: '8-12%', label: '8-12%', image: 'eighttotwelve_man.jpg' },
  { id: '13-17%', label: '13-17%', image: 'thirteentoseventeen_man.png' },
  { id: '18-23%', label: '18-23%', image: 'eighteentotwentythree_man.png' },
  { id: '24-29%', label: '24-29%', image: 'twentyfourtotwentynine_man.png' },
  { id: '30-34%', label: '30-34%', image: 'thirtytothirtyfour_man.png' },
  { id: '35-39%', label: '35-39%', image: 'thirtyfivetothirtynine_man.png' },
  { id: '40%+', label: '40%+', image: 'fortyplus_man.png' },
];

interface IdealBodyCompositionProps {
  onSelectBody?: (bodyFat: string) => void;
}

export function IdealBodyComposition({ onSelectBody }: IdealBodyCompositionProps) {
  const { state } = useOnboarding();
  const [selected, setSelected] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelectBody?.(id);
  };

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-[20px] font-semibold text-black text-center">
        {state.language === 'en' ? "What's your ideal body fat?" : "¿Cuál es tu grasa corporal ideal?"}
      </h1>
      <p className="text-[#A5A4A4] font-semibold text-xs mb-2 text-center">
        {state.language === 'en' ? "Don't worry about being too precise." : "No te preocupes por ser muy preciso."}
      </p>
      
      {/* 3x3 Grid */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="grid grid-cols-3 gap-x-2 gap-y-0">
          {bodyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className="flex flex-col items-center"
            >
              {/* Image box */}
              <div className={`
                relative w-[60px] h-[60px] rounded-lg border-[2px] overflow-hidden bg-gray-50
                ${selected === type.id ? 'border-black' : 'border-black'}
              `}>
                {/* Loading spinner */}
                {!loadedImages.has(type.id) && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-4 h-4 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
                  </div>
                )}
                <Image
                  src={type.image}
                  alt={type.label}
                  width={60}
                  height={60}
                  className={`w-full h-full object-cover transition-opacity duration-200 ${loadedImages.has(type.id) ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => handleImageLoad(type.id)}
                />
              </div>
              {/* Label tab */}
              <div className={`
                -mt-0.5 px-1 py-0.5 rounded border-[2px] border-black text-[8px] font-semibold
                ${selected === type.id ? 'bg-black text-white' : 'bg-white text-black'}
              `}>
                {type.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
