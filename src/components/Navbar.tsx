import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, CalendarCheck } from 'lucide-react';
import logoBodega from '../assets/logo_bodega.png';

const NAV_LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Expériences', href: '#experiences' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Contact', href: '#reservation' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-earth-dark/95 backdrop-blur-[12px] shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoBodega} alt="La Bodega" className="h-24 w-auto -my-6 relative z-10" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative font-poppins text-sm font-medium text-text-light/80 hover:text-gold transition-colors group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+22899999956"
            className="hidden md:inline-flex btn-ghost !py-2.5 !px-4 !text-xs gap-2"
          >
            <Phone size={14} /> Appeler
          </a>
          <a
            href="/#reservation"
            className="hidden md:inline-flex btn-shimmer !py-2.5 !px-4 !text-xs gap-2"
          >
            <CalendarCheck size={14} /> Réserver
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-text-light p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-0 top-[72px] bg-earth-dark/98 backdrop-blur-lg transition-transform duration-400 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl text-text-light hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/#reservation"
              onClick={() => setMobileOpen(false)}
              className="btn-shimmer mt-4 flex items-center justify-center gap-2"
            >
              <CalendarCheck size={18} /> Réserver une table
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
