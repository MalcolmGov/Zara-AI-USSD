import { UssdScreen } from './ussd';
import { ExtractedEntities } from './router';

export interface AgentResponse {
  screen: UssdScreen;
  completed?: boolean;
  creditCost?: number;
  apiCall?: {
    name: string;
    endpoint: string;
    method: 'GET' | 'POST';
    status: number;
    latencyMs: number;
    payload?: any;
    result?: any;
  };
  crossChannelDispatch?: {
    channel: 'sms' | 'whatsapp' | 'voice';
    recipient: string;
    content: string;
    status: 'sent' | 'failed';
  };
  workflowState?: {
    workflowName: string;
    step: number;
    status: string;
    data: Record<string, any>;
  };
}

export interface AgentContext {
  sessionId: string;
  msisdn: string;
  language: string;
  entities: ExtractedEntities;
  sessionData: Record<string, any>;
  creditsRemaining: number;
}

export interface ZaraAgent {
  id: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  icon: string;
  color: string;
  capabilities: string[];

  canHandle(intent: string): boolean;
  start(context: AgentContext): Promise<AgentResponse>;
  handle(input: string, context: AgentContext): Promise<AgentResponse>;
}
