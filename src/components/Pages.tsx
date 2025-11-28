import React from 'react';
import { FileText, CreditCard, Wifi, Activity, ChevronLeft, Home, Briefcase, Server, Check, Plus, Wrench, ArrowRight, Smartphone, Monitor, Phone, AlertCircle, Tv, Play, Clock, MonitorSmartphone, Film, Router } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import PlanCard from './PlanCard';

interface PageLayoutProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  onBack: () => void;
  maxWidth?: string;
}

// Helper hook to get content for a specific page
const usePageContent = (pageId: string) => {
  const page = require(`../data/pages/${pageId}.json`);
  
  const getBlock = (blockId: string) => {
    return page.blocks?.[blockId] || '';
  };

  return {
    title: page.title || '',
    getBlock
  };
};

const PageLayout: React.FC<PageLayoutProps> = ({ title, icon: Icon, children, onBack, maxWidth = "max-w-[1400px]" }) => (
  <div className="pt-32 pb-24 px-4 min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className={`${maxWidth} mx-auto`}>
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 mb-8 transition-colors group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        На головну
      </button>
      
      <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 md:p-12 shadow-xl border border-slate-200 dark:border-white/5">
        <div className="flex items-center gap-4 mb-10 border-b border-slate-100 dark:border-white/5 pb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-500">
            <Icon size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">{title}</h1>
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-gray-300 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export const PrivateClientsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { title, getBlock } = usePageContent('private-clients');
  const { content } = useContent();
  const plans = content.plans;

  const handlePlanSelect = (plan: any) => {
    console.log('Selected plan:', plan.name);
    alert(`Ви обрали тариф: ${plan.name}. Дякуємо!`);
  };
  
  return (
    <PageLayout title={title} icon={Home} onBack={onBack}>
      <div className="mb-16">
        <h3 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">{getBlock('intro_title')}</h3>
        <p className="text-lg text-slate-600 dark:text-gray-400">{getBlock('intro_text')}</p>
      </div>

      {/* Tariff Plans from Global Config */}
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
            ))}
        </div>
      </div>

      {/* Free Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-brand-50 dark:bg-brand-900/10 p-8 rounded-[32px] border border-brand-100 dark:border-brand-500/20">
            <h4 className="font-bold text-2xl mb-8 text-brand-800 dark:text-brand-400 flex items-center gap-3">
                <Check size={28} />
                {getBlock('ben_title')}
            </h4>
            <ul className="space-y-6">
            {[1, 2, 3, 4].map(i => (
                <li key={i} className="flex items-start gap-4 text-lg text-slate-700 dark:text-gray-300">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-brand-500 flex-shrink-0"></div>
                {getBlock(`ben${i}`)}
                </li>
            ))}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-brand-200 dark:border-brand-800/30">
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-gray-400 mb-2">
                    <Check size={16} className="text-brand-500 mt-0.5 shrink-0" />
                    {getBlock('note_credit')}
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-gray-400">
                    <Check size={16} className="text-brand-500 mt-0.5 shrink-0" />
                    {getBlock('note_iptv')}
                </div>
            </div>
        </div>

        {/* Payment Warning */}
        <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-[32px] border border-amber-100 dark:border-amber-500/20">
             <h4 className="font-bold text-2xl mb-6 text-amber-800 dark:text-amber-400 flex items-center gap-3">
                <AlertCircle size={28} />
                {getBlock('pay_title')}
            </h4>
            <p className="text-lg mb-6 text-slate-800 dark:text-gray-200">{getBlock('pay_text')}</p>
            
            <div className="bg-white/50 dark:bg-black/20 p-6 rounded-2xl border border-amber-200 dark:border-amber-800/30">
                <div className="flex items-start gap-4">
                    <Phone className="text-amber-600 dark:text-amber-500 shrink-0" />
                    <p className="text-lg font-bold text-slate-900 dark:text-white whitespace-pre-line leading-relaxed">
                        {getBlock('pay_phones')}
                    </p>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-16">
        {/* Additional Services */}
        <div>
            <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-3">
                <Plus className="text-brand-500" size={28} />
                {getBlock('add_title')}
            </h3>
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl flex justify-between items-center gap-4 border border-slate-100 dark:border-white/5">
                        <span className="font-medium text-lg text-slate-700 dark:text-gray-200">{getBlock(`add${i}_name`)}</span>
                        <span className="font-bold text-xl text-brand-600 dark:text-brand-400 whitespace-nowrap">{getBlock(`add${i}_price`)}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Connection Info */}
        <div>
            <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-3">
                <Wrench className="text-brand-500" size={28} />
                {getBlock('conn_title')}
            </h3>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-[32px] border border-slate-100 dark:border-white/5 mb-6">
                <h4 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">{getBlock('conn_subtitle')}</h4>
                <p className="text-slate-600 dark:text-gray-300 mb-6 text-sm">{getBlock('conn_desc')}</p>
                
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-slate-200 dark:border-white/10">
                        <span className="font-medium text-slate-700 dark:text-gray-200">{getBlock('conn_opt1_name')}</span>
                        <span className="font-bold text-brand-600 dark:text-brand-400">{getBlock('conn_opt1_price')}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
                        <div>
                            <span className="font-medium text-slate-700 dark:text-gray-200 block mb-1">{getBlock('conn_opt2_name')}</span>
                            <span className="text-xs text-slate-500 dark:text-gray-400">{getBlock('conn_opt2_desc')}</span>
                        </div>
                        <span className="font-bold text-brand-600 dark:text-brand-400 whitespace-nowrap">{getBlock('conn_opt2_price')}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <span className="font-medium text-slate-700 dark:text-gray-200">{getBlock('conn_router_name')}</span>
                        <span className="font-bold text-brand-600 dark:text-brand-400">{getBlock('conn_router_price')}</span>
                    </div>
                </div>
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-gray-300 px-4 border-l-4 border-brand-500">
                {getBlock('conn_payment_form')}
            </p>
        </div>
      </div>

      <div className="text-xs text-slate-400 dark:text-gray-600 italic mt-16 border-t border-slate-200 dark:border-white/10 pt-8 space-y-2">
          <p>{getBlock('footer_1')}</p>
          <p>{getBlock('footer_2')}</p>
          <p>{getBlock('footer_3')}</p>
      </div>
    </PageLayout>
  );
};

export const BusinessClientsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { title, getBlock } = usePageContent('business-clients');

  const plans = [
    { name: getBlock('p1_name'), speed: getBlock('p1_speed'), price: getBlock('p1_price') },
    { name: getBlock('p2_name'), speed: getBlock('p2_speed'), price: getBlock('p2_price') },
    { name: getBlock('p3_name'), speed: getBlock('p3_speed'), price: getBlock('p3_price') },
    { name: getBlock('p4_name'), speed: getBlock('p4_speed'), price: getBlock('p4_price') },
    { name: getBlock('p5_name'), speed: getBlock('p5_speed'), price: getBlock('p5_price') },
  ];

  return (
    <PageLayout title={title} icon={Briefcase} onBack={onBack}>
      <div className="max-w-3xl">
        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{getBlock('intro_title')}</h3>
        <p className="mb-12 text-lg">{getBlock('intro_text')}</p>
      </div>

      {/* Plans Grid - 5 COLUMNS */}
      <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-2">
        <Server className="text-brand-500" />
        {getBlock('plans_title')}
      </h3>
      
      {/* xl:grid-cols-5 ensures 5 plans in one row on extra large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16">
        {plans.map((p, idx) => (
          <div 
            key={idx} 
            className="group relative flex flex-col p-6 rounded-[24px] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-brand-300 dark:hover:border-white/10 hover:shadow-xl transition-all duration-300 h-full"
          >
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-gray-200 min-h-[3.5rem] leading-tight">{p.name}</h3>
              <div className="flex items-baseline gap-1">
                {/* Adjust price font size if it's too long (e.g., for "individually") */}
                <span className={`font-black text-brand-600 dark:text-brand-400 ${p.price.length > 10 ? 'text-lg' : 'text-3xl'}`}>
                  {p.price}
                </span>
              </div>
            </div>

            <div className="mb-4 py-3 px-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 flex flex-col gap-1">
               <span className="text-slate-500 dark:text-gray-400 text-[10px] font-bold uppercase">Швидкість</span>
               <span className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{p.speed}</span>
            </div>

            <ul className="space-y-2 mb-6 flex-1">
              <li className="flex items-start gap-2">
                <div className="mt-0.5 rounded-full p-0.5 flex-shrink-0 text-brand-500">
                  <Check size={14} strokeWidth={4} />
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-gray-300">Реальний IP-адрес</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-0.5 rounded-full p-0.5 flex-shrink-0 text-brand-500">
                  <Check size={14} strokeWidth={4} />
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-gray-300">Оптика в офіс</span>
              </li>
            </ul>

            <button className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 bg-transparent text-slate-900 dark:text-white border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 group-hover:border-slate-400 hover:text-brand-600 dark:hover:text-brand-400">
              Замовити
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Benefits */}
        <div className="bg-brand-50 dark:bg-brand-900/10 p-8 rounded-[32px] border border-brand-100 dark:border-brand-500/20">
            <h4 className="font-bold text-xl mb-6 text-brand-800 dark:text-brand-400 flex items-center gap-2">
                <Check size={24} />
                {getBlock('benefits_title')}
            </h4>
            <ul className="space-y-4">
            {[1, 2, 3, 4].map(i => (
                <li key={i} className="flex items-start gap-3 text-base text-slate-700 dark:text-gray-300">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-brand-500 flex-shrink-0"></div>
                {getBlock(`ben${i}`)}
                </li>
            ))}
            </ul>
        </div>

        <div className="space-y-8">
             {/* Additional Services */}
            <div>
                <h4 className="font-bold text-xl mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                    <Plus size={24} className="text-brand-500" />
                    {getBlock('add_title')}
                </h4>
                <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl flex justify-between items-center gap-4 border border-slate-100 dark:border-white/5">
                        <span className="font-medium">{getBlock('add1_name')}</span>
                        <span className="font-bold text-brand-600 dark:text-brand-400 whitespace-nowrap">{getBlock('add1_price')}</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl flex justify-between items-center gap-4 border border-slate-100 dark:border-white/5">
                        <span className="font-medium">{getBlock('add2_name')}</span>
                        <span className="font-bold text-brand-600 dark:text-brand-400 whitespace-nowrap">{getBlock('add2_price')}</span>
                    </div>
                </div>
            </div>

            {/* Connection */}
            <div>
                <h4 className="font-bold text-xl mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                    <Wrench size={24} className="text-brand-500" />
                    {getBlock('conn_title')}
                </h4>
                <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-white/5">
                        <div className="flex justify-between items-start gap-4">
                            <span className="font-medium">{getBlock('conn1_name')}</span>
                            <span className="font-bold text-brand-600 dark:text-brand-400 whitespace-nowrap">{getBlock('conn1_price')}</span>
                        </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-white/5">
                        <div className="flex justify-between items-start gap-4">
                            <span className="font-medium">{getBlock('conn2_name')}</span>
                            <span className="font-bold text-brand-600 dark:text-brand-400 whitespace-nowrap">{getBlock('conn2_price')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-gray-500 italic mt-12 border-t border-slate-200 dark:border-white/10 pt-6">
          {getBlock('note')}
      </p>
    </PageLayout>
  );
};

export const PublicContractPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { title, getBlock } = usePageContent('contract');

  return (
    <PageLayout title={title} icon={FileText} onBack={onBack}>
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl mb-8 flex items-center justify-between flex-wrap gap-4 border border-slate-200 dark:border-white/10">
        <p className="text-slate-700 dark:text-gray-300 font-medium">{getBlock('download_label')}</p>
        <a 
          href="http://gcn.ua/dogovir.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white dark:bg-slate-700 rounded-xl text-brand-600 dark:text-white font-bold hover:shadow-md transition-all flex items-center gap-2 border border-slate-200 dark:border-white/5"
        >
            <FileText size={18} />
            Завантажити PDF
        </a>
      </div>

      <div className="space-y-10 text-sm md:text-base leading-relaxed text-slate-700 dark:text-gray-300">
         <div className="font-bold text-right whitespace-pre-line">{getBlock('header')}</div>
         <div className="whitespace-pre-line">{getBlock('preamble')}</div>
         
         <section>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">{getBlock('s1_title')}</h3>
            <div className="whitespace-pre-line">{getBlock('s1_text')}</div>
         </section>

         <section>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">{getBlock('s2_title')}</h3>
            <div className="whitespace-pre-line">{getBlock('s2_text')}</div>
         </section>

         <section>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">{getBlock('s3_title')}</h3>
            <div className="whitespace-pre-line">{getBlock('s3_text')}</div>
         </section>

         <section>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">{getBlock('s4_title')}</h3>
            <div className="whitespace-pre-line">{getBlock('s4_text')}</div>
         </section>

         <section>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">{getBlock('s5_title')}</h3>
            <div className="whitespace-pre-line">{getBlock('s5_text')}</div>
         </section>

         <section>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">{getBlock('s6_title')}</h3>
            <div className="whitespace-pre-line">{getBlock('s6_text')}</div>
         </section>

         <section>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">{getBlock('s7_title')}</h3>
            <div className="whitespace-pre-line">{getBlock('s7_text')}</div>
         </section>
         
         <hr className="my-12 border-slate-200 dark:border-white/10" />
         
         <section>
             <div className="whitespace-pre-line font-bold text-center text-lg mb-4">{getBlock('iptv_title')}</div>
             <div className="whitespace-pre-line">{getBlock('iptv_text')}</div>
         </section>

         <hr className="my-12 border-slate-200 dark:border-white/10" />

         <section>
             <div className="whitespace-pre-line font-bold text-center text-lg mb-4">{getBlock('reg_title')}</div>
             <div className="whitespace-pre-line">{getBlock('reg_text')}</div>
         </section>
      </div>
    </PageLayout>
  );
};

export const PaymentPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { title, getBlock } = usePageContent('payment');

  return (
    <PageLayout title={title} icon={CreditCard} onBack={onBack}>
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{getBlock('intro_title')}</h3>
        <p className="text-lg">{getBlock('intro_text')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
            <div key={i} className="border border-slate-200 dark:border-white/10 p-6 rounded-3xl hover:border-brand-500 hover:shadow-lg transition-all cursor-pointer bg-slate-50 dark:bg-white/5 flex flex-col h-full">
                <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">{getBlock(`m${i}_title`)}</h4>
                <p className="text-sm text-slate-500 dark:text-gray-400">{getBlock(`m${i}_text`)}</p>
                <div className="mt-auto pt-6 flex justify-end">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-full text-brand-600 dark:text-brand-500">
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        ))}
      </div>
    </PageLayout>
  );
};

export const HomeWifiPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { title, getBlock } = usePageContent('wifi');

  return (
    <PageLayout title={title} icon={Wifi} onBack={onBack}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
            <h3 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">{getBlock('wifi_hero_title')}</h3>
            <p className="text-lg leading-relaxed mb-8">{getBlock('wifi_hero_text')}</p>
        </div>

        <div>
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                <Smartphone size={24} className="text-brand-500" />
                {getBlock('wifi_mesh_title')}
            </h3>
            <div className="space-y-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="text-brand-500 bg-brand-100 dark:bg-brand-900/30 p-2 rounded-lg">
                                <Wifi size={20} />
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white">{getBlock(`mesh_feat${i}_title`)}</h4>
                        </div>
                        <p className="text-slate-600 dark:text-gray-400 text-sm pl-11">{getBlock(`mesh_feat${i}_text`)}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-2">
        <Router className="text-brand-500" />
        {getBlock('eq_title')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
         <div className="bg-white dark:bg-slate-800 p-6 rounded-[24px] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-center">
             <div className="w-full md:w-1/3 aspect-square bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center p-4">
                <img src="http://snndesign.gcn.ua/img/EX221-G5_THTOT_1.0_01_normal_20220224064006b.jpg" alt="TP-Link EX-220" className="w-full h-auto object-contain mix-blend-multiply dark:mix-blend-normal" />
             </div>
             <div className="flex-1">
                <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">{getBlock('router1_name')}</h4>
                <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">{getBlock('router1_desc')}</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Wi-Fi 6</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Gigabit</span>
                </div>
             </div>
         </div>

         <div className="bg-white dark:bg-slate-800 p-6 rounded-[24px] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-center">
             <div className="w-full md:w-1/3 aspect-square bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center p-4">
                <img src="http://snndesign.gcn.ua/img/overview_01_normal_20221213023511p.jpg" alt="TP-Link EC-220" className="w-full h-auto object-contain mix-blend-multiply dark:mix-blend-normal" />
             </div>
             <div className="flex-1">
                <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">{getBlock('router2_name')}</h4>
                <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">{getBlock('router2_desc')}</p>
                 <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Wi-Fi 5</span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">AC1200</span>
                </div>
             </div>
         </div>
      </div>

      <div className="bg-slate-900 rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <Briefcase className="text-brand-400" />
                      {getBlock('pro_title')}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                      {getBlock('pro_desc')}
                  </p>
                  <p className="text-sm text-gray-400 border-l-2 border-brand-500 pl-4">
                      {getBlock('service_text')}
                  </p>
              </div>
              <div className="flex gap-4 justify-center lg:justify-end opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                 <div className="font-bold text-2xl tracking-tighter">Ubiquiti</div>
                 <div className="font-bold text-2xl tracking-tighter">MikroTik</div>
                 <div className="font-bold text-2xl tracking-tighter">TP-Link Deco</div>
              </div>
          </div>
      </div>
    </PageLayout>
  );
};

export const QualityPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { title, getBlock } = usePageContent('quality');

  return (
    <PageLayout title={title} icon={Activity} onBack={onBack}>
      <p className="text-xl mb-10">{getBlock('intro')}</p>
      
      <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="p-5 text-slate-900 dark:text-white font-bold text-lg">Параметр</th>
              <th className="p-5 text-slate-900 dark:text-white font-bold text-lg">Норма</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-white/5 bg-white dark:bg-slate-900/50">
            <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="p-5 font-medium">{getBlock('p1_name')}</td>
              <td className="p-5 text-brand-600 font-bold text-lg">{getBlock('p1_val')}</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="p-5 font-medium">{getBlock('p2_name')}</td>
              <td className="p-5 text-brand-600 font-bold text-lg">{getBlock('p2_val')}</td>
            </tr>
             <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="p-5 font-medium">{getBlock('p3_name')}</td>
              <td className="p-5 text-brand-600 font-bold text-lg">{getBlock('p3_val')}</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="p-5 font-medium">{getBlock('p4_name')}</td>
              <td className="p-5 text-brand-600 font-bold text-lg">{getBlock('p4_val')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
};

export const IPTVPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { title, getBlock } = usePageContent('iptv');

    return (
        <PageLayout title={title} icon={Tv} onBack={onBack}>
            <div className="relative rounded-[32px] overflow-hidden bg-slate-900 text-white mb-16 min-h-[400px] flex items-center">
                <img 
                    src="http://snndesign.gcn.ua/img/iptv33.jpg" 
                    alt="IPTV Background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-70 "
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>
                <div className="relative z-10 p-12 max-w-2xl">
                    <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{getBlock('hero_title')}</h3>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">{getBlock('hero_text')}</p>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl flex items-center gap-2 transition-colors">
                            <Play fill="currentColor" size={18} />
                            Дивитись
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-[32px] border border-slate-200 dark:border-white/5 hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center mb-6 text-brand-600 dark:text-brand-500">
                            {i === 1 ? <Clock size={28} /> : i === 2 ? <MonitorSmartphone size={28} /> : <Film size={28} />}
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{getBlock(`feat${i}_title`)}</h4>
                        <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{getBlock(`feat${i}_text`)}</p>
                    </div>
                ))}
            </div>

            <div className="bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-white/5">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{getBlock('device_title')}</h3>
                    <p className="text-slate-600 dark:text-gray-400">{getBlock('device_text')}</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-60 grayscale">
                     {/* Placeholder for Device Logos */}
                    <div className="flex items-center gap-2 text-2xl font-bold"><Monitor size={32}/> Smart TV</div>
                    <div className="flex items-center gap-2 text-2xl font-bold"><Smartphone size={32}/> Android</div>
                    <div className="flex items-center gap-2 text-2xl font-bold"><Smartphone size={32}/> iOS</div>
                </div>
            </div>
        </PageLayout>
    );
};