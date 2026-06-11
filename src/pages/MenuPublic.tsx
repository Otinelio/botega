import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMenu, getCategories, getInfo } from '../data/store';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Plus, Minus, Trash2, X, Send, MessageCircle } from 'lucide-react';
import { CartProvider } from '../context/CartContext';
import logoBodega from '../assets/logo_bodega.png';
import CategoryIcon from '../components/CategoryIcon';

/* ── Cart Drawer ── */
function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeItem, totalPrice, remarks, setRemarks, clearCart } = useCart();
  const info = getInfo();

  const sendOrder = () => {
    const lines = items.map(ci =>
      `${ci.item.name} × ${ci.quantity} → ${(ci.item.price * ci.quantity).toLocaleString('fr-FR')} XOF`
    ).join('\n   ');

    const msg = `🍕 *Commande La Bodega*\n📍 À emporter / Livraison\n\n   ${lines}\n\n💰 Total : ${totalPrice.toLocaleString('fr-FR')} XOF\n📝 Remarques : ${remarks || 'Aucune'}\n\nMerci !`;

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
                    placeholder="Remarques / allergies / adresse de livraison..."
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

/* ── Main Menu Page (inner) ── */
function MenuPublicInner() {
  const [active, setActive] = useState('Tout');
  const [cartOpen, setCartOpen] = useState(false);
  const { addItem, totalItems } = useCart();

  const menu = getMenu().filter(m => m.available);
  const categories = getCategories();
  const tabs = ['Tout', ...categories.sort((a, b) => a.order - b.order).map(c => c.name)];
  const filtered = active === 'Tout' ? menu : menu.filter(m => m.category === active);

  /* Group items by category for "Tout" view */
  const grouped = active === 'Tout'
    ? categories.sort((a, b) => a.order - b.order).reduce((acc, cat) => {
        const items = filtered.filter(i => i.category === cat.name);
        if (items.length > 0) acc.push({ cat, items });
        return acc;
      }, [] as { cat: typeof categories[0]; items: typeof filtered }[])
    : [{ cat: categories.find(c => c.name === active) || { id: '', name: active, icon: '', order: 0 }, items: filtered }];

  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-earth-dark/95 backdrop-blur-lg px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoBodega} alt="La Bodega" className="h-10 w-auto" />
            <div>
              <span className="font-serif text-lg font-bold text-gold">La Bodega</span>
              <p className="font-poppins text-xs text-text-light/50">Notre Menu</p>
            </div>
          </div>
          <a href="/" className="font-poppins text-sm text-text-light/60 hover:text-gold transition-colors">
            ← Retour à l'accueil
          </a>
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
              {tab !== 'Tout' && <CategoryIcon name={tab} className="inline-block mr-1 align-middle" />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Menu content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {grouped.map(({ cat, items }) => (
          <section key={cat.id} className="mb-10">
            {/* Section title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-5"
            >
              <CategoryIcon name={cat.name} size={24} className="text-terracotta" />
              <h2 className="font-serif text-xl font-bold text-earth-dark">{cat.name}</h2>
              <div className="flex-1 h-px bg-terracotta/20 ml-2" />
            </motion.div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className="group flex gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-gray-100 hover:border-terracotta/30 transition-all duration-300"
                >
                  {/* Thumbnail / Icon placeholder */}
                  <div className="flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-terracotta/5 text-terracotta flex items-center justify-center transition-colors group-hover:bg-terracotta/10">
                        <CategoryIcon name={item.category} size={28} />
                      </div>
                    )}
                  </div>

                  {/* Info & Actions */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-base font-bold text-earth-dark group-hover:text-terracotta transition-colors leading-tight">
                          {item.name}
                        </h3>
                        <span className="font-poppins text-sm font-bold text-terracotta whitespace-nowrap shrink-0">
                          {item.price.toLocaleString('fr-FR')} F
                        </span>
                      </div>
                      
                      {item.badges.length > 0 && (
                        <div className="flex gap-1.5 flex-wrap mt-1">
                          {item.badges.map(b => (
                            <span
                              key={b}
                              className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-poppins font-semibold uppercase tracking-wide ${
                                b === 'signature' ? 'bg-gold/10 text-gold' :
                                b === 'populaire' ? 'bg-terracotta/10 text-terracotta' :
                                b === 'nouveau' ? 'bg-olive/10 text-olive' :
                                'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.description && (
                        <p className="text-text-dark/50 text-xs mt-1.5 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100/50">
                      <span className="text-[10px] font-poppins text-text-dark/40 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <button
                        onClick={() => addItem(item)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-terracotta/10 text-terracotta hover:bg-terracotta hover:text-white font-poppins text-xs font-semibold transition-all cursor-pointer active:scale-95"
                      >
                        <Plus size={12} /> Ajouter
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
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
export default function MenuPublic() {
  return (
    <CartProvider>
      <MenuPublicInner />
    </CartProvider>
  );
}
