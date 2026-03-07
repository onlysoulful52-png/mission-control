# 💬 GUIDE - Communiquer avec Junior (et les autres agents)

## 🎯 Les 3 Méthodes pour Parler à Junior

### Méthode 1: Depuis cette session (Rapide)

Tu peux demander à ce que ta requête soit traitée par un agent spécifique :

```
@app junior "Prépare le daily d'hier"
@app aiman "Review ce code pour CNDP compliance"
@app henry "Morning brief"
```

**Ça marche dans cette conversation.** Je (Henry) vais invoquer l'agent demandé.

---

### Méthode 2: Session dédiée (Recommandé pour focus)

Lancer une nouvelle session avec Junior uniquement :

```bash
# Dans terminal
openclaw session --agent eqdom-consultant

# Ou
openclaw session --agent aiman
```

**Avantage:** Contexte propre, pas de mélange avec les autres conversations.

---

### Méthode 3: Spawn une tâche isolée (Pour tâche spécifique)

```bash
# Exécuter une tâche et revenir avec le résultat
openclaw spawn --agent eqdom-consultant "Crée le planning de la semaine"
```

---

## 📚 Comment Charger les Documents à Junior

### Option A: Tout mettre dans son dossier (Recommandé)

```bash
# Copier tous les fichiers Eqdom dans le workspace de Junior
cp /root/.openclaw/workspace/eqdom-premium/* /root/.openclaw/agents/eqdom-consultant/context/

# Ou créer un dossier context dédié
mkdir -p ~/.openclaw/agents/eqdom-consultant/context
cp -r eqdom-premium/project-management/* ~/.openclaw/agents/eqdom-consultant/context/
```

Puis dans `persona.md`, ajouter :
```markdown
## Context Files (Auto-load)
- context/EQDOM-README.md
- context/MILESTONES.md
- context/DELIVERABLES.md
```

---

### Option B: Fichier contextuel unique (Ce qu'on va faire demain)

Créer un gros fichier `PROJECT-HANDOVER.md` avec tout :

```bash
cat > ~/.openclaw/agents/eqdom-consultant/PROJECT-HANDOVER.md << 'EOF'
# HANDOVER Eqdom - Complet

## Historique du Projet
[Dates, phases, pivots]

## Décisions Clés
[Pourquoi on a fait tel ou tel choix]

## Stack Technique
[Next.js, etc.]

## Livrables Existants
- D-001: ...
- D-002: ...

## Équipe
- Mori: CEO/Product
- Aiman: Lead Dev
- Junior: PM (toi)

## Prochains Jalons
...
EOF
```

---

### Option C: Mémoire quotidienne (Long terme)

Junior lit automatiquement chaque jour :
- `memory/YYYY-MM-DD.md` (daily notes de Mori)
- `project-management/daily/YYYY-MM-DD.md` (son propre tracking)

Donc plus tu écris dans `memory/`, plus il apprend.

---

## ✅ Comment Vérifier qu'il a Compris

### 1. Fais-lui résumer (Test de compréhension)

```
@app junior "Résume ce que tu as compris du projet Eqdom en 5 points"
```

Il doit te dire :
1. Quel est l'objectif
2. Qui sont les stakeholders
3. Où on en est
4. Quels sont les prochains jalons
5. Quels sont les risques

### 2. Pose des questions pièges

```
@app junior "Quelle est la différence entre Eqdom et une banque?"
# Réponse attendue: Société de financement ≠ banque

@app junior "Pourquoi on ne peut pas stocker le CIN dans localStorage?"
# Réponse attendue: CNDP compliance, données sensibles
```

### 3. Demande-lui un plan d'action

```
@app junior "Si tu prends le relais demain, quelles sont tes 3 premières actions?"
```

### 4. Review son travail

Quand il produit un document (daily, status, etc.), relis-le et corrige :
```
@app junior "Review STATUS.md - il manque l'avancement du DSSi"
```

---

## 🎓 Workflow Recommandé pour Demain

### Étape 1: Créer le Handover

```bash
# Tu crées un fichier avec TOUT
write ~/.openclaw/agents/eqdom-consultant/PROJECT-HANDOVER.md << 'EOF'
[Contenu complet]
EOF
```

### Étape 2: Session dédiée avec Junior

```bash
openclaw session --agent eqdom-consultant
```

### Étape 3: Test de compréhension

Dans la session Junior :
```
"Lis PROJECT-HANDOVER.md et résume ce que tu as compris"
```

### Étape 4: Remplissage ensemble

```
"Remplissons MILESTONES.md avec les vraies dates"
"Complétons le registre des risques"
"Indexons tous les livrables existants"
```

### Étape 5: Premier Daily

```
"Crée le daily pour aujourd'hui basé sur ce handover"
```

---

## 🔧 Raccourcis Utiles

| Tu veux... | Commande |
|------------|----------|
| Parler à Junior | `@app junior "..."` |
| Parler à Aiman | `@app aiman "..."` |
| Lancer session Junior | `openclaw session --agent eqdom-consultant` |
| Tâche isolée Junior | `openclaw spawn --agent eqdom-consultant "..."` |
| Vérifier compréhension | `@app junior "Résume en 5 points"` |

---

## ⚡ Tips

1. **Sois explicite:** "Junior, crée le daily d'hier" > "Fais le daily"

2. **Donne du contexte:** Quand tu lui demandes quelque chose, rappelle le contexte

3. **Vérifie son travail:** Au début, relis tout ce qu'il produit

4. **Corrige vite:** S'il comprend mal, corrige immédiatement pour pas que ça s'engraine

5. **Utilise les templates:** Il a des templates dans `project-management/`, dis-lui de les utiliser

---

**Demain on fait ça ensemble étape par étape ?**