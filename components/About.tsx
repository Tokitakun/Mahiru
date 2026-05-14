'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, GraduationCap, Utensils, Heart } from 'lucide-react';
import Image from 'next/image';
import { mahiruImages } from '@/lib/mahiru-data';

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { icon: <Heart className="w-5 h-5" />, label: t('stat_birthday'), value: t('val_birthday') },
    { icon: <GraduationCap className="w-5 h-5" />, label: t('stat_height'), value: t('val_height') },
    { icon: <Utensils className="w-5 h-5" />, label: t('stat_hobby'), value: t('val_hobby') },
    { icon: <Sparkles className="w-5 h-5" />, label: 'Status', value: 'Bini Nafis WLEE' },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#333] mb-4">
            {t('about_title')}
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE - Text & Stats */}
          <div className="space-y-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#5C5C5C] text-lg leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:text-[#D4AF37] first-letter:mr-3 first-letter:float-left"
            >
              {t('about_desc')}
            </motion.p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/80 border border-white p-6 rounded-[2rem] shadow-xl shadow-[#D4AF37]/5 flex flex-col gap-2 group hover:border-[#D4AF37]/30 transition-all"
                >
                  <div className="text-[#D4AF37] mb-1">{stat.icon}</div>
                  <div className="text-[10px] uppercase tracking-tighter opacity-50 font-sans font-bold">
                    {stat.label}
                  </div>
                  <div className="text-[#4A4238] font-serif italic text-lg leading-tight">
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - My Bini Guweh Card (CLEAN VERSION) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#F3E5AB] rounded-3xl p-8 md:p-12 relative flex flex-col items-center text-center"
          >
            {/* PRE-EMPTIVE STRIKE BADGE */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-lg z-20 whitespace-nowrap">
              <p className="text-[10px] font-bold text-white tracking-wide">
                ⚠️ Hei Karbit-Karbit😡 ⚠️
              </p>
            </div>

            {/* Decoration */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#D4AF37]" />
            </div>
            
            <h3 className="text-2xl font-serif text-[#333] mb-6 italic relative z-10">
              &quot;If it&apos;s for someone important to me... I don&apos;t mind trying a little harder.&quot;
            </h3>

            {/* My Bini Guweh Section - CENTERED */}
            <div className="bg-white/50 rounded-2xl p-4 mb-6 border border-[#D4AF37]/20 w-full max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 fill-red-500 stroke-none" />
                <span className="font-bold text-[#333] text-sm">Status:</span>
                <span className="text-[#D4AF37] font-serif italic">My Bini Guweh 💕</span>
              </div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span className="text-[10px] text-gray-400">bukan karbeat 🙄</span>
              </div>
            </div>

            {/* Avatar & Name - CENTERED */}
            <div className="flex flex-col items-center gap-3">
              <div className="h-20 w-20 rounded-full relative overflow-hidden border-2 border-[#D4AF37]/50 shadow-md">
                <Image 
                  src={mahiruImages.about_stat}
                  alt="Mahiru Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-[#333] text-lg">Mahiru Shiina</p>
                <p className="text-sm text-[#D4AF37] font-serif italic">My Bini Guweh (Nafis punya) 💕</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}