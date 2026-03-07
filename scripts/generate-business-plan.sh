#!/bin/bash

# Générateur de Business Plan Complet
# Exécuté automatiquement quand Rothschild valide une opportunité

WORKSPACE="/root/.openclaw/workspace"
DATA_FILE="$WORKSPACE/mission-control/data/business-opportunities.json"
OUTPUT_DIR="$WORKSPACE/mission-control/business-plans"

# Récupérer l'ID de l'opportunité validée
OPP_ID=$1

if [ -z "$OPP_ID" ]; then
    echo "Usage: $0 <opportunity_id>"
    exit 1
fi

# Créer le répertoire s'il n'existe pas
mkdir -p "$OUTPUT_DIR"

echo "📄 Génération du Business Plan pour $OPP_ID..."
