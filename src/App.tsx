/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  RotateCcw, 
  Loader2,
  Microscope,
  History,
  Bug,
  Dna,
  Database,
  Presentation,
  Flower2,
  Leaf,
  Wind,
  Sun
} from "lucide-react";

// Types
interface Slide {
  title: string;
  content: string[];
  icon: React.ReactNode;
}

const TOPICS = [
  { title: "Microbiologia e Parasitologia", icon: <Microscope className="w-5 h-5" /> },
  { title: "A História da Microbiologia", icon: <History className="w-5 h-5" /> },
  { title: "Principais Características dos Microrganismos", icon: <Database className="w-5 h-5" /> },
  { title: "Micologia", icon: <Bug className="w-5 h-5" /> },
  { title: "Virologia", icon: <Dna className="w-5 h-5" /> },
  { title: "Parasitologia", icon: <Bug className="w-5 h-5" /> },
];

export default function App() {
  const [view, setView] = useState<'home' | 'presentation'>('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        Você é um professor especialista em Microbiologia e Parasitologia. 
        Com base no sumário, crie conteúdo resumido para slides.
        Tópicos: Microbiologia e Parasitologia, História, Microrganismos, Micologia, Virologia, Parasitologia.
        Retorne JSON: { "slides": [{ "title": "...", "content": ["...", "..."] }] }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text || "{}");
      if (data.slides) {
        const enrichedSlides = data.slides.map((s: any, idx: number) => ({
          ...s,
          icon: TOPICS[idx]?.icon || <Flower2 className="w-5 h-5" />
        }));
        setSlides(enrichedSlides);
        setView('presentation');
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao gerar conteúdo.");
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => currentSlide < slides.length - 1 && setCurrentSlide(prev => prev + 1);
  const prevSlide = () => currentSlide > 0 && setCurrentSlide(prev => prev - 1);
  const resetPresentation = () => { setView('home'); setCurrentSlide(0); };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans text-white">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1920" 
          alt="Landscape"
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      {/* Floating Petals / Particles (Decorative) */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * 100 + "%", rotate: 0 }}
            animate={{ 
              y: "110vh", 
              x: (Math.random() * 100 - 10) + "%",
              rotate: 360 
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute opacity-40"
          >
            <Flower2 className="w-6 h-6 text-pink-200" />
          </motion.div>
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col min-h-screen">
        <header className="p-8 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              <Leaf className="w-6 h-6 text-green-300" />
            </div>
            <h1 className="text-2xl font-serif italic tracking-wide drop-shadow-md">BioGarden Study</h1>
          </motion.div>

          {view === 'presentation' && (
            <button 
              onClick={resetPresentation}
              className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Resetar
            </button>
          )}
        </header>

        <main className="flex-grow flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            {view === 'home' ? (
              <motion.div 
                key="home"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="max-w-4xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-8 md:p-16 shadow-2xl text-center space-y-10"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1 bg-green-500/30 rounded-full text-xs font-bold uppercase tracking-widest border border-green-400/30"
                  >
                    <Sun className="w-3 h-3" /> Estudo Imersivo
                  </motion.div>
                  <h2 className="text-5xl md:text-8xl font-serif italic leading-tight drop-shadow-xl">
                    Microbiologia <br />
                    <span className="text-pink-200">& Parasitologia</span>
                  </h2>
                  <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                    Explore o mundo invisível em meio à beleza da natureza. 
                    Uma experiência de aprendizado serena e inspiradora.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
                  {TOPICS.map((topic, idx) => (
                    <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="text-pink-200 mb-2">{topic.icon}</div>
                      <h3 className="text-xs font-bold uppercase tracking-wider opacity-70">{topic.title}</h3>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <button 
                    onClick={generateContent}
                    disabled={loading}
                    className="group relative inline-flex items-center gap-4 bg-white text-green-900 px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-green-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Play className="w-6 h-6 fill-current" />
                    )}
                    FLORESCER ESTUDO
                  </button>
                  {error && <p className="mt-4 text-red-300 text-sm font-bold">{error}</p>}
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-[10px] uppercase tracking-[0.3em] font-bold"
                  >
                    Criador Jefferson Augusto
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="presentation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-5xl w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] p-8 md:p-16 shadow-2xl min-h-[60vh] flex flex-col relative overflow-hidden"
              >
                {/* Decorative Corner Flowers */}
                <Flower2 className="absolute -top-6 -right-6 w-24 h-24 text-pink-200/20 rotate-12" />
                <Leaf className="absolute -bottom-6 -left-6 w-24 h-24 text-green-200/20 -rotate-12" />

                <div className="flex-grow flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="space-y-10"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-pink-200 shadow-inner">
                          {slides[currentSlide].icon}
                        </div>
                        <h3 className="text-4xl md:text-6xl font-serif italic drop-shadow-lg">
                          {slides[currentSlide].title}
                        </h3>
                      </div>
                      
                      <ul className="space-y-6">
                        {slides[currentSlide].content.map((point, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            className="flex items-start gap-5 text-xl md:text-3xl text-white/90 leading-snug"
                          >
                            <Wind className="mt-2 w-6 h-6 text-green-300 shrink-0" />
                            {point}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-center pt-12 mt-8 border-t border-white/10">
                  <div className="px-4 py-2 bg-black/20 rounded-full text-sm font-mono tracking-widest">
                    {currentSlide + 1} / {slides.length}
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={prevSlide}
                      disabled={currentSlide === 0}
                      className="p-5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all disabled:opacity-10"
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button 
                      onClick={nextSlide}
                      disabled={currentSlide === slides.length - 1}
                      className="p-5 rounded-full bg-white text-green-900 hover:bg-green-50 transition-all disabled:opacity-10 shadow-lg"
                    >
                      <ChevronRight className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="p-8 text-center text-xs uppercase tracking-[0.4em] font-bold opacity-50">
          Cultivando Conhecimento • 2026
        </footer>
      </div>
    </div>
  );
}
