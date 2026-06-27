import { useState, useEffect } from 'react';
import { db, type Word, type Progress } from '@/lib/db/index';
import { validateAnswer, calculateNextReview } from '@/lib/services/srs';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Volume2, ArrowRight, Home, RefreshCw, Star } from 'lucide-react';
import { performanceMessages } from '@/lib/constants/messages';
import CompletionCelebration from '../Common/CompletionCelebration';

interface PracticeSessionProps {
  mode: 'ja-es' | 'es-ja' | 'audio' | 'image' | 'flashcard';
}

export default function PracticeSession({ mode }: PracticeSessionProps) {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [questionCount, setQuestionCount] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(10);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const limit = urlParams.get('limit');
    if (limit) setMaxQuestions(parseInt(limit));
    loadNextWord();
  }, []);

  const loadNextWord = async () => {
    setLoading(true);
    const now = new Date();
    const urlParams = new URLSearchParams(window.location.search);
    const lessonIdParam = urlParams.get('lessonId');
    const unitParam = urlParams.get('unit');
    const catParam = urlParams.get('cat');

    let wordsPool: Word[] = [];

    if (lessonIdParam) {
      wordsPool = await db.words.where('lessonId').equals(parseInt(lessonIdParam)).toArray();
    } else if (unitParam) {
      wordsPool = await db.words.where('unit').equals(unitParam).toArray();
    } else if (catParam) {
      wordsPool = await db.words.where('category').equals(catParam).toArray();
    } else {
      wordsPool = await db.words.toArray();
    }

    const idsParam = urlParams.get('ids');
    if (idsParam) {
      const ids = idsParam.split(',').map(Number);
      wordsPool = wordsPool.filter(w => w.id && ids.includes(w.id));
    }

    if (wordsPool.length === 0) {
      wordsPool = await db.words.limit(50).toArray();
    }

    if (wordsPool.length === 0) {
      setCurrentWord(null);
      setLoading(false);
      return;
    }

    const progressList = await db.progress.toArray();
    const studiedIds = new Set(progressList.map(p => p.word_id));
    const progressMap = new Map(progressList.map(p => [p.word_id, p]));

    const dueWords = wordsPool.filter(w => {
      const p = progressMap.get(w.id!);
      return p && p.next_review <= now;
    });

    let targetWord: Word | undefined;
    if (dueWords.length > 0) {
      targetWord = dueWords[Math.floor(Math.random() * dueWords.length)];
    } else {
      const unstudied = wordsPool.filter(w => w.id && !studiedIds.has(w.id));
      if (unstudied.length > 0) {
        targetWord = unstudied[Math.floor(Math.random() * unstudied.length)];
      } else {
        targetWord = wordsPool[Math.floor(Math.random() * wordsPool.length)];
      }
    }

    setCurrentWord(targetWord || null);
    setUserInput('');
    setIsRevealed(false);
    setIsCorrect(null);
    setLoading(false);
  };

  const playAudio = () => {
    if (!currentWord) return;
    const utterance = new SpeechSynthesisUtterance(currentWord.reading);
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoices = voices.filter(v => v.lang.startsWith('ja'));
    const preferredVoice = japaneseVoices.find(v => v.name === 'Kyoko') || japaneseVoices.find(v => v.name.includes('Flo')) || japaneseVoices[0];
    utterance.voice = preferredVoice ?? null;
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (mode === 'audio' && currentWord && !isRevealed) {
      playAudio();
    }
  }, [currentWord, mode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (!isRevealed) handleSubmit();
        else handleSRSFeedback(2);
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRevealed, userInput, currentWord]);


  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentWord || isRevealed) return;

    let correct = false;
    const normalize = (str: string) => str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const input = normalize(userInput);

    if (mode === 'es-ja') {
      const isLetter = currentWord.category === 'letras';
      correct = isLetter 
        ? input === normalize(currentWord.kanji) 
        : (input === normalize(currentWord.kanji) || input === normalize(currentWord.reading));
    } else {
      correct = validateAnswer(userInput, currentWord.meanings);
    }

    setIsCorrect(correct);
    setIsRevealed(true);
    
    if (typeof window !== 'undefined') {
      const audio = new Audio(correct 
        ? 'https://www.myinstants.com/media/sounds/duolingo-correct.mp3' 
        : 'https://www.myinstants.com/media/sounds/duolingo-wrong.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  };

  const handleSRSFeedback = async (quality: number) => {
    if (!currentWord?.id) return;
    const prevProgress = await db.progress.get(currentWord.id);
    const nextProgress = calculateNextReview(quality, prevProgress);
    nextProgress.word_id = currentWord.id;
    await db.progress.put(nextProgress);

    const stats = await db.userStats.get('current');
    if (stats) {
      const xpGain = quality === 3 ? 15 : quality === 2 ? 10 : 5;
      stats.xp += xpGain;
      stats.last_active = new Date();
      await db.userStats.put(stats);
    }

    if (isCorrect) setCorrectCount(prev => prev + 1);

    const nextCount = questionCount + 1;
    setQuestionCount(nextCount);
    await new Promise(resolve => setTimeout(resolve, 450));
    
    if (nextCount < maxQuestions) {
      await loadNextWord();
    } else {
      setCurrentWord(null);
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-16 h-16 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>
      <p className="mt-4 font-black text-slate-300 dark:text-slate-400 uppercase tracking-widest">Cargando...</p>
    </div>
  );
  
  if (!currentWord && questionCount > 0) {
    const accuracy = Math.round((correctCount / maxQuestions) * 100);
    let messageGroup = performanceMessages.keepTrying;
    if (accuracy === 100) messageGroup = performanceMessages.perfect;
    else if (accuracy >= 90) messageGroup = performanceMessages.great;
    else if (accuracy >= 70) messageGroup = performanceMessages.good;

    const randomPhrase = messageGroup[Math.floor(Math.random() * messageGroup.length)];

    return (
      <CompletionCelebration 
        accuracy={accuracy}
        xp={correctCount * 10}
        message={randomPhrase}
        onHome={() => window.location.href = '/'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const renderPrompt = () => {
    if (!currentWord) return null;
    if (mode === 'audio') {
      return (
        <div className="flex flex-col items-center">
          <button onClick={playAudio} className="p-10 bg-sky-100 rounded-full text-sky-600 hover:bg-sky-200 transition-colors mb-8 btn-3d" style={{ '--border-color': 'var(--duo-blue-border)' } as any}>
            <Volume2 size={64} strokeWidth={2.5} />
          </button>
          <div className="text-slate-400 font-black uppercase text-sm tracking-widest mb-2">Escribe lo que escuchaste</div>
        </div>
      );
    }
    if (mode === 'image' && currentWord.image_url) {
      return (
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-sky-200 rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform"></div>
          <img src={currentWord.image_url} alt="Prompt" className="relative w-56 h-56 object-cover rounded-[2.5rem] shadow-xl border-4 border-white"/>
        </div>
      );
    }
    let promptContent = '';
    let promptLabel = '';
    if (mode === 'es-ja' || mode === 'audio') {
      const isLetter = currentWord.category === 'letras';
      promptContent = isLetter && mode === 'es-ja' ? currentWord.kanji : currentWord.meanings[0];
      if (mode === 'audio') promptLabel = 'Escribe lo que escuchaste en Japonés';
      else promptLabel = isLetter ? 'Escribe este símbolo' : 'Escribe en Japonés';
    } else {
      promptContent = currentWord.kanji;
      promptLabel = '¿Qué significa esto en español?';
    }
    return (
      <div className="mb-8">
        <div className="text-slate-400 font-black uppercase text-sm tracking-widest mb-2">{promptLabel}</div>
        <h1 className="text-7xl font-black mb-4 text-slate-800 dark:text-slate-100 tracking-tighter">{mode === 'audio' ? '' : promptContent}</h1>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-6 flex flex-col min-h-[600px]">
      <div className="flex items-center gap-6 mb-12">
        <a href="/" className="text-slate-300 dark:text-slate-400 hover:text-slate-500 transition-colors"><X size={32} strokeWidth={3} /></a>
        <div className="flex-1 h-5 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="relative h-full rounded-full"
            initial={false}
            animate={{ width: `${Math.min((questionCount / maxQuestions) * 100, 100)}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-linear-to-b from-green-400 via-green-500 to-green-600" />
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/25 rounded-full" />
            <div className="absolute inset-0 bg-green-400/30 blur-md" />
          </motion.div>
        </div>
        <div className="text-slate-400 font-black text-sm">{Math.min(questionCount + 1, maxQuestions)} / {maxQuestions}</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div key={currentWord?.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.25 }} className="w-full flex flex-col items-center">
            {renderPrompt()}
            {!isRevealed ? (
              <form onSubmit={handleSubmit} className="w-full mt-4 max-w-lg">
                <input type="text" autoFocus lang={mode === 'es-ja' ? 'ja' : 'es'} placeholder={mode === 'es-ja' ? 'Respuesta en japonés...' : 'Respuesta en español...'} className="w-full p-6 text-2xl border-2 border-slate-200 dark:border-slate-700 rounded-4xl focus:border-sky-400 outline-none transition-all bg-slate-50 dark:bg-slate-700/50 focus:bg-white dark:bg-slate-800 text-center font-bold placeholder:text-slate-300 dark:text-slate-400" value={userInput} onChange={(e) => setUserInput(e.target.value)} autoComplete="off"/>
                <button type="submit" disabled={!userInput.trim()} style={{ '--border-color': 'var(--duo-blue-border)' } as any} className={`mt-8 w-full p-6 rounded-4xl font-black text-xl uppercase tracking-widest transition-all btn-3d ${userInput.trim() ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-400 cursor-not-allowed border-slate-200 dark:border-slate-700'}`}>COMPROBAR</button>
              </form>
            ) : (
              <div className="w-full max-w-lg space-y-8 mt-4">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`p-8 rounded-[2.5rem] border-b-8 ${isCorrect ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'}`}>
                   <div className="flex items-center gap-4 mb-4 font-black text-3xl italic">{isCorrect ? <Check size={40} strokeWidth={4} /> : <X size={40} strokeWidth={4} />}{isCorrect ? '¡FANTÁSTICO!' : '¡UPS!'}</div>
                   <div className="text-left space-y-2">
                      <div className="text-sm font-black uppercase tracking-widest opacity-60">Respuesta correcta:</div>
                      <div className="text-3xl font-black">{currentWord.meanings.join(', ')}</div>
                      <div className="text-xl font-bold opacity-80">{currentWord.kanji} • {currentWord.reading}</div>
                   </div>
                </motion.div>
                <div className="flex flex-col gap-4">
                  <button onClick={() => handleSRSFeedback(isCorrect ? 2 : 0)} style={{ '--border-color': isCorrect ? 'var(--duo-green-border)' : 'var(--duo-blue-border)' } as any} className={`w-full p-6 rounded-4xl font-black text-xl uppercase tracking-widest transition-all btn-3d ${isCorrect ? 'bg-green-500 text-white' : 'bg-sky-500 text-white'}`}>SIGUIENTE</button>
                  <p className="text-slate-300 dark:text-slate-400 font-bold text-xs">PULSA ENTER PARA CONTINUAR</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
