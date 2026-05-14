'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';
import ChatWithMahiru from '@/components/ChatWithMahiru';

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-[#FFFBF0] selection:bg-[#D4AF37] selection:text-white">
        <Navbar />
        <Hero />
        <About />
        <Gallery />
        <Footer />
        <AudioPlayer />
        <ChatWithMahiru />
      </main>
    </LanguageProvider>
  );
}
