import { motion } from 'framer-motion';

export default function Mascot({ mood = 'happy' }: { mood?: 'happy' | 'dancing' | 'excited' }) {
  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-sky-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      
      <motion.svg
        viewBox="0 0 200 200"
        className="relative w-full h-full drop-shadow-2xl"
        animate={mood === 'dancing' ? {
          y: [0, -20, 0],
          rotate: [-5, 5, -5],
          scale: [1, 1.05, 1]
        } : {
          y: [0, -10, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: mood === 'dancing' ? 0.8 : 2,
          ease: "easeInOut"
        }}
      >
        {/* Shadow */}
        <ellipse cx="100" cy="180" rx="40" ry="10" fill="rgba(0,0,0,0.1)" />

        {/* Body (Tori/Bird style) */}
        <motion.path
          d="M50 140 Q 50 40 100 40 Q 150 40 150 140 Q 150 170 100 170 Q 50 170 50 140"
          fill="#38bdf8"
          stroke="#0369a1"
          strokeWidth="4"
        />

        {/* Belly */}
        <path
          d="M70 140 Q 70 80 100 80 Q 130 80 130 140 Q 130 160 100 160 Q 70 160 70 140"
          fill="white"
          opacity="0.8"
        />

        {/* Eyes */}
        <g>
          <motion.circle 
            cx="80" cy="90" r="10" fill="#0f172a" 
            animate={mood === 'excited' ? { scaleY: [1, 0.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 3, times: [0, 0.05, 0.1] }}
          />
          <motion.circle 
            cx="120" cy="90" r="10" fill="#0f172a" 
            animate={mood === 'excited' ? { scaleY: [1, 0.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 3, times: [0, 0.05, 0.1] }}
          />
          {/* Eye shines */}
          <circle cx="83" cy="85" r="3" fill="white" />
          <circle cx="123" cy="85" r="3" fill="white" />
        </g>

        {/* Beak */}
        <path d="M95 105 L105 105 L100 115 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />

        {/* Wings */}
        <motion.path
          d="M50 110 Q 30 100 40 130"
          fill="none"
          stroke="#0369a1"
          strokeWidth="6"
          strokeLinecap="round"
          animate={mood === 'dancing' ? { rotate: [0, -30, 0] } : {}}
          style={{ originX: "50px", originY: "110px" }}
        />
        <motion.path
          d="M150 110 Q 170 100 160 130"
          fill="none"
          stroke="#0369a1"
          strokeWidth="6"
          strokeLinecap="round"
          animate={mood === 'dancing' ? { rotate: [0, 30, 0] } : {}}
          style={{ originX: "150px", originY: "110px" }}
        />

        {/* Feet */}
        <path d="M85 170 L80 185" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
        <path d="M115 170 L120 185" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
      </motion.svg>
      
      {/* Confetti (only if dancing/excited) */}
      {mood === 'dancing' && (
         <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
               <motion.div
                 key={i}
                 className="absolute w-2 h-2 rounded-sm"
                 style={{ 
                    backgroundColor: ['#38bdf8', '#fbbf24', '#f472b6', '#4ade80'][i % 4],
                    left: '50%',
                    top: '50%'
                 }}
                 initial={{ scale: 0, x: 0, y: 0 }}
                 animate={{ 
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 200,
                    y: (Math.random() - 0.5) * 200,
                    rotate: Math.random() * 360
                 }}
                 transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
               />
            ))}
         </div>
      )}
    </div>
  );
}
