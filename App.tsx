import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Library from './components/Library';
import Settings from './components/Settings';
import Finance from './components/Finance';
import { AppState, Prompt, CompanyGenome, Product, Transaction } from './types';
import { DEFAULT_GENOME, SEED_LIBRARY, SEED_PRODUCTS, SEED_TRANSACTIONS } from './constants';

const LOCAL_STORAGE_KEY = 'goodi_app_data_v1';

const App: React.FC = () => {
  // --- State Initialization ---
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure new fields exist if loading from old storage
        return {
          ...parsed,
          products: parsed.products || SEED_PRODUCTS,
          transactions: parsed.transactions || SEED_TRANSACTIONS
        };
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    return {
      apiKey: '',
      genome: DEFAULT_GENOME,
      prompts: SEED_LIBRARY,
      products: SEED_PRODUCTS,
      transactions: SEED_TRANSACTIONS
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

  // --- Finance Handlers ---
  const handleAddProduct = (product: Product) => {
    setAppState(prev => ({
      ...prev,
      products: [...prev.products, product]
    }));
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Delete this product?')) {
      setAppState(prev => ({
        ...prev,
        products: prev.products.filter(p => p.id !== id)
      }));
    }
  };

  const handleAddTransaction = (transaction: Transaction) => {
    setAppState(prev => ({
      ...prev,
      transactions: [transaction, ...prev.transactions]
    }));
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('Delete this transaction?')) {
      setAppState(prev => ({
        ...prev,
        transactions: prev.transactions.filter(t => t.id !== id)
      }));
    }
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
          <Route path="finance" element={
            <Finance 
              state={appState}
              onAddTransaction={handleAddTransaction}
              onDeleteTransaction={handleDeleteTransaction}
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
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;