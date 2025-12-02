import { Prompt, VirtualRole } from './types';

export const DEFAULT_GENOME = {
  name: '',
  y_tunnus: '',
  industry: '',
  tone: 'Professional' as const,
  language: 'Finnish' as const,
};

export const SEED_LIBRARY: Prompt[] = [
  // --- EXISTING FINNISH CONTEXT PROMPTS ---
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
  },

  // --- STRATEGY ---
  {
    id: 'STRAT_01',
    title: "First Principles Thinking",
    text: "Deconstruct [Problem/Challenge] using 'First Principles' thinking. Break it down into its fundamental truths and build a novel solution up from there, ignoring standard conventions.",
    category: "Strategy",
    isFavorite: true
  },
  {
    id: 'STRAT_02',
    title: "Jobs to be Done",
    text: "Analyze [Product/Service] using the 'Jobs to be Done' framework. Identify the functional, emotional, and social 'jobs' that users are hiring this product to do.",
    category: "Strategy",
    isFavorite: false
  },
  {
    id: 'STRAT_03',
    title: "Alex Hormozi Offer",
    text: "Refine this offer for [Product] to make it a 'Grand Slam Offer'. Focus on maximizing perceived value, minimizing risk, and increasing speed to result.",
    category: "Strategy",
    isFavorite: false
  },
  {
    id: 'STRAT_04',
    title: "Decision Matrix",
    text: "Help me decide between [Option A] and [Option B]. Create a weighted decision matrix considering cost, time, impact, and risk.",
    category: "Strategy",
    isFavorite: false
  },

  // --- CODING ---
  {
    id: 'CODE_01',
    title: "Socratic Debugging",
    text: "I have a bug in my [Language] code. Don't just fix it. Act as a Socratic tutor and ask me probing questions to help me find the root cause of [Error Description].",
    category: "Coding",
    isFavorite: false
  },
  {
    id: 'CODE_02',
    title: "Code Architecture",
    text: "Act as a Senior Solutions Architect. Design a high-level system architecture for [Project Description] using [Tech Stack]. Outline key components, data flow, and potential bottlenecks.",
    category: "Coding",
    isFavorite: false
  },
  {
    id: 'CODE_03',
    title: "Complexity Analysis",
    text: "Analyze the Time and Space complexity (Big O Notation) of this function. Suggest one optimization to improve efficiency: \n\n[Code Snippet]",
    category: "Coding",
    isFavorite: false
  },
  {
    id: 'CODE_04',
    title: "Generate Unit Tests",
    text: "Write comprehensive unit tests for this [Language] code using [Testing Framework]. Include edge cases and failure scenarios.",
    category: "Coding",
    isFavorite: false
  },

  // --- MARKETING (Mapped to Sales) ---
  {
    id: 'SALES_03',
    title: "AIDA Framework",
    text: "Write a landing page copy for [Product] using the AIDA (Attention, Interest, Desire, Action) framework. The target audience is [Audience].",
    category: "Sales",
    isFavorite: false
  },
  {
    id: 'SALES_04',
    title: "Viral Hooks",
    text: "Generate 5 'scroll-stopping' hooks for a social media post about [Topic]. Use the 'Open Loop' psychological technique to create intense curiosity.",
    category: "Sales",
    isFavorite: false
  },
  {
    id: 'SALES_05',
    title: "Objection Handling",
    text: "List the top 5 potential objections a customer might have about buying [Product]. Write a persuasive counter-argument for each one.",
    category: "Sales",
    isFavorite: false
  },
  {
    id: 'SALES_06',
    title: "SEO Strategy",
    text: "Generate a list of 10 high-volume, low-competition SEO keywords for a blog about [Niche]. Group them by 'Informational' and 'Transactional' intent.",
    category: "Sales",
    isFavorite: false
  },

  // --- WRITING ---
  {
    id: 'WRITE_01',
    title: "The Hemingway Edit",
    text: "Rewrite the following text to be punchier and clearer. Remove adverbs, use active voice, and shorten sentences in the style of Ernest Hemingway.",
    category: "Writing",
    isFavorite: true
  },
  {
    id: 'WRITE_02',
    title: "Analogy Generator",
    text: "Explain the concept of [Complex Concept] using a simple analogy involving [Everyday Object/Activity] so a non-expert can understand it instantly.",
    category: "Writing",
    isFavorite: false
  },
  {
    id: 'WRITE_03',
    title: "Tone Shift",
    text: "Rewrite this message to [Recipient] changing the tone from [Current Tone] to [Desired Tone] (e.g., authoritative, empathetic, witty).",
    category: "Writing",
    isFavorite: false
  },
  {
    id: 'WRITE_04',
    title: "Storytelling Arc",
    text: "Outline a blog post about [Topic] using the 'Hero's Journey' narrative structure. Define the Call to Adventure, the Ordeal, and the Resolution.",
    category: "Writing",
    isFavorite: false
  },

  // --- PRODUCTIVITY ---
  {
    id: 'PROD_01',
    title: "Feynman Technique",
    text: "Use the Feynman Technique to explain [Topic] to me as if I were a 12-year-old. Identify gaps in logic and simplify complex terms.",
    category: "Productivity",
    isFavorite: false
  },
  {
    id: 'PROD_02',
    title: "Pareto Principle (80/20)",
    text: "I want to learn [Skill]. Apply the 80/20 rule to identify the 20% of sub-skills that will give me 80% of the results. Create a 1-week learning plan.",
    category: "Productivity",
    isFavorite: false
  },
  {
    id: 'PROD_03',
    title: "Mental Model Pal",
    text: "I am facing [Problem]. Suggest 3 distinct Mental Models (e.g., Occam's Razor, Second-Order Thinking) I can use to solve this.",
    category: "Productivity",
    isFavorite: false
  },

  // --- COMMUNICATION ---
  {
    id: 'COMM_01',
    title: "Negotiation Script",
    text: "Act as an FBI negotiator. Script a response to [Scenario/Conflict]. Use 'Tactical Empathy' and 'Calibrated Questions' to lower tensions and gain leverage.",
    category: "Communication",
    isFavorite: false
  }
];

export const ROLE_DESCRIPTIONS = {
  [VirtualRole.GENERAL]: "Ready to help with day-to-day tasks.",
  [VirtualRole.LAKIMIES]: "Specialized in Finnish contract law and compliance.",
  [VirtualRole.TALOUS]: "Expert in Verohallinto rules, VAT, and YEL.",
  [VirtualRole.MYYNTI]: "Persuasive copywriter for B2B growth.",
  [VirtualRole.STRATEGI]: "Visionary planning and problem solving.",
  [VirtualRole.KOODARI]: "Technical architecture and code quality.",
  [VirtualRole.VIESTINTA]: "Clear communication and storytelling.",
  [VirtualRole.VALMENTAJA]: "Productivity hacks and learning models."
};