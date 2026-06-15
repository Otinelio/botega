# ✅ À faire MAINTENANT

## Étape 1: Exécute le SQL dans Supabase (2 minutes)

1. Ouvre: https://supabase.com/dashboard
2. Accède à ton projet: `ohmhfksoslpqblixarhp`
3. Va dans **SQL Editor** (menu à gauche)
4. Clique **New query** (en haut)
5. **Copie-colle** le contenu complet de ce fichier:
   ```
   ./supabase-schema.sql
   ```
6. Clique **Run** (ctrl + Enter)

✅ C'est fait! Les 5 tables sont créées avec les RLS.

---

## Étape 2: Démarre le serveur de dev

```bash
cd /home/othnelio/Site/botega
npm run dev
```

L'app démarre sur http://localhost:5174 (ou 5173, dépend)

---

## Étape 3: Observe la migration (automatique)

Ouvre **DevTools** (F12) → Console

Tu verras:
```
🚀 Démarrage de la migration vers Supabase...
📦 Migration des catégories... ✅ 23 catégories migrées
🍽️  Migration du menu... ✅ 150+ items de menu migrés
🖼️  Migration de la galerie... ✅ 7 images migrées
💬 Migration des témoignages... ✅ 3 témoignages migrés
🏪 Migration des infos du restaurant... ✅ Infos migrées
🎉 Migration complète !
```

**C'est complètement automatique** - l'app continue à fonctionner pendant ce temps.

---

## Étape 4: Vérifier que tout est dans Supabase (optionnel)

1. Retourne dans le **dashboard Supabase**
2. Clique sur **Table Editor** (menu à gauche)
3. Sélectionne `menu_items`
4. Tu devrais voir ~150 items
5. Fais pareil pour les autres tables

✅ Voilà! Toutes tes données sont dans Supabase.

---

## 🎯 Et ensuite?

L'app fonctionne exactement comme avant, MAIS:
- Les données sont maintenant dans Supabase ☁️
- Si tu modifies quelque chose localement, c'est dans le localStorage
- Quand tu veux que l'admin modifie via Supabase, je te montre comment faire

---

## 💡 Comment ça marche en arrière-plan?

1. App démarre → lance la migration (une seule fois)
2. Les données locales vont dans Supabase
3. Après, tout charge depuis Supabase avec fallback local
4. Si Supabase est down → l'app utilise le localStorage automatiquement
5. Zero downtime, zero breaking changes

---

## 🆘 Si tu as des questions

Tous les détails sont dans:
- **SUPABASE_SETUP.md** - Documentation complète
- **QUICKSTART.md** - Guide rapide
- **INTEGRATION_SUMMARY.md** - Vue d'ensemble technique

---

**That's it!** 🚀

3 étapes simples, c'est terminé.
