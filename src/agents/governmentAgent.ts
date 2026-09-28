import { ZaraAgent, AgentContext, AgentResponse } from './ZaraAgent';
import { MockGovernmentAPI } from '../services/mockGovernmentAPI';
import { MockSMSAPI } from '../services/mockSMSAPI';

export class GovernmentAgent implements ZaraAgent {
  id = 'government';
  name = 'Government Services Agent';
  shortName = 'Gov Services';
  category = 'Public Sector';
  description = 'SASSA grants status, Home Affairs ID services, and licensing guidance.';
  icon = 'Building2';
  color = '#3b82f6';
  capabilities = [
    'check grant status',
    'ID/document guidance',
    'licence information',
    'government service information'
  ];

  canHandle(intent: string): boolean {
    return intent === 'check_grant_status';
  }

  async start(context: AgentContext): Promise<AgentResponse> {
    return {
      screen: {
        id: 'gov-main-menu',
        type: 'menu',
        title: 'Government Services',
        prompt: 'Government Services\n\nWhich service?\n\n1. Grant status\n2. ID services\n3. Driver licence\n4. Other\n\n0. Main menu',
        options: [
          { key: '1', label: 'Grant status' },
          { key: '2', label: 'ID services' },
          { key: '3', label: 'Driver licence' },
          { key: '4', label: 'Other' },
          { key: '0', label: 'Main menu' }
        ],
        footer: 'Reply:'
      },
      workflowState: {
        workflowName: 'Public Services Intake',
        step: 1,
        status: 'Selecting government department',
        data: context.sessionData
      }
    };
  }

  async handle(input: string, context: AgentContext): Promise<AgentResponse> {
    const trimmed = input.trim();
    const currentScreenId = context.sessionData['currentScreenId'] || 'gov-main-menu';

    if (currentScreenId === 'gov-main-menu') {
      if (trimmed === '1') {
        return {
          screen: {
            id: 'gov-grant-id-prompt',
            type: 'input',
            title: 'Verify ID',
            prompt: 'Grant Status Verification\n\nEnter last 4 digits of ID:\n(e.g. 1234)',
            allowTextInput: true,
            inputPlaceholder: '1234',
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'SASSA Grant Verification',
            step: 2,
            status: 'Awaiting ID authentication digits',
            data: context.sessionData
          }
        };
      } else if (trimmed === '2') {
        return {
          screen: {
            id: 'gov-id-prompt',
            type: 'input',
            title: 'ID Tracking',
            prompt: 'Home Affairs ID Tracker\n\nEnter last 4 digits of ID:',
            allowTextInput: true,
            inputPlaceholder: '1234',
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'ID Application Status',
            step: 2,
            status: 'Awaiting ID digits',
            data: context.sessionData
          }
        };
      } else if (trimmed === '3') {
        return {
          screen: {
            id: 'gov-licence-info',
            type: 'menu',
            title: 'Driver Licence',
            prompt: 'Driver Licence Portal\n\nLicence: Code B (Light Motor)\nStatus: Valid until Nov 2028\n\n1. Send booking SMS\n0. Main menu',
            options: [
              { key: '1', label: 'Send booking SMS' },
              { key: '0', label: 'Main menu' }
            ],
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'Driver Licence Lookup',
            step: 2,
            status: 'Displaying licence info',
            data: context.sessionData
          }
        };
      }
    }

    if (currentScreenId === 'gov-grant-id-prompt') {
      const last4 = trimmed.slice(-4) || '1234';
      const grantResult = await MockGovernmentAPI.checkGrantStatus(last4);
      context.sessionData['grantResult'] = grantResult;

      return {
        apiCall: {
          name: 'SASSA_G2P_GovAPI.queryGrant()',
          endpoint: `/v1/grants/srd?msisdn=${encodeURIComponent(context.msisdn)}`,
          method: 'GET',
          status: 200,
          latencyMs: 490,
          result: { status: grantResult.status, nextPay: grantResult.nextPaymentDate }
        },
        screen: {
          id: 'gov-grant-result',
          type: 'menu',
          title: 'Grant Status Result',
          prompt: `DEMO RESULT (FICTIONAL)\n\nGrant: ${grantResult.grantType}\nStatus: ${grantResult.status}\nNext payment: ${grantResult.nextPaymentDate}\nPaypoint: ${grantResult.payPoint}\n\n1. Send details by SMS\n2. Main menu\n0. Exit`,
          options: [
            { key: '1', label: 'Send details by SMS' },
            { key: '2', label: 'Main menu' },
            { key: '0', label: 'Exit' }
          ],
          footer: 'Reply:'
        },
        workflowState: {
          workflowName: 'SASSA Grant Verification',
          step: 3,
          status: 'Grant verified (DEMO APPROVED)',
          data: context.sessionData
        }
      };
    }

    if (currentScreenId === 'gov-id-prompt') {
      const last4 = trimmed.slice(-4) || '1234';
      const idResult = await MockGovernmentAPI.checkIdStatus(last4);
      return {
        screen: {
          id: 'gov-id-result',
          type: 'menu',
          title: 'ID Status',
          prompt: `Smart ID Status:\n\n${idResult.status}\n${idResult.stage}\nOffice: ${idResult.collectionOffice}\n\n1. Send details by SMS\n0. Main menu`,
          options: [
            { key: '1', label: 'Send details by SMS' },
            { key: '0', label: 'Main menu' }
          ],
          footer: 'Reply:'
        },
        workflowState: {
          workflowName: 'ID Application Status',
          step: 3,
          status: 'ID status retrieved',
          data: context.sessionData
        }
      };
    }

    if (currentScreenId === 'gov-grant-result' || currentScreenId === 'gov-id-result' || currentScreenId === 'gov-licence-info') {
      if (trimmed === '1') {
        const smsContent = `Zara Gov Services [DEMO]: SASSA SRD Grant R370 is APPROVED. Next disbursement: 05 Oct at Boxer/PnP. Bring RSA ID card.`;
        await MockSMSAPI.send(context.msisdn, smsContent);

        return {
          screen: {
            id: 'gov-sms-sent',
            type: 'result',
            title: 'SMS Sent',
            prompt: `Government grant details sent by SMS to ${context.msisdn}.\n\n1. Main menu\n0. Exit`,
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
            step: 4,
            status: 'Government details sent via SMS',
            data: context.sessionData
          }
        };
      } else if (trimmed === '2') {
        return this.start(context);
      }
    }

    return this.start(context);
  }
}
