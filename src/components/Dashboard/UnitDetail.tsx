import { useEffect, useState } from 'react';
import { db, type Word, type Lesson } from '../../lib/db';
import { BookOpen, Trophy, ArrowLeft, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface UnitDetailProps {
  unitId: string;
}

export default function UnitDetail({ unitId }: UnitDetailProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [wordsByLesson, setWordsByLesson] = useState<Record<number, Word[]>>({});
  const [stats, setStats] = useState({ total: 0, learned: 0 });
  const [questionLimit, setQuestionLimit] = useState(10);

  useEffect(() => {
    loadUnitData();
  }, [unitId]);

  const loadUnitData = async () => {
    const unitLessons = await db.lessons.where('unit').equals(unitId).sortBy('order');
    setLessons(unitLessons);
    
    const lessonIds = unitLessons.map(l => l.id!);
    const allWords = await db.words.where('lessonId').anyOf(lessonIds).toArray();
    
    const mapped: Record<number, Word[]> = {};
    for (const l of unitLessons) {
      mapped[l.id!] = allWords.filter(w => w.lessonId === l.id);
    }

    const wordIds = allWords.map(w => w.id!);
    const learnedCount = await db.progress.where('word_id').anyOf(wordIds).count();

    setWordsByLesson(mapped);
    setStats({ total: allWords.length, learned: learnedCount });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <div className="flex items-center gap-4">
        <a href="/" className="bg-slate-100 p-3 rounded-2xl text-slate-500 hover:bg-slate-200 transition-colors">
          <ArrowLeft size={24} />
        </a>
        <div className="flex-1">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">{unitId}</h1>
          <p className="text-slate-400 font-bold uppercase text-sm tracking-widest mt-1">
            {stats.learned} de {stats.total} palabras dominadas
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl">
          <label className="text-sm font-black text-slate-600 px-2">Preguntas:</label>
          <input 
            type="number" 
            min="1"
            value={questionLimit}
            onChange={(e) => setQuestionLimit(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 p-2 rounded-xl text-center font-bold border-2 border-slate-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {lessons.map((lesson) => (
            <section key={lesson.id} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-sky-500 rounded-full"></div>
                <h2 className="text-2xl font-black text-slate-800">{lesson.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href={`/practice/${unitId === 'Escucha' ? 'audio' : 'ja-es'}?lessonId=${lesson.id}&limit=${questionLimit}`}
                  className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] btn-3d flex justify-between items-center group hover:border-sky-400"
                >
                  <div className="space-y-1">
                    <div className="text-xl font-black text-slate-800">
                      {unitId === 'Escucha' ? 'Práctica Escucha' : 'Práctica Lectura'}
                    </div>
                    <div className="text-slate-400 font-bold text-sm">
                      {unitId === 'Escucha' ? 'Escucha → Japonés' : 'Kanji/Kana → Español'}
                    </div>
                  </div>
                  <div className="bg-sky-100 p-4 rounded-3xl text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <Play fill="currentColor" />
                  </div>
                </a>

                <a 
                  href={`/practice/es-ja?lessonId=${lesson.id}&limit=${questionLimit}`}
                  className="bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] btn-3d flex justify-between items-center group hover:border-green-400"
                >
                  <div className="space-y-1">
                    <div className="text-xl font-black text-slate-800">Práctica Escritura</div>
                    <div className="text-slate-400 font-bold text-sm">Español → Japonés</div>
                  </div>
                  <div className="bg-green-100 p-4 rounded-3xl text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all">
                    <BookOpen fill="currentColor" />
                  </div>
                </a>
              </div>

              <div className="bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] p-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {wordsByLesson[lesson.id!]?.map(w => (
                  <div key={w.id} className="bg-white p-3 rounded-2xl text-center border-2 border-slate-200 shadow-sm">
                    <div className="text-lg font-black text-slate-800 leading-tight">{w.kanji}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase truncate">{w.reading}</div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-orange-500 p-8 rounded-[2.5rem] text-white space-y-4 shadow-xl shadow-orange-100 relative overflow-hidden">
            <div className="relative z-10">
              <Trophy size={48} className="mb-4" />
              <h3 className="text-2xl font-black italic">Reto de la Unidad</h3>
              <p className="text-orange-100 font-bold">Completa todas las lecciones para obtener el trofeo de {unitId}.</p>
              <button className="mt-4 w-full bg-white text-orange-600 py-4 rounded-2xl font-black shadow-lg">
                EMPEZAR EXAMEN
              </button>
            </div>
            <Star className="absolute -right-8 -bottom-8 w-40 h-40 text-orange-600 opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
