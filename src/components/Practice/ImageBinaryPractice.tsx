import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { SentenceExercise } from '../../lib/types/index';

interface ImageBinaryPracticeProps {
  exercise: SentenceExercise;
  onComplete: (isCorrect: boolean) => void;
}

export default function ImageBinaryPractice({ exercise, onComplete }: ImageBinaryPracticeProps) {
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const checkAnswer = (userAnswer: boolean) => {
    if (status !== 'idle') return;

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
      }, 1500);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-sm space-y-8 max-w-xl mx-auto">
      <div className="text-center space-y-4">
        <p className="text-slate-400 font-black uppercase text-xs tracking-widest">
          ¿La oración coincide con la imagen?
        </p>
        <h2 className="text-3xl font-black text-slate-800 leading-tight">{exercise.japanese}</h2>
        <p className="text-slate-500 font-bold text-lg">{exercise.translation}</p>
      </div>

      <div className="relative rounded-[2rem] overflow-hidden border-4 border-slate-100 shadow-sm group">
        <img 
          src={exercise.imageUrl} 
          alt="Visual check" 
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 border-4 border-black/5 rounded-[2rem] pointer-events-none"></div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={() => checkAnswer(true)}
          disabled={status !== 'idle'}
          className={`flex-1 py-5 rounded-[1.5rem] font-black text-xl transition-all btn-3d ${
            status === 'correct' && exercise.isTrue
              ? 'bg-green-500 text-white'
              : status === 'incorrect' && exercise.isTrue
              ? 'bg-red-500 text-white'
              : 'bg-green-100 text-green-700 hover:bg-green-500 hover:text-white'
          } disabled:opacity-50`}
          style={{ '--border-color': 'var(--duo-green-border)' } as any}
        >
          <div className="flex items-center justify-center gap-2">
            <Check size={24} strokeWidth={3} />
            <span>Positivo</span>
          </div>
        </button>

        <button
          onClick={() => checkAnswer(false)}
          disabled={status !== 'idle'}
          className={`flex-1 py-5 rounded-[1.5rem] font-black text-xl transition-all btn-3d ${
            status === 'correct' && !exercise.isTrue
              ? 'bg-green-500 text-white'
              : status === 'incorrect' && !exercise.isTrue
              ? 'bg-red-500 text-white'
              : 'bg-rose-100 text-rose-700 hover:bg-rose-500 hover:text-white'
          } disabled:opacity-50`}
          style={{ '--border-color': '#be123c' } as any}
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
