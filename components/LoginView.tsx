
import React, { useState } from 'react';
import { useWorkspaceStore } from '../store';
import { LayoutGrid, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

const LoginView: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const { login, register, users } = useWorkspaceStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = login(username, password);
      if (!success) setError('用户名或密码错误');
    } else {
      if (!username || !password || !email) {
        setError('请填写所有字段');
        return;
      }
      if (users.find(u => u.username === username)) {
        setError('该用户名已被注册');
        return;
      }
      register({
        username,
        password,
        email,
        avatarSeed: Math.random().toString(36).substring(7),
        role: 'admin'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-[#FDFDFF] flex items-center justify-center p-6 z-[100] animate-in fade-in duration-700">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/30 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-indigo-100/50 p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <LayoutGrid size={120} />
        </div>

        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-[24px] flex items-center justify-center text-white shadow-xl shadow-indigo-200 mb-6">
            <LayoutGrid size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
            {isLogin ? '欢迎回到工作台' : '开启沉浸式办公'}
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            {isLogin ? '登录以管理您的今日计划' : '创建账号开启您的效率之旅'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 text-rose-500 text-xs font-bold rounded-xl text-center border border-rose-100">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-widest">Username</label>
            <div className="relative group">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="请输入用户名"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-200 transition-all text-sm font-medium text-slate-700"
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-widest">Email Address</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="请输入邮箱"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-200 transition-all text-sm font-medium text-slate-700"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-widest">Password</label>
            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-200 transition-all text-sm font-medium text-slate-700"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 group active:scale-95"
          >
            {isLogin ? '立即登录' : '创建账号'}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors"
          >
            {isLogin ? '还没有账号？点击注册' : '已有账号？返回登录'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
