import { Unlock, Bell, Crown } from 'lucide-react';

export function TrialTimeline() {
  return (
    <div className="relative flex flex-col gap-4 max-w-xs mx-auto py-1">
      {/* Vertical Line */}
      <div 
        className="absolute left-[17px] top-[18px] bottom-2 w-[2px] -z-0 rounded-full"
        style={{
          background: 'linear-gradient(to bottom, #B4B4FF 0%, #B4B4FF 66%, #4ADE80 66%, rgba(74, 222, 128, 0) 100%)'
        }}
      />
      
      {/* Day 1 */}
      <div className="relative flex items-center gap-3 z-10">
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-black flex items-center justify-center text-white ring-2 ring-white">
          <Unlock size={18} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-black mb-0.5">Day 1</h3>
          <p className="text-gray-600 text-xs leading-snug">
            Unlock all the app&apos;s features, like the ability to talk your Trainer AI.
          </p>
        </div>
      </div>

      {/* Day 2 */}
      <div className="relative flex items-center gap-3 z-10">
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-black flex items-center justify-center text-white ring-2 ring-white">
          <Bell size={18} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-black mb-0.5">Day 2</h3>
          <p className="text-gray-600 text-xs leading-snug">
            Reminder that your trial is ending.
          </p>
        </div>
      </div>

      {/* Day 3 */}
      <div className="relative flex items-center gap-3 z-10">
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#FFD600] flex items-center justify-center text-white ring-2 ring-white">
          <Crown size={18} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-black mb-0.5">Day 3</h3>
          <p className="text-gray-600 text-xs leading-snug">
            You will be charged on this day. You can cancel anytime before.
          </p>
        </div>
      </div>
    </div>
  );
}
