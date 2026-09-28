import React, { useState, useEffect, useRef } from 'react';
import { UssdScreen } from '../../types/ussd';
import { Loader2, ArrowRight, X } from 'lucide-react';

interface UssdDialogScreenProps {
  screen: UssdScreen | null;
  isDialling: boolean;
  isRouting?: boolean;
  routingAgentName?: string;
  isProcessing?: boolean;
  processingMessage?: string;
  onSubmitReply: (reply: string) => void;
  onCancelSession: () => void;
  networkName?: string;
  theme?: 'lcd' | 'oled';
}

export const UssdDialogScreen: React.FC<UssdDialogScreenProps> = ({
  screen,
  isDialling,
  isRouting = false,
  routingAgentName,
  isProcessing = false,
  processingMessage,
  onSubmitReply,
  onCancelSession,
  networkName = 'MTN SA',
  theme = 'lcd'
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isLcd = theme === 'lcd';

  // Auto-focus input whenever screen changes
  useEffect(() => {
    setInputValue('');
    if (!isDialling && !isRouting && !isProcessing) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [screen?.id, isDialling, isRouting, isProcessing]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim()) {
      onSubmitReply(inputValue.trim());
      setInputValue('');
    }
  };

  // 1. Dialling State: "USSD code running..."
  if (isDialling) {
    return (
      <div 
        className="w-full h-full flex flex-col justify-center items-center p-4 font-mono select-none relative screen-scanlines"
        style={{ backgroundColor: isLcd ? '#a4c79b' : '#090e15', color: isLcd ? '#000000' : '#ffffff' }}
      >
        <div 
          className={`w-full max-w-[240px] rounded-lg p-4 text-center shadow-xl border-2 ${
            isLcd 
              ? 'bg-[#ffffff] border-[#253922] text-[#050e05]' 
              : 'bg-[#131b26] border-emerald-500/50 text-white'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Loader2 className={`w-5 h-5 animate-spin ${isLcd ? 'text-[#0a1809]' : 'text-emerald-400'}`} />
            <span className="text-xs font-black uppercase tracking-wider">{networkName}</span>
          </div>
          <div className="text-sm font-black tracking-wide">
            USSD code running...
          </div>
          <div className={`mt-1.5 text-[11px] font-semibold ${isLcd ? 'text-[#2b3f27]' : 'text-slate-400'}`}>
            Connecting to Zara Gateway
          </div>
        </div>
      </div>
    );
  }

  // 2. AI Routing Animation
  if (isRouting) {
    return (
      <div 
        className="w-full h-full flex flex-col justify-center items-center p-4 font-mono select-none relative screen-scanlines"
        style={{ backgroundColor: isLcd ? '#a4c79b' : '#090e15', color: isLcd ? '#000000' : '#ffffff' }}
      >
        <div 
          className={`w-full max-w-[240px] rounded-lg p-4 text-center shadow-xl border-2 ${
            isLcd 
              ? 'bg-[#ffffff] border-[#253922] text-[#050e05]' 
              : 'bg-[#131b26] border-purple-500/50 text-white'
          }`}
        >
          <Loader2 className={`w-6 h-6 animate-spin mx-auto mb-2 ${isLcd ? 'text-[#0a1809]' : 'text-purple-400'}`} />
          <div className={`text-[10px] font-extrabold uppercase mb-1 tracking-wider ${isLcd ? 'text-[#2e472a]' : 'text-purple-300'}`}>
            Zara AI Intent Router
          </div>
          <div className="text-xs sm:text-sm font-black leading-snug">
            {routingAgentName ? `Connecting to ${routingAgentName}...` : 'Zara is finding the right agent...'}
          </div>
        </div>
      </div>
    );
  }

  // 3. API Processing Animation
  if (isProcessing) {
    return (
      <div 
        className="w-full h-full flex flex-col justify-center items-center p-4 font-mono select-none relative screen-scanlines"
        style={{ backgroundColor: isLcd ? '#a4c79b' : '#090e15', color: isLcd ? '#000000' : '#ffffff' }}
      >
        <div 
          className={`w-full max-w-[240px] rounded-lg p-4 text-center shadow-xl border-2 ${
            isLcd 
              ? 'bg-[#ffffff] border-[#253922] text-[#050e05]' 
              : 'bg-[#131b26] border-amber-500/50 text-white'
          }`}
        >
          <Loader2 className={`w-6 h-6 animate-spin mx-auto mb-2 ${isLcd ? 'text-[#0a1809]' : 'text-amber-400'}`} />
          <div className={`text-[10px] font-extrabold uppercase mb-1 tracking-wider ${isLcd ? 'text-[#2e472a]' : 'text-amber-300'}`}>
            Executing Transaction
          </div>
          <div className="text-xs sm:text-sm font-black leading-snug">
            {processingMessage || 'Contacting Enterprise API...'}
          </div>
        </div>
      </div>
    );
  }

  if (!screen) return null;

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-3 font-mono relative overflow-hidden screen-scanlines"
      style={{ 
        backgroundColor: isLcd ? '#a4c79b' : '#090e15', 
        color: isLcd ? '#000000' : '#ffffff' 
      }}
    >
      {/* Top USSD Title Bar */}
      <div 
        className={`flex items-center justify-between text-[11px] pb-1.5 select-none border-b ${
          isLcd ? 'border-[#3f573c] text-[#0f1d0e]' : 'border-slate-800 text-emerald-400'
        }`}
      >
        <span className="font-black tracking-wider uppercase">
          {screen.title || 'Zara AI USSD'}
        </span>
        <span className={`text-[10px] font-bold ${isLcd ? 'text-[#1c331a]' : 'text-slate-400'}`}>
          {inputValue.length}/182
        </span>
      </div>

      {/* Screen Body Prompt */}
      <div className="flex-1 my-2 overflow-y-auto pr-1">
        <div 
          className={`text-xs sm:text-[13px] font-extrabold leading-snug whitespace-pre-wrap tracking-tight ${
            isLcd ? 'text-[#000000]' : 'text-[#ffffff]'
          }`}
          style={{ textShadow: isLcd ? 'none' : '0 1px 2px rgba(0,0,0,0.5)' }}
        >
          {screen.prompt}
        </div>
      </div>

      {/* Reply Input Form */}
      <form onSubmit={handleSubmit} className={`pt-2 select-none border-t ${
        isLcd ? 'border-[#3f573c]' : 'border-slate-800'
      }`}>
        <div className={`text-xs font-black mb-1 ${
          isLcd ? 'text-[#050e05]' : 'text-emerald-400'
        }`}>
          {screen.footer || 'Reply:'}
        </div>

        <div className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 shadow-sm border-2 ${
          isLcd 
            ? 'bg-[#ffffff] border-[#243a21]' 
            : 'bg-[#131b26] border-emerald-500/50'
        }`}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={screen.inputPlaceholder || 'Type number or text...'}
            className={`w-full bg-transparent border-none outline-none text-xs sm:text-sm font-extrabold font-mono ${
              isLcd 
                ? 'text-[#000000] placeholder:text-[#5c7756]' 
                : 'text-[#ffffff] placeholder:text-slate-500'
            }`}
            maxLength={182}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={`px-2.5 py-1 rounded text-[11px] font-black uppercase transition-all flex items-center gap-1 cursor-pointer shadow ${
              isLcd
                ? 'bg-[#183116] hover:bg-[#0c1a0b] text-[#b6f0b0] disabled:opacity-40'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-40'
            }`}
          >
            <span>Send</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Quick Softkey Bar */}
        <div className={`flex items-center justify-between mt-2 pt-1 border-t text-[11px] ${
          isLcd ? 'border-[#557152] text-[#1c331a]' : 'border-slate-800/80 text-slate-400'
        }`}>
          <button
            type="button"
            onClick={onCancelSession}
            className={`font-black flex items-center gap-0.5 transition-colors cursor-pointer ${
              isLcd ? 'hover:text-[#000000]' : 'hover:text-rose-400'
            }`}
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>

          <span className="text-[10px] font-bold">
            Enter = Send • Esc = Exit
          </span>
        </div>
      </form>
    </div>
  );
};
