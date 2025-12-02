# Goodi - AI Yhtiökumppani 🇫🇮

**The Digital Co-Founder for Finnish Micro-Enterprises.**

Goodi is a context-aware AI workspace designed specifically for the Finnish market. It transforms the Google Gemini API into a specialized business partner for solo entrepreneurs (*yksinyrittäjät*), freelancers, and small business owners.

Unlike generic chat interfaces, Goodi understands your business context (Y-tunnus, industry, tone) and acts as specialized fractional employees—from a Contract Lawyer (*Lakimies*) to a Sales Engine (*Myyntitykki*).

## ✨ Features

- **🏢 Company Genome**: Define your business identity once (Name, ID, Industry, Tone). Goodi injects this context into every AI request, ensuring responses are relevant and on-brand.
- **🧠 Role-Based Dashboard**: Switch between 8 specialized virtual advisors:
  - **Lakimies**: Finnish contract law & compliance.
  - **Talous**: VAT (ALV), YEL insurance, and tax guidance.
  - **Myynti**: B2B sales copy and objection handling.
  - **Strategi**: First principles thinking and business modeling.
  - **Koodari**: Technical architecture and debugging.
  - **Viestintä**: Professional communication and tone shifting.
  - **Valmentaja**: Productivity frameworks and learning plans.
- **📚 Prompt Library**: A curated collection of pre-engineered prompts (seed library) tailored for the Finnish business environment. Create, edit, and export your own workflows.
- **🔒 Privacy First (BYOK)**: Built on a "Bring Your Own Key" architecture. Your API keys and business data are stored exclusively in your browser's Local Storage. Nothing is sent to our servers.
- **⚡ Fast & Reactive**: Built with React 19, Tailwind CSS, and the latest Google GenAI SDK.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API Key (Get one at [aistudio.google.com](https://aistudio.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/goodi-ai.git
   cd goodi-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`.

## ⚙️ Configuration

1. **Add API Key**: 
   - Navigate to the **Settings** tab.
   - Paste your Gemini API Key.
   - *Note: The key is saved locally in your browser.*

2. **Define Company Genome**:
   - In **Settings**, fill out your Company Name, Business ID (Y-tunnus), Industry, and preferred Language/Tone.
   - This "Genome" is used to tailor every response to your specific business needs.

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router v7
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google GenAI SDK (`@google/genai`)
- **Build Tool**: Vite

## 📂 Project Structure

```
├── src/
│   ├── components/      # UI Components (Dashboard, Library, PromptCard)
│   ├── services/        # Gemini API integration service
│   ├── App.tsx          # Main application logic & routing
│   ├── constants.ts     # Seed data & role definitions
│   ├── types.ts         # TypeScript interfaces
│   ├── index.tsx        # Entry point
│   └── index.html       # HTML root
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Note: Goodi provides AI-generated assistance. Always verify important legal and financial information with certified professionals in Finland.*
