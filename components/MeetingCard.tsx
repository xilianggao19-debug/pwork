
import React, { useState } from 'react';
import { useWorkspaceStore } from '../store';
import { Users, Clock, Plus, Trash2, X } from 'lucide-react';
import BentoCard from './BentoCard';

const MeetingCard: React.FC = () => {
  const { meetings, addMeeting, deleteMeeting } = useWorkspaceStore();
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ time: '', participants: '', context: '' });

  const handleSubmit = () => {
    if (form.time && form.context) {
      addMeeting(form);
      setForm({ time: '', participants: '', context: '' });
      setIsAdding(false);
    }
  };

  return (
    <BentoCard title="会议活动" icon={<Users size={16} />}>
      {!isAdding ? (
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full py-2 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-xs font-medium hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-2 mb-4"
        >
          <Plus size={14} /> 添加会议记录
        </button>
      ) : (
        <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-indigo-100 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-indigo-600 uppercase">新记录</span>
            <button onClick={() => setIsAdding(false)}><X size={14} className="text-slate-400" /></button>
          </div>
          <input
            type="text"
            placeholder="时间 (如 14:00)"
            value={form.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
            className="w-full bg-white border border-slate-100 rounded-lg p-2.5 text-xs outline-none shadow-sm focus:border-indigo-300"
          />
          <input
            type="text"
            placeholder="参与人"
            value={form.participants}
            onChange={e => setForm({ ...form, participants: e.target.value })}
            className="w-full bg-white border border-slate-100 rounded-lg p-2.5 text-xs outline-none shadow-sm focus:border-indigo-300"
          />
          <textarea
            placeholder="会议背景及内容..."
            value={form.context}
            onChange={e => setForm({ ...form, context: e.target.value })}
            className="w-full bg-white border border-slate-100 rounded-lg p-2.5 text-xs outline-none shadow-sm resize-none h-20 focus:border-indigo-300"
          />
          <button 
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white text-xs py-2.5 rounded-lg font-bold shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-colors"
          >
            保存记录
          </button>
        </div>
      )}

      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
        {meetings.length === 0 && !isAdding && (
          <p className="text-xs text-slate-300 text-center py-4">暂无会议安排</p>
        )}
        
        {meetings.map(meeting => (
          <div key={meeting.id} className="relative group border-l-2 border-indigo-200 pl-4 py-1 hover:bg-slate-50/50 rounded-r-lg transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-1.5 text-indigo-600 text-[10px] font-black tracking-tight">
                <Clock size={10} /> {meeting.time}
              </span>
              <button 
                onClick={() => deleteMeeting(meeting.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-rose-500 transition-all"
              >
                <Trash2 size={12} />
              </button>
            </div>
            {meeting.participants && <p className="text-xs font-bold text-slate-800 mb-0.5">{meeting.participants}</p>}
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{meeting.context}</p>
          </div>
        ))}
      </div>
    </BentoCard>
  );
};

export default MeetingCard;
