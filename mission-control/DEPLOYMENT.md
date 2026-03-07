# 🎯 Mission Control - Guide de Déploiement

## 📋 SOMMAIRE
1. [Solutions recommandées](#solutions)
2. [Déploiement rapide](#rapide)
3. [Mise à jour automatique](#auto)
4. [Dépannage](#debug)

---

## 🚀 SOLUTIONS RECOMMANDÉES {#solutions}

### Option 1: Netlify Drop ⭐ RECOMMANDÉ
**Avantage**: Aucune config, drag-and-drop, URL instantanée

```bash
# 1. Préparer le build
./deploy.sh

# 2. Ouvrir dans le navigateur
open https://app.netlify.com/drop

# 3. Glisser-déposer: /tmp/mission-control-build
```
✅ **Résultat**: URL en `https://xxxx.netlify.app` en 30 secondes

---

### Option 2: Cloudflare Pages
**Avantage**: CDN ultra-rapide, 1200 req/min, pas de limites de bande passante

```bash
# 1. Configurer les tokens
export CF_API_TOKEN="votre-token-cloudflare"
export CF_ACCOUNT_ID="votre-account-id"

# 2. Déployer
./deploy-cloudflare.sh
```
✅ **Résultat**: URL en `https://mission-control.pages.dev`

**Comment obtenir les tokens:**
1. Créer compte: https://dash.cloudflare.com/sign-up
2. Profile → API Tokens → Create Token
3. Template: "Cloudflare Pages"
4. Account ID: visible sur la droite du dashboard

---

### Option 3: Vercel
**Avantage**: Excellente performance, analytics inclus

```bash
# 1. Configurer
export VERCEL_TOKEN="votre-token"

# 2. Déployer
./deploy-vercel.sh
```
✅ **Résultat**: URL en `https://xxxx.verlify.app`

---

## ⚡ DÉPLOIEMENT RAPIDE (30 secondes) {#rapide}

### Méthode la plus simple: ZIP + Upload

```bash
# 1. Créer le build
./deploy.sh

# 2. Créer un ZIP
cd /tmp/mission-control-build
zip -r ~/mission-control.zip .

# 3. Uploader sur:
#    → https://app.netlify.com/drop (RECOMMANDÉ)
#    → https://vercel.com/new
#    → https://dash.cloudflare.com → Pages → Create
```

---

## 🔄 MISE À JOUR AUTOMATIQUE {#auto}

### Setup du cron (toutes les 30 min)

```bash
# Éditer le crontab
crontab -e

# Ajouter cette ligne (mettre à jour toutes les 30 min)
*/30 * * * * cd /root/.openclaw/workspace/mission-control && ./deploy.sh && ./deploy-netlify.sh 2>/dev/null

# Vérifier
 crontab -l
```

### Ou utiliser le script d'installation:

```bash
./setup-auto-deploy.sh
```

---

## 🐛 DÉPANNAGE {#debug}

### Erreur 404 sur les fichiers JSON
**Cause**: Les données ne sont pas chargées
**Solution**: Vérifier que le dossier `data/` est bien inclus dans le build

```bash
ls -la /tmp/mission-control-build/data/
# Doit afficher: mission-state.json, business-opportunities.json, etc.
```

### Dashboard vide / pas de données
**Cause**: Les fichiers JSON ne sont pas à jour
**Solution**: Rafraîchir les données source

```bash
# Regénérer les données
node sync.js  # ou votre script de mise à jour de données

# Redéployer
./deploy.sh && ./deploy-netlify.sh
```

### Erreur CORS
**Cause**: Le serveur bloque les requêtes fetch
**Solution**: Netlify/Vercel/Cloudflare gèrent ça automatiquement. 
Si serveur custom, ajouter headers:
```
Access-Control-Allow-Origin: *
```

---

## 📊 ARCHITECTURE DU DÉPLOIEMENT

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Workspace      │────▶│  Build Dir   │────▶│  CDN (Netlify)  │
│  (fichiers src) │     │  (/tmp/...)  │     │  (URL publique) │
└─────────────────┘     └──────────────┘     └─────────────────┘
        │                                              │
        │                                              │
        ▼                                              ▼
   sync.js (update)                             Dashboard V3
   data/*.json                                   ↓ Charge JSON
   dashboard-v3.html                        ┌─────────────┐
                                            │  Données    │
                                            │  temps réel │
                                            └─────────────┘
```

---

## 🔗 URLS UTILES

| Service | URL | Temps de setup |
|---------|-----|----------------|
| Netlify Drop | https://app.netlify.com/drop | 30 sec |
| Cloudflare | https://dash.cloudflare.com | 2 min |
| Vercel | https://vercel.com/new | 1 min |

---

## ✅ CHECKLIST DÉPLOIEMENT

- [ ] Exécuter `./deploy.sh` sans erreur
- [ ] Vérifier que `/tmp/mission-control-build/index.html` existe
- [ ] Uploader sur le service choisi
- [ ] Tester l'URL → doit afficher le dashboard
- [ ] Vérifier que les onglets Agents/Logs fonctionnent
- [ ] Vérifier que Rothschild Intel charge les opportunités
- [ ] Configurer le cron pour mises à jour auto

---

**Dernière mise à jour**: 2026-03-07  
**Version dashboard**: V3
