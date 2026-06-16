import { motion, AnimatePresence } from 'framer-motion';
import Mascot from './Mascot';
import { Home, RefreshCw, Trophy, Star, Zap } from 'lucide-react';

interface CompletionCelebrationProps {
  accuracy: number;
  xp: number;
  message: { text: string, subtext: string };
  onHome: () => void;
  onRetry: () => void;
}

export default function CompletionCelebration({ accuracy, xp, message, onHome, onRetry }: CompletionCelebrationProps) {
  const isExcellent = accuracy >= 90;
  const isGood = accuracy >= 70;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto px-6 py-8 min-h-screen flex items-center justify-center"
    >
      <motion.div 
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="w-full text-center py-12 px-8 bg-white rounded-[4rem] border-4 border-slate-100 shadow-2xl space-y-10 relative overflow-hidden"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-20" />
        
        <div className="space-y-6 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <Mascot mood={isGood ? 'dancing' : 'happy'} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <h2 className="text-5xl font-black text-slate-800 tracking-tight">{message.text}</h2>
            <p className="text-slate-400 font-bold text-xl">{message.subtext}</p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 relative z-10">
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-[3rem] border-2 border-green-100 hover:scale-105 transition-transform"
          >
            <div className="flex justify-center mb-3">
                <div className="p-3 bg-green-500 rounded-2xl text-white shadow-lg shadow-green-200">
                    <Trophy size={28} />
                </div>
            </div>
            <div className="text-4xl font-black text-green-600 mb-1">{accuracy}%</div>
            <div className="text-xs font-black text-green-700 uppercase tracking-[0.2em]">Precisión</div>
          </motion.div>

          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="group bg-gradient-to-br from-sky-50 to-indigo-50 p-8 rounded-[3rem] border-2 border-sky-100 hover:scale-105 transition-transform"
          >
            <div className="flex justify-center mb-3">
                <div className="p-3 bg-sky-500 rounded-2xl text-white shadow-lg shadow-sky-200">
                    <Zap size={28} fill="currentColor" />
                </div>
            </div>
            <div className="text-4xl font-black text-sky-600 mb-1">+{xp}</div>
            <div className="text-xs font-black text-sky-700 uppercase tracking-[0.2em]">Puntos XP</div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 pt-4 relative z-10">
          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={onHome}
            className="bg-sky-500 text-white py-6 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 btn-3d active:translate-y-1 shadow-xl"
            style={{'--border-color': 'var(--duo-blue-border)'} as any}
          >
            <Home size={28} strokeWidth={3} />
            CONTINUAR
          </motion.button>
          
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={onRetry}
            className="bg-white text-slate-400 py-4 rounded-[2rem] font-black text-lg hover:text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Repetir esta lección
          </motion.button>
        </div>

        {/* Floating Particles (CSS only for performance) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
            {[...Array(6)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute bg-sky-400 rounded-full blur-xl animate-pulse"
                    style={{
                        width: Math.random() * 100 + 50 + 'px',
                        height: Math.random() * 100 + 50 + 'px',
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        animationDelay: i * 0.5 + 's'
                    }}
                />
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
