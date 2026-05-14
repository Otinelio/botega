import { motion } from 'framer-motion';
import { useScrollReveal, fadeInUp, staggerContainer } from '../hooks/useScrollReveal';
import { Pizza, Wine, Target } from 'lucide-react';

const experiences = [
  {
    icon: <Pizza size={32} />,
    iconColor: 'text-terracotta',
    iconBg: 'bg-terracotta/10',
    title: 'Saveurs du Monde',
    description: 'Cuisines africaine et européenne fusionnées avec passion. Pizzas artisanales cuites au feu de bois, grillades au charbon, et plats signature qui éveillent vos papilles.',
    dark: false,
  },
  {
    icon: <Wine size={32} />,
    iconColor: 'text-gold',
    iconBg: 'bg-gold/10',
    title: 'Lounge & Cocktails',
    description: 'Un bar à cocktails d\'exception dans une ambiance lounge tamisée. Musique d\'ambiance soignée, lumières Edison, et des créations uniques de notre barman.',
    dark: true,
  },
  {
    icon: <Target size={32} />,
    iconColor: 'text-olive',
    iconBg: 'bg-olive/10',
    title: 'Mini-Golf & Sport',
    description: 'Défiez vos amis sur notre mini-golf nocturne sous les lanternes, ou vibrez ensemble devant les grands matchs sur écran géant.',
    dark: false,
  },
];

export default function Experiences() {
  const { ref, controls } = useScrollReveal();

  return (
    <section id="experiences" className="py-24 bg-beige-warm">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
        className="max-w-7xl mx-auto px-6"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="section-label">Nos Expériences</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-earth-dark mt-3">
            Bien plus qu'un restaurant
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className={`group relative p-8 rounded-2xl transition-all duration-400 cursor-pointer
                hover:-translate-y-2 hover:shadow-2xl ${
                exp.dark
                  ? 'bg-earth-mid text-text-light shadow-lg'
                  : 'bg-white text-text-dark shadow-md'
              }`}
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${exp.iconBg} ${exp.iconColor} group-hover:scale-110 transition-transform`}>
                {exp.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">{exp.title}</h3>
              <p className={`text-sm leading-relaxed ${exp.dark ? 'text-text-light/70' : 'text-text-dark/60'}`}>
                {exp.description}
              </p>
              {/* Hover line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-terracotta rounded-b-2xl group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
