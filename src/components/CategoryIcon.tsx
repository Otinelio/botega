import {
  GlassWater,
  Milk,
  Citrus,
  CupSoda,
  Beer,
  Wine,
  Droplet,
  Coffee,
  UtensilsCrossed,
  Salad,
  Fish,
  Drumstick,
  Utensils,
  Soup,
  Globe,
  Flame,
  Baby,
  Pizza,
  Plus,
  IceCream,
  CircleHelp
} from 'lucide-react';

const iconMap: Record<string, any> = {
  'Cocktails': GlassWater,
  'Mocktails / Virgin': GlassWater,
  'Smoothies': Milk,
  'Jus de fruits': Citrus,
  'Softs / Sodas': CupSoda,
  'Les Alcools': Beer,
  'Digestifs': Wine,
  'Bières': Beer,
  'Eaux': Droplet,
  'Boissons chaudes': Coffee,
  'Tapas': UtensilsCrossed,
  'Salades': Salad,
  'Plats — Mer': Fish,
  'Plats — Terre': Drumstick,
  'Plats complets': Utensils,
  'Nos pâtes': Soup,
  "Saveurs d'Afrique": Globe,
  'Sur le pouce': Flame,
  'Menus enfants': Baby,
  'Nos pizzas': Pizza,
  'Suppléments': Plus,
  'Desserts': IceCream,
  'Vins / Champagnes': Wine,
};

export default function CategoryIcon({ name, size = 16, className = "" }: { name: string; size?: number; className?: string }) {
  const IconComponent = iconMap[name] || CircleHelp;
  return <IconComponent size={size} className={className} />;
}
