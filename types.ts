export interface Prompt {
  id: string;
  title: string;
  category: string;
  text: string;
  isFavorite: boolean;
  systemInstruction?: string; // Hidden instruction for tone/persona
  variables?: string[]; // Extracted [variables]
}

export interface CompanyGenome {
  name: string;
  y_tunnus: string;
  industry: string;
  tone: 'Professional' | 'Casual' | 'Authoritative' | 'Friendly';
  language: 'Finnish' | 'English' | 'Swedish';
}

export interface AppState {
  apiKey: string;
  genome: CompanyGenome;
  prompts: Prompt[];
}

export enum VirtualRole {
  GENERAL = 'General Assistant',
  LAKIMIES = 'Lakimies (Legal)',
  TALOUS = 'Talouspäällikkö (Finance)',
  MYYNTI = 'Myyntitykki (Sales)'
}