import { useState, useEffect } from 'react';
import { getInfo, setInfo, type RestaurantInfo } from '../data/store';
import { Save, Check } from 'lucide-react';

export default function SettingsManager() {
  const [form, setForm] = useState<RestaurantInfo>(getInfo());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInfo(form);
    setSaved(true);
  };

  const fields: { key: keyof RestaurantInfo; label: string; type?: string; rows?: number }[] = [
    { key: 'name', label: 'Nom du restaurant' },
    { key: 'slogan', label: 'Slogan' },
    { key: 'address', label: 'Adresse' },
    { key: 'phone', label: 'Téléphone' },
    { key: 'whatsapp', label: 'WhatsApp (numéro sans +)' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'hours', label: 'Horaires' },
    { key: 'description', label: 'Description', rows: 3 },
    { key: 'adminPassword', label: 'Mot de passe admin', type: 'password' },
  ];

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        {fields.map(f => (
          <div key={f.key}>
            <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-1.5 tracking-wider">{f.label}</label>
            {f.rows ? (
              <textarea
                value={form[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                rows={f.rows}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta transition-colors resize-none"
              />
            ) : (
              <input
                type={f.type || 'text'}
                value={form[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta transition-colors"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className={`btn-shimmer inline-flex items-center gap-2 !py-3 ${saved ? '!bg-olive' : ''}`}
        >
          {saved ? <><Check size={18} /> Enregistré !</> : <><Save size={18} /> Enregistrer</>}
        </button>
      </form>
    </div>
  );
}
