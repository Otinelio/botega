import img1 from '../assets/nosUnivers/img1.jpg';
import img2 from '../assets/nosUnivers/img2.jpg';
import img3 from '../assets/nosUnivers/img3.jpg';
import img4 from '../assets/nosUnivers/img4.jpg';
import img5 from '../assets/nosUnivers/img5.jpg';
import img6 from '../assets/nosUnivers/img6.jpg';
import img7 from '../assets/nosUnivers/img7.jpg';

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
  { id: 'cat-cocktails',      name: 'Cocktails',          icon: '🍹', order: 1 },
  { id: 'cat-mocktails',      name: 'Mocktails / Virgin',  icon: '🧃', order: 2 },
  { id: 'cat-smoothies',      name: 'Smoothies',          icon: '🥤', order: 3 },
  { id: 'cat-jus',            name: 'Jus de fruits',      icon: '🍊', order: 4 },
  { id: 'cat-softs',          name: 'Softs / Sodas',      icon: '🥫', order: 5 },
  { id: 'cat-alcools',        name: 'Les Alcools',        icon: '🥃', order: 6 },
  { id: 'cat-digestifs',      name: 'Digestifs',          icon: '🍷', order: 7 },
  { id: 'cat-bieres',         name: 'Bières',             icon: '🍺', order: 8 },
  { id: 'cat-eaux',           name: 'Eaux',               icon: '💧', order: 9 },
  { id: 'cat-boissons-chaud', name: 'Boissons chaudes',   icon: '☕', order: 10 },
  { id: 'cat-tapas',          name: 'Tapas',              icon: '🍢', order: 11 },
  { id: 'cat-salades',        name: 'Salades',            icon: '🥗', order: 12 },
  { id: 'cat-plats-mer',      name: 'Plats — Mer',        icon: '🐟', order: 13 },
  { id: 'cat-plats-terre',    name: 'Plats — Terre',      icon: '🍗', order: 14 },
  { id: 'cat-plats-complets', name: 'Plats complets',     icon: '🍽️', order: 15 },
  { id: 'cat-pates',          name: 'Nos pâtes',          icon: '🍝', order: 16 },
  { id: 'cat-afrique',        name: "Saveurs d'Afrique",  icon: '🌍', order: 17 },
  { id: 'cat-burgers',        name: 'Sur le pouce',       icon: '🍔', order: 18 },
  { id: 'cat-enfants',        name: 'Menus enfants',      icon: '👧', order: 19 },
  { id: 'cat-pizzas',         name: 'Nos pizzas',         icon: '🍕', order: 20 },
  { id: 'cat-supplements',    name: 'Suppléments',        icon: '➕', order: 21 },
  { id: 'cat-desserts',       name: 'Desserts',           icon: '🍮', order: 22 },
  { id: 'cat-vins',           name: 'Vins / Champagnes',  icon: '🍾', order: 23 },
];

/* ── Helper to create menu items concisely ── */
const m = (name: string, price: number, category: string, description = '', badges: string[] = [], image = ''): MenuItem => ({
  id: uid(), name, description, price, category, badges, available: true, image,
});

/* ── Default Menu ── */
export const defaultMenu: MenuItem[] = [

  /* ═══ SIGNATURE BODEGA ═══ */
  m('Pizza Bodega Spéciale', 12500, 'Nos pizzas', 'Sauce tomate maison, mozzarella, chèvre frais, tomates confites, roquette, miel de truffe', ['signature'], 'https://images.unsplash.com/photo-1504674900967-8e38f0a82fdc?w=600&q=80'),
  m('Grillade Premium - Faux-Filet', 18000, 'Plats — Terre', 'Pièce de boeuf premium cuite au charbon, sauce chimichurri maison, légumes grillés', ['signature'], 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&q=80'),
  m('Attiéké & Poisson Braisé', 11000, "Saveurs d'Afrique", 'Poisson frais braisé aux épices, attiéké savoureux, sauce arachide, légumes', ['signature'], 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80'),

  /* ═══ COCKTAILS ═══ */
  m('Ti Punch', 3500, 'Cocktails', 'Rhum blanc, sucre de canne, tranche de citron vert'),
  m('Megane', 4000, 'Cocktails', 'Vodka, jus d\'ananas, jus d\'orange, sirop de grenadine, curaçao bleu'),
  m('Mojito', 4000, 'Cocktails', 'Rhum, eau pétillante, jus de citron vert, feuilles de menthe, sucre de canne'),
  m('Mojito Ananas', 4000, 'Cocktails'),
  m('Mojito Passion', 4000, 'Cocktails'),
  m('Mojito Fruits Rouges', 4000, 'Cocktails'),
  m('Caipirinha', 4000, 'Cocktails', 'Liqueur de cachaça, jus de citron, sucre de canne'),
  m('Soleil des Tropiques', 4000, 'Cocktails'),
  m('Tequila Sunrise', 4000, 'Cocktails'),
  m('Margarita', 4000, 'Cocktails'),
  m('Vodka Passion', 4000, 'Cocktails'),
  m('Gin Fizz', 4000, 'Cocktails'),
  m('Tentation', 4500, 'Cocktails', 'Liqueur de café, Bailey\'s, triple sec, sirop de vanille'),
  m('Mai Tai', 4500, 'Cocktails'),
  m('Orgasme à la Tequila', 4500, 'Cocktails'),
  m('Pinacolada', 4500, 'Cocktails'),
  m('Banana Colada', 4500, 'Cocktails'),
  m('Basilico', 4500, 'Cocktails'),
  m('Brise de Lomé', 4500, 'Cocktails'),
  m('La Bodega Sunrise', 5000, 'Cocktails', '', ['signature']),

  /* ═══ MOCKTAILS / VIRGIN ═══ */
  m('Diabolo Fraise', 2000, 'Mocktails / Virgin'),
  m('Diabolo Framboise Litchi', 2500, 'Mocktails / Virgin'),
  m('Diabolo Pêche Abricot', 2500, 'Mocktails / Virgin'),
  m('Diabolo Kiwi Banane', 2500, 'Mocktails / Virgin'),
  m('Red Coco', 3000, 'Mocktails / Virgin'),
  m('Rosita', 3000, 'Mocktails / Virgin'),
  m('Virgin Mojito', 3500, 'Mocktails / Virgin'),
  m('Virgin Mojito Ananas', 3500, 'Mocktails / Virgin'),
  m('Virgin Mojito Passion', 3500, 'Mocktails / Virgin'),
  m('Virgin Mojito Fruits Rouges', 3500, 'Mocktails / Virgin'),
  m('Virgin Pina Colada', 3500, 'Mocktails / Virgin'),
  m('Virgin Banana Colada', 3500, 'Mocktails / Virgin'),
  m('Africa', 3500, 'Mocktails / Virgin'),
  m('Detox', 3500, 'Mocktails / Virgin'),
  m('Punch Light', 3500, 'Mocktails / Virgin'),
  m('Bora Bora', 3500, 'Mocktails / Virgin'),

  /* ═══ SMOOTHIES ═══ */
  m('Smoothie au fruit', 2500, 'Smoothies', 'Banane / pomme / pastèque / ananas / mangue'),
  m('Smoothie aux deux fruits', 3000, 'Smoothies'),
  m('Banane chocolat vanille', 3500, 'Smoothies'),
  m('Banane fraise pomme', 3500, 'Smoothies'),
  m('Pomme pêche abricot banane', 3500, 'Smoothies'),
  m('Pastèque banane framboise litchi', 3500, 'Smoothies'),

  /* ═══ JUS DE FRUITS MAISON ═══ */
  m('Jus de fruit frais', 1500, 'Jus de fruits', 'Ananas / pastèque / gingembre / bissap / passion / orange / mangue'),
  m('Cocktail de 2 fruits', 2000, 'Jus de fruits'),

  /* ═══ SOFTS / SODAS / RED BULL ═══ */
  m('Youki cocktail / World Cola / Youzou / Sport Actif / Chap', 1000, 'Softs / Sodas', 'Petite bouteille'),
  m('Malta', 1000, 'Softs / Sodas'),
  m('Sirop / Sirop de menthe / Grenadine + eau', 1500, 'Softs / Sodas'),
  m('Red Bull', 2000, 'Softs / Sodas'),
  m('XXL', 1500, 'Softs / Sodas', 'Grand format sirop'),

  /* ═══ LES ALCOOLS (shots 5 cl) ═══ */
  m('Ricard / Pastis', 2000, 'Les Alcools', 'Shot 5 cl'),
  m('Vodka / Ballantines', 2000, 'Les Alcools', 'Shot 5 cl'),
  m('Rhum Saint James (blanc/brun)', 2000, 'Les Alcools', 'Shot 5 cl'),
  m('Martini rouge / blanc', 2000, 'Les Alcools', 'Shot 5 cl'),
  m('Baileys / J&B / Grant\'s', 2000, 'Les Alcools', 'Shot 5 cl'),
  m('Gin / Red Label', 2000, 'Les Alcools', 'Shot 5 cl'),
  m('Jack Daniels / Chivas', 2500, 'Les Alcools', 'Shot 5 cl'),

  /* ═══ DIGESTIFS ═══ */
  m('Get 27 / Baileys', 2000, 'Digestifs'),
  m('Hennessy / Armagnac', 4000, 'Digestifs'),

  /* ═══ BIÈRES ═══ */
  m('Beaufort / Racine / Castel', 1000, 'Bières'),
  m('Guinness', 1000, 'Bières', 'PM — 1 500F en GM'),
  m('Eku / Awoyo', 2000, 'Bières'),
  m('Heineken / Smirnoff', 1500, 'Bières'),
  m('Desperado', 2000, 'Bières'),

  /* ═══ EAUX ═══ */
  m('Eau Voltic plate 1.5L', 1500, 'Eaux'),
  m('Possotomé gazéifiée', 2000, 'Eaux'),

  /* ═══ BOISSONS CHAUDES ═══ */
  m('Thé menthe / citron / fruits rouges', 1000, 'Boissons chaudes'),
  m('Thé menthe fraîche', 1500, 'Boissons chaudes'),
  m('Thé gingembre', 2000, 'Boissons chaudes'),
  m('Thé au gingembre et au lait', 2000, 'Boissons chaudes'),
  m('Café Nespresso', 1500, 'Boissons chaudes'),
  m('Café Nespresso lait', 2000, 'Boissons chaudes'),

  /* ═══ TAPAS ═══ */
  m('Nems au poulet ou au bœuf', 3000, 'Tapas'),
  m('Samoussas au poulet ou bœuf', 3000, 'Tapas'),
  m('Rouleaux de poisson', 4000, 'Tapas'),

  /* ═══ SALADES ═══ */
  m('Salade verte', 2000, 'Salades', 'Entrée 2 000F / Plat 3 000F'),
  m('Salade Texas', 3500, 'Salades', 'Entrée 3 500F / Plat 5 000F'),
  m('Salade de gésiers', 3500, 'Salades', 'Entrée 3 500F / Plat 5 000F'),
  m('Salade au thon', 3500, 'Salades', 'Entrée 3 500F / Plat 5 000F'),
  m('Macédoine de salade', 3500, 'Salades', '3 500F / 5 000F'),
  m('Salade Niçoise', 4000, 'Salades', '4 000F / 5 500F'),
  m('Salade avocat crevettes', 5500, 'Salades', 'Saisonnier'),
  m('Salade de pâtes au saumon', 4500, 'Salades', '4 500F / 6 000F'),

  /* ═══ PLATS — MER ═══ */
  m('Poisson du jour braisé', 7000, 'Plats — Mer'),
  m('Mijoté de poisson aux carottes', 7500, 'Plats — Mer'),
  m('Calamars à la provençale', 7500, 'Plats — Mer'),
  m('Cassolette océane au curry', 10000, 'Plats — Mer'),

  /* ═══ PLATS — TERRE / VOLAILLE / VIANDE ═══ */
  m('Gésiers de poulet à l\'ail et aux fines herbes', 6000, 'Plats — Terre'),
  m('Sauté de poulet façon LA BODEGA', 6500, 'Plats — Terre', '', ['signature']),
  m('Cuisse de poulet grillé au thym', 6500, 'Plats — Terre'),
  m('Poulet yassa', 6500, 'Plats — Terre'),
  m('Émincés de poulet crème champignons', 7000, 'Plats — Terre'),
  m('Demi-poulet bicyclette braisé', 7000, 'Plats — Terre'),
  m('Escalope de poulet panée à la sauce crème', 7500, 'Plats — Terre'),
  m('Filet de bœuf poêlé au beurre', 6500, 'Plats — Terre'),
  m('Brochettes de bœuf aux fines herbes', 6500, 'Plats — Terre'),
  m('Émincés de bœuf aux légumes', 7000, 'Plats — Terre'),
  m('Lapin en gibelotte', 6500, 'Plats — Terre'),
  m('Côte de porc grillé à la moutarde', 7500, 'Plats — Terre'),
  m('Osso bucco à la Togolaise', 8000, 'Plats — Terre'),
  m('Côtelettes d\'agneau au romarin', 8000, 'Plats — Terre'),
  m('Mijotés de cailles aux raisins', 12000, 'Plats — Terre'),

  /* ═══ PLATS COMPLETS ═══ */
  m('Gratin végétarien', 6500, 'Plats complets'),
  m('Gratins de viande hachée', 6500, 'Plats complets'),
  m('Gratins de pâtes au saumon', 7000, 'Plats complets'),
  m('Fried rice au poulet', 7000, 'Plats complets'),
  m('Pintade rôtie aux petits légumes', 7000, 'Plats complets'),
  m('Wok de légumes sautés au riz', 8000, 'Plats complets'),

  /* ═══ NOS PÂTES ═══ */
  m('Spaghetti gourmand', 4000, 'Nos pâtes'),
  m('Spaghetti à la bolognaise', 4500, 'Nos pâtes'),
  m('Tagliatelles carbonara', 5000, 'Nos pâtes'),
  m('Farfalle aux crevettes', 6000, 'Nos pâtes'),
  m('Lasagnes à la bolognaise', 6500, 'Nos pâtes'),
  m('Lasagnes au saumon', 7000, 'Nos pâtes'),

  /* ═══ SAVEURS D'AFRIQUE ═══ */
  m('Djinkoumé cuisse de poulet', 5500, "Saveurs d'Afrique"),
  m('Gbolan dessi', 6000, "Saveurs d'Afrique", 'Sauce de chèvre'),
  m('Yébésessi à la togolaise', 6500, "Saveurs d'Afrique"),
  m('Sifo au poisson', 6500, "Saveurs d'Afrique"),
  m('Lanmoumou dessi', 6500, "Saveurs d'Afrique"),
  m('Atchiéké poisson', 6500, "Saveurs d'Afrique"),
  m('Adémé dessi', 5000, "Saveurs d'Afrique", '4 pièces 5 000F / 5 pièces 6 500F / 6 pièces 7 500F / 7 pièces 8 000F'),
  m('Gboman dessi', 6000, "Saveurs d'Afrique", '4 pièces 6 000F / 5 pièces 7 500F / 6 pièces 8 500F'),

  /* ═══ SUR LE POUCE / BURGERS ═══ */
  m('Chawarma poulet / bœuf', 3000, 'Sur le pouce'),
  m('Chawarma gourmand', 4500, 'Sur le pouce'),
  m('Hamburger classique', 3000, 'Sur le pouce'),
  m('Cheese burger', 3500, 'Sur le pouce'),
  m('Chicken burger', 4000, 'Sur le pouce'),
  m('Double Cheese burger', 4500, 'Sur le pouce'),

  /* ═══ MENUS ENFANTS ═══ */
  m('Menu enfant', 4000, 'Menus enfants', '1 plat + 1 soda/sirop + 1 boule de glace + 1 cadeau'),

  /* ═══ NOS PIZZAS ═══ */
  m('Margherita', 3000, 'Nos pizzas'),
  m('Américaine', 4000, 'Nos pizzas'),
  m('Italienne', 4000, 'Nos pizzas'),
  m('Reine', 4500, 'Nos pizzas'),
  m('Bolognaise', 5000, 'Nos pizzas'),
  m('La Végétarienne', 5000, 'Nos pizzas'),
  m('Royale', 5000, 'Nos pizzas'),
  m('La Bassecour', 5000, 'Nos pizzas'),
  m('Hawaïenne', 5000, 'Nos pizzas'),
  m('Pepperoni Chorizo', 5500, 'Nos pizzas'),
  m('Pizza au thon', 6000, 'Nos pizzas'),
  m('La Togolaise', 6000, 'Nos pizzas'),
  m('Calzone', 6000, 'Nos pizzas'),
  m('La Marine', 6000, 'Nos pizzas'),
  m('4 Fromages', 6000, 'Nos pizzas'),
  m('La Gourmande', 6000, 'Nos pizzas'),
  m('Veggie', 6500, 'Nos pizzas'),
  m('Pizza Pili-Pili', 6500, 'Nos pizzas'),
  m('La Bodega', 7000, 'Nos pizzas', '', ['signature']),
  m('La Mexicaine', 7000, 'Nos pizzas'),

  /* ═══ SUPPLÉMENTS (PIZZAS) ═══ */
  m('Ail, basilic, légumes, ananas, olives', 500, 'Suppléments'),
  m('Fromage, Bleu d\'Auvergne, Chèvre', 1000, 'Suppléments'),
  m('Jambon', 1000, 'Suppléments'),
  m('Crevettes, calamars, lardons', 1500, 'Suppléments'),
  m('Blanc de poulet épicé, bœuf BBQ', 2000, 'Suppléments'),

  /* ═══ DESSERTS ═══ */
  m('Boule de glace', 1000, 'Desserts'),
  m('Crêpes au sucre ou miel citron', 2000, 'Desserts'),
  m('Crêpes au Nutella', 2500, 'Desserts'),
  m('Crêpes fourrées à la pomme', 3500, 'Desserts'),
  m('Crêpes fourrées à la banane', 3500, 'Desserts'),
  m('Salade de fruits à la glace vanille', 3000, 'Desserts'),
  m('Coupe glacée banane chocolat', 4000, 'Desserts'),
  m('Gâteau de petits-beurre au chocolat', 4000, 'Desserts'),

  /* ═══ VINS / MOUSSEUX / CHAMPAGNES ═══ */
  m('Trouillard Brut', 55000, 'Vins / Champagnes'),
  m('EPC Blanc de Noir', 55000, 'Vins / Champagnes'),
  m('Deutz Brut', 55000, 'Vins / Champagnes'),
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
  { id: uid(), url: img1, caption: 'Notre terrasse au coucher du soleil' },
  { id: uid(), url: img2, caption: 'Ambiance lounge bar' },
  { id: uid(), url: img3, caption: 'Nos grillades signature' },
  { id: uid(), url: img4, caption: 'Pizzas artisanales au four' },
  { id: uid(), url: img5, caption: 'Cocktails créatifs' },
  { id: uid(), url: img6, caption: 'Espace mini-golf' },
  { id: uid(), url: img7, caption: 'Décoration intérieure chaleureuse' },
];

/* ═══════════════════════════════════════
   Storage Helpers
   ═══════════════════════════════════════ */

/**
 * Bump this string any time defaultMenu or defaultCategories change.
 * Returning visitors will automatically get the fresh data.
 */
const DATA_VERSION = 'v2-real-menu';

const KEYS = {
  menu: 'bodega_menu',
  categories: 'bodega_categories',
  gallery: 'bodega_gallery',
  testimonials: 'bodega_testimonials',
  info: 'bodega_infos',
  auth: 'bodega_admin_auth',
  table: 'bodega_table_number',
  version: 'bodega_data_version',
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
  // If the stored version doesn't match, reset menu & categories to the new defaults.
  const storedVersion = localStorage.getItem(KEYS.version);
  if (storedVersion !== DATA_VERSION) {
    localStorage.removeItem(KEYS.menu);
    localStorage.removeItem(KEYS.categories);
    localStorage.setItem(KEYS.version, DATA_VERSION);
  }

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

  const oldDefaultCaptions = [
    'Notre terrasse au coucher du soleil',
    'Fine dining à la Bodega',
    'Ambiance lounge bar',
    'Nos grillades signature',
    'Pizzas artisanales au four',
    'Cocktails créatifs',
    'Espace mini-golf',
  ];

  const isOldDefaultGallery = items.length === oldDefaultCaptions.length &&
    items.every(item => oldDefaultCaptions.includes(item.caption));

  const hasInvalidItems = items.length === 0 ||
    items.some(item => !item || typeof item.url !== 'string' || item.url.trim() === '');

  if (isOldDefaultGallery || hasInvalidItems) {
    setGallery(defaultGallery);
    return defaultGallery;
  }

  let updated = false;
  const syncMap: Record<string, string> = {
    'Notre terrasse au coucher du soleil': img1,
    'Fine dining à la Bodega': img2,
    'Ambiance lounge bar': img3,
    'Nos grillades signature': img4,
    'Pizzas artisanales au four': img5,
    'Cocktails créatifs': img6,
    'Espace mini-golf': img7,
  };

  const newItems = items.map(item => {
    const newUrl = syncMap[item.caption];
    if (newUrl && item.url !== newUrl) {
      updated = true;
      return { ...item, url: newUrl };
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
