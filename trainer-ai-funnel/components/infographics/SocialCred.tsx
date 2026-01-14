'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface SocialCredProps {
  onLoadingComplete?: () => void;
}

const reviews = [
  {
    id: 1,
    name: 'Sarah M.',
    text: 'Omgggg this actually kept me accountable 😭 been struggling for yeaaars and this is litterally the best investment ever',
    rating: 5,
    initials: 'SM',
    bgColor: 'bg-pink-500',
  },
  {
    id: 2,
    name: 'James K.',
    text: 'ngl i never thought id actually stick with working out but this changed everythign??? like fr fr its crazy',
    rating: 5,
    initials: 'JK',
    bgColor: 'bg-blue-500',
  },
  {
    id: 3,
    name: 'Emma L.',
    text: 'Soooooo the personalization is crazyyy feels like i have an actual trainer lol not a bot. game changer fr',
    rating: 5,
    initials: 'EL',
    bgColor: 'bg-green-500',
  },
];

export function SocialCred({ onLoadingComplete }: SocialCredProps) {
  const [progress, setProgress] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      onLoadingComplete?.();
    }
  }, [progress, onLoadingComplete]);

  useEffect(() => {
    const cardInterval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(cardInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-12 px-4 py-8">
      <h1 className="text-4xl font-bold text-center">
        We are setting up your AI agent for you!
      </h1>
      
      <div className="w-full max-w-xs">
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden border-2 border-green-600">
          <div
            className="bg-green-500 h-full transition-all duration-100 ease-out rounded-full shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="text-lg text-gray-600">{progress}%</p>

      {/* Review Cards */}
      <div className="w-full max-w-sm h-56 relative">
        <div className="relative h-full overflow-hidden">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                index === currentCardIndex
                  ? 'opacity-100 translate-x-0'
                  : index < currentCardIndex
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-full flex flex-col justify-between shadow-md">
                <div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className={`w-10 h-10 rounded-full ${review.bgColor} flex items-center justify-center`}>
                    <p className="text-white font-bold text-sm">
                      {review.initials}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {review.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentCardIndex ? 'bg-black w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
