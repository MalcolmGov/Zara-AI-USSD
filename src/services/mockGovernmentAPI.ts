export interface GrantCheckResult {
  status: 'Approved' | 'Pending' | 'Referred';
  grantType: string;
  amount: string;
  nextPaymentDate: string;
  payPoint: string;
  maskedId: string;
  isFictionalDemoData: true;
}

export class MockGovernmentAPI {
  static async checkGrantStatus(last4Id: string, delayMs = 500): Promise<GrantCheckResult> {
    await new Promise(res => setTimeout(res, delayMs));

    return {
      status: 'Approved',
      grantType: 'Social Relief of Distress (SRD R370)',
      amount: 'R370.00',
      nextPaymentDate: '05 Oct',
      payPoint: 'Bank Account / Boxer / Pick n Pay',
      maskedId: `******${last4Id}`,
      isFictionalDemoData: true
    };
  }

  static async checkIdStatus(_last4Id: string, delayMs = 450): Promise<{ status: string; stage: string; collectionOffice: string }> {
    await new Promise(res => setTimeout(res, delayMs));

    return {
      status: 'Ready for Collection',
      stage: 'Smart ID Card Printed & Dispatched',
      collectionOffice: 'Home Affairs Edenvale'
    };
  }
}
