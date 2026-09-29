import { UssdSession, UssdScreen, NetworkCondition } from '../types/ussd';
import { EngineTelemetry, EventLogEntry, ArchitectureNodeId } from '../types/engine';
import { MenuRenderer } from './menuRenderer';
import { ChannelAdapter } from './channelAdapter';
import { IntentRouter } from '../ai/intentRouter';
import { AgentRegistry } from '../agents/agentRegistry';
import { CREDIT_BUNDLES, MockPaymentAPI } from '../services/mockPaymentAPI';
import { MARKETPLACE_AGENTS } from '../data/agentsData';

export type SessionEventListener = (telemetry: EngineTelemetry, event?: EventLogEntry) => void;

export class SessionManager {
  private static instance: SessionManager;

  private session: UssdSession | null = null;
  private timerInterval: any = null;
  private listeners: SessionEventListener[] = [];
  private eventLogs: EventLogEntry[] = [];
  private networkCondition: NetworkCondition = 'normal';

  // Persistence across sessions in the browser
  private creditsBalance = 48;
  private totalMonthlyUsed = 12;

  static getInstance(): SessionManager {
    if (!this.instance) {
      this.instance = new SessionManager();
    }
    return this.instance;
  }

  setNetworkCondition(cond: NetworkCondition) {
    this.networkCondition = cond;
    this.logEvent('INFO' as any, `Network profile changed to ${cond.toUpperCase()}`, { condition: cond });
  }

  getNetworkCondition(): NetworkCondition {
    return this.networkCondition;
  }

  subscribe(listener: SessionEventListener): () => void {
    this.listeners.push(listener);
    // Send immediate state
    listener(this.getTelemetry());
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(event?: EventLogEntry) {
    const telemetry = this.getTelemetry();
    this.listeners.forEach(fn => fn(telemetry, event));
  }

  getTelemetry(): EngineTelemetry {
    if (!this.session) {
      return {
        sessionId: 'IDLE',
        msisdn: '+27 82 *** 1234',
        channel: 'USSD (MAP/SS7)',
        network: 'MTN SA / Vodacom',
        language: 'en-ZA',
        durationSeconds: 0,
        sessionState: 'idle',
        partnerName: 'Zara AI Marketplace',
        partnerMode: 'Universal Open Marketplace',
        partnerPattern: 'Marketplace',
        serviceCode: '*120*9272#',
        startingBalance: 48,
        creditsConsumed: 0,
        remainingBalance: this.creditsBalance,
        activeNodes: ['feature-phone']
      };
    }

    const duration = Math.floor((Date.now() - this.session.startTime) / 1000);
    const intentRes = this.session.sessionData['lastIntentResult'];
    const pConf = this.session.partnerConfig;

    return {
      sessionId: this.session.sessionId,
      msisdn: this.session.msisdn,
      channel: 'USSD (MAP/SS7)',
      network: this.session.networkName,
      language: this.session.language,
      durationSeconds: duration,
      sessionState: this.session.isExpired ? 'expired' : 'active',
      partnerName: pConf.name,
      partnerMode: pConf.patternName,
      partnerPattern: pConf.patternType,
      serviceCode: pConf.code,
      lastUserInput: this.session.sessionData['lastUserInput'],
      intentResult: intentRes,
      activeAgentId: this.session.activeAgentId,
      activeAgentName: this.session.sessionData['activeAgentName'],
      currentWorkflow: this.session.currentWorkflow,
      workflowStep: this.session.workflowStep,
      workflowStatus: this.session.sessionData['workflowStatus'],
      lastApiName: this.session.sessionData['lastApiName'],
      lastApiEndpoint: this.session.sessionData['lastApiEndpoint'],
      lastLatencyMs: this.session.sessionData['lastLatencyMs'],
      lastApiStatus: this.session.sessionData['lastApiStatus'],
      lastApiResult: this.session.sessionData['lastApiResult'],
      startingBalance: 48,
      creditsConsumed: Math.max(0, 48 - this.creditsBalance),
      remainingBalance: this.creditsBalance,
      activeNodes: this.session.sessionData['activeNodes'] || ['feature-phone', 'ussd-gateway']
    };
  }

  getEventLogs(): EventLogEntry[] {
    return [...this.eventLogs];
  }

  clearLogs() {
    this.eventLogs = [];
    this.notify();
  }

  private logEvent(
    type: any,
    title: string,
    metadata?: Record<string, any>,
    level: 'info' | 'success' | 'warning' | 'error' = 'info'
  ): EventLogEntry {
    const timeStr = new Date().toLocaleTimeString('en-ZA', { hour12: false });
    const entry: EventLogEntry = {
      id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: timeStr,
      type,
      title,
      metadata,
      level
    };
    this.eventLogs.unshift(entry);
    return entry;
  }

  private returnToHome(): UssdScreen {
    if (!this.session) return MenuRenderer.getHomeScreen('en-ZA');
    let home: UssdScreen;
    if (this.session.partnerConfig.mode === 'bank_frontdoor') {
      home = MenuRenderer.getBankHomeScreen();
    } else if (this.session.partnerConfig.mode === 'vas_injection') {
      home = MenuRenderer.getVasHomeScreen();
    } else {
      home = MenuRenderer.getHomeScreen(this.session.language);
    }

    this.session.activeAgentId = undefined;
    this.session.currentWorkflow = undefined;
    this.session.sessionData['activeAgentName'] = undefined;
    this.session.sessionData['workflowStatus'] = undefined;
    this.session.sessionData['activeNodes'] = this.session.partnerConfig.patternType !== 'Marketplace'
      ? ['feature-phone', 'ussd-gateway', 'enterprise-hook', 'channel-adapter']
      : ['feature-phone', 'ussd-gateway', 'channel-adapter'];
    this.session.currentScreen = home;
    this.notify();
    return home;
  }

  async startDialling(dialledString: string): Promise<boolean> {
    if (!ChannelAdapter.isServiceCode(dialledString)) {
      this.logEvent('ERROR_OCCURRED', `Invalid USSD code dialled: "${dialledString}"`, { code: dialledString }, 'warning');
      return false;
    }

    const partnerConfig = ChannelAdapter.getPartnerConfig(dialledString);
    const sessionId = `ussd-${Math.random().toString(36).substring(2, 8)}`;
    
    let homeScreen: UssdScreen;
    if (partnerConfig.mode === 'bank_frontdoor') {
      homeScreen = MenuRenderer.getBankHomeScreen();
    } else if (partnerConfig.mode === 'vas_injection') {
      homeScreen = MenuRenderer.getVasHomeScreen();
    } else {
      homeScreen = MenuRenderer.getHomeScreen('en-ZA');
    }

    const initialNodes = partnerConfig.patternType !== 'Marketplace'
      ? ['feature-phone', 'ussd-network', 'ussd-gateway', 'enterprise-hook', 'channel-adapter']
      : ['feature-phone', 'ussd-network', 'ussd-gateway', 'channel-adapter'];

    this.session = {
      sessionId,
      msisdn: '+27 82 458 1234',
      channel: 'USSD',
      networkName: 'Demo Mobile (MTN/Vodacom)',
      language: 'en-ZA',
      startTime: Date.now(),
      lastActiveTime: Date.now(),
      timeRemaining: 180,
      isExpired: false,
      currentScreen: homeScreen,
      screenHistory: [],
      sessionData: {
        activeNodes: initialNodes
      },
      creditsRemaining: this.creditsBalance,
      partnerConfig
    };

    const evt = this.logEvent('SESSION_STARTED', `USSD session initiated via ${dialledString} [${partnerConfig.name}]`, {
      sessionId,
      msisdn: '+27 82 *** 1234',
      channel: 'USSD',
      partner: partnerConfig.name,
      pattern: partnerConfig.patternName
    }, 'success');

    this.startTimer();
    this.notify(evt);
    return true;
  }

  private startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      if (!this.session) {
        clearInterval(this.timerInterval);
        return;
      }

      this.session.timeRemaining -= 1;

      if (this.session.timeRemaining <= 0) {
        this.session.isExpired = true;
        this.session.currentScreen = MenuRenderer.getExpiredScreen();
        clearInterval(this.timerInterval);
        const evt = this.logEvent('SESSION_EXPIRED', 'USSD session expired after 180s inactivity', {}, 'warning');
        this.notify(evt);
      } else {
        this.notify();
      }
    }, 1000);
  }

  resetTimer() {
    if (this.session) {
      this.session.timeRemaining = 180;
      this.session.lastActiveTime = Date.now();
    }
  }

  endSession() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    const sessId = this.session?.sessionId;
    this.session = null;
    const evt = this.logEvent('SESSION_ENDED', 'USSD session closed by user', { sessionId: sessId });
    this.notify(evt);
  }

  getCurrentScreen(): UssdScreen | null {
    return this.session?.currentScreen || null;
  }

  getTimeRemaining(): number {
    return this.session?.timeRemaining || 0;
  }

  async submitInput(input: string): Promise<UssdScreen> {
    if (!this.session) {
      throw new Error('No active session');
    }

    this.resetTimer();
    const cleanInput = input.trim();
    this.session.sessionData['lastUserInput'] = cleanInput;

    this.logEvent('USER_INPUT_RECEIVED', `User entered: "${cleanInput}"`, {
      input: cleanInput,
      screenId: this.session.currentScreen.id
    });

    try {
      const nextScreen = await ChannelAdapter.simulateNetworkTransmission(
        () => this.processInputLogic(cleanInput),
        this.networkCondition
      );
      if (this.session) {
        this.session.currentScreen = nextScreen;
        this.notify();
      }
      return nextScreen;
    } catch (err: any) {
      if (err.message === 'USSD_TIMEOUT') {
        const timeoutScreen = MenuRenderer.getTimeoutErrorScreen();
        this.session.currentScreen = timeoutScreen;
        this.logEvent('ERROR_OCCURRED', 'Network timeout during transmission', {}, 'error');
        this.notify();
        return timeoutScreen;
      }
      throw err;
    }
  }

  private async processInputLogic(input: string): Promise<UssdScreen> {
    if (!this.session) throw new Error('No session');

    const screen = this.session.currentScreen;
    this.session.sessionData['currentScreenId'] = screen.id;

    // 1. Check Exit from Home screens
    if (input === '0' && (screen.id === 'home' || screen.id === 'bank-home' || screen.id === 'vas-home')) {
      this.endSession();
      return MenuRenderer.getExpiredScreen();
    }

    // 2. Generic check: does user selection match a "Main menu" or "Exit" option?
    const matchingOption = screen.options?.find(opt => opt.key === input);
    if (matchingOption) {
      const lower = matchingOption.label.toLowerCase();
      if (lower.includes('main menu')) {
        return this.returnToHome();
      }
      if (lower === 'exit' || lower === '0. exit') {
        this.endSession();
        return MenuRenderer.getExpiredScreen();
      }
    }

    // 2A. Pattern A: Apex Bank Home Screen (*120*321#)
    if (screen.id === 'bank-home') {
      this.session.screenHistory.push(screen);

      if (input === '1') {
        // Natural Language Intent input via Bank Front-Door
        this.logEvent('AGENT_SELECTED', 'Apex Bank front-door routed to Zara AI Natural Language Router');
        const nlpScreen = MenuRenderer.getNaturalLanguageInputScreen(this.session.language);
        this.session.currentScreen = nlpScreen;
        this.session.sessionData['activeNodes'] = ['feature-phone', 'ussd-gateway', 'enterprise-hook', 'channel-adapter', 'ai-router'];
        this.notify();
        return nlpScreen;
      } else if (input === '2') {
        // Traditional Banking Menu (Legacy Tree)
        this.logEvent('SESSION_STARTED', 'Switched to Apex Bank legacy tree menu (Pattern A Fallback)');
        const legacyScreen = MenuRenderer.getBankLegacyMenuScreen();
        this.session.currentScreen = legacyScreen;
        this.session.sessionData['activeNodes'] = ['feature-phone', 'ussd-gateway', 'enterprise-hook'];
        this.notify();
        return legacyScreen;
      } else if (input === '3') {
        // Quick Balance: dispatch to Financial Agent
        const agent = AgentRegistry.getAgent('financial');
        this.session.activeAgentId = agent.id;
        this.session.sessionData['activeAgentName'] = agent.name;
        this.session.sessionData['activeNodes'] = ['feature-phone', 'ussd-gateway', 'enterprise-hook', 'selected-agent'];
        const agentResponse = await agent.handle('2', {
          sessionId: this.session.sessionId,
          msisdn: this.session.msisdn,
          language: this.session.language,
          entities: {},
          sessionData: { ...this.session.sessionData, currentScreenId: 'fin-main-menu' },
          creditsRemaining: this.creditsBalance
        });
        this.applyAgentResponse(agentResponse);
        return this.session.currentScreen;
      } else if (input === '4') {
        // Send Cash Voucher: dispatch to Financial Agent
        const agent = AgentRegistry.getAgent('financial');
        this.session.activeAgentId = agent.id;
        this.session.sessionData['activeAgentName'] = agent.name;
        this.session.sessionData['activeNodes'] = ['feature-phone', 'ussd-gateway', 'enterprise-hook', 'selected-agent'];
        const agentResponse = await agent.handle('1', {
          sessionId: this.session.sessionId,
          msisdn: this.session.msisdn,
          language: this.session.language,
          entities: {},
          sessionData: { ...this.session.sessionData, currentScreenId: 'fin-main-menu' },
          creditsRemaining: this.creditsBalance
        });
        this.applyAgentResponse(agentResponse);
        return this.session.currentScreen;
      } else {
        return {
          ...screen,
          prompt: `Invalid option.\n\n${screen.prompt}`
        };
      }
    }

    // 2B. Pattern A: Apex Bank Legacy Menu
    if (screen.id === 'bank-legacy-menu') {
      if (input === '0') {
        return this.returnToHome();
      } else if (input === '1') {
        return {
          id: 'bank-legacy-balance',
          type: 'menu',
          title: 'Account Balances',
          prompt: 'Apex Bank Accounts:\n• Cheque (...4821): R14,250.80\n• Savings (...9012): R3,420.00\n• Notice (...1142): R50,000.00\n\n0. Back',
          options: [{ key: '0', label: 'Back' }],
          footer: 'Reply:'
        };
      } else if (input === '2') {
        return {
          id: 'bank-legacy-transfer',
          type: 'input',
          title: 'Transfer Funds',
          prompt: 'Apex Bank Transfer\n\nEnter recipient account number:\n(9-11 digits)',
          allowTextInput: true,
          footer: 'Reply:'
        };
      } else if (input === '3') {
        // Buy Prepaid Power -> Cross-routed to Electricity Agent
        this.logEvent('AGENT_SELECTED', 'Apex Bank cross-routed to Zara Electricity Agent');
        const agent = AgentRegistry.getAgent('electricity');
        this.session.activeAgentId = agent.id;
        this.session.sessionData['activeAgentName'] = agent.name;
        this.session.sessionData['activeNodes'] = ['feature-phone', 'ussd-gateway', 'enterprise-hook', 'selected-agent'];
        const agentResponse = await agent.start({
          sessionId: this.session.sessionId,
          msisdn: this.session.msisdn,
          language: this.session.language,
          entities: {},
          sessionData: this.session.sessionData,
          creditsRemaining: this.creditsBalance
        });
        this.applyAgentResponse(agentResponse);
        return this.session.currentScreen;
      } else if (input === '4') {
        return {
          id: 'bank-legacy-notice',
          type: 'menu',
          title: '32-Day Notice',
          prompt: '32-Day Notice Account\nBalance: R50,000.00\nInterest: 8.75% p.a.\n\n0. Back',
          options: [{ key: '0', label: 'Back' }],
          footer: 'Reply:'
        };
      } else {
        return {
          ...screen,
          prompt: `Invalid option.\n\n${screen.prompt}`
        };
      }
    }

    if (screen.id === 'bank-legacy-balance' || screen.id === 'bank-legacy-notice') {
      if (input === '0') {
        const legacyScreen = MenuRenderer.getBankLegacyMenuScreen();
        this.session.currentScreen = legacyScreen;
        this.notify();
        return legacyScreen;
      }
    }

    // 2C. Pattern B: Kazang / Blue Label VAS Home Screen (*120*7727#)
    if (screen.id === 'vas-home') {
      this.session.screenHistory.push(screen);

      if (input === '1') {
        return {
          id: 'vas-airtime',
          type: 'input',
          title: 'Buy Airtime',
          prompt: 'Kazang Airtime Vending\n\nEnter Cell Number:\n(e.g. 0821234567)',
          allowTextInput: true,
          footer: 'Reply:'
        };
      } else if (input === '2') {
        // Prepaid Electricity -> Hand off to Electricity Agent
        this.logEvent('AGENT_SELECTED', 'Kazang VAS routed to Zara Electricity Agent');
        const agent = AgentRegistry.getAgent('electricity');
        this.session.activeAgentId = agent.id;
        this.session.sessionData['activeAgentName'] = agent.name;
        this.session.sessionData['activeNodes'] = ['feature-phone', 'ussd-gateway', 'enterprise-hook', 'selected-agent'];
        const agentResponse = await agent.start({
          sessionId: this.session.sessionId,
          msisdn: this.session.msisdn,
          language: this.session.language,
          entities: {},
          sessionData: this.session.sessionData,
          creditsRemaining: this.creditsBalance
        });
        this.applyAgentResponse(agentResponse);
        return this.session.currentScreen;
      } else if (input === '3') {
        return {
          id: 'vas-bill',
          type: 'input',
          title: 'Pay Bill / DStv',
          prompt: 'Kazang Bill Payments\n\nEnter DStv / Account Number:\n(e.g. 40291823)',
          allowTextInput: true,
          footer: 'Reply:'
        };
      } else if (input === '4') {
        // Pattern B: Sub-Menu Injection -> Option 4 "Ask Zara AI (Type anything)"
        this.logEvent('AGENT_SELECTED', 'Kazang VAS Menu Injection triggered -> Zara AI Natural Language Router');
        const nlpScreen = MenuRenderer.getNaturalLanguageInputScreen(this.session.language);
        this.session.currentScreen = nlpScreen;
        this.session.sessionData['activeNodes'] = ['feature-phone', 'ussd-gateway', 'enterprise-hook', 'channel-adapter', 'ai-router'];
        this.notify();
        return nlpScreen;
      } else {
        return {
          ...screen,
          prompt: `Invalid option.\n\n${screen.prompt}`
        };
      }
    }

    // 2. Main Menu Actions
    if (screen.id === 'home') {
      this.session.screenHistory.push(screen);

      if (input === '1') {
        // Natural Language Intent input
        const nlpScreen = MenuRenderer.getNaturalLanguageInputScreen(this.session.language);
        this.session.currentScreen = nlpScreen;
        this.session.sessionData['activeNodes'] = ['feature-phone', 'ussd-gateway', 'channel-adapter', 'ai-router'];
        this.notify();
        return nlpScreen;
      } else if (input === '2') {
        // Browse Agents Marketplace
        const browseScreen = MenuRenderer.getBrowseAgentsScreen();
        this.session.currentScreen = browseScreen;
        this.session.sessionData['activeNodes'] = ['feature-phone', 'ussd-gateway', 'agent-marketplace'];
        this.notify();
        return browseScreen;
      } else if (input === '3') {
        // Credits
        const creditsScreen = MenuRenderer.getCreditsScreen(this.creditsBalance, this.totalMonthlyUsed);
        this.session.currentScreen = creditsScreen;
        this.notify();
        return creditsScreen;
      } else if (input === '4') {
        // Recent activity
        const activityScreen = MenuRenderer.getRecentActivityScreen();
        this.session.currentScreen = activityScreen;
        this.notify();
        return activityScreen;
      } else if (input === '5') {
        // Change language
        const langScreen = MenuRenderer.getChangeLanguageScreen();
        this.session.currentScreen = langScreen;
        this.notify();
        return langScreen;
      } else {
        // Invalid input
        return {
          ...screen,
          prompt: `Invalid option.\n\n${screen.prompt}`
        };
      }
    }

    // 3. Natural Language Input Screen -> Trigger AI Router
    if (screen.id === 'natural-language-prompt') {
      this.logEvent('INTENT_DETECTED', `Analysing input: "${input}" with Zara AI Router...`);

      // Route intent
      const intentRes = IntentRouter.routeIntent(input);
      this.session.sessionData['lastIntentResult'] = intentRes;
      this.session.language = intentRes.language;

      this.logEvent('INTENT_DETECTED', `Intent classified: "${intentRes.intent}" (${Math.round(intentRes.confidence * 100)}%)`, {
        intent: intentRes.intent,
        confidence: intentRes.confidence,
        entities: intentRes.entities
      }, 'success');

      this.logEvent('LANGUAGE_DETECTED', `Language detected: ${intentRes.languageName} (${intentRes.language})`, {
        language: intentRes.language
      });

      this.logEvent('AGENT_SELECTED', `Marketplace dispatched to: ${intentRes.agentName}`, {
        agentId: intentRes.agentId,
        workflow: intentRes.suggestedWorkflow
      }, 'info');

      // Update architecture highlight
      const activeNodes: ArchitectureNodeId[] = [
        'feature-phone',
        'ussd-gateway',
        'channel-adapter',
        'ai-router',
        'agent-marketplace',
        'selected-agent'
      ];
      if (this.session.partnerConfig && this.session.partnerConfig.patternType !== 'Marketplace') {
        activeNodes.splice(2, 0, 'enterprise-hook');
      }
      this.session.sessionData['activeNodes'] = activeNodes;

      // Hand off to selected agent
      const agent = AgentRegistry.getAgent(intentRes.agentId);
      this.session.activeAgentId = agent.id;
      this.session.sessionData['activeAgentName'] = agent.name;
      this.session.currentWorkflow = intentRes.suggestedWorkflow;

      const agentContext = {
        sessionId: this.session.sessionId,
        msisdn: this.session.msisdn,
        language: this.session.language,
        entities: intentRes.entities,
        sessionData: this.session.sessionData,
        creditsRemaining: this.creditsBalance
      };

      const agentResponse = await agent.start(agentContext);
      this.applyAgentResponse(agentResponse);
      return this.session.currentScreen;
    }

    // 4. Browse Agents Selection
    if (screen.id === 'browse-agents') {
      if (input === '0') {
        const home = MenuRenderer.getHomeScreen(this.session.language);
        this.session.currentScreen = home;
        this.notify();
        return home;
      }

      const idx = parseInt(input, 10) - 1;
      const agentMeta = MARKETPLACE_AGENTS[idx];
      if (agentMeta) {
        this.logEvent('AGENT_SELECTED', `Marketplace selected: ${agentMeta.name}`, { agentId: agentMeta.id });
        const agent = AgentRegistry.getAgent(agentMeta.id);
        this.session.activeAgentId = agent.id;
        this.session.sessionData['activeAgentName'] = agent.name;
        this.session.sessionData['activeNodes'] = ['feature-phone', 'agent-marketplace', 'selected-agent'];

        const agentContext = {
          sessionId: this.session.sessionId,
          msisdn: this.session.msisdn,
          language: this.session.language,
          entities: {},
          sessionData: this.session.sessionData,
          creditsRemaining: this.creditsBalance
        };

        const agentResponse = await agent.start(agentContext);
        this.applyAgentResponse(agentResponse);
        return this.session.currentScreen;
      }
    }

    // 5. Credits Flow
    if (screen.id === 'credits-menu') {
      if (input === '1') {
        const buyScreen = MenuRenderer.getBuyCreditsScreen();
        this.session.currentScreen = buyScreen;
        this.notify();
        return buyScreen;
      } else if (input === '2') {
        return {
          id: 'credits-history',
          type: 'menu',
          title: 'Credits History',
          prompt: `Credits History:\n• 18 Sep: +50 credits (Airtime)\n• 18 Sep: -1 credit (Electricity)\n• 02 Sep: -1 credit (Agri Diagnosis)\n\n0. Back`,
          options: [{ key: '0', label: 'Back' }],
          footer: 'Reply:'
        };
      } else if (input === '0') {
        const home = MenuRenderer.getHomeScreen(this.session.language);
        this.session.currentScreen = home;
        this.notify();
        return home;
      }
    }

    if (screen.id === 'credits-bundles') {
      if (input === '0') {
        const credScreen = MenuRenderer.getCreditsScreen(this.creditsBalance, this.totalMonthlyUsed);
        this.session.currentScreen = credScreen;
        this.notify();
        return credScreen;
      }

      const bIndex = parseInt(input, 10) - 1;
      const bundle = CREDIT_BUNDLES[bIndex] || CREDIT_BUNDLES[1];
      this.session.sessionData['selectedBundle'] = bundle;

      const payScreen = MenuRenderer.getPaymentMethodScreen(bundle.description);
      this.session.currentScreen = payScreen;
      this.notify();
      return payScreen;
    }

    if (screen.id === 'credits-payment-method') {
      if (input === '0') {
        const buyScreen = MenuRenderer.getBuyCreditsScreen();
        this.session.currentScreen = buyScreen;
        this.notify();
        return buyScreen;
      }

      let method: 'Airtime' | 'Mobile Money' | 'Bank' = 'Airtime';
      if (input === '2') method = 'Mobile Money';
      else if (input === '3') method = 'Bank';

      const bundle = this.session.sessionData['selectedBundle'] || CREDIT_BUNDLES[1];

      this.logEvent('API_CALLED', `Billing Payment Gateway: charging R${bundle.costZar} via ${method}`, {
        method,
        amount: bundle.costZar,
        bundle: bundle.description
      });

      const res = await MockPaymentAPI.purchaseCredits(bundle.id, method);
      this.creditsBalance += bundle.credits;

      this.logEvent('CREDITS_ADDED', `Purchased ${bundle.credits} AI credits via ${method}`, {
        added: bundle.credits,
        newBalance: this.creditsBalance,
        txId: res.txId
      }, 'success');

      const successScreen = MenuRenderer.getCreditsSuccessScreen(bundle.credits, this.creditsBalance);
      this.session.currentScreen = successScreen;
      this.notify();
      return successScreen;
    }

    // 6. Language Selection
    if (screen.id === 'change-language') {
      let langCode = 'en-ZA';
      if (input === '2') langCode = 'zu-ZA';
      else if (input === '3') langCode = 'st-ZA';
      else if (input === '4') langCode = 'af-ZA';

      this.session.language = langCode;
      this.logEvent('LANGUAGE_DETECTED', `Session language set to ${langCode}`, { lang: langCode });

      const home = MenuRenderer.getHomeScreen(langCode);
      this.session.currentScreen = home;
      this.notify();
      return home;
    }

    // 7. General Back to Main Menu from result screens
    if (input === '0' || input === '2' && (screen.id === 'elec-success' || screen.id === 'elec-sms-sent' || screen.id === 'gov-grant-result' || screen.id === 'credits-success' || screen.id === 'agri-dispatched' || screen.id === 'job-sms-sent')) {
      return this.returnToHome();
    }

    // 8. If an active agent is handling the workflow
    if (this.session.activeAgentId) {
      const agent = AgentRegistry.getAgent(this.session.activeAgentId);
      const agentContext = {
        sessionId: this.session.sessionId,
        msisdn: this.session.msisdn,
        language: this.session.language,
        entities: this.session.sessionData['lastIntentResult']?.entities || {},
        sessionData: this.session.sessionData,
        creditsRemaining: this.creditsBalance
      };

      const agentResponse = await agent.handle(input, agentContext);
      this.applyAgentResponse(agentResponse);
      return this.session.currentScreen;
    }

    // Fallback: return to home
    const home = MenuRenderer.getHomeScreen(this.session.language);
    this.session.currentScreen = home;
    this.notify();
    return home;
  }

  private applyAgentResponse(res: any) {
    if (!this.session) return;

    this.session.currentScreen = res.screen;

    if (res.workflowState) {
      this.session.currentWorkflow = res.workflowState.workflowName;
      this.session.workflowStep = res.workflowState.step;
      this.session.sessionData['workflowStatus'] = res.workflowState.status;
      this.logEvent('WORKFLOW_STEP', `${res.workflowState.workflowName} (Step ${res.workflowState.step}): ${res.workflowState.status}`, {
        workflow: res.workflowState.workflowName,
        step: res.workflowState.step
      });
    }

    if (res.apiCall) {
      this.session.sessionData['lastApiName'] = res.apiCall.name;
      this.session.sessionData['lastApiEndpoint'] = res.apiCall.endpoint;
      this.session.sessionData['lastLatencyMs'] = res.apiCall.latencyMs;
      this.session.sessionData['lastApiStatus'] = res.apiCall.status;
      this.session.sessionData['lastApiResult'] = JSON.stringify(res.apiCall.result);

      this.logEvent('API_CALLED', `Invoked ${res.apiCall.name} [${res.apiCall.latencyMs}ms]`, {
        endpoint: res.apiCall.endpoint,
        payload: res.apiCall.payload,
        result: res.apiCall.result
      }, 'info');

      // Update active node to Enterprise API
      this.session.sessionData['activeNodes'] = [
        'feature-phone',
        'ussd-gateway',
        'ai-router',
        'selected-agent',
        'enterprise-api'
      ];
    }

    if (res.creditCost && res.creditCost > 0) {
      this.creditsBalance = Math.max(0, this.creditsBalance - res.creditCost);
      this.logEvent('CREDITS_DEDUCTED', `Deducted ${res.creditCost} AI Credit for transaction execution`, {
        cost: res.creditCost,
        remaining: this.creditsBalance
      });
    }

    if (res.crossChannelDispatch) {
      this.logEvent('CROSS_CHANNEL_DISPATCH', `Dispatched response via ${res.crossChannelDispatch.channel.toUpperCase()} to ${res.crossChannelDispatch.recipient}`, {
        channel: res.crossChannelDispatch.channel,
        content: res.crossChannelDispatch.content
      }, 'success');

      // Light up cross-channel node
      this.session.sessionData['activeNodes'] = [
        'feature-phone',
        'selected-agent',
        'cross-channel'
      ];
    }

    this.notify();
  }
}
