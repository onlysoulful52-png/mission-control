#!/bin/bash

# Dashboard Auto-Update - VRAIES DONNÉES SEULEMENT
# Déclenchement uniquement si des fichiers réels ont changé

WORKSPACE="/root/.openclaw/workspace"
LOG_FILE="/tmp/dashboard-update.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] Vérification des changements..." >> "$LOG_FILE"

cd "$WORKSPACE"

# Vérifier s'il y a des changements dans les données réelles
CHANGED=false

# Fichiers à surveiller (données réelles seulement)
FILES_TO_CHECK=(
    "mission-control/data/business-opportunities.json"
    "mission-control/data/mission-state.json"
    "mission-control/data/tasks.json"
    "mission-control/data/agents-status.json"
    "AGENTS_TEAM.md"
)

for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        if git diff --quiet "$file" 2>/dev/null; then
            : # Pas de changement
        else
            CHANGED=true
            echo "  → Changement détecté: $file" >> "$LOG_FILE"
        fi
    fi
done

# Vérifier aussi les personas
if [ -d "agents/personas" ]; then
    if ! git diff --quiet agents/personas/ 2>/dev/null; then
        CHANGED=true
        echo "  → Changement détecté: agents/personas/" >> "$LOG_FILE"
    fi
fi

# Si aucun changement, sortir silencieusement
if [ "$CHANGED" = false ]; then
    echo "[$TIMESTAMP] Aucun changement. Pas de mise à jour nécessaire." >> "$LOG_FILE"
    exit 0
fi

echo "[$TIMESTAMP] Changements détectés. Mise à jour du dashboard..." >> "$LOG_FILE"

# Config git
git config user.email "ops@team.local"
git config user.name "Ops Agent"

# Ajouter tous les changements
git add -A

# Commit avec timestamp
CHANGES=$(git diff --cached --name-only | tr '\n' ', ')
git commit -m "Auto-update: $TIMESTAMP - Changements: ${CHANGES%, }"

# Push (le token doit être configuré dans git config ou via variable d'environnement)
git push origin master --force

if [ $? -eq 0 ]; then
    echo "[$TIMESTAMP] ✅ Dashboard mis à jour avec succès" >> "$LOG_FILE"
    echo "[$TIMESTAMP] Fichiers modifiés: ${CHANGES%, }" >> "$LOG_FILE"
else
    echo "[$TIMESTAMP] ❌ Échec du push" >> "$LOG_FILE"
    exit 1
fi
