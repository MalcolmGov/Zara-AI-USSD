export type LanguageCode = 'en-ZA' | 'zu-ZA' | 'st-ZA' | 'af-ZA';

export interface ExtractedEntities {
  amount?: number;
  currency?: string;
  meterNumber?: string;
  idNumber?: string;
  category?: string;
  location?: string;
  cropType?: string;
  cropAge?: string;
  deliveryChannel?: 'sms' | 'whatsapp' | 'voice';
  [key: string]: any;
}

export interface IntentResult {
  rawInput: string;
  intent: string;
  confidence: number;
  language: LanguageCode;
  languageName: string;
  agentId: string;
  agentName: string;
  entities: ExtractedEntities;
  suggestedWorkflow?: string;
}
