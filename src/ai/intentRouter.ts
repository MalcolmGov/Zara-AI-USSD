import { IntentResult } from '../types/router';
import { LanguageDetector } from './languageDetector';
import { EntityExtractor } from './entityExtractor';

interface IntentRule {
  intent: string;
  agentId: string;
  agentName: string;
  patterns: (string | RegExp)[];
  suggestedWorkflow?: string;
  baseConfidence: number;
}

const INTENT_RULES: IntentRule[] = [
  // 1. Electricity Agent
  {
    intent: 'purchase_electricity',
    agentId: 'electricity',
    agentName: 'Electricity Agent',
    suggestedWorkflow: 'buy_electricity',
    baseConfidence: 0.98,
    patterns: [
      /electricity/i,
      /power/i,
      /ugesi/i,
      /motlakase/i,
      /krag/i,
      /eskom/i,
      /prepaid meter/i,
      /buy\s+r?\d+\s+electricity/i,
      /token/i
    ]
  },
  // 2. Jobs Agent
  {
    intent: 'job_search',
    agentId: 'jobs',
    agentName: 'Jobs Agent',
    suggestedWorkflow: 'find_job',
    baseConfidence: 0.96,
    patterns: [
      /job/i,
      /work/i,
      /cv/i,
      /resume/i,
      /hire/i,
      /employment/i,
      /umsebenzi/i,
      /mosebetsi/i,
      /werk/i,
      /interview/i
    ]
  },
  // 3. Government Services
  {
    intent: 'check_grant_status',
    agentId: 'government',
    agentName: 'Government Services Agent',
    suggestedWorkflow: 'grant_status',
    baseConfidence: 0.97,
    patterns: [
      /grant/i,
      /sassa/i,
      /srd/i,
      /home affairs/i,
      /id card/i,
      /passport/i,
      /driver licence/i,
      /licence/i,
      /r370/i,
      /r350/i
    ]
  },
  // 4. Financial Services
  {
    intent: 'financial_transfer_or_loan',
    agentId: 'financial',
    agentName: 'Financial Services Agent',
    suggestedWorkflow: 'send_money',
    baseConfidence: 0.95,
    patterns: [
      /send money/i,
      /need money/i,
      /transfer/i,
      /loan/i,
      /borrow/i,
      /cash/i,
      /bank account/i,
      /imali/i,
      /chelete/i,
      /insurance/i,
      /funeral cover/i
    ]
  },
  // 5. Healthcare Agent
  {
    intent: 'health_symptom_triage',
    agentId: 'healthcare',
    agentName: 'Healthcare Agent',
    suggestedWorkflow: 'symptom_intake',
    baseConfidence: 0.94,
    patterns: [
      /doctor/i,
      /clinic/i,
      /nurse/i,
      /fever/i,
      /headache/i,
      /sick/i,
      /hospital/i,
      /medication/i,
      /pharmacy/i,
      /isibhedlela/i
    ]
  },
  // 6. Agriculture Agent
  {
    intent: 'crop_diagnosis_and_advisory',
    agentId: 'agriculture',
    agentName: 'Agriculture Agent',
    suggestedWorkflow: 'crop_diagnostic',
    baseConfidence: 0.97,
    patterns: [
      /maize/i,
      /corn/i,
      /leaves/i,
      /yellow/i,
      /crop/i,
      /farm/i,
      /farming/i,
      /fertilizer/i,
      /pests/i,
      /mielie/i,
      /weather.*tomorrow/i,
      /forecast/i
    ]
  },
  // 7. SME Agent
  {
    intent: 'business_guidance',
    agentId: 'sme',
    agentName: 'SME Agent',
    suggestedWorkflow: 'business_support',
    baseConfidence: 0.94,
    patterns: [
      /business/i,
      /company/i,
      /cipc/i,
      /register/i,
      /funding/i,
      /sefa/i,
      /tender/i,
      /sars/i,
      /tax/i
    ]
  }
];

export class IntentRouter {
  static routeIntent(input: string, _context?: any): IntentResult {
    const trimmed = input.trim();
    const langInfo = LanguageDetector.detect(trimmed);
    const entities = EntityExtractor.extract(trimmed);

    // Scan intent rules
    for (const rule of INTENT_RULES) {
      for (const pattern of rule.patterns) {
        let matched = false;
        if (typeof pattern === 'string') {
          matched = trimmed.toLowerCase().includes(pattern.toLowerCase());
        } else {
          matched = pattern.test(trimmed);
        }

        if (matched) {
          // Boost confidence if specific entities found
          let confidence = rule.baseConfidence;
          if (rule.agentId === 'electricity' && entities.amount) confidence = 0.99;
          if (rule.agentId === 'agriculture' && entities.cropType) confidence = 0.98;

          return {
            rawInput: trimmed,
            intent: rule.intent,
            confidence,
            language: langInfo.code,
            languageName: langInfo.name,
            agentId: rule.agentId,
            agentName: rule.agentName,
            entities,
            suggestedWorkflow: rule.suggestedWorkflow
          };
        }
      }
    }

    // Default Fallback: General AI Assistant
    return {
      rawInput: trimmed,
      intent: 'general_assistance',
      confidence: 0.85,
      language: langInfo.code,
      languageName: langInfo.name,
      agentId: 'general',
      agentName: 'General AI Assistant',
      entities,
      suggestedWorkflow: 'general_inquiry'
    };
  }
}
