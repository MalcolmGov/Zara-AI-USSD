import React from 'react';
import { Play, Pause, RotateCcw, X, CheckCircle2 } from 'lucide-react';

interface GuidedDemoBarProps {
  isActive: boolean;
  isPaused: boolean;
  currentStepIndex: number;
  totalSteps: number;
  stepDescription: string;
  onPauseResume: () => void;
  onRestart: () => void;
  onClose: () => void;
}

export const GuidedDemoBar: React.FC<GuidedDemoBarProps> = ({
  isActive,
  isPaused,
  currentStepIndex,
  totalSteps,
  stepDescription,
  onPauseResume,
  onRestart,
  onClose
}) => {
  if (!isActive) return null;

  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-none">
      <div className="pointer-events-auto glass-panel border border-emerald-500/50 rounded-2xl p-4 shadow-2xl bg-[#090e17]/95 backdrop-blur-xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold font-tech uppercase tracking-wider text-emerald-400">
              Guided Executive Tour:
            </span>
            <span className="text-xs font-mono text-slate-300 font-semibold">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Pause / Resume Button */}
            <button
              type="button"
              onClick={onPauseResume}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pause</span>
                </>
              )}
            </button>

            {/* Restart Button */}
            <button
              type="button"
              onClick={onRestart}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-all cursor-pointer"
              title="Restart Demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Close Demo Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg border border-slate-700 transition-all cursor-pointer"
              title="Exit Guided Demo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Step Explanation Text */}
        <div className="flex items-center gap-2 text-sm text-slate-100 font-medium mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{stepDescription}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700/50">
          <div
            className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
