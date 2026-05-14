'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { Languages, ChevronDown, Heart } from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages: { code: Language; name: string }[] = [
    { code: 'ID', name: 'Bahasa Indonesia' },
    { code: 'EN', name: 'English' },
    { code: 'JP', name: '日本語' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md border-b border-[#D4AF37]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
            <span className="text-[#D4AF37] font-serif text-lg leading-none italic">M</span>
          </div>
          <span className="font-serif italic text-xl tracking-wide text-[#4A4238]">Shiina</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-[#4A4238]">
          <a href="#home" className="hover:text-[#D4AF37] transition-colors border-b border-transparent hover:border-[#D4AF37]">{t('nav_home')}</a>
          <a href="#about" className="hover:text-[#D4AF37] transition-colors border-b border-transparent hover:border-[#D4AF37]">{t('nav_about')}</a>
          <a href="#gallery" className="hover:text-[#D4AF37] transition-colors border-b border-transparent hover:border-[#D4AF37]">{t('nav_gallery')}</a>
        </div>

        <div className="flex items-center bg-white/60 border border-[#D4AF37]/30 rounded-full px-1 shadow-sm">
          {languages.map((lang, idx) => (
            <React.Fragment key={lang.code}>
              <button
                onClick={() => setLanguage(lang.code)}
                className={`px-3 py-1.5 text-[10px] font-bold transition-all ${
                  language === lang.code 
                    ? 'text-[#D4AF37] opacity-100' 
                    : 'text-[#4A4238] opacity-50 hover:opacity-100'
                }`}
              >
                {lang.code}
              </button>
              {idx < languages.length - 1 && (
                <div className="w-px h-3 bg-[#D4AF37]/30"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
}
