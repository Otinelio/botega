🍕🌿 LA BODEGA LOMÉ — BRIEF DE DIRECTION ARTISTIQUE COMPLET
Prompt Lovable — Site Web Restaurant Premium Afro-Contemporain
Version 1.0 — Mai 2026

---

🎯 VISION DU PROJET

Crée un site web restaurant premium afro-contemporain pour La Bodega Lomé, un restaurant-pizzeria-lounge bar situé Rue Baka, Quartier Avenou, Lomé (Togo). Le site doit dégager une ambiance de fine dining tropical moderne : chaleureux, spacieux, élégant, vivant. Il doit donner immédiatement envie d'y aller, de réserver une table, de commander un cocktail.

Le site comporte 3 volets distincts :
1. Site vitrine mobile-first (pages publiques)
2. Dashboard admin à `/admin` (protégé par mot de passe hardcodé)
3. Page menu scan à `/menu/scan` (accessible via QR code en salle)

Le slogan principal est : « Vos journées s'adoucissent, vos soirées s'illuminent »

---

🎨 DIRECTION ARTISTIQUE GLOBALE

Style : Warm Minimal Luxury × African Modern Fine Dining
Mood : Teck vieilli, rotin doré, brasier au coucher du soleil, herbes fraîches sur planche en bois sombre, verres à cocktail givrés, pelouse de mini-golf la nuit sous lanternes, fumée d'une grillade au charbon, lumières Edison en terrasse.

---

🎨 PALETTE DE COULEURS (STRICTE)

```
--color-primary:       #E07A5F   /* Terracotta chaud — CTA, accents principaux */
--color-primary-deep:  #C05A3F   /* Terracotta foncé — hover */
--color-gold:          #D4AF37   /* Or — titres hero, bordures premium */
--color-gold-light:    #F0D060   /* Or clair — highlights */
--color-earth-dark:    #2C1810   /* Brun très foncé — fond hero, navbar */
--color-earth-mid:     #5C3A28   /* Brun moyen — cartes sombres */
--color-beige:         #EDE4D5   /* Beige sable — fond principal */
--color-beige-warm:    #F7F0E8   /* Beige très clair — sections alternées */
--color-olive:         #2E7D59   /* Vert olive — badges */
--color-night:         #1E3A5F   /* Bleu nuit — lounge, footer */
--color-text-dark:     #1F1F1F   /* Anthracite — textes principaux */
--color-text-light:    #F5F0E8   /* Blanc cassé — textes sur fond sombre */
```

---

🔤 TYPOGRAPHIE

```
Titres / hero     → Playfair Display 700-900 (Google Fonts)
Sous-titres       → Cormorant Garamond 600 Italic
Corps de texte    → Inter 400, 16-18px, line-height 1.8
Prix / labels     → Poppins 600, terracotta
Slogan / citations → Great Vibes 400, 36px, gold

Hiérarchie :
  h1 → Playfair 900, 72-96px, color: gold ou beige
  h2 → Playfair 700, 48-64px, color: earth-dark ou beige
  h3 → Cormorant Garamond 600 Italic, 32px
```

---

✨ ANIMATIONS & INTERACTIONS

```
Scroll animations :
  - Fade-in + translateY(30px)→0 sur chaque section
  - Stagger children : 0.08s entre chaque élément

Hero :
  - Parallax background à 0.3x vitesse scroll
  - Reveal texte avec clip-path ou opacity
  - Particules dorées flottantes très subtiles (opacity 0.12)

Hover cartes plats :
  - scale(1.04) + shadow amplifiée + saturation +20%
  - Overlay terracotta semi-transparent avec icône "+"

Hover boutons :
  - Background slide gauche→droite (pseudo-element)
  - Texte inverse couleur

Hover galerie :
  - Zoom scale(1.08) + overlay earth-dark/50%
  - Icône loupe 🔍 or centrée

CTA principal :
  - Shimmer doré en boucle toutes les 3s

Navbar :
  - Transparente → earth-dark 95% + backdrop-blur: 12px au scroll
  - Underline animée width 0→100% au hover
```

---

📱 DESIGN SYSTEM

Boutons

```
Primary :
  background: #E07A5F  |  color: white  |  border-radius: 2px
  padding: 14px 32px  |  font: Poppins 600 15px  |  uppercase
  shadow: 0 4px 20px rgba(224,122,95,0.4)

Ghost :
  border: 1.5px solid #D4AF37  |  color: gold
  hover → background: gold, color: dark

Outline (sections sombres) :
  border: 1.5px solid beige  |  color: beige
```

Cartes plats

```
background: white  |  border-radius: 16px  |  overflow: hidden
shadow: 0 8px 40px rgba(44,24,16,0.12)  |  border-top: 3px solid terracotta
```

Badges

```
"Nouveau"    → terracotta  |  "Populaire" → gold ★
"Végétarien" → olive 🌿   |  "Signature" → outline gold
```

---

🖥️ VOLET 1 — SITE VITRINE PUBLIC

HERO FULLSCREEN (100vh)

```
Fond : photo panoramique La Bodega (terrasse/intérieur, warm evening light)
Overlay : linear-gradient(135deg, rgba(44,24,16,0.85) 0%, rgba(30,58,95,0.4) 100%)

Contenu centré :
  Logo La Bodega (or/SVG)
  « RESTAURANT · PIZZERIA · LOUNGE »  [Poppins 500, or, 14px, letter-spacing 0.3em]
  "Vos journées s'adoucissent,
   vos soirées s'illuminent"          [Playfair 900, 72-88px, blanc]
  "Rue Baka · Quartier Avenou · Lomé" [Inter 400, 16px, beige/70%]
  [RÉSERVER UNE TABLE] [VOIR LE MENU] [boutons CTA + ghost]

Scroll indicator : chevron bouncing en bas, couleur or

Navbar :
  Logo gauche (blanc/or) | Menu · Expériences · Galerie · Contact | CTA "Réserver"
  Mobile : hamburger → drawer earth-dark
  Au scroll >80px : fond earth-dark/95% + backdrop-blur
```

ABOUT — NOTRE HISTOIRE

```
Layout 2 colonnes (desktop) | stack mobile
Fond : beige #EDE4D5

Image gauche :
  border-radius 24px, ombre profonde
  Badge flottant : "⭐ Ouvert depuis 2020"
  Petite image secondaire décalée bas-droite (cocktail)

Texte droite :
  Label : "NOTRE HISTOIRE" [Poppins 600, terracotta, 12px uppercase]
  Titre : "Un endroit où chaque moment devient souvenir" [Playfair 700, 48px]
  Description La Bodega — restaurant, pizzeria, lounge, mini-golf, projections matchs.
  3 piliers avec icônes :
    🍕 Pizzas & Grillades Artisanales
    🍹 Cocktails & Lounge Bar
    ⛳ Mini-Golf & Projections Matchs
  Chiffres clés animés : 10h–00h | 7j/7 | +50 plats | Mini-Golf
  CTA ghost : "Découvrir nos expériences →"
```

SIGNATURE DISHES

```
Fond : earth-dark #2C1810

Header :
  Label : "CARTE SIGNATURE" [or, 12px uppercase]
  Titre : "Des saveurs qui racontent l'Afrique & le Monde" [Playfair, blanc, 56px]
  Sous-titre : [Inter, beige/70%]

Tabs filtres :
  [ Tout ] [ 🍕 Pizzas ] [ 🔥 Grillades ] [ 🌍 Plats Africains ] [ 🍹 Cocktails ]
  Pills : selected=terracotta | unselected=transparent+border beige

Grille 3 col desktop / 2 tablette / 1 mobile :
  Card :
    Photo HD (300px) | Badge | Nom [Playfair, blanc, 20px]
    Description [Inter, beige/60%, 14px, 2 lignes]
    Badge catégorie | Prix [Poppins 700, terracotta]
    [Commander →] → lien WhatsApp/menu-scan
  Fond card : #3D2015 | Hover : scale(1.04), border-top illuminée

Plats initiaux :
  PIZZAS : Margherita 3500 XOF | Bodega Spéciale 4500 XOF | 4 Fromages 4000 XOF
  GRILLADES : Côtes d'agneau 7500 XOF | Poulet Yassa Grillé 5500 XOF | Brochettes 4500 XOF
  AFRICAINS : Fufu Sauce Arachide 3000 XOF | Riz Jollof Crevettes 4000 XOF
  COCKTAILS : Bodega Sunrise 2500 XOF | Mojito Tropical 2800 XOF | Ti'punch Togo 2000 XOF
```

EXPÉRIENCES

```
Fond : beige-warm #F7F0E8
3 grandes cartes :

Card 1 — Restaurant & Pizzeria :
  Icône 🍕 terracotta | Titre "Saveurs du Monde"
  Texte : cuisines africaine et européenne, pizzas artisanales, grillades

Card 2 — Lounge Bar (fond earth-mid) :
  Icône 🍹 or | Titre "Lounge & Cocktails"
  Texte : bar à cocktails, musique d'ambiance, lumières tamisées

Card 3 — Mini-Golf & Matchs :
  Icône ⛳ olive | Titre "Mini-Golf & Sport"
  Texte : mini-golf ou matchs sur grand écran

Hover : translateY(-8px) + ombre amplifiée
```

GALERIE IMMERSIVE

```
Fond : earth-dark #2C1810
Titre : "Notre Univers en Images" [Playfair, or]

Masonry grid asymétrique (pas de grille uniforme) :
  1 image hero large | 2 images moyennes | 3 petites | 1 portrait
  Desktop : 3 colonnes | Mobile : 2 col ou scroll horizontal

Hover : zoom scale(1.08) + overlay 50% + icône 🔍 or
Lightbox : modal fullscreen avec nav prev/next

CTA : "Suivez-nous @labodega_tg →" [bouton outline or + logo Instagram]
```

RÉSERVATION CTA

```
Fond pleine largeur : image de fond soir + overlay gradient terracotta→earth-dark

Contenu centré :
  🕙 "Ouvert tous les jours · 10h00 – 00h00"
  "Réservez votre table dès maintenant" [Playfair 900, 64px, blanc/or]
  "Rue Baka · Quartier Avenou · Lomé"

  [📞 APPELER +228 99 99 99 56] [💬 WHATSAPP] ← 2 CTA

  ── ou remplissez le formulaire ──
  Champs : [Prénom & Nom] [Date] [Heure] [Nb personnes] [Message]
  Bouton : [ENVOYER MA RÉSERVATION →]
  → Génère un lien wa.me/22899999956?text=... pré-rempli

Inputs : fond earth-mid | border beige/30% | focus: border terracotta
```

TÉMOIGNAGES

```
Fond : beige #EDE4D5
Header : "Ce que disent nos clients" + ★★★★★ "4.8/5 · Plus de 200 avis"

Carousel 3 slides desktop / 1 mobile :
  Card : grande guillemet or | texte | nom client + étoiles + lieu
  Fond card : beige-warm | border-left: 4px solid gold | Cormorant Garamond Italic

3 témoignages :
  1. "Pizza Bodega Spéciale, cocktails divins, mini-golf le soir... que demander de plus ?" — Ama K. ⭐⭐⭐⭐⭐
  2. "Ambiance exceptionnelle, staff aux petits soins, parfait pour sorties en famille." — Jean-Paul M. ⭐⭐⭐⭐⭐
  3. "Le seul endroit à Lomé où on mange bien ET on regarde le match. Incroyable!" — Sélom D. ⭐⭐⭐⭐⭐

Navigation : flèches terracotta + dots | Auto-play 4s, pause hover
```

FOOTER

```
Fond : #1A0F0A (brun quasi-noir)
4 colonnes :

Col 1 — Identité :
  Logo La Bodega (or) | "Restaurant · Pizzeria · Lounge"
  Slogan | [Instagram @labodega_tg]

Col 2 — Navigation :
  Accueil | Menu | Expériences | Galerie | Réservation | Contact

Col 3 — Infos :
  📍 Rue Baka, Quartier Avenou, Lomé, Togo
  📞 +228 99 99 99 56
  ⏰ Lundi–Dimanche · 10h00–00h00
  💬 WhatsApp [lien direct]

Col 4 — Carte :
  Google Maps embed iframe
  "Voir l'itinéraire →"

Bas : © 2026 La Bodega Lomé | texte beige/30%
```

---

🔐 VOLET 2 — DASHBOARD ADMIN `/admin`

```
Mot de passe hardcodé : "bodega2026"
localStorage key auth : "bodega_admin_auth" = "true"
Si non auth → modal login plein écran (impossible de dismiss)
Si auth → dashboard complet

Sidebar :
  Fond : bleu nuit #1E3A5F
  Logo La Bodega (petit)
  Items :
    📊 Tableau de bord
    🍕 Gérer le menu
    📂 Catégories
    📸 Galerie
    📋 Témoignages
    ⚙️ Infos restaurant
    🚪 Déconnexion
  Hover item : fond terracotta | Actif : fond terracotta, texte blanc
  Mobile : sidebar → hamburger drawer

Fond global admin : #F4F1EC (beige clair)
Cards : blanc | radius 12px | shadow subtile
Inputs : border #E0D5C5 | focus terracotta
Boutons primaires : terracotta | Destructeurs : rouge

--- PAGE Tableau de bord ---
Cards stats : [N] plats | [N] catégories | Horaires | Téléphone
Accès rapides aux sections

--- PAGE Gérer le menu ---
Tabs par catégorie
Liste : photo miniature | nom | catégorie | prix | badges | [✏️] [🗑️]
Bouton "➕ Ajouter un plat" → modal/inline form :
  Champs : nom, description, prix (XOF), catégorie, badges, disponible (toggle), URL photo
  Validation : nom et prix requis
  Sauvegarde : localStorage "bodega_menu"

--- PAGE Catégories ---
Liste : nom, icône emoji, ordre
CRUD complet | Stockage : localStorage "bodega_categories"
Défaut : Pizzas 🍕 | Grillades 🔥 | Africains 🌍 | Cocktails 🍹 | Desserts 🍮 | Softs 🥤

--- PAGE Galerie ---
Grid images (URL + caption) | Ajouter/supprimer
localStorage "bodega_gallery"

--- PAGE Témoignages ---
Liste | Ajouter/modifier/supprimer
Champs : nom, texte, note 1-5★, lieu, toggle afficher
localStorage "bodega_testimonials"

--- PAGE Infos Restaurant ---
Formulaire : nom, slogan, adresse, téléphone, WhatsApp, Instagram, horaires, description
Bouton "💾 Enregistrer" → localStorage "bodega_infos"
```

---

📱 VOLET 3 — PAGE MENU SCAN `/menu/scan`

```
Accès : URL directe uniquement (QR code sur tables physiques)

MODAL TABLE BLOQUANT (au chargement) :
  Overlay earth-dark/90% backdrop-blur | Impossible de fermer sans numéro
  Card : Logo | "Bienvenue 👋" | "Entrez votre numéro de table"
  Input number grand centré (border terracotta)
  Bouton "Confirmer →" terracotta
  Numéros valides : 1–50
  Stockage : sessionStorage "bodega_table_number"

Badge permanent : "🪑 Table N°[X]" en haut-droite (fond terracotta)

MENU COMPLET :
  Header simplifié : Logo + "Notre Menu" + badge table (pas de navbar complète)
  Tabs catégories (même style que site principal)
  Grille plats : même design cards que Signature Dishes

  Bouton "🛒 Commander" sur chaque plat → ajoute au panier local

PANIER FLOTTANT :
  Bouton fixe bas-droite : icône panier + badge count (terracotta)
  Slide-up drawer :
    Fond beige | Liste articles avec (- N +) | Sous-total
    Textarea "Remarques / allergies"
    Bouton : "📲 Envoyer la commande WhatsApp"

Message WhatsApp généré auto :
  wa.me/22899999956?text=...

  "🍕 *Commande La Bodega*
   📍 Table N°[X]

   [Plat 1] × 2 → 7 000 XOF
   [Plat 2] × 1 → 2 500 XOF

   💰 Total : 9 500 XOF
   📝 Remarques : sans oignon svp

   Merci !"

Données menu : lues depuis localStorage "bodega_menu" (synchronisé avec admin)
```

---

⚙️ SPÉCIFICATIONS TECHNIQUES

```
Stack : React (Vite) ou Next.js
Styling : Tailwind CSS (config étendue palette La Bodega)
Animations : Framer Motion
Routing : React Router v6 ou Next.js App Router
State : React useState / useContext
Storage : localStorage (menu, galerie, infos, témoignages) + sessionStorage (table)
Images : Unsplash food photography (URLs warm-toned)
Icons : Lucide React
Fonts : Google Fonts (Playfair Display, Cormorant Garamond, Inter, Great Vibes, Poppins)
Maps : Google Maps iframe embed (statique)
WhatsApp : wa.me links (no API key needed)
Pas de backend — 100% frontend localStorage

Tailwind config extensions :
  colors: { terracotta: '#E07A5F', gold: '#D4AF37', 'earth-dark': '#2C1810', ... }
  fontFamily: { serif: ['Playfair Display'], sans: ['Inter'], script: ['Great Vibes'] }
  animation: { shimmer: '...', float: '...' }

SEO :
  title: "La Bodega Lomé — Restaurant · Pizzeria · Lounge Bar | Avenou, Lomé"
  description: "Restaurant africain, pizzeria artisanale et lounge bar à Avenou. 7j/7 10h–minuit. Mini-golf, projections matchs, cocktails."
  Keywords: restaurant Lomé, pizzeria Lomé, lounge bar Lomé, restaurant Avenou Lomé
```

---

📋 DONNÉES PAR DÉFAUT (seed localStorage)

```javascript
// Charger si localStorage vide

MENU :
  Pizzas : Margherita 3500 | Bodega Spéciale 4500 [signature] | 4 Fromages 4000 [populaire]
  Grillades : Côtes d'agneau 7500 [signature] | Poulet Yassa 5500 [populaire] | Brochettes 4500
  Africains : Fufu Arachide 3000 [végétarien] | Riz Jollof Crevettes 4000 [populaire]
  Cocktails : Bodega Sunrise 2500 [signature] | Mojito Tropical 2800 [nouveau] | Ti'punch 2000

INFOS :
  whatsapp: "22899999956"
  instagram: "@labodega_tg"
  phone: "+228 99 99 99 56"
  address: "Rue Baka, Quartier Avenou, Lomé, Togo"
  hours: "Ouvert tous les jours · 10h00 – 00h00"
  adminPassword: "bodega2026"
```

---

✅ CHECKLIST FINALE

```
✅ Responsive : 320px → 1920px
✅ Navbar sticky : transparent → earth-dark au scroll
✅ Hero fullscreen parallax + slogan animé
✅ About 2 colonnes + compteurs animés
✅ Grille plats + tabs filtres animés
✅ Section expériences 3 cards hover
✅ Galerie masonry + lightbox
✅ Réservation formulaire → WhatsApp
✅ Carousel témoignages autoplay
✅ Footer 4 colonnes + Google Maps embed
✅ /admin login "bodega2026" + sidebar bleu nuit
✅ CRUD menu, catégories, galerie, témoignages, infos
✅ /menu/scan modal table BLOQUANT
✅ Panier + envoi WhatsApp pré-formaté
✅ 100% localStorage (no backend)
✅ Framer Motion scroll animations
✅ Google Fonts chargées (Playfair, Cormorant, Inter, Great Vibes)
✅ SEO meta tags Lomé/Restaurant/Pizzeria
✅ Palette couleurs strictement respectée
✅ WhatsApp +22899999956 sur tous les CTA
✅ Shimmer animation sur CTA principal
```

---

Brief La Bodega Lomé · Rue Baka, Avenou, Lomé (Togo) · Mai 2026
Direction Artistique : Warm Minimal Luxury × African Modern Fine Dining
« Vos journées s'adoucissent, vos soirées s'illuminent »