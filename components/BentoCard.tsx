
import React from 'react';

interface BentoCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  icon?: React.ReactNode;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, title, className = '', icon }) => {
  return (
    <div className={`bento-card bg-white rounded-[16px] shadow-sm p-5 flex flex-col h-full overflow-hidden ${className}`}>
      {(title || icon) && (
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            {icon}
            {title}
          </h3>
        </div>
      )}
      <div className="flex-grow overflow-y-auto pr-1">
        {children}
      </div>
    </div>
  );
};

export default BentoCard;
