# 🚀 Mission Control Dashboard

Dashboard web professionnel de monitoring d'agents AI, inspiré des interfaces NASA/SpaceX Mission Control.

![Dashboard Preview](https://img.shields.io/badge/Dashboard-Mission%20Control-blue?style=for-the-badge&color=00d4ff)
![Version](https://img.shields.io/badge/Version-1.0.0-cyan?style=for-the-badge&color=00f0ff)
![License](https://img.shields.io/badge/License-MIT-magenta?style=for-the-badge&color=ff00ff)

## ✨ Features

### 🎯 Agents en Temps Réel
- Visualisation live de 3 agents AI (Henry, Aiman, Junior)
- Statuts dynamiques (Online/Working/Idle) avec indicateurs visuels
- Activités simulées qui changent toutes les 3-5 secondes
- Timestamps des dernières actions
- Modal détaillé par agent

### 📊 Stats Globales
- Compteurs animés (tokens, tâches, uptime, coût)
- Graphique d'activité sur 7 jours
- Taux de consommation en temps réel
- 99.9% uptime monitoring

### 👥 Équipe & Fonctions
- Profils détaillés de chaque agent
- Compétences et tags
- Statistiques personnelles
- Description des rôles

### 🎨 Design
- **Dark mode** professionnel cyberpunk
- Gradients bleu/cyan/magenta
- Glassmorphism et effets néon
- Animations fluides CSS/JS
- Responsive (mobile + desktop)
- Grid background animé
- Scanlines rétro-futuristes

## 🚀 Déploiement GitHub Pages

### Méthode 1: Déploiement rapide (recommandé)

1. **Créer un nouveau repository** sur GitHub

2. **Cloner le repository**:
```bash
git clone https://github.com/votre-username/votre-repo.git
cd votre-repo
```

3. **Copier les fichiers** dans le repo:
```bash
# Créer le dossier docs
cp -r docs/ ./
```

4. **Configurer GitHub Pages**:
   - Allez dans **Settings** > **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **master** → **/docs folder**
   - Cliquez **Save**

5. **Push les changements**:
```bash
git add docs/
git commit -m "Initial commit: Mission Control Dashboard"
git push origin main
```

6. **Accéder au dashboard**:
   - Attendez 1-2 minutes
   - URL: `https://votre-username.github.io/votre-repo/`

### Méthode 2: GitHub Actions (automatique)

Créer `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './docs'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Puis dans **Settings** > **Pages** → Source: **GitHub Actions**

## 📁 Structure du Projet

```
docs/
├── index.html          # Application complète (single page)
├── README.md           # Ce fichier
└── assets/             # Images/fichiers statiques (optionnel)
```

## 🛠️ Technologies

- **HTML5** - Structure sémantique
- **Tailwind CSS** (CDN) - Styling utility-first
- **Vanilla JavaScript** - Logique temps réel
- **Font Awesome** (CDN) - Icônes
- **Google Fonts** - Typography (Inter + JetBrains Mono)

## 🎮 Simulation Temps Réel

Le dashboard simule une activité live:

- **Changements d'activité**: Toutes les 3-5 secondes
- **Changements de statut**: Aléatoires avec notifications toast
- **Incrémentation tokens**: Pour les agents "working"
- **Compteurs globaux**: Animation continue

## 📝 Personnalisation

### Modifier les agents
Éditer le tableau `agents` dans `index.html`:

```javascript
const agents = [
  {
    id: 'votre-agent',
    name: 'Nom',
    role: 'Rôle',
    avatar: '🔥',
    status: 'online',
    // ...
  }
];
```

### Modifier les couleurs
Dans le `tailwind.config` (script inline):

```javascript
colors: {
  'cyber-blue': '#00d4ff',
  'cyber-cyan': '#00f0ff',
  'cyber-magenta': '#ff00ff',
  // ...
}
```

### Modifier les données du graphique
```javascript
const weeklyData = {
  tokens: [8200, 12450, ...],  // 7 valeurs
  tasks: [28, 45, ...]         // 7 valeurs
};
```

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 colonne)
- **Tablet**: 640px - 1024px (2 colonnes)
- **Desktop**: > 1024px (3 colonnes)

## 🔮 Prochaines Features

- [ ] Connexion WebSocket temps réel
- [ ] API backend pour données live
- [ ] Dark/Light mode toggle
- [ ] Export des statistiques
- [ ] Historique des activités
- [ ] Alertes configurables

## 📄 License

MIT License - Libre d'utilisation et modification.

---

<div align="center">

**[🌐 Voir la démo](https://votre-username.github.io/votre-repo/)**

*Built with 💙 for AI Agents*

</div>