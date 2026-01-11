'use client';

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function PrimaryButton({ 
  text, 
  onClick, 
  disabled = false,
  className = ''
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full max-w-md mx-auto h-[60px] rounded-[30px] font-semibold text-lg
        transition-all duration-200 block
        ${disabled 
          ? 'bg-[#A5A4A4] text-white cursor-not-allowed' 
          : 'bg-black text-white hover:bg-gray-800 active:scale-[0.98]'
        }
        ${className}
      `}
    >
      {text}
    </button>
  );
}

