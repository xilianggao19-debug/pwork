
import React, { useState } from 'react';
import { useWorkspaceStore } from '../store';
import { Star, MessageSquare, Plus, Trash2 } from 'lucide-react';
import BentoCard from './BentoCard';

const DecisionCard: React.FC = () => {
  const { decisions, addDecision, toggleDecisionImportance, deleteDecision } = useWorkspaceStore();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addDecision(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <BentoCard title="会议决议" icon={<MessageSquare size={16} />}>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="添加重要决议..."
          className="w-full px-3 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
        />
      </form>

      <div className="space-y-3">
        {decisions.map(decision => (
          <div key={decision.id} className="group flex items-start justify-between gap-3 animate-in fade-in slide-in-from-left-2">
            <div className="flex items-start gap-2">
              <button 
                onClick={() => toggleDecisionImportance(decision.id)}
                className={`mt-0.5 transition-colors ${decision.important ? 'text-amber-400' : 'text-slate-200 hover:text-amber-300'}`}
              >
                <Star size={16} fill={decision.important ? 'currentColor' : 'none'} />
              </button>
              <p className={`text-sm ${decision.important ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                {decision.text}
              </p>
            </div>
            <button 
              onClick={() => deleteDecision(decision.id)}
              className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-rose-500 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </BentoCard>
  );
};

export default DecisionCard;
