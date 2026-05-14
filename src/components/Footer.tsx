import { getInfo } from '../data/store';
import { MapPin, Phone, Clock, MessageCircle, Camera } from 'lucide-react';

export default function Footer() {
  const info = getInfo();

  return (
    <footer className="bg-footer text-text-light/70">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1 — Identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🍕</span>
              <span className="font-serif text-2xl font-bold text-gold">{info.name}</span>
            </div>
            <p className="font-poppins text-xs text-text-light/40 uppercase tracking-wider mb-3">
              Restaurant · Pizzeria · Lounge
            </p>
            <p className="font-script text-xl text-gold/60 mb-4">{info.slogan}</p>
            <a
              href="https://instagram.com/labodega_tg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-light/50 hover:text-gold transition-colors"
            >
              <Camera size={16} /> {info.instagram}
            </a>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4 className="font-poppins font-semibold text-sm text-text-light uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {['Accueil', 'Menu', 'Expériences', 'Galerie', 'Réservation', 'Contact'].map(link => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                    className="text-sm hover:text-gold transition-colors hover:pl-2 transition-all duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Info */}
          <div>
            <h4 className="font-poppins font-semibold text-sm text-text-light uppercase tracking-wider mb-6">
              Informations
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-terracotta mt-0.5 shrink-0" />
                {info.address}
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-terracotta shrink-0" />
                <a href={`tel:${info.phone.replace(/\s/g, '')}`} className="hover:text-gold transition-colors">
                  {info.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Clock size={16} className="text-terracotta shrink-0" />
                Lundi–Dimanche · 10h00–00h00
              </li>
              <li className="flex items-center gap-3 text-sm">
                <MessageCircle size={16} className="text-terracotta shrink-0" />
                <a
                  href={`https://wa.me/${info.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 — Map */}
          <div>
            <h4 className="font-poppins font-semibold text-sm text-text-light uppercase tracking-wider mb-6">
              Nous trouver
            </h4>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="La Bodega Lomé"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7!2d1.22!3d6.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnMTIuMCJOIDHCsDEzJzEyLjAiRQ!5e0!3m2!1sfr!2stg!4v1"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.google.com/?q=La+Bodega+Lome+Avenou"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-gold/70 hover:text-gold transition-colors"
            >
              Voir l'itinéraire →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-text-light/10 py-6">
        <p className="text-center text-xs text-text-light/30 font-poppins">
          © 2026 La Bodega Lomé — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
