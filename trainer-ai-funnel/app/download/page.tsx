'use client';

import Image from 'next/image';

export default function DownloadPage() {
  const handleAppStoreClick = () => {
    window.open('https://apps.apple.com/us/app/trainer-ai-workout-motivation/id6752974540', '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#D4FFF4] to-white px-6 relative overflow-hidden">
      <div className="text-center max-w-md mx-auto z-10">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-5 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce-slow">
          <span className="text-4xl">🎉</span>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-3">
          You&apos;re All Set!
        </h1>

        <p className="text-base text-[#666] mb-8">
          Download the app and login with your account.
        </p>

        {/* App Store Button */}
        <button
          onClick={handleAppStoreClick}
          className="mx-auto block transition-transform hover:scale-105 active:scale-95 focus:outline-none"
        >
          <Image
            src="onappstore.png"
            alt="Download on the App Store"
            width={180}
            height={54}
            className="rounded-lg"
            priority
          />
        </button>

        {/* Additional Info */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-center gap-2 text-[#666]">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-xs">Set your schedule in the app</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-[#666]">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M17 10a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs">Cancel anytime in app settings</span>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#00D4AA]/10 rounded-full blur-2xl" />
      <div className="absolute bottom-32 right-10 w-32 h-32 bg-[#6C5CE7]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-[#FDCB6E]/20 rounded-full blur-xl" />

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        :global(.animate-bounce-slow) {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
