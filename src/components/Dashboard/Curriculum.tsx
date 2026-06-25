import { useEffect, useState } from 'react';
import { db } from '../../lib/db/index';
import { 
  Book, Type, Feather, Layers, Languages, Hash, Calendar, 
  MessageCircle, Headphones, PieChart, ChevronRight, Star, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const UNITS = [
  { id: 'hiragana', title: 'Alfabeto Hiragana', icon: Type, color: '#0ea5e9', unit: 'Hiragana', description: 'Las bases de la escritura japonesa.' },
  { id: 'katakana', title: 'Alfabeto Katakana', icon: Feather, color: '#ec4899', unit: 'Katakana', description: 'Para palabras extranjeras y énfasis.' },
  { id: 'kanji', title: 'Kanji N5', icon: Layers, color: '#a855f7', unit: 'Kanji', description: 'Ideogramas fundamentales.' },
  { id: 'vocab', title: 'Vocabulario', icon: Book, color: '#22c55e', unit: 'Vocabulario', description: 'Palabras cotidianas esenciales.' },
  { id: 'verbos', title: 'Verbos', icon: Languages, color: '#f97316', unit: 'Verbos', description: 'Acciones y estados básicos.' },
  { id: 'numeros', title: 'Números', icon: Hash, color: '#eab308', unit: 'Números', description: 'Contar y medidas.' },
  { id: 'tiempo', title: 'Fechas y Horas', icon: Calendar, color: '#ef4444', unit: 'Tiempo', description: 'Días, meses y relojes.' },
  { id: 'sentences', title: 'Oraciones', icon: MessageCircle, color: '#14b8a6', unit: 'Oraciones', description: 'Estructura gramatical y orden.' },
  { id: 'escucha', title: 'Escucha', icon: Headphones, color: '#6366f1', unit: 'Escucha', description: 'Entrenamiento auditivo.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};

export default function Curriculum() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-linear-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-[3.5rem] p-12 border-2 border-slate-100 dark:border-slate-700 shadow-xl shadow-sky-100/20 dark:shadow-none"
        >
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left space-y-4">
                <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full text-sky-600 text-sm font-black uppercase tracking-widest">
                    <Zap size={14} fill="currentColor" /> Ruta de Aprendizaje
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none text-slate-800 dark:text-slate-100">
                    Domina el <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-500 to-indigo-500">Japonés</span>
                </h1>
                <p className="text-slate-500 font-bold text-xl max-w-xl">
                    Un viaje estructurado desde los alfabetos básicos hasta la comprensión de oraciones complejas.
                </p>
            </div>
            <div className="flex gap-4">
                <div className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 p-6 rounded-[2.5rem] text-center shadow-sm">
                    <div className="text-3xl font-black text-slate-800 dark:text-slate-100">9</div>
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Unidades</div>
                </div>
                <div className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 p-6 rounded-[2.5rem] text-center shadow-sm text-amber-400">
                    <Star size={32} fill="currentColor" className="mx-auto mb-1" />
                    <div className="text-xs font-black uppercase tracking-widest text-slate-400">Nivel N5</div>
                </div>
            </div>
        </div>
      </motion.div>

      {/* Units Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {UNITS.map((u) => {
          return (
            <motion.a 
              key={u.id} 
              href={`/unit/${u.unit}`}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { type: 'spring', stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.96 }}
              className="group relative bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 p-8 rounded-[3rem] shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                style={{ backgroundColor: u.color }}
              />
              
              <div className="relative z-10 flex flex-col h-full">
                <div 
                  className="w-20 h-20 rounded-4xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                  style={{ backgroundColor: u.color, boxShadow: `0 10px 25px -5px ${u.color}66` }}
                >
                  <u.icon size={40} strokeWidth={2.5} />
                </div>
                
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 group-hover:text-slate-900">
                    {u.title}
                  </h3>
                  <p className="text-slate-400 font-bold text-sm leading-relaxed group-hover:text-slate-500 transition-colors">
                    {u.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 dark:text-slate-400 group-hover:text-slate-500 transition-colors">
                        Explorar Unidad
                    </span>
                    <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-2"
                        style={{ color: u.color }}
                    >
                        <ChevronRight size={24} strokeWidth={3} />
                    </div>
                </div>
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
