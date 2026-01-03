
import React from 'react';
import { useWorkspaceStore } from '../store';
import { Loader2, Calendar as CalendarIcon, ChevronDown, Bell, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { syncStatus, currentUser, logout } = useWorkspaceStore();

  if (!currentUser) return null;

  return (
    <header className="flex items-center justify-between py-4 px-8 border-b border-slate-100 bg-white/70 backdrop-blur-xl z-20">
      <div className="flex items-center gap-6">
        {/* Date Selector Wrapper */}
        <button className="flex items-center gap-3 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all group border border-slate-100/50">
          <div className="p-1.5 bg-white rounded-lg shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
            <CalendarIcon size={16} />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-1">Current Date</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-slate-700">
                {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
              </span>
              <ChevronDown size={14} className="text-slate-300" />
            </div>
          </div>
        </button>
        
        <div className="h-8 w-[1px] bg-slate-100"></div>
        
        <div className="flex items-center gap-3">
          {syncStatus === 'synced' && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full animate-in fade-in zoom-in duration-300">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[11px] font-bold text-emerald-700">云端同步已就绪</span>
            </div>
          )}
          {syncStatus === 'syncing' && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full">
              <Loader2 size={12} className="animate-spin text-amber-500" />
              <span className="text-[11px] font-bold text-amber-700">正在保存更改...</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
          <div className="flex flex-col items-end">
            <span className="text-xs font-black text-slate-800 tracking-tight">{currentUser.username}</span>
            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{currentUser.role === 'admin' ? 'Premium Workspace' : 'Free Workspace'}</span>
          </div>
          <div className="relative group">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border-2 border-white overflow-hidden shadow-inner cursor-pointer hover:ring-4 ring-indigo-50 transition-all">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.avatarSeed}`} alt="User" />
            </div>
            {/* Quick Logout Dropdown on Hover */}
            <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-50 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
               <button onClick={logout} className="w-full flex items-center justify-between p-2 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg transition-colors">
                 <span className="text-[10px] font-black uppercase">注销登录</span>
                 <LogOut size={12} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
