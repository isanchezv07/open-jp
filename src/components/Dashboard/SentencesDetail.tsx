import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, BookOpen, MessageCircle, Star, X, Trophy, Home, RefreshCw } from 'lucide-react';
import { sentenceExercises } from '../../lib/data/sentences';
import SentenceOrderPractice from '../Practice/SentenceOrderPractice';
import ImageBinaryPractice from '../Practice/ImageBinaryPractice';
import { performanceMessages } from '../../lib/constants/messages';
import CompletionCelebration from '../Common/CompletionCelebration';

export default function SentencesDetail() {
  const [activePractice, setActivePractice] = useState<{ mode: 'ja-es' | 'es-ja', category: string } | null>(null);
  const [questionLimit, setQuestionLimit] = useState(5);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [practiceSet, setPracticeSet] = useState<typeof sentenceExercises>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleSelection = (id: string) => {
    const next = new Set(selectedItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedItems(next);
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(sentenceExercises.map(e => e.category)));
    return cats.map(cat => ({
      name: cat,
      exercises: sentenceExercises.filter(e => e.category === cat)
    }));
  }, []);

  const startPractice = (mode: 'ja-es' | 'es-ja', category: string) => {
    let catExercises = sentenceExercises.filter(e => e.category === category);
    
    // Filter by selection if any selected for this category
    const selectedInCategory = catExercises.filter(e => selectedItems.has(e.id));
    if (selectedInCategory.length > 0) {
      catExercises = selectedInCategory;
    }

    if (catExercises.length === 0) return;

    const set = [];
    let currentShuffled = [...catExercises].sort(() => Math.random() - 0.5);
    
    while(set.length < questionLimit) {
      if (currentShuffled.length === 0) {
        currentShuffled = [...catExercises].sort(() => Math.random() - 0.5);
      }
      set.push(currentShuffled.pop()!);
    }
    
    setPracticeSet(set);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsFinished(false);
    setActivePractice({ mode, category });
  };

  const handleComplete = (isCorrect: boolean) => {
    if (isCorrect) setCorrectCount(prev => prev + 1);
    
    if (currentIndex < practiceSet.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (activePractice) {
    if (isFinished) {
      const accuracy = Math.round((correctCount / practiceSet.length) * 100);
      let messageGroup = performanceMessages.keepTrying;
      if (accuracy === 100) messageGroup = performanceMessages.perfect;
      else if (accuracy >= 90) messageGroup = performanceMessages.great;
      else if (accuracy >= 70) messageGroup = performanceMessages.good;

      const randomPhrase = messageGroup[Math.floor(Math.random() * messageGroup.length)];

      return (
        <CompletionCelebration 
            accuracy={accuracy}
            xp={correctCount * 15}
            message={randomPhrase}
            onHome={() => setActivePractice(null)}
            onRetry={() => startPractice(activePractice.mode, activePractice.category)}
        />
      );
    }

    const currentExercise = practiceSet[currentIndex];
    if (!currentExercise) return <div className="text-center py-20 font-black text-slate-400">Cargando...</div>;

    return (
      <div className="max-w-2xl mx-auto px-6 py-8 min-h-screen">
        <div className="flex items-center gap-6 mb-12">
            <button onClick={() => setActivePractice(null)} className="text-slate-300 hover:text-slate-500 transition-colors">
                <X size={32} strokeWidth={3} />
            </button>
            <div className="flex-1 h-5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                <motion.div
                    className="relative h-full rounded-full"
                    initial={false}
                    animate={{ width: `${(currentIndex / practiceSet.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-green-400 via-green-500 to-green-600" />
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-white/25 rounded-full" />
                    <div className="absolute inset-0 bg-green-400/30 blur-md" />
                </motion.div>
            </div>
            <div className="text-slate-400 font-black text-sm">
                {currentIndex + 1} / {practiceSet.length}
            </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentExercise.id}-${currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentExercise.type === 'image_binary' ? (
              <ImageBinaryPractice 
                  exercise={currentExercise} 
                  onComplete={handleComplete} 
              />
            ) : (
              <SentenceOrderPractice 
                  exercise={currentExercise} 
                  mode={activePractice.mode}
                  onComplete={handleComplete} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-sm p-8"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
            <a href="/" className="w-16 h-16 rounded-3xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all text-slate-500"><ArrowLeft size={28} /></a>
            <div className="flex-1">
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">Unidad: Oraciones</h1>
              <p className="text-slate-400 font-bold mt-1">Selecciona las oraciones que desees practicar o practica con todas.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl border-2 border-slate-200 p-4">
              <label className="block text-xs uppercase tracking-widest font-black text-slate-400 mb-2">Nº Preguntas</label>
              <input type="number" min="1" value={questionLimit} onChange={(e) => setQuestionLimit(Math.max(1, parseInt(e.target.value) || 1))} className="w-24 rounded-xl border-2 border-slate-200 p-2 text-center font-black text-slate-700 outline-none focus:border-sky-500" />
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          {categories.map((cat, index) => {
            const isImageBinary = cat.exercises.every(e => e.type === 'image_binary');
            const selectedInCategory = cat.exercises.filter(e => selectedItems.has(e.id));
            
            return (
              <motion.section key={cat.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-sm p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-2 h-10 rounded-full bg-teal-500" />
                  <h2 className="text-3xl font-black text-slate-800">{cat.name}</h2>
                  <span className="bg-slate-100 text-slate-500 px-4 py-1 rounded-full text-sm font-black">{cat.exercises.length} ejercicios</span>
                  {selectedInCategory.length > 0 && (
                    <span className="bg-teal-100 text-teal-600 px-4 py-1 rounded-full text-sm font-black">
                      {selectedInCategory.length} seleccionadas
                    </span>
                  )}
                </div>
                {isImageBinary ? (
                  <div className="grid grid-cols-1 gap-6 mb-8">
                    <button onClick={() => startPractice('ja-es', cat.name)} className="group bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-purple-400 rounded-[2rem] p-6 flex justify-between items-center transition-all btn-3d" style={{ '--border-color': '#a855f7' } as any}>
                      <div className="text-left"><h3 className="text-xl font-black text-slate-800">Verificación Visual</h3><p className="text-slate-400 font-bold text-sm">Determina si la oración coincide con la imagen</p></div>
                      <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all"><Star fill="currentColor" size={24} /></div>
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <button onClick={() => startPractice('ja-es', cat.name)} className="group bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-sky-400 rounded-[2rem] p-6 flex justify-between items-center transition-all btn-3d" style={{ '--border-color': 'var(--duo-blue-border)' } as any}>
                      <div className="text-left"><h3 className="text-xl font-black text-slate-800">Lectura</h3><p className="text-slate-400 font-bold text-sm">Japonés → Español</p></div>
                      <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all"><Play fill="currentColor" size={24} /></div>
                    </button>
                    <button onClick={() => startPractice('es-ja', cat.name)} className="group bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-green-400 rounded-[2rem] p-6 flex justify-between items-center transition-all btn-3d" style={{ '--border-color': 'var(--duo-green-border)' } as any}>
                      <div className="text-left"><h3 className="text-xl font-black text-slate-800">Escritura</h3><p className="text-slate-400 font-bold text-sm">Español → Japonés</p></div>
                      <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all"><BookOpen size={24} /></div>
                    </button>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.exercises.map((exercise) => {
                    const isSelected = selectedItems.has(exercise.id);
                    return (
                      <motion.div
                        key={exercise.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => toggleSelection(exercise.id)}
                        className={`cursor-pointer rounded-2xl p-4 text-center transition-all group flex flex-col justify-center min-h-[6rem] border-2 ${
                          isSelected
                            ? 'bg-teal-50 border-teal-400 shadow-md ring-2 ring-teal-400/20'
                            : 'bg-gradient-to-b from-white to-slate-50 border-slate-100 hover:border-teal-300 hover:shadow-md'
                        }`}
                      >
                        <div className={`text-lg font-black transition-colors leading-tight px-1 ${isSelected ? 'text-teal-700' : 'text-slate-800 group-hover:text-teal-600'}`}>
                          {exercise.translation}
                        </div>
                        <div className={`text-sm font-bold mt-2 tracking-widest px-1 ${isSelected ? 'text-teal-500' : 'text-slate-400'}`}>
                          {exercise.japanese}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
