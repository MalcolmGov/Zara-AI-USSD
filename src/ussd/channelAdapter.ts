import { NetworkCondition, UssdScreen } from '../types/ussd';

export class ChannelAdapter {
  private static MAX_USSD_LENGTH = 182; // Standard GSM USSD character limit

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
    return clean === '*120*9272#' || clean === '*120*9272' || clean === '*120*ZARA#';
  }
}
