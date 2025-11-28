import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const FAQ: React.FC = () => {
  const { content } = useContent();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto divide-y divide-slate-200 dark:divide-white/10 transition-colors duration-300">
      {content.faqs.map((faq, index) => (
        <div key={index} className="py-6">
          <button
            className="flex justify-between items-center w-full text-left focus:outline-none group"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className={`text-lg font-medium transition-colors ${openIndex === index ? 'text-brand-600 dark:text-brand-500' : 'text-slate-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-gray-300'}`}>
              {faq.question}
            </span>
            <span className="ml-6 flex-shrink-0">
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-brand-600 dark:text-brand-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 dark:text-gray-600 group-hover:text-slate-600 dark:group-hover:text-gray-500" />
              )}
            </span>
          </button>
          <div
            className={`mt-2 pr-12 transition-all duration-300 ease-in-out overflow-hidden ${
              openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;