import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Phone, CalendarCheck } from 'lucide-react';
import accueil from '../assets/acceuil.jpg';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      // Lomé is in UTC+0
      const now = new Date();
      const utcHours = now.getUTCHours();
      // Open between 10 AM (10h) and 12 AM (midnight)
      setIsOpen(utcHours >= 10 && utcHours < 24);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-earth-dark"
    >
      {/* Background with responsive attachment */}
      <div
        className="absolute inset-0 bg-cover bg-center select-none bg-scroll md:bg-fixed"
        style={{
          backgroundImage: `url(${accueil})`,
        }}
      />

      {/* Cinematic Vignette Overlay - Keeps text perfectly readable while displaying the gorgeous background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(44,24,16,0.65) 0%, rgba(26,14,9,0.92) 100%)',
        }}
      />

      {/* Floating Gold Particles (Slow Ambient Dust) */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-gold/20 z-10"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${15 + Math.random() * 70}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center pt-12 flex flex-col items-center justify-center h-full">
        {/* Live Opening Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full relative flex shrink-0">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </span>
          <span className="font-poppins text-[10px] md:text-xs font-semibold uppercase tracking-wider text-text-light/90">
            {isOpen ? 'Ouvert actuellement · Jusqu\'à minuit' : 'Fermé actuellement · Ouvre à 10h'}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-poppins text-gold text-[10px] md:text-xs tracking-[0.3em] font-semibold uppercase mb-4"
        >
          Restaurant · Pizzeria · Lounge Bar
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-4xl md:text-6xl lg:text-[64px] font-black text-white leading-[1.15] mb-6"
        >
          Vos journées <span className="text-gold">s'adoucissent</span>,<br />
          <span className="font-script text-5xl md:text-7xl lg:text-[72px] font-normal text-gold-light tracking-wide block mt-2 transform -rotate-1 drop-shadow-[0_2px_15px_rgba(212,175,55,0.35)] select-none">
            vos soirées s'illuminent
          </span>
        </motion.h1>

        {/* Description
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="font-sans text-text-light/80 text-xs md:text-sm lg:text-base leading-relaxed max-w-xl mb-8"
        >
          Une escale d'exception à Lomé alliant cuisine raffinée au feu de bois, mixologie créative et mini-golf nocturne dans un cadre chaleureux.
        </motion.p>
        */}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="#reservation" className="btn-shimmer inline-flex items-center gap-2 group">
            <CalendarCheck size={18} className="group-hover:scale-110 transition-transform" /> Réserver ma table
          </a>
          <a href="/menu" className="btn-ghost inline-flex items-center gap-2 group !border-white/20 !text-white hover:!border-gold hover:!text-gold">
            Explorer la carte
          </a>
          <a href="tel:+22899999956" className="inline-flex items-center gap-1.5 font-poppins text-xs md:text-sm font-semibold text-gold hover:text-gold-light transition-colors py-2 px-3">
            <Phone size={15} /> Nous appeler
          </a>
        </motion.div>
      </div>

      {/* Floating Bottom Highlights Bar - Desktop Only */}
      <div className="absolute bottom-0 left-0 w-full hidden md:block border-t border-white/5 bg-black/40 backdrop-blur-md py-5 z-20 select-none">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 gap-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <span className="text-xl group-hover:scale-125 transition-transform duration-300">🍕</span>
            <div>
              <h5 className="font-serif font-bold text-white text-xs group-hover:text-gold transition-colors">Cuisine & Pizzas</h5>
              <p className="text-[10px] text-text-light/50 font-poppins mt-0.5">Au feu de bois & grillades</p>
            </div>
          </div>
          <div className="flex items-center gap-3 group cursor-pointer">
            <span className="text-xl group-hover:scale-125 transition-transform duration-300">🍹</span>
            <div>
              <h5 className="font-serif font-bold text-white text-xs group-hover:text-gold transition-colors">Lounge Bar</h5>
              <p className="text-[10px] text-text-light/50 font-poppins mt-0.5">Mixologie & ambiance chic</p>
            </div>
          </div>
          <div className="flex items-center gap-3 group cursor-pointer">
            <span className="text-xl group-hover:scale-125 transition-transform duration-300">⛳</span>
            <div>
              <h5 className="font-serif font-bold text-white text-xs group-hover:text-gold transition-colors">Mini-Golf Nocturne</h5>
              <p className="text-[10px] text-text-light/50 font-poppins mt-0.5">Parcours sous les lanternes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 group cursor-pointer">
            <span className="text-xl group-hover:scale-125 transition-transform duration-300">⚽</span>
            <div>
              <h5 className="font-serif font-bold text-white text-xs group-hover:text-gold transition-colors">Matchs & Projections</h5>
              <p className="text-[10px] text-text-light/50 font-poppins mt-0.5">Écran géant sous les étoiles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Chevron for Mobile/Tablet */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 md:hidden"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <a href="#about">
          <ChevronDown className="text-gold" size={32} />
        </a>
      </motion.div>
    </section>
  );
}
