import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SessionManager } from './ussd/sessionManager';
import { PhoneSimulator } from './components/PhoneSimulator/PhoneSimulator';
import { ZaraEnginePanel } from './components/Engine/ZaraEnginePanel';
import { ArchitectureFlow } from './components/Engine/ArchitectureFlow';
import { EventLog } from './components/Engine/EventLog';
import { TopHeader } from './components/Controls/TopHeader';
import { ChannelToast } from './components/Controls/ChannelToast';
import { GuidedDemoBar } from './components/Controls/GuidedDemoBar';
import { UssdScreen, NetworkCondition } from './types/ussd';
import { EngineTelemetry, EventLogEntry } from './types/engine';
import { Smartphone, Activity, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const sessionMgr = SessionManager.getInstance();

  const [currentScreen, setCurrentScreen] = useState<UssdScreen | null>(null);
  const [isDialling, setIsDialling] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [routingAgentName, setRoutingAgentName] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState<string | undefined>();
  const [telemetry, setTelemetry] = useState<EngineTelemetry>(sessionMgr.getTelemetry());
  const [logs, setLogs] = useState<EventLogEntry[]>(sessionMgr.getEventLogs());
  const [networkCondition, setNetworkCondition] = useState<NetworkCondition>('normal');
  const [timeRemaining, setTimeRemaining] = useState(180);

  // Mobile active tab toggle
  const [mobileTab, setMobileTab] = useState<'phone' | 'engine'>('phone');

  // Guided Demo State
  const [guidedDemoActive, setGuidedDemoActive] = useState(false);
  const [guidedDemoPaused, setGuidedDemoPaused] = useState(false);
  const [demoStepIndex, setDemoStepIndex] = useState(0);
  const [demoStepDesc, setDemoStepDesc] = useState('');
  const demoTimeoutRef = useRef<any>(null);

  // Subscribe to SessionManager
  useEffect(() => {
    const unsub = sessionMgr.subscribe((t) => {
      setTelemetry(t);
      setLogs(sessionMgr.getEventLogs());
      setTimeRemaining(sessionMgr.getTimeRemaining());
      setCurrentScreen(sessionMgr.getCurrentScreen());
    });
    return unsub;
  }, [sessionMgr]);

  // Handle dialling *120*9272#
  const handleDial = async (code: string) => {
    setIsDialling(true);
    await new Promise(res => setTimeout(res, 600));
    setIsDialling(false);

    const ok = await sessionMgr.startDialling(code);
    if (ok) {
      setCurrentScreen(sessionMgr.getCurrentScreen());
    }
  };

  // Handle input submission from phone
  const handleSubmitReply = async (input: string) => {
    const currentScreenId = currentScreen?.id;

    // If user is submitting natural language query, show brief routing animation
    if (currentScreenId === 'natural-language-prompt') {
      setIsRouting(true);
      await new Promise(res => setTimeout(res, 450));
      setIsRouting(false);
    }

    // If user is confirming electricity purchase, show API processing animation
    if (currentScreenId === 'elec-confirm-purchase' && input === '1') {
      setIsProcessing(true);
      setProcessingMessage('Issuing STS Electricity Token via Utility Vendor API...');
      await new Promise(res => setTimeout(res, 500));
      setIsProcessing(false);
    }

    try {
      const nextScreen = await sessionMgr.submitInput(input);
      setCurrentScreen(nextScreen);
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  // End call
  const handleEndCall = () => {
    sessionMgr.endSession();
    setCurrentScreen(null);
  };

  // Network condition change
  const handleSelectNetworkCondition = (cond: NetworkCondition) => {
    setNetworkCondition(cond);
    sessionMgr.setNetworkCondition(cond);
  };

  // Scenario quick selector triggers
  const handleSelectScenario = async (scenarioId: string) => {
    handleEndCall();
    await new Promise(res => setTimeout(res, 200));

    if (scenarioId === 'bank') {
      await handleDial('*120*321#');
      return;
    } else if (scenarioId === 'vas') {
      await handleDial('*120*7727#');
      return;
    }

    // Dial Zara AI first
    await handleDial('*120*9272#');
    await new Promise(res => setTimeout(res, 400));

    if (scenarioId === 'electricity') {
      // Natural language electricity
      await handleSubmitReply('1');
      await new Promise(res => setTimeout(res, 300));
      await handleSubmitReply('Buy R100 electricity');
    } else if (scenarioId === 'jobs') {
      // Natural language jobs
      await handleSubmitReply('1');
      await new Promise(res => setTimeout(res, 300));
      await handleSubmitReply('Find me a job in technology');
    } else if (scenarioId === 'grant') {
      // Check grant
      await handleSubmitReply('1');
      await new Promise(res => setTimeout(res, 300));
      await handleSubmitReply('Check my grant');
    } else if (scenarioId === 'agri') {
      // Agriculture Generative AI
      await handleSubmitReply('1');
      await new Promise(res => setTimeout(res, 300));
      await handleSubmitReply('My maize leaves are yellow');
    } else if (scenarioId === 'credits') {
      // Buy AI Credits
      await handleSubmitReply('3');
      await new Promise(res => setTimeout(res, 300));
      await handleSubmitReply('1');
    } else if (scenarioId === 'zulu') {
      // isiZulu natural language routing
      await handleSubmitReply('1');
      await new Promise(res => setTimeout(res, 300));
      await handleSubmitReply('Ngifuna ukuthenga ugesi');
    }
  };

  // 14-Step Guided Demo Implementation
  const runDemoStep = useCallback(async (step: number) => {
    setDemoStepIndex(step);

    switch (step) {
      case 0:
        setDemoStepDesc('1/14: User opens phone dialler and dials Zara USSD service code: *120*9272#');
        handleEndCall();
        demoTimeoutRef.current = setTimeout(() => runDemoStep(1), 1600);
        break;

      case 1:
        setDemoStepDesc('2/14: Telecom network displays "USSD code running..." while connecting to Gateway');
        setIsDialling(true);
        demoTimeoutRef.current = setTimeout(async () => {
          setIsDialling(false);
          await sessionMgr.startDialling('*120*9272#');
          setCurrentScreen(sessionMgr.getCurrentScreen());
          runDemoStep(2);
        }, 1200);
        break;

      case 2:
        setDemoStepDesc('3/14: Zara AI Welcome Menu opens — presenting natural language and agent marketplace access');
        demoTimeoutRef.current = setTimeout(() => runDemoStep(3), 2200);
        break;

      case 3:
        setDemoStepDesc('4/14: User selects option "1. Tell Zara what you need" to request assistance');
        await handleSubmitReply('1');
        demoTimeoutRef.current = setTimeout(() => runDemoStep(4), 2000);
        break;

      case 4:
        setDemoStepDesc('5/14: User enters natural language request: "I need electricity"');
        demoTimeoutRef.current = setTimeout(() => runDemoStep(5), 2000);
        break;

      case 5:
        setDemoStepDesc('6/14: Zara AI Router extracts intent "purchase_electricity" with 98% confidence');
        setIsRouting(true);
        setRoutingAgentName('Electricity Agent');
        demoTimeoutRef.current = setTimeout(async () => {
          setIsRouting(false);
          await handleSubmitReply('I need electricity');
          runDemoStep(6);
        }, 1800);
        break;

      case 6:
        setDemoStepDesc('7/14: Handed off to Electricity Agent — user selects "1. Buy electricity"');
        demoTimeoutRef.current = setTimeout(async () => {
          await handleSubmitReply('1');
          runDemoStep(7);
        }, 2200);
        break;

      case 7:
        setDemoStepDesc('8/14: User enters prepaid meter number: "07123456789"');
        demoTimeoutRef.current = setTimeout(async () => {
          await handleSubmitReply('07123456789');
          runDemoStep(8);
        }, 2400);
        break;

      case 8:
        setDemoStepDesc('9/14: User selects amount bundle: "2. R100"');
        demoTimeoutRef.current = setTimeout(async () => {
          await handleSubmitReply('2');
          runDemoStep(9);
        }, 2200);
        break;

      case 9:
        setDemoStepDesc('10/14: Reviewing masked meter and amount: user confirms purchase with "1. Confirm"');
        demoTimeoutRef.current = setTimeout(async () => {
          setIsProcessing(true);
          setProcessingMessage('Invoking Eskom STS Utility Vendor API...');
          setTimeout(async () => {
            setIsProcessing(false);
            await handleSubmitReply('1');
            runDemoStep(10);
          }, 1400);
        }, 2200);
        break;

      case 10:
        setDemoStepDesc('11/14: Utility API issues 16-digit token "1234 5678 9012 3456", 1 credit deducted');
        demoTimeoutRef.current = setTimeout(() => runDemoStep(11), 2600);
        break;

      case 11:
        setDemoStepDesc('12/14: Cross-channel handoff: user selects "1. Send token by SMS"');
        demoTimeoutRef.current = setTimeout(async () => {
          await handleSubmitReply('1');
          runDemoStep(12);
        }, 2200);
        break;

      case 12:
        setDemoStepDesc('13/14: SMS notification delivered to customer phone with full STS token details');
        demoTimeoutRef.current = setTimeout(() => runDemoStep(13), 2800);
        break;

      case 13:
        setDemoStepDesc('14/14: Demo Complete! Real-world AI agent workflow executed end-to-end on USSD.');
        demoTimeoutRef.current = setTimeout(() => {
          setGuidedDemoActive(false);
        }, 4000);
        break;

      default:
        break;
    }
  }, [sessionMgr]);

  const handleStartGuidedDemo = () => {
    if (demoTimeoutRef.current) clearTimeout(demoTimeoutRef.current);
    setGuidedDemoActive(true);
    setGuidedDemoPaused(false);
    runDemoStep(0);
  };

  const handlePauseResumeDemo = () => {
    if (guidedDemoPaused) {
      setGuidedDemoPaused(false);
      runDemoStep(demoStepIndex);
    } else {
      setGuidedDemoPaused(true);
      if (demoTimeoutRef.current) clearTimeout(demoTimeoutRef.current);
    }
  };

  const handleRestartDemo = () => {
    if (demoTimeoutRef.current) clearTimeout(demoTimeoutRef.current);
    setGuidedDemoPaused(false);
    runDemoStep(0);
  };

  const handleCloseDemo = () => {
    if (demoTimeoutRef.current) clearTimeout(demoTimeoutRef.current);
    setGuidedDemoActive(false);
    setGuidedDemoPaused(false);
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Real-time SMS / WhatsApp Incoming Toast Notification */}
      <ChannelToast />

      {/* Top Header & Global Controls */}
      <TopHeader
        onStartGuidedDemo={handleStartGuidedDemo}
        onSelectScenario={handleSelectScenario}
        networkCondition={networkCondition}
        onSelectNetworkCondition={handleSelectNetworkCondition}
        timeRemaining={timeRemaining}
        isSessionActive={currentScreen !== null || isDialling}
      />

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex items-center justify-around bg-slate-900/90 border-b border-slate-800 p-2 text-xs font-mono">
        <button
          type="button"
          onClick={() => setMobileTab('phone')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all ${
            mobileTab === 'phone'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
              : 'text-slate-400'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Feature Phone</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('engine')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all ${
            mobileTab === 'engine'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
              : 'text-slate-400'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Zara AI Engine</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: FEATURE PHONE SIMULATOR (5 cols on lg) */}
          <section
            className={`lg:col-span-5 flex flex-col items-center justify-center ${
              mobileTab === 'phone' ? 'block' : 'hidden lg:flex'
            }`}
          >
            {/* Phone Heading & Context */}
            <div className="w-full max-w-[340px] mb-3 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                Generic Mobile Phone
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                USSD Sim 2G/3G
              </span>
            </div>

            {/* Hardware Phone Device */}
            <PhoneSimulator
              currentScreen={currentScreen}
              isDialling={isDialling}
              isRouting={isRouting}
              routingAgentName={routingAgentName}
              isProcessing={isProcessing}
              processingMessage={processingMessage}
              onDial={handleDial}
              onSubmitReply={handleSubmitReply}
              onEndCall={handleEndCall}
              networkName={telemetry.network}
            />

            {/* Sub-phone guidance banner */}
            <div className="w-full max-w-[340px] mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-xs font-semibold text-slate-300 mb-1 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Data & No Smartphone Required</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                Works on any mobile device across Africa. AI routes requests seamlessly into real-world transaction flows.
              </p>
            </div>
          </section>

          {/* RIGHT SIDE: ZARA AI ENGINE, ARCHITECTURE & EVENT STREAM (7 cols on lg) */}
          <section
            className={`lg:col-span-7 flex flex-col gap-6 ${
              mobileTab === 'engine' ? 'block' : 'hidden lg:flex'
            }`}
          >
            {/* 1. Live AI Engine Panel */}
            <ZaraEnginePanel telemetry={telemetry} />

            {/* 2. Interactive Architecture Pipeline */}
            <ArchitectureFlow
              activeNodes={telemetry.activeNodes}
              activeAgentName={telemetry.activeAgentName}
              lastApiName={telemetry.lastApiName}
              serviceCode={telemetry.serviceCode}
              partnerPattern={telemetry.partnerPattern}
            />

            {/* 3. Real-Time Developer Event Log */}
            <EventLog
              logs={logs}
              onClear={() => sessionMgr.clearLogs()}
            />
          </section>
        </div>
      </main>

      {/* Guided Executive Tour Floating Dock */}
      <GuidedDemoBar
        isActive={guidedDemoActive}
        isPaused={guidedDemoPaused}
        currentStepIndex={demoStepIndex}
        totalSteps={14}
        stepDescription={demoStepDesc}
        onPauseResume={handlePauseResumeDemo}
        onRestart={handleRestartDemo}
        onClose={handleCloseDemo}
      />

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500 font-mono mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Zara AI Orchestration Platform &copy; 2026. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>USSD Access Channel Prototype for Executive & Investor Demonstrations</span>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
