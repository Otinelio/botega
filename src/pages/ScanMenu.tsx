import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMenu, getCategories, getInfo, getTableNumber, setTableNumber } from '../data/store';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Plus, Minus, Trash2, X, Send, MessageCircle } from 'lucide-react';
import { CartProvider } from '../context/CartContext';

/* ── Table Modal ── */
function TableModal({ onConfirm }: { onConfirm: (n: string) => void }) {
  const [num, setNum] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(num);
    if (isNaN(n) || n < 1 || n > 50) {
      setError('Numéro invalide (1–50)');
      return;
    }
    setTableNumber(String(n));
    onConfirm(String(n));
  };

  return (
    <div className="fixed inset-0 z-[200] bg-earth-dark/95 backdrop-blur-lg flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center"
      >
        <span className="text-5xl block mb-4">🍕</span>
        <h2 className="font-serif text-2xl font-bold text-earth-dark mb-1">Bienvenue 👋</h2>
        <p className="text-text-dark/50 text-sm mb-6">Entrez votre numéro de table</p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={num}
            onChange={e => { setNum(e.target.value); setError(''); }}
            placeholder="N° de table"
            autoFocus
            min={1}
            max={50}
            className={`w-full px-4 py-4 rounded-xl border-2 text-center font-serif text-3xl font-bold focus:outline-none transition-colors mb-2 ${
              error ? 'border-red-500' : 'border-gray-200 focus:border-terracotta'
            }`}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <p className="text-xs text-text-dark/40 mb-4">Tables 1 à 50</p>
          <button type="submit" className="btn-shimmer w-full">
            Confirmer →
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ── Cart Drawer ── */
function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeItem, totalPrice, remarks, setRemarks, clearCart } = useCart();
  const table = getTableNumber();
  const info = getInfo();

  const sendOrder = () => {
    const lines = items.map(ci =>
      `${ci.item.name} × ${ci.quantity} → ${(ci.item.price * ci.quantity).toLocaleString('fr-FR')} XOF`
    ).join('\n   ');

    const msg = `🍕 *Commande La Bodega*\n📍 Table N°${table}\n\n   ${lines}\n\n💰 Total : ${totalPrice.toLocaleString('fr-FR')} XOF\n📝 Remarques : ${remarks || 'Aucune'}\n\nMerci !`;

    window.open(`https://wa.me/${info.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-[100] bg-beige rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl font-bold text-earth-dark">Votre commande</h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              {items.length === 0 ? (
                <p className="text-center text-text-dark/40 py-8">Votre panier est vide</p>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {items.map(ci => (
                      <div key={ci.item.id} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                        {ci.item.image && (
                          <img src={ci.item.image} alt={ci.item.name} className="w-14 h-14 rounded-lg object-cover" />
                        )}
                        <div className="flex-1">
                          <p className="font-poppins font-semibold text-sm text-earth-dark">{ci.item.name}</p>
                          <p className="font-poppins text-xs text-terracotta">{ci.item.price.toLocaleString('fr-FR')} XOF</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-poppins font-semibold text-sm w-6 text-center">{ci.quantity}</span>
                          <button
                            onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center hover:bg-terracotta/20 cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(ci.item.id)} className="p-1.5 text-red-400 hover:text-red-600 cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                    <div className="flex justify-between items-center">
                      <span className="font-poppins text-sm text-text-dark/60">Sous-total</span>
                      <span className="font-serif text-2xl font-bold text-terracotta">{totalPrice.toLocaleString('fr-FR')} XOF</span>
                    </div>
                  </div>

                  <textarea
                    placeholder="Remarques / allergies..."
                    value={remarks}
                    onChange={e => setRemarks(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-terracotta mb-4 resize-none"
                  />

                  <button onClick={sendOrder} className="btn-shimmer w-full inline-flex items-center justify-center gap-3 !py-4">
                    <Send size={18} /> Envoyer la commande WhatsApp
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Main Scan Page (inner) ── */
function ScanMenuInner() {
  const [table, setTable] = useState(getTableNumber());
  const [active, setActive] = useState('Tout');
  const [cartOpen, setCartOpen] = useState(false);
  const { addItem, totalItems } = useCart();

  const menu = getMenu().filter(m => m.available);
  const categories = getCategories();
  const tabs = ['Tout', ...categories.sort((a, b) => a.order - b.order).map(c => c.name)];
  const filtered = active === 'Tout' ? menu : menu.filter(m => m.category === active);
  const catIcon = (name: string) => categories.find(c => c.name === name)?.icon || '';

  if (!table) {
    return <TableModal onConfirm={setTable} />;
  }

  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-earth-dark/95 backdrop-blur-lg px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍕</span>
            <div>
              <span className="font-serif text-lg font-bold text-gold">La Bodega</span>
              <p className="font-poppins text-xs text-text-light/50">Notre Menu</p>
            </div>
          </div>
          <div className="bg-terracotta px-4 py-2 rounded-full">
            <span className="font-poppins text-sm font-semibold text-white">🪑 Table N°{table}</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-[72px] z-30 bg-beige border-b border-gray-200 overflow-x-auto">
        <div className="max-w-5xl mx-auto px-6 py-3 flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-poppins font-medium cursor-pointer transition-all ${
                active === tab
                  ? 'bg-terracotta text-white'
                  : 'bg-white text-text-dark/60 hover:bg-gray-100'
              }`}
            >
              {tab !== 'Tout' && <span className="mr-1">{catIcon(tab)}</span>}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md border-t-[3px] border-terracotta hover:shadow-xl transition-all"
            >
              <div className="h-44 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg font-bold text-earth-dark mb-1">{item.name}</h3>
                <p className="text-text-dark/50 text-xs line-clamp-2 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-poppins text-lg font-bold text-terracotta">{item.price.toLocaleString('fr-FR')} XOF</span>
                  <button
                    onClick={() => addItem(item)}
                    className="flex items-center gap-2 bg-terracotta text-white px-4 py-2 rounded-lg font-poppins text-xs font-semibold hover:bg-terracotta-deep transition-colors cursor-pointer"
                  >
                    <ShoppingCart size={14} /> Commander
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-terracotta rounded-full shadow-xl flex items-center justify-center hover:bg-terracotta-deep transition-colors cursor-pointer"
        >
          <ShoppingCart size={24} className="text-white" />
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center font-poppins text-xs font-bold text-earth-dark">
            {totalItems}
          </span>
        </motion.button>
      )}

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* WhatsApp floating */}
      <a
        href={`https://wa.me/${getInfo().whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-olive rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        <MessageCircle size={22} className="text-white" />
      </a>
    </div>
  );
}

/* ── Wrapper with CartProvider ── */
export default function ScanMenu() {
  return (
    <CartProvider>
      <ScanMenuInner />
    </CartProvider>
  );
}
