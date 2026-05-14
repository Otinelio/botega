import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal, fadeInUp, staggerContainer } from '../hooks/useScrollReveal';
import { getGallery } from '../data/store';
import { Search, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export default function Gallery() {
  const { ref, controls } = useScrollReveal();
  const gallery = getGallery();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox(i => (i !== null ? (i - 1 + gallery.length) % gallery.length : null));
  const next = () => setLightbox(i => (i !== null ? (i + 1) % gallery.length : null));

  /* Masonry-like sizes */
  const sizeClasses = [
    'md:col-span-2 md:row-span-2',  // large hero
    '',                                // normal
    '',                                // normal
    'md:row-span-2',                   // portrait
    '',                                // normal
    '',                                // normal
    'md:col-span-2',                   // wide
  ];

  return (
    <section id="galerie" className="py-24 bg-earth-dark">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
        className="max-w-7xl mx-auto px-6"
      >
        <motion.div variants={fadeInUp} className="text-center mb-14">
          <span className="section-label !text-gold">Galerie</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gold mt-3">
            Notre Univers en Images
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]"
        >
          {gallery.map((img, i) => (
            <motion.div
              key={img.id}
              variants={fadeInUp}
              onClick={() => openLightbox(i)}
              className={`group relative rounded-xl overflow-hidden cursor-pointer ${sizeClasses[i % sizeClasses.length]}`}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-earth-dark/0 group-hover:bg-earth-dark/50 transition-colors duration-300 flex items-center justify-center">
                <Search className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={36} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-earth-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-text-light text-xs font-poppins">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div variants={fadeInUp} className="text-center mt-12">
          <a
            href="https://instagram.com/labodega_tg"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-3"
          >
            <Camera size={20} />
            Suivez-nous @labodega_tg →
          </a>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-white hover:text-gold transition-colors cursor-pointer">
              <X size={32} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-white hover:text-gold transition-colors cursor-pointer"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-white hover:text-gold transition-colors cursor-pointer"
            >
              <ChevronRight size={40} />
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={gallery[lightbox].url}
              alt={gallery[lightbox].caption}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={e => e.stopPropagation()}
            />
            <p className="absolute bottom-6 text-text-light font-poppins text-sm">{gallery[lightbox].caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
