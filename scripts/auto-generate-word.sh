#!/bin/bash

# Auto-generateur de documents Word pour les opportunités Rothschild
# S'exécute après chaque validation de nouvelle opportunité

WORKSPACE="/root/.openclaw/workspace"
SCRIPT="$WORKSPACE/scripts/convert-to-word.py"
OUTPUT_DIR="$WORKSPACE/mission-control/business-plans/word"

echo "📝 Génération des documents Word pour les opportunités Rothschild..."

# Exécuter le script Python
python3 "$SCRIPT"

if [ $? -eq 0 ]; then
    echo "✅ Documents Word générés avec succès"
    
    # Commit et push
    cd "$WORKSPACE"
    git add "$OUTPUT_DIR"
    git commit -m "Auto: Generate Word docs for Rothschild findings - $(date '+%H:%M')"
    git push origin master --force
    
    echo "🚀 Documents Word déployés sur GitHub"
else
    echo "❌ Erreur lors de la génération des documents Word"
    exit 1
fi
