'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, X, User, Heart } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWithMahiru() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })) 
        }),
      });

      const data = await response.json();
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else if (data.error) {
        let errorContent = data.error;
        if (data.status === 402) {
          errorContent = "Maaf, sepertinya saldo API kamu sudah habis. Kamu perlu mengisi ulang saldo di dashboard DeepSeek agar kita bisa mengobrol lagi...";
        } else if (data.status === 401) {
          errorContent = "Maaf, API Key yang kamu masukkan sepertinya tidak valid. Mohon periksa kembali pengaturannya.";
        }
        setMessages(prev => [...prev, { role: 'assistant', content: errorContent }]);
      } else {
        throw new Error("No response from assistant");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Maaf, sepertinya aku sedang tidak enak badan... (Connection Error)" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] max-w-[90vw] h-[500px] bg-white rounded-3xl shadow-2xl border border-[#D4AF37]/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#D4AF37] p-6 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 overflow-hidden">
                   <Heart className="fill-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold italic">Mahiru AI</h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-80">Online & Caring</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FFFBF0]/30 custom-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-10 space-y-2">
                  <div className="w-16 h-16 bg-[#F3E5AB] rounded-full mx-auto flex items-center justify-center text-[#D4AF37]">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <p className="text-[#999] text-sm italic">Sapa Mahiru di sini...</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#D4AF37] text-white rounded-br-none' 
                      : 'bg-white border border-[#D4AF37]/10 text-[#4A4238] rounded-bl-none shadow-sm font-serif italic'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#D4AF37]/10 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-[#D4AF37]/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-[#FFFBF0] border border-[#D4AF37]/20 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="w-10 h-10 bg-[#D4AF37] text-white rounded-full flex items-center justify-center hover:bg-[#B89830] transition-colors shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#D4AF37] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#D4AF37]/40 border-4 border-white transition-all overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MessageCircle className="w-8 h-8" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
