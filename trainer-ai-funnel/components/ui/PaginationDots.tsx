'use client';

interface PaginationDotsProps {
  total: number;
  current: number;
}

export function PaginationDots({ total, current }: PaginationDotsProps) {
  return (
    <div className="flex gap-2.5">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`
            w-3 h-3 rounded-full bg-gray-300
            ${index === current ? 'ring-2 ring-black ring-offset-1' : ''}
          `}
        />
      ))}
    </div>
  );
}

