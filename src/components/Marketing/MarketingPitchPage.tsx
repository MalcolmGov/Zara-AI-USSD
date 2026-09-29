import React from 'react';
import { 
  Sparkles, 
  Smartphone, 
  TrendingUp, 
  ShieldCheck, 
  Coins, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  Layers, 
  Flame, 
  Lock,
  BatteryMedium,
  WifiOff,
  ArrowUpRight
} from 'lucide-react';

interface MarketingPitchPageProps {
  onLaunchSimulator: (scenarioId?: string) => void;
}

export const MarketingPitchPage: React.FC<MarketingPitchPageProps> = ({ onLaunchSimulator }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-col gap-12 font-sans text-slate-100">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-8 lg:p-12 shadow-2xl bg-gradient-to-br from-slate-950 via-[#0a121e] to-[#081a17]">
        {/* Background glow orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXECUTIVE BRIEF & MARKET STRATEGY</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-white font-tech leading-tight">
              If you can dial a number, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                you can access AI.
              </span>
            </h1>

            <p className="text-base lg:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl">
              Zara AI bridges the 600-million African population without dependable internet access to the generative AI economy. We transform Africa's dominant telecom channel—<b className="text-white">USSD</b>—into an intelligent conversational multi-agent marketplace with zero data, zero downloads, and zero user friction.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onLaunchSimulator()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg glow-emerald transition-all active:scale-95 cursor-pointer font-tech"
              >
                <span>Launch Interactive Prototype</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onLaunchSimulator('bank')}
                className="flex items-center gap-2 px-5 py-3 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700/80 transition-all cursor-pointer font-mono"
              >
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Test Apex Bank (*120*321#)</span>
              </button>
            </div>
          </div>

          {/* Key Stat Badges Grid */}
          <div className="w-full lg:w-[420px] grid grid-cols-2 gap-3 shrink-0">
            <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
              <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">90%+</div>
              <div className="text-xs text-slate-400 font-sans mt-1">Mobile Money in Africa Touches USSD</div>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
              <div className="text-3xl font-black text-cyan-400 font-mono tracking-tight">600M+</div>
              <div className="text-xs text-slate-400 font-sans mt-1">Offline & Data-Constrained Population</div>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
              <div className="text-3xl font-black text-amber-400 font-mono tracking-tight">40–60%</div>
              <div className="text-xs text-slate-400 font-sans mt-1">Drop-Off Rate on Legacy USSD Menus</div>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
              <div className="text-3xl font-black text-purple-400 font-mono tracking-tight">&lt; 20s</div>
              <div className="text-xs text-slate-400 font-sans mt-1">Average Zara AI Transaction Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: WHY AFRICANS STILL USE USSD */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Globe2 className="w-4 h-4" />
            <span>Infrastructure & Behavioral Realities</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-tech">
            Why Sub-Saharan Africa Still Runs on USSD
          </h2>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Despite smartphone proliferation, USSD remains the undisputed sovereign channel for commerce, utilities, banking, and government across the continent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-tech">1. Data Famine & Expense</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mobile data in Sub-Saharan Africa remains among the most expensive globally relative to minimum wage. Users intentionally keep mobile data permanently switched off to avoid background updates and ad telemetry draining their airtime.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-tech">2. Device Landscape Reality</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Over 45% of active devices in circulation are \$15 basic feature phones (Nokia 105, Itel, Tecno). Furthermore, millions of entry-level smartphones have full 16GB/32GB internal storage and cannot download heavy 50MB banking apps.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <WifiOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-tech">3. MAP / SS7 Signalling Resilience</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              USSD does not rely on TCP/IP data channels. It runs directly across the telecom signalling layer (SS7/MAP). During load-shedding power outages or tower congestion, data packets fail, but USSD commands still complete reliably.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <BatteryMedium className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-tech">4. Grid Instability & Battery Life</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              In townships and rural areas with frequent power outages, smartphones die within hours. Basic feature phones last 5 to 7 days on a single charge, making them the primary lifeline during regional blackouts.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-tech">5. Reverse Billing & Zero-Rating</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Telecom operators allow enterprise shortcodes (like *120* codes) to be reverse-billed to the bank or merchant. For the user, dialing is 100% free of charge and requires zero airtime balance.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-tech">6. Zero-Onboarding Muscle Memory</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              USSD codes are memorized, pasted on spaza shop counters, or saved in contacts. There are no app store downloads, APK malware risks, forgotten passwords, or biometric errors.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM WITH LEGACY USSD VS ZARA AI */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <Flame className="w-4 h-4" />
            <span>The Bottleneck</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-tech">
            The Fatal Flaw of Legacy USSD: The 20-Second Timeout
          </h2>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            While USSD has unmatched distribution, the user experience hasn't changed since 1997. Here is what happens when a consumer tries to buy electricity today versus with Zara AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Legacy Box */}
          <div className="glass-panel rounded-2xl p-6 border border-rose-500/30 bg-rose-950/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
              <div className="flex items-center gap-2 text-rose-400 font-bold font-tech text-base">
                <XCircle className="w-5 h-5" />
                <span>Conventional USSD (Menu Hell)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                40–60% DROP-OFF
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs text-slate-300">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span>Hop 1: Dial code *120*321#</span>
                <span className="text-slate-500">Wait 3s</span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span>Hop 2: Main Menu ➔ Reply 2 (Transact)</span>
                <span className="text-slate-500">Wait 3s</span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span>Hop 3: Transact ➔ Reply 3 (Prepaid)</span>
                <span className="text-slate-500">Wait 3s</span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span>Hop 4: Prepaid ➔ Reply 1 (Electricity)</span>
                <span className="text-slate-500">Wait 3s</span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span>Hop 5: Enter 11-digit Meter Number</span>
                <span className="text-slate-500">Wait 3s</span>
              </div>
              <div className="p-2 rounded bg-rose-900/40 border border-rose-500/40 text-rose-200 flex items-center justify-between font-bold">
                <span>Hop 6: "Session Timeout. Connection dropped."</span>
                <span className="text-rose-400">LOST REVENUE</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-sans italic pt-1">
              Telecom networks enforce strict 20-30s idle timeouts per hop. One hesitation or typo completely aborts the transaction.
            </p>
          </div>

          {/* Zara AI Box */}
          <div className="glass-panel rounded-2xl p-6 border border-emerald-500/40 bg-emerald-950/10 space-y-4 glow-emerald">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-tech text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>Zara AI USSD (Intent Routing)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                &gt; 85% CONVERSION
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs text-slate-200">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span>Hop 1: Dial *120*9272# or Partner Shortcode</span>
                <span className="text-emerald-400 font-bold">Fast MAP</span>
              </div>
              <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-white font-bold flex items-center justify-between">
                <span>User types: "Buy R100 electricity for meter 071234"</span>
                <span className="text-emerald-400">1 Hop NLU</span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span>Zara AI parses amount, extracts meter, confirms purchase</span>
                <span className="text-cyan-400">Zero Menus</span>
              </div>
              <div className="p-2.5 rounded bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-200 flex items-center justify-between font-bold">
                <span>STS Token Generated & Sent via SMS in 18 Seconds!</span>
                <span className="text-emerald-300">SUCCESS</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans pt-1">
              Zara compresses 6-8 nested menus into a single natural language interaction. Even if typed in vernacular isiZulu (<i>"Ngifuna ukuthenga ugesi"</i>), the token is issued instantly.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE DUAL VALUE PROPOSITION MATRIX */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            <span>Economic Impact</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-tech">
            The Value Proposition: Provider vs. End Customer
          </h2>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            A sustainable technology platform must deliver overwhelming commercial returns to the enterprise provider while solving urgent daily challenges for the end user.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-2xl overflow-hidden glass-panel border border-slate-800 text-left text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-300 font-tech uppercase tracking-wider text-[11px]">
                <th className="p-4 w-1/5">Dimension</th>
                <th className="p-4 w-2/5 text-cyan-300">Value to Enterprise / Provider (Bank / Telco / Retailer)</th>
                <th className="p-4 w-2/5 text-emerald-300">Value to End Customer (Citizen / Spaza Merchant)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-sans">
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-bold text-white font-tech">Transaction Conversion & Revenue</td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <b className="text-cyan-300 block mb-0.5">Slashes Session Abandonment by 35%–50%</b>
                  Collapsing 6 hops into 1 step eliminates timeout drop-offs, directly unlocking higher gross transaction volume across electricity, airtime, and bill payments.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <b className="text-emerald-300 block mb-0.5">Zero Frustration & Speed</b>
                  Completes transactions in under 20 seconds. No more staring at the screen wondering which numeric sub-menu contains their account.
                </td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-bold text-white font-tech">Call Center & Support OPEX</td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <b className="text-cyan-300 block mb-0.5">Deflects R15–R35 Inbound Call Costs</b>
                  Human call center calls cost enterprises R15 to R35 (\$1–\$2). USSD AI sessions cost pennies, saving tens of millions in support overhead.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <b className="text-emerald-300 block mb-0.5">Instant Answers without Waiting on Hold</b>
                  Gets real-time grant balance inquiries, account queries, and troubleshooting without spending 40 minutes on an IVR queue.
                </td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-bold text-white font-tech">Total Addressable Market (TAM)</td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <b className="text-cyan-300 block mb-0.5">100% Smartphone-Free Penetration</b>
                  Reaches the "offline 40%". No app store fees, no APK sideloading issues, zero smartphone obsolescence cycle.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <b className="text-emerald-300 block mb-0.5">Zero Exclusion</b>
                  Users are never told "please download our mobile app" when their phone does not have the operating system or storage capacity.
                </td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-bold text-white font-tech">Linguistic Inclusion (ESG)</td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <b className="text-cyan-300 block mb-0.5">Effortless Compliance & Vernacular Trust</b>
                  Fulfills financial inclusion mandates to serve citizens in home languages without hardcoding thousands of static menu translations.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <b className="text-emerald-300 block mb-0.5">Dignity in Mother Tongue</b>
                  Elderly citizens and non-English speakers interact with confidence in isiZulu, Sesotho, Hausa, or Afrikaans without error fears.
                </td>
              </tr>

              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-bold text-white font-tech">Marketplace & Consumer Insights</td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <b className="text-cyan-300 block mb-0.5">Unfiltered Intent Telemetry</b>
                  Traditional USSD only logs button clicks ("User clicked 2"). Zara records raw consumer queries, highlighting unmet local demand.
                </td>
                <td className="p-4 text-slate-300 leading-relaxed">
                  <b className="text-emerald-300 block mb-0.5">Generative AI on a Feature Phone</b>
                  Accesses expert smallholder crop advisory, CV builders, and business registration checklists typically reserved for laptop users.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: ENTERPRISE SHORTCODE INTEGRATION ARCHITECTURE */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            <span>Zero-Risk Enterprise Deployment</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-tech">
            How Enterprises Keep Their Existing Shortcodes
          </h2>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Banks, telecom aggregators, and retailers will not discard shortcodes they have marketed for a decade. Zara attaches directly to their existing infrastructure through two proven patterns:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pattern A */}
          <div className="glass-panel rounded-2xl p-6 border border-blue-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                PATTERN A: REVERSE PROXY
              </span>
              <span className="text-xs font-mono text-slate-400">e.g. Apex Bank (*120*321#)</span>
            </div>

            <h3 className="text-lg font-bold text-white font-tech">AI Front-Door with Legacy Tree Fallback</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Zara sits right in front of the bank's aggregator webhook. Option 1 allows the user to immediately type what they need in plain text. Option 2 preserves the legacy multi-tier banking tree 100% untouched for users who prefer muscle memory.
            </p>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <div className="text-emerald-400 font-bold">1. Type what you need (AI Assistant)</div>
              <div className="text-slate-400">2. Traditional Banking Menu (Legacy)</div>
              <div className="text-slate-400">3. Quick Balance</div>
              <div className="text-slate-400">4. Send Cash Voucher</div>
            </div>

            <button
              type="button"
              onClick={() => onLaunchSimulator('bank')}
              className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold pt-1 cursor-pointer"
            >
              <span>Test Pattern A on Phone Simulator</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pattern B */}
          <div className="glass-panel rounded-2xl p-6 border border-amber-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                PATTERN B: SUB-MENU INJECTION
              </span>
              <span className="text-xs font-mono text-slate-400">e.g. Kazang VAS (*120*7727#)</span>
            </div>

            <h3 className="text-lg font-bold text-white font-tech">Zero-Risk Additive Menu Injection</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The existing retail vending menu remains 100% identical for spaza shop merchants. Zara AI is injected as an additional option (Option 4). Users can access cross-VAS natural language routing and marketplace agents without risk.
            </p>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <div className="text-slate-400">1. Buy Airtime (Existing)</div>
              <div className="text-slate-400">2. Prepaid Electricity (Existing)</div>
              <div className="text-slate-400">3. Pay Bill / DStv (Existing)</div>
              <div className="text-amber-400 font-bold">4. Ask Zara AI (Type anything) ◄ Added</div>
            </div>

            <button
              type="button"
              onClick={() => onLaunchSimulator('vas')}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold pt-1 cursor-pointer"
            >
              <span>Test Pattern B on Phone Simulator</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BAR */}
      <section className="rounded-3xl glass-panel border border-emerald-500/30 p-8 text-center space-y-4 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-teal-950/30">
        <h2 className="text-2xl lg:text-3xl font-black text-white font-tech">
          Experience the Live Telecom Simulation
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto font-sans">
          Test real-time intent routing, 8 marketplace agents, simulated Eskom utility APIs, and cross-channel SMS delivery on our interactive phone simulator.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onLaunchSimulator()}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg glow-emerald transition-all active:scale-95 cursor-pointer font-tech"
          >
            <Smartphone className="w-4 h-4" />
            <span>Launch Interactive Simulator Now</span>
          </button>
        </div>
      </section>

    </div>
  );
};
