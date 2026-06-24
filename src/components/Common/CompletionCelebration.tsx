import { motion } from 'framer-motion';
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center w-full min-h-[500px] px-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="w-full max-w-xl bg-white rounded-4xl sm:rounded-[3rem] p-6 sm:p-10 text-center shadow-sm border-2 border-slate-200 relative"
      >
        {/* Decorative Stars for excellent performance */}
        {isExcellent && (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 text-amber-400 opacity-80"><Star fill="currentColor" size={40} className="sm:w-12 sm:h-12 w-10 h-10" /></motion.div>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 text-amber-400 opacity-80"><Star fill="currentColor" size={28} className="sm:w-8 sm:h-8 w-7 h-7" /></motion.div>
          </>
        )}

        <div className="space-y-8 sm:space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 sm:space-y-3 pt-2 sm:pt-4"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
              {message.text}
            </h2>
            <p className="text-slate-400 font-bold text-lg sm:text-xl">{message.subtext}</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-green-50/50 p-4 sm:p-6 rounded-3xl sm:rounded-4xl border-2 border-green-100"
            >
              <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="p-2 sm:p-3 bg-green-500 rounded-xl sm:rounded-2xl text-white shadow-sm">
                      <Trophy size={24} className="sm:w-7 sm:h-7" />
                  </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-green-500 mb-1">{accuracy}%</div>
              <div className="text-[10px] sm:text-xs font-black text-green-600 uppercase tracking-[0.15em] sm:tracking-[0.2em]">Precisión</div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-sky-50/50 p-4 sm:p-6 rounded-3xl sm:rounded-4xl border-2 border-sky-100"
            >
              <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="p-2 sm:p-3 bg-sky-500 rounded-xl sm:rounded-2xl text-white shadow-sm">
                      <Zap size={24} className="sm:w-7 sm:h-7" fill="currentColor" />
                  </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-sky-500 mb-1">+{xp}</div>
              <div className="text-[10px] sm:text-xs font-black text-sky-600 uppercase tracking-[0.15em] sm:tracking-[0.2em]">Puntos XP</div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:gap-4 pt-2">
            <motion.button 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={onHome}
              className="w-full bg-sky-500 hover:bg-sky-400 text-white py-4 sm:py-6 rounded-3xl sm:rounded-4xl font-black text-xl sm:text-2xl flex items-center justify-center gap-3 sm:gap-4 transition-all btn-3d"
              style={{'--border-color': 'var(--duo-blue-border)'} as any}
            >
              <Home size={24} className="sm:w-7 sm:h-7" strokeWidth={3} />
              CONTINUAR
            </motion.button>
            
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              onClick={onRetry}
              className="w-full bg-transparent text-slate-400 py-3 sm:py-4 rounded-3xl sm:rounded-4xl font-black text-base sm:text-lg hover:text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} className="sm:w-5 sm:h-5" />
              Repetir esta lección
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
