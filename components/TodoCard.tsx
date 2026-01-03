
import React, { useState } from 'react';
import { useWorkspaceStore } from '../store';
import { CheckCircle2, Circle, Trash2, ListTodo, Eraser } from 'lucide-react';
import BentoCard from './BentoCard';

const TodoCard: React.FC = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompletedTodos } = useWorkspaceStore();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const activeTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

  return (
    <BentoCard title="待办清单" icon={<ListTodo size={16} />}>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="添加新任务..."
          className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/30 outline-none transition-all"
        />
      </form>
      
      <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1">
        {activeTodos.length === 0 && completedTodos.length === 0 && (
          <p className="text-xs text-slate-300 text-center py-4">暂无待办事项</p>
        )}
        
        {activeTodos.map(todo => (
          <div key={todo.id} className="flex items-center justify-between group py-1">
            <button 
              onClick={() => toggleTodo(todo.id)}
              className="flex items-center gap-3 text-sm text-slate-700 hover:text-indigo-600 transition-colors text-left"
            >
              <Circle size={16} className="text-slate-300 flex-shrink-0" />
              <span className="truncate">{todo.text}</span>
            </button>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-rose-500 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {completedTodos.length > 0 && (
          <div className="pt-2 border-t border-slate-50 mt-4 flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">已完成</span>
            <button 
              onClick={clearCompletedTodos}
              className="text-[10px] text-indigo-500 hover:text-indigo-700 font-bold flex items-center gap-1"
            >
              <Eraser size={10} /> 清除全部
            </button>
          </div>
        )}

        {completedTodos.map(todo => (
          <div key={todo.id} className="flex items-center justify-between group py-1 opacity-50">
            <button 
              onClick={() => toggleTodo(todo.id)}
              className="flex items-center gap-3 text-sm text-slate-400 line-through text-left"
            >
              <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
              <span className="truncate">{todo.text}</span>
            </button>
            <button 
              onClick={() => deleteTodo(todo.id)}
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

export default TodoCard;
