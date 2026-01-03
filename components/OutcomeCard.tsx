
import React from 'react';
import { useWorkspaceStore } from '../store';
import { Trophy } from 'lucide-react';
import BentoCard from './BentoCard';

const OutcomeCard: React.FC = () => {
  const { outcomes, updateOutcome } = useWorkspaceStore();

  return (
    <BentoCard title="今日成效" icon={<Trophy size={16} />}>
      <p className="text-xs text-slate-400 mb-4 font-medium italic">提炼今日最核心的 3 个成果</p>
      <div className="space-y-3">
        {outcomes.map((text, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
              0{idx + 1}
            </span>
            <input
              type="text"
              value={text}
              onChange={(e) => updateOutcome(idx, e.target.value)}
              placeholder="记录核心成效..."
              className="w-full bg-transparent border-b border-dashed border-emerald-100 text-sm text-emerald-800 placeholder:text-emerald-100 focus:border-emerald-500 focus:ring-0 outline-none pb-1 transition-all"
            />
          </div>
        ))}
      </div>
    </BentoCard>
  );
};

export default OutcomeCard;
