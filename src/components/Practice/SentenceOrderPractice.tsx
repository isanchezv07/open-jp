import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RefreshCw, Loader2 } from 'lucide-react';
import type { SentenceExercise } from '../../lib/types/index';

interface SentenceOrderPracticeProps {
  exercise: SentenceExercise;
  mode?: 'ja-es' | 'es-ja';
  onComplete: (isCorrect: boolean) => void;
}

export default function SentenceOrderPractice({ exercise, mode = 'es-ja', onComplete }: SentenceOrderPracticeProps) {
  const isJaEs = mode === 'ja-es';
  const targetWords = isJaEs ? (exercise.spanishWords || exercise.translation.split(' ')) : exercise.words;
  const distractors = isJaEs ? (exercise.spanishDistractors || []) : (exercise.distractors || []);
  const allOptions = [...targetWords, ...distractors];

  const prompt = isJaEs ? exercise.japanese : exercise.translation;
  const expectedAnswer = isJaEs ? exercise.translation : exercise.japanese;

  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState(() => [...allOptions].sort(() => Math.random() - 0.5));
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const [fetchedImageUrl, setFetchedImageUrl] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  useEffect(() => {
    setFetchedImageUrl(null);
    if (exercise.keyword) {
      setIsLoadingImage(true);
      fetch(`/api/irasutoya/${encodeURIComponent(exercise.keyword)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            setFetchedImageUrl(data[randomIndex].imageUrl);
          }
        })
        .catch(err => console.error(err))
        .finally(() => setIsLoadingImage(false));
    }
  }, [exercise]);

  const handleWordClick = (word: string, index: number) => {
    if (status !== 'idle') return;
    setSelectedWords([...selectedWords, word]);
    const newShuffled = [...shuffledWords];
    newShuffled.splice(index, 1);
    setShuffledWords(newShuffled);
  };

  const resetSelection = () => {
    setSelectedWords([]);
    setShuffledWords([...allOptions].sort(() => Math.random() - 0.5));
    setStatus('idle');
  };

  const checkAnswer = () => {
    const userAnswer = selectedWords.join(' ').trim().toLowerCase();
    const normalizedExpected = expectedAnswer.trim().toLowerCase();
    
    if (userAnswer === normalizedExpected) {
      setStatus('correct');
      if (typeof window !== 'undefined') {
        const audio = new Audio('https://www.myinstants.com/media/sounds/duolingo-correct.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {});
      }
      setTimeout(() => onComplete(true), 1200);
    } else {
      setStatus('incorrect');
      if (typeof window !== 'undefined') {
        const audio = new Audio('https://www.myinstants.com/media/sounds/duolingo-wrong.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {});
      }
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-700 shadow-sm space-y-8">
      <div className="text-center space-y-4">
        <p className="text-slate-400 font-black uppercase text-xs tracking-widest">
          {isJaEs ? 'Ordena la traducción:' : 'Forma la oración en japonés:'}
        </p>
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 leading-tight">{prompt}</h2>
      </div>

      <div className="relative">
        {isLoadingImage ? (
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <Loader2 className="animate-spin" size={32} />
            <span className="font-bold text-sm tracking-widest uppercase">Buscando ilustración...</span>
          </div>
        ) : (
          fetchedImageUrl && (
            <img 
              src={fetchedImageUrl} 
              alt="Visual context" 
              className="mx-auto h-40 object-contain p-2 transition-transform duration-500 hover:scale-105"
            />
          )
        )}
      </div>

      <div className="min-h-24 bg-slate-50 dark:bg-slate-700/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-4xl p-6 flex flex-wrap gap-3 justify-center items-center">
        <AnimatePresence>
          {selectedWords.map((word, index) => (
            <motion.button
              key={`${word}-${index}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => {
                if (status !== 'idle') return;
                setSelectedWords(selectedWords.filter((_, i) => i !== index));
                setShuffledWords([...shuffledWords, word]);
              }}
              className="px-5 py-3 bg-sky-500 text-white rounded-2xl font-black shadow-sm btn-3d"
              style={{ '--border-color': 'var(--duo-blue-border)' } as any}
            >
              {word}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {shuffledWords.map((word, index) => (
          <motion.button
            key={`${word}-${index}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleWordClick(word, index)}
            className="px-5 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-black text-slate-700 dark:text-slate-200 hover:border-sky-300 transition-all shadow-sm"
          >
            {word}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={resetSelection}
          className="p-5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:text-slate-400 rounded-2xl hover:bg-slate-200 dark:bg-slate-600 transition-colors"
        >
          <RefreshCw size={24} />
        </button>
        <button
          onClick={checkAnswer}
          disabled={status !== 'idle' || selectedWords.length === 0}
          className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all btn-3d ${
            status === 'correct' 
              ? 'bg-green-500 text-white' 
              : status === 'incorrect' 
                ? 'bg-red-500 text-white' 
                : 'bg-sky-500 text-white'
          } disabled:opacity-50`}
          style={{ '--border-color': status === 'correct' ? 'var(--duo-green-border)' : status === 'incorrect' ? '#b91c1c' : 'var(--duo-blue-border)' } as any}
        >
          {status === 'correct' ? <Check className="mx-auto" size={28} strokeWidth={3} /> : status === 'incorrect' ? <X className="mx-auto" size={28} strokeWidth={3} /> : 'COMPROBAR'}
        </button>
      </div>

      <AnimatePresence>
        {status === 'incorrect' && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-500 font-black text-center uppercase tracking-widest text-sm"
          >
            ¡Ups! Inténtalo de nuevo.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
