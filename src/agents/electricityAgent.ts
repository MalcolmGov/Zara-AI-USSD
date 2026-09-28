import { ZaraAgent, AgentContext, AgentResponse } from './ZaraAgent';
import { MockElectricityAPI } from '../services/mockElectricityAPI';
import { MockSMSAPI } from '../services/mockSMSAPI';

export class ElectricityAgent implements ZaraAgent {
  id = 'electricity';
  name = 'Electricity Agent';
  shortName = 'Electricity';
  category = 'Utilities & VAS';
  description = 'Prepaid electricity tokens, meter management & utility vouchers.';
  icon = 'Zap';
  color = '#eab308';
  capabilities = [
    'buy prepaid electricity',
    'check previous purchases',
    'retrieve electricity token'
  ];

  canHandle(intent: string): boolean {
    return intent === 'purchase_electricity';
  }

  async start(context: AgentContext): Promise<AgentResponse> {
    // If entities already had meter and amount from natural language (e.g. "Buy R100 electricity meter 07123456789")
    if (context.entities.meterNumber && context.entities.amount) {
      context.sessionData['meterNumber'] = context.entities.meterNumber;
      context.sessionData['amount'] = context.entities.amount;
      return this.renderConfirmationScreen(context);
    }

    if (context.entities.amount) {
      context.sessionData['amount'] = context.entities.amount;
      return {
        screen: {
          id: 'elec-enter-meter',
          type: 'input',
          title: 'Electricity Agent',
          header: 'Electricity Agent',
          prompt: `Amount: R${context.entities.amount}\n\nEnter meter number:\n(e.g. 07123456789)`,
          allowTextInput: true,
          inputPlaceholder: '07123456789',
          footer: 'Reply:'
        },
        workflowState: {
          workflowName: 'Purchase Electricity',
          step: 2,
          status: 'Awaiting meter number',
          data: context.sessionData
        }
      };
    }

    return {
      screen: {
        id: 'elec-main-menu',
        type: 'menu',
        title: 'Electricity Agent',
        header: 'Electricity Agent',
        prompt: 'Electricity Agent\n\nWhat would you like to do?\n\n1. Buy electricity\n2. Previous purchases\n3. Retrieve token\n\n0. Main menu',
        options: [
          { key: '1', label: 'Buy electricity' },
          { key: '2', label: 'Previous purchases' },
          { key: '3', label: 'Retrieve token' },
          { key: '0', label: 'Main menu' }
        ],
        footer: 'Reply:'
      },
      workflowState: {
        workflowName: 'Electricity Service Menu',
        step: 1,
        status: 'Awaiting menu selection',
        data: context.sessionData
      }
    };
  }

  async handle(input: string, context: AgentContext): Promise<AgentResponse> {
    const trimmed = input.trim();
    const currentScreenId = context.sessionData['currentScreenId'] || 'elec-main-menu';

    // 1. Main menu selection
    if (currentScreenId === 'elec-main-menu') {
      if (trimmed === '1') {
        return {
          screen: {
            id: 'elec-enter-meter',
            type: 'input',
            title: 'Electricity Agent',
            header: 'Electricity Agent',
            prompt: 'Enter meter number:\n\n(e.g. 07123456789)',
            allowTextInput: true,
            inputPlaceholder: '07123456789',
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'Purchase Electricity',
            step: 2,
            status: 'Awaiting meter number',
            data: context.sessionData
          }
        };
      } else if (trimmed === '2') {
        const history = await MockElectricityAPI.getHistory();
        const historyText = history.map((h, i) => `${i + 1}. ${h.date}: R${h.amount} (${h.meter})`).join('\n');
        return {
          screen: {
            id: 'elec-history',
            type: 'menu',
            title: 'Previous Purchases',
            prompt: `Previous purchases:\n\n${historyText}\n\n1. Resend last token SMS\n0. Main menu`,
            options: [
              { key: '1', label: 'Resend last token SMS' },
              { key: '0', label: 'Main menu' }
            ],
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'Purchase History',
            step: 2,
            status: 'Viewing history',
            data: context.sessionData
          }
        };
      } else if (trimmed === '3') {
        const last = await MockElectricityAPI.getLastToken();
        const tokenStr = last ? last.token : '1234 5678 9012 3456';
        return {
          screen: {
            id: 'elec-token-view',
            type: 'menu',
            title: 'Latest Token',
            prompt: `Latest Token:\n${tokenStr}\nMeter: ****6789\n\n1. Send token by SMS\n0. Main menu`,
            options: [
              { key: '1', label: 'Send token by SMS' },
              { key: '0', label: 'Main menu' }
            ],
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'Retrieve Token',
            step: 2,
            status: 'Displaying last token',
            data: context.sessionData
          }
        };
      }
    }

    // 2. Entering meter number
    if (currentScreenId === 'elec-enter-meter') {
      const meterNumber = trimmed.replace(/\D/g, '') || '07123456789';
      context.sessionData['meterNumber'] = meterNumber;

      // If amount was already selected earlier
      if (context.sessionData['amount']) {
        return this.renderConfirmationScreen(context);
      }

      return {
        screen: {
          id: 'elec-select-amount',
          type: 'menu',
          title: 'Select Amount',
          header: 'Select Amount',
          prompt: `Meter: ****${meterNumber.slice(-4)}\n\nSelect amount:\n\n1. R50\n2. R100\n3. R200\n4. Other amount\n\n0. Back`,
          options: [
            { key: '1', label: 'R50' },
            { key: '2', label: 'R100' },
            { key: '3', label: 'R200' },
            { key: '4', label: 'Other amount' },
            { key: '0', label: 'Back' }
          ],
          footer: 'Reply:'
        },
        workflowState: {
          workflowName: 'Purchase Electricity',
          step: 3,
          status: 'Selecting purchase amount',
          data: context.sessionData
        }
      };
    }

    // 3. Amount selection
    if (currentScreenId === 'elec-select-amount') {
      let amount = 100;
      if (trimmed === '1') amount = 50;
      else if (trimmed === '2') amount = 100;
      else if (trimmed === '3') amount = 200;
      else if (trimmed === '4') {
        return {
          screen: {
            id: 'elec-custom-amount',
            type: 'input',
            title: 'Enter Amount',
            prompt: 'Enter amount in Rand (R20 - R2000):\n\n(e.g. 150)',
            allowTextInput: true,
            inputPlaceholder: '100',
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'Purchase Electricity',
            step: 3,
            status: 'Awaiting custom amount',
            data: context.sessionData
          }
        };
      } else if (trimmed === '0') {
        return this.start(context);
      }

      context.sessionData['amount'] = amount;
      return this.renderConfirmationScreen(context);
    }

    // 3b. Custom amount input
    if (currentScreenId === 'elec-custom-amount') {
      const amount = parseFloat(trimmed) || 100;
      context.sessionData['amount'] = amount;
      return this.renderConfirmationScreen(context);
    }

    // 4. Confirmation screen
    if (currentScreenId === 'elec-confirm-purchase') {
      if (trimmed === '1') {
        // Execute purchase with Eskom / City Power Utility API
        const meter = context.sessionData['meterNumber'] || '07123456789';
        const amount = context.sessionData['amount'] || 100;

        const result = await MockElectricityAPI.purchase(meter, amount);
        const newBalance = Math.max(0, context.creditsRemaining - 1);
        context.sessionData['lastToken'] = result.token;

        return {
          completed: true,
          creditCost: 1,
          apiCall: {
            name: 'EskomPrepaidVendorAPI.issueToken()',
            endpoint: 'POST /v2/sts/vending/vend',
            method: 'POST',
            status: 200,
            latencyMs: 412,
            payload: { meter: result.maskedMeter, amount, units: result.unitsKwh },
            result: { token: result.token, reference: result.reference }
          },
          screen: {
            id: 'elec-success',
            type: 'result',
            title: 'Purchase Successful',
            prompt: `Purchase successful.\n\nElectricity token:\n${result.token}\n\nBalance: ${newBalance} AI Credits\n\n1. Send token by SMS\n2. Main menu\n0. Exit`,
            options: [
              { key: '1', label: 'Send token by SMS' },
              { key: '2', label: 'Main menu' },
              { key: '0', label: 'Exit' }
            ],
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'Purchase Electricity',
            step: 5,
            status: 'Token generated successfully',
            data: context.sessionData
          }
        };
      } else {
        // Cancelled
        return this.start(context);
      }
    }

    // 5. Post-purchase or SMS handoff
    if (currentScreenId === 'elec-success' || currentScreenId === 'elec-token-view' || currentScreenId === 'elec-history') {
      if (trimmed === '1') {
        const token = context.sessionData['lastToken'] || '1234 5678 9012 3456';
        const meter = context.sessionData['meterNumber'] ? `****${context.sessionData['meterNumber'].slice(-4)}` : '****6789';
        const smsContent = `Zara AI Electricity Token: ${token} for meter ${meter}. Units: 42.8 kWh. Ref: ESK-928172. Thank you for using Zara AI.`;
        
        await MockSMSAPI.send(context.msisdn, smsContent);

        return {
          screen: {
            id: 'elec-sms-sent',
            type: 'result',
            title: 'SMS Sent',
            prompt: `Electricity token sent via SMS to ${context.msisdn}.\n\n1. Buy again\n2. Main menu\n0. Exit`,
            options: [
              { key: '1', label: 'Buy again' },
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
            workflowName: 'Cross-Channel SMS Handoff',
            step: 6,
            status: 'Token delivered via SMS',
            data: context.sessionData
          }
        };
      }
    }

    // Default fallback
    return this.start(context);
  }

  private renderConfirmationScreen(context: AgentContext): AgentResponse {
    const meter = context.sessionData['meterNumber'] || '07123456789';
    const last4 = meter.slice(-4) || '6789';
    const amount = context.sessionData['amount'] || 100;

    return {
      screen: {
        id: 'elec-confirm-purchase',
        type: 'menu',
        title: 'Confirm Purchase',
        prompt: `Purchase electricity\n\nMeter: ****${last4}\nAmount: R${amount}\n\n1. Confirm\n2. Cancel`,
        options: [
          { key: '1', label: 'Confirm' },
          { key: '2', label: 'Cancel' }
        ],
        footer: 'Reply:'
      },
      workflowState: {
        workflowName: 'Purchase Electricity',
        step: 4,
        status: 'Awaiting confirmation',
        data: context.sessionData
      }
    };
  }
}
