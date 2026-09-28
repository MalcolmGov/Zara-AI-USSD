export interface LanguagePack {
  code: string;
  name: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  menuOption1: string;
  menuOption2: string;
  menuOption3: string;
  menuOption4: string;
  menuOption5: string;
  exitOption: string;
  replyPlaceholder: string;
  promptWhatNeeded: string;
  agentMarketplaceTitle: string;
}

export const LANGUAGES: Record<string, LanguagePack> = {
  'en-ZA': {
    code: 'en-ZA',
    name: 'English',
    welcomeTitle: 'Welcome to Zara AI',
    welcomeSubtitle: 'Your gateway to AI services.',
    menuOption1: '1. Tell Zara what you need',
    menuOption2: '2. Browse AI Agents',
    menuOption3: '3. My AI Credits',
    menuOption4: '4. Recent Activity',
    menuOption5: '5. Change Language',
    exitOption: '0. Exit',
    replyPlaceholder: 'Reply: __________',
    promptWhatNeeded: 'What can Zara help you with?',
    agentMarketplaceTitle: 'Zara Agent Marketplace'
  },
  'zu-ZA': {
    code: 'zu-ZA',
    name: 'isiZulu',
    welcomeTitle: 'Siyakwamukela ku-Zara AI',
    welcomeSubtitle: 'Isango lakho lezinsizakalo ze-AI.',
    menuOption1: '1. Tshela uZara okudingayo',
    menuOption2: '2. Bheka ama-Agent e-AI',
    menuOption3: '3. Ama-Credits Ami e-AI',
    menuOption4: '4. Imisebenzi Yakamuva',
    menuOption5: '5. Shintsha Ulimi',
    exitOption: '0. Phuma',
    replyPlaceholder: 'Phendula: __________',
    promptWhatNeeded: 'Yini uZara angakusiza ngayo namuhla?',
    agentMarketplaceTitle: 'Imakethe yama-Agent ka-Zara'
  },
  'st-ZA': {
    code: 'st-ZA',
    name: 'Sesotho',
    welcomeTitle: 'Re a o amohela ho Zara AI',
    welcomeSubtitle: 'Keno ya hao ya ditshebeletso tsa AI.',
    menuOption1: '1. Bolella Zara seo o se hlokang',
    menuOption2: '2. Batla di-Agent tsa AI',
    menuOption3: '3. Di-Credits tsa ka tsa AI',
    menuOption4: '4. Mesebetsi ya haufinyane',
    menuOption5: '5. Fetola Puo',
    exitOption: '0. Tswa',
    replyPlaceholder: 'Karabo: __________',
    promptWhatNeeded: 'Zara a ka o thusa ka eng kajeno?',
    agentMarketplaceTitle: 'Mmaraka wa di-Agent tsa Zara'
  },
  'af-ZA': {
    code: 'af-ZA',
    name: 'Afrikaans',
    welcomeTitle: 'Welkom by Zara AI',
    welcomeSubtitle: 'Jou poort na KI-dienste.',
    menuOption1: '1. Sê vir Zara wat jy benodig',
    menuOption2: '2. Blaai deur KI-Agente',
    menuOption3: '3. My KI-Krediete',
    menuOption4: '4. Onlangse Aktiwiteit',
    menuOption5: '5. Verander Taal',
    exitOption: '0. Verlaat',
    replyPlaceholder: 'Antwoord: __________',
    promptWhatNeeded: 'Waarmee kan Zara jou help?',
    agentMarketplaceTitle: 'Zara KI-Agent Markplek'
  }
};
