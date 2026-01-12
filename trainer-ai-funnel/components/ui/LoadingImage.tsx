'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface LoadingImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function LoadingImage({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  priority = false,
  sizes,
}: LoadingImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset isLoaded when src changes
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {/* Spinner overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
          <div className="w-6 h-6 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
        </div>
      )}
      
      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={`${className} transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        priority={priority}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

