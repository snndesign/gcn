import React from 'react';
import { Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const ComparisonTable: React.FC = () => {
  const { content } = useContent();
  const plans = content.plans;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr>
            <th className="p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50/90 dark:bg-slate-900/50 sticky left-0 min-w-[200px] backdrop-blur-md z-10 transition-colors duration-300"></th>
            {plans.map(plan => (
              <th key={plan.id} className="p-6 border-b border-slate-200 dark:border-white/10 text-center min-w-[180px] bg-slate-50/50 dark:bg-slate-900/30 transition-colors duration-300">
                <div className={`text-xl font-bold ${plan.highlight ? 'text-brand-600 dark:text-brand-500' : 'text-slate-900 dark:text-white'}`}>{plan.name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-white/5">
           <tr>
             <td className="p-6 text-sm font-bold text-slate-500 dark:text-gray-400 bg-slate-50/90 dark:bg-slate-900/50 sticky left-0 backdrop-blur-md transition-colors duration-300">Швидкість</td>
             {plans.map(plan => (
               <td key={plan.id} className="p-6 text-center text-slate-900 dark:text-white font-semibold">
                 {plan.speed} {plan.speedUnit}
               </td>
             ))}
           </tr>
           <tr>
             <td className="p-6 text-sm font-bold text-slate-500 dark:text-gray-400 bg-slate-50/90 dark:bg-slate-900/50 sticky left-0 backdrop-blur-md transition-colors duration-300">Ціна</td>
             {plans.map(plan => (
               <td key={plan.id} className="p-6 text-center text-brand-600 dark:text-brand-400 font-bold">
                 {plan.price} грн
               </td>
             ))}
           </tr>
           <tr>
             <td className="p-6 text-sm font-bold text-slate-500 dark:text-gray-400 bg-slate-50/90 dark:bg-slate-900/50 sticky left-0 backdrop-blur-md transition-colors duration-300">Технологія</td>
             {plans.map(plan => (
               <td key={plan.id} className="p-6 text-center text-slate-600 dark:text-gray-300 text-sm">
                 xPON
               </td>
             ))}
           </tr>
           <tr>
             <td className="p-6 text-sm font-bold text-slate-500 dark:text-gray-400 bg-slate-50/90 dark:bg-slate-900/50 sticky left-0 backdrop-blur-md transition-colors duration-300">Телебачення (180 каналів)</td>
             <td className="p-6 text-center text-sm text-slate-600 dark:text-gray-300">+ 55 грн</td>
             <td className="p-6 text-center text-sm text-slate-600 dark:text-gray-300">+ 55 грн</td>
             <td className="p-6 text-center text-sm text-brand-600 dark:text-brand-400 font-bold">+ 50 грн</td>
             <td className="p-6 text-center text-sm text-brand-600 dark:text-brand-400 font-bold">+ 50 грн</td>
           </tr>
           <tr>
             <td className="p-6 text-sm font-bold text-slate-500 dark:text-gray-400 bg-slate-50/90 dark:bg-slate-900/50 sticky left-0 backdrop-blur-md transition-colors duration-300">IP Адреса</td>
             {plans.map(plan => (
               <td key={plan.id} className="p-6 text-center text-sm text-slate-500 dark:text-gray-500">
                  Маскарадна (NAT)
               </td>
             ))}
           </tr>
           
           {/* Free Benefits Section */}
           <tr>
             <td className="p-6 text-sm font-bold text-brand-600 dark:text-brand-500 bg-slate-50/90 dark:bg-slate-900/50 sticky left-0 backdrop-blur-md transition-colors duration-300">
                <a href="https://webmail.gcn.ua/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 dark:hover:text-brand-300 underline decoration-dashed underline-offset-4 transition-colors">
                  Поштова скринька (500 Мб)
                </a>
             </td>
             {plans.map(plan => (
               <td key={plan.id} className="p-6 text-center">
                 <div className="flex justify-center"><Check size={18} className="text-brand-600 dark:text-brand-500" /></div>
               </td>
             ))}
           </tr>
           <tr>
             <td className="p-6 text-sm font-bold text-brand-600 dark:text-brand-500 bg-slate-50/90 dark:bg-slate-900/50 sticky left-0 backdrop-blur-md transition-colors duration-300">Пауза послуг ({'>'} 2 тижнів)</td>
             {plans.map(plan => (
               <td key={plan.id} className="p-6 text-center">
                 <div className="flex justify-center"><Check size={18} className="text-brand-600 dark:text-brand-500" /></div>
               </td>
             ))}
           </tr>
           <tr>
             <td className="p-6 text-sm font-bold text-brand-600 dark:text-brand-500 bg-slate-50/90 dark:bg-slate-900/50 sticky left-0 backdrop-blur-md transition-colors duration-300">Бонус: Оплата 3 міс = +0.5 міс</td>
             {plans.map(plan => (
               <td key={plan.id} className="p-6 text-center">
                 <div className="flex justify-center"><Check size={18} className="text-brand-600 dark:text-brand-500" /></div>
               </td>
             ))}
           </tr>

           <tr>
             <td className="p-6 text-sm font-bold text-slate-500 dark:text-gray-400 bg-slate-50/90 dark:bg-slate-900/50 sticky left-0 backdrop-blur-md transition-colors duration-300">Підтримка</td>
             <td className="p-6 text-center text-sm text-slate-500 dark:text-gray-500">24/7</td>
             <td className="p-6 text-center text-sm text-slate-500 dark:text-gray-500">24/7</td>
             <td className="p-6 text-center text-sm text-slate-600 dark:text-gray-300">24/7</td>
             <td className="p-6 text-center text-sm text-brand-600 dark:text-brand-400 font-bold">24/7</td>
           </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;