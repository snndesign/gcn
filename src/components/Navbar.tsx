import React, { useState, useEffect } from 'react';
import { Menu, X, User, Sun, Moon, Mail, ChevronDown } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSubscribersOpen, setIsSubscribersOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate('home');
    // Allow state update to happen then scroll
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
    setIsOpen(false);
  };

  const subscribersLinks = [
    { id: 'contract', label: 'Публічний договір' },
    { id: 'payment', label: 'Оплата' },
    { id: 'wifi', label: 'Home Wi-Fi' },
    { id: 'quality', label: 'Якість' },
  ];

  const servicesLinks = [
    { id: 'private-clients', label: 'Для приватних осіб' },
    { id: 'business-clients', label: 'Для бізнесу' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || currentPage !== 'home'
        ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-white/5 shadow-sm' 
        : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick('top')}
          >
            <div className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
              scrolled || currentPage !== 'home' ? 'bg-brand-500/10 dark:bg-white/100' : 'bg-white/100'
            }`}>
                <img 
                src="http://snndesign.gcn.ua/gcn_logo.png" 
                alt="GCN Logo" 
                className={`h-8 md:h-10 w-auto object-contain transition-all 
                }`}
                />  
            </div>
            <span className={`text-xl font-bold tracking-tighter hidden sm:block transition-colors ${
              scrolled || currentPage !== 'home' ? 'text-slate-900 dark:text-white' : 'text-white'
            }`}>
              Global City <span className="text-brand-500">Net</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <button 
                onClick={() => handleNavClick('features')}
                className={`font-medium transition-colors text-sm uppercase tracking-widest px-2 ${
                  scrolled || currentPage !== 'home'
                    ? 'text-slate-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Переваги
            </button>

            {/* Services Dropdown */}
            <div 
              className="relative group h-24 flex items-center"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button 
                className={`font-medium transition-colors text-sm uppercase tracking-widest px-2 flex items-center gap-1 ${
                  scrolled || currentPage !== 'home'
                    ? 'text-slate-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-white' 
                    : 'text-gray-300 hover:text-white'
                } ${isServicesOpen ? 'text-brand-500 dark:text-white' : ''}`}
              >
                Послуги
                <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-[80px] left-0 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-300 transform origin-top ${
                isServicesOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
              }`}>
                <div className="py-2">
                  {servicesLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        onNavigate(link.id);
                        setIsServicesOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
                onClick={() => handleNavClick('plans')}
                className={`font-medium transition-colors text-sm uppercase tracking-widest px-2 ${
                  scrolled || currentPage !== 'home'
                    ? 'text-slate-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Тарифи
            </button>

            <button 
                onClick={() => onNavigate('iptv')}
                className={`font-medium transition-colors text-sm uppercase tracking-widest px-2 ${
                  scrolled || currentPage !== 'home'
                    ? 'text-slate-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-white' 
                    : 'text-gray-300 hover:text-white'
                } ${currentPage === 'iptv' ? 'text-brand-500 dark:text-white' : ''}`}
              >
                IPTV
            </button>

             <button 
                onClick={() => handleNavClick('faq')}
                className={`font-medium transition-colors text-sm uppercase tracking-widest px-2 ${
                  scrolled || currentPage !== 'home'
                    ? 'text-slate-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                FAQ
            </button>


            {/* Subscribers Dropdown */}
            <div 
              className="relative group h-24 flex items-center"
              onMouseEnter={() => setIsSubscribersOpen(true)}
              onMouseLeave={() => setIsSubscribersOpen(false)}
            >
              <button 
                className={`font-medium transition-colors text-sm uppercase tracking-widest px-2 flex items-center gap-1 ${
                  scrolled || currentPage !== 'home'
                    ? 'text-slate-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-white' 
                    : 'text-gray-300 hover:text-white'
                } ${isSubscribersOpen ? 'text-brand-500 dark:text-white' : ''}`}
              >
                Абонентам
                <ChevronDown size={14} className={`transition-transform duration-300 ${isSubscribersOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-[80px] left-0 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-300 transform origin-top ${
                isSubscribersOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
              }`}>
                <div className="py-2">
                  {subscribersLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        onNavigate(link.id);
                        setIsSubscribersOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`h-6 w-px ${scrolled || currentPage !== 'home' ? 'bg-slate-200 dark:bg-white/10' : 'bg-white/20'}`}></div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all ${
                  scrolled || currentPage !== 'home'
                    ? 'text-slate-600 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-white/10' 
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <a 
                href="https://webmail.gcn.ua/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-all ${
                  scrolled || currentPage !== 'home'
                    ? 'text-slate-600 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-white/10' 
                    : 'text-white hover:bg-white/10'
                }`}
                title="Веб-пошта"
              >
                <Mail size={20} />
              </a>
            </div>
            
            <a 
              href="https://client.gcn.ua/"
              className="bg-gradient-to-r from-brand-600 to-orange-600 hover:from-brand-500 hover:to-orange-500 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-brand-900/50 hover:shadow-brand-500/30 flex items-center gap-2 border border-white/10"
            >
              <User size={18} />
              Кабінет
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${
                scrolled || currentPage !== 'home'
                  ? 'text-slate-600 dark:text-gray-300' 
                  : 'text-white'
              }`}
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none p-2 transition-colors ${
                scrolled || currentPage !== 'home'
                  ? 'text-slate-900 hover:text-brand-500 dark:text-white' 
                  : 'text-white hover:text-brand-500'
              }`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 absolute w-full shadow-2xl h-[calc(100vh-6rem)] overflow-y-auto z-50 animate-in slide-in-from-top-5 transition-colors duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2">
             <button 
                onClick={() => handleNavClick('features')} 
                className="block w-full text-left px-3 py-4 text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/5 hover:text-brand-500"
              >
                Переваги
             </button>

             {/* Mobile Accordion for Services */}
            <div className="border-b border-slate-200 dark:border-white/5">
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full flex justify-between items-center px-3 py-4 text-xl font-bold text-slate-900 dark:text-white hover:text-brand-500"
              >
                Послуги
                <ChevronDown size={20} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 bg-slate-50 dark:bg-white/5 rounded-xl ${isServicesOpen ? 'max-h-64 mb-4' : 'max-h-0'}`}>
                {servicesLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-6 py-3 text-slate-600 dark:text-gray-300 hover:text-brand-600 font-medium border-l-2 border-transparent hover:border-brand-500"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

             <button 
                onClick={() => handleNavClick('plans')} 
                className="block w-full text-left px-3 py-4 text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/5 hover:text-brand-500"
              >
                Тарифи
             </button>

             <button 
                onClick={() => { onNavigate('iptv'); setIsOpen(false); }}
                className="block w-full text-left px-3 py-4 text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/5 hover:text-brand-500"
              >
                IPTV
             </button>

             <button 
                onClick={() => handleNavClick('faq')} 
                className="block w-full text-left px-3 py-4 text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/5 hover:text-brand-500"
              >
                FAQ
             </button>
            
            {/* Mobile Accordion for Subscribers */}
            <div className="border-b border-slate-200 dark:border-white/5">
              <button 
                onClick={() => setIsSubscribersOpen(!isSubscribersOpen)}
                className="w-full flex justify-between items-center px-3 py-4 text-xl font-bold text-slate-900 dark:text-white hover:text-brand-500"
              >
                Абонентам
                <ChevronDown size={20} className={`transition-transform duration-300 ${isSubscribersOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 bg-slate-50 dark:bg-white/5 rounded-xl ${isSubscribersOpen ? 'max-h-64 mb-4' : 'max-h-0'}`}>
                {subscribersLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-6 py-3 text-slate-600 dark:text-gray-300 hover:text-brand-600 font-medium border-l-2 border-transparent hover:border-brand-500"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 px-3 space-y-3">
               <a href="https://webmail.gcn.ua/" target="_blank" rel="noopener noreferrer" className="w-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white px-5 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                  <Mail size={20} />
                  Веб-пошта
               </a>
               <a 
                href="https://client.gcn.ua/"
                className="w-full bg-brand-600 text-white px-5 py-4 rounded-xl font-bold shadow-lg shadow-brand-900/50 text-lg flex items-center justify-center gap-2"
               >
                <User size={20} />
                Вхід в кабінет
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;