import { ZaraAgent, AgentContext, AgentResponse } from './ZaraAgent';
import { MockSMSAPI, MockVoiceAPI } from '../services/mockSMSAPI';

export class HealthcareAgent implements ZaraAgent {
  id = 'healthcare';
  name = 'Healthcare & Wellness Agent';
  shortName = 'Healthcare';
  category = 'Health';
  description = 'Symptom triage intake, clinic finder & emergency doctor escalation.';
  icon = 'HeartPulse';
  color = '#ec4899';
  capabilities = [
    'healthcare information',
    'symptom intake',
    'locate appropriate healthcare service',
    'escalate to a healthcare professional'
  ];

  canHandle(intent: string): boolean {
    return intent === 'health_symptom_triage';
  }

  async start(context: AgentContext): Promise<AgentResponse> {
    return {
      screen: {
        id: 'health-main-menu',
        type: 'menu',
        title: 'Healthcare Agent',
        prompt: 'Zara Health Support\n(Informational triage only — not medical diagnosis)\n\n1. Symptom intake\n2. Find nearest clinic\n3. Speak to nurse (Callback)\n0. Main menu',
        options: [
          { key: '1', label: 'Symptom intake' },
          { key: '2', label: 'Find nearest clinic' },
          { key: '3', label: 'Speak to nurse' },
          { key: '0', label: 'Main menu' }
        ],
        footer: 'Reply:'
      },
      workflowState: {
        workflowName: 'Health Triage Intake',
        step: 1,
        status: 'Awaiting triage selection',
        data: context.sessionData
      }
    };
  }

  async handle(input: string, context: AgentContext): Promise<AgentResponse> {
    const trimmed = input.trim();
    const currentScreenId = context.sessionData['currentScreenId'] || 'health-main-menu';

    if (currentScreenId === 'health-main-menu') {
      if (trimmed === '1') {
        return {
          screen: {
            id: 'health-symptom-input',
            type: 'input',
            title: 'Symptom Intake',
            prompt: 'Describe primary symptom:\n(e.g. fever, headache, stomach ache, cough)',
            allowTextInput: true,
            inputPlaceholder: 'fever and headache',
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'Health Triage Intake',
            step: 2,
            status: 'Awaiting symptom description',
            data: context.sessionData
          }
        };
      } else if (trimmed === '2') {
        return {
          screen: {
            id: 'health-clinic-list',
            type: 'menu',
            title: 'Nearest Clinics',
            prompt: 'Clinics near you (1.4 km):\n\n1. Hillbrow Community Health Centre (Open 24h)\n2. Edenvale Clinic (08:00 - 16:30)\n\n1. Send directions SMS\n0. Main menu',
            options: [
              { key: '1', label: 'Send directions SMS' },
              { key: '0', label: 'Main menu' }
            ],
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'Clinic Locator',
            step: 2,
            status: 'Displaying nearby clinics',
            data: context.sessionData
          }
        };
      } else if (trimmed === '3') {
        await MockVoiceAPI.triggerCall(context.msisdn, 'Registered triage nurse callback request');

        return {
          screen: {
            id: 'health-nurse-callback',
            type: 'result',
            title: 'Nurse Callback Queued',
            prompt: `A registered triage nurse has been alerted. You will receive a voice call within 2 minutes.\n\n1. Main menu\n0. Exit`,
            options: [
              { key: '1', label: 'Main menu' },
              { key: '0', label: 'Exit' }
            ],
            footer: 'Reply:'
          },
          crossChannelDispatch: {
            channel: 'voice',
            recipient: context.msisdn,
            content: 'Nurse triage voice callback scheduled',
            status: 'sent'
          },
          workflowState: {
            workflowName: 'Emergency / Professional Escalation',
            step: 3,
            status: 'Nurse callback initiated',
            data: context.sessionData
          }
        };
      }
    }

    if (currentScreenId === 'health-symptom-input') {
      const symptom = trimmed || 'fever and headache';
      return {
        screen: {
          id: 'health-triage-result',
          type: 'menu',
          title: 'Triage Guidance',
          prompt: `Symptom logged: ${symptom}\n\nTriage guidance:\n• Stay hydrated (oral rehydration)\n• Rest in cool room\n• If fever exceeds 38.5°C or persists >48h, visit clinic immediately.\n\n1. Send advice by SMS\n2. Escalate to nurse call\n0. Main menu`,
          options: [
            { key: '1', label: 'Send advice by SMS' },
            { key: '2', label: 'Escalate to nurse call' },
            { key: '0', label: 'Main menu' }
          ],
          footer: 'Reply:'
        },
        workflowState: {
          workflowName: 'Health Triage Intake',
          step: 3,
          status: 'Triage recommendations rendered',
          data: context.sessionData
        }
      };
    }

    if (currentScreenId === 'health-clinic-list' || currentScreenId === 'health-triage-result') {
      if (trimmed === '1') {
        const smsContent = `Zara Health Triage: Drink clean water with electrolytes. Monitor temperature. Nearest clinic: Hillbrow 24h Community Health Centre (011-694-3900). Emergency: 112.`;
        await MockSMSAPI.send(context.msisdn, smsContent);

        return {
          screen: {
            id: 'health-sms-sent',
            type: 'result',
            title: 'Advice Sent',
            prompt: `Healthcare summary and clinic info sent by SMS to ${context.msisdn}.\n\n1. Main menu\n0. Exit`,
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
            status: 'Health guidance sent via SMS',
            data: context.sessionData
          }
        };
      } else if (trimmed === '2') {
        await MockVoiceAPI.triggerCall(context.msisdn, 'Priority Nurse Triage Escalation');
        return {
          screen: {
            id: 'health-nurse-callback',
            type: 'result',
            title: 'Nurse Callback',
            prompt: `Escalated to nurse on-call. Your phone will ring shortly.\n\n1. Main menu\n0. Exit`,
            options: [
              { key: '1', label: 'Main menu' },
              { key: '0', label: 'Exit' }
            ],
            footer: 'Reply:'
          },
          crossChannelDispatch: {
            channel: 'voice',
            recipient: context.msisdn,
            content: 'Nurse triage voice call initiated',
            status: 'sent'
          },
          workflowState: {
            workflowName: 'Nurse Escalation',
            step: 4,
            status: 'Voice call dispatched',
            data: context.sessionData
          }
        };
      }
    }

    return this.start(context);
  }
}
