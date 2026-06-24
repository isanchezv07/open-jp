import { useMemo, useState } from 'react';
import { lessons as allLessons, words as allWords } from '../../lib/data/index';
import { BookOpen, ArrowLeft, Play, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface UnitDetailProps {
  unitId: string;
}

export default function UnitDetail({ unitId }: UnitDetailProps) {
  const [questionLimit, setQuestionLimit] = useState(10);

  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const toggleSelection = (id: number) => {
    const next = new Set(selectedItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedItems(next);
  };

  const { unitLessons, wordsByLesson, stats } = useMemo(() => {
    const lessons = allLessons
      .filter((l) => l.unit === unitId)
      .sort((a, b) => a.order - b.order);

    const lessonIds = lessons.map((l) => l.id);

    const words = allWords.filter(
      (w) => w.unit === unitId && lessonIds.includes(w.lessonId)
    );

    const mapped: Record<number, typeof allWords> = {};
    for (const lesson of lessons) {
      mapped[lesson.id] = words.filter((w) => w.lessonId === lesson.id);
    }

    return {
      unitLessons: lessons,
      wordsByLesson: mapped,
      stats: { total: words.length },
    };
  }, [unitId]);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-sky-50">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-sm p-8"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
            <a
              href="/"
              className="w-16 h-16 rounded-3xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all text-slate-500"
            >
              <ArrowLeft size={28} />
            </a>

            <div className="flex-1">
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">
                Unidad: {unitId}
              </h1>
              <p className="text-slate-400 font-bold mt-1">
                {stats.total} palabras en esta unidad. Selecciona las que desees para practicar.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border-2 border-slate-200 p-4">
              <label className="block text-xs uppercase tracking-widest font-black text-slate-400 mb-2">
                Nº Preguntas
              </label>
              <input
                type="number"
                min="1"
                value={questionLimit}
                onChange={(e) => setQuestionLimit(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 rounded-xl border-2 border-slate-200 p-2 text-center font-black text-slate-700 outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[2.5rem] p-8 border-2 border-slate-200 shadow-sm flex items-center gap-6">
            <div className="p-5 bg-sky-100 text-sky-600 rounded-3xl">
              <BookOpen size={32} />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800">{stats.total}</div>
              <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">Palabras totales</div>
            </div>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 border-2 border-slate-200 shadow-sm flex items-center gap-6">
            <div className="p-5 bg-amber-100 text-amber-600 rounded-3xl">
              <Trophy size={32} />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800">{unitLessons.length}</div>
              <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">Lecciones</div>
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="space-y-10">
          {unitLessons.map((lesson, index) => {
            const lessonWords = wordsByLesson[lesson.id] || [];
            const selectedInLesson = lessonWords.filter(w => selectedItems.has(w.id!)).map(w => w.id);
            const queryIds = selectedInLesson.length > 0 ? `&ids=${selectedInLesson.join(',')}` : '';

            return (
              <motion.section
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-sm p-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-2 h-10 rounded-full bg-sky-500" />
                  <h2 className="text-3xl font-black text-slate-800">
                    {lesson.title}
                  </h2>
                  {selectedInLesson.length > 0 && (
                    <span className="bg-sky-100 text-sky-600 px-4 py-1 rounded-full text-sm font-black">
                      {selectedInLesson.length} seleccionadas
                    </span>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  <a
                    href={`/practice/${unitId === 'Escucha' ? 'audio' : 'ja-es'}?lessonId=${lesson.id}&limit=${questionLimit}${queryIds}`}
                    className="group bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-sky-400 rounded-4xl p-6 flex justify-between items-center transition-all btn-3d"
                    style={{ '--border-color': 'var(--duo-blue-border)' } as any}
                  >
                    <div className="text-left">
                      <h3 className="text-xl font-black text-slate-800">
                        {unitId === 'Escucha' ? 'Práctica Escucha' : 'Práctica Lectura'}
                      </h3>
                      <p className="text-slate-400 font-bold text-sm">
                        {unitId === 'Escucha' ? 'Escucha → Japonés' : 'Kanji/Kana → Español'}
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all">
                      <Play fill="currentColor" size={24} />
                    </div>
                  </a>

                  <a
                    href={`/practice/es-ja?lessonId=${lesson.id}&limit=${questionLimit}${queryIds}`}
                    className="group bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-green-400 rounded-4xl p-6 flex justify-between items-center transition-all btn-3d"
                    style={{ '--border-color': 'var(--duo-green-border)' } as any}
                  >
                    <div className="text-left">
                      <h3 className="text-xl font-black text-slate-800">Práctica Escritura</h3>
                      <p className="text-slate-400 font-bold text-sm">Español → Japonés</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all">
                      <BookOpen size={24} />
                    </div>
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {lessonWords.map((word) => {
                    const isSelected = word.id ? selectedItems.has(word.id) : false;
                    return (
                      <motion.div
                        key={word.id}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => word.id && toggleSelection(word.id)}
                        className={`cursor-pointer rounded-2xl p-4 text-center transition-all group flex flex-col justify-center border-2 ${
                          isSelected 
                            ? 'bg-sky-50 border-sky-400 shadow-md ring-2 ring-sky-400/20' 
                            : 'bg-linear-to-b from-white to-slate-50 border-slate-100 hover:border-sky-300 hover:shadow-md'
                        }`}
                      >
                        <div className={`text-xl font-black transition-colors leading-tight px-1 ${isSelected ? 'text-sky-700' : 'text-slate-800 group-hover:text-sky-600'}`}>
                          {word.meanings[0]}
                        </div>
                        <div className={`text-xs font-bold mt-2 uppercase tracking-widest px-1 ${isSelected ? 'text-sky-500' : 'text-slate-400'}`}>
                          {word.kanji}
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
