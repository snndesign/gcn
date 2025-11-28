import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { X, RotateCcw, Lock, Download, Edit3, Plus, Trash2, Megaphone, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import type { Plan, FAQItem, HeroSlide, AlertConfig } from '../types';

const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'plans' | 'faq' | 'hero' | 'news' | 'pages'>('plans');
  const [selectedPageId, setSelectedPageId] = useState<string>('private-clients');
  
  const { content, updatePlans, updateFaqs, updateHeroSlides, updateAlertConfig, updatePages, resetToDefaults, exportConfig } = useContent();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded password for demonstration
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Невірний пароль');
    }
  };

  const handleExport = () => {
    const data = exportConfig();
    navigator.clipboard.writeText(data).then(() => {
      alert('Конфігурація скопійована в буфер обміну! Вставте її в constants.ts для постійного збереження, якщо у вас є доступ до коду.');
    });
  };

  // --- Plan Editors ---
  const handlePlanChange = (index: number, field: keyof Plan, value: any) => {
    const newPlans = [...content.plans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    updatePlans(newPlans);
  };

  const handleFeatureChange = (planIndex: number, featureIndex: number, text: string) => {
    const newPlans = [...content.plans];
    newPlans[planIndex].features[featureIndex].text = text;
    updatePlans(newPlans);
  };

  // --- FAQ Editors ---
  const handleFaqChange = (index: number, field: keyof FAQItem, value: string) => {
    const newFaqs = [...content.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    updateFaqs(newFaqs);
  };

  const addFaq = () => {
    updateFaqs([...content.faqs, { question: 'Нове питання?', answer: 'Відповідь тут.' }]);
  };

  const removeFaq = (index: number) => {
    if (window.confirm('Видалити це питання?')) {
      const newFaqs = content.faqs.filter((_, i) => i !== index);
      updateFaqs(newFaqs);
    }
  };

  // --- Hero Editors ---
  const handleHeroChange = (index: number, field: keyof HeroSlide, value: string) => {
    const newSlides = [...content.heroSlides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    updateHeroSlides(newSlides);
  };

  // --- Alert Editors ---
  const handleAlertChange = (field: keyof AlertConfig, value: any) => {
    updateAlertConfig({
        ...content.alertConfig,
        [field]: value
    });
  };

  // --- Pages Editors ---
  const handlePageTitleChange = (pageId: string, newTitle: string) => {
      const newPages = content.pages?.map(p => 
          p.id === pageId ? { ...p, title: newTitle } : p
      ) || [];
      updatePages(newPages);
  };

  const handlePageBlockChange = (pageId: string, blockId: string, newValue: string) => {
      const newPages = content.pages?.map(p => {
          if (p.id === pageId) {
              return {
                  ...p,
                  blocks: p.blocks.map(b => b.id === blockId ? { ...b, value: newValue } : b)
              };
          }
          return p;
      }) || [];
      updatePages(newPages);
  };

  const selectedPage = content.pages?.find(p => p.id === selectedPageId);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-slate-900/50 text-white p-3 rounded-full hover:bg-brand-600 backdrop-blur-sm transition-all shadow-lg border border-white/10 group"
        title="Адмін панель"
      >
        <Lock size={20} className="group-hover:scale-110 transition-transform" />
      </button>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-slate-200 dark:border-white/10 relative">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">Вхід в CMS</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль (admin123)"
              className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:border-brand-500 focus:ring-0 text-slate-900 dark:text-white"
              autoFocus
            />
            <button 
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Увійти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* INCREASED WIDTH TO 1400px to match main site */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-[1400px] h-[90vh] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="bg-brand-600 p-2 rounded-lg">
              <Edit3 size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Управління контентом</h2>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={resetToDefaults}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <RotateCcw size={16} />
              Скинути
            </button>
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-colors"
            >
              <Download size={16} />
              Експорт JSON
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} className="text-slate-500" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-white/10 px-6 overflow-x-auto">
          {[
            { id: 'plans', label: 'Тарифи' },
            { id: 'faq', label: 'FAQ' },
            { id: 'hero', label: 'Головний екран' },
            { id: 'news', label: 'Гарячі новини' },
            { id: 'pages', label: 'Сторінки' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-brand-600 text-brand-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-black/20">
          
          {/* PLANS TAB */}
          {activeTab === 'plans' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {content.plans.map((plan, idx) => (
                <div key={plan.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                  <div className="flex justify-between mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={plan.highlight} 
                        onChange={(e) => handlePlanChange(idx, 'highlight', e.target.checked)}
                        className="accent-brand-600"
                      />
                      Хіт
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Назва</label>
                      <input 
                        type="text" 
                        value={plan.name} 
                        onChange={(e) => handlePlanChange(idx, 'name', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Ціна (грн)</label>
                      <input 
                        type="number" 
                        value={plan.price} 
                        onChange={(e) => handlePlanChange(idx, 'price', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Швидкість</label>
                      <input 
                        type="number" 
                        value={plan.speed} 
                        onChange={(e) => handlePlanChange(idx, 'speed', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Одиниці</label>
                      <input 
                        type="text" 
                        value={plan.speedUnit} 
                        onChange={(e) => handlePlanChange(idx, 'speedUnit', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs text-slate-500 mb-1">Опис</label>
                    <textarea 
                      value={plan.description} 
                      onChange={(e) => handlePlanChange(idx, 'description', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border-none text-sm h-20 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 mb-2">Особливості (Features)</label>
                    <div className="space-y-2">
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex gap-2">
                          <input 
                            type="text" 
                            value={feature.text}
                            onChange={(e) => handleFeatureChange(idx, fIdx, e.target.value)}
                            className="flex-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-900 rounded-md border-none text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FAQ TAB */}
          {activeTab === 'faq' && (
            <div className="max-w-3xl mx-auto space-y-4">
              {content.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm relative group">
                  <button 
                    onClick={() => removeFaq(idx)}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="mb-4">
                    <label className="block text-xs text-slate-500 mb-1">Питання</label>
                    <input 
                      type="text" 
                      value={faq.question} 
                      onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border-none text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Відповідь</label>
                    <textarea 
                      value={faq.answer} 
                      onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border-none text-sm h-24 resize-none leading-relaxed"
                    />
                  </div>
                </div>
              ))}
              <button 
                onClick={addFaq}
                className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl text-slate-500 hover:border-brand-500 hover:text-brand-500 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Plus size={20} />
                Додати питання
              </button>
            </div>
          )}

          {/* HERO TAB */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              {content.heroSlides.map((slide, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                  <h3 className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-4">Слайд {idx + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Пре-заголовок (білий)</label>
                      <input 
                        type="text" 
                        value={slide.preTitle} 
                        onChange={(e) => handleHeroChange(idx, 'preTitle', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Акцент (градієнт)</label>
                      <input 
                        type="text" 
                        value={slide.highlight} 
                        onChange={(e) => handleHeroChange(idx, 'highlight', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border-none text-sm font-bold text-brand-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Опис</label>
                    <textarea 
                      value={slide.desc} 
                      onChange={(e) => handleHeroChange(idx, 'desc', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border-none text-sm h-20 resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NEWS / ALERTS TAB */}
          {activeTab === 'news' && (
             <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-white/5 shadow-md">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Megaphone className="text-brand-600" size={24} />
                                Гарячі новини
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Це повідомлення з'явиться у верхній частині сайту для всіх відвідувачів.
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={content.alertConfig?.isActive || false} 
                                onChange={(e) => handleAlertChange('isActive', e.target.checked)}
                                className="sr-only peer" 
                            />
                            <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brand-600"></div>
                            <span className="ml-3 text-sm font-medium text-slate-900 dark:text-white">
                                {content.alertConfig?.isActive ? 'Активно' : 'Вимкнено'}
                            </span>
                        </label>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                            { id: 'info', label: 'Інформація', icon: CheckCircle, color: 'bg-brand-100 text-brand-700 border-brand-200' },
                            { id: 'warning', label: 'Увага', icon: Megaphone, color: 'bg-amber-100 text-amber-700 border-amber-200' },
                            { id: 'critical', label: 'Аварія/Важливо', icon: AlertTriangle, color: 'bg-red-100 text-red-700 border-red-200' },
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => handleAlertChange('variant', type.id)}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                                    content.alertConfig?.variant === type.id 
                                        ? `border-current ${type.color} ring-2 ring-offset-2 dark:ring-offset-slate-800` 
                                        : 'border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500'
                                }`}
                            >
                                <type.icon size={24} className="mb-2" />
                                <span className="font-bold text-sm">{type.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Текст повідомлення</label>
                            <textarea
                                value={content.alertConfig?.message || ''}
                                onChange={(e) => handleAlertChange('message', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border-transparent focus:border-brand-500 focus:ring-0 text-slate-900 dark:text-white min-h-[150px]"
                                placeholder="Введіть текст новини. Ви можете використовувати Enter для переносу рядків..."
                                rows={6}
                            />
                        </div>
                        
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Текст кнопки (опціонально)</label>
                                <input
                                    type="text"
                                    value={content.alertConfig?.linkText || ''}
                                    onChange={(e) => handleAlertChange('linkText', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border-transparent focus:border-brand-500 focus:ring-0 text-slate-900 dark:text-white"
                                    placeholder="Детальніше"
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Посилання (опціонально)</label>
                                <input
                                    type="text"
                                    value={content.alertConfig?.linkUrl || ''}
                                    onChange={(e) => handleAlertChange('linkUrl', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border-transparent focus:border-brand-500 focus:ring-0 text-slate-900 dark:text-white"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          )}

          {/* PAGES TAB */}
          {activeTab === 'pages' && (
              <div className="max-w-4xl mx-auto">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <FileText className="text-brand-600" size={24} />
                        Редагування сторінок
                    </h3>
                    
                    <select 
                        value={selectedPageId}
                        onChange={(e) => setSelectedPageId(e.target.value)}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg border-transparent focus:border-brand-500 focus:ring-0 text-slate-900 dark:text-white min-w-[200px]"
                    >
                        {content.pages?.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                 </div>

                 {selectedPage ? (
                     <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-white/5 shadow-md">
                        <div className="mb-8">
                             <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Головний заголовок сторінки (H1)</label>
                             <input 
                                type="text"
                                value={selectedPage.title}
                                onChange={(e) => handlePageTitleChange(selectedPage.id, e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border-transparent focus:border-brand-500 focus:ring-0 text-slate-900 dark:text-white font-bold text-lg"
                             />
                        </div>

                        <div className="space-y-6">
                            {selectedPage.blocks.map((block) => (
                                <div key={block.id}>
                                    <label className="block text-sm font-medium text-slate-500 dark:text-gray-400 mb-1">
                                        {block.label}
                                    </label>
                                    {block.type === 'textarea' ? (
                                        <textarea 
                                            value={block.value}
                                            onChange={(e) => handlePageBlockChange(selectedPage.id, block.id, e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border-transparent focus:border-brand-500 focus:ring-0 text-slate-900 dark:text-white min-h-[100px]"
                                            rows={3}
                                        />
                                    ) : (
                                        <input 
                                            type="text"
                                            value={block.value}
                                            onChange={(e) => handlePageBlockChange(selectedPage.id, block.id, e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border-transparent focus:border-brand-500 focus:ring-0 text-slate-900 dark:text-white"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                     </div>
                 ) : (
                     <div className="text-center py-10 text-slate-500">
                         Сторінка не знайдена. Спробуйте скинути налаштування (кнопка зверху праворуч).
                     </div>
                 )}
              </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;