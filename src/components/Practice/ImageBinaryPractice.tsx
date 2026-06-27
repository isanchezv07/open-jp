import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';
import type { SentenceExercise } from '@/lib/types/index';

interface ImageBinaryPracticeProps {
  exercise: SentenceExercise;
}

export default function ImageBinaryPractice({ exercise, onComplete }: ImageBinaryPracticeProps) {
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [fetchedImageUrl, setFetchedImageUrl] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  useEffect(() => {
    // Reset state when exercise changes
    setStatus('idle');
    setSelectedAnswer(null);
    setFetchedImageUrl(null);
    
    if (exercise.keyword) {
      setIsLoadingImage(true);
      fetch(`/api/irasutoya/${encodeURIComponent(exercise.keyword)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            setFetchedImageUrl(data[randomIndex].imageUrl);
          } else if (exercise.imageUrls && exercise.imageUrls.length > 0) {
            // Fallback to static if API returns no results
            const randomIndex = Math.floor(Math.random() * exercise.imageUrls.length);
            setFetchedImageUrl(exercise.imageUrls[randomIndex]);
          }
        })
        .catch(err => {
          console.error(err);
          // Fallback
          if (exercise.imageUrls && exercise.imageUrls.length > 0) {
            const randomIndex = Math.floor(Math.random() * exercise.imageUrls.length);
            setFetchedImageUrl(exercise.imageUrls[randomIndex]);
          }
        })
        .finally(() => setIsLoadingImage(false));
    } else if (exercise.imageUrls && exercise.imageUrls.length > 0) {
      const randomIndex = Math.floor(Math.random() * exercise.imageUrls.length);
      setFetchedImageUrl(exercise.imageUrls[randomIndex]);
      setIsLoadingImage(false);
    } else if (exercise.imageUrl) {
      // Fallback for older data format
      setFetchedImageUrl(exercise.imageUrl);
      setIsLoadingImage(false);
    } else {
      setFetchedImageUrl('https://images.unsplash.com/photo-1531686264889-56fdcabd163f?w=500&q=80');
      setIsLoadingImage(false);
    }
  }, [exercise]);

  const checkAnswer = (userAnswer: boolean) => {
    if (status !== 'idle') return;
    
    setSelectedAnswer(userAnswer);

    if (userAnswer === exercise.isTrue) {
      setStatus('correct');
      if (typeof window !== 'undefined') {
        const audio = new Audio('https://www.myinstants.com/media/sounds/duolingo-correct.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {});
      }
      setTimeout(() => onComplete(true), 1500);
    } else {
      setStatus('incorrect');
      if (typeof window !== 'undefined') {
        const audio = new Audio('https://www.myinstants.com/media/sounds/duolingo-wrong.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {});
      }
      setTimeout(() => {
        setStatus('idle');
        setSelectedAnswer(null);
      }, 1500);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-700 shadow-sm space-y-8 max-w-xl mx-auto">
      <div className="text-center space-y-4">
        <p className="text-slate-400 font-black uppercase text-xs tracking-widest">
          ¿La oración coincide con la imagen?
        </p>
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 leading-tight">{exercise.japanese}</h2>
      </div>

      <div className="">
        {isLoadingImage ? (
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <Loader2 className="animate-spin" size={32} />
            <span className="font-bold text-sm tracking-widest uppercase">Buscando ilustración...</span>
          </div>
        ) : (
          fetchedImageUrl && (
            <img 
              src={fetchedImageUrl} 
              alt="Visual check" 
              className="w-full h-64 object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          )
        )}
        <div className="absolute inset-0 border-4 border-black/5 rounded-4xl pointer-events-none"></div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={() => checkAnswer(true)}
          disabled={status !== 'idle'}
          className={`flex-1 py-5 rounded-3xl font-black text-xl transition-all btn-3d ${
            selectedAnswer === true
              ? status === 'correct'
                ? 'bg-green-500 text-white'
                : 'bg-slate-300 text-white'
              : selectedAnswer === false && status === 'incorrect' && exercise.isTrue
              ? 'bg-green-500 text-white'
              : 'bg-green-100 text-green-700 hover:bg-green-500 hover:text-white'
          } disabled:opacity-50`}
          style={{ '--border-color': selectedAnswer === true ? (status === 'correct' ? 'var(--duo-green-border)' : '#94a3b8') : 'var(--duo-green-border)' } as any}
        >
          <div className="flex items-center justify-center gap-2">
            <Check size={24} strokeWidth={3} />
            <span>Positivo</span>
          </div>
        </button>

        <button
          onClick={() => checkAnswer(false)}
          disabled={status !== 'idle'}
          className={`flex-1 py-5 rounded-3xl font-black text-xl transition-all btn-3d ${
            selectedAnswer === false
              ? status === 'correct'
                ? 'bg-rose-500 text-white'
                : 'bg-slate-300 text-white'
              : selectedAnswer === true && status === 'incorrect' && !exercise.isTrue
              ? 'bg-rose-500 text-white'
              : 'bg-rose-100 text-rose-700 hover:bg-rose-500 hover:text-white'
          } disabled:opacity-50`}
          style={{ '--border-color': selectedAnswer === false ? (status === 'correct' ? '#9f1239' : '#94a3b8') : '#be123c' } as any}
        >
          <div className="flex items-center justify-center gap-2">
            <X size={24} strokeWidth={3} />
            <span>Negativo</span>
          </div>
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
            ¡Ups! La respuesta era diferente.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
