// src/App.tsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import PlanCard from './components/PlanCard';
import ComparisonTable from './components/ComparisonTable';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AiAdvisor from './components/AiAdvisor';
import { ThemeProvider } from './components/ThemeContext';
import { ContentProvider, useContent } from './context/ContentContext';
import AdminPanel from './components/AdminPanel';
import AlertBanner from './components/AlertBanner';
import { 
  PublicContractPage, 
  PaymentPage, 
  HomeWifiPage, 
  QualityPage, 
  PrivateClientsPage, 
  BusinessClientsPage, 
  IPTVPage 
} from './components/Pages';
import type { Plan } from './types';

interface AppProps {
  initialPage?: string;
}

function AppContent({ initialPage: propInitialPage }: AppProps) {
  const { content } = useContent();
  const { plans, benefits } = content;
  
  // Эта строчка — ключ к многостраничности
  const [currentPage, setCurrentPage] = useState(propInitialPage || 'home');

  const handlePlanSelect = (plan: Plan) => {
    alert(`Ви обрали тариф: ${plan.name}. Дякуємо!`);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'private-clients': return <PrivateClientsPage onBack={() => handleNavigation('home')} />;
      case 'business-clients': return <BusinessClientsPage onBack={() => handleNavigation('home')} />;
      case 'contract': return <PublicContractPage onBack={() => handleNavigation('home')} />;
      case 'payment': return <PaymentPage onBack={() => handleNavigation('home')} />;
      case 'wifi': return <HomeWifiPage onBack={() => handleNavigation('home')} />;
      case 'quality': return <QualityPage onBack={() => handleNavigation('home')} />;
      case 'iptv': return <IPTVPage onBack={() => handleNavigation('home')} />;
      case 'home':
      default:
        return (
          <main className="animate-in fade-in duration-500">
            <Hero />
            <FeaturesGrid />
            {/* Остальной контент главной — оставь как был */}
            <section id="plans" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-0 w-[800px] h-[800px] rounded-full bg-brand-600/5 blur-[120px]"></div>
                <div className="absolute bottom-[10%] left-0 w-[600px] h-[600px] rounded-full bg-orange-600/5 blur-[100px]"></div>
              </div>
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Тарифи для вашого комфорту</h2>
                  <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Прості, прозорі та швидкі. Обирайте те, що підходить саме вам.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mb-16">
                  {plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
                  ))}
                </div>
                <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none transition-colors duration-300">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Безкоштовно на всіх тарифах</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center">
                        {benefit.link ? (
                          <a href={benefit.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">
                            <h4 className="text-slate-900 dark:text-white font-bold mb-2 underline decoration-dotted underline-offset-4">{benefit.title}</h4>
                          </a>
                        ) : (
                          <h4 className="text-slate-900 dark:text-white font-bold mb-2">{benefit.title}</h4>
                        )}
                        <p className="text-sm text-slate-600 dark:text-gray-400 leading-snug">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="py-24 bg-white dark:bg-slate-900/30 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Порівняння можливостей</h2>
                </div>
                <div className="rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/50 backdrop-blur-sm shadow-2xl transition-colors duration-300">
                  <ComparisonTable />
                </div>
              </div>
            </section>
            <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white text-center mb-16">Питання та відповіді</h2>
                <FAQ />
              </div>
            </section>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-brand-500 selection:text-white font-sans text-slate-900 dark:text-gray-200 transition-colors duration-300 flex flex-col">
      <Navbar onNavigate={handleNavigation} currentPage={currentPage} />
      <AlertBanner />
      {renderContent()}
      <Footer />
      <AiAdvisor />
      <AdminPanel />
    </div>
  );
}

export default function App({ initialPage }: AppProps = {}) {
  return (
    <ThemeProvider>
      <ContentProvider>
        <AppContent initialPage={initialPage} />
      </ContentProvider>
    </ThemeProvider>
  );
}