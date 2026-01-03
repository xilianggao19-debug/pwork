
import React from 'react';
import { X, Copy, CheckCircle } from 'lucide-react';

interface AIModalProps {
  content: string;
  onClose: () => void;
}

const AIModal: React.FC<AIModalProps> = ({ content, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden scale-in-center animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <span className="text-sm">AI</span>
            </div>
            今日智能日报
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-8 text-slate-700 leading-relaxed whitespace-pre-wrap font-serif text-lg">
          {content}
        </div>

        <div className="p-6 border-t border-slate-50 bg-slate-50/50 flex justify-end">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-100"
          >
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            {copied ? '已复制到剪贴板' : '一键复制'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIModal;
