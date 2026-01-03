
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-between py-2 px-6 border-t border-slate-100 bg-white text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
      <div className="flex items-center gap-4">
        <span>USER: PRO_WORKER_01</span>
        <span>STORAGE: 12.4 MB / 1 GB</span>
      </div>
      <div>
        <span>VERSION: V1.0.26.01</span>
      </div>
    </footer>
  );
};

export default Footer;
