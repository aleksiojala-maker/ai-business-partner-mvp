import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Library from './components/Library';
import Settings from './components/Settings';
import { AppState, Prompt, CompanyGenome } from './types';
import { DEFAULT_GENOME, SEED_LIBRARY } from './constants';

const LOCAL_STORAGE_KEY = 'goodi_app_data_v1';

const App: React.FC = () => {
  // --- State Initialization ---
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    return {
      apiKey: '',
      genome: DEFAULT_GENOME,
      prompts: SEED_LIBRARY
    };
  });

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appState));
  }, [appState]);

  // --- Handlers ---
  const handleUpdateKey = (key: string) => {
    setAppState(prev => ({ ...prev, apiKey: key }));
  };

  const handleUpdateGenome = (genome: CompanyGenome) => {
    setAppState(prev => ({ ...prev, genome }));
  };

  const handleAddPrompt = (prompt: Prompt) => {
    setAppState(prev => ({
      ...prev,
      prompts: [prompt, ...prev.prompts]
    }));
  };

  const handleDeletePrompt = (id: string) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      setAppState(prev => ({
        ...prev,
        prompts: prev.prompts.filter(p => p.id !== id)
      }));
    }
  };

  const handleToggleFavorite = (id: string) => {
    setAppState(prev => ({
      ...prev,
      prompts: prev.prompts.map(p => 
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      )
    }));
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Dashboard 
              state={appState} 
              onDeletePrompt={handleDeletePrompt}
              onToggleFavorite={handleToggleFavorite}
            />
          } />
          <Route path="library" element={
            <Library 
              state={appState}
              onAddPrompt={handleAddPrompt}
              onDeletePrompt={handleDeletePrompt}
              onToggleFavorite={handleToggleFavorite}
            />
          } />
          <Route path="settings" element={
            <Settings 
              state={appState}
              onUpdateKey={handleUpdateKey}
              onUpdateGenome={handleUpdateGenome}
            />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;