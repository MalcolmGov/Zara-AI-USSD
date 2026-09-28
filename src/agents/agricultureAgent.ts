import { ZaraAgent, AgentContext, AgentResponse } from './ZaraAgent';
import { MockWeatherAPI } from '../services/mockWeatherAPI';
import { MockSMSAPI, MockWhatsAppAPI, MockVoiceAPI } from '../services/mockSMSAPI';

export class AgricultureAgent implements ZaraAgent {
  id = 'agriculture';
  name = 'Agriculture & Agronomy Agent';
  shortName = 'Agriculture';
  category = 'Agritech';
  description = 'Crop disease diagnostics, weather advisory & soil health triage.';
  icon = 'Sprout';
  color = '#22c55e';
  capabilities = [
    'crop advice',
    'weather information',
    'crop issue triage',
    'farming recommendations'
  ];

  canHandle(intent: string): boolean {
    return intent === 'crop_diagnosis_and_advisory';
  }

  async start(context: AgentContext): Promise<AgentResponse> {
    return {
      screen: {
        id: 'agri-q1-location',
        type: 'input',
        title: 'Agriculture Agent',
        prompt: 'Agriculture Agent\n\nYellow maize leaves can have several causes.\n\nI need 2 more details.\n\nWhere are you farming?\n(e.g. Free State, Limpopo)',
        allowTextInput: true,
        inputPlaceholder: 'Free State',
        footer: 'Reply:'
      },
      workflowState: {
        workflowName: 'Crop Diagnostic Triage',
        step: 1,
        status: 'Awaiting farm location',
        data: context.sessionData
      }
    };
  }

  async handle(input: string, context: AgentContext): Promise<AgentResponse> {
    const trimmed = input.trim();
    const currentScreenId = context.sessionData['currentScreenId'] || 'agri-q1-location';

    // 1. Question 1: Location -> Question 2: Crop Age
    if (currentScreenId === 'agri-q1-location') {
      const location = trimmed || 'Free State';
      context.sessionData['farmLocation'] = location;

      return {
        screen: {
          id: 'agri-q2-crop-age',
          type: 'input',
          title: 'Crop Age',
          prompt: `Location: ${location}\n\nHow old is the crop?\n(e.g. 3 weeks, 6 weeks)`,
          allowTextInput: true,
          inputPlaceholder: '4 weeks',
          footer: 'Reply:'
        },
        workflowState: {
          workflowName: 'Crop Diagnostic Triage',
          step: 2,
          status: 'Awaiting crop age',
          data: context.sessionData
        }
      };
    }

    // 3. Question 2: Crop age -> Trigger GenAI Reasoning & Multi-channel selection
    if (currentScreenId === 'agri-q2-crop-age') {
      const cropAge = trimmed || '4 weeks';
      context.sessionData['cropAge'] = cropAge;
      const location = context.sessionData['farmLocation'] || 'Free State';

      // Call simulated Agronomy AI model & weather API
      const weather = await MockWeatherAPI.getAgronomyConditions(location);
      context.sessionData['agriWeather'] = weather;

      return {
        apiCall: {
          name: 'AgronomyLLM_ReasoningEngine.diagnoseCrop()',
          endpoint: 'POST /v3/agri/ai/reasoning',
          method: 'POST',
          status: 200,
          latencyMs: 650,
          payload: { crop: 'Maize', symptom: 'Yellow leaves', location, cropAge, weather: weather.rainfall7Days },
          result: { causesCount: 3, topCause: 'Nitrogen Leaching due to rain', confidence: 0.96 }
        },
        screen: {
          id: 'agri-channel-select',
          type: 'menu',
          title: 'Diagnosis Ready',
          prompt: `I found 3 possible causes:\n• Nitrogen leaching (rain)\n• Maize Streak Virus\n• Waterlogged root zone\n\nHow should I send your advice?\n\n1. SMS\n2. WhatsApp\n3. Voice call\n0. Main menu`,
          options: [
            { key: '1', label: 'SMS' },
            { key: '2', label: 'WhatsApp' },
            { key: '3', label: 'Voice call' },
            { key: '0', label: 'Main menu' }
          ],
          footer: 'Reply:'
        },
        workflowState: {
          workflowName: 'Crop Diagnostic Triage',
          step: 4,
          status: 'Diagnosis synthesized — awaiting delivery channel',
          data: context.sessionData
        }
      };
    }

    // 4. Delivery Channel Selection
    if (currentScreenId === 'agri-channel-select') {
      const location = context.sessionData['farmLocation'] || 'Free State';

      if (trimmed === '1') {
        // SMS delivery
        const smsContent = `Zara Agri Report [${location}]: Maize yellowing likely Nitrogen deficiency (48mm rain leaching). Top-dress LAN 28% @ 150kg/ha immediately. Check leafhoppers. Free helpline: 0800-ZARA-AGRI.`;
        await MockSMSAPI.send(context.msisdn, smsContent);

        return {
          screen: {
            id: 'agri-dispatched',
            type: 'result',
            title: 'Report Sent',
            prompt: `Agronomy advice sent via SMS to ${context.msisdn}.\n\n1. New crop query\n2. Main menu\n0. Exit`,
            options: [
              { key: '1', label: 'New crop query' },
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
            workflowName: 'Cross-Channel SMS Dispatch',
            step: 5,
            status: 'Agronomy advice sent by SMS',
            data: context.sessionData
          }
        };
      } else if (trimmed === '2') {
        // WhatsApp delivery with rich markdown
        const waContent = `🌱 *Zara AI Agronomy Report*\n*Crop:* Maize | *Location:* ${location}\n\n*Top Diagnosis:* Nitrogen Deficiency (96% probability)\n*Weather Context:* High recent rainfall (48mm) has caused nutrient leaching below root zone.\n\n*Action Steps:*\n1. Top-dress with LAN (28% N) at 150-200 kg/ha before next dry spell.\n2. Inspect undersides of leaves for leafhopper vectors (rule out MSV).\n3. Re-check crop in 5 days.\n\nReply anytime for follow-up guidance.`;
        await MockWhatsAppAPI.send(context.msisdn, waContent);

        return {
          screen: {
            id: 'agri-dispatched',
            type: 'result',
            title: 'WhatsApp Dispatched',
            prompt: `Full report with treatment diagrams sent to WhatsApp (+27 82 *** 1234).\n\n1. New query\n2. Main menu\n0. Exit`,
            options: [
              { key: '1', label: 'New query' },
              { key: '2', label: 'Main menu' },
              { key: '0', label: 'Exit' }
            ],
            footer: 'Reply:'
          },
          crossChannelDispatch: {
            channel: 'whatsapp',
            recipient: context.msisdn,
            content: waContent,
            status: 'sent'
          },
          workflowState: {
            workflowName: 'Cross-Channel WhatsApp Dispatch',
            step: 5,
            status: 'Full report delivered via WhatsApp',
            data: context.sessionData
          }
        };
      } else if (trimmed === '3') {
        // Voice call
        await MockVoiceAPI.triggerCall(context.msisdn, 'Maize crop yellowing and nitrogen top-dressing treatment plan in Sesotho/isiZulu/English');

        return {
          screen: {
            id: 'agri-dispatched',
            type: 'result',
            title: 'Voice Call Queued',
            prompt: `Zara Voice Call queued. You will receive an incoming call in 15 seconds.\n\n1. New query\n2. Main menu\n0. Exit`,
            options: [
              { key: '1', label: 'New query' },
              { key: '2', label: 'Main menu' },
              { key: '0', label: 'Exit' }
            ],
            footer: 'Reply:'
          },
          crossChannelDispatch: {
            channel: 'voice',
            recipient: context.msisdn,
            content: 'Voice callback scheduled on +27 16 880 0712',
            status: 'sent'
          },
          workflowState: {
            workflowName: 'Cross-Channel Voice Dispatch',
            step: 5,
            status: 'Voice call callback initiated',
            data: context.sessionData
          }
        };
      }
    }

    return this.start(context);
  }
}
