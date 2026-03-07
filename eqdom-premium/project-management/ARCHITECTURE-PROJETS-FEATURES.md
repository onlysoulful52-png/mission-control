# 📂 ARCHITECTURE PROJETS vs FEATURES — Eqdom Portfolio

**Date:** 2026-03-05  
**Classification:** PROJETS (chantiers) vs FEATURES (évolutions)

---

## 🏗️ PROJETS (Chantiers Structurants)

Les **PROJETS** sont des chantiers autonomes avec leur propre cycle de vie, équipe et livrables.

### 1️⃣ ONE — Portail Client
| Attribut | Valeur |
|----------|--------|
| **Status** | ✅ LIVE en PROD (déployé 2026-03-03) |
| **Scope** | Portail digital clients Eqdom |
| **URL Prod** | [À compléter] |
| **Stack** | Next.js, React, TypeScript, Tailwind |
| **Mode** | RUN (Production + Évolutions) |

**Modules livrés:**
- ✅ Simulation crédit (conso + véhicule)
- ✅ Demande de crédit (PB + PS/CNT)
- ✅ Espace connecté client

**Backlog interne (features):**
- Welcome SMS
- Espace Connecté PM (loueurs)

---

### 2️⃣ CONSOLE — Back-office Intelcia
| Attribut | Valeur |
|----------|--------|
| **Status** | ✅ LIVE en PROD (déployé 2026-03-03) |
| **Scope** | Console traitement demandes pour agents |
| **Users** | Agents Intelcia |
| **Mode** | RUN (Production + Évolutions) |

**Backlog interne (features):**
- WhatsApp Integration (agents)

---

### 3️⃣ ePROGRAM — Parcours Spécifique
| Attribut | Valeur |
|----------|--------|
| **Status** | 🟢 TESTING |
| **Scope** | Parcours crédit spécifique |
| **Docs** | `SPÉCIFICATIONS_FONCTIONNELLES_API_EPROGRAM.docx` |
| **Mode** | Phase test |

---

### 4️⃣ CONCESSIONAIRE — Parcours Commerciaux
| Attribut | Valeur |
|----------|--------|
| **Status** | 🔴 NOT STARTED |
| **Scope** | Outils commerciaux terrain |
| **Priorité** | 🟢 LOW (backlog) |

---

### ⏸️ EN PAUSE

#### DEMANDE DE DOCS — Espace Connecté
| Attribut | Valeur |
|----------|--------|
| **Status** | ⏸️ PROJET EN PAUSE |
| **Note** | Ne pas travailler dessus pour l'instant |
| **Docs** | `EQDOM_ESPACE_CONNECTE_DEMANDE_DE_DOCS_POC.docx` |

---

## 🔧 FEATURES & AJUSTEMENTS

Les **FEATURES** sont des évolutions ou ajustements sur des projets existants. Elles n'ont pas de cycle de vie autonome.

### 🔴 HIGH PRIORITY

#### WhatsApp Console
| Attribut | Valeur |
|----------|--------|
| **Type** | Feature |
| **Projet parent** | CONSOLE |
| **Scope** | Agents simulent/fonctionnent via WhatsApp pour clients |
| **Impact** | Digitalisation parcours agent |
| **Status** | À structurer |

**User Story:**
> En tant qu'agent Eqdom, je veux pouvoir simuler un crédit et faire une demande pour un client via WhatsApp pour digitaliser mon processus de vente.

---

### 🟡 MEDIUM PRIORITY

#### Welcome SMS
| Attribut | Valeur |
|----------|--------|
| **Type** | Feature |
| **Projet parent** | ONE |
| **Scope** | SMS de bienvenue après création compte |
| **Trigger** | Création compte (étape 2) |
| **Tech** | SMS API à définir |
| **Status** | Spécifications à rédiger |

---

#### Espace Connecté PM (Loueurs)
| Attribut | Valeur |
|----------|--------|
| **Type** | Module / Feature majeure |
| **Projet parent** | ONE |
| **Scope** | Module dédié loueurs professionnels |
| **Users** | Loueurs B2B |
| **Fonctions** | Compte loueur, dossiers clients, suivi |
| **Status** | Analyse |

---

## 📊 MATRICE DE CLASSIFICATION

| Élément | Type | Projet Parent | Priorité |
|---------|------|---------------|----------|
| ONE | **PROJET** | — | RUN |
| CONSOLE | **PROJET** | — | RUN |
| WhatsApp Console | **FEATURE** | CONSOLE | 🔴 HIGH |
| Welcome SMS | **FEATURE** | ONE | 🟡 MEDIUM |
| Espace Connecté PM | **FEATURE** | ONE | 🟡 MEDIUM |
| eProgram | **PROJET** | — | 🟡 MEDIUM |
| Concessionaire | **PROJET** | — | 🟢 LOW |
| Demande de docs | **PROJET** | — | ⏸️ PAUSE |

---

## 🎯 RÈGLES DE GESTION

### Pour les PROJETS :
- ✅ Roadmap propre
- ✅ Budget alloué
- ✅ Équipe dédiée
- ✅ Livrables définis
- ✅ Go/No-Go decision

### Pour les FEATURES :
- ✅ Rattachée à un Projet parent
- ✅ User Story claire
- ✅ Estimation d'effort
- ✅ Priorisation relative au projet
- ❌ Pas de budget autonome
- ❌ Pas de roadmap séparée

---

## 📝 COMMENT UTILISER CETTE CLASSIFICATION

**Quand Mori dit :** *"Je veux ajouter un welcome SMS"*
→ C'est une **FEATURE** sur le **PROJET ONE**

**Quand Mori dit :** *"Je veux un parcours pour les commerciaux"*
→ C'est un **PROJET** (Concessionaire)

**Quand Junior reporte :**
```
PROJET: ONE
├── Status: LIVE
├── Features en cours:
│   ├── Welcome SMS (MEDIUM)
│   └── Espace Connecté PM (MEDIUM)
└── RUN: Maintenance quotidienne
```

---

*Document créé pour clarifier la distinction Projets vs Features*  
*Junior doit utiliser cette classification dans tous les reports*
