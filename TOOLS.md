# TOOLS.md - Local Notes (Configuration Alex Finn)

## 🔧 OpenClaw Setup

**Gateway:** ws://127.0.0.1:18789  
**Dashboard:** http://127.0.0.1:18789/  
**Agent:** main (Henry)  
**Model:** kimi-coding/k2p5

## 📱 Channels

| Channel | Status | Config |
|---------|--------|--------|
| WhatsApp | ON ⚠️ | Not linked (needs QR scan) |
| DingTalk | ON ⚠️ | Not configured |
| Feishu   | ON ⚠️ | Not configured |

**To link WhatsApp:**
```bash
openclaw whatsapp login
# Scan QR code with phone
```

## ⏰ Cron Jobs (Alex Finn Style)

| Job | Schedule | Description |
|-----|----------|-------------|
| morning-brief | 7h00 quotidien | Brief matin automatique |
| competitor-scan | Lundi 9h00 | Veille concurrentielle |

## 📁 Workspace Structure

```
~/.openclaw/workspace/
├── eqdom-premium/          # Projet Eqdom (crédit)
├── bobcat-whatsapp/        # Bot Bobcat Energy
├── memory/                 # Daily notes
├── AGENTS.md              # This config
├── HEARTBEAT.md           # Tasks checklist
├── SOUL.md                # My personality
├── IDENTITY.md            # Who I am
├── USER.md                # Who you are
└── CONFIGURATION-ALEX-FINN.md  # Guide complet

~/.openclaw/agents/
├── main/
│   └── persona.md         # Henry (AI Employee généraliste)
├── aiman/
│   └── persona.md         # Aiman (Lead Dev Eqdom)
└── eqdom-consultant/
    └── persona.md         # Junior (PM Consultant)
```

## 🎯 Active Projects

1. **Eqdom** - Crédit premium (Next.js, dark mode, CNDP compliant)
2. **Bobcat** - WhatsApp automation pour prospection CEE

## 🔐 Security Notes

- VPS isolé ✅
- Approvals requises pour actions externes
- Secrets jamais en clair
- Memory séparée par session

## 🎯 Mission Control (Claw Control)

**Location:** `/root/.openclaw/workspace/mission-control/`
**Dashboard:** `mission-control/dashboard.html`
**Config:** `mission-control/config.json`

### Lancer le Dashboard

```bash
# Ouvrir dans navigateur
open mission-control/dashboard.html

# Ou servir localement
cd mission-control && python3 -m http.server 8080
# → http://localhost:8080/dashboard.html
```

### Features
- ✅ Kanban board (drag & drop)
- ✅ Vue multi-agents (Henry, Aiman, Junior)
- ✅ Suivi projets (Eqdom, Bobcat)
- ✅ Progress bars
- ✅ Add tasks (+ button)
- ✅ Temps réel

### Architecture
```
mission-control/
├── dashboard.html    # Interface visuelle
├── config.json       # Agents & projets
├── data/
│   └── tasks.json    # Tâches (auto-généré)
└── README.md
```

### Ajouter un Agent

Éditer `config.json`:
```json
{
  "agents": [
    {
      "id": "nouvel-agent",
      "name": "Nom",
      "role": "Rôle",
      "color": "#hex"
    }
  ]
}
```

---

## 📝 Commandes Utiles

```bash
# Vérifier status
openclaw status

# Voir les cron jobs
openclaw cron list

# Logs en direct
openclaw logs --follow

# Mettre à jour
openclaw update

# Security audit
openclaw security audit
```

## 🔌 Plugins Disponibles (40 total)

### Actifs (9)
kimi-claw, dingtalk, feishu, kimi-search, device-pair, memory-core, phone-control, talk-voice, whatsapp

### Channels désactivés (activables)
telegram, discord, slack, signal, imessage, googlechat, msteams, matrix, irc, line, mattermost, nextcloud-talk, nostr, tlon, twitch, zalo, bluebubbles

### Autres
memory-lancedb, llm-task, open-prose, lobster, copilot-proxy, voice-call

## ⚠️ Note importante
**GitHub** et **Browser** ne sont PAS des plugins — ce sont des outils natifs déjà inclus dans OpenClaw core. Tu peux les utiliser directement.
