import React from 'react';
import { NetworkCondition } from '../../types/ussd';
import { 
  Sparkles, 
  Play, 
  Wifi, 
  Clock, 
  ExternalLink, 
  ChevronDown, 
  Zap, 
  Briefcase, 
  Building2, 
  Sprout, 
  Coins, 
  Languages,
  Presentation,
  Smartphone,
  PhoneCall,
  Users
} from 'lucide-react';

interface TopHeaderProps {
  onStartGuidedDemo: () => void;
  onSelectScenario: (scenarioId: string) => void;
  networkCondition: NetworkCondition;
  onSelectNetworkCondition: (condition: NetworkCondition) => void;
  timeRemaining: number;
  isSessionActive: boolean;
  activeView: 'simulator' | 'pitch';
  onSelectView: (view: 'simulator' | 'pitch') => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onStartGuidedDemo,
  onSelectScenario,
  networkCondition,
  onSelectNetworkCondition,
  timeRemaining,
  isSessionActive,
  activeView,
  onSelectView
}) => {
  const [scenarioMenuOpen, setScenarioMenuOpen] = React.useState(false);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const scenarios = [
    { id: 'electricity', label: 'Buy Electricity', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'jobs', label: 'Find a Job', icon: <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'grant', label: 'Check Grant', icon: <Building2 className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'agri', label: 'Crop Assistance (GenAI)', icon: <Sprout className="w-3.5 h-3.5 text-green-400" /> },
    { id: 'credits', label: 'Buy AI Credits', icon: <Coins className="w-3.5 h-3.5 text-amber-300" /> },
    { id: 'zulu', label: 'isiZulu Natural Language', icon: <Languages className="w-3.5 h-3.5 text-purple-400" /> },
    { id: 'bank', label: 'Apex Bank (*120*321#) [Pattern A]', icon: <Building2 className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'vas', label: 'Kazang VAS (*120*7727#) [Pattern B]', icon: <Zap className="w-3.5 h-3.5 text-orange-400" /> },
    { id: 'predictive', label: 'Predictive Zero-Hop (*120*9272*1#)', icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" /> },
    { id: 'voice', label: 'Flash & Talk Voice (*120*9272*0#)', icon: <PhoneCall className="w-3.5 h-3.5 text-teal-400" /> },
    { id: 'spaza', label: 'The Spaza Swarm (*120*9272*8#)', icon: <Users className="w-3.5 h-3.5 text-yellow-400" /> }
  ];

  return (
    <header className="w-full glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5 relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-black text-xl">
            Z
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white font-tech">
                Zara AI
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-bold border border-emerald-500/30">
                USSD GATEWAY
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono italic">
              "If you can dial a number, you can access AI."
            </p>
          </div>
        </div>

        {/* Center Mode Switcher: Interactive Simulator vs Pitch Deck */}
        <div className="flex items-center p-1 bg-slate-900/90 border border-slate-800 rounded-xl font-mono text-xs">
          <button
            type="button"
            onClick={() => onSelectView('simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeView === 'simulator'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectView('pitch')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeView === 'pitch'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Executive Pitch Deck</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-200 font-bold uppercase tracking-wider">
              BRIEF
            </span>
          </button>
        </div>

        {/* Right Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Guided Demo Button */}
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg glow-emerald transition-all active:scale-95 cursor-pointer font-tech"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Guided Demo</span>
          </button>

          {/* Quick Scenario Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setScenarioMenuOpen(!scenarioMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700/80 transition-all cursor-pointer font-mono"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Demo Scenarios</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {scenarioMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 glass-panel bg-[#0d131f]/95 border border-slate-700 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono border-b border-slate-800">
                  Select Demo Scenario
                </div>
                {scenarios.map(sc => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => {
                      onSelectScenario(sc.id);
                      setScenarioMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs font-medium text-slate-200 hover:bg-emerald-500/15 hover:text-emerald-300 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    {sc.icon}
                    <span>{sc.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Network Condition Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-xl text-xs font-mono">
            <Wifi className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={networkCondition}
              onChange={e => onSelectNetworkCondition(e.target.value as NetworkCondition)}
              className="bg-transparent text-slate-300 text-xs font-mono outline-none cursor-pointer"
              title="Network simulation latency"
            >
              <option value="normal" className="bg-slate-900 text-slate-200">Network: Normal (&lt;500ms)</option>
              <option value="slow" className="bg-slate-900 text-slate-200">Network: Slow (1.4s)</option>
              <option value="very_slow" className="bg-slate-900 text-slate-200">Network: Very Slow (3.2s)</option>
              <option value="timeout" className="bg-slate-900 text-slate-200">Network: SS7 Timeout</option>
            </select>
          </div>

          {/* Session Timer Indicator */}
          {isSessionActive && (
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold border ${
              timeRemaining < 30
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                : 'bg-slate-900/80 text-emerald-400 border-slate-800'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimer(timeRemaining)}</span>
              {timeRemaining < 30 && <span className="text-[10px] hidden sm:inline">(Ending Soon)</span>}
            </div>
          )}

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/MalcolmGov/Zara-AI-USSD"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-mono ml-2 pl-3 border-l border-slate-800"
            title="GitHub Repository"
          >
            <span>MalcolmGov/Zara-AI-USSD</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>
    </header>
  );
};
