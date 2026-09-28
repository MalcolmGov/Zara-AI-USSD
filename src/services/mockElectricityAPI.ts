export interface ElectricityPurchaseResult {
  success: boolean;
  meterNumber: string;
  maskedMeter: string;
  amount: number;
  token: string;
  unitsKwh: number;
  vatAmount: number;
  reference: string;
  timestamp: string;
}

export interface ElectricityHistoryItem {
  date: string;
  amount: number;
  token: string;
  meter: string;
}

const HISTORY_STORE: ElectricityHistoryItem[] = [
  { date: '18 Sep', amount: 100, token: '5821 4409 1192 8834', meter: '****6789' },
  { date: '02 Sep', amount: 50,  token: '9102 3341 8729 0012', meter: '****6789' }
];

export class MockElectricityAPI {
  static async validateMeter(meterNumber: string, delayMs = 400): Promise<{ valid: boolean; provider: string }> {
    await new Promise(res => setTimeout(res, delayMs));
    const clean = meterNumber.replace(/\D/g, '');
    if (clean.length < 8) {
      return { valid: false, provider: 'Unknown' };
    }
    return {
      valid: true,
      provider: 'City Power / Eskom Prepaid'
    };
  }

  static async purchase(
    meterNumber: string,
    amount: number,
    delayMs = 600
  ): Promise<ElectricityPurchaseResult> {
    await new Promise(res => setTimeout(res, delayMs));

    const clean = meterNumber.replace(/\D/g, '');
    const last4 = clean.slice(-4) || '6789';
    const maskedMeter = `****${last4}`;

    // Standard 16-digit STS prepaid electricity token format
    const part1 = '1234';
    const part2 = '5678';
    const part3 = '9012';
    const part4 = '3456';
    const token = `${part1} ${part2} ${part3} ${part4}`;

    const unitsKwh = Number(((amount * 0.85) / 2.45).toFixed(1)); // Approx R2.45 per kWh + VAT
    const vatAmount = Number((amount * 0.15).toFixed(2));
    const reference = `ESK-${Math.floor(100000 + Math.random() * 900000)}`;

    const result: ElectricityPurchaseResult = {
      success: true,
      meterNumber: clean,
      maskedMeter,
      amount,
      token,
      unitsKwh,
      vatAmount,
      reference,
      timestamp: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
    };

    HISTORY_STORE.unshift({
      date: 'Today',
      amount,
      token,
      meter: maskedMeter
    });

    return result;
  }

  static async getHistory(): Promise<ElectricityHistoryItem[]> {
    return [...HISTORY_STORE];
  }

  static async getLastToken(): Promise<ElectricityHistoryItem | null> {
    return HISTORY_STORE[0] || null;
  }
}
