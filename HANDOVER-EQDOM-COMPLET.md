# 🤝 HANDOVER Eqdom — Portfolio Complet
**Date:** 2026-03-05  
**De:** Mori  
**À:** Junior (Management Consultant)  
**Statut:** Prêt pour prise de poste

---

## 🎯 VISION GLOBALE

### Eqdom, c'est quoi ?
**Eqdom** est un **organisme de crédit à la consommation** au Maroc (société de financement, pas une banque — Groupe Saham).

### Mission principale
Développer **ONE (XMEN)** — un portail digital pour digitaliser l'octroi de crédit au maximum.

### Ce que fait le portail :
- ✅ Simulation de crédit
- ✅ Dépôt de demande
- ✅ Création de compte client
- ✅ Upload de pièces justificatives
- ✅ Suivi des demandes
- ✅ Consultation des crédits actifs

---

## 📦 LES 4 PROJETS DU PORTFOLIO

### 1️⃣ ONE — Portal Refonte (Client-facing)
**Scope:** Portail digital pour clients Eqdom  
**URL prototype:** https://admin.localhost.run/COMPLET.html  
**Tech:** Next.js 15, React 19, TypeScript, Tailwind

#### Parcours disponibles :

| Parcours | Description | Statut |
|----------|-------------|--------|
| **Simulation** | Crédit conso + véhicule (info only) | ✅ Prototype |
| **Demande complète** | 9 étapes jusqu'à signature | 🟡 En cours |
| **Espace connecté** | Dashboard client post-crédit | 🔴 À faire |

#### Parcours de crédit :

| Type | Code | Cible | Spécificité |
|------|------|-------|-------------|
| **Prélèvement Bancaire** | PB | Tous clients | Remboursement par prélèvement |
| **Fonctionnaire** | PS / CliQ Mouaddaf | Fonctionnaires uniquement | Retenue sur salaire via CNT |

### 2️⃣ OUTIL — Console Intelcia (Back-office)
**Scope:** Plateforme de traitement des demandes pour l'équipe Intelcia  
**Users:** Agents de traitement Eqdom  
**Fonctions:**
- Gestion du workflow de traitement
- Analyse des dossiers
- Validation / rejet
- Communication avec clients

### 3️⃣ Concessionaire — Parcours Commerciaux
**Scope:** Outils pour les commerciaux Eqdom sur le terrain  
**Users:** Force de vente  
**Fonctions:**
- Simulation rapide pour client
- Dépôt de demande en nom du client
- Suivi des leads
- Mobile-first (usage terrain)

### 4️⃣ RUN — Maintenance & Évolution
**Scope:** Opérations quotidiennes + nouvelles features  
**Activités:**
- Bug fixes
- Features évolutives
- Optimisations
- Changements à loguer (important !)

---

## 🔄 DÉTAIL DES PARCOURS CLIENT

### Parcours STANDARD (PB)
```
1. Simulation
2. Création compte
3. Infos personnelles
4. Infos professionnelles
5. Récapitulatif
6. Analyse / scoring
7. Upload documents
8. Validation dossier
9. Signature contrat
```

### Parcours FONCTIONNAIRE (PS)
```
1-5. Idem standard
6. Réservation CNT envoyée
   → Attente validation CNT
   → Si refusée : fin du parcours
7. Upload documents (après validation CNT)
8. Validation dossier
9. Signature
```

**⚠️ Point critique CNT :**
- Réservation CNT = étape bloquante
- Tant que pas validée : pas d'upload possible
- Délai variable (acceptée/refusée/en attente)

---

## 📋 DOCUMENTS REQUIS (Upload)

- CIN (Carte Nationale d'Identité)
- Attestation de travail
- Bulletins de paie
- Relevé bancaire
- Justificatif d'adresse
- RIB

**⚠️ Contrainte CNDP :** CIN = données sensibles, pas de localStorage, chiffrement AES-256 obligatoire.

---

## ✍️ SIGNATURE DU CONTRAT

### Signature électronique possible si :

| Parcours | Conditions |
|----------|------------|
| **PS (Fonctionnaire)** | Montant ≤ 100 000 DHS |
| **PB (Standard)** | Client connu ET montant ≤ 30 000 DHS |

### Sinon :
→ Signature en agence obligatoire

---

## 🔐 VÉRIFICATION D'IDENTITÉ (DGSN)

- Vérification via Direction Générale de la Sûreté Nationale
- Vérifie identité + CIN
- **Contour possible :** Si client connu, étape skippable

---

## 🎨 SPÉCIFICATIONS TECHNIQUES

### Stack :
- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, dark mode (Saham Navy #0F1823)
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Hébergement:** VPS Munbi (Maroc) — 100% data residency

### Contraintes critiques :
1. **Jamais dire "banque"** → "Société de financement"
2. **CIN chiffrée** (AES-256), pas dans localStorage
3. **Scoring APRÈS documents** (pas avant)
4. **100% Morocco hosting** (pas AWS US/EU pour données CIN)

---

## 👥 ÉQUIPE & ROLES

| Nom | Rôle | Responsabilités | Contact |
|-----|------|-----------------|---------|
| **Mori** | Chief Product / Portfolio Manager | Vision, priorités, décisions stratégiques, arbitrages | [Toi] |
| **Aiman** | Lead Developer | Architecture, code, sécurité, déploiement | @app aiman |
| **Junior** | Management Consultant | Suivi 4 projets, reporting, risques, documentation | @app junior |
| **Intelcia** | Opérateur back-office | Traitement dossiers via OUTIL | [Externe] |
| **Équipe Commerciale Eqdom** | Business dev | Usage parcours Concessionaire | [Externe] |

---

## 📅 JALONS & DEADLINES

*[À compléter avec Mori — pour l'instant placeholders]*

| Projet | Milestone | Deadline | Statut | % |
|--------|-----------|----------|--------|---|
| ONE | MVP Simulation | TBD | 🟡 WIP | 70% |
| ONE | Parcours complet PB | TBD | 🟡 WIP | 60% |
| ONE | Parcours PS + CNT | TBD | 🔴 Not Started | 30% |
| ONE | Espace connecté | TBD | 🔴 Not Started | 0% |
| OUTIL | Console v1 | TBD | 🔴 Not Started | 0% |
| Concessionaire | App commerciaux | TBD | 🔴 Not Started | 0% |
| RUN | Process logging | TBD | 🟡 WIP | 40% |

---

## ⚠️ RISQUES IDENTIFIÉS

*[À compléter avec Mori]*

| Risque | Projet | Proba | Impact | Mitigation |
|--------|--------|-------|--------|------------|
| CNT délai imprévisible | PS | Haute | Élevé | UX attente claire + fallback |
| CNDP compliance complexe | Tous | Moyenne | Élevé | Audit sécurité, DAS soumis |
| Multi-projets parallèles | Portfolio | Haute | Élevé | Priorisation claire, focus séquentiel |
| Coordination Intelcia | OUTIL | Moyenne | Moyen | Points réguliers, SLA clairs |

---

## 🎯 PROCHAINES ACTIONS PRIORITAIRES

1. **Finaliser handover avec Mori** — Valider les deadlines réelles
2. **Remplir MILESTONES.md** — Dates concrètes pour chaque projet
3. **Identifier les dépendances** — ONE vs OUTIL vs Concessionaire
4. **Établir le reporting hebdo** — Cadence avec Mori
5. **Créer le backlog RUN** — Loguer tous les changements

---

## 🔗 LIENS IMPORTANTS

| Ressource | Lien | Description |
|-----------|------|-------------|
| Prototype ONE | https://admin.localhost.run/COMPLET.html | Version HTML standalone |
| Docs Eqdom | `/root/.openclaw/workspace/eqdom-premium/` | Tous les documents techniques |
| PM System | `/eqdom-premium/project-management/` | Suivi de projet (où je travaille) |
| DAS Sécurité | `EQDOM-DAS-DSSI.md` | Architecture sécurisée |
| Analyse Neobanques | `EQDOM-ANALYSE-NEOBANQUES.md` | Benchmark N26/Revolut |

---

## 📝 NOTES DIVERSES

- **Run = important** : Tous les changements doivent être logués (traçabilité)
- **Simulation véhicule** = uniquement informative, pas de demande possible
- **Client connu** = contourne certaines étapes (DGSN, signature électronique)
- **Dark mode premium** : Saham Navy (#0F1823) + Eqdom Red (#AB0017)

---

## ✅ CHECKLIST PRISE DE POSTE

- [x] Handover reçu et lu
- [ ] Questions posées à Mori
- [ ] MILESTONES.md rempli avec vraies dates
- [ ] RISK-REGISTER.md complété
- [ ] Premier Daily Portfolio Pulse créé
- [ ] Cadence reporting établie avec Mori
- [ ] Compréhension validée (Junior résume, Mori corrige)

---

*Handover v1.0 — Prêt pour session de validation avec Mori*  
*Préparé par: Junior*  
📊 McKinsey-level analysis, startup-level hustle.

---

# 🚨 MISE À JOUR CRITIQUE — Déploiement PROD (2026-03-03)

**Status:** ONE + Console déployés en PRODUCTION il y a 2 jours

**⚠️ Changement majeur :** Le projet n'est plus en "développement", il est en **RUN** avec des évolutions.

---

## 📋 BACKLOG ACTUEL — Priorités immédiates

### 🔴 HIGH PRIORITY — CONSOLE PROJET WHATSAPP
**Scope:** Permettre aux agents Eqdom de :
- Simuler des crédits pour les clients via WhatsApp
- Faire des demandes de crédit pour le compte des clients

**Channel:** WhatsApp Business API
**Users:** Agents Eqdom (internes)
**Impact:** Digitalisation du parcours agent
**Status:** À structurer

---

### 🟡 MEDIUM PRIORITY — ONE : Welcome SMS
**Scope:** Envoyer un SMS de bienvenue dès que le client crée un compte
**Trigger:** Création de compte (étape 2 du parcours)
**Tech:** Intégration SMS API (à définir — Twilio, Nexmo, provider Maroc?)
**Impact:** UX / Engagement client
**Status:** Spécifications à rédiger

---

### 🟡 MEDIUM PRIORITY — Espace Connecté PM (Loueurs)
**Scope:** Nouveau module pour les loueurs professionnels
**Fonctions:**
- Accès à leur compte loueur
- Visualisation des dossiers de crédit de leurs clients
- Suivi des demandes en cours

**Users:** Loueurs professionnels (B2B)
**Impact:** Nouveau segment client
**Status:** À spécifier

---

### 🟢 IN PROGRESS — Parcours eProgram
**Status:** En cours de test
**Scope:** Parcours spécifique (détails à venir par Mori)
**Next:** Junior doit suivre les tests et documenter les retours
**Action:** Créer template de suivi des tests
**Docs reçus:** `SPÉCIFICATIONS_FONCTIONNELLES_API_EPROGRAM.docx`

---

## 📁 DOCUMENTS REÇUS (À ARCHIVER)

### Specs Fonctionnelles
| Document | Projet | Statut |
|----------|--------|--------|
| `SPÉCIFICATIONS_FONCTIONNELLES_API_EPROGRAM.docx` | eProgram | À analyser |
| `Dossier_des_spécifications_détaillées.docx` | Général | À analyser |
| `20250129_PORTAIL_XMEN_Specifications_simulateur_demande_V2.docx` | ONE | ✅ Intégré |
| `20250107_PORTAIL_XMEN_Specifications_V0.1.pdf` | ONE | ✅ Intégré |

### Espace Connecté
| Document | Description | Status |
|----------|-------------|--------|
| `EQDOM_ESPACE_CONNECTE_DEMANDE_DE_DOCS_POC.docx` | Demande de documents POC | ⏸️ PROJET EN PAUSE |

### Présentations
| Document | Description |
|----------|-------------|
| `EQDOM_Concessionaire_Préz_Octobre.pptx` | Présentation Concessionaire |

---

## 🎯 STRUCTURE ACTUALISÉE DES PROJETS

| Projet | Status | Priorité | Mode |
|--------|--------|----------|------|
| **ONE (Prod)** | ✅ LIVE | Maintenance + Evol | RUN |
| **Console (Prod)** | ✅ LIVE | Maintenance + Evol | RUN |
| **Console WhatsApp** | 🔴 TODO | 🔴 HIGH | NEW PROJECT |
| **ONE Welcome SMS** | 🟡 TODO | 🟡 MEDIUM | FEATURE |
| **Espace Connecté PM** | 🟡 TODO | 🟡 MEDIUM | NEW MODULE |
| **eProgram** | 🟢 TESTING | 🟡 MEDIUM | TEST PHASE |
| **Concessionaire** | 🔴 NOT STARTED | 🟢 LOW | BACKLOG |

---

## ⚠️ NOUVELLES RESPONSABILITÉS POUR JUNIOR

### Gestion du RUN (Production)
- **Monitoring:** Suivre les indicateurs de santé des apps en prod
- **Incidents:** Documenter et suivre les bugs de production
- **Releases:** Coordonner les déploiements de correctifs

### Gestion du Backlog Évolutif
- Prioriser les nouvelles features vs. bugs
- Estimer les efforts avec Aiman
- Planifier les releases

### Suivi des Tests eProgram
- Recueillir les retours de test
- Documenter les anomalies
- Suivre les corrections

### Structure du Projet WhatsApp Console
- Rédiger le cahier des charges
- Définir le parcours utilisateur (agent)
- Identifier les intégrations nécessaires

---

## 📞 PROCESS INCIDENT PROD

**Classification :**
- 🔴 **Critique:** Site down, perte de données, sécurité — Escalade immédiate
- 🟡 **Majeur:** Fonctionnalité bloquante — Résolution < 4h
- 🟢 **Mineur:** Bug non bloquant — Backlog

**Workflow :**
1. Détection (monitoring ou signalement)
2. Classification par Junior
3. Notification Mori si Critique/Majeur
4. Documentation dans `incidents/YYYY-MM-DD-HHMM.md`
5. Suivi jusqu'à résolution
6. Post-mortem si Critique

**Contacts escalade :**
- Mori (Product) — Décisions métier
- Aiman (Tech) — Corrections techniques
- Intelcia (Ops) — Impact opérationnel

---

## 🎯 ACTIONS IMMÉDIATES POUR JUNIOR

### Cette semaine :
- [ ] Documenter les URLs de PROD (ONE + Console)
- [ ] Créer le dossier `incidents/`
- [ ] Créer le template de suivi des tests eProgram
- [ ] Rédiger le CDC WhatsApp Console (v0.1)
- [ ] Identifier le provider SMS pour Welcome SMS

### Prochaines 2 semaines :
- [ ] Structurer le backlog RUN vs. Nouveaux projets
- [ ] Mettre en place le reporting hebdo de production
- [ ] Valider le parcours WhatsApp avec Mori

---

*Mise à jour : 2026-03-05 — Post-déploiement PROD*
*Junior doit intégrer cette nouvelle dimension RUN dans sa gestion*
