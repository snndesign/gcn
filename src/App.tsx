// src/App.tsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import PlanCard from './components/PlanCard';
import ComparisonTable from './components/ComparisonTable';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
//import AiAdvisor from './components/AiAdvisor';
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

  // Ключевая строчка — теперь берёт страницу из HTML
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
      default:
        return (
          <main className="animate-in fade-in duration-500">
            <Hero />
            <FeaturesGrid />
            {/* Тарифы */}
            <section id="plans" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Тарифи для вашого комфорту</h2>
                  <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Прості, прозорі та швидкі. Обирайте те, що підходить саме вам.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
                  ))}
                </div>
                <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-slate-200 dark:border-white/10">
                  <h3 className="text-2xl font-bold text-center mb-8">Безкоштовно на всіх тарифах</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {benefits.map((benefit, idx) => (
                      <div key={idx} className="text-center">
                        {benefit.link ? (
                          <a href={benefit.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand-500">
                            <h4 className="font-bold mb-2 underline decoration-dotted">{benefit.title}</h4>
                          </a>
                        ) : (
                          <h4 className="font-bold mb-2">{benefit.title}</h4>
                        )}
                        <p className="text-sm text-slate-600 dark:text-gray-400">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="py-24 bg-white dark:bg-slate-900/30">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold">Порівняння можливостей</h2>
                </div>
                <ComparisonTable />
              </div>
            </section>
            <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-950">
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">Питання та відповіді</h2>
                <FAQ />
              </div>
            </section>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col">
      <Navbar onNavigate={handleNavigation} currentPage={currentPage} />
      <AlertBanner />
      {renderContent()}
      <Footer />
      //<AiAdvisor />
      <AdminPanel />
    </div>
  );
}

// Главный экспорт — принимает initialPage из main.tsx
export default function App({ initialPage }: AppProps = {}) {
  return (
    <ThemeProvider>
      <ContentProvider>
        <AppContent initialPage={initialPage} />
      </ContentProvider>
    </ThemeProvider>
  );
}