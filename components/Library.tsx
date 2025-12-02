import React, { useState } from 'react';
import { AppState, Prompt } from '../types';
import PromptCard from './PromptCard';
import { Search, Plus, Filter, Download, Upload } from 'lucide-react';

interface LibraryProps {
  state: AppState;
  onAddPrompt: (prompt: Prompt) => void;
  onDeletePrompt: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const Library: React.FC<LibraryProps> = ({ state, onAddPrompt, onDeletePrompt, onToggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newPrompt, setNewPrompt] = useState<Partial<Prompt>>({ category: 'General' });

  // Filtering Logic
  const filteredPrompts = state.prompts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (!newPrompt.title || !newPrompt.text || !newPrompt.category) return;
    
    const prompt: Prompt = {
      id: Date.now().toString(),
      title: newPrompt.title,
      text: newPrompt.text,
      category: newPrompt.category,
      isFavorite: false,
      systemInstruction: newPrompt.systemInstruction || ''
    };
    
    onAddPrompt(prompt);
    setIsAdding(false);
    setNewPrompt({ category: 'General' });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(state.prompts, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `goodi_library_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prompt Library</h1>
          <p className="text-gray-500 text-sm">Manage your automation scripts and workflows.</p>
        </div>
        
        <div className="flex gap-2">
           <button 
             onClick={handleExport}
             className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
           >
             <Download size={16} /> Export
           </button>
           <button 
             onClick={() => setIsAdding(!isAdding)}
             className="px-4 py-2 bg-goodi-teal text-white rounded-lg hover:bg-goodi-dark transition-colors shadow-sm text-sm font-bold flex items-center gap-2"
           >
             <Plus size={18} /> New Prompt
           </button>
        </div>
      </div>

      {/* Add New Form */}
      {isAdding && (
        <div className="bg-white border border-goodi-teal rounded-xl p-6 shadow-md animate-in slide-in-from-top-4">
          <h3 className="font-bold text-goodi-teal mb-4 uppercase text-xs tracking-wider">Create New Prompt</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Title</label>
              <input 
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-goodi-teal outline-none"
                placeholder="e.g. Monthly Report Generator"
                value={newPrompt.title || ''}
                onChange={e => setNewPrompt({...newPrompt, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
              <select 
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-goodi-teal outline-none bg-white"
                value={newPrompt.category}
                onChange={e => setNewPrompt({...newPrompt, category: e.target.value})}
              >
                <option value="General">General</option>
                <option value="Legal">Legal</option>
                <option value="Admin">Admin</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Prompt Text <span className="font-normal text-gray-400">(Use [brackets] for inputs)</span></label>
            <textarea 
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-goodi-teal outline-none h-24 font-mono"
              placeholder="Write a summary for [Topic]..."
              value={newPrompt.text || ''}
              onChange={e => setNewPrompt({...newPrompt, text: e.target.value})}
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1">System Instruction <span className="font-normal text-gray-400">(The "Persona" - Optional)</span></label>
            <input 
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-goodi-teal outline-none"
              placeholder="e.g. Act as a senior Finnish lawyer..."
              value={newPrompt.systemInstruction || ''}
              onChange={e => setNewPrompt({...newPrompt, systemInstruction: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-goodi-teal text-white rounded-lg hover:bg-goodi-dark font-semibold text-sm"
            >
              Save Prompt
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-goodi-teal focus:border-transparent transition-shadow shadow-sm sm:text-sm"
          placeholder="Search prompts, categories, or text..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {filteredPrompts.map(prompt => (
          <PromptCard 
            key={prompt.id} 
            prompt={prompt} 
            apiKey={state.apiKey}
            genome={state.genome}
            onDelete={onDeletePrompt}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;