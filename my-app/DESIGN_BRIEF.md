# EQDOM REDESIGN — PARCOURS DISRUPTIF
## Direction Créative & UX Blueprint

---

## 🎨 IDENTITÉ VISUELLE

### Palette (Évolution Eqdom)
```
Fond Principal    : #0A0A0A (Noir profond)
Fond Secondaire   : #111111 (Charbon)
Accent Primaire   : #AB0017 (Eqdom Red — néon glow)
Accent Secondaire : #FF1A3E (Red clair pour hover)
Texte Principal   : #FFFFFF
Texte Secondaire  : #888888
Succès            : #00FF88 (Vert néon)
Warning           : #FFB800 (Or)
Glass             : rgba(255,255,255,0.03) + backdrop-blur(20px)
```

### Atmosphère
- **Dark mode immersif** — pas de blanc pur sauf textes importants
- **Glow effects** — le rouge Eqdom émet une lueur diffuse (box-shadow: 0 0 40px rgba(171,0,23,0.4))
- **Glassmorphism radical** — cards flottantes avec blur 40px et bordures 0.5px blanc à 10%
- **Profondeur** — Z-layers multiples, ombres portées colorées

---

## 🎬 STRUCTURE DU PARCOURS

### GLOBAL
- **One-page scroll** avec snap points (scroll-snap-type: y mandatory)
- **Navigation invisible** — pas de header fixe, juste un indicateur de progression vertical à droite
- **Transitions morphing** — les éléments se transforment plutôt que disparaître/réapparaître

---

## SECTION 1: PORTAL (Hero)

### Layout
```
┌─────────────────────────────────────┐
│                                     │
│    ✦  PARTICULES DORÉES           │
│         (suivent souris)           │
│                                     │
│         ┌─────────────┐            │
│         │   EQDOM     │            │
│         │   LOGO      │  ← Pulse   │
│         │   (glow)    │            │
│         └─────────────┘            │
│                                     │
│    "Votre crédit,                  │
│     réinventé."                    │
│                                     │
│         [ ENTREZ ]                 │
│      ← bouton magnetic →           │
│                                     │
│    ↓ Scroll pour descendre         │
│                                     │
└─────────────────────────────────────┘
```

### Animations
- **Particules** : 50 points dorés qui réagissent à la souris (repulsion/attraction)
- **Logo** : Pulse lent (scale 1.0 → 1.02) avec glow pulsant
- **Titre** : Reveal lettre par lettre avec stagger 50ms, easing expo
- **CTA** : Effet magnetic (suit le curseur dans radius 100px), hover = glow rouge intense

### Interaction
- Au clic "Entrez" : Zoom transition (scale 1 → 10 sur le bouton) qui révèle la section suivante

---

## SECTION 2: SIMULATION HOLOGRAPHIQUE

### Layout (Split Asymétrique)
```
┌─────────────────────────────────────┐
│ ┌──────────────┐  ┌──────────────┐ │
│ │              │  │              │ │
│ │   VISUEL     │  │  INTERACTION │ │
│ │   3D         │  │              │ │
│ │              │  │  Montant     │ │
│ │  Carte de    │  │  ┌────────┐  │ │
│ │  crédit      │  │  │50 000dh│  │ │
│ │  flottante   │  │  └────────┘  │ │
│ │              │  │              │ │
│ │  Rotation    │  │  [========]  │ │
│ │  selon       │  │   Slider     │ │
│ │  scroll      │  │   magnetic   │ │
│ │              │  │              │ │
│ │              │  │  Durée       │ │
│ │              │  │  ●12 ●24 ●36 │ │ │
│ │              │  │              │ │
│ └──────────────┘  └──────────────┘ │
└─────────────────────────────────────┘
```

### Visuel 3D (Gauche)
- **Carte de crédit Eqdom** : Design premium noir mat avec puce holographique
- **Rotation** : La carte tourne sur Y selon le scroll (0-360° sur la section)
- **Réaction au montant** :
  - < 30K : Glow bleu froid (calme)
  - 30K-100K : Glow doré (standard)
  - > 100K : Glow rouge Eqdom (premium)
- **Particles** : Petits + qui s'élèvent de la carte comme de la chaleur

### Interaction (Droite)
- **Input montant** : Pas de champ texte classique. Un nombre "flottant" avec effet de compteur qui roule
- **Slider** : Track invisible, thumb qui brille. Au drag, traînée lumineuse rouge
- **Sélecteur durée** : Ronds qui se remplissent avec animation liquide
- **Mensualité** : Apparaît en grand sous les contrôles, chiffre qui "pop" avec effet élastique

### Micro-interactions
- Hover sur la carte : Elle s'incline vers la souris (3D tilt)
- Changement de montant : Shake subtil de la carte + changement de glow

---

## SECTION 3: SCANNER IDENTITÉ

### Layout
```
┌─────────────────────────────────────┐
│                                     │
│    ┌─────────────────────────┐      │
│    │                         │      │
│    │    ░░░░░░░░░░░░░░░░    │      │
│    │    ░  ┌──────────┐  ░    │      │
│    │    ░  │          │  ░    │      │
│    │    ░  │  PHOTO   │  ░    │ ← Scan
│    │    ░  │  CADRE   │  ░    │   effect
│    │    ░  │          │  ░    │      │
│    │    ░  └──────────┘  ░    │      │
│    │    ░░░░░░░░░░░░░░░░    │      │
│    │                         │      │
│    └─────────────────────────┘      │
│                                     │
│    Scan biométrique...              │
│    ████████████░░ 80%               │
│                                     │
│    ↓ Auto-scroll quand complete     │
│                                     │
└─────────────────────────────────────┘
```

### Concept
- **Faux scan** : Cadre style scanner de film sci-fi avec lignes de scan qui descendent
- **Progression** : Barre circulaire autour du cadre qui se remplit
- **Data reveal** : Une fois scanné (2s), les champs se remplissent avec effet Matrix (caractères random qui se stabilisent)

### Champs (après scan)
- Affichés un par un avec stagger
- Nom, Prénom, Date naissance, ID
- Style : Monospace, fond glass, texte blanc

---

## SECTION 4: SCORING — LE CŒUR

### Layout
```
┌─────────────────────────────────────┐
│                                     │
│         ┌───────────┐               │
│         │           │               │
│         │    ♥      │  ← Cœur      │
│         │   /‾\     │    digital   │
│         │   \__/    │               │
│         │           │               │
│         └───────────┘               │
│                                     │
│    "Votre profil brille"            │
│                                     │
│    ┌──────────────────────────┐    │
│    │  Analyse en cours...     │    │
│    │  • Revenus ✓            │    │
│    │  • Historique ✓         │    │
│    │  • Projet ✓             │    │
│    │                          │    │
│    │  SCORE: 88/100           │    │
│    └──────────────────────────┘    │
│                                     │
│    [Pack D0] ← documents nécessaires│
│                                     │
└─────────────────────────────────────┘
```

### Visuel Cœur
- **SVG animé** : Forme organique qui pulse (morphing légér entre 3 formes)
- **Couleur dynamique** :
  - Score 80+ : Vert néon #00FF88, pulsation rapide (bonne santé)
  - 60-79 : Or #FFB800, rythme moyen
  - < 60 : Rouge Eqdom, pulsation lente mais stable (rassurant)
- **Glow** : Halo coloré qui pulse avec le cœur

### Feedback
- Checklist qui apparaît avec animation "check" dessiné (stroke-dasharray)
- Score révélé avec compteur (0 → 88 en 1.5s)
- **Pas de langage négatif** — même si rouge, message = "On personnalise votre offre"

---

## SECTION 5: DOCUMENTS — GRAVITÉ ZÉRO

### Layout
```
┌─────────────────────────────────────┐
│                                     │
│    Vos justificatifs                │
│                                     │
│    ┌─────┐  ┌─────┐  ┌─────┐       │
│    │     │  │     │  │     │       │
│    │ ID  │  │ RIB │  │ BUL │       │
│    │     │  │     │  │     │       │
│    │ 📄  │  │ 📄  │  │ 📄  │       │
│    │     │  │     │  │     │       │
│    └─────┘  └─────┘  └─────┘       │
│      ↑         ↑         ↑          │
│    flottent comme en apesanteur     │
│                                     │
│    [ Déposez vos fichiers ici ]     │
│    Zone de drop active                │
│                                     │
└─────────────────────────────────────┘
```

### Concept
- **Cards flottantes** : Les documents requis flottent avec animation "breathing" (up/down subtil)
- **État initial** : Contours pointillés rouges (manquant)
- **Upload simulé** : Fichier glissé = trajectory curve vers la card, puis :
  - Card devient verte
  - Checkmark qui apparaît avec animation "cercle se dessinant"
  - Petit effet de confettis

### Interactions
- **Drag & drop** : Visuellement riche, ombre portée qui suit
- **Click upload** : Ouvre file picker, simulation de loading avec cercle de progression
- **"Simuler illisible"** : Bouton caché pour démo — transforme le doc en "corrompu" avec effet glitch

---

## SECTION 6: CONTRAT — SIGNATURE RITUEL

### Layout
```
┌─────────────────────────────────────┐
│                                     │
│    ┌─────────────────────────┐      │
│    │    CONTRAT EQDOM        │      │
│    │                         │      │
│    │    Montant: 50 000 dh   │      │
│    │    Mensualité: 2 396 dh │      │
│    │    TAEG: 4.9%           │      │
│    │                         │      │
│    │    ━━━━━━━━━━━━━━━━━━   │      │
│    │    Signez ci-dessous    │      │
│    └─────────────────────────┘      │
│                                     │
│    ┌─────────────────────────┐      │
│    │                         │      │
│    │   ✍️ CANVAS SIGNATURE   │      │
│    │                         │      │
│    │   Traînée lumineuse     │      │
│    │   quand on signe        │      │
│    │                         │      │
│    └─────────────────────────┘      │
│                                     │
│    [ VALIDER ] ← glow pulse         │
│                                     │
└─────────────────────────────────────┘
```

### Concept
- **Contrat stylisé** : Card glass avec texte en monospace, look "document confidentiel"
- **Canvas signature** : 
  - Fond noir légèrement texturé
  - Quand on signe : trait blanc avec glow rouge subtil
  - Effet "encre fraîche" qui brille
- **Validation** : 
  - Au clic, freeze de 0.5s (tout s'arrête)
  - Puis explosion de particules dorées
  - Badge "MEMBRE EQDOM" qui apparaît en grand

---

## SECTION 7: CONFIRMATION — CATHARSIS

### Layout
```
┌─────────────────────────────────────┐
│                                     │
│         🎉 CONFETTIS 🎉            │
│                                     │
│    ┌─────────────────────────┐      │
│    │                         │      │
│    │   CRÉDIT APPROUVÉ       │      │
│    │                         │      │
│    │   Ref: EQD-XXXXX        │      │
│    │                         │      │
│    │   ┌─────────────────┐   │      │
│    │   │  CARTE MEMBRE   │   │      │
│    │   │  ┌───────────┐  │   │      │
│    │   │  │ PHOTO     │  │   │      │
│    │   │  │ NOM       │  │   │      │
│    │   │  └───────────┘  │   │      │
│    │   │                 │   │      │
│    │   │  ████████████   │   │      │
│    │   │  █ EQDOM  ███   │   │      │
│    │   └─────────────────┘   │      │
│    │                         │      │
│    └─────────────────────────┘      │
│                                     │
│    Déblocage dans:                  │
│    ━━━━━━━━━━━━━━━━━━━              │
│    24:00:00  ← sablier digital      │
│                                     │
│    [ Télécharger contrat ]          │
│                                     │
└─────────────────────────────────────┘
```

### Récompense
- **Carte membre** : Générée avec nom/prénom, style premium noir avec puce holographique
- **Confettis** : Explosion au centre qui retombe (canvas particles)
- **Timeline finale** : Les étapes parcourues s'illuminent une par une
- **Compte à rebours** : Style "sablier digital" avec chiffres qui tournent

---

## 🎯 SPÉCIFICATIONS TECHNIQUES

### Stack
- **Framework** : Next.js 14 + TypeScript
- **Styling** : Tailwind + CSS custom properties
- **Animations** : GSAP (ScrollTrigger, MorphSVG) + Framer Motion
- **3D** : Three.js (pour la carte de crédit flottante)
- **Particules** : Canvas API ou tsParticles

### Performance
- **Lazy loading** : Three.js chargé uniquement pour la section simulation
- **Will-change** : Sur éléments animés intensivement
- **Reduced motion** : Fallback pour utilisateurs sensibles

### Responsive
- **Desktop** : Split-screen, effets 3D complets
- **Tablet** : Stack vertical, 3D simplifié
- **Mobile** : Swipe-based, particules réduites, pas de 3D

---

## 🔊 SON (optionnel mais recommandé)
- **UI clicks** : Short "tick" satisfaisant (80ms)
- **Success** : Accord ascendant 3 notes
- **Hover buttons** : Subtile montée de fréquence (pas de click, juste feedback)
- **Scroll** : Ambiance très subtile (pad spatial)

---

## ⚡ DIFFÉRENCIATEURS CLÉ

1. **Pas de "formulaire"** — tout est visuel, tactile, immersif
2. **Pas de chiffres secs** — métaphores (cœur, gravité, scanner)
3. **Pas de pages** — scroll infini avec morphing
4. **Récompense émotionnelle** — la carte membre à la fin = loot box
5. **Personnalisation temps réel** — la carte change selon tes choix

---

**Prêt à générer ça ?** Je commence par la structure de base + les composants clés (Hero + Simulation). Dis-moi si tu veux des ajustements sur ce draft d'abord.
