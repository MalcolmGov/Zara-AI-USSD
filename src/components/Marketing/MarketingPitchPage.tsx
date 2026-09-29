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
  ArrowUpRight,
  Server,
  Cpu,
  PhoneCall,
  Users,
  Radio,
  Database
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

      {/* SECTION 5: THE FUTURISTIC FRONTIER: MAKING THE IMPOSSIBLE POSSIBLE */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>World-First Innovations</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-tech">
            The Futuristic Frontier: Making the Impossible, Possible
          </h2>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            USSD was standardized in 1997 for GSM network diagnostics. Zara reimagines it as an autonomous, multi-agent edge AI interface—bringing capabilities to a $10 feature phone that the industry believed required 5G smartphones and heavy cloud apps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Predictive Zero-Hop */}
          <div className="glass-panel rounded-2xl p-6 border border-pink-500/30 space-y-4 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-pink-500/20 transition-all" />
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40 flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-pink-400" />
                  <span>PREDICTIVE ZERO-HOP</span>
                </span>
                <span className="text-xs font-mono text-slate-400">*120*9272*1#</span>
              </div>
              <h3 className="text-lg font-bold text-white font-tech">Contextual Telepathy Before Screen 1</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Aggregator webhooks pass MSISDN and Cell Tower CID. Zara joins this instantly with real-time external APIs (Eskom loadshedding schedule, weather, previous utility patterns).
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-pink-400 font-bold">1. Buy R100 Electricity (Soweto Meter #8492)</div>
                <div className="text-amber-400">2. Loadshedding in 25 min (Prep generator)</div>
                <div className="text-slate-400">3. Standard Zara Menu</div>
              </div>
              <p className="text-[11px] text-slate-400">
                <b className="text-slate-200">The Impossible:</b> Zero menu navigation. Predictive one-keypress execution for high-frequency township survival tasks.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onLaunchSimulator('predictive')}
              className="text-xs font-mono text-pink-400 hover:text-pink-300 flex items-center gap-1 font-bold pt-2 cursor-pointer relative z-10"
            >
              <span>Test Zero-Hop on Simulator</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Flash & Talk Voice Handoff */}
          <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 space-y-4 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                  <PhoneCall className="w-3 h-3 text-emerald-400" />
                  <span>FLASH &amp; TALK</span>
                </span>
                <span className="text-xs font-mono text-slate-400">*120*9272*0#</span>
              </div>
              <h3 className="text-lg font-bold text-white font-tech">Zero-Data Vernacular Voice Handoff</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Feature phone keyboards make typing tedious. User dials USSD and presses 1. Zara ends the USSD session and dispatches an instant SS7/SIP telecommunication callback within 800ms.
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-emerald-400 font-bold">Zara: "Sawubona Malcolm! Ngicela ukukusiza..."</div>
                <div className="text-slate-300">Carrier Line: Zero data consumed</div>
                <div className="text-slate-400">Dial: Freephone toll-free carrier link</div>
              </div>
              <p className="text-[11px] text-slate-400">
                <b className="text-slate-200">The Impossible:</b> High-bandwidth natural voice AI on any analog cellphone without requiring data bundles or smartphone hardware.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onLaunchSimulator('voice')}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold pt-2 cursor-pointer relative z-10"
            >
              <span>Test Voice Handoff on Simulator</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: The Spaza Swarm */}
          <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 space-y-4 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-cyan-400" />
                  <span>THE SPAZA SWARM</span>
                </span>
                <span className="text-xs font-mono text-slate-400">*120*9272*8#</span>
              </div>
              <h3 className="text-lg font-bold text-white font-tech">Autonomous Collective Bargaining</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Township micro-merchants lack wholesale purchasing power. Zara pools individual USSD orders across Alexandra &amp; Soweto into decentralized procurement swarms.
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-cyan-400 font-bold">42 Spazas Pooled: 350 bags Maize</div>
                <div className="text-emerald-400">Supplier Counter-Bid: -18.5% bulk rate</div>
                <div className="text-slate-400">Press 1 to confirm PO #8492</div>
              </div>
              <p className="text-[11px] text-slate-400">
                <b className="text-slate-200">The Impossible:</b> Wall Street-grade algorithmic purchasing power placed into the hands of informal township merchants over 2G.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onLaunchSimulator('spaza')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold pt-2 cursor-pointer relative z-10"
            >
              <span>Test Spaza Swarm on Simulator</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Secondary Futuristic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>GSM 7-Bit Semantic Compression</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Domain tokenizers and dynamic acronym packing compress complex agent decisions into a single 182-character frame without information loss.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>Zero-Data Physical World Actuation</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates 20-digit cryptographic STS utility tokens and smart solar inverter release codes, transforming basic 2G phones into physical IoT controllers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SIM-Bound Zero-Knowledge Attestation</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Utilizes the SIM card's IMSI/Ki cryptographic pairing and carrier HSS authentication to verify identity, eliminating fraud and insecure SMS OTPs.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: PRODUCTION DEPLOYMENT BLUEPRINT & INTEGRATION MATRIX */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Server className="w-4 h-4" />
            <span>Enterprise Implementation Architecture</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-tech">
            Production Deployment Blueprint &amp; Integration Matrix
          </h2>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Everything required to deploy Zara AI USSD into a tier-1 telecom, banking switch, or national utility infrastructure. Built for strict latency constraints, carrier compliance, and sovereign data residency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pillar 1: Telco Aggregator & MAP Layer */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Server className="w-4 h-4" />
              <span>1. Telco Aggregator &amp; MAP/HLR Gateway Layer</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connects directly to Mobile Network Operator (MNO) USSD Gateways (USSD-GW) via standard aggregator protocols or direct SS7 signaling.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-mono text-emerald-400 font-bold shrink-0">Aggregators:</span>
                <span className="text-slate-300">Africa's Talking, Infobip, Clickatell, or direct SIGTRAN / M3UA link to Vodacom, MTN, Telkom, Airtel.</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-mono text-amber-400 font-bold shrink-0">Latency SLA:</span>
                <span className="text-slate-300">Strict &lt; 2,500ms webhook round-trip. Gateway terminates session if total turn exceeds 3,000ms.</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-mono text-cyan-400 font-bold shrink-0">Regulatory:</span>
                <span className="text-slate-300">WASPA Code of Conduct &amp; ICASA shortcode allocation (*120* standard rated vs *130* reverse-billed/free to user).</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Sub-Second Multilingual AI Orchestration */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>2. Sub-Second Multilingual AI Orchestration</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dual-speed hybrid LLM pipeline designed specifically to fulfill telecom 2.5s timeouts while executing high-precision natural language understanding.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-mono text-cyan-400 font-bold shrink-0">Inference:</span>
                <span className="text-slate-300">Groq Llama-3.3-70B (&lt;350ms TTFT for intent &amp; slot extraction) + Claude 3.5 Haiku (complex multi-turn reasoning).</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-mono text-purple-400 font-bold shrink-0">Vernaculars:</span>
                <span className="text-slate-300">Lelapa AI Vulavula API for native South African language tokenization (isiZulu, Sesotho, Afrikaans, Xhosa).</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-mono text-emerald-400 font-bold shrink-0">Slang Dictionary:</span>
                <span className="text-slate-300">Custom township colloquial semantic embeddings ("chommie", "loadshedding", "stokvel", "airtime advance").</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Carrier Voice Telephony & IVR Infrastructure */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              <PhoneCall className="w-4 h-4" />
              <span>3. Carrier Voice Telephony &amp; Callback Engine</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Powers the "Flash &amp; Talk" voice handoff by bridging USSD session completion directly into zero-rated carrier voice circuits.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-mono text-emerald-400 font-bold shrink-0">Voice Bridge:</span>
                <span className="text-slate-300">Asterisk / FreeSWITCH cloud PBX cluster with SIP Trunking into Telkom/Vodacom/MTN carrier interconnects.</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-mono text-cyan-400 font-bold shrink-0">Speech Engine:</span>
                <span className="text-slate-300">ElevenLabs low-latency WebSocket neural TTS + Africa's Talking Voice API for instant dial-out callbacks.</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-mono text-amber-400 font-bold shrink-0">Zero Data:</span>
                <span className="text-slate-300">Calls run entirely over standard circuit-switched GSM voice channels. Zero internet access needed by user.</span>
              </div>
            </div>
          </div>

          {/* Pillar 4: Transactional & Utility Gateways */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>4. Transactional, Utility &amp; Banking Switches</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Secure enterprise connections for real-time value-added services, token issuance, and account balance reconciliation.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-mono text-amber-400 font-bold shrink-0">VAS Retail:</span>
                <span className="text-slate-300">Kazang, Flash, and Blu Label OpenAPI integration for airtime, data bundles, and municipal utilities.</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-mono text-emerald-400 font-bold shrink-0">STS Electricity:</span>
                <span className="text-slate-300">Eskom Key Management Centre (KMC) STS-6 standard token generator integration for instant 20-digit tokens.</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-mono text-blue-400 font-bold shrink-0">Banking Switch:</span>
                <span className="text-slate-300">ISO 8583 / BankservAfrica EFT switch integration with HSM PIN encryption for cash vouchers and payouts.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specification Summary Table */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white font-tech flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Infrastructure, Data Sovereignty &amp; Security Baseline</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="font-mono font-bold text-purple-400">POPIA Data Residency</div>
              <p className="text-slate-300 leading-relaxed">
                100% sovereign hosting in AWS Cape Town (af-south-1) or Azure South Africa North (Johannesburg). Zero consumer financial data crosses international borders.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="font-mono font-bold text-cyan-400">State &amp; Session Memory</div>
              <p className="text-slate-300 leading-relaxed">
                Distributed Redis Cluster with 180s TTL (&lt;5ms read/write). Manages ephemeral session state across stateless HTTP hops and handles drop recovery.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="font-mono font-bold text-emerald-400">Scalability &amp; Availability</div>
              <p className="text-slate-300 leading-relaxed">
                Kubernetes (EKS) auto-scaling pods sustaining 10,000 concurrent sessions/node with Cloudflare Enterprise DDoS shielding and 99.99% uptime carrier SLA.
              </p>
            </div>
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
