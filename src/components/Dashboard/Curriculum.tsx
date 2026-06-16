import { useEffect, useState } from 'react';
import { db } from '../../lib/db';
import { 
  Book, Type, Feather, Layers, Languages, Hash, Calendar, 
  MessageCircle, Headphones, PieChart, ChevronRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

const UNITS = [
  { id: 'hiragana', title: 'Alfabeto Hiragana', icon: Type, color: 'bg-sky-500', unit: 'Hiragana' },
  { id: 'katakana', title: 'Alfabeto Katakana', icon: Feather, color: 'bg-pink-500', unit: 'Katakana' },
  { id: 'kanji', title: 'Kanji', icon: Layers, color: 'bg-purple-500', unit: 'Kanji' },
  { id: 'vocab', title: 'Vocabulario Básico', icon: Book, color: 'bg-green-500', unit: 'Vocabulario' },
  { id: 'verbos', title: 'Verbos', icon: Languages, color: 'bg-orange-500', unit: 'Verbos' },
  { id: 'numeros', title: 'Números', icon: Hash, color: 'bg-yellow-500', unit: 'Números' },
  { id: 'tiempo', title: 'Fechas y Horas', icon: Calendar, color: 'bg-red-500', unit: 'Tiempo' },
  { id: 'escucha', title: 'Comprensión Auditiva', icon: Headphones, color: 'bg-indigo-500', unit: 'Escucha' },
];

export default function Curriculum() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col gap-2 border-b-2 border-slate-100 pb-8">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Ruta de Aprendizaje</h1>
        <p className="text-slate-400 font-bold text-lg">Domina el japonés paso a paso.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {UNITS.map((u) => {
          return (
            <a 
              key={u.id} 
              href={`/unit/${u.unit}`}
              className="group bg-white border-2 border-slate-200 p-6 rounded-[2.5rem] hover:border-sky-400 transition-all btn-3d"
              style={{ '--border-color': 'var(--duo-blue-border)' } as any}
            >
              <div className="flex items-center gap-6">
                <div className={`${u.color} p-5 rounded-3xl text-white shadow-lg`}>
                  <u.icon size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-slate-800 mb-1">{u.title}</h3>
                </div>
                <ChevronRight className="text-slate-200 group-hover:text-sky-500 transition-colors" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
