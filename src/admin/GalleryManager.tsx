import { useState, useEffect } from 'react';
import { getGallery, setGallery, uid, type GalleryItem } from '../data/store';
import { Plus, Trash2, X } from 'lucide-react';

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>(getGallery());
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ url: '', caption: '' });

  useEffect(() => { setGallery(items); }, [items]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.url) return;
    setItems(prev => [...prev, { id: uid(), url: form.url, caption: form.caption }]);
    setShowModal(false);
    setForm({ url: '', caption: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Supprimer cette image ?')) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-dark/50">{items.length} image(s)</p>
        <button onClick={() => setShowModal(true)} className="btn-shimmer inline-flex items-center gap-2 !py-2.5 !px-5 !text-xs">
          <Plus size={16} /> Ajouter une image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(img => (
          <div key={img.id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src={img.url} alt={img.caption} className="w-full h-40 object-cover" />
            <div className="p-3">
              <p className="text-xs text-text-dark/60 line-clamp-1">{img.caption || 'Sans légende'}</p>
            </div>
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-earth-dark">Ajouter une image</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-1">URL de l'image *</label>
                <input
                  type="url" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })}
                  required className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta transition-colors"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-1">Légende</label>
                <input
                  type="text" value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta transition-colors"
                />
              </div>
              {form.url && (
                <img src={form.url} alt="Aperçu" className="w-full h-32 object-cover rounded-lg" />
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-text-dark/60 font-poppins text-sm hover:bg-gray-50 cursor-pointer">
                  Annuler
                </button>
                <button type="submit" className="flex-1 btn-shimmer !py-2.5 !text-sm">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
