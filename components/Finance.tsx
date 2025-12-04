import React, { useState } from 'react';
import { AppState, Transaction, Product } from '../types';
import { generateResponse } from '../services/geminiService';
import { Plus, TrendingUp, TrendingDown, DollarSign, BrainCircuit, Trash2 } from 'lucide-react';

interface FinanceProps {
  state: AppState;
  onAddTransaction: (t: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

const Finance: React.FC<FinanceProps> = ({ state, onAddTransaction, onDeleteTransaction }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    type: 'Income',
    status: 'Paid',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Stats Calculation
  const totalIncome = state.transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = state.transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpense;

  const handleSave = () => {
    if (!newTransaction.amount || !newTransaction.description) return;

    const t: Transaction = {
      id: Date.now().toString(),
      date: newTransaction.date!,
      type: newTransaction.type as 'Income' | 'Expense',
      description: newTransaction.description!,
      amount: Number(newTransaction.amount),
      status: newTransaction.status as 'Paid' | 'Pending' | 'Overdue',
      customer: newTransaction.customer,
      productId: newTransaction.productId
    };

    onAddTransaction(t);
    setIsAdding(false);
    setNewTransaction({ type: 'Income', status: 'Paid', date: new Date().toISOString().split('T')[0], description: '', amount: 0, customer: '' });
  };

  const handleProductSelect = (productId: string) => {
    const product = state.products.find(p => p.id === productId);
    if (product) {
      setNewTransaction(prev => ({
        ...prev,
        productId,
        description: product.name,
        amount: product.price,
        type: 'Income' // Products usually imply income
      }));
    }
  };

  const generateInsight = async () => {
    if (!state.apiKey) {
      alert("Please add your Gemini API Key in Settings first.");
      return;
    }
    
    setIsAnalyzing(true);
    setAiInsight(null);

    const financialContext = `
      Current Financial Snapshot:
      - Total Income: ${totalIncome} EUR
      - Total Expenses: ${totalExpense} EUR
      - Net Profit: ${netProfit} EUR
      
      Recent Transactions:
      ${state.transactions.slice(0, 5).map(t => `- ${t.date}: ${t.description} (${t.type}) - ${t.amount} EUR`).join('\n')}
    `;

    const prompt = `
      Act as a CFO for a Finnish micro-enterprise. 
      Analyze the provided financial data. 
      1. Give a brief health check status.
      2. Suggest 2 actionable steps to improve profitability or cash flow.
      Keep it concise and encouraging.
      
      Data: ${financialContext}
    `;

    try {
      const response = await generateResponse(state.apiKey, prompt, state.genome);
      setAiInsight(response);
    } catch (e: any) {
      alert("Error generating insight: " + e.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
          <p className="text-gray-500 text-sm">Track your cash flow and get AI-powered insights.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={generateInsight}
            disabled={isAnalyzing}
            className="px-4 py-2 bg-purple-100 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-200 text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            {isAnalyzing ? (
               <span className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></span>
            ) : (
               <BrainCircuit size={18} />
            )}
            {isAnalyzing ? 'Analyzing...' : 'Ask AI CFO'}
          </button>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 bg-goodi-teal text-white rounded-lg hover:bg-goodi-dark transition-colors shadow-sm text-sm font-bold flex items-center gap-2"
          >
            <Plus size={18} /> Log Transaction
          </button>
        </div>
      </div>

      {/* AI Insight Card */}
      {aiInsight && (
        <div className="bg-gradient-to-r from-purple-50 to-white border border-purple-100 rounded-xl p-6 shadow-sm animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2 mb-2 text-purple-700 font-bold text-sm uppercase tracking-wide">
            <BrainCircuit size={16} />
            AI CFO Analysis
          </div>
          <div className="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed">
            {aiInsight}
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <span className="text-sm font-medium text-gray-500">Total Income</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">€{totalIncome.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
              <TrendingDown size={20} />
            </div>
            <span className="text-sm font-medium text-gray-500">Total Expenses</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">€{totalExpense.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <DollarSign size={20} />
            </div>
            <span className="text-sm font-medium text-gray-500">Net Profit</span>
          </div>
          <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            €{netProfit.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Add Transaction Form */}
      {isAdding && (
        <div className="bg-white border border-goodi-teal rounded-xl p-6 shadow-md animate-in slide-in-from-top-4">
          <h3 className="font-bold text-goodi-teal mb-4 uppercase text-xs tracking-wider">Log New Transaction</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
             {/* Product Shortcut */}
             <div className="col-span-1 md:col-span-2 lg:col-span-4">
               <label className="block text-xs font-semibold text-gray-500 mb-2">Quick Add from Products</label>
               <div className="flex flex-wrap gap-2">
                 {state.products.map(p => (
                   <button 
                     key={p.id}
                     onClick={() => handleProductSelect(p.id)}
                     className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-700 transition-colors"
                   >
                     {p.name} (€{p.price})
                   </button>
                 ))}
               </div>
             </div>

             <div>
               <label className="block text-xs font-semibold text-gray-500 mb-1">Type</label>
               <select 
                 className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-goodi-teal bg-white"
                 value={newTransaction.type}
                 onChange={e => setNewTransaction({...newTransaction, type: e.target.value as any})}
               >
                 <option value="Income">Income (+)</option>
                 <option value="Expense">Expense (-)</option>
               </select>
             </div>
             
             <div>
               <label className="block text-xs font-semibold text-gray-500 mb-1">Date</label>
               <input 
                 type="date"
                 className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-goodi-teal"
                 value={newTransaction.date}
                 onChange={e => setNewTransaction({...newTransaction, date: e.target.value})}
               />
             </div>

             <div>
               <label className="block text-xs font-semibold text-gray-500 mb-1">Amount (€)</label>
               <input 
                 type="number"
                 className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-goodi-teal"
                 value={newTransaction.amount}
                 onChange={e => setNewTransaction({...newTransaction, amount: Number(e.target.value)})}
               />
             </div>

             <div>
               <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
               <select 
                 className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-goodi-teal bg-white"
                 value={newTransaction.status}
                 onChange={e => setNewTransaction({...newTransaction, status: e.target.value as any})}
               >
                 <option value="Paid">Paid</option>
                 <option value="Pending">Pending</option>
                 <option value="Overdue">Overdue</option>
               </select>
             </div>

             <div className="md:col-span-2">
               <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
               <input 
                 type="text"
                 className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-goodi-teal"
                 placeholder="e.g. Office Supplies or Client Project X"
                 value={newTransaction.description || ''}
                 onChange={e => setNewTransaction({...newTransaction, description: e.target.value})}
               />
             </div>

             <div className="md:col-span-2">
               <label className="block text-xs font-semibold text-gray-500 mb-1">Customer / Vendor (Optional)</label>
               <input 
                 type="text"
                 className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-goodi-teal"
                 placeholder="e.g. Acme Corp"
                 value={newTransaction.customer || ''}
                 onChange={e => setNewTransaction({...newTransaction, customer: e.target.value})}
               />
             </div>
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
              Save Transaction
            </button>
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
         <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">Recent Transactions</h3>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-gray-600">
             <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
               <tr>
                 <th className="px-6 py-3">Date</th>
                 <th className="px-6 py-3">Description</th>
                 <th className="px-6 py-3">Type</th>
                 <th className="px-6 py-3">Customer</th>
                 <th className="px-6 py-3 text-right">Amount</th>
                 <th className="px-6 py-3">Status</th>
                 <th className="px-6 py-3"></th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {state.transactions.length > 0 ? (
                 state.transactions.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(t => (
                   <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                     <td className="px-6 py-4 whitespace-nowrap">{t.date}</td>
                     <td className="px-6 py-4 font-medium text-gray-800">{t.description}</td>
                     <td className="px-6 py-4">
                       <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${t.type === 'Income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                         {t.type}
                       </span>
                     </td>
                     <td className="px-6 py-4">{t.customer || '-'}</td>
                     <td className={`px-6 py-4 text-right font-bold ${t.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                       {t.type === 'Income' ? '+' : '-'}€{t.amount.toFixed(2)}
                     </td>
                     <td className="px-6 py-4">
                       <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                         t.status === 'Paid' ? 'bg-gray-100 text-gray-600' : 
                         t.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                       }`}>
                         {t.status}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-right">
                       <button 
                         onClick={() => onDeleteTransaction(t.id)}
                         className="text-gray-400 hover:text-red-500 transition-colors"
                       >
                         <Trash2 size={16} />
                       </button>
                     </td>
                   </tr>
                 ))
               ) : (
                 <tr>
                   <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                     No transactions logged yet.
                   </td>
                 </tr>
               )}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};

export default Finance;