import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2, Bot } from 'lucide-react';
import { ChatSender, type ChatMessage } from '../types';
import { getAiPlanRecommendation } from '../services/geminiService';
import { useContent } from '../context/ContentContext';

const AiAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: 'Вітаю! Я віртуальний помічник GCN. Опишіть ваше житло та потреби (наприклад: "велика квартира, 3 телевізори, ігри"), і я підберу ідеальний тариф.',
      sender: ChatSender.AI,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { content } = useContent();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: ChatSender.USER,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare context data string for AI
    const contextString = content.plans.map(p => 
      `${p.name}: ${p.speed} ${p.speedUnit}, ${p.price} грн/міс. ${p.description}`
    ).join('\n');

    const aiResponseText = await getAiPlanRecommendation(userMsg.text, contextString);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: ChatSender.AI,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-brand-600 text-white p-4 rounded-full shadow-[0_10px_30px_-5px_rgba(234,88,12,0.4)] hover:bg-brand-500 transition-all duration-300 group flex items-center gap-3 border border-brand-400/30 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <div className="bg-white/20 p-1 rounded-full">
            <Bot size={20} className="text-white" />
        </div>
        <span className="font-bold pr-2">Підбір тарифу</span>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-full max-w-[360px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-300 origin-bottom-right transform ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-slate-100 dark:bg-slate-800 p-4 flex justify-between items-center border-b border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="bg-brand-600 p-2 rounded-xl shadow-lg shadow-brand-900/20">
               <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">GCN Assistant</h3>
              <p className="text-[10px] text-brand-600 dark:text-brand-400 font-medium uppercase tracking-wider">Online</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[350px] overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950/50 flex flex-col gap-4 custom-scrollbar transition-colors duration-300">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`max-w-[85%] p-3.5 text-sm rounded-2xl leading-relaxed shadow-sm ${
                msg.sender === ChatSender.USER 
                  ? 'bg-brand-600 text-white ml-auto rounded-br-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-gray-200 mr-auto rounded-bl-none border border-slate-200 dark:border-white/5'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="bg-white dark:bg-slate-800 text-slate-500 dark:text-gray-400 text-xs py-2 px-4 rounded-full self-start border border-slate-200 dark:border-white/5 flex items-center gap-2">
              <Loader2 size={12} className="animate-spin text-brand-500" />
              Аналізую...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/5">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 rounded-full px-4 py-2 border border-slate-200 dark:border-white/10 focus-within:border-brand-500/50 transition-all"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишіть повідомлення..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-600"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="text-brand-600 dark:text-brand-500 hover:text-brand-500 dark:hover:text-brand-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AiAdvisor;