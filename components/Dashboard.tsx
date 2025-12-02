import React, { useState } from 'react';
import { AppState, VirtualRole } from '../types';
import { ROLE_DESCRIPTIONS } from '../constants';
import PromptCard from './PromptCard';
import { Briefcase, Gavel, Calculator, BadgeDollarSign, Sparkles, BrainCircuit, Code2, Feather, Zap } from 'lucide-react';

interface DashboardProps {
  state: AppState;
  onDeletePrompt: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ state, onDeletePrompt, onToggleFavorite }) => {
  const [selectedRole, setSelectedRole] = useState<VirtualRole>(VirtualRole.GENERAL);

  // Filter prompts based on role logic
  const getPromptsForRole = () => {
    switch (selectedRole) {
      case VirtualRole.LAKIMIES: return state.prompts.filter(p => p.category === 'Legal');
      case VirtualRole.TALOUS: return state.prompts.filter(p => p.category === 'Admin');
      case VirtualRole.MYYNTI: return state.prompts.filter(p => p.category === 'Sales');
      case VirtualRole.STRATEGI: return state.prompts.filter(p => p.category === 'Strategy');
      case VirtualRole.KOODARI: return state.prompts.filter(p => p.category === 'Coding');
      case VirtualRole.VIESTINTA: return state.prompts.filter(p => p.category === 'Writing' || p.category === 'Communication');
      case VirtualRole.VALMENTAJA: return state.prompts.filter(p => p.category === 'Productivity');
      default: return state.prompts.filter(p => p.isFavorite); // General shows favorites
    }
  };

  const displayedPrompts = getPromptsForRole();

  const RoleButton = ({ role, icon: Icon, label }: { role: VirtualRole, icon: any, label: string }) => (
    <button
      onClick={() => setSelectedRole(role)}
      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
        selectedRole === role 
          ? 'bg-goodi-light border-goodi-teal text-goodi-teal shadow-sm ring-1 ring-goodi-teal' 
          : 'bg-white border-gray-200 text-gray-500 hover:border-goodi-teal hover:text-goodi-teal hover:bg-gray-50'
      }`}
    >
      <Icon size={24} className="mb-2" />
      <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-center">{label}</span>
    </button>
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Welcome Section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center md:text-left md:flex md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Huomenta, {state.genome.name || 'Entrepreneur'}!
          </h1>
          <p className="text-gray-600 max-w-xl">
            This is your digital boardroom. Your company genome is active. 
            Select an advisor role below to get context-aware assistance.
          </p>
          {(!state.genome.name || !state.apiKey) && (
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-medium border border-yellow-200">
              ⚠️ Setup Incomplete: Check Settings
            </div>
          )}
        </div>
        <div className="hidden md:block">
           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-goodi-teal to-blue-500 flex items-center justify-center text-white shadow-lg">
             <Sparkles size={32} />
           </div>
        </div>
      </section>

      {/* Role Switcher */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Select Your Partner</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
          <RoleButton role={VirtualRole.GENERAL} icon={Briefcase} label="Assistant" />
          <RoleButton role={VirtualRole.LAKIMIES} icon={Gavel} label="Lakimies" />
          <RoleButton role={VirtualRole.TALOUS} icon={Calculator} label="Talous" />
          <RoleButton role={VirtualRole.MYYNTI} icon={BadgeDollarSign} label="Myynti" />
          
          <RoleButton role={VirtualRole.STRATEGI} icon={BrainCircuit} label="Strategi" />
          <RoleButton role={VirtualRole.KOODARI} icon={Code2} label="Koodari" />
          <RoleButton role={VirtualRole.VIESTINTA} icon={Feather} label="Viestintä" />
          <RoleButton role={VirtualRole.VALMENTAJA} icon={Zap} label="Valmentaja" />
        </div>
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600 flex gap-3 items-start">
          <span className="font-bold text-goodi-teal shrink-0">Active Context:</span>
          {ROLE_DESCRIPTIONS[selectedRole]}
        </div>
      </section>

      {/* Prompts Grid */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          {selectedRole === VirtualRole.GENERAL ? 'Favorite Actions' : `Recommended for ${selectedRole}`}
        </h2>
        
        {displayedPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPrompts.map(prompt => (
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
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-400">No prompts found for this category.</p>
            <p className="text-sm text-gray-400 mt-1">Add new prompts in the Library.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;