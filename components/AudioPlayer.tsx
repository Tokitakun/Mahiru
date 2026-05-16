'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { mahiruAudio } from '@/lib/mahiru-data'; // ← HAPUS .ts

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAttempted, setIsAttempted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.error("Playback error:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setIsAttempted(true);
          })
          .catch((err) => {
            console.log("Autoplay blocked, waiting for user interaction.");
            setIsAttempted(true);
          });
      }
    };

    document.addEventListener('click', playAudio, { once: true });
    
    return () => {
      document.removeEventListener('click', playAudio);
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex items-center gap-3">
      <audio ref={audioRef} src={mahiruAudio.bgm} loop />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="relative group p-4 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-500"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Volume2 className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div 
              key="paused"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <VolumeX className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {isPlaying && (
          <motion.div 
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-[#D4AF37] -z-10"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isPlaying ? (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex gap-1 h-4 items-end mb-1"
          >
            {[1, 2, 3, 4].map((bar) => (
              <motion.div
                key={bar}
                animate={{ height: [4, 16, 8, 14, 4] }}
                transition={{ duration: 1, repeat: Infinity, delay: bar * 0.1 }}
                className="w-1 bg-[#D4AF37] rounded-full"
              />
            ))}
          </motion.div>
        ) : (
          !isAttempted && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#D4AF37] text-white text-[9px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
            >
              Click anywhere to play music
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}