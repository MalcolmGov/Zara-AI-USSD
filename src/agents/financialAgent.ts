import { ZaraAgent, AgentContext, AgentResponse } from './ZaraAgent';
import { MockSMSAPI } from '../services/mockSMSAPI';

export class FinancialAgent implements ZaraAgent {
  id = 'financial';
  name = 'Financial Services Agent';
  shortName = 'Fintech';
  category = 'Financial Services';
  description = 'Voucher money transfer, account inquiries & micro-loan evaluation.';
  icon = 'Landmark';
  color = '#8b5cf6';
  capabilities = [
    'send money',
    'account queries',
    'financial guidance',
    'loan enquiry'
  ];

  canHandle(intent: string): boolean {
    return intent === 'financial_transfer_or_loan';
  }

  async start(context: AgentContext): Promise<AgentResponse> {
    return {
      screen: {
        id: 'fin-main-menu',
        type: 'menu',
        title: 'Financial Services',
        prompt: 'Financial Services\n\nHow can we help?\n\n1. Send cash voucher\n2. Balance enquiry\n3. Micro-loan check\n4. Funeral / Life cover\n\n0. Main menu',
        options: [
          { key: '1', label: 'Send cash voucher' },
          { key: '2', label: 'Balance enquiry' },
          { key: '3', label: 'Micro-loan check' },
          { key: '4', label: 'Funeral / Life cover' },
          { key: '0', label: 'Main menu' }
        ],
        footer: 'Reply:'
      },
      workflowState: {
        workflowName: 'Financial Services',
        step: 1,
        status: 'Awaiting financial operation',
        data: context.sessionData
      }
    };
  }

  async handle(input: string, context: AgentContext): Promise<AgentResponse> {
    const trimmed = input.trim();
    const currentScreenId = context.sessionData['currentScreenId'] || 'fin-main-menu';

    if (currentScreenId === 'fin-main-menu') {
      if (trimmed === '1') {
        return {
          screen: {
            id: 'fin-send-amount',
            type: 'input',
            title: 'Send Cash Voucher',
            prompt: 'Send Instant Cash Voucher\n(Redeemable at ATM & Retail)\n\nEnter amount in ZAR:\n(e.g. 250)',
            allowTextInput: true,
            inputPlaceholder: '250',
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'Instant Cash Voucher',
            step: 2,
            status: 'Awaiting voucher amount',
            data: context.sessionData
          }
        };
      } else if (trimmed === '2') {
        return {
          screen: {
            id: 'fin-balance',
            type: 'menu',
            title: 'Balance Enquiry',
            prompt: 'Account Balance:\n\nWallet: R1,245.80\nAvailable: R1,245.80\nZara Credits: 48\n\n1. Send statement SMS\n0. Main menu',
            options: [
              { key: '1', label: 'Send statement SMS' },
              { key: '0', label: 'Main menu' }
            ],
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'Balance Query',
            step: 2,
            status: 'Balance displayed',
            data: context.sessionData
          }
        };
      } else if (trimmed === '3') {
        return {
          screen: {
            id: 'fin-loan-offer',
            type: 'menu',
            title: 'Loan Pre-Check',
            prompt: 'Pre-Approved Micro Loan:\n\nAmount: Up to R2,500\nInterest: 3.5% pm\nTerm: 30-90 days\n\n1. Send contract by SMS\n0. Main menu',
            options: [
              { key: '1', label: 'Send contract by SMS' },
              { key: '0', label: 'Main menu' }
            ],
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'Micro-Loan Evaluation',
            step: 2,
            status: 'Pre-approval displayed',
            data: context.sessionData
          }
        };
      }
    }

    if (currentScreenId === 'fin-send-amount') {
      const amount = trimmed || '250';
      const pin = '4819';
      const ref = `VOUCH-${Math.floor(100000 + Math.random() * 900000)}`;
      const smsContent = `Zara Cash Voucher: R${amount} issued successfully. Ref: ${ref}. Withdrawal PIN: ${pin}. Valid at Nedbank/ABSA ATMs and Boxer.`;
      await MockSMSAPI.send(context.msisdn, smsContent);

      return {
        apiCall: {
          name: 'FinSwitch_CashVoucherAPI.create()',
          endpoint: 'POST /v1/vouchers/instant-issue',
          method: 'POST',
          status: 200,
          latencyMs: 510,
          result: { ref, amount, status: 'ISSUED' }
        },
        screen: {
          id: 'fin-voucher-success',
          type: 'result',
          title: 'Voucher Issued',
          prompt: `Voucher for R${amount} created.\nRef: ${ref}\nPIN: ****\n\nDetails sent via SMS to ${context.msisdn}.\n\n1. Send another\n2. Main menu\n0. Exit`,
          options: [
            { key: '1', label: 'Send another' },
            { key: '2', label: 'Main menu' },
            { key: '0', label: 'Exit' }
          ],
          footer: 'Reply:'
        },
        crossChannelDispatch: {
          channel: 'sms',
          recipient: context.msisdn,
          content: smsContent,
          status: 'sent'
        },
        workflowState: {
          workflowName: 'Instant Cash Voucher',
          step: 3,
          status: 'Voucher issued & SMS sent',
          data: context.sessionData
        }
      };
    }

    return this.start(context);
  }
}
