'use client';

// import Image from 'next/image';

export default function DownloadPage() {
  /*
  const handleAppStoreClick = () => {
    window.open('https://apps.apple.com/us/app/trainer-ai-workout-motivation/id6752974540', '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#D4FFF4] to-white px-6 relative overflow-hidden">
      <div className="text-center max-w-md mx-auto z-10">
        
        <div className="w-20 h-20 mx-auto mb-5 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce-slow">
          <span className="text-4xl">🎉</span>
        </div>

        
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-3">
          You&apos;re All Set!
        </h1>

        <p className="text-base text-[#666] mb-8">
          Download the app and login with your account.
        </p>

        
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
  */

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-6 text-center">
      <p className="text-xl mb-4 font-medium">
      You will be emailed the link to the app in the next 1-2 business days.
      </p>

      {/* Steps Graphic */}
      <div className="relative max-w-xs mx-auto my-12 w-full">
        {/* Connecting Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-200" />

        {/* Step 1 */}
        <div className="relative flex items-center gap-4 mb-8">
          <div className="z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 border-green-500 bg-green-500 text-white flex items-center justify-center font-bold">
            1
          </div>
          <span className="text-gray-800 font-medium text-left">Personalization and onboarding</span>
        </div>

        {/* Step 2 */}
        <div className="relative flex items-center gap-4 mb-8">
          <div className="z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 border-green-500 bg-green-500 text-white flex items-center justify-center font-bold">
            2
          </div>
          <span className="text-gray-800 font-medium text-left">Account Creation</span>
        </div>

        {/* Step 3 */}
        <div className="relative flex items-center gap-4">
          <div className="z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 border-red-500 bg-white text-red-500 flex items-center justify-center font-bold">
            3
          </div>
          <span className="text-gray-800 font-medium text-left">App Delivery (1-2 days)</span>
        </div>
      </div>

      <p className="text-gray-600">
        Feel free to reach out to our support email: &quot;trainerai30@gmail.com&quot;
      </p>
    </div>
  );
}
