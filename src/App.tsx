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
  description: string;
  icon: React.ReactNode;
}

const TOPICS = [
  { title: "Microbiologia e Parasitologia", icon: <Microscope className="w-5 h-5" /> },
  { title: "A História da Microbiologia", icon: <History className="w-5 h-5" /> },
  { title: "Características dos Microrganismos", icon: <Database className="w-5 h-5" /> },
  { title: "Bacteriologia Clínica", icon: <Microscope className="w-5 h-5" /> },
  { title: "Micologia (Fungos)", icon: <Bug className="w-5 h-5" /> },
  { title: "Virologia (Vírus)", icon: <Dna className="w-5 h-5" /> },
  { title: "Parasitologia Humana", icon: <Bug className="w-5 h-5" /> },
  { title: "Controle de Microrganismos", icon: <Sun className="w-5 h-5" /> },
  { title: "Imunologia Básica", icon: <Leaf className="w-5 h-5" /> },
  { title: "Epidemiologia e Transmissão", icon: <Wind className="w-5 h-5" /> },
  { title: "Diagnóstico Laboratorial", icon: <Presentation className="w-5 h-5" /> },
  { title: "Microbiologia Ambiental", icon: <Leaf className="w-5 h-5" /> },
];

export default function App() {
  const [view, setView] = useState<'home' | 'presentation'>('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studyMode, setStudyMode] = useState(false);
  const [revealedPoints, setRevealedPoints] = useState<number[]>([]);
  const [showFullText, setShowFullText] = useState(false);

  const generateContent = async () => {
    setLoading(true);
    setError(null);
    
    // Simulating a small delay for a better "loading" experience
    setTimeout(() => {
      const staticSlides = [
        {
          title: "Microbiologia e Parasitologia",
          content: [
            "Estudo dos microrganismos (seres invisíveis a olho nu).",
            "Foco em bactérias, fungos, vírus e protozoários.",
            "Importância clínica: diagnóstico, tratamento e prevenção.",
            "Relação entre hospedeiro, agente e meio ambiente.",
            "Microbiota normal: Microrganismos que habitam o corpo sem causar doenças.",
            "Patogenicidade: Capacidade de um agente causar doença no hospedeiro."
          ],
          description: "A Microbiologia é a ciência que estuda os organismos microscópicos, fundamentais para a vida na Terra. Eles desempenham papéis cruciais na decomposição, produção de alimentos e equilíbrio ambiental. Na área da saúde, foca na identificação de agentes causadores de doenças e no desenvolvimento de tratamentos. A Parasitologia, por sua vez, foca especificamente em organismos que vivem às custas de outros (hospedeiros), causando danos. A compreensão da tríade epidemiológica (agente, hospedeiro e ambiente) é essencial para o controle de infecções e surtos.",
          icon: <Microscope className="w-5 h-5" />
        },
        {
          title: "A História da Microbiologia",
          content: [
            "Antony van Leeuwenhoek: Primeiro a observar 'animálculos' com microscópio simples.",
            "Louis Pasteur: Derrubou a teoria da geração espontânea e criou a pasteurização.",
            "Robert Koch: Postulados para identificar agentes causadores de doenças.",
            "Alexander Fleming: Descoberta acidental da Penicilina em 1928.",
            "Joseph Lister: Introdução de técnicas antissépticas em cirurgias.",
            "Edward Jenner: Desenvolvimento da primeira vacina (Varíola)."
          ],
          description: "A história da microbiologia é marcada por descobertas que mudaram a medicina. Leeuwenhoek abriu as portas para o mundo invisível no século XVII. No século XIX, a 'Era de Ouro' trouxe Pasteur, que provou que a vida não surge do nada (biogênese) e Koch, que estabeleceu critérios científicos para ligar um micróbio a uma doença específica. A descoberta da penicilina por Fleming iniciou a era dos antibióticos, salvando milhões de vidas. Cada um desses marcos permitiu que hoje tivéssemos vacinas, cirurgias seguras e controle de doenças infecciosas.",
          icon: <History className="w-5 h-5" />
        },
        {
          title: "Características dos Microrganismos",
          content: [
            "Procariontes (Bactérias): Sem núcleo definido e organelas membranosas.",
            "Eucariontes (Fungos/Protozoários): Possuem núcleo e organelas complexas.",
            "Morfologia Bacteriana: Cocos (esferas), bacilos (bastões), espirilos.",
            "Metabolismo: Aeróbios (usam O2), anaeróbios e facultativos.",
            "Reprodução: Fissão binária (bactérias) e brotamento/esporulação (fungos).",
            "Nutrição: Autótrofos (produzem alimento) vs Heterótrofos."
          ],
          description: "Os microrganismos são incrivelmente diversos. As bactérias são procariontes simples, mas com metabolismo altamente adaptável, podendo viver em ambientes extremos. Fungos e protozoários são eucariontes, possuindo estruturas celulares semelhantes às nossas, o que torna o tratamento de suas infecções mais complexo. A morfologia (forma) e o metabolismo (como obtêm energia) são critérios fundamentais para a classificação e identificação laboratorial. Entender se um micróbio precisa ou não de oxigênio ajuda a prever onde ele causará infecção no corpo humano.",
          icon: <Database className="w-5 h-5" />
        },
        {
          title: "Bacteriologia Clínica",
          content: [
            "Parede Celular: Gram-positivas (peptidoglicano espesso) vs Gram-negativas.",
            "Coloração de Gram: Técnica fundamental para classificação inicial.",
            "Estruturas Extras: Cápsulas (proteção), fímbrias (adesão) e flagelos (movimento).",
            "Endósporos: Formas de resistência extrema a calor e desinfetantes.",
            "Genética: Plasmídeos (DNA extracromossomal) e resistência a antibióticos.",
            "Crescimento: Fases lag, log (exponencial), estacionária e declínio."
          ],
          description: "A Bacteriologia Clínica foca na identificação de bactérias patogênicas. A Coloração de Gram é o primeiro passo: Gram-positivas ficam roxas devido à parede espessa, enquanto Gram-negativas ficam rosadas. Essa diferença é crucial para a escolha do antibiótico. Algumas bactérias produzem endósporos, estruturas de 'hibernação' que sobrevivem a fervura e álcool, exigindo autoclavação para esterilização. Além disso, a troca de plasmídeos entre bactérias é o principal mecanismo de disseminação da resistência bacteriana em hospitais.",
          icon: <Microscope className="w-5 h-5" />
        },
        {
          title: "Micologia (Fungos)",
          content: [
            "Estudo dos fungos: Eucariontes, heterótrofos e decompositores.",
            "Estrutura: Hifas (filamentos), Micélio (corpo) e Esporos (reprodução).",
            "Parede celular composta por quitina e membrana com ergosterol.",
            "Micoses: Superficiais, cutâneas, subcutâneas e sistêmicas (profundas).",
            "Leveduras (unicelulares) vs Bolores (multicelulares).",
            "Importância: Produção de alimentos, antibióticos e patógenos humanos."
          ],
          description: "Os fungos são organismos eucariontes que podem ser unicelulares (leveduras) ou multicelulares (bolores). Eles possuem uma parede celular rígida de quitina e uma membrana celular rica em ergosterol, que é o alvo de muitos medicamentos antifúngicos. As micoses variam de infecções simples na pele e unhas até infecções sistêmicas graves em pacientes imunocomprometidos. Diferente das bactérias, os fungos crescem mais lentamente e preferem ambientes levemente ácidos e úmidos, sendo essenciais na natureza para a reciclagem de matéria orgânica.",
          icon: <Bug className="w-5 h-5" />
        },
        {
          title: "Virologia (Vírus)",
          content: [
            "Vírus: Parasitas intracelulares obrigatórios e acelulares.",
            "Não possuem metabolismo próprio, dependem da maquinaria da célula hospedeira.",
            "Estrutura: Capsídeo proteico envolvendo DNA ou RNA (nunca ambos juntos).",
            "Envelope Viral: Camada lipídica externa presente em alguns vírus.",
            "Ciclo Replicativo: Adsorção, penetração, desnudamento, síntese e montagem.",
            "Bacteriófagos: Vírus que infectam especificamente bactérias."
          ],
          description: "Vírus são entidades biológicas únicas, situadas no limite entre o vivo e o não-vivo. Eles não têm células e só conseguem se replicar 'sequestrando' uma célula viva. A estrutura é simples: um núcleo de ácido genético protegido por uma capa de proteína. Alguns possuem um envelope de gordura, o que os torna sensíveis a sabão e álcool (como o vírus da gripe e o coronavírus). O ciclo viral envolve a entrada na célula, a liberação do material genético e a produção de novos vírus que saem para infectar outras células, muitas vezes destruindo a célula hospedeira no processo.",
          icon: <Dna className="w-5 h-5" />
        },
        {
          title: "Parasitologia Humana",
          content: [
            "Estudo de protozoários, helmintos (vermes) e artrópodes.",
            "Ciclo Biológico: Monoxênico (direto) ou Heteroxênico (com hospedeiro intermediário).",
            "Hospedeiro Definitivo: Onde ocorre a reprodução sexuada do parasita.",
            "Hospedeiro Intermediário: Onde ocorre a fase assexuada ou larval.",
            "Principais Doenças: Malária, Doença de Chagas, Amebíase e Giardíase.",
            "Vias de Transmissão: Oral-fecal, picada de insetos, penetração na pele."
          ],
          description: "A Parasitologia estuda a relação entre parasitas e seus hospedeiros. Os protozoários são unicelulares (como a ameba), enquanto os helmintos são vermes multicelulares (como a lombriga). O ciclo de vida pode ser simples, passando de pessoa para pessoa, ou complexo, envolvendo insetos vetores (como o mosquito da Malária ou o barbeiro da Doença de Chagas). A prevenção foca no saneamento básico, higiene pessoal e controle de vetores. Entender o ciclo biológico é fundamental para saber em qual fase o diagnóstico deve ser feito e como interromper a transmissão.",
          icon: <Bug className="w-5 h-5" />
        },
        {
          title: "Controle de Microrganismos",
          content: [
            "Esterilização: Eliminação total de todas as formas de vida (incluindo esporos).",
            "Desinfecção: Redução de patógenos em objetos inanimados.",
            "Antissepsia: Uso de agentes químicos em tecidos vivos (pele).",
            "Métodos Físicos: Calor úmido (autoclave), calor seco (estufa), radiação e filtração.",
            "Métodos Químicos: Álcoois, cloro, iodo, fenóis e peróxido de hidrogênio.",
            "Antibióticos: Substâncias que inibem ou matam bactérias seletivamente."
          ],
          description: "O controle do crescimento microbiano é vital em ambientes hospitalares e laboratoriais. A esterilização é o nível mais alto, alcançado geralmente por autoclave (calor e pressão), garantindo a morte de esporos resistentes. A desinfecção e antissepsia usam agentes químicos para reduzir a carga microbiana a níveis seguros. Já os antibióticos são ferramentas de controle interno, agindo especificamente em estruturas bacterianas (como a parede celular) sem danificar as células humanas. O uso indiscriminado desses agentes leva ao surgimento de 'superbactérias' resistentes.",
          icon: <Sun className="w-5 h-5" />
        },
        {
          title: "Imunologia Básica",
          content: [
            "Sistema Imune: Defesa do organismo contra agentes invasores.",
            "Imunidade Inata: Primeira linha de defesa, inespecífica e rápida.",
            "Imunidade Adquirida: Específica, lenta no primeiro contato e possui memória.",
            "Antígenos: Substâncias estranhas que desencadeiam resposta imune.",
            "Anticorpos (Imunoglobulinas): Proteínas que neutralizam antígenos.",
            "Células: Linfócitos T (celular), Linfócitos B (humoral) e Macrófagos."
          ],
          description: "A Imunologia estuda como nosso corpo se protege. Temos a imunidade inata, com a qual nascemos (pele, muco, células fagocitárias), que reage imediatamente a qualquer invasor. A imunidade adquirida é mais sofisticada: ela 'aprende' a reconhecer um invasor específico e cria uma memória. Os Linfócitos B produzem anticorpos que marcam os inimigos, enquanto os Linfócitos T destroem células infectadas. As vacinas funcionam justamente treinando essa memória imunológica, apresentando um antígeno inofensivo para que o corpo esteja pronto caso o agente real apareça.",
          icon: <Leaf className="w-5 h-5" />
        },
        {
          title: "Epidemiologia e Transmissão",
          content: [
            "Estudo da distribuição e determinantes das doenças em populações.",
            "Cadeia Epidemiológica: Agente, reservatório, porta de saída, via de transmissão.",
            "Transmissão Direta: Contato físico, gotículas (curta distância).",
            "Transmissão Indireta: Veículos (água, alimentos), fômites e vetores.",
            "Endemia, Epidemia e Pandemia: Diferenças de escala e ocorrência.",
            "Medidas de Controle: Isolamento, quarentena e vigilância sanitária."
          ],
          description: "A Epidemiologia é a ciência que estuda como as doenças se espalham e como podem ser controladas. Ela analisa a 'cadeia de infecção', identificando onde o ciclo pode ser interrompido. Entender a diferença entre um surto local e uma pandemia global é crucial para a saúde pública. As vias de transmissão, sejam elas diretas (como um aperto de mão ou beijo) ou indiretas (através de água contaminada ou picadas de insetos), determinam as estratégias de prevenção, como o uso de máscaras, saneamento básico ou vacinação em massa.",
          icon: <Wind className="w-5 h-5" />
        },
        {
          title: "Diagnóstico Laboratorial",
          content: [
            "Coleta de Amostras: Sangue, urina, fezes, escarro e secreções.",
            "Exame Direto: Microscopia (fresco ou corado) para visualização rápida.",
            "Cultura: Isolamento do microrganismo em meios seletivos e diferenciais.",
            "Antibiograma (TSA): Teste de sensibilidade para guiar a terapia.",
            "Métodos Sorológicos: Detecção de antígenos ou anticorpos (ELISA, Teste Rápido).",
            "Métodos Moleculares: PCR para detecção direta do material genético (DNA/RNA)."
          ],
          description: "O diagnóstico laboratorial é a ponte entre a suspeita clínica e o tratamento correto. Começa com a coleta adequada da amostra, seguida por técnicas que variam desde a simples observação ao microscópio até a sofisticada biologia molecular (PCR). A cultura permite que o micróbio cresça em laboratório para que possamos testar quais antibióticos ainda funcionam contra ele (antibiograma). Já os testes sorológicos nos dizem se o corpo já teve contato com o agente, sendo fundamentais para o diagnóstico de viroses e infecções crônicas.",
          icon: <Presentation className="w-5 h-5" />
        },
        {
          title: "Microbiologia Ambiental",
          content: [
            "Ciclos Biogeoquímicos: Papel dos micróbios nos ciclos do Carbono e Nitrogênio.",
            "Biorremediação: Uso de microrganismos para limpar poluentes no ambiente.",
            "Microbiologia de Alimentos: Fermentação (pães, queijos, bebidas) e deterioração.",
            "Produção Industrial: Fabricação de enzimas, vitaminas e biocombustíveis.",
            "Tratamento de Esgoto: Uso de bactérias para degradar matéria orgânica.",
            "Probióticos: Microrganismos benéficos para a saúde intestinal humana."
          ],
          description: "Nem todos os microrganismos são vilões; a maioria é essencial para a vida. Na Microbiologia Ambiental, estudamos como eles reciclam nutrientes na natureza e como podem ser usados para 'comer' petróleo ou plásticos em desastres ambientais (biorremediação). Na indústria, eles são operários invisíveis que produzem desde o pão e o iogurte do café da manhã até medicamentos complexos e combustíveis renováveis. O estudo da microbiota intestinal também revela que trilhões de bactérias vivem em harmonia conosco, auxiliando na digestão e fortalecendo nossa imunidade.",
          icon: <Leaf className="w-5 h-5" />
        }
      ];

      setSlides(staticSlides);
      setView('presentation');
      setLoading(false);
    }, 800);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setRevealedPoints([]);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setRevealedPoints([]);
    }
  };

  const resetPresentation = () => { 
    setView('home'); 
    setCurrentSlide(0); 
    setStudyMode(false);
    setRevealedPoints([]);
    setShowFullText(false);
  };

  const toggleReveal = (index: number) => {
    if (revealedPoints.includes(index)) {
      setRevealedPoints(revealedPoints.filter(i => i !== index));
    } else {
      setRevealedPoints([...revealedPoints, index]);
    }
  };

  const revealAll = () => {
    if (slides[currentSlide]) {
      setRevealedPoints(slides[currentSlide].content.map((_, i) => i));
    }
  };

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
        <header className="p-4 md:p-8 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-3"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              <Leaf className="w-5 h-5 md:w-6 md:h-6 text-green-300" />
            </div>
            <h1 className="text-lg md:text-2xl font-serif italic tracking-wide drop-shadow-md">BioGarden Study</h1>
          </motion.div>

          {view === 'presentation' && (
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setShowFullText(!showFullText)}
                    className={`px-4 py-1.5 md:px-6 md:py-2 backdrop-blur-md border border-white/20 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${showFullText ? 'bg-green-500/40 text-white' : 'bg-white/10 text-white/70'}`}
                  >
                    <Presentation className="w-3 h-3 md:w-4 md:h-4" /> {showFullText ? 'Ver Resumo' : 'Ver Explicação'}
                  </button>
                  <button 
                    onClick={() => {
                      setStudyMode(!studyMode);
                      setRevealedPoints([]);
                      if (!studyMode) setShowFullText(false);
                    }}
                    className={`px-4 py-1.5 md:px-6 md:py-2 backdrop-blur-md border border-white/20 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${studyMode ? 'bg-pink-500/40 text-white' : 'bg-white/10 text-white/70'}`}
                  >
                    <Sun className="w-3 h-3 md:w-4 md:h-4" /> {studyMode ? 'Modo Estudo ON' : 'Modo Estudo OFF'}
                  </button>
              <button 
                onClick={resetPresentation}
                className="px-4 py-1.5 md:px-6 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-3 h-3 md:w-4 md:h-4" /> Resetar
              </button>
            </div>
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
                className="max-w-4xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] md:rounded-[40px] p-6 md:p-16 shadow-2xl text-center space-y-8 md:space-y-10"
              >
                <div className="space-y-3 md:space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/30 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border border-green-400/30"
                  >
                    <Sun className="w-3 h-3" /> Estudo Imersivo
                  </motion.div>
                  <h2 className="text-4xl md:text-8xl font-serif italic leading-tight drop-shadow-xl">
                    Microbiologia <br />
                    <span className="text-pink-200">& Parasitologia</span>
                  </h2>
                  <p className="text-sm md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                    Explore o mundo invisível em meio à beleza da natureza. 
                    Uma experiência de aprendizado serena e inspiradora.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 text-left">
                  {TOPICS.map((topic, idx) => (
                    <div key={idx} className="p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-3 md:block">
                      <div className="text-pink-200 md:mb-2 shrink-0">{topic.icon}</div>
                      <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-wider opacity-70">{topic.title}</h3>
                    </div>
                  ))}
                </div>

                <div className="pt-4 md:pt-6">
                  <button 
                    onClick={generateContent}
                    disabled={loading}
                    className="group relative inline-flex items-center gap-3 md:gap-4 bg-white text-green-900 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-green-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                    ) : (
                      <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                    )}
                    FLORESCER ESTUDO
                  </button>
                  {error && (
                    <div className="mt-6 p-4 bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-2xl text-red-100 text-sm font-medium max-w-md mx-auto">
                      <p className="font-bold mb-1">Ops! Algo deu errado:</p>
                      <p className="opacity-80">{error}</p>
                      <p className="mt-2 text-[10px] opacity-60">Dica: Verifique se a chave GEMINI_API_KEY está configurada nos segredos do AI Studio.</p>
                    </div>
                  )}
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1 }}
                    className="mt-6 md:mt-8 text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold"
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
                className="max-w-5xl w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[30px] md:rounded-[40px] p-6 md:p-16 shadow-2xl min-h-[60vh] md:min-h-[70vh] flex flex-col relative overflow-hidden"
              >
                {/* Decorative Corner Flowers */}
                <Flower2 className="absolute -top-6 -right-6 w-16 h-16 md:w-24 md:h-24 text-pink-200/20 rotate-12" />
                <Leaf className="absolute -bottom-6 -left-6 w-16 h-16 md:w-24 md:h-24 text-green-200/20 -rotate-12" />

                <div className="flex-grow flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="space-y-6 md:space-y-10"
                    >
                      <div className="flex items-center gap-4 md:gap-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-2xl md:rounded-3xl flex items-center justify-center text-pink-200 shadow-inner shrink-0">
                          {slides[currentSlide].icon}
                        </div>
                        <h3 className="text-2xl md:text-6xl font-serif italic drop-shadow-lg leading-tight">
                          {slides[currentSlide].title}
                        </h3>
                      </div>
                      
                      <div className="space-y-4 md:space-y-6">
                        {showFullText ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-lg md:text-3xl leading-relaxed text-white/90 font-light italic"
                          >
                            {slides[currentSlide].description}
                          </motion.div>
                        ) : (
                          slides[currentSlide].content.map((point, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 + 0.2 }}
                              className="relative"
                            >
                              <div 
                                onClick={() => studyMode && toggleReveal(i)}
                                className={`flex items-start gap-3 md:gap-5 text-base md:text-3xl leading-snug transition-all duration-500 ${studyMode && !revealedPoints.includes(i) ? 'blur-md cursor-pointer select-none opacity-30' : 'text-white/90'}`}
                              >
                                <Wind className="mt-1 md:mt-2 w-4 h-4 md:w-6 md:h-6 text-green-300 shrink-0" />
                                {point}
                              </div>
                              {studyMode && !revealedPoints.includes(i) && (
                                <div 
                                  onClick={() => toggleReveal(i)}
                                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                >
                                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Revelar</span>
                                </div>
                              )}
                            </motion.div>
                          ))
                        )}
                      </div>

                      {!showFullText && studyMode && revealedPoints.length < slides[currentSlide].content.length && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={revealAll}
                          className="mt-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-pink-200 hover:text-white transition-colors"
                        >
                          Revelar Tudo
                        </motion.button>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-center pt-8 md:pt-12 mt-6 md:mt-8 border-t border-white/10">
                  <div className="px-3 py-1.5 md:px-4 md:py-2 bg-black/20 rounded-full text-[10px] md:text-sm font-mono tracking-widest">
                    {currentSlide + 1} / {slides.length}
                  </div>
                  <div className="flex gap-3 md:gap-4">
                    <button 
                      onClick={prevSlide}
                      disabled={currentSlide === 0}
                      className="p-3 md:p-5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all disabled:opacity-10"
                    >
                      <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                    <button 
                      onClick={nextSlide}
                      disabled={currentSlide === slides.length - 1}
                      className="p-3 md:p-5 rounded-full bg-white text-green-900 hover:bg-green-50 transition-all disabled:opacity-10 shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
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
