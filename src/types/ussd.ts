export type NetworkCondition = 'normal' | 'slow' | 'very_slow' | 'timeout';

export type UssdScreenType = 
  | 'idle'               // Dialler showing keypad / typed digits
  | 'dialling'           // "USSD code running..."
  | 'routing'            // "Zara is finding the right agent..."
  | 'connecting'         // "Connecting to [Agent]..."
  | 'menu'               // Standard menu options with numeric selection
  | 'input'              // Prompt requiring text or alphanumeric input
  | 'processing'         // "Processing with [API]..."
  | 'result'             // Result screen (success, token, data)
  | 'expired'            // "USSD session expired"
  | 'error';             // "Network error / invalid request"

export interface MenuOption {
  key: string;           // e.g. "1", "2", "0", "99"
  label: string;         // e.g. "Tell Zara what you need", "Buy electricity"
  action?: string;       // internal action trigger
}

export interface UssdScreen {
  id: string;
  type: UssdScreenType;
  title?: string;
  header?: string;
  prompt: string;        // Text to display on phone screen
  options?: MenuOption[];
  inputPlaceholder?: string;
  allowTextInput?: boolean;
  backKey?: string;      // typically "99" or "0"
  footer?: string;       // e.g. "Reply:" or "0. Exit"
}

export interface UssdSession {
  sessionId: string;
  msisdn: string;        // e.g. "+27 82 345 1234"
  channel: 'USSD';
  networkName: string;   // "MTN SA" or "Vodacom"
  language: string;      // "en-ZA", "zu-ZA", "st-ZA", "af-ZA"
  startTime: number;
  lastActiveTime: number;
  timeRemaining: number; // 180s countdown
  isExpired: boolean;
  currentScreen: UssdScreen;
  screenHistory: UssdScreen[];
  activeAgentId?: string;
  currentWorkflow?: string;
  workflowStep?: number;
  sessionData: Record<string, any>;
  creditsRemaining: number;
}
