import { useEffect, useState } from 'react';
import {
  loadCategories,
  loadMenu,
  loadGallery,
  loadTestimonials,
  loadRestaurantInfo,
  invalidateCache,
  type Category,
  type MenuItem,
  type GalleryItem,
  type Testimonial,
  type RestaurantInfo,
} from '../lib/dataService';

/**
 * Hook pour charger les catégories
 */
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories().then(data => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  return { categories, loading };
}

/**
 * Hook pour charger le menu
 */
export function useMenu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenu().then(data => {
      setMenu(data);
      setLoading(false);
    });
  }, []);

  return { menu, loading };
}

/**
 * Hook pour charger la galerie
 */
export function useGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGallery().then(data => {
      setGallery(data);
      setLoading(false);
    });
  }, []);

  return { gallery, loading };
}

/**
 * Hook pour charger les témoignages
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials().then(data => {
      setTestimonials(data);
      setLoading(false);
    });
  }, []);

  return { testimonials, loading };
}

/**
 * Hook pour charger les infos du restaurant
 */
export function useRestaurantInfo() {
  const [info, setInfo] = useState<RestaurantInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurantInfo().then(data => {
      setInfo(data);
      setLoading(false);
    });
  }, []);

  return { info, loading };
}

/**
 * Hook pour charger toutes les données
 */
export function useAllData() {
  const [data, setData] = useState<{
    categories: Category[];
    menu: MenuItem[];
    gallery: GalleryItem[];
    testimonials: Testimonial[];
    restaurantInfo: RestaurantInfo | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [categories, menu, gallery, testimonials, restaurantInfo] = await Promise.all([
        loadCategories(),
        loadMenu(),
        loadGallery(),
        loadTestimonials(),
        loadRestaurantInfo(),
      ]);
      setData({ categories, menu, gallery, testimonials, restaurantInfo });
      setLoading(false);
    })();
  }, []);

  return { data, loading };
}

/**
 * Invalide le cache (utile après une mise à jour admin)
 */
export function useCacheInvalidation() {
  return { invalidateCache };
}
