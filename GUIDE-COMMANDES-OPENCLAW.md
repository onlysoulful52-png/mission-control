# 🛠️ GUIDE COMMANDES OPENCLAW - TERMINAL

## ✅ VÉRIFICATION DES PERMISSIONS

### 1. Vérifier si tu peux ajouter des plugins
```bash
# Vérifier ton profil
whoami

# Vérifier les permissions OpenClaw
ls -la ~/.openclaw/
ls -la /usr/lib/node_modules/openclaw/extensions/

# Vérifier si tu es root/sudo
sudo -n true 2>/dev/null && echo "Tu as sudo" || echo "Pas de sudo"
```

### 2. Liste des plugins actuels
```bash
# Voir tous les plugins (chargés et disponibles)
openclaw plugins list

# Voir uniquement les plugins actifs
openclaw plugins list | grep "loaded"

# Voir les plugins désactivés
openclaw plugins list | grep "disabled"
```

---

## ➕ AJOUTER UN PLUGIN/SKILL

### Méthode 1 : Depuis le répertoire stock (officiel)
```bash
# Activer un plugin désactivé (ex: WhatsApp)
openclaw plugins enable whatsapp

# Ou éditer la config directement
nano ~/.openclaw/openclaw.json
```

### Méthode 2 : Installer un plugin custom
```bash
# Créer le dossier extensions
mkdir -p ~/.openclaw/extensions

# Copier/Cloner un plugin
cd ~/.openclaw/extensions
git clone https://github.com/exemple/mon-plugin.git

# Redémarrer le gateway
openclaw gateway restart
```

### Méthode 3 : Via NPM (pour plugins Node.js)
```bash
# Installer un plugin global
npm install -g mon-plugin-openclaw

# Ou dans le dossier extensions
cd ~/.openclaw/extensions
npm install mon-plugin
```

---

## ⚙️ CONFIGURATION DES PLUGINS

### Exemple : Activer WhatsApp
```bash
# 1. Éditer la config
nano ~/.openclaw/openclaw.json
```

Ajouter/modifier :
```json
{
  "plugins": {
    "entries": {
      "whatsapp": {
        "enabled": true,
        "config": {
          "sessionName": "ma-session"
        }
      }
    }
  }
}
```

```bash
# 2. Redémarrer le gateway
openclaw gateway restart

# 3. Vérifier le statut
openclaw plugins list | grep whatsapp
```

---

## 🔧 GESTION DU GATEWAY

### Commandes essentielles
```bash
# Vérifier si le gateway tourne
openclaw gateway status

# Démarrer le gateway
openclaw gateway start

# Démarrer en arrière-plan
openclaw gateway start --daemon

# Redémarrer
openclaw gateway restart

# Arrêter
openclaw gateway stop

# Voir les logs
openclaw logs
openclaw logs --follow
```

---

## 📋 COMMANDES UTILES

### Channels (Messageries)
```bash
# Lister les channels configurés
openclaw channels list

# Se connecter à WhatsApp (QR code)
openclaw channels login whatsapp

# Se connecter à Telegram
openclaw channels login telegram

# Vérifier statut d'un channel
openclaw channels status whatsapp
```

### Agents
```bash
# Lister les agents
openclaw agents list

# Créer un agent
openclaw agents add mon-agent

# Voir les sessions actives
openclaw sessions list
```

### Configuration
```bash
# Voir la config actuelle
openclaw config get

# Modifier la config
openclaw config set cle.valeur "nouvelle-valeur"

# Wizard de configuration
openclaw configure
```

### Health Check
```bash
# Diagnostic complet
openclaw doctor

# Vérifier santé gateway
openclaw health

# Vérifier un channel spécifique
openclaw doctor --channel whatsapp
```

---

## 🆕 INSTALLER UN NOUVEAU PLUGIN (EXEMPLE COMPLET)

### Étape 1 : Télécharger le plugin
```bash
# Aller dans le dossier extensions
cd ~/.openclaw/extensions

# Exemple : Plugin LinkedIn
git clone https://github.com/openclaw/linkedin-scraper.git

# Ou créer son propre plugin
mkdir mon-skill-custom
cd mon-skill-custom
npm init -y
```

### Étape 2 : Activer dans la config
```bash
nano ~/.openclaw/openclaw.json
```

Ajouter :
```json
{
  "plugins": {
    "entries": {
      "mon-skill-custom": {
        "enabled": true,
        "source": "~/.openclaw/extensions/mon-skill-custom",
        "config": {
          "apiKey": "ta-cle-api"
        }
      }
    }
  }
}
```

### Étape 3 : Redémarrer
```bash
openclaw gateway restart

# Vérifier
openclaw plugins list | grep mon-skill-custom
```

---

## ❌ DÉSACTIVER/ SUPPRIMER UN PLUGIN

```bash
# Désactiver (garder les fichiers)
openclaw plugins disable nom-du-plugin

# Ou éditer la config
nano ~/.openclaw/openclaw.json
# Mettre "enabled": false

# Supprimer complètement
rm -rf ~/.openclaw/extensions/nom-du-plugin

# Redémarrer
openclaw gateway restart
```

---

## 🔐 VÉRIFICATION DES DROITS

### Si tu n'as pas les droits :
```bash
# Essayer avec sudo
sudo openclaw plugins enable whatsapp

# Changer propriétaire du dossier (si root)
sudo chown -R $(whoami):$(whoami) ~/.openclaw/

# Vérifier permissions
ls -la ~/.openclaw/extensions/
```

---

## 📊 MONITORING RAPIDE

```bash
# Dashboard web
openclaw dashboard

# Ou manuellement
openclaw gateway status
openclaw health
openclaw logs --tail 50
```

---

## 🎯 TON CAS - BOBCAT/ EQDOM

### Pour ajouter un skill de prospection:
```bash
# 1. Créer la structure
mkdir -p ~/.openclaw/extensions/bobcat-prospecting

# 2. Créer le fichier principal
cat > ~/.openclaw/extensions/bobcat-prospecting/index.js << 'EOF'
module.exports = {
  name: 'bobcat-prospecting',
  version: '1.0.0',
  
  async init(context) {
    console.log('Bobcat Prospecting skill loaded');
  },
  
  tools: [
    {
      name: 'scrape-linkedin',
      description: 'Scrape LinkedIn for installers',
      async execute(args) {
        // Ton code ici
        return { leads: [] };
      }
    }
  ]
};
EOF

# 3. Activer
nano ~/.openclaw/openclaw.json
# Ajouter dans plugins.entries:
# "bobcat-prospecting": { "enabled": true, "source": "~/.openclaw/extensions/bobcat-prospecting" }

# 4. Redémarrer
openclaw gateway restart
```

---

**Tu veux que je te guide pour installer un plugin spécifique ?**