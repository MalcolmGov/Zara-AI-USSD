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

        {/* Quick Dial Presets Grid */}
        <div className="mt-2 flex flex-col items-center gap-1 w-full px-1">
          <div className={`text-[9px] font-black uppercase tracking-wider mb-0.5 ${
            isLcd ? 'text-[#142612]' : 'text-slate-400'
          }`}>
            Quick Gateway Presets:
          </div>

          <div className="grid grid-cols-2 gap-1 w-full">
            <button
              type="button"
              onClick={() => {
                onSetDialledNumber('*120*9272#');
                onCall();
              }}
              className={`flex items-center gap-1 px-2 py-1.5 rounded text-[10px] font-black cursor-pointer truncate shadow-sm ${
                isLcd ? 'bg-[#183116] text-[#b6f0b0] border border-[#2b4c27]' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              <Sparkles className="w-2.5 h-2.5 shrink-0 text-emerald-400" />
              <span className="truncate">Zara Open</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSetDialledNumber('*120*321#');
                onCall();
              }}
              className={`flex items-center gap-1 px-2 py-1.5 rounded text-[10px] font-black cursor-pointer truncate shadow-sm ${
                isLcd ? 'bg-[#1f2d3d] text-[#a5c8ed] border border-[#3b526d]' : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              }`}
            >
              <span className="text-[8px] px-1 bg-blue-600 text-white rounded font-bold">A</span>
              <span className="truncate">Apex Bank</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSetDialledNumber('*120*7727#');
                onCall();
              }}
              className={`flex items-center gap-1 px-2 py-1.5 rounded text-[10px] font-black cursor-pointer truncate shadow-sm ${
                isLcd ? 'bg-[#3b2a1a] text-[#f2c99d] border border-[#63482d]' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              <span className="text-[8px] px-1 bg-amber-600 text-white rounded font-bold">B</span>
              <span className="truncate">Kazang VAS</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSetDialledNumber('*120*9272*1#');
                onCall();
              }}
              className={`flex items-center gap-1 px-2 py-1.5 rounded text-[10px] font-black cursor-pointer truncate shadow-sm ${
                isLcd ? 'bg-[#2a1b38] text-[#e0b0ff] border border-[#532e75]' : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
              }`}
            >
              <span className="text-[8px] px-1 bg-purple-600 text-white rounded font-bold">⚡</span>
              <span className="truncate">Predictive AI</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSetDialledNumber('*120*9272*0#');
                onCall();
              }}
              className={`flex items-center gap-1 px-2 py-1.5 rounded text-[10px] font-black cursor-pointer truncate shadow-sm ${
                isLcd ? 'bg-[#1b3538] text-[#9df2eb] border border-[#2b5d63]' : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              }`}
            >
              <span className="text-[8px] px-1 bg-teal-600 text-white rounded font-bold">📞</span>
              <span className="truncate">Flash Voice</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSetDialledNumber('*120*9272*8#');
                onCall();
              }}
              className={`flex items-center gap-1 px-2 py-1.5 rounded text-[10px] font-black cursor-pointer truncate shadow-sm ${
                isLcd ? 'bg-[#362f1c] text-[#f7e49e] border border-[#6b5826]' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
              }`}
            >
              <span className="text-[8px] px-1 bg-yellow-600 text-white rounded font-bold">🐝</span>
              <span className="truncate">Spaza Swarm</span>
            </button>
          </div>

          <span className={`text-[8.5px] font-bold mt-1 text-center ${
            isLcd ? 'text-[#1a3318]' : 'text-slate-400'
          }`}>
            Press Call or Enter on keyboard to dial
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
