export interface AgentMetadata {
  id: string;
  name: string;
  shortName: string;
  category: string;
  iconName: string;
  color: string;
  description: string;
  capabilities: string[];
  sampleIntents: string[];
}

export const MARKETPLACE_AGENTS: AgentMetadata[] = [
  {
    id: 'electricity',
    name: 'Electricity Agent',
    shortName: 'Electricity',
    category: 'Utilities & VAS',
    iconName: 'Zap',
    color: '#eab308',
    description: 'Prepaid electricity tokens, meter management & utility vouchers.',
    capabilities: [
      'Buy prepaid electricity (Eskom / Municipal)',
      'Check previous token purchases',
      'Retrieve last generated token',
      'Meter balance queries'
    ],
    sampleIntents: ['I need electricity', 'Buy R100 electricity', 'Retrieve my token', 'Ngifuna ukuthenga ugesi']
  },
  {
    id: 'government',
    name: 'Government Services Agent',
    shortName: 'Gov Services',
    category: 'Public Sector',
    iconName: 'Building2',
    color: '#3b82f6',
    description: 'SASSA grants status, Home Affairs ID services, and licensing guidance.',
    capabilities: [
      'Check SASSA SRD grant status',
      'ID & Passport document tracker',
      'Driver license renewal booking',
      'Municipal service issues'
    ],
    sampleIntents: ['Check my grant', 'SASSA status', 'ID application', 'Driver licence']
  },
  {
    id: 'jobs',
    name: 'Jobs & Livelihoods Agent',
    shortName: 'Jobs',
    category: 'Employment',
    iconName: 'Briefcase',
    color: '#10b981',
    description: 'Hyperlocal jobs discovery, CV builder assistance & interview prep.',
    capabilities: [
      'Find nearby verified jobs',
      'Application tracking',
      'USSD-to-SMS CV generation',
      'Interview tips & prep'
    ],
    sampleIntents: ['Find me a job', 'Help with my CV', 'IT jobs near me', 'Security jobs']
  },
  {
    id: 'financial',
    name: 'Financial Services Agent',
    shortName: 'Fintech',
    category: 'Financial Services',
    iconName: 'Landmark',
    color: '#8b5cf6',
    description: 'Voucher money transfer, account inquiries & micro-loan evaluation.',
    capabilities: [
      'Send instant cash vouchers',
      'Bank & wallet balance queries',
      'Micro-finance qualification',
      'Funeral & vehicle insurance'
    ],
    sampleIntents: ['Send money', 'I need money', 'Loan enquiry', 'Check balance']
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Wellness Agent',
    shortName: 'Healthcare',
    category: 'Health',
    iconName: 'HeartPulse',
    color: '#ec4899',
    description: 'Symptom triage intake, clinic finder & emergency doctor escalation.',
    capabilities: [
      'Primary symptom intake & triage',
      'Find nearest public clinic / pharmacy',
      'Medication reminder signup',
      'Professional nurse escalation'
    ],
    sampleIntents: ['I need a doctor', 'Headache and fever', 'Nearest clinic', 'Find medical help']
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Agronomy Agent',
    shortName: 'Agriculture',
    category: 'Agritech',
    iconName: 'Sprout',
    color: '#22c55e',
    description: 'Crop disease diagnostics, weather advisory & soil health triage.',
    capabilities: [
      'Maize & crop symptom diagnostics',
      'Hyperlocal farming weather forecast',
      'Pest & disease triage',
      'Fertilizer & yield recommendations'
    ],
    sampleIntents: ['My maize leaves are yellow', 'Crop disease', 'Weather tomorrow', 'Fertilizer advice']
  },
  {
    id: 'sme',
    name: 'SME & Business Agent',
    shortName: 'SME Support',
    category: 'Enterprise',
    iconName: 'Store',
    color: '#f97316',
    description: 'CIPC registration, SME grant funding & business guidance.',
    capabilities: [
      'CIPC company registration guidance',
      'SEFA & NEF funding directories',
      'SARS tax compliance triage',
      'Marketplace & supplier links'
    ],
    sampleIntents: ['I need help with my business', 'Register company', 'SME funding', 'Business guidance']
  },
  {
    id: 'general',
    name: 'General AI Assistant',
    shortName: 'General AI',
    category: 'Universal Assistant',
    iconName: 'Sparkles',
    color: '#06b6d4',
    description: 'Universal conversational intelligence, summaries & general knowledge.',
    capabilities: [
      'General question answering',
      'Language translation',
      'Cross-channel message routing',
      'Calculations & conversions'
    ],
    sampleIntents: ['What is the weather?', 'Explain inflation', 'How does Zara work?']
  }
];
