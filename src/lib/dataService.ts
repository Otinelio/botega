import { supabase } from './supabase';
import { 
  defaultCategories, 
  defaultMenu, 
  defaultGallery, 
  defaultTestimonials,
  defaultInfo,
  type MenuItem,
  type Category,
  type GalleryItem,
  type Testimonial,
  type RestaurantInfo,
} from '../data/store';
import type { SupaMenuItem } from './supabase';

export type { MenuItem, Category, GalleryItem, Testimonial, RestaurantInfo };

let cachedCategories: Category[] | null = null;
let cachedMenu: MenuItem[] | null = null;
let cachedGallery: GalleryItem[] | null = null;
let cachedTestimonials: Testimonial[] | null = null;
let cachedRestaurantInfo: RestaurantInfo | null = null;

/**
 * Charge les catégories depuis Supabase (avec fallback local)
 */
export async function loadCategories(): Promise<Category[]> {
  if (cachedCategories) return cachedCategories;

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;

    if (data && data.length > 0) {
      cachedCategories = data as Category[];
      return cachedCategories;
    }
  } catch (err) {
    console.warn('⚠️ Fallback sur les catégories locales:', err);
  }

  cachedCategories = defaultCategories;
  return cachedCategories;
}

/**
 * Charge le menu depuis Supabase (avec fallback local)
 */
export async function loadMenu(): Promise<MenuItem[]> {
  if (cachedMenu) return cachedMenu;

  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('available', true);

    if (error) throw error;

    if (data && data.length > 0) {
      // S'assurer que les catégories sont chargées pour pouvoir faire le mapping id -> nom
      const cats = await loadCategories();

      cachedMenu = (data as SupaMenuItem[]).map(item => {
        const cat = cats.find(c => c.id === item.category_id);
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          category: cat ? cat.name : item.category_id,
          badges: item.badges || [],
          available: item.available,
          image: item.image_url,
        };
      });
      return cachedMenu;
    }
  } catch (err) {
    console.warn('⚠️ Fallback sur le menu local:', err);
  }

  cachedMenu = defaultMenu;
  return cachedMenu;
}

/**
 * Charge la galerie depuis Supabase (avec fallback local)
 */
export async function loadGallery(): Promise<GalleryItem[]> {
  if (cachedGallery) return cachedGallery;

  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*');

    if (error) throw error;

    if (data && data.length > 0) {
      cachedGallery = data as GalleryItem[];
      return cachedGallery;
    }
  } catch (err) {
    console.warn('⚠️ Fallback sur la galerie locale:', err);
  }

  cachedGallery = defaultGallery;
  return cachedGallery;
}

/**
 * Charge les témoignages depuis Supabase (avec fallback local)
 */
export async function loadTestimonials(): Promise<Testimonial[]> {
  if (cachedTestimonials) return cachedTestimonials;

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('visible', true);

    if (error) throw error;

    if (data && data.length > 0) {
      cachedTestimonials = data as Testimonial[];
      return cachedTestimonials;
    }
  } catch (err) {
    console.warn('⚠️ Fallback sur les témoignages locaux:', err);
  }

  cachedTestimonials = defaultTestimonials;
  return cachedTestimonials;
}

/**
 * Charge les infos du restaurant depuis Supabase (avec fallback local)
 */
export async function loadRestaurantInfo(): Promise<RestaurantInfo> {
  if (cachedRestaurantInfo) return cachedRestaurantInfo;

  try {
    const { data, error } = await supabase
      .from('restaurant_info')
      .select('*')
      .eq('id', 'main')
      .single();

    if (error) throw error;

    if (data) {
      cachedRestaurantInfo = {
        name: data.name,
        slogan: data.slogan,
        address: data.address,
        phone: data.phone,
        whatsapp: data.whatsapp,
        instagram: data.instagram,
        hours: data.hours,
        description: data.description,
        adminPassword: data.admin_password_hash,
      };
      return cachedRestaurantInfo;
    }
  } catch (err) {
    console.warn('⚠️ Fallback sur les infos restaurant locales:', err);
  }

  cachedRestaurantInfo = defaultInfo;
  return cachedRestaurantInfo;
}

/**
 * Invalide le cache (utile après une mise à jour)
 */
export function invalidateCache() {
  cachedCategories = null;
  cachedMenu = null;
  cachedGallery = null;
  cachedTestimonials = null;
  cachedRestaurantInfo = null;
}

/**
 * Charge tout en parallèle
 */
export async function loadAllData() {
  const [categories, menu, gallery, testimonials, restaurantInfo] = await Promise.all([
    loadCategories(),
    loadMenu(),
    loadGallery(),
    loadTestimonials(),
    loadRestaurantInfo(),
  ]);

  return { categories, menu, gallery, testimonials, restaurantInfo };
}
