import React, { useState, useEffect } from 'react';
import { AppState, CompanyGenome } from '../types';
import { Save, AlertTriangle, ShieldCheck } from 'lucide-react';

interface SettingsProps {
  state: AppState;
  onUpdateKey: (key: string) => void;
  onUpdateGenome: (genome: CompanyGenome) => void;
}

const Settings: React.FC<SettingsProps> = ({ state, onUpdateKey, onUpdateGenome }) => {
  const [keyInput, setKeyInput] = useState(state.apiKey);
  const [genomeInput, setGenomeInput] = useState<CompanyGenome>(state.genome);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isSaved) {
      const timer = setTimeout(() => setIsSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSaved]);

  const handleSave = () => {
    onUpdateKey(keyInput);
    onUpdateGenome(genomeInput);
    setIsSaved(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm">Configure your Digital Co-Founder.</p>
      </div>

      {/* API Key Section */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
           <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
             <div className="w-1 h-6 bg-goodi-teal rounded-full"></div>
             Gemini API Configuration
           </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3 items-start">
            <AlertTriangle className="text-blue-500 shrink-0 mt-0.5" size={18} />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Bring Your Own Key (BYOK)</p>
              <p>Your API key is stored locally in your browser. We do not transmit it to our servers. This ensures your privacy and control.</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Google Gemini API Key</label>
            <input 
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-goodi-teal focus:border-transparent"
              placeholder="AIzaSy..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-xs text-goodi-teal hover:underline mt-2 inline-block">Get an API Key here</a>
          </div>
        </div>
      </section>

      {/* Company Genome Section */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
           <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
             <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
             Company Genome
           </h2>
           <p className="text-sm text-gray-500 mt-1">
             This data is injected into every AI request to provide context-aware answers.
           </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
             <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Company Name</label>
             <input 
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={genomeInput.name}
                onChange={e => setGenomeInput({...genomeInput, name: e.target.value})}
                placeholder="e.g. Louhi Net Oy"
             />
          </div>

          <div>
             <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Business ID (Y-tunnus)</label>
             <input 
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={genomeInput.y_tunnus}
                onChange={e => setGenomeInput({...genomeInput, y_tunnus: e.target.value})}
                placeholder="1234567-8"
             />
          </div>

          <div>
             <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Industry</label>
             <input 
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={genomeInput.industry}
                onChange={e => setGenomeInput({...genomeInput, industry: e.target.value})}
                placeholder="e.g. IT Consulting"
             />
          </div>

          <div>
             <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Brand Tone</label>
             <select 
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                value={genomeInput.tone}
                onChange={e => setGenomeInput({...genomeInput, tone: e.target.value as any})}
              >
                <option value="Professional">Professional</option>
                <option value="Casual">Casual</option>
                <option value="Authoritative">Authoritative</option>
                <option value="Friendly">Friendly</option>
              </select>
          </div>

          <div>
             <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Primary Language</label>
             <select 
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                value={genomeInput.language}
                onChange={e => setGenomeInput({...genomeInput, language: e.target.value as any})}
              >
                <option value="Finnish">Finnish (Suomi)</option>
                <option value="English">English</option>
                <option value="Swedish">Swedish (Svenska)</option>
              </select>
          </div>
        </div>
      </section>

      {/* Save Action */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ShieldCheck size={16} />
          <span>Data stored locally in browser</span>
        </div>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all transform hover:-translate-y-0.5 ${
            isSaved ? 'bg-green-500' : 'bg-gray-900 hover:bg-black'
          }`}
        >
          {isSaved ? (
             <>Saved Successfully!</>
          ) : (
             <><Save size={18} /> Save Settings</>
          )}
        </button>
      </div>
    </div>
  );
};

export default Settings;