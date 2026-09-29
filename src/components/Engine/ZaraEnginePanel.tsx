import React from 'react';
import { EngineTelemetry } from '../../types/engine';
import { 
  Radio, 
  BrainCircuit, 
  Layers, 
  Coins, 
  Timer, 
  CheckCircle2, 
  Activity, 
  Server
} from 'lucide-react';

interface ZaraEnginePanelProps {
  telemetry: EngineTelemetry;
}

export const ZaraEnginePanel: React.FC<ZaraEnginePanelProps> = ({ telemetry }) => {
  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const confidencePercent = telemetry.intentResult 
    ? Math.round(telemetry.intentResult.confidence * 100) 
    : 0;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top Header Card */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse glow-emerald" />
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 font-tech">
            Zara AI Engine
            {telemetry.partnerPattern && telemetry.partnerPattern !== 'Marketplace' ? (
              <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-medium border ${
                telemetry.partnerPattern === 'A'
                  ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                  : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
              }`}>
                ENTERPRISE: {telemetry.partnerName} ({telemetry.serviceCode})
              </span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-medium">
                LIVE TELEMETRY
              </span>
            )}
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            MAP / SS7 Gateway
          </span>
          <span className="flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-amber-400" />
            {formatDuration(telemetry.durationSeconds)}
          </span>
        </div>
      </div>

      {/* Grid of Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* CARD 1: Session Information */}
        <div className="glass-panel rounded-xl p-4 border border-slate-800/80 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/60">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>Session Metadata</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
              telemetry.sessionState === 'active' 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : telemetry.sessionState === 'expired'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-slate-800 text-slate-400'
            }`}>
              {telemetry.sessionState}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-2 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">SERVICE SHORTCODE</span>
              <span className="text-emerald-400 font-bold">{telemetry.serviceCode || '*120*9272#'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">INTEGRATION MODE</span>
              <span className={`font-bold truncate block ${
                telemetry.partnerPattern === 'A' ? 'text-blue-400' : telemetry.partnerPattern === 'B' ? 'text-amber-400' : 'text-slate-200'
              }`}>
                {telemetry.partnerName || 'Zara Marketplace'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">SESSION ID</span>
              <span className="text-slate-200 font-bold">{telemetry.sessionId}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">MSISDN</span>
              <span className="text-slate-200 font-bold">{telemetry.msisdn}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">NETWORK OPERATOR</span>
              <span className="text-slate-300">{telemetry.network}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">LANGUAGE PACK</span>
              <span className="text-emerald-400 font-semibold">{telemetry.language}</span>
            </div>
          </div>
        </div>

        {/* CARD 2: AI Intent Router */}
        <div className="glass-panel rounded-xl p-4 border border-slate-800/80 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/60">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <BrainCircuit className="w-4 h-4 text-purple-400" />
              <span>AI Intent Router</span>
            </div>
            {telemetry.intentResult && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono font-bold">
                {confidencePercent}% CONFIDENCE
              </span>
            )}
          </div>

          {telemetry.lastUserInput ? (
            <div className="space-y-2 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">RAW INPUT</span>
                <span className="text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block">
                  "{telemetry.lastUserInput}"
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-slate-500 block text-[10px]">DETECTED INTENT</span>
                  <span className="text-purple-300 font-semibold">
                    {telemetry.intentResult?.intent || 'Awaiting input'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">SELECTED AGENT</span>
                  <span className="text-emerald-400 font-bold">
                    {telemetry.intentResult?.agentName || 'Marketplace routing'}
                  </span>
                </div>
              </div>

              {telemetry.intentResult?.entities && Object.keys(telemetry.intentResult.entities).length > 0 && (
                <div className="pt-1">
                  <span className="text-slate-500 block text-[10px] mb-1">EXTRACTED ENTITIES</span>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(telemetry.intentResult.entities).map(([key, val]) => (
                      <span key={key} className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                        {key}: <b className="text-cyan-300">{String(val)}</b>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-4 text-center text-slate-500 text-xs font-mono">
              Awaiting natural language input or menu navigation...
            </div>
          )}
        </div>

        {/* CARD 3: Active Agent & Workflow */}
        <div className="glass-panel rounded-xl p-4 border border-slate-800/80 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/60">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Agent & Workflow Execution</span>
            </div>
            {telemetry.workflowStep && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                STEP {telemetry.workflowStep}
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-500 block text-[10px]">ACTIVE AGENT</span>
                <span className="text-white font-bold">
                  {telemetry.activeAgentName || 'None (Marketplace Root)'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">WORKFLOW</span>
                <span className="text-cyan-300 font-semibold">
                  {telemetry.currentWorkflow || 'Idle'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px]">STATUS</span>
              <span className="text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {telemetry.workflowStatus || 'Ready for request'}
              </span>
            </div>
          </div>
        </div>

        {/* CARD 4: API Execution & Credits */}
        <div className="glass-panel rounded-xl p-4 border border-slate-800/80 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/60">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Server className="w-4 h-4 text-amber-400" />
              <span>Backend API & Credits</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>{telemetry.remainingBalance} CREDITS</span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">LAST API CALLED</span>
              <span className="text-slate-200 font-semibold truncate block">
                {telemetry.lastApiName || 'None (In-memory transaction)'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-500 block text-[10px]">LATENCY</span>
                <span className="text-cyan-300 font-bold flex items-center gap-1">
                  <Activity className="w-3 h-3 text-cyan-400" />
                  {telemetry.lastLatencyMs ? `${telemetry.lastLatencyMs} ms` : '—'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">CREDITS USED</span>
                <span className="text-slate-300">
                  {telemetry.creditsConsumed > 0 ? `-${telemetry.creditsConsumed}` : '0'} credits
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
