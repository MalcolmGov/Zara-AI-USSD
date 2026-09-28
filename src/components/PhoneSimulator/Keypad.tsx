import React from 'react';
import { Phone, PhoneOff, Delete } from 'lucide-react';

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onCall: () => void;
  onEndCall: () => void;
  onBackspace: () => void;
  isSessionActive?: boolean;
}

export const Keypad: React.FC<KeypadProps> = ({
  onKeyPress,
  onCall,
  onEndCall,
  onBackspace
}) => {
  const keys = [
    { num: '1', letters: '' },
    { num: '2', letters: 'ABC' },
    { num: '3', letters: 'DEF' },
    { num: '4', letters: 'GHI' },
    { num: '5', letters: 'JKL' },
    { num: '6', letters: 'MNO' },
    { num: '7', letters: 'PQRS' },
    { num: '8', letters: 'TUV' },
    { num: '9', letters: 'WXYZ' },
    { num: '*', letters: '' },
    { num: '0', letters: '+' },
    { num: '#', letters: '' }
  ];

  return (
    <div className="w-full px-5 py-4 bg-[#141822] rounded-b-3xl border-t border-slate-700/50 shadow-inner select-none">
      {/* Action / Softkeys row */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {/* Call / Green Button */}
        <button
          type="button"
          onClick={onCall}
          className="tactile-key-green h-12 rounded-xl flex items-center justify-center text-white font-semibold transition-all group active:scale-95"
          title="Call / Send USSD"
        >
          <Phone className="w-5 h-5 transition-transform group-hover:scale-110" />
        </button>

        {/* Backspace / Clear button */}
        <button
          type="button"
          onClick={onBackspace}
          className="tactile-key h-12 rounded-xl flex flex-col items-center justify-center text-slate-300 transition-all hover:text-white active:scale-95"
          title="Backspace / Delete"
        >
          <Delete className="w-4 h-4 text-slate-400" />
          <span className="text-[9px] text-slate-400 tracking-wider uppercase font-semibold">Clear</span>
        </button>

        {/* End / Red Button */}
        <button
          type="button"
          onClick={onEndCall}
          className="tactile-key-red h-12 rounded-xl flex items-center justify-center text-white font-semibold transition-all group active:scale-95"
          title="End Session / Cancel"
        >
          <PhoneOff className="w-5 h-5 transition-transform group-hover:scale-110" />
        </button>
      </div>

      {/* Numeric Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {keys.map(k => (
          <button
            key={k.num}
            type="button"
            onClick={() => onKeyPress(k.num)}
            className="tactile-key h-12 rounded-xl flex flex-col items-center justify-center transition-all hover:brightness-110 active:scale-95 text-slate-100"
          >
            <span className="text-lg font-bold leading-tight font-mono text-slate-100">{k.num}</span>
            {k.letters && (
              <span className="text-[9px] font-semibold text-slate-400 tracking-wider -mt-0.5">
                {k.letters}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Keyboard Hint */}
      <div className="mt-3 text-center">
        <span className="text-[10px] text-slate-500 font-mono">
          Physical keyboard active: type 0-9, Enter to send, Esc to exit
        </span>
      </div>
    </div>
  );
};
