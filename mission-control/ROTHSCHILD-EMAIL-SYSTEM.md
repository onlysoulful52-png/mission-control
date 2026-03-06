# Rothschild Email Collection System

## 📧 Configuration Google Sheets

### Sheet URL
```
https://docs.google.com/spreadsheets/d/1qM2Q4tI2UYv60we3bK6sh4q1637-oMsinByzyhwv81A/edit?usp=sharing
```

### Statut
✅ Accès confirmé — Mode "View only"

### Structure attendue
| Colonne | Contenu | Utilisation |
|---------|---------|-------------|
| A | Timestamp | Quand l'email a été reçu |
| B | Expéditeur | Qui a envoyé |
| C | Sujet | Objet de l'email |
| D | Contenu | Corps du message |
| E | Label/Catégorie | Classification auto par Rothschild |
| F | Action assignée | Quoi faire |
| G | Agent assigné | Qui s'en occupe |
| H | Statut | À traiter / En cours / Fait |

## 🎯 Processus Rothschild

### 1. Détection
Rothschild scanne le sheet toutes les 15 minutes

### 2. Analyse
Pour chaque nouvel email :
- **Classifie** : Eqdom / Bobcat / Admin / Spam / Urgent
- **Extrait** : Action items, deadlines, risques
- **Identifie** : Nouvelles parties prenantes
- **Évalue** : Criticité pour Eqdom (🔴🟡🟢)

### 3. Décision
```
🎯 DÉCISION RÖTHSCHILD — Email Processing
═══════════════════════════════════════
Timestamp: [now]
Contexte: Email reçu de [expéditeur] — [sujet]

CLASSIFICATION: [Eqdom/Bobcat/Admin/Spam/Urgent]
CRITICITÉ: [🔴🟡🟢]

DÉCISION: [Créer tâche / Ignorer / Escalader immédiatement]
ASSIGNÉ À: [Agent]

EXTRACTION ACTION ITEMS:
• [Action 1]
• [Action 2]
• [Deadline identifiée: X]

JUSTIFICATION:
• Problème/Opportunité: [Description]
• Impact sur Eqdom: [Criticité]
• Rationale: [Pourquoi cette action]

RÉSULTAT ATTENDU: [Outcome]
VÉRIFICATION: [Quand vérifier]
═══════════════════════════════════════
```

### 4. Action
- Crée tâche dans le système
- Notifie l'agent assigné
- Met à jour le sheet (si accès édition)
- Enregistre dans ROTHCHILD-DECISION-LOG.md

## 🔁 Intégration temps réel

### Option 1 : Google Apps Script (Recommandé)
Si tu veux du vrai temps réel, ajoute ce script au Sheet :

```javascript
function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var row = e.range.getRow();
  
  // Appeler webhook quand nouvelle ligne ajoutée
  var data = {
    timestamp: sheet.getRange(row, 1).getValue(),
    from: sheet.getRange(row, 2).getValue(),
    subject: sheet.getRange(row, 3).getValue(),
    content: sheet.getRange(row, 4).getValue()
  };
  
  UrlFetchApp.fetch('https://ton-webhook.com/email', {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify(data)
  });
}
```

### Option 2 : Polling (Actuel)
Rothschild scanne toutes les 15 minutes via cron

## 📋 Exemples de traitement

### Email Eqdom — Critique
```
De: partenaire-bancaire@exemple.com
Sujet: Urgent — Changement API CNDP

Rothschild analyse → 🔴 CRITIQUE Eqdom
→ Décision: Assigner à Aiman immédiatement
→ Justification: Impact sur compliance
→ Action: Implémenter nouveau endpoint avant J-3
```

### Email Opportunité
```
De: investisseur@vc.com
Sujet: Intérêt pour Eqdom — Due diligence

Rothschild analyse → 🟢 OPPORTUNITÉ
→ Décision: Préparer deck + financials
→ Assigné à: Junior (deck) + Henry (coordination)
→ Deadline: 48h
```

### Email Spam/Admin
```
De: newsletter@random.com
Sujet: 50% de réduction

Rothschild analyse → ⚪ SPAM
→ Décision: Ignorer, marquer comme traité
```

## 🚨 Alertes automatiques

Rothschild déclenche une alerte immédiate si :
- 🔴 Mot-clé critique : "CNDP", "AMF", "audit", "violation", "urgent"
- 🔴 Expéditeur important : Partenaires bancaires, investisseurs, régulateurs
- 🔴 Deadline imminente : Mention de date dans moins de 48h
- 🟡 Opportunité : "partenariat", "investissement", "collaboration"

## 📝 Logs

Tout est traçable dans :
- `ROTHSCHILD-DECISION-LOG.md` — Décisions prises
- `ROTHSCHILD-EMAIL-LOG.md` — Emails traités (à créer)

---
**Système activé** — Rothschild surveille le sheet
