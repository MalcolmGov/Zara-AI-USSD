import { ZaraAgent, AgentContext, AgentResponse } from './ZaraAgent';
import { MockSMSAPI } from '../services/mockSMSAPI';

export class SmeAgent implements ZaraAgent {
  id = 'sme';
  name = 'SME & Business Agent';
  shortName = 'SME Support';
  category = 'Enterprise';
  description = 'CIPC registration, SME grant funding & business guidance.';
  icon = 'Store';
  color = '#f97316';
  capabilities = [
    'business guidance',
    'funding information',
    'marketing assistance',
    'business registration guidance'
  ];

  canHandle(intent: string): boolean {
    return intent === 'business_guidance';
  }

  async start(context: AgentContext): Promise<AgentResponse> {
    return {
      screen: {
        id: 'sme-main-menu',
        type: 'menu',
        title: 'SME Support Agent',
        prompt: 'Zara SME & Business Agent\n\n1. CIPC Company Registration\n2. Funding Directory (SEFA/NEF)\n3. SARS Tax Compliance (TCS)\n4. Marketing & Social tips\n\n0. Main menu',
        options: [
          { key: '1', label: 'CIPC Company Registration' },
          { key: '2', label: 'Funding Directory' },
          { key: '3', label: 'SARS Tax Compliance' },
          { key: '4', label: 'Marketing & Social tips' },
          { key: '0', label: 'Main menu' }
        ],
        footer: 'Reply:'
      },
      workflowState: {
        workflowName: 'SME Support Hub',
        step: 1,
        status: 'Awaiting business track selection',
        data: context.sessionData
      }
    };
  }

  async handle(input: string, context: AgentContext): Promise<AgentResponse> {
    const trimmed = input.trim();
    const currentScreenId = context.sessionData['currentScreenId'] || 'sme-main-menu';

    if (currentScreenId === 'sme-main-menu') {
      if (trimmed === '1') {
        return {
          screen: {
            id: 'sme-cipc-info',
            type: 'menu',
            title: 'CIPC Registration',
            prompt: 'CIPC Registration Guide:\nCost: R175 (BizPortal)\nRequirements: RSA ID + 4 proposed company names.\n\n1. Send full checklist by SMS\n0. Main menu',
            options: [
              { key: '1', label: 'Send checklist by SMS' },
              { key: '0', label: 'Main menu' }
            ],
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'CIPC Company Registration',
            step: 2,
            status: 'Displaying CIPC guide',
            data: context.sessionData
          }
        };
      } else if (trimmed === '2') {
        return {
          screen: {
            id: 'sme-funding-info',
            type: 'menu',
            title: 'SME Funding',
            prompt: 'SME Grants & Loans:\n• SEFA Small Business Loan (Up to R5m)\n• NYDA Youth Grant (Up to R250k)\n• NEF Black Impumelelo Fund\n\n1. Send contact details SMS\n0. Main menu',
            options: [
              { key: '1', label: 'Send contact details SMS' },
              { key: '0', label: 'Main menu' }
            ],
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'Funding Directory',
            step: 2,
            status: 'Displaying funding directory',
            data: context.sessionData
          }
        };
      }
    }

    if (currentScreenId === 'sme-cipc-info' || currentScreenId === 'sme-funding-info') {
      if (trimmed === '1') {
        const smsContent = `Zara SME Toolkit: Register on BizPortal.gov.za with 4 company names and ID. SEFA funding hotline: 0860-007-332. Step-by-step PDF guide link sent.`;
        await MockSMSAPI.send(context.msisdn, smsContent);

        return {
          screen: {
            id: 'sme-sms-sent',
            type: 'result',
            title: 'Checklist Sent',
            prompt: `Business toolkit checklist sent by SMS to ${context.msisdn}.\n\n1. Main menu\n0. Exit`,
            options: [
              { key: '1', label: 'Main menu' },
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
            workflowName: 'Cross-Channel SMS Handoff',
            step: 3,
            status: 'Business toolkit sent via SMS',
            data: context.sessionData
          }
        };
      }
    }

    return this.start(context);
  }
}
