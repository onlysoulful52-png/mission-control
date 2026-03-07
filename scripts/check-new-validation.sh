#!/bin/bash

# Workflow trigger - Vérifie si une nouvelle opportunité a été validée
# et lance la génération du business plan

WORKSPACE="/root/.openclaw/workspace"
DATA_FILE="$WORKSPACE/mission-control/data/business-opportunities.json"
PLANS_DIR="$WORKSPACE/mission-control/business-plans"
STATE_FILE="$WORKSPACE/.business-validation-state"

cd "$WORKSPACE"

# Créer le fichier d'état s'il n'existe pas
if [ ! -f "$STATE_FILE" ]; then
    echo "0" > "$STATE_FILE"
fi

# Compter les opportunités validées actuelles
VALIDATED_COUNT=$(grep -c '"statut": "valide"' "$DATA_FILE" 2>/dev/null || echo "0")
LAST_COUNT=$(cat "$STATE_FILE")

# Si une nouvelle opportunité a été validée
if [ "$VALIDATED_COUNT" -gt "$LAST_COUNT" ]; then
    echo "🎯 Nouvelle opportunité validée détectée!"
    
    # Trouver l'ID de la dernière opportunité validée
    NEW_OPP=$(grep -B5 '"statut": "valide"' "$DATA_FILE" | grep '"id":' | tail -1 | cut -d'"' -f4)
    
    if [ ! -z "$NEW_OPP" ]; then
        echo "📄 Génération du Business Plan pour: $NEW_OPP"
        
        # Mettre à jour l'état
        echo "$VALIDATED_COUNT" > "$STATE_FILE"
        
        # Créer le répertoire des plans
        mkdir -p "$PLANS_DIR"
        
        # Générer le business plan (via agent)
        echo "✅ Workflow déclenché pour $NEW_OPP"
        exit 0
    fi
else
    echo "✓ Pas de nouvelle validation ($VALIDATED_COUNT validées)"
fi

exit 0
