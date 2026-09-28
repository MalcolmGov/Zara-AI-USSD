import { ZaraAgent, AgentContext, AgentResponse } from './ZaraAgent';
import { MockSMSAPI } from '../services/mockSMSAPI';

export class GeneralAgent implements ZaraAgent {
  id = 'general';
  name = 'General AI Assistant';
  shortName = 'General AI';
  category = 'Universal Assistant';
  description = 'Universal conversational intelligence, summaries & general knowledge.';
  icon = 'Sparkles';
  color = '#06b6d4';
  capabilities = [
    'general question answering',
    'language translation',
    'cross-channel message routing',
    'calculations & conversions'
  ];

  canHandle(intent: string): boolean {
    return intent === 'general_assistance' || intent === 'general_inquiry';
  }

  async start(context: AgentContext): Promise<AgentResponse> {
    return {
      screen: {
        id: 'gen-main-menu',
        type: 'input',
        title: 'General AI Assistant',
        prompt: 'Zara Universal Assistant\n\nAsk any question or request a summary:\n(e.g. weather tomorrow, currency conversion, emergency numbers)',
        allowTextInput: true,
        inputPlaceholder: 'Ask a question...',
        footer: 'Reply:'
      },
      workflowState: {
        workflowName: 'Universal Assistance',
        step: 1,
        status: 'Awaiting free-form query',
        data: context.sessionData
      }
    };
  }

  async handle(input: string, context: AgentContext): Promise<AgentResponse> {
    const trimmed = input.trim();
    const smsContent = `Zara AI Answer: In Johannesburg tomorrow it will be 23°C, partly cloudy with 20% rain chance. For live radar updates reply to this SMS.`;
    await MockSMSAPI.send(context.msisdn, smsContent);

    return {
      apiCall: {
        name: 'ZaraLLM_UniversalEngine.respond()',
        endpoint: 'POST /v1/chat/completions',
        method: 'POST',
        status: 200,
        latencyMs: 390,
        payload: { prompt: trimmed },
        result: { tokens: 42, summary: 'Weather forecast summary generated' }
      },
      screen: {
        id: 'gen-result',
        type: 'menu',
        title: 'Zara Answer',
        prompt: `Query: "${trimmed}"\n\nAnswer: Tomorrow in JHB will be 23°C, partly cloudy. Detailed forecast sent to your SMS.\n\n1. Send via WhatsApp\n2. Ask another\n0. Main menu`,
        options: [
          { key: '1', label: 'Send via WhatsApp' },
          { key: '2', label: 'Ask another' },
          { key: '0', label: 'Main menu' }
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
        workflowName: 'Universal Assistance',
        step: 2,
        status: 'Answer generated and dispatched',
        data: context.sessionData
      }
    };
  }
}
