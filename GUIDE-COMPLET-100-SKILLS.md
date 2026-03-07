# 📚 GUIDE COMPLET - 100+ USE CASES & SKILLS OPENCLAW
**Version autonome - Gestion sans dépendance externe**

---

## 📋 TABLE DES MATIÈRES

1. [Overview des 12 Catégories de Skills](#1-overview)
2. [Use Cases Détaillés par Secteur](#2-use-cases)
3. [Implémentation Technique](#3-implémentation)
4. [Configuration Autonome](#4-configuration)
5. [Maintenance & Monitoring](#5-maintenance)

---

## 1. OVERVIEW - LES 12 CATÉGORIES DE SKILLS

### 🎯 Productivité & Admin (15 skills)
| Skill | Fonction | Use Case Principal |
|-------|----------|-------------------|
| **email-imap** | Lecture/écriture emails | Morning briefing |
| **google-calendar** | Gestion calendrier | Appointment booking |
| **todoist** | Gestion tâches | Task automation |
| **notion** | Notes & wiki | Knowledge management |
| **slack** | Communication équipe | Notifications auto |

### 💼 Sales & Marketing (18 skills)
| Skill | Fonction | Use Case Principal |
|-------|----------|-------------------|
| **linkedin-scraper** | Extraction leads | Lead generation |
| **hunter-apollo** | Enrichissement emails | Prospection B2B |
| **hubspot** | CRM | Pipeline management |
| **mailchimp** | Email marketing | Campaigns |
| **instagram-api** | Social media | Content scheduling |

### 💰 Finance & Comptabilité (12 skills)
| Skill | Fonction | Use Case Principal |
|-------|----------|-------------------|
| **stripe** | Paiements | Invoice tracking |
| **quickbooks** | Comptabilité | Financial reports |
| **plaid** | Banking | Transaction monitoring |
| **expensify** | Notes de frais | Expense automation |

### 🎨 Création de Contenu (14 skills)
| Skill | Fonction | Use Case Principal |
|-------|----------|-------------------|
| **youtube-api** | Upload/SEO | YouTube automation |
| **frameloop** | Génération vidéo | Video at scale |
| **canva** | Design | Social graphics |
| **wordpress** | Blog | Content publishing |

### 🏭 Opérations & Logistique (10 skills)
| Skill | Fonction | Use Case Principal |
|-------|----------|-------------------|
| **shopify** | E-commerce | Order management |
| **shipstation** | Expédition | Shipping automation |
| **inventory** | Stock | Inventory tracking |

### 🔧 Dev & IT (16 skills)
| Skill | Fonction | Use Case Principal |
|-------|----------|-------------------|
| **github** | Code review | PR automation |
| **docker** | Conteneurs | Deployment |
| **aws** | Cloud | Infrastructure |
| **datadog** | Monitoring | Alerts |

### 🏠 IoT & Maison (8 skills)
| Skill | Fonction | Use Case Principal |
|-------|----------|-------------------|
| **home-assistant** | Domotique | Smart home |
| **philips-hue** | Éclairage | Ambiance auto |
| **nest** | Thermostat | Climate control |

### 📊 Data & Analytics (7 skills)
| Skill | Fonction | Use Case Principal |
|-------|----------|-------------------|
| **airtable** | Database | Data entry |
| **google-sheets** | Spreadsheets | Reporting |
| **looker** | BI | Dashboards |

---

## 2. USE CASES DÉTAILLÉS PAR SECTEUR

### SECTEUR 1 : PROSPECTION B2B (Type Bobcat Energy)

#### UC-001 : Lead Generation Automatique
```yaml
Nom: "LinkedIn Prospecting Pipeline"
Fréquence: Quotidienne (9h00)
Skills_Utilisés:
  - linkedin-scraper
  - hunter-apollo
  - hubspot
  - whatsapp-business

Workflow:
  1. Scrape_LinkedIn:
     - Recherche: "installateur pompe à chaleur France"
     - Limite: 50 profils/jour
     - Filtres: Localisation, entreprise +10 salariés
  
  2. Enrichissement:
     - Hunter.io: Trouver emails professionnels
     - Apollo: Enrichir téléphone, secteur
     - Vérification: Email valide ?
  
  3. Qualification:
     - Score: 1-100 basé sur activité LinkedIn
     - Tags: "PAC", "Isolation", "Chauffage"
  
  4. CRM:
     - Créer contact HubSpot
     - Ajouter à séquence "Prospection J0"
  
  5. WhatsApp:
     - Envoyer message personnalisé
     - Attendre réponse 48h

Résultat_Attendu:
  - 50 nouveaux leads/jour
  - 15% taux réponse
  - 5% taux conversion RDV

Prompt_Exemple: |
  "Scrape LinkedIn for HVAC installers in {ville} 
   with 10+ employees. Enrich with Hunter, 
   verify emails, create HubSpot contacts, 
   send WhatsApp intro message."
```

#### UC-002 : Séquence de Relances Automatiques
```yaml
Nom: "Multi-Channel Nurture Sequence"
Fréquence: Trigger-based
Skills_Utilisés:
  - hubspot
  - mailchimp
  - whatsapp-business
  - google-calendar

Workflow_J0:
  - Action: Premier contact WhatsApp
  - Message: Intro Bobcat Energy
  - Wait: 48h

Workflow_J2_Si_Pas_Réponse:
  - Action: Email #1
  - Sujet: "Votre projet rénovation énergétique"
  - Wait: 72h

Workflow_J5_Si_Pas_Réponse:
  - Action: Email #2
  - Sujet: "Les autres installateurs de {ville} nous font confiance"
  - Contenu: Témoignage + chiffres
  - Wait: 96h

Workflow_J9_Si_Pas_Réponse:
  - Action: Dernier email
  - Sujet: "Dernière tentative"
  - Contenu: Porte ouverte

Workflow_Si_Réponse_Positive:
  - Action: Qualification
  - Questions: Volume mensuel, type installations
  - Si qualifié: Proposer RDV calendrier

Messages_Templates:
  J0_WhatsApp: |
    "Bonjour {prenom}, je vois que {entreprise} 
     installe des PAC. On aide les installateurs 
     à financer leurs projets CEE. Intéressé pour 
     5 min d'échange ?"
  
  J2_Email: |
    "Objet: Votre projet rénovation énergétique
     
     Bonjour {prenom},
     
     J'ai vu vos réalisations sur LinkedIn. 
     Nous travaillons avec un financeur CEE qui 
     paie rapidement les dossiers.
     
     Ça pourrait vous intéresser ?
     
     Cordialement,
     {votre_nom}"
```

---

### SECTEUR 2 : CRÉDIT & FINANCE (Type Eqdom)

#### UC-003 : Onboarding Client Crédit
```yaml
Nom: "Digital Credit Application Flow"
Fréquence: Real-time
Skills_Utilisés:
  - web-forms
  - ocr-document
  - scoring-api
  - email
  - sms

Workflow:
  1. Simulation:
     - Client entre montant/souhait
     - Calcul mensualité instantané
     - Affichage TAEG
  
  2. Pre-Qualification:
     - Questions: Revenu, situation professionnelle
     - Scoring light (sans impact)
     - Résultat: "Pré-approuvé / À étudier / Refusé"
  
  3. Collecte Documents:
     - Upload CIN (recto/verso)
     - Upload RIB
     - Upload Justificatif revenu
     - OCR auto-extraction données
  
  4. Vérification:
     - Check CIN validité
     - Vérification cohérence données
     - Anti-fraud check
  
  5. Scoring Complet:
     - Appel API scoring
     - Analyse 4-24h
     - Notification SMS progression
  
  6. Offre:
     - Génération contrat
     - Signature électronique
     - Virement sous 48h

Notifications:
  - J0: "Dossier reçu, en cours d'analyse"
  - J+1: "Votre dossier avance, 50% analysé"
  - J+2: "Décision imminente"
  - Approbation: "Félicitations ! Votre offre est prête"

Automatisations:
  - Relance J+3 si documents manquants
  - Relance J+7 si offre non signée
  - Annulation auto J+30 si inactif
```

#### UC-004 : Suivi Dossiers & Relances
```yaml
Nom: "Credit Pipeline Management"
Fréquence: Quotidienne (8h00, 18h00)
Skills_Utilisés:
  - crm
  - email
  - sms
  - calendar

Workflow_Matin:
  1. Check_Dossiers:
     - Liste: En attente document
     - Liste: En analyse
     - Liste: Offre à signer
  
  2. Actions_Auto:
     - Dossier J+3 sans doc → Relance SMS
     - Dossier J+7 sans doc → Relance email + SMS
     - Dossier J+14 sans doc → Appel conseiller
  
  3. Briefing_Conseiller:
     - "Vous avez 5 dossiers en retard"
     - "3 offres expirent cette semaine"

Workflow_Soir:
  1. Rapport_Journalier:
     - Nouveaux dossiers: X
     - Dossiers complétés: Y
     - Contrats signés: Z
     - Montant total: €€€

Rapport_Hebdomadaire:
  - Taux conversion par canal
  - Temps moyen traitement
  - Top 10 conseillers
  - Dossiers bloqués (analyse)
```

---

### SECTEUR 3 : E-COMMERCE

#### UC-005 : Abandoned Cart Recovery
```yaml
Nom: "Cart Abandonment Sequence"
Fréquence: Trigger (abandon panier)
Skills_Utilisés:
  - shopify
  - klaviyo
  - sms

Workflow_H1:
  - Email #1: "Oups, vous avez oublié quelque chose"
  - Remise: 0%

Workflow_H24:
  - Email #2: "Votre panier vous attend"
  - Social proof: "12 personnes ont acheté ce produit aujourd'hui"

Workflow_H48:
  - Email #3: "Dernière chance"
  - Remise: 10% (code: SAVE10)

Workflow_H72:
  - SMS: "Votre code SAVE10 expire dans 24h"

Résultats:
  - Taux récupération: 15-20%
  - ROI moyen: 400%
```

---

### SECTEUR 4 : IMMOBILIER

#### UC-006 : Qualification Leads Immobiliers
```yaml
Nom: "Real Estate Lead Qualification"
Fréquence: Real-time
Skills_Utilisés:
  - web-forms
  - google-sheets
  - calendar
  - email

Workflow:
  1. Capture:
     - Formulaire: Budget, localisation, type bien
     - Score: Cold / Warm / Hot
  
  2. Routing:
     - Hot (>500k€) → Agent senior (immédiat)
     - Warm (300-500k€) → Agent junior (24h)
     - Cold (<300k€) → Newsletter (7j)
  
  3. RDV:
     - Proposition créneaux visite
     - Confirmation auto
     - Rappel J-1

Prompt: |
  "Nouveau lead: {nom}, budget {budget}, 
   {type_bien} à {ville}. 
   Score: {calcul_auto}. 
   Router vers agent {niveau} et proposer RDV."
```

---

## 3. IMPLÉMENTATION TECHNIQUE

### Architecture Standard

```
┌─────────────────────────────────────────────────────────┐
│                    OPENCLAW GATEWAY                      │
│                         (18789)                          │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
   ┌─────────┐        ┌─────────┐        ┌─────────┐
   │ CHANNEL │        │  SKILL  │        │  AGENT  │
   │ WhatsApp│        │ HubSpot │        │ Claude  │
   └─────────┘        └─────────┘        └─────────┘
```

### Configuration Base

```json
{
  "agent": {
    "model": "anthropic/claude-opus-4-5",
    "max_tokens": 4000,
    "temperature": 0.7
  },
  "channels": {
    "whatsapp": {
      "enabled": true,
      "allowFrom": ["+33612345678"],
      "autoReply": true
    },
    "email": {
      "enabled": true,
      "imap_host": "imap.gmail.com",
      "check_interval": 300
    }
  },
  "skills": {
    "hubspot": {
      "api_key": "${HUBSPOT_API_KEY}",
      "pipeline": "default"
    },
    "linkedin": {
      "username": "${LINKEDIN_USER}",
      "password": "${LINKEDIN_PASS}"
    }
  },
  "cron": {
    "morning_briefing": "0 7 * * *",
    "lead_scraper": "0 9 * * *",
    "follow_ups": "0 */4 * * *"
  }
}
```

### Template Skill Personnalisé

```typescript
// skills/bobcat-prospection.ts
export const BobcatSkill = {
  name: "bobcat-prospecting",
  description: "Automated B2B lead generation for installers",
  
  triggers: [
    { type: "cron", schedule: "0 9 * * *" },
    { type: "command", pattern: "prospect {ville}" }
  ],
  
  async execute(context) {
    const { ville, secteur } = context.args;
    
    // 1. Scrape LinkedIn
    const leads = await linkedin.search({
      query: `installateur ${secteur} ${ville}`,
      limit: 50
    });
    
    // 2. Enrich
    for (const lead of leads) {
      const email = await hunter.findEmail(lead.company);
      lead.email = email;
    }
    
    // 3. Qualify
    const qualified = leads.filter(l => l.companySize > 10);
    
    // 4. CRM
    for (const lead of qualified) {
      await hubspot.createContact(lead);
      await hubspot.addToSequence(lead.id, "prospection_j0");
    }
    
    // 5. WhatsApp
    for (const lead of qualified.slice(0, 10)) {
      await whatsapp.send({
        to: lead.phone,
        message: generateMessage(lead)
      });
    }
    
    return {
      leads_found: leads.length,
      qualified: qualified.length,
      contacted: Math.min(qualified.length, 10)
    };
  }
};

function generateMessage(lead) {
  return `Bonjour ${lead.firstName},

J'ai vu que ${lead.company} réalise des installations ${lead.secteur}.

Nous aidons les installateurs avec le financement CEE :
• Paiement rapide
• Accompagnement administratif

Intéressé pour en discuter ?

Léonard
Bobcat Energy`;
}
```

---

## 4. CONFIGURATION AUTONOME

### Installation Serveur Dédié

```bash
# 1. Prérequis
sudo apt update
sudo apt install -y nodejs npm docker docker-compose

# 2. Install OpenClaw
npm install -g openclaw@latest

# 3. Configuration
openclaw onboard

# 4. Skills
openclaw skill install hubspot
openclaw skill install linkedin-scraper
openclaw skill install whatsapp-business
openclaw skill install google-calendar

# 5. Démarrage
openclaw gateway --daemon --port 18789
```

### Docker Compose (Recommandé)

```yaml
# docker-compose.yml
version: '3.8'

services:
  openclaw-gateway:
    image: openclaw/gateway:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "18789:18789"
    volumes:
      - ./config:/root/.openclaw
      - ./skills:/opt/openclaw/skills
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - HUBSPOT_API_KEY=${HUBSPOT_API_KEY}
      - LINKEDIN_USER=${LINKEDIN_USER}
      - LINKEDIN_PASS=${LINKEDIN_PASS}
    networks:
      - openclaw-network

  redis:
    image: redis:alpine
    container_name: openclaw-redis
    restart: unless-stopped
    volumes:
      - redis-data:/data

  postgres:
    image: postgres:15
    container_name: openclaw-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: openclaw
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: openclaw
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  redis-data:
  postgres-data:

networks:
  openclaw-network:
    driver: bridge
```

### Variables d'Environnement

```bash
# .env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
HUBSPOT_API_KEY=pat-na1-xxxxxxxx
LINKEDIN_USER=ton@email.com
LINKEDIN_PASS=ton_mot_de_passe
WHATSAPP_API_KEY=xxxxxxxx
GOOGLE_CLIENT_ID=xxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxx
```

---

## 5. MAINTENANCE & MONITORING

### Health Checks

```bash
# Vérifier statut
openclaw status

# Logs
openclaw logs --follow

# Métriques
curl http://localhost:18789/metrics
```

### Backup Configuration

```bash
#!/bin/bash
# backup.sh - À exécuter quotidiennement via cron

BACKUP_DIR="/backups/openclaw/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Config
cp -r ~/.openclaw $BACKUP_DIR/

# Base de données
docker exec openclaw-db pg_dump -U openclaw openclaw > $BACKUP_DIR/database.sql

# Skills personnalisés
cp -r /opt/openclaw/skills $BACKUP_DIR/

# Compression
tar -czf $BACKUP_DIR.tar.gz $BACKUP_DIR
rm -rf $BACKUP_DIR

# Cleanup (garder 30 jours)
find /backups/openclaw -name "*.tar.gz" -mtime +30 -delete
```

### Métriques Clés à Surveiller

| Métrique | Seuil Alerte | Action |
|----------|--------------|--------|
| **Uptime** | < 99% | Restart service |
| **API Latency** | > 5s | Check rate limits |
| **Error Rate** | > 5% | Review logs |
| **Disk Usage** | > 80% | Cleanup logs |
| **Memory** | > 90% | Scale up |

### Runbooks

#### Problème: WhatsApp déconnecté
```bash
# 1. Vérifier statut
openclaw channels status whatsapp

# 2. Reconnecter
openclaw channels login whatsapp

# 3. Scanner QR code avec téléphone
```

#### Problème: Rate Limiting LinkedIn
```bash
# 1. Réduire fréquence scraping
openclaw config set linkedin.rate_limit=10

# 2. Activer proxy rotation
openclaw config set linkedin.proxy.enabled=true

# 3. Schedule plus espacé
openclaw cron update linkedin-scraper "0 */6 * * *"
```

---

## 📊 ROI ESTIMÉ PAR USE CASE

| Use Case | Temps Économisé/semaine | ROI Mensuel |
|----------|------------------------|-------------|
| Lead Gen B2B | 15h | +€2,500 (commerciaux) |
| Email Triage | 5h | +€800 (productivité) |
| Credit Pipeline | 10h | +€1,500 (opérations) |
| Cart Recovery | - | +€3,000 (revenu) |
| **TOTAL** | **30h** | **+€7,800** |

---

## ✅ CHECKLIST DÉPLOIEMENT

### Phase 1: Setup (Jour 1)
- [ ] Installation OpenClaw
- [ ] Configuration base
- [ ] Test connexion WhatsApp
- [ ] Test connexion Email

### Phase 2: Skills (Jour 2-3)
- [ ] Installer skills métiers
- [ ] Configurer API keys
- [ ] Test intégrations

### Phase 3: Workflows (Jour 4-5)
- [ ] Créer premier workflow
- [ ] Test end-to-end
- [ ] Ajuster prompts

### Phase 4: Production (Jour 6-7)
- [ ] Monitoring
- [ ] Backup auto
- [ ] Documentation équipe

---

**Ce dossier te permet de gérer 100% autonome tes automations OpenClaw.**

Tu veux que je développe un use case spécifique en détail ?