import React from 'react';
import { Signal, BatteryMedium, Sparkles } from 'lucide-react';

interface DiallerScreenProps {
  dialledNumber: string;
  onSetDialledNumber: (num: string) => void;
  onCall: () => void;
  networkName?: string;
}

export const DiallerScreen: React.FC<DiallerScreenProps> = ({
  dialledNumber,
  onSetDialledNumber,
  onCall,
  networkName = 'MTN SA'
}) => {
  const currentTime = new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#19221b] text-[#c8d6c5] p-3 font-mono select-none relative overflow-hidden screen-scanlines">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between text-[11px] text-[#8ea889] border-b border-[#2d3a2f] pb-1.5 mb-2">
        <div className="flex items-center gap-1.5">
          <Signal className="w-3.5 h-3.5 text-[#8ea889]" />
          <span className="font-semibold tracking-wide">{networkName}</span>
        </div>
        <span className="text-[10px] font-bold tracking-wider">{currentTime}</span>
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-bold text-[#8ea889]">4G</span>
          <BatteryMedium className="w-3.5 h-3.5 text-[#8ea889]" />
        </div>
      </div>

      {/* Main Display Body */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-2">
        <div className="mb-2 text-[10px] tracking-widest uppercase text-[#738a6e]">
          Phone Ready
        </div>

        {/* Dialled Digits Display */}
        <div className="w-full min-h-[52px] bg-[#121a14] rounded-lg border border-[#2b3b2d] px-3 py-2 flex items-center justify-center shadow-inner">
          <span className="text-2xl font-bold font-mono tracking-wider text-[#98e294] break-all">
            {dialledNumber || <span className="text-[#3b523d] opacity-80">*120*9272#</span>}
          </span>
          <span className="w-2.5 h-5 bg-[#98e294] ml-1 animate-blink inline-block" />
        </div>

        {/* Quick Dial Suggestion */}
        <div className="mt-4 flex flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              onSetDialledNumber('*120*9272#');
              onCall();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#233125] hover:bg-[#2e4031] active:scale-95 text-[#a8d9a4] rounded-full text-xs font-semibold border border-[#3b543d] transition-all cursor-pointer shadow"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Preset: *120*9272# (Zara AI)</span>
          </button>
          <span className="text-[10px] text-[#698064] mt-1 max-w-[220px]">
            Press the green Call button or hit Enter on your keyboard to dial
          </span>
        </div>
      </div>

      {/* Bottom Telecom Helper */}
      <div className="text-[10px] text-[#556951] text-center border-t border-[#2d3a2f] pt-1">
        ZARA GSM USSD GATEWAY • DEMO SIM
      </div>
    </div>
  );
};
