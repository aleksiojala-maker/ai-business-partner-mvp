import React, { useState, useEffect } from 'react';
import { AppState, CompanyGenome, Product } from '../types';
import { Save, AlertTriangle, ShieldCheck, Plus, Trash2, Package } from 'lucide-react';

interface SettingsProps {
  state: AppState;
  onUpdateKey: (key: string) => void;
  onUpdateGenome: (genome: CompanyGenome) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ state, onUpdateKey, onUpdateGenome, onAddProduct, onDeleteProduct }) => {
  const [keyInput, setKeyInput] = useState(state.apiKey);
  const [genomeInput, setGenomeInput] = useState<CompanyGenome>(state.genome);
  const [isSaved, setIsSaved] = useState(false);
  
  // Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ type: 'Service', vat: 25.5 });

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

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const p: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      type: newProduct.type as 'Service' | 'Product',
      price: Number(newProduct.price),
      vat: Number(newProduct.vat)
    };
    onAddProduct(p);
    setNewProduct({ type: 'Service', vat: 25.5, name: '', price: 0 });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm">Configure your Digital Co-Founder.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: API & Genome */}
        <div className="space-y-8">
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
                  <p>Your API key is stored locally in your browser. We do not transmit it to our servers.</p>
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
                 This data is injected into AI requests for context.
               </p>
            </div>
            
            <div className="p-6 grid grid-cols-1 gap-4">
              <div>
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
                 />
              </div>

              <div>
                 <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Industry</label>
                 <input 
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={genomeInput.industry}
                    onChange={e => setGenomeInput({...genomeInput, industry: e.target.value})}
                 />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Brand Tone</label>
                   <select 
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white"
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
                   <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Language</label>
                   <select 
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white"
                      value={genomeInput.language}
                      onChange={e => setGenomeInput({...genomeInput, language: e.target.value as any})}
                    >
                      <option value="Finnish">Finnish</option>
                      <option value="English">English</option>
                      <option value="Swedish">Swedish</option>
                    </select>
                </div>
              </div>
            </div>
            {/* Global Save Button */}
            <div className="p-6 bg-gray-50 border-t border-gray-100">
               <button 
                onClick={handleSave}
                className={`w-full flex justify-center items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all transform hover:-translate-y-0.5 ${
                  isSaved ? 'bg-green-500' : 'bg-gray-900 hover:bg-black'
                }`}
              >
                {isSaved ? <span className="flex items-center gap-2"><ShieldCheck size={18}/> Saved!</span> : <span className="flex items-center gap-2"><Save size={18} /> Save Config</span>}
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Products & Services */}
        <div className="space-y-8">
           <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                 <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                   <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                   Products & Services
                 </h2>
                 <Package size={20} className="text-gray-400" />
              </div>

              <div className="p-6 bg-gray-50 border-b border-gray-100">
                <h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Add New Item</h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input 
                    placeholder="Name (e.g. Consulting)" 
                    className="col-span-2 border border-gray-300 rounded-lg p-2 text-sm"
                    value={newProduct.name || ''}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  />
                  <input 
                    type="number" 
                    placeholder="Price (€)" 
                    className="border border-gray-300 rounded-lg p-2 text-sm"
                    value={newProduct.price || ''}
                    onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  />
                  <select 
                     className="border border-gray-300 rounded-lg p-2 text-sm bg-white"
                     value={newProduct.type}
                     onChange={e => setNewProduct({...newProduct, type: e.target.value as any})}
                  >
                    <option value="Service">Service</option>
                    <option value="Product">Product</option>
                  </select>
                </div>
                <button 
                  onClick={handleAddProduct}
                  className="w-full py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-100 transition-colors flex justify-center items-center gap-2"
                >
                  <Plus size={16} /> Add to Catalog
                </button>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[500px]">
                {state.products && state.products.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {state.products.map(p => (
                      <div key={p.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                          <p className="text-xs text-gray-500">{p.type} • VAT {p.vat}%</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-gray-700 text-sm">€{p.price}</span>
                          <button 
                            onClick={() => onDeleteProduct(p.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400 text-sm">
                    No products added yet.
                  </div>
                )}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;