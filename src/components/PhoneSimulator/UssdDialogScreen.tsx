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
  networkName = 'MTN SA'
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

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
      <div className="w-full h-full flex flex-col justify-center items-center bg-[#8ea889] text-[#142214] p-4 font-mono select-none relative screen-scanlines">
        <div className="w-full max-w-[240px] bg-[#7d9779] border-2 border-[#3b4c39] rounded p-4 text-center shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Loader2 className="w-5 h-5 animate-spin text-[#142214]" />
            <span className="text-xs font-bold uppercase tracking-wider">{networkName}</span>
          </div>
          <div className="text-sm font-bold tracking-wide">
            USSD code running...
          </div>
          <div className="mt-2 text-[10px] text-[#2c3d2a]">
            Connecting to Zara Gateway
          </div>
        </div>
      </div>
    );
  }

  // 2. AI Routing Animation
  if (isRouting) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-[#8ea889] text-[#142214] p-4 font-mono select-none relative screen-scanlines">
        <div className="w-full max-w-[240px] bg-[#7d9779] border-2 border-[#3b4c39] rounded p-4 text-center shadow-lg">
          <Loader2 className="w-6 h-6 animate-spin text-[#142214] mx-auto mb-2" />
          <div className="text-xs font-bold uppercase text-[#2c3d2a] mb-1">
            Zara AI Intent Router
          </div>
          <div className="text-sm font-bold text-[#142214] leading-snug">
            {routingAgentName ? `Connecting to ${routingAgentName}...` : 'Zara is finding the right agent...'}
          </div>
        </div>
      </div>
    );
  }

  // 3. API Processing Animation
  if (isProcessing) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-[#8ea889] text-[#142214] p-4 font-mono select-none relative screen-scanlines">
        <div className="w-full max-w-[240px] bg-[#7d9779] border-2 border-[#3b4c39] rounded p-4 text-center shadow-lg">
          <Loader2 className="w-6 h-6 animate-spin text-[#142214] mx-auto mb-2" />
          <div className="text-xs font-bold uppercase text-[#2c3d2a] mb-1">
            Executing Transaction
          </div>
          <div className="text-sm font-bold text-[#142214]">
            {processingMessage || 'Contacting Enterprise API...'}
          </div>
        </div>
      </div>
    );
  }

  if (!screen) return null;

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#8ea889] text-[#142214] p-3 font-mono relative overflow-hidden screen-scanlines">
      {/* Top USSD Title Bar */}
      <div className="flex items-center justify-between text-[10px] text-[#2c3d2a] border-b border-[#637a5f] pb-1 select-none">
        <span className="font-bold tracking-wider uppercase">{screen.title || 'Zara AI USSD'}</span>
        <span className="text-[9px] font-semibold">{inputValue.length}/182</span>
      </div>

      {/* Screen Body Prompt */}
      <div className="flex-1 my-2 overflow-y-auto pr-1">
        <div className="text-xs sm:text-[13px] font-bold leading-snug whitespace-pre-wrap text-[#142214] tracking-tight">
          {screen.prompt}
        </div>
      </div>

      {/* Reply Input Form */}
      <form onSubmit={handleSubmit} className="border-t border-[#637a5f] pt-2 select-none">
        <div className="text-[11px] font-bold text-[#20311f] mb-1">
          {screen.footer || 'Reply:'}
        </div>

        <div className="flex items-center gap-1.5 bg-[#7b9476] border border-[#445840] rounded px-2 py-1 shadow-inner">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={screen.inputPlaceholder || 'Type number or text...'}
            className="w-full bg-transparent border-none outline-none text-xs font-bold font-mono text-[#0e190e] placeholder:text-[#556d51]"
            maxLength={182}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-2 py-0.5 bg-[#253924] text-[#a5d2a0] rounded text-[10px] font-bold uppercase hover:bg-[#1a2919] disabled:opacity-30 transition-all flex items-center gap-0.5 cursor-pointer"
          >
            <span>Send</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Quick Softkey Bar */}
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#768e72] text-[10px]">
          <button
            type="button"
            onClick={onCancelSession}
            className="text-[#3b5037] hover:text-[#142214] font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>Cancel</span>
          </button>

          <span className="text-[9px] text-[#4d6648]">
            Press Enter / Call key
          </span>
        </div>
      </form>
    </div>
  );
};
