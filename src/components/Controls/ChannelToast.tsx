import React, { useEffect, useState } from 'react';
import { OutboundMessage, MockSMSAPI } from '../../services/mockSMSAPI';
import { MessageSquare, PhoneCall, X, CheckCheck } from 'lucide-react';

export const ChannelToast: React.FC = () => {
  const [messages, setMessages] = useState<OutboundMessage[]>([]);

  useEffect(() => {
    const unsub = MockSMSAPI.subscribe(msg => {
      setMessages(prev => [msg, ...prev.slice(0, 2)]);

      // Auto-dismiss after 8 seconds
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== msg.id));
      }, 8000);
    });

    return unsub;
  }, []);

  const handleDismiss = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  if (messages.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`pointer-events-auto rounded-xl p-3.5 shadow-2xl border backdrop-blur-md transition-all transform animate-in slide-in-from-top-3 duration-300 ${
            msg.channel === 'whatsapp'
              ? 'bg-[#0b1e16]/95 border-emerald-500/50 text-emerald-100'
              : msg.channel === 'voice'
              ? 'bg-[#1e1329]/95 border-purple-500/50 text-purple-100'
              : 'bg-[#0f172a]/95 border-cyan-500/50 text-slate-100'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              {msg.channel === 'whatsapp' ? (
                <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                  <CheckCheck className="w-4 h-4" />
                </div>
              ) : msg.channel === 'voice' ? (
                <div className="p-1 rounded-md bg-purple-500/20 text-purple-400">
                  <PhoneCall className="w-4 h-4" />
                </div>
              ) : (
                <div className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
              )}

              <div>
                <span className="text-xs font-bold font-tech block leading-tight">
                  {msg.sender}
                </span>
                <span className="text-[10px] opacity-75 font-mono">
                  Delivered to {msg.recipient}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] opacity-60 font-mono">{msg.timestamp}</span>
              <button
                type="button"
                onClick={() => handleDismiss(msg.id)}
                className="p-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="text-xs font-mono leading-relaxed whitespace-pre-line bg-black/30 p-2.5 rounded-lg border border-white/5">
            {msg.content}
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[10px] opacity-60 font-mono">
            <span>Zara Cross-Channel Handoff</span>
            <span className="text-emerald-400 font-semibold">Simulated Device Notification</span>
          </div>
        </div>
      ))}
    </div>
  );
};
