import React from 'react';
import { Facebook, Twitter, Instagram, Heart, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-6">
                <div className="bg-slate-100 dark:bg-white p-1 rounded transition-colors duration-300">
                   <img src="http://gcn.ua/images/logo.gif" alt="GCN Logo" className="h-6 object-contain" />
                </div>
             </div>
             <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
               Інтернет, який приносить затишок у ваш дім. Надійний зв'язок, теплі вечори та найшвидша підтримка.
             </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6 transition-colors duration-300">Клієнтам</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-gray-400">
              <li><a href="https://client.gcn.ua/" className="hover:text-brand-500 transition-colors">Особистий кабінет</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Оплата онлайн</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Налаштування роутера</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Перевірка швидкості</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6 transition-colors duration-300">Компанія</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-brand-500 transition-colors">Про нас</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Контакти</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Публічна оферта</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6 transition-colors duration-300">Контакти</h4>
            
            <div className="mb-6 space-y-4">
                <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-700 dark:text-gray-300">
                        м. Чорноморськ<br/> вул. Лазурна 7б
                    </p>
                </div>

                <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                        <a href="tel:0486834888" className="block text-sm text-slate-700 dark:text-white hover:text-brand-500 transition-colors">(04868) 34-888</a>
                        <a href="tel:+380675348908" className="block text-sm text-slate-700 dark:text-white hover:text-brand-500 transition-colors">+380 (67) 534-89-08</a>
                        <a href="viber://chat?number=%2B380639567297" className="block text-sm text-slate-700 dark:text-white hover:text-brand-500 transition-colors">+380 (63) 956-72-97 (Viber)</a>
                    </div>
                </div>
            </div>
            
            <p className="text-slate-500 dark:text-gray-500 text-xs mb-8 pl-8">Технічна підримка цілодобово.</p>

            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-gray-400 hover:bg-brand-600 hover:text-white transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-gray-400 hover:bg-brand-600 hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-gray-400 hover:bg-brand-600 hover:text-white transition-all"><Twitter size={18} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-gray-600 text-xs">© 2024 Global City Net. Made with <Heart size={10} className="inline text-red-500 mx-1" /> for comfort.</p>
          <div className="flex space-x-6 text-xs text-slate-500 dark:text-gray-500">
            <a href="#" className="hover:text-brand-500 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-500 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;