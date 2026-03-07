#!/bin/bash

# Script de mise à jour COMPLETE du dashboard Mission Control
# Met à jour TOUTES les données de TOUS les agents

WORKSPACE="/root/.openclaw/workspace"
REPO="https://github.com/onlysoulful52-png/mission-control.git"

cd "$WORKSPACE"

# Configuration
git config user.email "ops@mission-control.local"
git config user.name "Ops Agent"

# Ajouter tous les changements
git add -A

# Commit
git commit -m "🔄 Update $(date '+%Y-%m-%d %H:%M:%S')"

# Push
git push "$REPO" master --force

echo "✅ Dashboard mis à jour: $(date)"
