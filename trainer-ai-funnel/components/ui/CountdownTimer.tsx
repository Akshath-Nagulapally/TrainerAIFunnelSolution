'use client';

import { useState, useEffect } from 'react';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(570); // 9 minutes and 30 seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-1">
      <span className="text-white/70 text-sm font-medium mr-1">Offer ends in</span>
      <div className="bg-[#333333] px-2 py-0.5 rounded text-white font-mono text-sm">
        {minutes.toString().padStart(2, '0')}
      </div>
      <span className="text-white">:</span>
      <div className="bg-[#333333] px-2 py-0.5 rounded text-white font-mono text-sm">
        {seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
}
