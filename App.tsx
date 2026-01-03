
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoCard from './components/TodoCard';
import WorkCard from './components/WorkCard';
import MeetingCard from './components/MeetingCard';
import MemoCard from './components/MemoCard';
import OutcomeCard from './components/OutcomeCard';
import DecisionCard from './components/DecisionCard';
import CalendarView from './components/CalendarView';
import SettingsView from './components/SettingsView';
import LoginView from './components/LoginView';
import { useWorkspaceStore } from './store';
import { LayoutGrid, Calendar as CalendarIcon, Home, Settings, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { currentUser, logout } = useWorkspaceStore();

  // Redirect to Login if not authenticated
  if (!currentUser) {
    return <LoginView />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-5 min-h-[calc(100vh-180px)] animate-in fade-in duration-500">
            {/* Left Area (75% on Desktop - 9 columns) */}
            <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-9 gap-5 h-fit">
              <div className="md:col-span-3 min-h-[340px]"><TodoCard /></div>
              <div className="md:col-span-3 min-h-[340px]"><WorkCard /></div>
              <div className="md:col-span-3 min-h-[340px]"><MeetingCard /></div>
              <div className="md:col-span-4 min-h-[280px]"><OutcomeCard /></div>
              <div className="md:col-span-5 min-h-[280px]"><DecisionCard /></div>
            </div>
            {/* Right Area (25% on Desktop - 3 columns) */}
            <div className="md:col-span-3 h-auto md:h-full min-h-[400px]"><MemoCard /></div>
          </div>
        );
      case 'calendar':
        return <CalendarView />;
      case 'settings':
        return <SettingsView />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFDFF] overflow-hidden text-slate-800">
      {/* Mini Sidebar */}
      <aside className="w-24 bg-white border-r border-slate-100 flex flex-col items-center py-10 gap-12 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="w-12 h-12 bg-indigo-600 rounded-[20px] flex items-center justify-center text-white shadow-xl shadow-indigo-200 mb-4 hover:rotate-6 transition-transform cursor-pointer">
          <LayoutGrid size={24} />
        </div>
        
        <nav className="flex flex-col gap-6">
          <SidebarButton 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')}
            icon={<Home size={22} />}
            label="首页"
          />
          <SidebarButton 
            active={activeTab === 'calendar'} 
            onClick={() => setActiveTab('calendar')}
            icon={<CalendarIcon size={22} />}
            label="日程"
          />
          <SidebarButton 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
            icon={<Settings size={22} />}
            label="设置"
          />
        </nav>

        <button onClick={logout} className="mt-auto group p-4 text-slate-300 hover:text-rose-500 transition-all">
          <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      </aside>

      <div className="flex-grow flex flex-col h-full relative overflow-hidden">
        <Header />
        
        <main className="flex-grow overflow-y-auto p-8 bg-[#FDFDFF]">
          {renderContent()}
        </main>

        <Footer />
      </div>
    </div>
  );
};

interface SidebarButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all relative group ${active ? 'text-indigo-600' : 'text-slate-300 hover:text-slate-50'}`}
  >
    {active && <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-600 rounded-full shadow-[4px_0_12px_rgba(79,70,229,0.4)]"></div>}
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-indigo-50 shadow-inner' : 'group-hover:bg-slate-50'}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>{label}</span>
  </button>
);

export default App;
