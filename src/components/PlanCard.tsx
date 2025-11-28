import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import type { Plan } from '../types';

interface PlanCardProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect }) => {
  return (
    <div 
      className={`group relative flex flex-col p-8 rounded-[32px] transition-all duration-500 h-full border ${
        plan.highlight 
          ? 'bg-white dark:bg-slate-900/60 backdrop-blur-xl border-brand-500 shadow-[0_10px_40px_-10px_rgba(249,115,22,0.2)] dark:shadow-[0_0_50px_-10px_rgba(249,115,22,0.3)] z-10 scale-105' 
          : 'bg-white dark:bg-white/5 backdrop-blur-md border-slate-200 dark:border-white/5 hover:border-brand-300 dark:hover:border-white/10 hover:shadow-xl dark:hover:bg-white/10'
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-brand-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-brand-900/20">
            Хіт продажу
          </span>
        </div>
      )}

      <div className="mb-8">
        <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-gray-300'}`}>{plan.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black text-slate-900 dark:text-white">{plan.price}</span>
          <span className="text-lg text-slate-500 dark:text-gray-500 font-medium">грн/міс</span>
        </div>
        <p className="mt-4 text-sm text-slate-600 dark:text-gray-400 leading-relaxed min-h-[40px]">{plan.description}</p>
      </div>

      <div className={`mb-8 py-4 px-6 rounded-2xl flex items-center justify-between border ${
          plan.highlight 
            ? 'bg-brand-50 dark:bg-brand-500/10 border-brand-100 dark:border-brand-500/20' 
            : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5'
      }`}>
         <span className="text-slate-500 dark:text-gray-400 text-sm font-bold uppercase">Швидкість</span>
         <div className="text-right">
             <span className={`block text-2xl font-black ${plan.highlight ? 'text-brand-500 dark:text-brand-400' : 'text-slate-900 dark:text-white'}`}>{plan.speed}</span>
             <span className="text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-widest">{plan.speedUnit}</span>
         </div>
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {plan.features.map((feature, idx) => (
          <li key={idx} className={`flex items-start gap-3 ${feature.included ? '' : 'opacity-30'}`}>
            <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${feature.included ? 'text-brand-500' : 'text-gray-400'}`}>
              <Check size={16} strokeWidth={4} />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan)}
        className={`w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-4 ${
          plan.highlight
            ? 'bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-900/30'
            : 'bg-transparent text-slate-900 dark:text-white border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/40'
        }`}
      >
        Обрати
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default PlanCard;