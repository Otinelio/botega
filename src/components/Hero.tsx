import { motion } from 'framer-motion';
import { ChevronDown, Phone, CalendarCheck } from 'lucide-react';
import accueil from '../assets/acceuil.jpg';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${accueil})`,
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(44,24,16,0.88) 0%, rgba(30,58,95,0.45) 100%)',
        }}
      />

      {/* Floating Gold Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-gold"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            opacity: 0.12,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl pt-24">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-poppins text-gold text-sm tracking-[0.3em] font-medium mb-6 uppercase"
        >
          Restaurant · Pizzeria · Lounge
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl lg:text-[88px] font-black text-white leading-[1.1] mb-6"
        >
          Vos journées s'adoucissent,{' '}
          <span className="text-gold">vos soirées s'illuminent</span>
        </motion.h1>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-sans text-text-light/70 text-base mb-10"
        >
          Rue Baka · Quartier Avenou · Lomé
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="tel:+22899999956" className="btn-shimmer inline-flex items-center gap-2">
            <Phone size={18} /> Appeler
          </a>
          <a href="#reservation" className="btn-ghost inline-flex items-center gap-2 !border-terracotta !text-terracotta hover:!bg-terracotta hover:!text-white">
            <CalendarCheck size={18} /> Réserver
          </a>
          <a href="/menu" className="btn-ghost inline-flex items-center gap-2">
            Voir le menu
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="text-gold" size={32} />
      </motion.div>
    </section>
  );
}
