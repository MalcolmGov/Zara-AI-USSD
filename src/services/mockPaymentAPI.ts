export interface CreditBundle {
  id: string;
  credits: number;
  costZar: number;
  description: string;
}

export const CREDIT_BUNDLES: CreditBundle[] = [
  { id: 'b1', credits: 20, costZar: 5, description: 'Starter Pack (20 credits - R5)' },
  { id: 'b2', credits: 50, costZar: 10, description: 'Value Pack (50 credits - R10)' },
  { id: 'b3', credits: 120, costZar: 20, description: 'Power User (120 credits - R20)' }
];

export class MockPaymentAPI {
  static async purchaseCredits(
    bundleId: string,
    _method: 'Airtime' | 'Mobile Money' | 'Bank',
    delayMs = 600
  ): Promise<{ success: boolean; creditsAdded: number; newBalance: number; txId: string }> {
    await new Promise(res => setTimeout(res, delayMs));

    const bundle = CREDIT_BUNDLES.find(b => b.id === bundleId) || CREDIT_BUNDLES[1];
    return {
      success: true,
      creditsAdded: bundle.credits,
      newBalance: 48 + bundle.credits, // Base 48 + added
      txId: `PAY-${Math.floor(100000 + Math.random() * 900000)}`
    };
  }
}
