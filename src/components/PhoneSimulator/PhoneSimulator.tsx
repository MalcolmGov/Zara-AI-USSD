import React, { useState, useEffect } from 'react';
import { DiallerScreen } from './DiallerScreen';
import { UssdDialogScreen } from './UssdDialogScreen';
import { Keypad } from './Keypad';
import { UssdScreen } from '../../types/ussd';

interface PhoneSimulatorProps {
  currentScreen: UssdScreen | null;
  isDialling: boolean;
  isRouting?: boolean;
  routingAgentName?: string;
  isProcessing?: boolean;
  processingMessage?: string;
  onDial: (code: string) => void;
  onSubmitReply: (reply: string) => void;
  onEndCall: () => void;
  networkName?: string;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  currentScreen,
  isDialling,
  isRouting = false,
  routingAgentName,
  isProcessing = false,
  processingMessage,
  onDial,
  onSubmitReply,
  onEndCall,
  networkName = 'MTN SA'
}) => {
  const [dialledDigits, setDialledDigits] = useState('*120*9272#');
  const isSessionActive = currentScreen !== null || isDialling;

  // Global physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in another text input outside the phone
      const target = e.target as HTMLElement;
      if (target && target.tagName === 'INPUT' && target.id !== 'ussd-reply-input') {
        return;
      }

      if (e.key === 'Escape') {
        onEndCall();
        return;
      }

      if (!isSessionActive) {
        // Dialler mode
        if (/^[0-9*#]$/.test(e.key)) {
          setDialledDigits(prev => (prev === '*120*9272#' ? e.key : prev + e.key));
        } else if (e.key === 'Backspace') {
          setDialledDigits(prev => prev.slice(0, -1));
        } else if (e.key === 'Enter') {
          if (dialledDigits) onDial(dialledDigits);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSessionActive, dialledDigits, onDial, onEndCall]);

  const [screenTheme, setScreenTheme] = useState<'lcd' | 'oled'>('lcd');

  const handleKeyPress = (key: string) => {
    if (!isSessionActive) {
      setDialledDigits(prev => (prev === '*120*9272#' ? key : prev + key));
    } else {
      // If session is active and user clicks numeric key on pad, append or submit
      onSubmitReply(key);
    }
  };

  const handleBackspace = () => {
    if (!isSessionActive) {
      setDialledDigits(prev => prev.slice(0, -1));
    }
  };

  const handleCallButton = () => {
    if (!isSessionActive) {
      if (dialledDigits) onDial(dialledDigits);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* 3D Drop Shadow & Device Frame */}
      <div className="w-[320px] sm:w-[340px] bg-[#1a202c] rounded-[44px] p-4 shadow-2xl border-4 border-slate-700/60 relative overflow-hidden flex flex-col items-center">
        {/* Specular glare overlay */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[40px]" />

        {/* Top Speaker Ear-piece */}
        <div className="w-16 h-1.5 bg-slate-800 rounded-full mb-3 shadow-inner border border-slate-700/50" />

        {/* Phone Brand Name & Theme Switch */}
        <div className="w-full px-2 flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-slate-300 font-tech">
              ZARA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold text-slate-400 tracking-wider">
              SERIES 100
            </span>
          </div>

          {/* Screen Mode Toggle Button */}
          <button
            type="button"
            onClick={() => setScreenTheme(prev => prev === 'lcd' ? 'oled' : 'lcd')}
            className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold tracking-wider uppercase border transition-all cursor-pointer ${
              screenTheme === 'lcd'
                ? 'bg-[#a4c79b] text-[#061205] border-[#425a3f] shadow-sm'
                : 'bg-slate-800 text-emerald-400 border-emerald-500/40'
            }`}
            title="Switch display backlight mode (LCD Green / OLED Dark)"
          >
            {screenTheme === 'lcd' ? '📟 LCD Green' : '🌙 OLED Dark'}
          </button>
        </div>

        {/* Screen Bezel */}
        <div className="w-full bg-[#0d1219] p-2.5 rounded-2xl border-2 border-slate-800 shadow-2xl relative">
          {/* LCD Screen Display Box */}
          <div 
            className="w-full h-[240px] sm:h-[260px] rounded-lg overflow-hidden border shadow-inner relative transition-colors duration-200"
            style={{ 
              backgroundColor: screenTheme === 'lcd' ? '#a4c79b' : '#090e15',
              borderColor: screenTheme === 'lcd' ? '#394e36' : '#1e293b'
            }}
          >
            {!isSessionActive ? (
              <DiallerScreen
                dialledNumber={dialledDigits}
                onSetDialledNumber={setDialledDigits}
                onCall={handleCallButton}
                networkName={networkName}
                theme={screenTheme}
              />
            ) : (
              <UssdDialogScreen
                screen={currentScreen}
                isDialling={isDialling}
                isRouting={isRouting}
                routingAgentName={routingAgentName}
                isProcessing={isProcessing}
                processingMessage={processingMessage}
                onSubmitReply={onSubmitReply}
                onCancelSession={onEndCall}
                networkName={networkName}
                theme={screenTheme}
              />
            )}
          </div>
        </div>

        {/* Central D-Pad & Soft Navigation Bar */}
        <div className="w-full flex items-center justify-between px-6 py-2.5 mt-1 select-none">
          {/* Left Selection Key */}
          <button
            type="button"
            onClick={handleCallButton}
            className="w-10 h-3 bg-slate-700 hover:bg-slate-600 rounded-full border border-slate-600 shadow active:translate-y-0.5 transition-all"
            title="Left Softkey (Select)"
          />

          {/* D-Pad Circle */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-b from-slate-700 to-slate-900 border-2 border-slate-600 shadow-md flex items-center justify-center relative">
            <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 shadow-inner flex items-center justify-center text-[8px] font-bold text-slate-400">
              OK
            </div>
          </div>

          {/* Right Selection Key */}
          <button
            type="button"
            onClick={onEndCall}
            className="w-10 h-3 bg-slate-700 hover:bg-slate-600 rounded-full border border-slate-600 shadow active:translate-y-0.5 transition-all"
            title="Right Softkey (Back / Cancel)"
          />
        </div>

        {/* Numeric Tactile Keypad */}
        <Keypad
          onKeyPress={handleKeyPress}
          onCall={handleCallButton}
          onEndCall={onEndCall}
          onBackspace={handleBackspace}
          isSessionActive={isSessionActive}
        />
      </div>

      {/* Decorative Phone Base Reflection */}
      <div className="w-48 h-3 bg-emerald-500/10 blur-xl rounded-full mt-2" />
    </div>
  );
};
