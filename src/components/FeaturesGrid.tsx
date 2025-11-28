import React from 'react';
import { Tv, Cat, Zap } from 'lucide-react';

const FeatureSection = ({ title, desc, img, reverse, icon: Icon }: any) => (
  <div className={`flex flex-col md:flex-row items-center gap-12 py-24 ${reverse ? 'md:flex-row-reverse' : ''}`}>
    <div className="w-full md:w-1/2">
       <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/50 border border-slate-200 dark:border-white/5 group aspect-[4/3] transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
          <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 dark:opacity-80 group-hover:opacity-100" />
          
          <div className="absolute bottom-6 left-6 z-20">
             <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                <Icon className="text-brand-400" size={24} />
             </div>
          </div>
       </div>
    </div>
    <div className="w-full md:w-1/2 px-4 md:px-12">
      <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight transition-colors duration-300">{title}</h3>
      <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed mb-8 transition-colors duration-300">{desc}</p>
      <div className="h-1 w-20 bg-gradient-to-r from-brand-500 to-transparent rounded-full"></div>
    </div>
  </div>
);

const FeaturesGrid: React.FC = () => {
  return (
    <section id="features" className="relative bg-white dark:bg-slate-950 py-24 overflow-hidden transition-colors duration-300">
      {/* Background glow effects - Hidden in light mode for cleaner look, or adjusted */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-200 dark:via-brand-900 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
           <h2 className="text-brand-600 dark:text-brand-500 font-bold tracking-widest uppercase text-sm mb-4">Технології GCN</h2>
           <p className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Інтернет з душею</p>
        </div>

        <FeatureSection 
          title="Розумний контроль"
          desc="Наш AI аналізує навантаження на мережу в реальному часі. Ваша кішка може спати спокійно на теплому роутері — інтернет не 'впаде', навіть якщо всі сусіди вирішать завантажити гру одночасно."
          img="http://snndesign.gcn.ua/img/ai.jpg"
          icon={Cat}
          reverse={false}
        />

        <FeatureSection 
          title="Автономність та Світло"
          desc="Ми знаємо, як важливо залишатись на зв'язку. Наші вузли обладнані сучасними акумуляторами. Інтернет працює, навіть коли навколо лише світло свічок."
          img="http://snndesign.gcn.ua/img/powerbank.jpeg"
          icon={Zap}
          reverse={true}
        />

        <FeatureSection 
          title="Кінотеатр вдома"
          desc="Забудьте про буферизацію. 4K HDR контент завантажується миттєво. Створіть атмосферу справжнього кінотеатру у своїй вітальні з нашим IPTV сервісом."
          img="http://snndesign.gcn.ua/img/iptv2.jpg"
          icon={Tv}
          reverse={false}
        />

      </div>
    </section>
  );
};

export default FeaturesGrid;