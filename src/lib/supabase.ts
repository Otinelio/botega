import { createClient } from '@supabase/supabase-js';

// Les clés sont publiques par design chez Supabase
// La sécurité vient des RLS (Row Level Security) sur les tables
const SUPABASE_URL = 'https://ohmhfksoslpqblixarhp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_okYEU2pV5Yz-B1Di-euRcA_lmcFGRWo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Types pour Supabase
export interface SupaMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  badges: string[];
  available: boolean;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface SupaCategory {
  id: string;
  name: string;
  icon: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface SupaGalleryItem {
  id: string;
  url: string;
  caption: string;
  created_at: string;
  updated_at: string;
}

export interface SupaTestimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  location: string;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface SupaRestaurantInfo {
  id: string;
  name: string;
  slogan: string;
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  hours: string;
  description: string;
  admin_password_hash: string;
  created_at: string;
  updated_at: string;
}
