import React, { useState, useEffect } from 'react';
import { Prompt, CompanyGenome } from '../types';
import { Play, Copy, Check, Trash2, Star, Variable } from 'lucide-react';
import { generateResponse } from '../services/geminiService';

interface PromptCardProps {
  prompt: Prompt;
  apiKey: string;
  genome: CompanyGenome;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, apiKey, genome, onDelete, onToggleFavorite }) => {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Extract variables on mount
  useEffect(() => {
    const matches = prompt.text.match(/\[(.*?)\]/g);
    if (matches) {
      const initialVars: Record<string, string> = {};
      matches.forEach(m => {
        const key = m.replace('[', '').replace(']', '');
        initialVars[key] = '';
      });
      setVariables(initialVars);
    }
  }, [prompt.text]);

  const handleRun = async () => {
    if (!apiKey) {
      setError("Please set your Gemini API Key in Settings.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let finalPrompt = prompt.text;
      Object.entries(variables).forEach(([key, value]) => {
        finalPrompt = finalPrompt.replace(`[${key}]`, value || `[${key}]`);
      });

      const response = await generateResponse(apiKey, finalPrompt, genome, prompt.systemInstruction);
      setResult(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasVariables = Object.keys(variables).length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-start">
        <div>
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-gray-100 text-gray-500 mb-1">
            {prompt.category}
          </span>
          <h3 className="font-semibold text-gray-800 text-lg leading-tight">{prompt.title}</h3>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => onToggleFavorite(prompt.id)}
            className={`p-1.5 rounded-md transition-colors ${prompt.isFavorite ? 'text-yellow-400 hover:bg-yellow-50' : 'text-gray-300 hover:text-gray-400 hover:bg-gray-50'}`}
          >
            <Star size={18} fill={prompt.isFavorite ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={() => onDelete(prompt.id)}
            className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 space-y-4">
        <div className="text-sm text-gray-600 whitespace-pre-wrap font-mono bg-gray-50 p-3 rounded-lg border border-gray-100">
          {prompt.text}
        </div>

        {hasVariables && (
          <div className="space-y-3 pt-2 border-t border-dashed border-gray-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase">
              <Variable size={12} />
              <span>Inputs</span>
            </div>
            {Object.keys(variables).map(key => (
              <div key={key}>
                <input 
                  type="text" 
                  placeholder={`Enter ${key}...`}
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-goodi-teal focus:border-transparent transition-all"
                  value={variables[key]}
                  onChange={(e) => setVariables(prev => ({ ...prev, [key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 pt-0">
        <button 
          onClick={handleRun}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-goodi-teal hover:bg-goodi-dark text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <>
              <Play size={16} fill="currentColor" />
              <span>Run with Gemini</span>
            </>
          )}
        </button>
        
        {error && (
          <div className="mt-3 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100">
            {error}
          </div>
        )}
      </div>

      {/* Result Area */}
      {result && (
        <div className="bg-slate-50 border-t border-gray-200 p-4 rounded-b-xl animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Output</h4>
            <button 
              onClick={() => handleCopy(result)}
              className="text-xs flex items-center gap-1 text-goodi-teal hover:text-goodi-dark font-medium"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptCard;