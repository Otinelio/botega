import { useState, useEffect } from 'react';
import { getCategories, setCategories, uid, type Category } from '../data/store';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2, X, GripVertical } from 'lucide-react';
import CategoryIcon from '../components/CategoryIcon';

export default function CategoriesManager() {
  const [cats, setCats] = useState<Category[]>(getCategories());
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', icon: '🍽️' });

  useEffect(() => { setCategories(cats); }, [cats]);

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', icon: '🍽️' });
    setShowModal(true);
  };

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setForm({ name: cat.name, icon: cat.icon });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    
    let newCat: Category;
    if (editing) {
      newCat = { ...editing, name: form.name, icon: form.icon };
      setCats(prev => prev.map(c => c.id === editing.id ? newCat : c));
    } else {
      newCat = { id: uid(), name: form.name, icon: form.icon, order: cats.length + 1 };
      setCats(prev => [...prev, newCat]);
    }
    
    try {
      await supabase.from('categories').upsert({
        id: newCat.id,
        name: newCat.name,
        icon: newCat.icon,
        order: newCat.order
      });
    } catch (err) {
      console.error(err);
    }
    
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer cette catégorie ?')) {
      setCats(prev => prev.filter(c => c.id !== id));
      await supabase.from('categories').delete().eq('id', id);
    }
  };

  const updateOrderInSupabase = async (newCats: Category[]) => {
    try {
      const updates = newCats.map(c => ({
        id: c.id,
        name: c.name,
        icon: c.icon,
        order: c.order
      }));
      await supabase.from('categories').upsert(updates);
    } catch (err) {
      console.error(err);
    }
  };

  const moveUp = async (idx: number) => {
    if (idx === 0) return;
    const next = [...cats].sort((a, b) => a.order - b.order);
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    next.forEach((c, i) => c.order = i + 1);
    setCats(next);
    await updateOrderInSupabase(next);
  };

  const moveDown = async (idx: number) => {
    const next = [...cats].sort((a, b) => a.order - b.order);
    if (idx === next.length - 1) return;
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    next.forEach((c, i) => c.order = i + 1);
    setCats(next);
    await updateOrderInSupabase(next);
  };

  const EMOJI_SUGGESTIONS = ['🍕', '🔥', '🌍', '🍹', '🍮', '🥤', '🍗', '🥗', '🍣', '☕', '🧁', '🫕'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-dark/50">{cats.length} catégorie(s)</p>
        <button onClick={openNew} className="btn-shimmer inline-flex items-center gap-2 !py-2.5 !px-5 !text-xs">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {cats.sort((a, b) => a.order - b.order).map((cat, idx) => (
          <div key={cat.id} className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-admin-bg/50 transition-colors">
            <div className="flex flex-col gap-0.5">
              <button onClick={() => moveUp(idx)} className="text-text-dark/30 hover:text-text-dark cursor-pointer text-xs">▲</button>
              <GripVertical size={14} className="text-text-dark/20" />
              <button onClick={() => moveDown(idx)} className="text-text-dark/30 hover:text-text-dark cursor-pointer text-xs">▼</button>
            </div>
            <CategoryIcon name={cat.name} size={24} className="text-terracotta" />
            <span className="flex-1 font-poppins font-semibold text-sm text-earth-dark">{cat.name}</span>
            <span className="text-xs text-text-dark/40">#{cat.order}</span>
            <button onClick={() => openEdit(cat)} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
              <Pencil size={16} className="text-night" />
            </button>
            <button onClick={() => handleDelete(cat.id)} className="p-1.5 rounded-lg hover:bg-red-50 cursor-pointer">
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-earth-dark">
                {editing ? 'Modifier' : 'Nouvelle catégorie'}
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
                <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-2">Icône emoji</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {EMOJI_SUGGESTIONS.map(e => (
                    <button
                      key={e} type="button" onClick={() => setForm({ ...form, icon: e })}
                      className={`text-2xl p-2 rounded-lg cursor-pointer transition-all ${form.icon === e ? 'bg-terracotta/10 ring-2 ring-terracotta' : 'hover:bg-gray-100'}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
                <input
                  type="text" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta transition-colors text-center text-2xl"
                  maxLength={2}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-text-dark/60 font-poppins text-sm hover:bg-gray-50 cursor-pointer">
                  Annuler
                </button>
                <button type="submit" className="flex-1 btn-shimmer !py-2.5 !text-sm">
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
