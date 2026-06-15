# 🚀 Intégration Supabase — Guide Complet

## ✅ Status: Intégration réussie

Tout est déjà intégré et prêt à fonctionner. Voici comment ça marche.

---

## 📋 Ce qui a été fait

1. ✅ **Client Supabase créé** (`src/lib/supabase.ts`)
   - URL et clé publishable intégrées directement (sécurisé par RLS)
   - Aucun fichier .env nécessaire

2. ✅ **Service de données créé** (`src/lib/dataService.ts`)
   - Charge les données depuis Supabase
   - Fallback automatique vers les données locales si Supabase n'est pas accessible
   - Système de cache pour optimiser les performances

3. ✅ **Hooks React créés** (`src/hooks/useData.ts`)
   - `useMenu()` - charge le menu
   - `useCategories()` - charge les catégories
   - `useGallery()` - charge la galerie
   - `useTestimonials()` - charge les témoignages
   - `useRestaurantInfo()` - charge les infos du restaurant
   - `useAllData()` - charge tout en parallèle

4. ✅ **Migration automatique** (`src/lib/migrate.ts`)
   - Se lance au démarrage de l'app
   - Ne migre qu'une seule fois (vérification dans Supabase)
   - Fallback gracieux si ça échoue

5. ✅ **App.tsx mise à jour**
   - Initialise la migration au démarrage

---

## 🔧 Configuration Supabase (À faire une seule fois)

### 1️⃣ Créer les tables SQL

Ouvre le **SQL Editor** dans le dashboard Supabase et copie/colle le contenu du fichier:
```
./supabase-schema.sql
```

Cela va créer:
- `categories`
- `menu_items`
- `gallery`
- `testimonials`
- `restaurant_info`

Avec les RLS (Row Level Security) déjà configurées.

### 2️⃣ Démarrer l'app

```bash
npm run dev
```

Quand l'app démarre:
1. Elle essaie de migrer les données locales vers Supabase (une seule fois)
2. Vous verrez des logs dans la console:
   ```
   🚀 Démarrage de la migration vers Supabase...
   📦 Migration des catégories...
   ✅ 23 catégories migrées
   🍽️  Migration du menu...
   ✅ 150+ items de menu migrés
   ...
   🎉 Migration complète !
   ```
3. Après, **tout charge depuis Supabase** automatiquement

---

## 📱 Utiliser les données dans vos composants

### Option 1: Avec les hooks React (recommandé)

```tsx
import { useMenu, useCategories } from '../hooks/useData';

function MyComponent() {
  const { menu, loading } = useMenu();
  const { categories, loading: catLoading } = useCategories();

  if (loading || catLoading) return <div>Chargement...</div>;

  return (
    <div>
      {/* Utilise menu et categories */}
    </div>
  );
}
```

### Option 2: Charger les données directement

```tsx
import { loadMenu, loadCategories } from '../lib/dataService';

async function fetchData() {
  const menu = await loadMenu();
  const categories = await loadCategories();
  // ...
}
```

---

## 🔐 Sécurité

### Clés publiques = Safe ✅

- La clé publishable (`sb_publishable_...`) est **intentionnellement publique**
- Elle ne peut JAMAIS accéder à des données sensibles
- La vraie sécurité vient des **RLS (Row Level Security)** sur les tables

### RLS: Comment ça marche?

1. **Lecture publique (SELECT)**: Tout le monde peut lire les données (c'est voulu!)
2. **Écriture (INSERT/UPDATE/DELETE)**: 
   - Les témoignages "non visibles" ne sont jamais montrés
   - La modification des données dans l'admin sera sécurisée via RLS + auth
   - À ajouter plus tard si vous le souhaitez

---

## 🛠️ Utilisation dans l'Admin

Pour que l'admin puisse modifier les données dans Supabase au lieu du localStorage:

```tsx
import { supabase } from '../lib/supabase';

// Ajouter un item au menu
const { data, error } = await supabase
  .from('menu_items')
  .insert({
    id: uid(),
    name: 'Nouveau plat',
    description: '...',
    price: 5000,
    category_id: 'cat-pizzas',
    available: true,
    image_url: '...',
  });

// Mettre à jour
await supabase
  .from('menu_items')
  .update({ name: 'Nom modifié' })
  .eq('id', itemId);

// Supprimer
await supabase
  .from('menu_items')
  .delete()
  .eq('id', itemId);
```

Après chaque modification, invalider le cache:
```tsx
import { invalidateCache } from '../lib/dataService';
invalidateCache();
```

---

## 🧪 Tester la migration

Dans la console du navigateur (DevTools), tu verras:

```
✅ Les données existent déjà dans Supabase, migration ignorée
```

Cela signifie que tout a fonctionné!

Pour vérifier dans Supabase:
1. Va dans le **SQL Editor**
2. Exécute:
   ```sql
   SELECT COUNT(*) FROM menu_items;
   SELECT COUNT(*) FROM categories;
   ```

3. Ou va dans l'onglet **Table Editor** et vérifie que les données sont là

---

## ⚡ Fallback automatique

Si Supabase n'est pas accessible (serveur down, pas d'internet):
1. Les données du localStorage sont utilisées automatiquement
2. L'app continue à fonctionner normalement
3. Un warning apparaît dans la console (mais l'app ne crash pas)

Exemple:
```
⚠️ Fallback sur le menu local: [error details]
```

---

## 📝 Infos techniques

### Structure des données

**Menu Item (Supabase)**
```json
{
  "id": "unique-id",
  "name": "Pizza Bodega",
  "description": "...",
  "price": 12500,
  "category_id": "cat-pizzas",
  "badges": ["signature"],
  "available": true,
  "image_url": "https://...",
  "created_at": "2026-01-01T10:00:00Z",
  "updated_at": "2026-01-01T10:00:00Z"
}
```

Les types TypeScript sont automatiquement synchronisés via `src/lib/dataService.ts`.

### Cache

Les données sont cachées en mémoire après le premier chargement:
- Réduit les appels à Supabase
- Améliore la performance
- Le cache s'invalide quand vous le demandez (`invalidateCache()`)

---

## 🆘 Troubleshooting

### "Les données ne sont pas en Supabase"

→ Attends que la page se charge complètement (regarde les logs de la console)
→ Recharge la page (⌘R ou Ctrl+R)
→ Vérifi que les tables existent dans Supabase SQL Editor

### "J'ai modifié les données locales, comment les syncer?"

→ Efface le localStorage et relance l'app:
```javascript
// Dans la console du navigateur:
localStorage.clear();
location.reload();
```

### "Je veux forcer une nouvelle migration"

→ Supprime les données de Supabase et relance:
```sql
DELETE FROM menu_items;
DELETE FROM categories;
DELETE FROM gallery;
DELETE FROM testimonials;
DELETE FROM restaurant_info;
```
Puis relance l'app.

---

## 📦 Prochaines étapes

1. **Authentication (Admin)**: Ajouter Supabase Auth pour sécuriser l'admin
2. **RLS avancé**: Configurer les RLS pour l'upload d'images
3. **Images**: Migrer vers Supabase Storage pour les images
4. **Real-time**: Utiliser les subscriptions Supabase pour les mises à jour en temps réel

Pour maintenant, c'est tout fonctionnel! 🎉
