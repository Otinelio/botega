# ⚡ Quick Start — Supabase Integration

## 3 étapes pour activer Supabase

### 1️⃣ Exécute le SQL dans Supabase (2 min)

```
📍 Va sur: https://supabase.com/dashboard
📍 Sélectionne ton projet
📍 Va dans SQL Editor
📍 Colle le contenu de: ./supabase-schema.sql
📍 Clique "Run"
```

✅ Tes tables sont créées!

---

### 2️⃣ Démarre le dev server

```bash
npm run dev
```

---

### 3️⃣ Laisse la migration se faire (automatique)

Console output:
```
🚀 Démarrage de la migration vers Supabase...
📦 Migration des catégories... ✅ 23 catégories migrées
🍽️  Migration du menu... ✅ 150+ items migrés
🖼️  Migration de la galerie... ✅ 7 images migrées
💬 Migration des témoignages... ✅ 3 témoignages migrés
🏪 Migration des infos du restaurant... ✅ Infos migrées
🎉 Migration complète !
```

---

## 🎯 C'est tout!

- ✅ Toutes tes données sont dans Supabase
- ✅ L'app charge depuis Supabase maintenant
- ✅ Si Supabase est down, ça fallback sur le local
- ✅ Zéro .env, zéro complication
- ✅ Ton app continue à fonctionner exactement comme avant

---

## 📊 Vérifier que ça marche

### Dans le navigateur:
1. Ouvre **DevTools** (F12)
2. Va dans l'onglet **Console**
3. Tu devrais voir les logs de migration
4. L'app charge normalement

### Dans Supabase:
1. Va dans **Table Editor**
2. Clique sur `menu_items`
3. Tu devrais voir ~150 items
4. Même pour les autres tables

---

## ❓ Questions?

Tout est documenté dans: `./SUPABASE_SETUP.md`

---

Enjoy! 🚀
