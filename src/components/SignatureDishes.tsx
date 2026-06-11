import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal, fadeInUp, staggerContainer } from '../hooks/useScrollReveal';
import { getMenu } from '../data/store';
import { ShoppingCart } from 'lucide-react';
import CategoryIcon from './CategoryIcon';

function BadgeTag({ badge }: { badge: string }) {
  const cls: Record<string, string> = {
    signature: 'badge badge-signature',
    populaire: 'badge badge-populaire',
    nouveau: 'badge badge-nouveau',
    'végétarien': 'badge badge-vegetarien',
  };
  const labels: Record<string, string> = {
    signature: 'Signature',
    populaire: 'Populaire',
    nouveau: 'Nouveau',
    'végétarien': 'Végétarien',
  };
  return <span className={cls[badge] || 'badge badge-nouveau'}>{labels[badge] || badge}</span>;
}

export default function SignatureDishes() {
  const { ref, controls } = useScrollReveal();
  const menu = getMenu();

  const filtered = menu.filter(m => m.available).slice(0, 3);

  return (
    <section id="menu" className="py-24 bg-earth-dark">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
        className="max-w-7xl mx-auto px-6"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-14">
          <span className="section-label !text-gold">Carte Signature</span>
          <h2 className="font-serif text-4xl md:text-[56px] font-bold text-white mt-3 mb-4 leading-tight">
            Des saveurs qui racontent<br className="hidden md:block" /> l'Afrique & le Monde
          </h2>
          <p className="text-text-light/60 max-w-2xl mx-auto">
            Des recettes authentiques sublimées par notre chef, mêlant traditions africaines et inspirations internationales.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="group bg-card-dark rounded-2xl overflow-hidden border-t-[3px] border-terracotta shadow-lg hover:shadow-2xl hover:scale-[1.04] transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:saturate-[1.2] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-terracotta/0 group-hover:bg-terracotta/30 transition-colors duration-300 flex items-center justify-center">
                    <ShoppingCart className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                  </div>
                  {/* Badges */}
                  {item.badges.length > 0 && (
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.badges.map(b => <BadgeTag key={b} badge={b} />)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-text-light/50 text-sm leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-poppins text-xs text-text-light/40 uppercase flex items-center gap-1.5">
                      <CategoryIcon name={item.category} size={14} className="text-gold" /> {item.category}
                    </span>
                    <span className="font-poppins text-lg font-bold text-terracotta">
                      {item.price.toLocaleString('fr-FR')} XOF
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/22899999956?text=${encodeURIComponent(`Bonjour, je souhaite commander : ${item.name} (${item.price} XOF)`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 btn-shimmer !py-3 !text-xs"
                  >
                    Commander →
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View Full Menu Button */}
        <div className="text-center mt-12">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 btn-shimmer"
          >
            Voir toute la carte →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
