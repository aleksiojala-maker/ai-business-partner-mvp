import { Prompt, VirtualRole } from './types';

export const DEFAULT_GENOME = {
  name: '',
  y_tunnus: '',
  industry: '',
  tone: 'Professional' as const,
  language: 'Finnish' as const,
};

export const SEED_LIBRARY: Prompt[] = [
  {
    id: 'L_01',
    title: 'NDA Generator (Mutual)',
    category: 'Legal',
    text: 'Draft a mutual Non-Disclosure Agreement (NDA) between [My Company] and [Counterparty Name] for the purpose of [Purpose]. Ensure jurisdiction is set to Helsinki District Court.',
    isFavorite: false,
    systemInstruction: 'Act as a senior Finnish contract lawyer. Draft under Finnish law (Sopimusoikeus). Be precise, avoid "rally English". Use specific terms like "liikesalaisuus".'
  },
  {
    id: 'L_02',
    title: 'Liability Risk Check',
    category: 'Legal',
    text: 'Review the following contract clause for unlimited liability risks: \n\n[Contract Text]',
    isFavorite: false,
    systemInstruction: 'Analyze for unlimited liability. Flag strictly based on Finnish commercial practice. Warn if liability cap is missing.'
  },
  {
    id: 'A_01',
    title: 'YEL Explainer',
    category: 'Admin',
    text: 'Explain how YEL insurance impacts my business if my estimated income (työtulo) is [Income Amount] EUR.',
    isFavorite: true,
    systemInstruction: 'Explain YEL (Yrittäjän eläkevakuutus) simply. Use current year rates. Focus on the impact on social security (Kela).'
  },
  {
    id: 'A_02',
    title: 'VAT Calculator (ALV)',
    category: 'Admin',
    text: 'I charged a gross sum of [Total Amount] EUR. Calculate the VAT (ALV) portion and the net amount.',
    isFavorite: true,
    systemInstruction: 'Calculate VAT at standard Finnish rate (25.5%). Show formula: Gross / 1.255 = Net. Show Net and Tax portion clearly.'
  },
  {
    id: 'S_01',
    title: 'Cold Email (B2B Finnish)',
    category: 'Sales',
    text: 'Write a cold introduction email to [Prospect Name] at [Company] offering [My Service].',
    isFavorite: false,
    systemInstruction: 'Write a persuasive B2B cold email in modern Finnish. Value-first, concise. No fluff. Respect the recipient\'s time.'
  },
  {
    id: 'S_02',
    title: 'English Polish (Finglish Fixer)',
    category: 'Sales',
    text: 'Rewrite this text to sound like a native US executive, removing Finnish idioms: \n\n[Draft Text]',
    isFavorite: false,
    systemInstruction: 'Correct grammar. Remove "Finglish". Make it punchy and professional American English.'
  }
];

export const ROLE_DESCRIPTIONS = {
  [VirtualRole.GENERAL]: "Ready to help with day-to-day tasks.",
  [VirtualRole.LAKIMIES]: "Specialized in Finnish contract law and compliance.",
  [VirtualRole.TALOUS]: "Expert in Verohallinto rules, VAT, and YEL.",
  [VirtualRole.MYYNTI]: "Persuasive copywriter for B2B growth."
};