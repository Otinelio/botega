import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { isAdminAuth, setAdminAuth, getInfo } from '../data/store';
import {
  LayoutDashboard, Pizza, FolderOpen, Image, MessageSquare,
  Settings, LogOut, Menu, X, Lock
} from 'lucide-react';

const SIDEBAR_ITEMS = [
  { label: 'Tableau de bord', icon: <LayoutDashboard size={20} />, path: '/admin' },
  { label: 'Gérer le menu', icon: <Pizza size={20} />, path: '/admin/menu' },
  { label: 'Catégories', icon: <FolderOpen size={20} />, path: '/admin/categories' },
  { label: 'Galerie', icon: <Image size={20} />, path: '/admin/gallery' },
  { label: 'Témoignages', icon: <MessageSquare size={20} />, path: '/admin/testimonials' },
  { label: 'Infos restaurant', icon: <Settings size={20} />, path: '/admin/settings' },
];

function LoginModal({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const info = getInfo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === info.adminPassword) {
      setAdminAuth(true);
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-earth-dark/95 backdrop-blur-lg flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-night/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock size={28} className="text-night" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-earth-dark mb-2">Administration</h2>
        <p className="text-text-dark/50 text-sm mb-6">Veuillez entrer le mot de passe</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Mot de passe"
            autoFocus
            className={`w-full px-4 py-3 rounded-lg border-2 text-center font-poppins text-lg focus:outline-none transition-colors mb-4 ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-terracotta'
            }`}
          />
          {error && <p className="text-red-500 text-sm mb-3">Mot de passe incorrect</p>}
          <button type="submit" className="btn-shimmer w-full">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [authed, setAuthed] = useState(isAdminAuth());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setAuthed(isAdminAuth());
  }, []);

  const handleLogout = () => {
    setAdminAuth(false);
    setAuthed(false);
  };

  if (!authed) {
    return <LoginModal onAuth={() => setAuthed(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-admin-bg">
      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-night text-text-light z-50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-text-light/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍕</span>
            <span className="font-serif text-lg font-bold text-gold">La Bodega</span>
          </div>
          <p className="font-poppins text-xs text-text-light/40 mt-1">Administration</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {SIDEBAR_ITEMS.map(item => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-poppins transition-all cursor-pointer ${
                  active
                    ? 'bg-terracotta text-white font-semibold'
                    : 'text-text-light/70 hover:bg-terracotta/20 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-text-light/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-poppins text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-earth-dark cursor-pointer"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="font-serif text-xl font-bold text-earth-dark">
            {SIDEBAR_ITEMS.find(i => i.path === location.pathname)?.label || 'Administration'}
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
