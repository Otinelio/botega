import accueil2 from '../assets/acceuil2.jpg';

/* ═══════════════════════════════════════════════════════
   LA BODEGA LOMÉ — Default Data & Types
   ═══════════════════════════════════════════════════════ */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  badges: string[];
  available: boolean;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  order: number;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  location: string;
  visible: boolean;
}

export interface RestaurantInfo {
  name: string;
  slogan: string;
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  hours: string;
  description: string;
  adminPassword: string;
}

/* ── Unique ID generator ── */
export const uid = () => Math.random().toString(36).slice(2, 10);

/* ── Default Categories ── */
export const defaultCategories: Category[] = [
  { id: 'cat-pizzas', name: 'Pizzas', icon: '🍕', order: 1 },
  { id: 'cat-grillades', name: 'Grillades', icon: '🔥', order: 2 },
  { id: 'cat-africains', name: 'Africains', icon: '🌍', order: 3 },
  { id: 'cat-cocktails', name: 'Cocktails', icon: '🍹', order: 4 },
  { id: 'cat-desserts', name: 'Desserts', icon: '🍮', order: 5 },
  { id: 'cat-softs', name: 'Softs', icon: '🥤', order: 6 },
];

/* ── Default Menu ── */
export const defaultMenu: MenuItem[] = [
  {
    id: uid(), name: 'Margherita', description: 'Sauce tomate, mozzarella fondante, basilic frais sur pâte artisanale',
    price: 3500, category: 'Pizzas', badges: [], available: true,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
  },
  {
    id: uid(), name: 'Bodega Spéciale', description: 'Notre création signature : pepperoni, poivrons grillés, olives noires, épices africaines',
    price: 4500, category: 'Pizzas', badges: ['signature'], available: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
  },
  {
    id: uid(), name: '4 Fromages', description: 'Mozzarella, gorgonzola, parmesan, chèvre sur base crémeuse',
    price: 4000, category: 'Pizzas', badges: ['populaire'], available: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
  },
  {
    id: uid(), name: "Côtes d'agneau", description: 'Côtes d\'agneau marinées aux herbes, grillées au charbon, servies avec patates douces',
    price: 7500, category: 'Grillades', badges: ['signature'], available: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  },
  {
    id: uid(), name: 'Poulet Yassa Grillé', description: 'Poulet fermier mariné au citron et oignons caramélisés, grillé à la braise',
    price: 5500, category: 'Grillades', badges: ['populaire'], available: true,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80',
  },
  {
    id: uid(), name: 'Brochettes Mixtes', description: 'Brochettes de bœuf et poulet, poivrons, oignons, sauce piquante maison',
    price: 4500, category: 'Grillades', badges: [], available: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
  },
  {
    id: uid(), name: 'Fufu Sauce Arachide', description: 'Fufu traditionnel accompagné d\'une sauce arachide onctueuse aux légumes frais',
    price: 3000, category: 'Africains', badges: ['végétarien'], available: true,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80',
  },
  {
    id: uid(), name: 'Riz Jollof Crevettes', description: 'Riz jollof épicé aux crevettes géantes, poivrons et épices ouest-africaines',
    price: 4000, category: 'Africains', badges: ['populaire'], available: true,
    image: 'https://images.unsplash.com/photo-1645696301019-35adcc8e706c?w=600&q=80',
  },
  {
    id: uid(), name: 'Bodega Sunrise', description: 'Rhum ambré, jus de mangue fraîche, grenadine, zeste d\'orange',
    price: 2500, category: 'Cocktails', badges: ['signature'], available: true,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&q=80',
  },
  {
    id: uid(), name: 'Mojito Tropical', description: 'Rhum blanc, menthe fraîche, citron vert, fruit de la passion, eau pétillante',
    price: 2800, category: 'Cocktails', badges: ['nouveau'], available: true,
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80',
  },
  {
    id: uid(), name: "Ti'punch Togo", description: 'Rhum arrangé maison, sucre de canne, citron vert pressé — version togolaise',
    price: 2000, category: 'Cocktails', badges: [], available: true,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80',
  },
];

/* ── Default Restaurant Info ── */
export const defaultInfo: RestaurantInfo = {
  name: 'La Bodega Lomé',
  slogan: 'Vos journées s\'adoucissent, vos soirées s\'illuminent',
  address: 'Rue Baka, Quartier Avenou, Lomé, Togo',
  phone: '+228 99 99 99 56',
  whatsapp: '22899999956',
  instagram: '@labodega_tg',
  hours: 'Ouvert tous les jours · 10h00 – 00h00',
  description: 'Restaurant africain, pizzeria artisanale et lounge bar au cœur de Lomé. Mini-golf, projections matchs, cocktails signature.',
  adminPassword: 'bodega2026',
};

/* ── Default Testimonials ── */
export const defaultTestimonials: Testimonial[] = [
  {
    id: uid(),
    name: 'Ama K.',
    text: 'Pizza Bodega Spéciale, cocktails divins, mini-golf le soir... que demander de plus ?',
    rating: 5,
    location: 'Lomé',
    visible: true,
  },
  {
    id: uid(),
    name: 'Jean-Paul M.',
    text: 'Ambiance exceptionnelle, staff aux petits soins, parfait pour sorties en famille.',
    rating: 5,
    location: 'Lomé',
    visible: true,
  },
  {
    id: uid(),
    name: 'Sélom D.',
    text: 'Le seul endroit à Lomé où on mange bien ET on regarde le match. Incroyable!',
    rating: 5,
    location: 'Lomé',
    visible: true,
  },
];

/* ── Default Gallery ── */
export const defaultGallery: GalleryItem[] = [
  { id: uid(), url: accueil2, caption: 'Notre terrasse au coucher du soleil' },
  { id: uid(), url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', caption: 'Fine dining à la Bodega' },
  { id: uid(), url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', caption: 'Ambiance lounge bar' },
  { id: uid(), url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', caption: 'Nos grillades signature' },
  { id: uid(), url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80', caption: 'Pizzas artisanales au four' },
  { id: uid(), url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80', caption: 'Cocktails créatifs' },
  { id: uid(), url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', caption: 'Espace mini-golf' },
];

/* ═══════════════════════════════════════
   Storage Helpers
   ═══════════════════════════════════════ */

const KEYS = {
  menu: 'bodega_menu',
  categories: 'bodega_categories',
  gallery: 'bodega_gallery',
  testimonials: 'bodega_testimonials',
  info: 'bodega_infos',
  auth: 'bodega_admin_auth',
  table: 'bodega_table_number',
};

function loadOrSeed<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (raw) {
    try { return JSON.parse(raw); } catch { /* use fallback */ }
  }
  localStorage.setItem(key, JSON.stringify(fallback));
  return fallback;
}

export function seedAllData() {
  loadOrSeed(KEYS.menu, defaultMenu);
  loadOrSeed(KEYS.categories, defaultCategories);
  loadOrSeed(KEYS.gallery, defaultGallery);
  loadOrSeed(KEYS.testimonials, defaultTestimonials);
  loadOrSeed(KEYS.info, defaultInfo);
}

/* ── Typed getters / setters ── */
export const getMenu = (): MenuItem[] => loadOrSeed(KEYS.menu, defaultMenu);
export const setMenu = (m: MenuItem[]) => localStorage.setItem(KEYS.menu, JSON.stringify(m));

export const getCategories = (): Category[] => loadOrSeed(KEYS.categories, defaultCategories);
export const setCategories = (c: Category[]) => localStorage.setItem(KEYS.categories, JSON.stringify(c));

export const getGallery = (): GalleryItem[] => {
  const items = loadOrSeed(KEYS.gallery, defaultGallery);
  let updated = false;
  const newItems = items.map(item => {
    if (item.caption === 'Notre terrasse au coucher du soleil' && item.url.includes('unsplash.com')) {
      updated = true;
      return { ...item, url: accueil2 };
    }
    return item;
  });
  if (updated) {
    setGallery(newItems);
  }
  return newItems;
};
export const setGallery = (g: GalleryItem[]) => localStorage.setItem(KEYS.gallery, JSON.stringify(g));

export const getTestimonials = (): Testimonial[] => loadOrSeed(KEYS.testimonials, defaultTestimonials);
export const setTestimonials = (t: Testimonial[]) => localStorage.setItem(KEYS.testimonials, JSON.stringify(t));

export const getInfo = (): RestaurantInfo => loadOrSeed(KEYS.info, defaultInfo);
export const setInfo = (i: RestaurantInfo) => localStorage.setItem(KEYS.info, JSON.stringify(i));

export const isAdminAuth = (): boolean => localStorage.getItem(KEYS.auth) === 'true';
export const setAdminAuth = (v: boolean) => localStorage.setItem(KEYS.auth, String(v));

export const getTableNumber = (): string | null => sessionStorage.getItem(KEYS.table);
export const setTableNumber = (n: string) => sessionStorage.setItem(KEYS.table, n);
