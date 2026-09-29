import { NetworkCondition, UssdScreen, PartnerConfig } from '../types/ussd';

export const PARTNER_SHORTCODES: Record<string, PartnerConfig> = {
  '*120*9272#': {
    mode: 'zara_marketplace',
    code: '*120*9272#',
    name: 'Zara AI Marketplace',
    patternName: 'Universal Open Marketplace',
    patternType: 'Marketplace',
    description: 'Direct consumer access to Zara AI multi-agent ecosystem.'
  },
  '*120*321#': {
    mode: 'bank_frontdoor',
    code: '*120*321#',
    name: 'Apex Bank (Enterprise)',
    patternName: 'Pattern A: AI Front-Door (Reverse Proxy)',
    patternType: 'A',
    description: 'Zara sits in front of existing banking shortcode. Natural language requests bypass 6 menu levels; traditional menu is preserved.'
  },
  '*120*7727#': {
    mode: 'vas_injection',
    code: '*120*7727#',
    name: 'Kazang / Blue Label VAS',
    patternName: 'Pattern B: Sub-Menu Injection (Zero-Risk)',
    patternType: 'B',
    description: 'Enterprise preserves legacy menu 100% untouched. Zara AI is injected as option 4 to handle cross-VAS intents.'
  },
  '*120*9272*1#': {
    mode: 'predictive_zero_hop',
    code: '*120*9272*1#',
    name: 'Predictive Zero-Hop AI',
    patternName: 'Contextual Telepathy Engine',
    patternType: 'Futuristic',
    description: 'Pre-computes customer intent using MSISDN, cell-tower, and Eskom schedule before screen 1 renders.'
  },
  '*120*9272*0#': {
    mode: 'voice_handoff',
    code: '*120*9272*0#',
    name: 'Flash & Talk Voice Handoff',
    patternName: 'Zero-Data Cellular Voice Interconnect',
    patternType: 'Futuristic',
    description: 'Sub-second handoff from USSD to an inbound carrier neural voice line speaking native vernacular.'
  },
  '*120*9272*8#': {
    mode: 'spaza_swarm',
    code: '*120*9272*8#',
    name: 'The Spaza Swarm',
    patternName: 'Autonomous Multi-Agent Collective Bargaining',
    patternType: 'Futuristic',
    description: 'Pools informal merchant demand to negotiate bulk pallet wholesale pricing via autonomous reverse auction.'
  }
};

export class ChannelAdapter {
  private static MAX_USSD_LENGTH = 182; // Standard GSM USSD character limit

  static getPartnerConfig(code: string): PartnerConfig {
    const clean = code.trim();
    if (clean === '*120*321#' || clean === '*120*321') return PARTNER_SHORTCODES['*120*321#'];
    if (clean === '*120*7727#' || clean === '*120*7727' || clean.toUpperCase() === '*120*SPAR#') return PARTNER_SHORTCODES['*120*7727#'];
    if (clean === '*120*9272*1#' || clean === '*120*9272*1') return PARTNER_SHORTCODES['*120*9272*1#'];
    if (clean === '*120*9272*0#' || clean === '*120*9272*0') return PARTNER_SHORTCODES['*120*9272*0#'];
    if (clean === '*120*9272*8#' || clean === '*120*9272*8') return PARTNER_SHORTCODES['*120*9272*8#'];
    return PARTNER_SHORTCODES['*120*9272#'];
  }

  static async simulateNetworkTransmission<T>(
    operation: () => Promise<T>,
    condition: NetworkCondition
  ): Promise<T> {
    let latency = 400;

    switch (condition) {
      case 'slow':
        latency = 1400;
        break;
      case 'very_slow':
        latency = 3200;
        break;
      case 'timeout':
        await new Promise(res => setTimeout(res, 3000));
        throw new Error('USSD_TIMEOUT');
      case 'normal':
      default:
        latency = 350 + Math.random() * 200;
        break;
    }

    await new Promise(res => setTimeout(res, latency));
    return operation();
  }

  static formatForUssd(screen: UssdScreen): UssdScreen {
    let text = screen.prompt;

    // Check USSD string length
    if (text.length > this.MAX_USSD_LENGTH) {
      // In realistic USSD, telecom truncates or paginates with "More"
      text = text.slice(0, this.MAX_USSD_LENGTH - 4) + '...';
    }

    return {
      ...screen,
      prompt: text
    };
  }

  static isServiceCode(code: string): boolean {
    const clean = code.trim();
    return (
      clean === '*120*9272#' || clean === '*120*9272' || clean === '*120*ZARA#' ||
      clean === '*120*321#' || clean === '*120*321' ||
      clean === '*120*7727#' || clean === '*120*7727' || clean.toUpperCase() === '*120*SPAR#' ||
      clean === '*120*9272*1#' || clean === '*120*9272*1' ||
      clean === '*120*9272*0#' || clean === '*120*9272*0' ||
      clean === '*120*9272*8#' || clean === '*120*9272*8'
    );
  }
}
