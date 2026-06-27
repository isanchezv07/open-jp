import { useEffect, useState } from 'react';
import { db, type Word, type Progress, type UserStats } from '@/lib/db/index';
import { Trophy, Flame, BookOpen, Star, ChevronRight, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [learnedCount, setLearnedCount] = useState(0);
  const [dueCount, setDueCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const s = await db.userStats.get('current');
    setStats(s || null);

    const total = await db.words.count();
    setTotalCount(total);

    const progress = await db.progress.toArray();
    setLearnedCount(progress.length);
    
    const now = new Date();
    setDueCount(progress.filter(p => p.next_review <= now).length);
  };

  const [words, setWords] = useState<Word[]>([]);
  const [filter, setFilter] = useState({ jlpt: 0, category: '' });

  useEffect(() => {
    loadData();
    loadWords();
  }, [filter]);

  const loadWords = async () => {
    let results = [];
    if (filter.jlpt > 0) {
      results = await db.words.where('jlpt').equals(filter.jlpt).toArray();
    } else {
      results = await db.words.toArray();
    }

    if (filter.category) {
      results = results.filter(w => w.category === filter.category);
    }

    // Shuffle and limit to 50
    const shuffled = results.sort(() => Math.random() - 0.5);
    setWords(shuffled.slice(0, 50));
  };

  const categories = ['idiomas', 'naturaleza', 'animales', 'comida', 'escuela', 'familia', 'tiempo', 'números', 'adjetivos', 'verbos'];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* ... previous header and stats ... */}
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b-2 border-slate-100 dark:border-slate-700 pb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">¡Hola de nuevo! 👋</h1>
          <p className="text-slate-400 font-bold text-lg">Continuemos con tu aprendizaje de japonés.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-2xl font-black flex items-center gap-2 border-2 border-orange-200">
             <Flame size={20} fill="currentColor" /> {stats?.streak ?? 0}
           </div>
           <div className="bg-sky-100 text-sky-600 px-4 py-2 rounded-2xl font-black flex items-center gap-2 border-2 border-sky-200">
             <Star size={20} fill="currentColor" /> {stats?.xp ?? 0}
           </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-green-100 text-green-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
            <Trophy size={24} />
          </div>
          <div className="text-3xl font-black text-slate-800 dark:text-slate-100">{learnedCount}</div>
          <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">Aprendidas</div>
        </div>

        <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-sky-100 text-sky-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
            <BookOpen size={24} />
          </div>
          <div className="text-3xl font-black text-slate-800 dark:text-slate-100">{dueCount}</div>
          <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">Pendientes</div>
        </div>

        <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
            <Star size={24} />
          </div>
          <div className="text-3xl font-black text-slate-800 dark:text-slate-100">{Math.round((learnedCount / (totalCount || 1)) * 100)}%</div>
          <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">Progreso Total</div>
        </div>
      </div>

      {/* Practice Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
             <div className="w-2 h-8 bg-sky-500 rounded-full"></div>
             Unidades de Estudio
          </h2>
          {/* ... existing practice modes ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="/practice/ja-es" className="group bg-sky-500 p-8 rounded-[2.5rem] text-white transition-all btn-3d active:translate-y-1" style={{'--border-color': 'var(--duo-blue-border)'} as any}>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white/20 p-4 rounded-3xl">
                  <BookOpen size={32} />
                </div>
                <ChevronRight className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-black mb-1">Repaso General</h3>
              <p className="text-sky-100 font-bold opacity-80">Japonés → Español</p>
            </a>

            <a href="/practice/es-ja" className="group bg-green-500 p-8 rounded-[2.5rem] text-white transition-all btn-3d active:translate-y-1" style={{'--border-color': 'var(--duo-green-border)'} as any}>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white/20 p-4 rounded-3xl">
                  <Trophy size={32} />
                </div>
                <ChevronRight className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-black mb-1">Escritura Pro</h3>
              <p className="text-green-100 font-bold opacity-80">Escribe usando tu teclado japonés</p>
            </a>

            <a href="/practice/audio" className="group bg-purple-500 p-8 rounded-[2.5rem] text-white transition-all btn-3d active:translate-y-1" style={{'--border-color': '#7c3aed'} as any}>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white/20 p-4 rounded-3xl">
                  <Volume2 size={32} />
                </div>
                <ChevronRight className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-black mb-1">Escucha</h3>
              <p className="text-purple-100 font-bold opacity-80">Reconocimiento de audio</p>
            </a>

            <a href="/practice/image" className="group bg-pink-500 p-8 rounded-[2.5rem] text-white transition-all btn-3d active:translate-y-1" style={{'--border-color': '#db2777'} as any}>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white/20 p-4 rounded-3xl">
                  <Star size={32} />
                </div>
                <ChevronRight className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-black mb-1">Visual</h3>
              <p className="text-pink-100 font-bold opacity-80">Identificar por imágenes</p>
            </a>

            <a href="/practice/ja-es?cat=letras" className="group bg-orange-500 p-8 rounded-[2.5rem] text-white transition-all btn-3d active:translate-y-1 col-span-1 md:col-span-2" style={{'--border-color': 'var(--duo-orange-border)'} as any}>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white/20 p-4 rounded-3xl">
                  <Star size={32} fill="currentColor" />
                </div>
                <ChevronRight className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-black mb-1">Letras (Alfabeto)</h3>
              <p className="text-orange-100 font-bold opacity-80">Aprende Hiragana y Katakana</p>
            </a>
          </div>
        </div>

        {/* Sidebar / Progress */}
        <div className="space-y-8">
           <div className="bg-slate-50 dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-8">
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-6">Nivel JLPT N5</h3>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-sm font-black text-slate-500 uppercase tracking-widest mb-2">
                       <span>Completado</span>
                       <span>{learnedCount}/{totalCount}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-600 h-6 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${(learnedCount / (totalCount || 1)) * 100}%` }}
                         className="bg-green-500 h-full rounded-full"
                         style={{ boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.1)' }}
                       />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Explorer Section */}
      <div className="space-y-8 pt-12 border-t-2 border-slate-100 dark:border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
             <div className="w-2 h-10 bg-orange-500 rounded-full"></div>
             Explorar Vocabulario
          </h2>
          
          <div className="flex flex-wrap gap-2">
             <select 
               className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3 rounded-2xl font-bold text-slate-600 dark:text-slate-300 dark:text-slate-400 outline-none focus:border-orange-400"
               value={filter.jlpt}
               onChange={(e) => setFilter({...filter, jlpt: Number(e.target.value)})}
             >
               <option value={0}>Todos los niveles</option>
               <option value={5}>JLPT N5</option>
               <option value={4}>JLPT N4</option>
             </select>
             <select 
               className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3 rounded-2xl font-bold text-slate-600 dark:text-slate-300 dark:text-slate-400 outline-none focus:border-orange-400"
               value={filter.category}
               onChange={(e) => setFilter({...filter, category: e.target.value})}
             >
               <option value="">Todas las categorías</option>
               {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
             </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {words.map((word) => (
            <div key={word.id} className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-6 rounded-3xl hover:border-orange-300 transition-all flex justify-between items-center group">
              <div>
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{word.kanji}</div>
                <div className="text-slate-400 font-bold">{word.reading}</div>
                <div className="text-orange-500 font-black text-xs uppercase tracking-tighter mt-1">{word.meanings[0]}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-2xl group-hover:bg-orange-50 transition-colors">
                <Star size={20} className="text-slate-200 group-hover:text-orange-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
