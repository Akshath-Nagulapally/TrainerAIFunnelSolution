'use client';

import { useEffect, useState, ReactNode } from 'react';

interface SlideTransitionProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  stepKey: number | string;
}

export function SlideTransition({ 
  children, 
  direction = 'left',
  stepKey 
}: SlideTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [stepKey, children]);

  return (
    <div
      className={`
        transition-all duration-300 ease-out
        ${isVisible 
          ? 'opacity-100 translate-x-0' 
          : direction === 'left' 
            ? 'opacity-0 translate-x-8' 
            : 'opacity-0 -translate-x-8'
        }
      `}
    >
      {displayChildren}
    </div>
  );
}

