'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { mahiruImages } from '@/lib/mahiru-data';
import { X, Heart, Calendar, Camera } from 'lucide-react';

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<{ src: string; index: number } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Gunakan gambar dari mahiruImages.gallery
  const images = mahiruImages.gallery.map((src, index) => ({
    src: src,
    alt: `Mahiru ${index + 1}`,
    // Optional: tambah metadata untuk setiap foto
    date: `March ${index + 1}, 2025`,
    location: index % 2 === 0 ? "At Home" : "School",
    description: index === 0 ? "My favorite moment with her 💕" : "Another beautiful day with Mahiru"
  }));

  const openLightbox = (index: number) => {
    setSelectedImage({ src: images[index].src, index });
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scroll
  };

  const closeLightbox = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (selectedImage) {
      const nextIndex = (selectedImage.index + 1) % images.length;
      setSelectedImage({ src: images[nextIndex].src, index: nextIndex });
    }
  };

  const prevImage = () => {
    if (selectedImage) {
      const prevIndex = (selectedImage.index - 1 + images.length) % images.length;
      setSelectedImage({ src: images[prevIndex].src, index: prevIndex });
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, selectedImage]);

  return (
    <>
      <section id="gallery" className="py-24 bg-[#FFFBF0]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#333] mb-4">
              {t('gallery_title')}
            </h2>
            <p className="text-[#5C5C5C] max-w-2xl mx-auto">
              Glimpses of the Angel&apos;s daily life and radiant beauty.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => openLightbox(i)}
                className="group relative overflow-hidden rounded-[2rem] bg-white aspect-square shadow-sm border-2 border-[#D4AF37]/5 hover:border-[#D4AF37]/20 transition-all cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end pb-6">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    View Moment ✨
                  </span>
                  <span className="text-[8px] text-white/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to expand
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX / MODAL */}
      <AnimatePresence>
        {modalOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 z-20 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <span className="text-2xl text-white">←</span>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 z-20 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <span className="text-2xl text-white">→</span>
            </button>

            {/* Image container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-[90vw] max-h-[85vh] w-auto h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={selectedImage.src}
                  alt="Mahiru"
                  width={1200}
                  height={1200}
                  className="max-w-[90vw] max-h-[75vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
                  unoptimized
                />
              </div>

              {/* Detail info di bawah gambar */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute -bottom-16 left-0 right-0 text-center"
              >
                <div className="inline-flex items-center gap-6 bg-black/50 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                    <span className="text-sm text-white">My Bini Guweh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-sm text-white/80">
                      {selectedImage.index + 1} / {images.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-sm text-white/80">
                      {images[selectedImage.index]?.date || "Special Day"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Counter indicator dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage({ src: images[idx].src, index: idx });
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === selectedImage.index 
                      ? 'bg-[#D4AF37] w-4' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}