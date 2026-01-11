'use client';

interface ProgressBarProps {
  progress: number; // 0 to 1
  className?: string;
}

export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  return (
    <div className={`h-2 bg-[#E5E5E5] rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-black rounded-full transition-all duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
      />
    </div>
  );
}

