
import React, { useState } from 'react';
import BentoCard from './BentoCard';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));

  const days = [];
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  // Fill empty slots
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 border border-slate-50 bg-slate-50/30"></div>);
  }

  // Fill actual days
  for (let d = 1; d <= totalDays; d++) {
    const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
    days.push(
      <div key={d} className={`h-24 border border-slate-50 p-2 transition-colors hover:bg-indigo-50/30 group cursor-pointer ${isToday ? 'bg-indigo-50/50' : 'bg-white'}`}>
        <span className={`text-sm font-bold ${isToday ? 'text-indigo-600' : 'text-slate-600'}`}>{d}</span>
        <div className="mt-1 space-y-1">
          {isToday && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between bg-white p-6 rounded-[20px] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
            <CalendarIcon size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{year}年 {month + 1}月</h2>
            <p className="text-sm text-slate-400 font-medium">查看您的日程与任务排期</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronLeft size={20} /></button>
          <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-lg">今天</button>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight size={20} /></button>
        </div>
      </div>

      <BentoCard className="flex-grow !p-0 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
          {['周日', '周一', '周二', '周三', '周四', '周五', '周六'].map(day => (
            <div key={day} className="py-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-grow overflow-y-auto">
          {days}
        </div>
      </BentoCard>
    </div>
  );
};

export default CalendarView;
