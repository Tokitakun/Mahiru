'use client';

import React from 'react';
import { motion } from 'framer-motion'; // Pastikan import sesuai instalasi projectmu
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    },
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return t('greet_morning');
    if (hour >= 12 && hour < 18) return t('greet_afternoon');
    return t('greet_evening');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-[#FFFBF0] transition-colors duration-500">
      {/* 1. Aesthetic Noise Texture Overlay - Menggunakan gambar lokal */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/img/mahi.jpg')] bg-cover bg-center" />
      
      {/* Decorative Wavy Background for Text Side (Right Side) */}
      <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none hidden md:block">
        <motion.svg
          viewBox="0 0 500 1500"
          className="h-full w-auto absolute right-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <path
            d="M300,0 Q450,375 250,750 T300,1500 L500,1500 L500,0 Z"
            fill="url(#wave-gradient)"
            className="opacity-40"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3E5AB" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* Floating Animated Waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#D4AF37]/5"
            style={{
              width: `${400 + i * 100}px`,
              height: `${400 + i * 100}px`,
              left: `${-100 + i * 50}px`,
              top: `${20 * i}%`,
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
              borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "50% 50% 30% 70% / 50% 60% 40% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-4 lg:gap-0 items-center relative z-10">
        
        {/* Left Side: The "Wavy" Photo area */}
        <div className="flex justify-center md:justify-end lg:pr-12 relative">
          <motion.div
            animate={{ 
              rotate: [0, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -inset-8 bg-[#F3E5AB]/40 blur-3xl rounded-full opacity-50"
          />

          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 70,
              duration: 1.2 
            }}
            className="relative w-full max-w-[400px] aspect-[2/3] md:aspect-[3/5] lg:aspect-[2/3.2]"
          >
            {/* 2. Arch Mask Container - Menggunakan aset lokal /img/mahi.jpg */}
            <div className="w-full h-full rounded-t-full border-[12px] border-white shadow-2xl overflow-hidden relative bg-[#F3E5AB]/30">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative w-full h-full"
              >
                <Image
                  src="/img/mahi.jpg" // Lokasi file kamu: public/img/mahi.jpg
                  alt="Mahiru Shiina Portrait"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent pointer-events-none" />
            </div>

            {/* Floating Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-4 -left-8 md:-left-12 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl border border-[#D4AF37]/10 max-w-[200px]"
            >
               <p className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] mb-1 italic">Angel Voice</p>
               <p className="text-xs italic font-serif leading-relaxed text-[#4A4238]">
                  &quot;I want to stay by your side, always.&quot;
               </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side Content - Tetap seperti semula */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col space-y-2 lg:space-y-4 text-center md:text-left pt-12 md:pt-0 relative"
        >
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4AF37]/5 blur-3xl rounded-full -z-10" />

          <motion.div
            variants={itemVariants}
            className="mb-4 bg-[#D4AF37]/10 w-fit px-4 py-2 rounded-full border border-[#D4AF37]/20 mx-auto md:mx-0"
          >
            <p suppressHydrationWarning className="text-[11px] font-bold text-[#D4AF37] italic uppercase tracking-widest flex items-center gap-2">
              <Heart className="w-3 h-3 fill-current" />
              {getGreeting()}
            </p>
          </motion.div>

          <motion.span 
            variants={itemVariants}
            className="text-[#D4AF37] font-serif italic text-xl lg:text-2xl tracking-wide"
          >
            {t('hero_title')}
          </motion.span>
          
          <div className="flex flex-col -space-y-4 lg:-space-y-8">
            <motion.h1 
              variants={itemVariants}
              className="text-7xl lg:text-[120px] font-bold text-[#4A4238] tracking-tight leading-none"
            >
              Mahiru
            </motion.h1>
            <motion.h1 
              variants={itemVariants}
              className="text-7xl lg:text-[120px] font-light text-[#4A4238] tracking-[0.1em] uppercase leading-none opacity-80"
            >
              Shiina
            </motion.h1>
          </div>

          <motion.p 
            variants={itemVariants}
            className="text-[#7C746B] text-sm lg:text-base max-w-sm pt-6 lg:pt-8 leading-relaxed font-medium mx-auto md:mx-0"
          >
            {t('hero_subtitle')}
          </motion.p>

          <motion.div variants={itemVariants} className="pt-8 text-center md:text-left">
            <button
              className="group relative px-10 py-4 bg-[#D4AF37] text-white overflow-hidden rounded-full font-bold tracking-widest text-xs transition-all hover:shadow-2xl hover:shadow-[#D4AF37]/30"
            >
              <span className="relative z-10">{t('nav_about').toUpperCase()}</span>
              <div className="absolute inset-0 bg-[#B89830] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}