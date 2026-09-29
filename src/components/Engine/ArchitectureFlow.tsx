import React from 'react';
import { ArchitectureNodeId } from '../../types/engine';
import { 
  Smartphone, 
  Antenna, 
  Server, 
  Cpu, 
  BrainCircuit, 
  Store, 
  Zap, 
  Database, 
  MessageSquareShare,
  ArrowRight,
  GitFork
} from 'lucide-react';

interface ArchitectureFlowProps {
  activeNodes: ArchitectureNodeId[];
  activeAgentName?: string;
  lastApiName?: string;
  serviceCode?: string;
  partnerPattern?: string;
}

interface StepNode {
  id: ArchitectureNodeId;
  label: string;
  sub: string;
  icon: React.ReactNode;
}

export const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({
  activeNodes,
  activeAgentName = 'Specialized Agent',
  lastApiName = 'Enterprise API',
  serviceCode = '*120*9272#',
  partnerPattern = 'Marketplace'
}) => {
  const steps: StepNode[] = [
    {
      id: 'feature-phone',
      label: 'Feature Phone',
      sub: serviceCode,
      icon: <Smartphone className="w-4 h-4" />
    },
    {
      id: 'ussd-network',
      label: 'USSD Network',
      sub: 'SS7 / MAP Signalling',
      icon: <Antenna className="w-4 h-4" />
    },
    {
      id: 'ussd-gateway',
      label: 'USSD Gateway',
      sub: 'MNO Aggregator',
      icon: <Server className="w-4 h-4" />
    },
    {
      id: 'enterprise-hook',
      label: 'Partner Hook',
      sub: partnerPattern === 'A' ? 'Pattern A (Proxy)' : partnerPattern === 'B' ? 'Pattern B (Inject)' : 'Enterprise Hook',
      icon: <GitFork className="w-4 h-4" />
    },
    {
      id: 'channel-adapter',
      label: 'Zara Adapter',
      sub: 'GSM 182c Parser',
      icon: <Cpu className="w-4 h-4" />
    },
    {
      id: 'ai-router',
      label: 'Zara AI Router',
      sub: 'Intent & Entity NLU',
      icon: <BrainCircuit className="w-4 h-4" />
    },
    {
      id: 'agent-marketplace',
      label: 'Marketplace',
      sub: 'Agent Orchestration',
      icon: <Store className="w-4 h-4" />
    },
    {
      id: 'selected-agent',
      label: activeAgentName.split(' ')[0] || 'Active Agent',
      sub: 'Workflow Engine',
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: 'enterprise-api',
      label: 'Enterprise API',
      sub: lastApiName ? lastApiName.split('.')[0] : 'Utility / Gov / Bank',
      icon: <Database className="w-4 h-4" />
    },
    {
      id: 'cross-channel',
      label: 'Handoff',
      sub: 'SMS / WhatsApp',
      icon: <MessageSquareShare className="w-4 h-4" />
    }
  ];

  return (
    <div className="glass-panel rounded-xl p-4 border border-slate-800/80 shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800/60 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-tech flex items-center gap-2">
          <span>Live Architecture Pipeline</span>
          <span className="text-[10px] text-emerald-400 font-mono font-medium">
            (Pulse indicates active execution stage)
          </span>
        </h3>
      </div>

      {/* Pipeline Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        {steps.map((step, idx) => {
          const isActive = activeNodes.includes(step.id);

          return (
            <div
              key={step.id}
              className={`flex flex-col items-center text-center p-2 rounded-lg border transition-all duration-300 relative ${
                isActive
                  ? 'bg-emerald-500/15 border-emerald-500/60 shadow-lg glow-emerald scale-105'
                  : 'bg-slate-900/40 border-slate-800/80 opacity-60 hover:opacity-90'
              }`}
            >
              {/* Node Icon */}
              <div className={`p-2 rounded-full mb-1.5 transition-colors ${
                isActive
                  ? 'bg-emerald-400 text-slate-950 font-bold shadow'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {step.icon}
              </div>

              {/* Label */}
              <span className={`text-[11px] font-bold leading-tight font-tech truncate w-full ${
                isActive ? 'text-white' : 'text-slate-300'
              }`}>
                {step.label}
              </span>

              {/* Subtitle */}
              <span className="text-[9px] text-slate-400 font-mono truncate w-full mt-0.5">
                {step.sub}
              </span>

              {/* Connector arrow indicator on large screens */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-600 z-10">
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
