'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, Github, Briefcase, Instagram, FolderOpen } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  // Link sosial media & portofolio
  const links = {
    github: "https://github.com/Tokitakun", // ganti dengan github kamu
    portfolio: "https://tokita.nlfts.dev/", // ganti dengan link portofolio kamu
    instagram: "https://www.instagram.com/_nafietzsche/", // ganti dengan IG kamu
  };

  return (
    <footer className="bg-[#FFFBF0] border-t border-[#D4AF37]/10 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <p className="text-[10px] opacity-40 uppercase tracking-tighter font-bold">Character Series</p>
            <p className="text-sm font-serif italic text-[#4A4238]">Otonari no Tenshi-sama</p>
          </div>
          <div className="w-px h-8 bg-[#D4AF37]/30"></div>
          <div className="flex items-center gap-3">
             <div className="w-5 h-5 rounded-full border border-[#D4AF37] flex items-center justify-center">
                <span className="text-[8px] text-[#D4AF37] font-serif italic">M</span>
             </div>
             <span className="font-serif italic text-lg text-[#4A4238]">Shiina Shrine</span>
          </div>
        </div>

        <p className="text-[#999] text-[10px] uppercase tracking-[0.2em] font-bold">
          {t('footer_text')} &copy; {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-6 text-[#5C5C5C]">
          <a 
            href={links.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#D4AF37] transition-all hover:scale-110"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a 
            href={links.portfolio} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#D4AF37] transition-all hover:scale-110"
            title="Portfolio"
          >
            <FolderOpen className="w-4 h-4" />
          </a>
          <a 
            href={links.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#D4AF37] transition-all hover:scale-110"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          
        </div>
      </div>
      
      {/* My Bini Guweh Credit */}
      <div className="text-center mt-8 pt-4 border-t border-[#D4AF37]/5">
        <p className="text-[8px] text-gray-400 flex items-center justify-center gap-1">
          Made with <Heart className="w-2 h-2 fill-red-400 stroke-none" /> by Nafis — 
          <span className="font-serif italic">My Bini Guweh, not karbit! 🙄</span>
        </p>
      </div>
    </footer>
  );
} 