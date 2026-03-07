#!/bin/bash

# Script de mise à jour du dashboard Mission Control

WORKSPACE="/root/.openclaw/workspace"
REPO="https://github.com/onlysoulful52-png/mission-control.git"

cd "$WORKSPACE"

# Git config
git config user.email "ops@mission-control.local"
git config user.name "Ops Agent"

# Commit et push
git add -A
git commit -m "🔄 Auto-update $(date '+%Y-%m-%d %H:%M:%S')" || exit 0
git push "$REPO" master --force

echo "✅ Mis à jour: $(date)"
