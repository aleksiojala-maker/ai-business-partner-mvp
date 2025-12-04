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

export interface Product {
  id: string;
  name: string;
  type: 'Service' | 'Product';
  price: number;
  vat: number; // e.g., 25.5
}

export interface Transaction {
  id: string;
  date: string;
  type: 'Income' | 'Expense';
  description: string;
  amount: number; // Gross amount
  status: 'Paid' | 'Pending' | 'Overdue';
  customer?: string;
  productId?: string; // Link to a specific product
}

export interface AppState {
  apiKey: string;
  genome: CompanyGenome;
  prompts: Prompt[];
  products: Product[];
  transactions: Transaction[];
}

export enum VirtualRole {
  GENERAL = 'General Assistant',
  LAKIMIES = 'Lakimies (Legal)',
  TALOUS = 'Talouspäällikkö (Finance)',
  MYYNTI = 'Myyntitykki (Sales)',
  STRATEGI = 'Strategisti (Strategy)',
  KOODARI = 'Koodari (Tech)',
  VIESTINTA = 'Viestintä (Comms)',
  VALMENTAJA = 'Valmentaja (Coach)'
}