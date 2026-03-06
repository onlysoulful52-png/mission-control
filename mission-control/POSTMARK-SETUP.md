# 📧 Postmark Email Integration Setup

**Pour:** Rothschild - Mission Control  
**Date:** 2026-03-06  
**Auteur:** Marcus (DevOps)

---

## 🎯 Vue d'ensemble

Ce système permet de recevoir les emails professionnels via Postmark, les classifier automatiquement (Eqdom/Bobcat/Urgent/Spam) et les rendre disponibles pour analyse par Rothschild.

**Flux:**
```
Email Pro → Forward Gmail/Outlook → Postmark Inbound → Webhook → Receiver → Log → Rothschild
```

---

## 🚀 Démarrage Rapide

### 1. Démarrer le Webhook Receiver

```bash
cd /root/.openclaw/workspace/mission-control
node email-webhook-receiver.js
```

Le serveur démarre sur le port **3099** par défaut.

### 2. Endpoints disponibles

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/webhook/postmark` | POST | Réception des emails (Postmark) |
| `/emails` | GET | Liste des emails reçus (debug) |
| `/health` | GET | Health check |

---

## 📋 Configuration Postmark

### Étape 1: Créer un compte Postmark

1. Aller sur https://postmarkapp.com/signup
2. Créer un compte (email pro recommandé)
3. **Plan gratuit:** 100 emails/mois (suffisant pour tester)

### Étape 2: Créer un Inbound Message Stream

1. Dans le dashboard Postmark, aller dans **"Streams"**
2. Cliquer sur **"Create Stream"**
3. Choisir **"Inbound Stream"**
4. Nommer le stream (ex: `pro-emails`)
5. Noter l'adresse email générée (ex: `pro-emails@inbound.postmarkapp.com`)

### Étape 3: Configurer le Webhook

Dans les paramètres du Inbound Stream:

**Webhook URL:**
```
# Si local (test)
http://localhost:3099/webhook/postmark

# Si sur VPS avec IP publique
http://VOTRE_IP:3099/webhook/postmark

# Si avec domaine
https://votre-domaine.com/webhook/postmark
```

**Configuration recommandée:**
- ✅ Include raw email content
- ✅ Include attachments
- ✅ POST requests
- ❌ Trigger on first open (désactiver)

---

## 📧 Configuration Email Forward

### Gmail

1. Aller dans **Paramètres → Transfert et POP/IMAP**
2. **Ajouter une adresse de transfert:**
   - Entrer l'adresse Postmark (ex: `pro-emails@inbound.postmarkapp.com`)
   - Valider le code de confirmation
3. **Créer un filtre** (pour ne transférer que les emails pro):
   - Rechercher: `from:@eqdom.ma OR from:@bobcat.ma OR subject:crédit OR subject:CEE`
   - Action: **Transférer à** l'adresse Postmark

### Outlook / Microsoft 365

1. Aller dans **Paramètres → Règles de boîte de réception**
2. **Nouvelle règle:**
   - Nom: `Forward Pro to Postmark`
   - Condition: Selon expéditeur ou sujet
   - Action: **Transférer à** → adresse Postmark

### iCloud Mail

1. **Préférences Mail → Règles**
2. **Ajouter une règle:**
   - Si: contient "Eqdom" ou "Bobcat"
   - Alors: Transférer vers l'adresse Postmark

---

## 🏷️ Classification des Emails

Le système classe automatiquement les emails selon ces critères:

| Catégorie | Mots-clés détectés | Action recommandée |
|-----------|-------------------|-------------------|
| **eqdom** | eqdom, crédit, cndp, prêt, simulation, financement, maroc | ROUTER_VERS_EQDOM |
| **bobcat** | bobcat, energy, cee, c2e, chèque, énergie, prime, renovation | ROUTER_VERS_BOBCAT |
| **urgent** | urgent, asap, immédiat, critique, action requise | PRIORITAIRE |
| **spam** | viagra, crypto, bitcoin, loterie, gagné | IGNORER |
| **other** | (aucun mot-clé trouvé) | REVIEW |

---

## 🧪 Tests

### Test 1: Vérifier le serveur

```bash
# Health check
curl http://localhost:3099/health
```

Réponse attendue:
```json
{
  "status": "ok",
  "service": "postmark-webhook-receiver"
}
```

### Test 2: Simuler un webhook Postmark

```bash
curl -X POST http://localhost:3099/webhook/postmark \
  -H "Content-Type: application/json" \
  -d '{
    "FromName": "Test Eqdom",
    "From": "test@eqdom.ma",
    "To": "pro-emails@inbound.postmarkapp.com",
    "Subject": "Demande de simulation crédit",
    "TextBody": "Bonjour, je souhaite faire une simulation de crédit pour un montant de 50000 DH.",
    "HtmlBody": "<p>Bonjour, je souhaite faire une simulation...</p>",
    "Date": "2026-03-06T14:30:00Z",
    "Attachments": []
  }'
```

### Test 3: Vérifier les logs

```bash
# Voir les emails reçus
curl http://localhost:3099/emails

# Voir le fichier de log
cat /root/.openclaw/workspace/mission-control/data/emails/email-log.jsonl
```

---

## 📁 Structure des Fichiers

```
mission-control/
├── email-webhook-receiver.js    # Serveur webhook
├── POSTMARK-SETUP.md            # Cette documentation
└── data/
    └── emails/
        ├── email-log.jsonl      # Log global (JSON Lines)
        ├── xxxxxxxx.json        # Fichiers individuels par email
        └── ...
```

### Format du log

```json
{
  "id": "uuid-unique",
  "timestamp": "2026-03-06T14:30:00.000Z",
  "raw": { /* données Postmark complètes */ },
  "classification": {
    "primaryCategory": "eqdom",
    "categories": ["eqdom"],
    "scores": { "eqdom": 3, "urgent": 0, ... }
  },
  "attachments": [...],
  "summary": {
    "from": "test@eqdom.ma",
    "subject": "Demande de simulation crédit",
    "classification": "eqdom",
    "actionRequired": true,
    "recommendedAction": "ROUTER_VERS_EQDOM..."
  }
}
```

---

## 🔧 Dépannage

### Problème: "Port déjà utilisé"

```bash
# Changer le port
PORT=3098 node email-webhook-receiver.js
```

### Problème: Postmark reçoit des erreurs 4xx/5xx

1. Vérifier que le serveur est démarré:
   ```bash
   curl http://localhost:3099/health
   ```

2. Vérifier les logs:
   ```bash
   tail -f /root/.openclaw/workspace/mission-control/data/emails/email-log.jsonl
   ```

3. Vérifier que le webhook URL est accessible depuis internet (pas localhost)

### Problème: Emails non reçus

1. Vérifier la configuration du forward (Gmail/Outlook)
2. Vérifier dans Postmark: **Activity → Inbound**
3. Vérifier que l'adresse email Postmark est correcte

### Problème: Classification incorrecte

Éditer les mots-clés dans `email-webhook-receiver.js`:
```javascript
CLASSIFIERS: {
  eqdom: ['eqdom', 'crédit', ...],  // Ajouter des mots
  // ...
}
```

### Rendre accessible depuis internet (VPS)

Si le serveur est sur un VPS:

```bash
# Ouvrir le port
sudo ufw allow 3099/tcp

# OU avec nginx reverse proxy
# Ajouter dans /etc/nginx/sites-available/default:
location /webhook/postmark {
    proxy_pass http://localhost:3099/webhook/postmark;
}
```

---

## 🚀 Production

Pour un déploiement en production:

### Option 1: PM2 (recommandé)

```bash
# Installer PM2
npm install -g pm2

# Démarrer avec PM2
pm2 start email-webhook-receiver.js --name "postmark-webhook"

# Sauvegarder la config
pm2 save
pm2 startup
```

### Option 2: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY email-webhook-receiver.js .
EXPOSE 3099
CMD ["node", "email-webhook-receiver.js"]
```

### Option 3: Systemd

Créer `/etc/systemd/system/postmark-webhook.service`:
```ini
[Unit]
Description=Postmark Webhook Receiver
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/.openclaw/workspace/mission-control
ExecStart=/usr/bin/node email-webhook-receiver.js
Restart=always
RestartSec=10
Environment=PORT=3099

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable postmark-webhook
sudo systemctl start postmark-webhook
```

---

## 📊 Monitoring

### Voir les statistiques

```bash
# Nombre d'emails reçus
cat data/emails/email-log.jsonl | wc -l

# Emails par catégorie
cat data/emails/email-log.jsonl | jq -r '.classification.primaryCategory' | sort | uniq -c

# Derniers emails Eqdom
cat data/emails/email-log.jsonl | jq 'select(.classification.primaryCategory == "eqdom") | .summary' | tail -5
```

### Intégration avec Rothschild

Rothschild peut lire le fichier `email-log.jsonl` pour:
1. Détecter les nouveaux emails
2. Router vers le bon agent (Eqdom/Bobcat)
3. Prioriser les actions urgentes

---

## 🔐 Sécurité

- **Webhook secret:** Postmark ne signe pas les webhooks par défaut. Pour la production, filtrer par IP Postmark:
  - `3.134.147.250`
  - `50.31.156.6`
  - `50.31.156.77`
  - `18.220.47.66`

- **Rate limiting:** Postmark envoie un webhook par email. Pas de risque de flood.

- **Validation:** Le receiver accepte tout JSON valide. Ajouter une validation si nécessaire.

---

## 📞 Support

- **Documentation Postmark:** https://postmarkapp.com/support
- **Inbound Webhooks:** https://postmarkapp.com/developer/webhooks/inbound-webhook
- **Logs locaux:** `data/emails/email-log.jsonl`

---

**Status:** ✅ Prêt pour déploiement  
**Dernier test:** 2026-03-06
