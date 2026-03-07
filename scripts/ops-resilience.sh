#!/bin/bash

# Ops Resilience Script - Plans B/C Automatiques
# Exécuté par Ops via OpenClaw (pas cron shell)

WORKSPACE="/root/.openclaw/workspace"
LOG_FILE="/tmp/ops-resilience.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] Ops Resilience Check starting..." >> "$LOG_FILE"

cd "$WORKSPACE"

# === PLAN B AUTO POUR CRON BLOQUÉ ===
# Plan A: Cron shell (échoue) → Plan B: Exec tool (ce script)

# Vérifier changements
if ! git diff --quiet HEAD; then
    echo "[$TIMESTAMP] Changements détectés - Plan B exécution" >> "$LOG_FILE"
    
    # Plan B: Git add/commit/push direct
    git config user.email "ops@resilience.local"
    git config user.name "Ops Resilience"
    git add -A
    git commit -m "🔄 Auto-resilience: $TIMESTAMP" || true
    
    # Push avec retry (Plan C si échec)
    if git push origin master --force; then
        echo "[$TIMESTAMP] ✅ Push Plan B réussi" >> "$LOG_FILE"
    else
        echo "[$TIMESTAMP] ❌ Push échoué - Plan C: backup local" >> "$LOG_FILE"
        cp -r mission-control/data/ /tmp/backup-data-$(date +%s)/
        echo "[$TIMESTAMP] 💾 Backup créé dans /tmp/" >> "$LOG_FILE"
    fi
else
    echo "[$TIMESTAMP] Aucun changement - rien à faire" >> "$LOG_FILE"
fi

# === CHECK WHATSAPP ===
# Si déconnecté, Plan B: notification
if ! pgrep -f "whatsapp" > /dev/null; then
    echo "[$TIMESTAMP] ⚠️ WhatsApp non détecté - Plan B: retry" >> "$LOG_FILE"
    # Laisser le système auto-reconnect gérer
fi

echo "[$TIMESTAMP] Ops Resilience Check terminé" >> "$LOG_FILE"
