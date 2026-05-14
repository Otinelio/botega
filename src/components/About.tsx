import { motion } from 'framer-motion';
import { useScrollReveal, fadeInUp, staggerContainer } from '../hooks/useScrollReveal';
import { UtensilsCrossed, Wine, Gamepad2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const isNum = /^\d+$/.test(target);
          if (isNum) {
            const end = parseInt(target);
            let start = 0;
            const step = Math.ceil(end / 40);
            const timer = setInterval(() => {
              start += step;
              if (start >= end) {
                start = end;
                clearInterval(timer);
              }
              setDisplay(String(start));
            }, 30);
          } else {
            setDisplay(target);
          }
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-serif text-4xl md:text-5xl font-black text-terracotta">
      {display}{suffix}
    </span>
  );
}

export default function About() {
  const { ref, controls } = useScrollReveal();

  const pillars = [
    { icon: <UtensilsCrossed size={24} />, title: 'Pizzas & Grillades Artisanales', color: 'text-terracotta' },
    { icon: <Wine size={24} />, title: 'Cocktails & Lounge Bar', color: 'text-gold' },
    { icon: <Gamepad2 size={24} />, title: 'Mini-Golf & Projections Matchs', color: 'text-olive' },
  ];

  const stats = [
    { value: '10', suffix: 'h–00h', label: 'Horaires' },
    { value: '7', suffix: 'j/7', label: 'Ouvert' },
    { value: '50', suffix: '+', label: 'Plats' },
    { value: 'Mini-Golf', suffix: '', label: 'Loisirs' },
  ];

  return (
    <section id="about" className="py-24 bg-beige">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — Images */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80"
                alt="Intérieur La Bodega"
                className="w-full h-[500px] object-cover"
              />
              {/* Floating Badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <span className="font-poppins text-sm font-semibold text-earth-dark">
                  ⭐ Ouvert depuis 2020
                </span>
              </div>
            </div>
            {/* Secondary Image */}
            <motion.div
              variants={fadeInUp}
              className="absolute -bottom-8 -right-4 md:-right-8 w-40 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-beige"
            >
              <img
                src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&q=80"
                alt="Cocktail La Bodega"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right — Text */}
          <motion.div variants={fadeInUp}>
            <span className="section-label">Notre Histoire</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-earth-dark mt-3 mb-6 leading-tight">
              Un endroit où chaque moment devient souvenir
            </h2>
            <p className="text-text-dark/70 text-base leading-relaxed mb-8">
              La Bodega Lomé est bien plus qu'un restaurant. Niché au cœur du quartier Avenou sur la Rue Baka, 
              c'est un lieu de vie où se mêlent cuisine africaine raffinée, pizzas artisanales cuites au feu de bois, 
              cocktails créatifs et moments de convivialité. Notre terrasse accueillante, notre lounge bar intimiste 
              et notre mini-golf unique en font l'adresse incontournable de Lomé.
            </p>

            {/* Pillars */}
            <div className="space-y-4 mb-10">
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`${p.color} p-2 bg-beige-warm rounded-lg`}>{p.icon}</div>
                  <span className="font-poppins font-semibold text-earth-dark text-sm">{p.title}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <motion.div key={i} variants={fadeInUp} className="text-center">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                  <p className="font-poppins text-xs text-text-dark/50 mt-1 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="mt-10">
              <a href="#experiences" className="btn-ghost !border-terracotta !text-terracotta hover:!bg-terracotta hover:!text-white">
                Découvrir nos expériences →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
