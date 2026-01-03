
import React, { useState, useEffect } from 'react';
import { useWorkspaceStore } from '../store';
import { Edit3, Type } from 'lucide-react';
import BentoCard from './BentoCard';

const MemoCard: React.FC = () => {
  const { memos, updateMemos, setSyncStatus } = useWorkspaceStore();
  const [localText, setLocalText] = useState(memos);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localText !== memos) {
        updateMemos(localText);
        setSyncStatus('synced');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [localText, memos, updateMemos, setSyncStatus]);

  return (
    <BentoCard 
      title="备忘随笔" 
      icon={<Edit3 size={16} />}
      className="h-full flex flex-col"
    >
      <div className="flex-grow">
        <textarea
          value={localText}
          onChange={e => setLocalText(e.target.value)}
          placeholder="捕捉瞬时灵感, 记录长文本内容..."
          className="w-full h-full min-h-[500px] md:min-h-0 resize-none border-none outline-none text-sm text-slate-600 leading-relaxed bg-transparent"
        />
      </div>
      <div className="flex-shrink-0 pt-4 border-t border-slate-50 mt-auto flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        <span className="flex items-center gap-1"><Type size={10} /> {localText.length} 字</span>
        <span>MODIFIED: JUST NOW</span>
      </div>
    </BentoCard>
  );
};

export default MemoCard;
