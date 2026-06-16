import { getMenu, getCategories, getInfo } from '../data/store';
import { Pizza, FolderOpen, Clock, Phone } from 'lucide-react';

export default function Dashboard() {
  const menu = getMenu();
  const categories = getCategories();
  const info = getInfo();

  const stats = [
    { icon: <Pizza size={24} />, label: 'Plats au menu', value: menu.length, color: 'bg-terracotta/10 text-terracotta' },
    { icon: <FolderOpen size={24} />, label: 'Catégories', value: categories.length, color: 'bg-gold/10 text-gold' },
    { icon: <Clock size={24} />, label: 'Horaires', value: '10h–00h', color: 'bg-olive/10 text-olive' },
    { icon: <Phone size={24} />, label: 'Téléphone', value: info.phone, color: 'bg-night/10 text-night' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${s.color}`}>
              {s.icon}
            </div>
            <p className="font-poppins text-xs text-text-dark/50 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="font-serif text-2xl font-bold text-earth-dark">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-serif text-lg font-bold text-earth-dark mb-4">Accès rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Ajouter un plat', href: '/admin/menu', color: 'hover:bg-terracotta hover:text-white text-terracotta bg-terracotta/5 border-terracotta/20' },
            { label: 'Gérer les catégories', href: '/admin/categories', color: 'hover:bg-gold hover:text-white text-gold bg-gold/5 border-gold/20' },
            { label: 'Ajouter à la galerie', href: '/admin/gallery', color: 'hover:bg-night hover:text-white text-night bg-night/5 border-night/20' },
            { label: 'Modifier les infos', href: '/admin/settings', color: 'hover:bg-olive hover:text-white text-olive bg-olive/5 border-olive/20' },
            { label: 'Gérer les témoignages', href: '/admin/testimonials', color: 'hover:bg-terracotta-deep hover:text-white text-terracotta-deep bg-terracotta-deep/5 border-terracotta-deep/20' },
            { label: 'Voir le site', href: '/', external: true, color: 'hover:bg-earth-dark hover:text-white text-earth-dark bg-earth-dark/5 border-earth-dark/20' },
          ].map((a, i) => (
            <a
              key={i}
              href={a.href}
              target={a.external ? '_blank' : undefined}
              className={`p-4 rounded-xl border transition-all text-sm font-poppins font-semibold text-center flex items-center justify-center min-h-[80px] shadow-sm hover:shadow-md ${a.color}`}
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
