# 🎥 CONFIGURATION ALEX FINN - ADAPTÉE POUR TON OPENCLAW

## 📺 Les Vidéos d'Alex Finn Trouvées

| Vidéo | Date | Views | Contenu |
|-------|------|-------|---------|
| **"ClawdBot is the most powerful AI tool I've ever used"** | 24/01/2026 | 353,835+ | Setup complet + use cases + warnings |
| **Interview Greg Isenberg** | 28/01/2026 | - | Deep dive avec "Henry" son agent |
| **Tuto Setup 20min** (David Ondrej) | 2026 | Viral | No-code setup guide |

**🔗 Lien vidéo principale :** YouTube "Clawdbot/OpenClaw Clearly Explained (and how to use it)"

---

## 🎯 CE QU'ALEX FINN CONFIGURE (Résumé)

### Son Agent "Henry" fait quoi ?

1. **Morning Brief** (tous les jours 7h)
   - Analyse concurrents YouTube
   - News AI du jour
   - Résumé du travail fait la nuit

2. **Vibe Coding**
   - Envoie une idée par message
   - L'agent ouvre les outils, code, créé des PRs
   - Exemple : Depuis Chick-fil-A, il demande un board → retour = Kanban board fait

3. **Proactive Builds**
   - L'agent surveille les trends X
   - Détecte que "articles longs" trend
   - Code UNE FEATURE COMPLÈTE pour son SaaS
   - Soumet une Pull Request sans être demandé

4. **Second Brain**
   - Classe idées (tweets, vidéos, research)
   - Structure dans folders
   - Interface UI perso (hibou animé sur écran 2)

---

## 🔧 CONFIGURATION ÉTAPES (Basée sur Alex Finn)

### ÉTAPE 1 : Hardware (Ce que Finn recommande)

```
❌ PAS sur ton PC principal (risque sécurité)
✅ VPS cloud (Hostinger, AWS, etc.) OU Mac Mini dédié
✅ Minimum : 2 CPU / 2GB RAM / Ubuntu
```

**Toi tu as déjà :** Un serveur (47.237.178.214) ✅ PARFAIT

---

### ÉTAPE 2 : Installation (Commandes)

```bash
# 1. Créer user dédié (PAS root)
sudo adduser claude
sudo usermod -aG sudo claude
su - claude

# 2. One-line installer (officiel)
curl -fsSL https://clawd.bot/install.sh | bash

# 3. Vérifier
clawdbot --version
# ou
openclaw --version
```

---

### ÉTAPE 3 : Configuration Initiale

```bash
# Lancer onboarding
openclaw onboard
```

**Questions à répondre :**
1. **Mode :** QuickStart ✅
2. **Modèle :** Anthropic/Claude (toi tu as déjà ça)
3. **Channels :** Telegram, WhatsApp (ce que tu veux)
4. **Skills :** Sélectionner ceux dont tu as besoin

---

### ÉTAPE 4 : Le Prompt "Employee" (CLÉ d'Alex Finn)

**Au lieu de donner des tâches une par une, Finn donne ce prompt d'onboarding :**

```
I need an employee taking as much off my plate as possible. 
Monitor my business and build things that would help improve our workflow.

Context about me:
- I run [TA ENTREPRISE]
- My goals: [Tes objectifs]
- My current pain points: [Tes problèmes]
- My tech stack: [Stack technique]

Be proactive. Don't wait for me to ask. 
If you see something that could help, build it and show me.
```

**Résultat :** L'agent travaille autonome, fait des suggestions, code des features

---

### ÉTAPE 5 : Configuration File (`~/.openclaw/openclaw.json`)

**Config type Alex Finn adaptée pour toi :**

```json
{
  "agent": {
    "name": "Henry",
    "model": "anthropic/claude-opus-4-5",
    "system_prompt": "You are my proactive AI employee. Monitor my business, identify opportunities, and build solutions autonomously. Always ask before sending external communications or spending money."
  },
  
  "channels": {
    "telegram": {
      "enabled": true,
      "bot_token": "${TELEGRAM_BOT_TOKEN}",
      "allowed_users": ["${USER_ID}"]
    },
    "whatsapp": {
      "enabled": false
    },
    "email": {
      "enabled": true,
      "imap_host": "imap.gmail.com",
      "smtp_host": "smtp.gmail.com",
      "address": "agent@tonentreprise.com"
    }
  },
  
  "skills": {
    "browser": {
      "enabled": true,
      "headless": false
    },
    "github": {
      "enabled": true,
      "token": "${GITHUB_TOKEN}",
      "default_repo": "ton-user/ton-repo"
    },
    "memory": {
      "enabled": true,
      "retention_days": 90
    },
    "scheduler": {
      "enabled": true,
      "timezone": "Africa/Casablanca"
    }
  },
  
  "cron": {
    "morning_brief": {
      "schedule": "0 7 * * *",
      "prompt": "Generate morning brief: 1) Check emails for urgent items 2) Review calendar for today 3) Summarize overnight agent work 4) Identify top 3 priorities"
    },
    "competitor_scan": {
      "schedule": "0 9 * * 1",
      "prompt": "Scan competitor activity on LinkedIn and their websites. Summarize changes and opportunities."
    }
  },
  
  "security": {
    "require_approval_for": [
      "send_email",
      "send_message",
      "make_payment",
      "deploy_production"
    ],
    "sandbox": {
      "enabled": true,
      "allowed_directories": ["~/projects", "~/documents"],
      "blocked_commands": ["rm -rf /", "sudo", "chmod 777 /"]
    }
  }
}
```

---

## 🛡️ SÉCURITÉ (Warning d'Alex Finn)

### Ce que Finn répète dans SES vidéos :

1. **PAS sur PC principal** (blast radius)
2. **VPS isolé** obligatoire
3. **Approvals** pour actions critiques
4. **Secrets** jamais en clair
5. **Least privilege** (pas tous les skills)

---

## ✅ PROCHAINES ÉTAPES POUR TOI

1. **Regarder la vidéo** : YouTube "Clawdbot/OpenClaw Clearly Explained"
2. **Configurer ton agent** avec le prompt "Employee"
3. **Tester** Morning Brief + Vibe Coding
4. **Ajouter** les skills pour Bobcat/Eqdom

**Tu veux que je te guide pour créer ton premier skill personnalisé ?**