import React from 'react';
import { Signal, BatteryMedium, Sparkles } from 'lucide-react';

interface DiallerScreenProps {
  dialledNumber: string;
  onSetDialledNumber: (num: string) => void;
  onCall: () => void;
  networkName?: string;
  theme?: 'lcd' | 'oled';
}

export const DiallerScreen: React.FC<DiallerScreenProps> = ({
  dialledNumber,
  onSetDialledNumber,
  onCall,
  networkName = 'MTN SA',
  theme = 'lcd'
}) => {
  const currentTime = new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
  const isLcd = theme === 'lcd';

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-3 font-mono select-none relative overflow-hidden screen-scanlines"
      style={{
        backgroundColor: isLcd ? '#a4c79b' : '#090e15',
        color: isLcd ? '#000000' : '#ffffff'
      }}
    >
      {/* Top Status Bar */}
      <div 
        className={`flex items-center justify-between text-[11px] pb-1.5 mb-2 border-b ${
          isLcd ? 'border-[#3f573c] text-[#0a1809]' : 'border-slate-800 text-emerald-400'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <Signal className="w-3.5 h-3.5" />
          <span className="font-black tracking-wide">{networkName}</span>
        </div>
        <span className="text-[10px] font-black tracking-wider">{currentTime}</span>
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-black">4G</span>
          <BatteryMedium className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Main Display Body */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-2">
        <div className={`mb-2 text-[11px] font-black tracking-widest uppercase ${
          isLcd ? 'text-[#1c331a]' : 'text-slate-400'
        }`}>
          Phone Ready
        </div>

        {/* Dialled Digits Display */}
        <div className={`w-full min-h-[54px] rounded-lg px-3 py-2 flex items-center justify-center shadow-md border-2 ${
          isLcd 
            ? 'bg-[#ffffff] border-[#253922]' 
            : 'bg-[#131b26] border-emerald-500/50'
        }`}>
          <span className={`text-2xl font-black font-mono tracking-wider break-all ${
            isLcd ? 'text-[#000000]' : 'text-emerald-400'
          }`}>
            {dialledNumber || <span className={isLcd ? 'text-slate-400' : 'text-slate-600'}>*120*9272#</span>}
          </span>
          <span className={`w-2.5 h-5 ml-1 animate-blink inline-block ${
            isLcd ? 'bg-[#000000]' : 'bg-emerald-400'
          }`} />
        </div>

        {/* Quick Dial Suggestion */}
        <div className="mt-4 flex flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              onSetDialledNumber('*120*9272#');
              onCall();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer shadow-md ${
              isLcd
                ? 'bg-[#183116] hover:bg-[#0c1a0b] text-[#b6f0b0] border-2 border-[#2b4c27]'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Preset: *120*9272# (Zara AI)</span>
          </button>
          <span className={`text-[10px] font-bold mt-1 max-w-[220px] ${
            isLcd ? 'text-[#1a3318]' : 'text-slate-400'
          }`}>
            Press Call button or Enter on keyboard to dial
          </span>
        </div>
      </div>

      {/* Bottom Telecom Helper */}
      <div className={`text-[10px] font-black text-center pt-1 border-t ${
        isLcd ? 'border-[#3f573c] text-[#1c331a]' : 'border-slate-800 text-slate-500'
      }`}>
        ZARA GSM USSD GATEWAY • DEMO SIM
      </div>
    </div>
  );
};
