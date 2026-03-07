# 🤖 PROJET BOBCAT ENERGY - Automatisation WhatsApp

## 📋 RÉSUMÉ EXÉCUTIF

**Client** : Bobcat Energy  
**Mission** : Automatiser la prospection WhatsApp d'installateurs rénovation énergétique  
**Volume cible** : Plusieurs installations/mois par installateur  
**Produit** : Dépôt dossiers CEE avec financeur partenaire

---

## 🎯 OBJECTIFS

1. **Contacter** automatiquement les installateurs depuis la base
2. **Qualifier** les prospects (intérêt, volume, disponibilité)
3. **Identifier** les leads chauds pour échange commercial
4. **Automatiser** les relances et le suivi

---

## 🏗️ ARCHITECTURE TECHNIQUE

### Option 1 : WhatsApp Business API (RECOMMANDÉE)

```
┌─────────────────────────────────────────────────────────┐
│                    BOBCAT ENERGY                        │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────┐  │
│  │ Base de      │───▶│ N8N /        │───▶│ WhatsApp │  │
│  │ Données      │    │ Make.com     │    │ Business │  │
│  │ Installateurs│    │ (Automation) │    │ API      │  │
│  └──────────────┘    └──────────────┘    └──────────┘  │
│                              │                          │
│                              ▼                          │
│                       ┌──────────────┐                  │
│                       │ Webhook      │                  │
│                       │ Réponses     │                  │
│                       └──────────────┘                  │
└─────────────────────────────────────────────────────────┘
```

**Stack technique :**
- **WhatsApp Business API** via Meta (officiel, stable)
- **N8N** ou **Make.com** pour l'automation
- **Airtable/Notion** ou **Google Sheets** pour le CRM
- **OpenAI API** pour l'analyse des réponses (optionnel)

### Option 2 : WhatsApp Web + Python (Budget limité)

- **whatsapp-web.js** ou **yowsup** pour l'envoi
- **Python + Flask** pour le webhook
- **SQLite** ou **Google Sheets** pour le stockage

⚠️ Moins stable, risque de ban WhatsApp

---

## 💬 WORKFLOW DE MESSAGES

### JOUR 0 - Premier contact

```
Bonjour [PRENOM],

Je me permets de vous contacter car j'ai vu que [ENTREPRISE] 
réalise des installations de [TYPE_INSTALLATION].

Nous travaillons avec un partenaire financeur CEE qui permet 
aux installateurs de déposer leurs dossiers avec :
• paiement rapide (sous X jours)
• accompagnement administratif complet
• conditions avantageuses pour les dossiers de qualité

Si vous réalisez régulièrement des installations, je peux vous 
expliquer rapidement comment cela fonctionne.

Seriez-vous disponible pour en discuter quelques minutes ?

Bonne journée,
[LÉONARD / ÉQUIPE BOBCAT ENERGY]
```

### Réponses possibles et scénarios

| Réponse client | Détection | Action automatique |
|----------------|-----------|-------------------|
| "Oui intéressé" / "Comment ça marche" | Mots-clés positifs | Demander volume mensuel + proposer créneau appel |
| "Pas le temps" / "Plus tard" | Mots-clés report | Relance J+3 avec message court |
| "Non merci" / "Pas intéressé" | Mots-clés négatifs | Statut "Pas intéressé" + pas de relance |
| "Quel est le tarif ?" | Questions prix | Envoyer grille tarifaire + proposer appel |
| Pas de réponse | Silence 24h | Relance J+1, J+3, J+7 |

### JOUR +1 - Relance si silence

```
Bonjour [PRENOM],

Je me permis de relancer mon message concernant notre partenariat 
CEE. 

De nombreux installateurs de [VILLE] travaillent déjà avec nous 
et apprécient la rapidité de paiement.

Disponible pour un appel de 5 minutes cette semaine ?

[ÉQUIPE BOBCAT ENERGY]
```

### JOUR +3 - Dernière relance

```
Bonjour [PRENOM],

Dernier message de ma part. Je comprends que ce ne soit pas 
l'priorité actuellement.

Si un jour vous cherchez un partenaire CEE fiable avec paiement 
rapide, n'hésitez pas à me recontacter.

Bonne continuation,
[ÉQUIPE BOBCAT ENERGY]
```

---

## 🗂️ STRUCTURE BASE DE DONNÉES

### Table `installateurs`

| Champ | Type | Description |
|-------|------|-------------|
| id | INT (PK) | Identifiant unique |
| entreprise | VARCHAR(100) | Nom entreprise |
| prenom | VARCHAR(50) | Prénom contact |
| nom | VARCHAR(50) | Nom contact |
| telephone | VARCHAR(20) | Numéro WhatsApp |
| ville | VARCHAR(50) | Zone géographique |
| type_installation | VARCHAR(100) | PAC, isolation, etc. |
| site_web | VARCHAR(200) | URL site (optionnel) |
| statut | ENUM | nouveau/contacté/intéressé/pas_intéressé/client |
| volume_estime | INT | Nb installations/mois estimé |
| date_premier_contact | DATE | Date premier envoi |
| date_derniere_relance | DATE | Date dernière relance |
| nombre_relances | INT | Compteur relances |
| notes | TEXT | Commentaires libres |
| date_rdv | DATETIME | Créneau appel proposé |
| qualifie | BOOLEAN | Lead qualifié O/N |

### Table `conversations`

| Champ | Type | Description |
|-------|------|-------------|
| id | INT (PK) | Identifiant |
| installateur_id | INT (FK) | Lien vers installateur |
| message_envoye | TEXT | Contenu message |
| date_envoi | DATETIME | Timestamp |
| reponse_recue | TEXT | Contenu réponse |
| date_reponse | DATETIME | Timestamp réponse |
| sentiment | ENUM | positif/neutre/negatif |
| action_auto | VARCHAR(50) | Action déclenchée |

---

## 🤖 AUTOMATION N8N - WORKFLOW

### Workflow 1 : Envoi initial

```
DÉCLENCHEUR : Schedule (tous les jours à 9h)
    │
    ▼
NODE : Google Sheets / Airtable
    └─▶ Récupère installateurs avec statut = "nouveau"
    └─▶ Limite : 50/jour (éviter spam)
    │
    ▼
NODE : Function (préparation message)
    └─▶ Remplace variables : [PRENOM], [ENTREPRISE], [VILLE]
    └─▶ Sélectionne template selon type_installation
    │
    ▼
NODE : WhatsApp Business API
    └─▶ Envoie message personnalisé
    │
    ▼
NODE : Update Base
    └─▶ Change statut → "contacté"
    └─▶ Enregistre date_premier_contact
    └─▶ Incrémente nombre_relances
```

### Workflow 2 : Réception réponse

```
DÉCLENCHEUR : Webhook (réception WhatsApp)
    │
    ▼
NODE : Analyse réponse
    ├─▶ IF contient "oui", "intéressé", "comment", "prix" 
    │   └─▶ Action : Envoyer message qualification
    │   └─▶ Statut : "intéressé"
    │
    ├─▶ IF contient "non", "pas", "stop"
    │   └─▶ Action : Statut "pas_intéressé"
    │   └─▶ STOP relances
    │
    ├─▶ IF contient "plus tard", "busy", "occupé"
    │   └─▶ Action : Programmer relance J+3
    │
    └─▶ ELSE (question générale)
        └─▶ Action : Envoyer FAQ ou proposer appel
```

### Workflow 3 : Relances automatiques

```
DÉCLENCHEUR : Schedule (tous les jours à 10h)
    │
    ▼
NODE : Query base
    └─▶ WHERE statut = "contacté"
    └─▶ AND date_derniere_relance > J+1
    └─▶ AND nombre_relances < 3
    │
    ▼
NODE : Envoi relance adaptée
    ├─▶ Relance 1 : Message court + valeur ajoutée
    ├─▶ Relance 2 : Témoignage/référence
    └─▶ Relance 3 : Dernier message + porte ouverte
```

---

## 📱 MESSAGES TEMPLATES (VERSIONS)

### Template A : Pompe à chaleur

```
Bonjour [PRENOM],

[NOM_ENTREPRISE] semble très active sur les pompes à chaleur 
à [VILLE].

On travaille avec un partenaire CEE qui paie les dossiers PAC 
en X jours avec un accompagnement complet.

Ça pourrait vous intéresser pour vos prochains chantiers ?

[ÉQUIPE BOBCAT]
```

### Template B : Isolation

```
Bonjour [PRENOM],

J'ai vu vos réalisations isolation sur [SITE/ZONE].

On propose un canal CEE rapide pour les installateurs isolation 
avec un vrai suivi administratif.

Vous faites combien de chantiers isolation par mois en moyenne ?

[ÉQUIPE BOBCAT]
```

### Template C : Chauffage

```
Bonjour [PRENOM],

Contact rapide concernant vos installations chauffage.

Notre partenaire CEE cherche des installateurs sérieux sur 
[VILLE] pour traiter leurs dossiers en priorité.

Vous avez 2 minutes pour un appel cette semaine ?

[ÉQUIPE BOBCAT]
```

### Template Qualification (si intérêt détecté)

```
Merci pour votre réponse [PRENOM] !

Pour voir si on peut vous accompagner :

1. Vous faites combien d'installations par mois en moyenne ?
2. Vous déposez déjà des dossiers CEE ou c'est nouveau ?

Selon votre volume, je peux vous faire une proposition adaptée.

[ÉQUIPE BOBCAT]
```

### Template Proposition RDV (si volume OK)

```
Parfait [PRENOM], avec [X] installations par mois, vous êtes 
exactement le profil qu'on recherche.

Je peux vous appeler rapidement pour vous expliquer :
• Les délais de paiement
• Les tarifs selon volume
• L'accompagnement dossiers

Vous êtes dispo [JOUR PROCHAIN] ou [JOUR +2] pour 10 minutes ?

[ÉQUIPE BOBCAT]
```

---

## 📊 DASHBOARD SUIVI

### KPIs à suivre

| Métrique | Objectif |
|----------|----------|
| Taux d'ouverture | > 80% (WhatsApp) |
| Taux de réponse | > 30% |
| Taux intérêt | > 10% |
| Taux qualification | > 5% |
| Taux RDV pris | > 3% |
| Coût par lead qualifié | < 5€ |

### Vue CRM recommandée

```
┌────────────────────────────────────────────────────────┐
│  PIPELINE BOBCAT ENERGY                                │
├────────────────────────────────────────────────────────┤
│  📥 NOUVEAUX (150)                                     │
│  📤 CONTACTÉS (45)  ← relance J+1                      │
│  💬 EN DISCUSSION (12)  ← qualification                │
│  🎯 RDV PRIS (5)  ← brief commercial                   │
│  ✅ CLIENTS (3)                                        │
│  ❌ PAS INTÉRESSÉ (20)                                 │
└────────────────────────────────────────────────────────┘
```

---

## 🛡️ CONFORMITÉ & BONNES PRATIQUES

### RGPD / Consentement

- ✅ Numéros obtenus légalement (prospection B2B autorisée)
- ✅ Possibilité de désinscription claire
- ✅ Stockage sécurisé des données
- ✅ Durée conservation limitée (3 ans max)

### Anti-spam WhatsApp

- ⛔ Max 50 messages/jour par numéro expéditeur
- ⛔ Espacer les envois (pas de bursts)
- ⛔ Varier les messages (pas de copier-coller)
- ✅ Répondre rapidement aux réponses (< 24h)
- ✅ Respecter les STOP/désinscriptions

---

## 💰 BUDGET ESTIMÉ

| Composant | Coût mensuel |
|-----------|-------------|
| WhatsApp Business API | Gratuit (messages utilisateur) ~0,05€/msg template |
| N8N Cloud (Starter) | 20€/mois |
| OpenAI API (analyse) | ~10€/mois (optionnel) |
| Airtable Pro | 20€/mois |
| **TOTAL** | **~50€/mois** |

---

## 🚀 PLAN DE DÉPLOIEMENT

### Phase 1 : Setup (Semaine 1)
- [ ] Créer compte Meta Business
- [ ] Valider WhatsApp Business API
- [ ] Configurer N8N
- [ ] Créer base Airtable

### Phase 2 : Test (Semaine 2)
- [ ] Importer 50 contacts test
- [ ] Envoyer messages manuels
- [ ] Tester scénarios réponses
- [ ] Ajuster templates

### Phase 3 : Production (Semaine 3+)
- [ ] Importer base complète
- [ ] Lancer envoi automatique (50/jour)
- [ ] Monitorer KPIs quotidiennement
- [ ] Optimiser selon retours

---

## 📎 LIVRABLES

1. ✅ Architecture technique complète
2. ✅ Workflows N8N détaillés
3. ✅ 6 templates de messages
4. ✅ Structure base de données
5. ✅ Scénarios de qualification
6. ✅ Dashboard KPIs
7. ✅ Budget et planning

---

**Prochaine étape :** Tu valides cette approche et on passe à la configuration technique ?