import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, fadeInUp, staggerContainer } from '../hooks/useScrollReveal';
import { getTestimonials } from '../data/store';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const { ref, controls } = useScrollReveal();
  const testimonials = getTestimonials().filter(t => t.visible);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-beige">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
        className="max-w-6xl mx-auto px-6"
      >
        <motion.div variants={fadeInUp} className="text-center mb-14">
          <span className="section-label">Témoignages</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-earth-dark mt-3 mb-4">
            Ce que disent nos clients
          </h2>
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-gold text-gold" />
            ))}
            <span className="font-poppins text-sm text-text-dark/60 ml-2">4.8/5 · Plus de 200 avis</span>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          variants={fadeInUp}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Desktop: show 3 */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`p-8 rounded-2xl bg-beige-warm border-l-4 border-gold shadow-sm transition-all duration-300 ${
                  i === current ? 'scale-105 shadow-lg' : 'opacity-80'
                }`}
              >
                <Quote size={32} className="text-gold/40 mb-4" />
                <p className="font-cormorant text-lg italic text-text-dark leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-terracotta/20 rounded-full flex items-center justify-center">
                    <span className="font-serif font-bold text-terracotta text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-sm text-earth-dark">{t.name}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} size={12} className="fill-gold text-gold" />
                      ))}
                      <span className="text-xs text-text-dark/40 ml-1">{t.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: show 1 */}
          <div className="md:hidden">
            <div className="p-8 rounded-2xl bg-beige-warm border-l-4 border-gold shadow-sm">
              <Quote size={32} className="text-gold/40 mb-4" />
              <p className="font-cormorant text-lg italic text-text-dark leading-relaxed mb-6">
                "{testimonials[current].text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-terracotta/20 rounded-full flex items-center justify-center">
                  <span className="font-serif font-bold text-terracotta text-sm">
                    {testimonials[current].name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-poppins font-semibold text-sm text-earth-dark">{testimonials[current].name}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonials[current].rating)].map((_, j) => (
                      <Star key={j} size={12} className="fill-gold text-gold" />
                    ))}
                    <span className="text-xs text-text-dark/40 ml-1">{testimonials[current].location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="p-2 rounded-full bg-terracotta/10 text-terracotta hover:bg-terracotta hover:text-white transition-all cursor-pointer">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    i === current ? 'bg-terracotta scale-125' : 'bg-terracotta/30'
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-full bg-terracotta/10 text-terracotta hover:bg-terracotta hover:text-white transition-all cursor-pointer">
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
