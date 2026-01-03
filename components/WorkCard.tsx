
import React, { useEffect, useState } from 'react';
import { useWorkspaceStore } from '../store';
import { Briefcase } from 'lucide-react';
import BentoCard from './BentoCard';

const WorkCard: React.FC = () => {
  const { dailyWork, updateDailyWork, setSyncStatus } = useWorkspaceStore();
  const [localText, setLocalText] = useState(dailyWork);

  // Sync back if external change occurs
  useEffect(() => {
    if (dailyWork !== localText) {
      setLocalText(dailyWork);
    }
  }, [dailyWork]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localText !== dailyWork) {
        setSyncStatus('syncing');
        updateDailyWork(localText);
        setTimeout(() => setSyncStatus('synced'), 600);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [localText, dailyWork, updateDailyWork, setSyncStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    
    // Improved regex to handle list markers at start of lines
    // Converts "- " at the beginning of any line to "• "
    const lines = value.split('\n');
    const processedLines = lines.map(line => line.startsWith('- ') ? line.replace('- ', '• ') : line);
    const newValue = processedLines.join('\n');
    
    setLocalText(newValue);
  };

  return (
    <BentoCard title="日常工作" icon={<Briefcase size={16} />}>
      <textarea
        value={localText}
        onChange={handleChange}
        placeholder="今日工作产出记录... (输入 - 自动转为列表)"
        className="w-full h-full min-h-[150px] resize-none border-none outline-none text-sm text-slate-600 leading-relaxed bg-transparent placeholder:text-slate-300"
      />
    </BentoCard>
  );
};

export default WorkCard;
