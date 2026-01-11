'use client';

interface OptionButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export function OptionButton({ text, isSelected, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full min-h-[52px] py-3 px-4 rounded-xl font-semibold text-base
        transition-all duration-200
        ${isSelected 
          ? 'bg-black text-white' 
          : 'bg-[#D4FFF4] text-black hover:bg-[#c0f5e8]'
        }
      `}
    >
      {text}
    </button>
  );
}

