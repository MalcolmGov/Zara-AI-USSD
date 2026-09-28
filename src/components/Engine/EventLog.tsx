import React, { useState } from 'react';
import { EventLogEntry } from '../../types/engine';
import { ChevronDown, ChevronUp, Terminal, Trash2, CheckCircle2, AlertCircle, Info, ShieldAlert } from 'lucide-react';

interface EventLogProps {
  logs: EventLogEntry[];
  onClear: () => void;
}

export const EventLog: React.FC<EventLogProps> = ({ logs, onClear }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredLogs = logs.filter(l => {
    if (filterType === 'all') return true;
    if (filterType === 'intent') return l.type.includes('INTENT') || l.type.includes('LANGUAGE');
    if (filterType === 'agent') return l.type.includes('AGENT') || l.type.includes('WORKFLOW');
    if (filterType === 'api') return l.type.includes('API') || l.type.includes('TRANSACTION');
    if (filterType === 'channel') return l.type.includes('CROSS_CHANNEL') || l.type.includes('SESSION');
    return true;
  });

  const getBadgeStyle = (type: string, level: string) => {
    if (level === 'error') return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    if (level === 'warning') return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    if (level === 'success') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (type.includes('INTENT')) return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    if (type.includes('API')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    return 'bg-slate-800 text-slate-300 border-slate-700';
  };

  const getIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      default:
        return <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    }
  };

  return (
    <div className="glass-panel rounded-xl border border-slate-800/80 shadow-xl overflow-hidden">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-tech">
            Developer Event Stream
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
            {filteredLogs.length} events
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono">
            {['all', 'intent', 'agent', 'api', 'channel'].map(f => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-2 py-0.5 rounded transition-all capitalize cursor-pointer ${
                  filterType === f
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={onClear}
            className="p-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
            title="Clear Log"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Log Feed */}
      {isExpanded && (
        <div className="max-h-60 overflow-y-auto p-3 font-mono text-xs space-y-1.5 bg-[#090d14]/70">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs">
              No events logged yet. Dial *120*9272# on the phone to start.
            </div>
          ) : (
            filteredLogs.map(log => (
              <div
                key={log.id}
                className="flex items-start gap-2.5 p-1.5 rounded hover:bg-slate-800/40 transition-colors"
              >
                <span className="text-[10px] text-slate-500 shrink-0 font-semibold pt-0.5">
                  {log.timestamp}
                </span>

                {getIcon(log.level)}

                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase tracking-wider shrink-0 ${getBadgeStyle(
                    log.type,
                    log.level
                  )}`}
                >
                  {log.type}
                </span>

                <div className="flex-1 min-w-0">
                  <span className="text-slate-200 font-medium block truncate">
                    {log.title}
                  </span>
                  {log.metadata && Object.keys(log.metadata).length > 0 && (
                    <span className="text-[10px] text-slate-400 truncate block mt-0.5 font-mono">
                      {JSON.stringify(log.metadata)}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
