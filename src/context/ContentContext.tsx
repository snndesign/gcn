import React, { createContext, useContext, useState, useEffect } from 'react';
import { PLANS, FAQS, HERO_SLIDES, GLOBAL_BENEFITS, DEFAULT_ALERT_CONFIG, DEFAULT_PAGES, CONTENT_VERSION } from '../constants';
import type { GlobalContent, Plan, FAQItem, HeroSlide, BenefitItem, AlertConfig, PageData } from '../types';

interface ContentContextType {
  content: GlobalContent;
  updatePlans: (plans: Plan[]) => void;
  updateFaqs: (faqs: FAQItem[]) => void;
  updateHeroSlides: (slides: HeroSlide[]) => void;
  updateBenefits: (benefits: BenefitItem[]) => void;
  updateAlertConfig: (config: AlertConfig) => void;
  updatePages: (pages: PageData[]) => void;
  resetToDefaults: () => void;
  exportConfig: () => string;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial state loaded from constants
  const defaultContent: GlobalContent = {
    plans: PLANS,
    faqs: FAQS,
    heroSlides: HERO_SLIDES,
    benefits: GLOBAL_BENEFITS,
    alertConfig: DEFAULT_ALERT_CONFIG,
    pages: DEFAULT_PAGES
  };

  const [content, setContent] = useState<GlobalContent>(defaultContent);

  // Load from LocalStorage on mount with Version Checking
  useEffect(() => {
    const savedContent = localStorage.getItem('gcn_site_content');
    const savedVersion = localStorage.getItem('gcn_content_version');

    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);

        // AGGRESSIVE RESET LOGIC
        if (savedVersion !== CONTENT_VERSION) {
            console.log(`Version mismatch (${savedVersion} vs ${CONTENT_VERSION}). Clearing storage.`);
            localStorage.clear();
            localStorage.setItem('gcn_content_version', CONTENT_VERSION);
            setContent(defaultContent); // Reset state to defaults
            return;
        }

        setContent({ 
            ...defaultContent, 
            ...parsed,
            alertConfig: parsed.alertConfig || defaultContent.alertConfig,
            pages: parsed.pages || defaultContent.pages
        });

      } catch (e) {
        console.error("Failed to parse saved content", e);
        localStorage.clear();
        localStorage.setItem('gcn_content_version', CONTENT_VERSION);
        setContent(defaultContent);
      }
    } else {
        localStorage.setItem('gcn_content_version', CONTENT_VERSION);
    }
  }, []);

  // Save to LocalStorage whenever content changes
  const saveContent = (newContent: GlobalContent) => {
    setContent(newContent);
    localStorage.setItem('gcn_site_content', JSON.stringify(newContent));
  };

  const updatePlans = (plans: Plan[]) => saveContent({ ...content, plans });
  const updateFaqs = (faqs: FAQItem[]) => saveContent({ ...content, faqs });
  const updateHeroSlides = (heroSlides: HeroSlide[]) => saveContent({ ...content, heroSlides });
  const updateBenefits = (benefits: BenefitItem[]) => saveContent({ ...content, benefits });
  const updateAlertConfig = (alertConfig: AlertConfig) => saveContent({ ...content, alertConfig });
  const updatePages = (pages: PageData[]) => saveContent({ ...content, pages });

  const resetToDefaults = () => {
    if (window.confirm("Ви впевнені? Всі незбережені зміни будуть втрачені і повернуться стандартні налаштування.")) {
      setContent(defaultContent);
      localStorage.removeItem('gcn_site_content');
      localStorage.setItem('gcn_content_version', CONTENT_VERSION);
      window.location.reload();
    }
  };

  const exportConfig = () => {
    return JSON.stringify(content, null, 2);
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updatePlans, 
      updateFaqs, 
      updateHeroSlides, 
      updateBenefits, 
      updateAlertConfig, 
      updatePages, 
      resetToDefaults, 
      exportConfig 
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};