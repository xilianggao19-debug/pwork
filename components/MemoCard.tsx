
import React, { useState, useEffect } from 'react';
import { useWorkspaceStore } from '../store';
import { Edit3, Type, Plus, Trash2 } from 'lucide-react';
import BentoCard from './BentoCard';

const MemoCard: React.FC = () => {
  const { memos, addMemo, updateMemo, deleteMemo } = useWorkspaceStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const handleAddMemo = () => {
    addMemo('');
  };

  // 当添加新备忘录后（空文本），自动进入编辑模式
  useEffect(() => {
    if (memos.length > 0 && editingId === null) {
      const latestMemo = memos[0];
      // 如果最新备忘录为空文本，自动进入编辑模式
      if (latestMemo && latestMemo.text === '') {
        setEditingId(latestMemo.id);
        setEditingText('');
      }
    }
  }, [memos, editingId]);

  const handleStartEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSaveEdit = (id: string) => {
    updateMemo(id, editingText);
    setEditingId(null);
    setEditingText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个备忘吗？')) {
      deleteMemo(id);
    }
  };

  return (
    <BentoCard 
      title="备忘随笔" 
      icon={<Edit3 size={16} />}
      className="h-full flex flex-col"
    >
      <div className="flex-grow overflow-y-auto space-y-3 pb-4">
        {memos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Type size={24} className="text-slate-400" />
            </div>
            <p className="text-sm text-slate-400 font-medium mb-2">还没有备忘</p>
            <p className="text-xs text-slate-300">点击下方按钮添加第一个备忘</p>
          </div>
        ) : (
          memos.map((memo) => (
            <div
              key={memo.id}
              className="group bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-indigo-200 transition-all"
            >
              {editingId === memo.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    placeholder="输入备忘内容..."
                    className="w-full min-h-[120px] resize-none border-none outline-none text-sm text-slate-700 leading-relaxed bg-transparent focus:ring-2 focus:ring-indigo-500 rounded-lg p-2"
                    autoFocus
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => handleSaveEdit(memo.id)}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                    >
                      保存
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className="flex-1 cursor-text"
                      onClick={() => handleStartEdit(memo.id, memo.text)}
                    >
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                        {memo.text || <span className="text-slate-400 italic">点击编辑...</span>}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(memo.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all flex-shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Type size={10} /> {memo.text.length} 字
                    </span>
                    <span>
                      {new Date(memo.createdAt).toLocaleDateString('zh-CN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="flex-shrink-0 pt-4 border-t border-slate-50 mt-auto">
        <button
          onClick={handleAddMemo}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-colors font-bold text-sm"
        >
          <Plus size={16} />
          添加新备忘
        </button>
      </div>
    </BentoCard>
  );
};

export default MemoCard;
