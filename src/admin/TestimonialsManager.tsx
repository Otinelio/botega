import { useState, useEffect } from 'react';
import { getTestimonials, setTestimonials, uid, type Testimonial } from '../data/store';
import { Plus, Pencil, Trash2, X, Eye, EyeOff, Star } from 'lucide-react';

export default function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>(getTestimonials());
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ name: '', text: '', rating: 5, location: '', visible: true });

  useEffect(() => { setTestimonials(items); }, [items]);

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', text: '', rating: 5, location: '', visible: true });
    setShowModal(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ name: t.name, text: t.text, rating: t.rating, location: t.location, visible: t.visible });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) return;
    if (editing) {
      setItems(prev => prev.map(t => t.id === editing.id ? { ...t, ...form } : t));
    } else {
      setItems(prev => [...prev, { id: uid(), ...form }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Supprimer ce témoignage ?')) {
      setItems(prev => prev.filter(t => t.id !== id));
    }
  };

  const toggleVisible = (id: string) => {
    setItems(prev => prev.map(t => t.id === id ? { ...t, visible: !t.visible } : t));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-dark/50">{items.length} témoignage(s)</p>
        <button onClick={openNew} className="btn-shimmer inline-flex items-center gap-2 !py-2.5 !px-5 !text-xs">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {items.map(t => (
          <div key={t.id} className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 ${!t.visible ? 'opacity-50' : ''}`}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center shrink-0">
                <span className="font-serif font-bold text-terracotta">{t.name[0]}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-poppins font-semibold text-sm text-earth-dark">{t.name}</span>
                  <span className="text-xs text-text-dark/40">• {t.location}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < t.rating ? 'fill-gold text-gold' : 'text-gray-300'} />
                  ))}
                </div>
                <p className="text-sm text-text-dark/70 italic">"{t.text}"</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => toggleVisible(t.id)} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                  {t.visible ? <Eye size={16} className="text-olive" /> : <EyeOff size={16} className="text-gray-400" />}
                </button>
                <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <Pencil size={16} className="text-night" />
                </button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 cursor-pointer">
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-earth-dark">
                {editing ? 'Modifier' : 'Nouveau témoignage'}
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
                  required className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta"
                />
              </div>
              <div>
                <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-1">Texte *</label>
                <textarea
                  value={form.text} onChange={e => setForm({ ...form, text: e.target.value })}
                  required rows={3} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-1">Note</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n} type="button" onClick={() => setForm({ ...form, rating: n })}
                        className="cursor-pointer"
                      >
                        <Star size={20} className={n <= form.rating ? 'fill-gold text-gold' : 'text-gray-300'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-1">Lieu</label>
                  <input
                    type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={form.visible} onChange={e => setForm({ ...form, visible: e.target.checked })} className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-olive after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                </label>
                <span className="font-poppins text-sm text-text-dark/70">Afficher sur le site</span>
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
