import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, fadeInUp, staggerContainer } from '../hooks/useScrollReveal';
import { getInfo } from '../data/store';
import { Phone, MessageCircle, Send, Calendar, Clock, Users, User } from 'lucide-react';

export default function Reservation() {
  const { ref, controls } = useScrollReveal();
  const info = getInfo();

  const [form, setForm] = useState({
    name: '', date: '', time: '', guests: '2', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `🍕 *Réservation La Bodega*\n\n👤 ${form.name}\n📅 ${form.date}\n🕐 ${form.time}\n👥 ${form.guests} personnes\n📝 ${form.message || 'Aucune remarque'}\n\nMerci !`;
    window.open(`https://wa.me/${info.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section
      id="reservation"
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(224,122,95,0.85) 0%, rgba(44,24,16,0.92) 100%)' }}
      />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <motion.div variants={fadeInUp}>
          <p className="text-text-light/70 font-poppins text-sm mb-4 flex items-center justify-center gap-2">
            <Clock size={16} /> {info.hours}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Réservez votre table{' '}
            <span className="text-gold">dès maintenant</span>
          </h2>
          <p className="text-text-light/60 mb-8">{info.address}</p>
        </motion.div>

        {/* Quick CTAs */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href={`tel:${info.phone.replace(/\s/g, '')}`}
            className="btn-shimmer inline-flex items-center gap-3"
          >
            <Phone size={18} /> Appeler {info.phone}
          </a>
          <a
            href={`https://wa.me/${info.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-3"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-text-light/20" />
          <span className="font-poppins text-xs text-text-light/50 uppercase tracking-widest">ou remplissez le formulaire</span>
          <div className="flex-1 h-px bg-text-light/20" />
        </motion.div>

        {/* Form */}
        <motion.form
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="relative">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40" />
            <input
              type="text"
              placeholder="Prénom & Nom"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-earth-mid border border-text-light/20 text-text-light placeholder:text-text-light/40 font-sans focus:outline-none focus:border-terracotta transition-colors"
            />
          </div>
          <div className="relative">
            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40" />
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              required
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-earth-mid border border-text-light/20 text-text-light font-sans focus:outline-none focus:border-terracotta transition-colors"
            />
          </div>
          <div className="relative">
            <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40" />
            <input
              type="time"
              value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })}
              required
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-earth-mid border border-text-light/20 text-text-light font-sans focus:outline-none focus:border-terracotta transition-colors"
            />
          </div>
          <div className="relative">
            <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40" />
            <select
              value={form.guests}
              onChange={e => setForm({ ...form, guests: e.target.value })}
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-earth-mid border border-text-light/20 text-text-light font-sans focus:outline-none focus:border-terracotta transition-colors appearance-none"
            >
              {[1,2,3,4,5,6,7,8,10,12,15,20].map(n => (
                <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <textarea
              placeholder="Message / remarques spéciales..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-4 rounded-lg bg-earth-mid border border-text-light/20 text-text-light placeholder:text-text-light/40 font-sans focus:outline-none focus:border-terracotta transition-colors resize-none"
            />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="btn-shimmer w-full inline-flex items-center justify-center gap-3 !py-4">
              <Send size={18} /> Envoyer ma réservation
            </button>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}
