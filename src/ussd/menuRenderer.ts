import { UssdScreen } from '../types/ussd';
import { LANGUAGES } from '../data/languagesData';
import { MARKETPLACE_AGENTS } from '../data/agentsData';

export class MenuRenderer {
  static getHomeScreen(langCode = 'en-ZA'): UssdScreen {
    const lang = LANGUAGES[langCode] || LANGUAGES['en-ZA'];
    return {
      id: 'home',
      type: 'menu',
      title: lang.welcomeTitle,
      header: lang.welcomeTitle,
      prompt: `${lang.welcomeTitle}\n${lang.welcomeSubtitle}\n\n${lang.menuOption1}\n${lang.menuOption2}\n${lang.menuOption3}\n${lang.menuOption4}\n${lang.menuOption5}\n\n${lang.exitOption}`,
      options: [
        { key: '1', label: lang.menuOption1 },
        { key: '2', label: lang.menuOption2 },
        { key: '3', label: lang.menuOption3 },
        { key: '4', label: lang.menuOption4 },
        { key: '5', label: lang.menuOption5 },
        { key: '0', label: lang.exitOption }
      ],
      footer: lang.replyPlaceholder
    };
  }

  // Pattern A: Apex Bank (AI Front-Door / Reverse Proxy)
  static getBankHomeScreen(): UssdScreen {
    return {
      id: 'bank-home',
      type: 'menu',
      title: 'Apex Bank (*120*321#)',
      prompt: 'Apex Bank Mobile\n[Pattern A: AI Front-Door]\n\n1. Type what you need (AI Assistant)\n2. Traditional Banking Menu\n3. Quick Balance\n4. Send Cash Voucher\n\n0. Exit',
      options: [
        { key: '1', label: 'Type what you need (AI Assistant)' },
        { key: '2', label: 'Traditional Banking Menu' },
        { key: '3', label: 'Quick Balance' },
        { key: '4', label: 'Send Cash Voucher' },
        { key: '0', label: 'Exit' }
      ],
      footer: 'Reply:'
    };
  }

  static getBankLegacyMenuScreen(): UssdScreen {
    return {
      id: 'bank-legacy-menu',
      type: 'menu',
      title: 'Apex Bank (Legacy Tree)',
      prompt: 'Apex Bank - Legacy Menu\n(Multi-tier classic tree)\n\n1. Balances & Statements\n2. Transfer to Account\n3. Buy Prepaid Power\n4. Notice Accounts\n\n0. Main menu',
      options: [
        { key: '1', label: 'Balances & Statements' },
        { key: '2', label: 'Transfer to Account' },
        { key: '3', label: 'Buy Prepaid Power' },
        { key: '4', label: 'Notice Accounts' },
        { key: '0', label: 'Main menu' }
      ],
      footer: 'Reply:'
    };
  }

  // Pattern B: Kazang / Blue Label VAS (Sub-Menu Injection)
  static getVasHomeScreen(): UssdScreen {
    return {
      id: 'vas-home',
      type: 'menu',
      title: 'Kazang VAS (*120*7727#)',
      prompt: 'Kazang VAS & Retail\n[Pattern B: Menu Injection]\n\n1. Buy Airtime\n2. Prepaid Electricity\n3. Pay Bill / DStv\n4. Ask Zara AI (Type anything)\n\n0. Exit',
      options: [
        { key: '1', label: 'Buy Airtime' },
        { key: '2', label: 'Prepaid Electricity' },
        { key: '3', label: 'Pay Bill / DStv' },
        { key: '4', label: 'Ask Zara AI (Type anything)' },
        { key: '0', label: 'Exit' }
      ],
      footer: 'Reply:'
    };
  }

  // Futuristic 1: Zero-Hop Predictive AI Pre-Computation
  static getPredictiveZeroHopScreen(): UssdScreen {
    return {
      id: 'predictive-home',
      type: 'menu',
      title: 'Zara Predictive AI',
      prompt: 'Sawubona Malcolm.\n[Predictive AI • Zero-Hop]\nLoad-shedding in Sandton in 45m.\nMeter ...6789 balance is low.\n\n1. Quick-Buy usual R100 Power (1-Click)\n2. Send usual R500 voucher to Gogo\n3. Type what you need (NLU)\n4. All Services & Marketplace\n\n0. Exit',
      options: [
        { key: '1', label: 'Quick-Buy usual R100 Power (1-Click)' },
        { key: '2', label: 'Send usual R500 voucher to Gogo' },
        { key: '3', label: 'Type what you need (NLU)' },
        { key: '4', label: 'All Services & Marketplace' },
        { key: '0', label: 'Exit' }
      ],
      footer: 'Reply:'
    };
  }

  // Futuristic 2: Flash & Talk Voice Handoff
  static getVoiceHandoffScreen(): UssdScreen {
    return {
      id: 'voice-handoff',
      type: 'notification',
      title: 'Flash & Talk Handoff',
      prompt: 'Zara Cellular Voice Handoff\n\nConnecting carrier voice line...\nYour phone will ring in 1 second.\n\nLanguage: isiZulu / English\nZero mobile data used.\n\n[USSD Session Complete]',
      footer: 'Press 0 to exit'
    };
  }

  // Futuristic 3: The Spaza Swarm Collective Bidding
  static getSpazaSwarmScreen(): UssdScreen {
    return {
      id: 'spaza-swarm-home',
      type: 'menu',
      title: 'The Spaza Swarm',
      prompt: 'Spaza Swarm Collective Bidding\n\nAggregated with 84 shops in 5km:\n• 10x 10kg Iwisa Maize\n• 5x 2L Sunflower Oil\n\nBest Bid: Tiger Depot (R780)\nSaved R210 (21% bulk discount)\n\n1. Confirm & Pay with Spaza Wallet\n2. Inspect supplier bids\n\n0. Exit',
      options: [
        { key: '1', label: 'Confirm & Pay with Spaza Wallet' },
        { key: '2', label: 'Inspect supplier bids' },
        { key: '0', label: 'Exit' }
      ],
      footer: 'Reply:'
    };
  }

  static getNaturalLanguageInputScreen(langCode = 'en-ZA'): UssdScreen {
    const lang = LANGUAGES[langCode] || LANGUAGES['en-ZA'];
    return {
      id: 'natural-language-prompt',
      type: 'input',
      title: 'Tell Zara',
      prompt: `${lang.promptWhatNeeded}\n\n(e.g. "I need electricity", "Find me a job", "Check my grant", "My maize leaves are yellow")`,
      allowTextInput: true,
      inputPlaceholder: 'Tell Zara what you need...',
      footer: 'Reply:'
    };
  }

  static getBrowseAgentsScreen(): UssdScreen {
    const lines = MARKETPLACE_AGENTS.map((a, i) => `${i + 1}. ${a.shortName}`).join('\n');
    return {
      id: 'browse-agents',
      type: 'menu',
      title: 'Agent Marketplace',
      prompt: `Zara Agent Marketplace\n\n${lines}\n\n0. Main menu`,
      options: [
        ...MARKETPLACE_AGENTS.map((a, i) => ({ key: String(i + 1), label: a.shortName, action: a.id })),
        { key: '0', label: 'Main menu' }
      ],
      footer: 'Reply:'
    };
  }

  static getCreditsScreen(balance = 48, monthlyUsed = 12): UssdScreen {
    return {
      id: 'credits-menu',
      type: 'menu',
      title: 'Zara AI Credits',
      prompt: `Zara AI Credits\n\nBalance: ${balance}\nThis month used: ${monthlyUsed}\n\n1. Buy credits\n2. Usage history\n0. Main menu`,
      options: [
        { key: '1', label: 'Buy credits' },
        { key: '2', label: 'Usage history' },
        { key: '0', label: 'Main menu' }
      ],
      footer: 'Reply:'
    };
  }

  static getBuyCreditsScreen(): UssdScreen {
    return {
      id: 'credits-bundles',
      type: 'menu',
      title: 'Buy Credits',
      prompt: 'Choose a bundle:\n\n1. 20 credits - R5\n2. 50 credits - R10\n3. 120 credits - R20\n\n0. Back',
      options: [
        { key: '1', label: '20 credits - R5' },
        { key: '2', label: '50 credits - R10' },
        { key: '3', label: '120 credits - R20' },
        { key: '0', label: 'Back' }
      ],
      footer: 'Reply:'
    };
  }

  static getPaymentMethodScreen(bundleText: string): UssdScreen {
    return {
      id: 'credits-payment-method',
      type: 'menu',
      title: 'Payment Method',
      prompt: `Bundle: ${bundleText}\n\nSelect payment method:\n\n1. Airtime\n2. Mobile Money\n3. Bank\n\n0. Cancel`,
      options: [
        { key: '1', label: 'Airtime' },
        { key: '2', label: 'Mobile Money' },
        { key: '3', label: 'Bank' },
        { key: '0', label: 'Cancel' }
      ],
      footer: 'Reply:'
    };
  }

  static getCreditsSuccessScreen(added: number, newBalance: number): UssdScreen {
    return {
      id: 'credits-success',
      type: 'result',
      title: 'Payment Successful',
      prompt: `Payment successful.\n\n${added} AI Credits added.\nNew balance: ${newBalance}\n\n1. Main menu\n0. Exit`,
      options: [
        { key: '1', label: 'Main menu' },
        { key: '0', label: 'Exit' }
      ],
      footer: 'Reply:'
    };
  }

  static getRecentActivityScreen(): UssdScreen {
    return {
      id: 'recent-activity',
      type: 'menu',
      title: 'Recent Activity',
      prompt: 'Recent Zara Activity:\n\n1. Today: Bought R100 Electricity\n2. Yesterday: Maize Crop Advisory\n3. 18 Sep: SASSA Grant Verified\n\n0. Main menu',
      options: [
        { key: '0', label: 'Main menu' }
      ],
      footer: 'Reply:'
    };
  }

  static getChangeLanguageScreen(): UssdScreen {
    return {
      id: 'change-language',
      type: 'menu',
      title: 'Change Language',
      prompt: 'Change Language / Shintsha Ulimi:\n\n1. English\n2. isiZulu\n3. Sesotho\n4. Afrikaans\n\n0. Main menu',
      options: [
        { key: '1', label: 'English' },
        { key: '2', label: 'isiZulu' },
        { key: '3', label: 'Sesotho' },
        { key: '4', label: 'Afrikaans' },
        { key: '0', label: 'Main menu' }
      ],
      footer: 'Reply:'
    };
  }

  static getExpiredScreen(): UssdScreen {
    return {
      id: 'session-expired',
      type: 'expired',
      title: 'Session Expired',
      prompt: 'USSD session expired.\n\nThank you for using Zara AI.\nDial *120*9272# to start a new session.',
      footer: 'Press Call or End'
    };
  }

  static getTimeoutErrorScreen(): UssdScreen {
    return {
      id: 'network-timeout',
      type: 'error',
      title: 'Network Timeout',
      prompt: 'Connection timed out.\nNetwork error (SS7 Gateway timeout).\n\n1. Retry\n0. Exit',
      options: [
        { key: '1', label: 'Retry' },
        { key: '0', label: 'Exit' }
      ],
      footer: 'Reply:'
    };
  }
}
