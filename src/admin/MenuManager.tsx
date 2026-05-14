import { useState, useEffect } from 'react';
import { getMenu, setMenu, getCategories, uid, type MenuItem } from '../data/store';
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react';

const EMPTY_ITEM: Omit<MenuItem, 'id'> = {
  name: '', description: '', price: 0, category: '', badges: [], available: true, image: '',
};

const BADGE_OPTIONS = ['signature', 'populaire', 'nouveau', 'végétarien'];

export default function MenuManager() {
  const [items, setItems] = useState<MenuItem[]>(getMenu());
  const categories = getCategories();
  const [activeTab, setActiveTab] = useState('Tout');
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Omit<MenuItem, 'id'>>(EMPTY_ITEM);

  useEffect(() => { setMenu(items); }, [items]);

  const filtered = activeTab === 'Tout' ? items : items.filter(i => i.category === activeTab);

  const openNew = () => {
    setEditing(null);
    setForm({ ...EMPTY_ITEM, category: categories[0]?.name || '' });
    setShowModal(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setForm({ name: item.name, description: item.description, price: item.price, category: item.category, badges: [...item.badges], available: item.available, image: item.image });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || form.price <= 0) return;
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form } : i));
    } else {
      setItems(prev => [...prev, { id: uid(), ...form }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Supprimer ce plat ?')) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const toggleAvailable = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, available: !i.available } : i));
  };

  const toggleBadge = (badge: string) => {
    setForm(prev => ({
      ...prev,
      badges: prev.badges.includes(badge) ? prev.badges.filter(b => b !== badge) : [...prev.badges, badge],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('Tout')}
            className={`px-4 py-2 rounded-lg text-sm font-poppins cursor-pointer ${activeTab === 'Tout' ? 'bg-terracotta text-white' : 'bg-white text-text-dark'}`}
          >
            Tout ({items.length})
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.name)}
              className={`px-4 py-2 rounded-lg text-sm font-poppins cursor-pointer ${activeTab === c.name ? 'bg-terracotta text-white' : 'bg-white text-text-dark'}`}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
        <button onClick={openNew} className="btn-shimmer inline-flex items-center gap-2 !py-2.5 !px-5 !text-xs">
          <Plus size={16} /> Ajouter un plat
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-admin-bg border-b border-gray-200">
                <th className="text-left px-4 py-3 font-poppins text-xs text-text-dark/50 uppercase">Photo</th>
                <th className="text-left px-4 py-3 font-poppins text-xs text-text-dark/50 uppercase">Nom</th>
                <th className="text-left px-4 py-3 font-poppins text-xs text-text-dark/50 uppercase hidden md:table-cell">Catégorie</th>
                <th className="text-left px-4 py-3 font-poppins text-xs text-text-dark/50 uppercase">Prix</th>
                <th className="text-left px-4 py-3 font-poppins text-xs text-text-dark/50 uppercase hidden md:table-cell">Badges</th>
                <th className="text-right px-4 py-3 font-poppins text-xs text-text-dark/50 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className={`border-b border-gray-100 hover:bg-admin-bg/50 transition-colors ${!item.available ? 'opacity-50' : ''}`}>
                  <td className="px-4 py-3">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-lg">🍕</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-sm text-earth-dark">{item.name}</p>
                    <p className="text-xs text-text-dark/40 line-clamp-1">{item.description}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-sm text-text-dark/60">{item.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-poppins font-semibold text-sm text-terracotta">{item.price.toLocaleString('fr-FR')} XOF</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {item.badges.map(b => (
                        <span key={b} className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">{b}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleAvailable(item.id)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" title={item.available ? 'Masquer' : 'Afficher'}>
                        {item.available ? <Eye size={16} className="text-olive" /> : <EyeOff size={16} className="text-gray-400" />}
                      </button>
                      <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <Pencil size={16} className="text-night" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-earth-dark">
                {editing ? 'Modifier le plat' : 'Nouveau plat'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-1">Nom *</label>
                <input
                  type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  required className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta transition-colors"
                />
              </div>
              <div>
                <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-1">Description</label>
                <textarea
                  value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={2} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta transition-colors resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-1">Prix (XOF) *</label>
                  <input
                    type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                    required min={0} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-1">Catégorie</label>
                  <select
                    value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta transition-colors"
                  >
                    {categories.map(c => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-1">URL Photo</label>
                <input
                  type="url" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta transition-colors"
                />
              </div>
              <div>
                <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-2">Badges</label>
                <div className="flex flex-wrap gap-2">
                  {BADGE_OPTIONS.map(b => (
                    <button
                      key={b} type="button" onClick={() => toggleBadge(b)}
                      className={`px-3 py-1.5 rounded-full text-xs font-poppins cursor-pointer transition-all ${
                        form.badges.includes(b) ? 'bg-terracotta text-white' : 'bg-gray-100 text-text-dark/60 hover:bg-gray-200'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox" checked={form.available} onChange={e => setForm({ ...form, available: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-olive transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                </label>
                <span className="font-poppins text-sm text-text-dark/70">Disponible</span>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-text-dark/60 font-poppins text-sm hover:bg-gray-50 cursor-pointer">
                  Annuler
                </button>
                <button type="submit" className="flex-1 btn-shimmer !py-2.5 !text-sm">
                  {editing ? 'Mettre à jour' : 'Créer le plat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
