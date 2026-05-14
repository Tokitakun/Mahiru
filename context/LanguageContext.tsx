'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ID' | 'EN' | 'JP';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations: Translations = {
  nav_home: {
    ID: 'Beranda',
    EN: 'Home',
    JP: 'ホーム',
  },
  nav_about: {
    ID: 'Tentang',
    EN: 'About',
    JP: 'について',
  },
  nav_gallery: {
    ID: 'Galeri',
    EN: 'Gallery',
    JP: 'ギャラリー',
  },
  hero_title: {
    ID: 'Malaikat di Sebelah Rumah',
    EN: 'The Angel Next Door',
    JP: 'お隣の天使様',
  },
  hero_subtitle: {
    ID: 'Situs dari seorang suami ke istrinya🥰.',
    EN: 'Site from a husband to his wife🥰.',
    JP: '夫から妻へのサイト🥰',
  },
  about_title: {
    ID: 'Profil Karakter',
    EN: 'Character Profile',
    JP: 'キャラクタープロフィール',
  },
  stat_birthday: {
    ID: 'Ulang Tahun',
    EN: 'Birthday',
    JP: '誕生日',
  },
  stat_height: {
    ID: 'Tinggi',
    EN: 'Height',
    JP: '身長',
  },
  stat_hobby: {
    ID: 'Hobi',
    EN: 'Hobby',
    JP: '趣味',
  },
  val_birthday: {
    ID: '6 Oktober',
    EN: 'October 6th',
    JP: '10月6日',
  },
  val_height: {
    ID: '156 cm',
    EN: '156 cm',
    JP: '156 cm',
  },
  val_hobby: {
    ID: 'Memasak, Menjahit',
    EN: 'Cooking, Sewing',
    JP: '料理、裁縫',
  },
  about_desc: {
    ID: 'Mahiru adalah gadis yang sangat cantik sehingga semua orang di sekolahnya memanggilnya "Malaikat". Dia tidak hanya unggul dalam akademis dan olahraga, tetapi juga sangat terampil dalam pekerjaan rumah tangga.',
    EN: 'Mahiru is a girl so beautiful that everyone in her school calls her "Angel". She not only excels in academics and sports but is also incredibly skilled in housework.',
    JP: '学校中の誰からも「天使様」と呼ばれるほど美少女。学業やスポーツだけでなく、家事も非常に得意。',
  },
  gallery_title: {
    ID: 'Galeri Foto',
    EN: 'Photo Gallery',
    JP: 'フォトギャラリー',
  },
  footer_text: {
    ID: 'Dibuat dengan cinta untuk Mahiru Shiina.',
    EN: 'Made with love for Mahiru Shiina.',
    JP: '椎名真昼への愛を込めて。',
  },
  greet_morning: {
    ID: 'Selamat pagi, Nafis. Jangan lupa sarapan ya.',
    EN: 'Good morning, Nafis. Don\'t forget to eat breakfast.',
    JP: 'おはよう、なふぃす。',
  },
  greet_afternoon: {
    ID: 'Selamat siang. Semangat buat aktivitas hari ini!',
    EN: 'Good afternoon. Good luck with your activities today!',
    JP: 'こんにちは。',
  },
  greet_evening: {
    ID: 'Selamat malam. Istirahatlah, kamu sudah bekerja keras.',
    EN: 'Good evening. Rest well, you\'ve worked hard.',
    JP: 'おやすみなさい。',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>( 'EN');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
