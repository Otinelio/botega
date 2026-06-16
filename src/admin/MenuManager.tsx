import { useState, useEffect, useRef } from 'react';
import { getMenu, setMenu, getCategories, uid, type MenuItem } from '../data/store';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2, X, Eye, EyeOff, Upload, Image as ImageIcon } from 'lucide-react';

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
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMenu(items); }, [items]);

  const filtered = activeTab === 'Tout' ? items : items.filter(i => i.category === activeTab);

  const openNew = () => {
    setEditing(null);
    setForm({ ...EMPTY_ITEM, category: categories[0]?.name || '' });
    setFile(null);
    setShowModal(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setForm({ name: item.name, description: item.description, price: item.price, category: item.category, badges: [...item.badges], available: item.available, image: item.image });
    setFile(null);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || form.price <= 0) return;
    
    setUploading(true);
    let imageUrl = form.image;

    try {
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `menu/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('gallery')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      let newItem: MenuItem;
      if (editing) {
        newItem = { ...editing, ...form, image: imageUrl };
        setItems(prev => prev.map(i => i.id === editing.id ? newItem : i));
      } else {
        newItem = { id: uid(), ...form, image: imageUrl };
        setItems(prev => [...prev, newItem]);
      }
      
      const categoryObj = categories.find(c => c.name === newItem.category);
      await supabase.from('menu_items').upsert({
        id: newItem.id,
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
        category_id: categoryObj ? categoryObj.id : newItem.category,
        badges: newItem.badges,
        available: newItem.available,
        image_url: newItem.image,
      });

      setShowModal(false);
      setFile(null);
    } catch (err) {
      console.error("Erreur de sauvegarde Supabase:", err);
      alert("Erreur lors de la sauvegarde du plat.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer ce plat ?')) {
      setItems(prev => prev.filter(i => i.id !== id));
      await supabase.from('menu_items').delete().eq('id', id);
    }
  };

  const toggleAvailable = async (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const newStatus = !item.available;
    setItems(prev => prev.map(i => i.id === id ? { ...i, available: newStatus } : i));
    await supabase.from('menu_items').update({ available: newStatus }).eq('id', id);
  };

  const toggleBadge = (badge: string) => {
    setForm(prev => ({
      ...prev,
      badges: prev.badges.includes(badge) ? prev.badges.filter(b => b !== badge) : [...prev.badges, badge],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 hide-scrollbar flex-1">
          <button
            onClick={() => setActiveTab('Tout')}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-poppins cursor-pointer transition-colors shrink-0 ${activeTab === 'Tout' ? 'bg-terracotta text-white shadow-md shadow-terracotta/20' : 'bg-gray-50 text-text-dark hover:bg-gray-100'}`}
          >
            Tout ({items.length})
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.name)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-poppins cursor-pointer transition-colors shrink-0 ${activeTab === c.name ? 'bg-terracotta text-white shadow-md shadow-terracotta/20' : 'bg-gray-50 text-text-dark hover:bg-gray-100'}`}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
        <button onClick={openNew} className="btn-shimmer inline-flex items-center justify-center gap-2 !py-2.5 !px-5 !text-sm shrink-0 whitespace-nowrap shadow-md shadow-terracotta/20">
          <Plus size={18} /> Ajouter un plat
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-4 font-poppins text-xs font-semibold text-text-dark/60 uppercase tracking-wider w-20">Photo</th>
                <th className="px-5 py-4 font-poppins text-xs font-semibold text-text-dark/60 uppercase tracking-wider min-w-[200px]">Nom</th>
                <th className="px-5 py-4 font-poppins text-xs font-semibold text-text-dark/60 uppercase tracking-wider">Catégorie</th>
                <th className="px-5 py-4 font-poppins text-xs font-semibold text-text-dark/60 uppercase tracking-wider">Prix</th>
                <th className="px-5 py-4 font-poppins text-xs font-semibold text-text-dark/60 uppercase tracking-wider">Badges</th>
                <th className="px-5 py-4 font-poppins text-xs font-semibold text-text-dark/60 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(item => (
                <tr key={item.id} className={`hover:bg-gray-50/50 transition-colors ${!item.available ? 'opacity-50 grayscale-[0.5]' : ''}`}>
                  <td className="px-5 py-4">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shadow-sm border border-gray-100" />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-xl shadow-inner">
                        <ImageIcon size={20} className="text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-sm text-earth-dark mb-0.5">{item.name}</p>
                    <p className="text-xs text-text-dark/50 line-clamp-2 max-w-xs">{item.description}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-xs font-medium text-text-dark/70">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-poppins font-bold text-sm text-terracotta whitespace-nowrap">{item.price.toLocaleString('fr-FR')} XOF</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5 flex-wrap max-w-[150px]">
                      {item.badges.map(b => (
                        <span key={b} className="text-[10px] uppercase tracking-wider font-semibold bg-gold/10 text-gold px-2 py-0.5 rounded-full border border-gold/20">{b}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleAvailable(item.id)} className={`p-2 rounded-lg transition-colors cursor-pointer ${item.available ? 'hover:bg-olive/10 text-olive' : 'hover:bg-gray-200 text-gray-400'}`} title={item.available ? 'Désactiver' : 'Activer'}>
                        {item.available ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                      <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-gray-100 text-text-dark/60 hover:text-night transition-colors cursor-pointer" title="Modifier">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors cursor-pointer" title="Supprimer">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-text-dark/50 font-poppins text-sm">
                    Aucun plat trouvé dans cette catégorie.
                  </td>
                </tr>
              )}
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
                <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-2">Image (Uploadez ou entrez une URL)</label>
                
                <div 
                  className={`w-full px-4 py-6 rounded-xl border-2 border-dashed transition-all text-center cursor-pointer mb-3 relative overflow-hidden group ${file || form.image ? 'border-olive bg-olive/5' : 'border-gray-200 hover:border-terracotta hover:bg-terracotta/5'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  {file ? (
                    <div className="text-olive font-medium font-poppins text-sm flex flex-col items-center gap-2">
                      <img src={URL.createObjectURL(file)} alt="Aperçu" className="w-20 h-20 object-cover rounded-xl shadow-md" />
                      <span className="truncate max-w-full px-2">{file.name}</span>
                    </div>
                  ) : form.image ? (
                    <div className="text-olive font-medium font-poppins text-sm flex flex-col items-center gap-2">
                      <img src={form.image} alt="Actuelle" className="w-20 h-20 object-cover rounded-xl shadow-md" />
                      <span className="text-text-dark/60 text-xs">Image actuelle (cliquez pour remplacer)</span>
                    </div>
                  ) : (
                    <div className="text-text-dark/40 font-poppins text-sm flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-terracotta/10 group-hover:text-terracotta transition-colors">
                        <Upload size={24} />
                      </div>
                      <span>Cliquez pour sélectionner une photo depuis votre appareil</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-xs text-text-dark/40 font-poppins uppercase">ou</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <input
                  type="url" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                  placeholder="https://exemple.com/image.jpg"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta transition-colors text-sm"
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
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button type="button" disabled={uploading} onClick={() => { setShowModal(false); setFile(null); }} className="flex-1 py-3 rounded-lg border border-gray-200 text-text-dark/60 font-poppins font-medium text-sm hover:bg-gray-50 cursor-pointer transition-colors disabled:opacity-50">
                  Annuler
                </button>
                <button type="submit" disabled={uploading} className="flex-1 btn-shimmer !py-3 !text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {uploading ? 'Enregistrement...' : (editing ? 'Mettre à jour' : 'Créer le plat')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
