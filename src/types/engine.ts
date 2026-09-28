import { IntentResult } from './router';

export type EventType = 
  | 'SESSION_STARTED'
  | 'SESSION_ENDED'
  | 'SESSION_EXPIRED'
  | 'USER_INPUT_RECEIVED'
  | 'INTENT_DETECTED'
  | 'LANGUAGE_DETECTED'
  | 'AGENT_SELECTED'
  | 'WORKFLOW_STARTED'
  | 'WORKFLOW_STEP'
  | 'INPUT_VALIDATED'
  | 'API_CALLED'
  | 'API_RESPONSE'
  | 'TRANSACTION_SUCCESS'
  | 'CREDITS_DEDUCTED'
  | 'CREDITS_ADDED'
  | 'CROSS_CHANNEL_DISPATCH'
  | 'ERROR_OCCURRED';

export interface EventLogEntry {
  id: string;
  timestamp: string;     // e.g. "20:41:04"
  type: EventType;
  title: string;
  detail?: string;
  metadata?: Record<string, any>;
  level: 'info' | 'success' | 'warning' | 'error';
}

export type ArchitectureNodeId = 
  | 'feature-phone'
  | 'ussd-network'
  | 'ussd-gateway'
  | 'channel-adapter'
  | 'ai-router'
  | 'agent-marketplace'
  | 'selected-agent'
  | 'enterprise-api'
  | 'cross-channel';

export interface ArchitectureNode {
  id: ArchitectureNodeId;
  label: string;
  subtitle: string;
  status: 'idle' | 'active' | 'success' | 'error';
  category: 'telecom' | 'zara' | 'agent' | 'external';
}

export interface EngineTelemetry {
  // Session
  sessionId: string;
  msisdn: string;
  channel: string;
  network: string;
  language: string;
  durationSeconds: number;
  sessionState: 'idle' | 'active' | 'expired';

  // AI Router
  lastUserInput?: string;
  intentResult?: IntentResult;

  // Active Agent
  activeAgentId?: string;
  activeAgentName?: string;
  currentWorkflow?: string;
  workflowStep?: number;
  workflowStatus?: string;

  // Execution
  lastApiName?: string;
  lastApiEndpoint?: string;
  lastLatencyMs?: number;
  lastApiStatus?: number;
  lastApiResult?: string;

  // Credits
  startingBalance: number;
  creditsConsumed: number;
  remainingBalance: number;

  // Architecture Highlighting
  activeNodes: ArchitectureNodeId[];
}
