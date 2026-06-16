import { motion, AnimatePresence } from 'framer-motion';
import logoBodega from '../assets/logo_bodega.png';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-earth-dark flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle background patterns/shapes */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-terracotta blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gold blur-[100px]" />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center relative z-10"
          >
            {/* Logo container with pulsing glow */}
            <div className="relative mb-8">
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gold/20 rounded-full blur-2xl"
              />
              <img src={logoBodega} alt="La Bodega" className="h-32 md:h-40 w-auto object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] relative z-10" />
            </div>
            
            {/* Loading text with animated dots */}
            <div className="flex items-center gap-1 text-gold font-serif text-xl tracking-widest uppercase mb-6">
              <span className="font-medium">Chargement</span>
              <div className="flex gap-1 w-6">
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
                >.</motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1], delay: 0.2 }}
                >.</motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1], delay: 0.4 }}
                >.</motion.span>
              </div>
            </div>

            {/* Progress line */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gold to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
