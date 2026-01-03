
import React, { useState, useEffect } from 'react';
import BentoCard from './BentoCard';
import { useWorkspaceStore } from '../store';
import { Settings as SettingsIcon, Shield, Zap, Database, User, Mail, Camera, Key, CheckCircle2, AlertCircle } from 'lucide-react';

const SettingsView: React.FC = () => {
  const { currentUser, updateProfile, logout, deleteAccount } = useWorkspaceStore();
  
  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  useEffect(() => {
    if (status) {
      const t = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(t);
    }
  }, [status]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email) {
      setStatus({ type: 'error', msg: '用户名和邮箱不能为空' });
      return;
    }
    updateProfile({ username, email });
    setStatus({ type: 'success', msg: '个人资料已更新' });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser?.password !== oldPassword) {
      setStatus({ type: 'error', msg: '旧密码输入错误' });
      return;
    }
    if (newPassword.length < 6) {
      setStatus({ type: 'error', msg: '新密码至少需要6位字符' });
      return;
    }
    updateProfile({ password: newPassword });
    setOldPassword('');
    setNewPassword('');
    setStatus({ type: 'success', msg: '密码修改成功' });
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-slate-800 text-white rounded-2xl">
          <SettingsIcon size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">设置与账号管理</h1>
          <p className="text-slate-400">管理您的账户信息与工作空间偏好</p>
        </div>
      </div>

      {status && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-2xl shadow-xl border animate-in slide-in-from-top-4 flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
          {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-black">{status.msg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-8">
          <BentoCard title="个人资料" icon={<User size={16} />}>
            <form onSubmit={handleProfileSave}>
              <div className="flex flex-col md:flex-row gap-8 py-2">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-3xl bg-indigo-50 border-4 border-white shadow-xl overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.avatarSeed}`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity flex items-center justify-center text-white">
                      <Camera size={20} />
                    </div>
                  </div>
                  <button type="button" onClick={() => updateProfile({ avatarSeed: Math.random().toString(36).substring(7) })} className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider hover:underline">点击随机更换头像</button>
                </div>

                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">用户名</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus-within:bg-white focus-within:border-indigo-200 transition-all">
                      <User size={14} className="text-slate-400" />
                      <input 
                        type="text" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 w-full" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">电子邮箱</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus-within:bg-white focus-within:border-indigo-200 transition-all">
                      <Mail size={14} className="text-slate-400" />
                      <input 
                        type="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 w-full" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">角色</label>
                    <div className="px-4 py-3 bg-indigo-50/30 border border-indigo-100 rounded-2xl">
                      <span className="text-sm font-black text-indigo-600 uppercase tracking-widest">{currentUser.role}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex justify-end">
                <button type="submit" className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-indigo-600 transition-all shadow-lg active:scale-95">保存基本资料</button>
              </div>
            </form>
          </BentoCard>
        </div>

        {/* Security / Password Card */}
        <div className="md:col-span-4 space-y-6">
          <BentoCard title="安全修改" icon={<Key size={16} />}>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">当前密码</label>
                <input 
                  type="password"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold outline-none focus:bg-white focus:border-indigo-200"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">新密码</label>
                <input 
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold outline-none focus:bg-white focus:border-indigo-200"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">更新账户密码</button>
            </form>
          </BentoCard>

          <BentoCard title="账户操作" icon={<AlertCircle size={16} />}>
            <div className="space-y-3">
              <button onClick={logout} className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-black rounded-xl transition-all border border-slate-100">退出当前账号</button>
              <button onClick={() => deleteAccount(currentUser.id)} className="w-full px-4 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-black rounded-xl transition-all border border-rose-100/50">注销删除账户</button>
            </div>
          </BentoCard>
        </div>

        {/* System Settings Card */}
        <div className="md:col-span-12">
           <BentoCard title="空间预设" icon={<Zap size={16} />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-[24px]">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">深色模式</span>
                  <span className="text-[10px] text-slate-400 font-medium">界面视觉主题切换</span>
                </div>
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-[24px]">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">自动同步</span>
                  <span className="text-[10px] text-slate-400 font-medium">每隔5分钟云端备份</span>
                </div>
                <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer shadow-sm shadow-emerald-200"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-[24px]">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">精细记录</span>
                  <span className="text-[10px] text-slate-400 font-medium">记录所有操作历史轨迹</span>
                </div>
                <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer shadow-sm shadow-emerald-200"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
