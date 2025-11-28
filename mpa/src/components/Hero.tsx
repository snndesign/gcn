import React, { useState, useEffect } from 'react';
import { ArrowDown, Play } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Hero: React.FC = () => {
  const { content } = useContent();
  const slides = content.heroSlides;
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsVisible(true);
      }, 500); // Wait for fade out before switching
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    if (index === currentSlide) return;
    setIsVisible(false);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsVisible(true);
    }, 300);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          src="http://snndesign.gcn.ua/img/home.jpg"
          alt="Global digital network background"
        />
        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-slate-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 animate-fade-in-up">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-sm font-medium text-gray-200 tracking-widest uppercase">Мережа стабільна</span>
        </div>

        <div className={`transition-all duration-500 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 leading-tight drop-shadow-2xl h-[3.5em] md:h-[2.5em] flex flex-col justify-center">
            {slides[currentSlide].preTitle} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-amber-400">
              {slides[currentSlide].highlight}
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed h-[4.5em] md:h-[3em] flex items-start justify-center">
            {slides[currentSlide].desc}
          </p>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mb-12">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide 
                  ? 'bg-brand-500 w-8' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="#plans" className="w-full sm:w-auto px-10 py-5 bg-brand-600 hover:bg-brand-500 text-white text-lg font-bold rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(234,88,12,0.5)] hover:shadow-[0_0_60px_-10px_rgba(234,88,12,0.7)] border border-brand-400/20">
            Підключити зараз
          </a>
          <button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white text-lg font-bold rounded-2xl transition-all border border-white/10 flex items-center justify-center gap-3 group">
            <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                <Play size={16} fill="currentColor" />
            </span>
            Як це працює
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
        <ArrowDown size={32} />
      </div>
    </div>
  );
};

export default Hero;