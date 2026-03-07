#!/bin/bash
# setup-auto-deploy.sh
# Configure le déploiement automatique toutes les 30 minutes

set -e

echo "🔄 Configuration du déploiement automatique"
echo "==========================================="
echo ""

# Détecter le service préféré
echo "Quel service de déploiement souhaitez-vous utiliser?"
echo ""
echo "  1) Netlify Drop (recommandé - le plus simple)"
echo "  2) Cloudflare Pages (le plus rapide)"
echo "  3) Vercel (analytics inclus)"
echo ""
read -p "Choix [1-3]: " CHOICE

case $CHOICE in
    1)
        DEPLOY_SCRIPT="./deploy-netlify.sh"
        SERVICE_NAME="Netlify"
        ;;
    2)
        DEPLOY_SCRIPT="./deploy-cloudflare.sh"
        SERVICE_NAME="Cloudflare Pages"
        
        # Vérifier les tokens
        if [ [ -z "$CF_API_TOKEN" ] || [ -z "$CF_ACCOUNT_ID" ]]; then
            echo ""
            echo "⚠️  Tokens Cloudflare manquants!"
            echo "Exportez d'abord:"
            echo "  export CF_API_TOKEN='votre-token'"
            echo "  export CF_ACCOUNT_ID='votre-account-id'"
            exit 1
        fi
        ;;
    3)
        DEPLOY_SCRIPT="./deploy-vercel.sh"
        SERVICE_NAME="Vercel"
        ;;
    *)
        echo "❌ Choix invalide"
        exit 1
        ;;
esac

echo ""
echo "✅ Service choisi: $SERVICE_NAME"
echo ""

# Créer le script de déploiement complet
DEPLOY_ALL="/root/.openclaw/workspace/mission-control/auto-deploy.sh"

cat > "$DEPLOY_ALL" << EOF
#!/bin/bash
# Auto-generated deployment script
# Généré le: $(date)

cd /root/.openclaw/workspace/mission-control

# Log
exec 1>> /var/log/mission-control-deploy.log 2>&1
echo "[\$(date)] Début déploiement..."

# Update des données
if [ -f "sync.js" ]; then
    node sync.js 2>/dev/null || echo "⚠️ sync.js a échoué (non critique)"
fi

# Build
./deploy.sh > /dev/null 2>&1

# Deploy
$DEPLOY_SCRIPT > /dev/null 2>&1

echo "[\$(date)] Déploiement terminé"
EOF

chmod +x "$DEPLOY_ALL"

echo "📝 Script créé: $DEPLOY_ALL"
echo ""

# Installer le cron
echo "Installation du cron (toutes les 30 min)..."

# Créer une entrée crontab temporaire
CRON_ENTRY="*/30 * * * * $DEPLOY_ALL"

# Vérifier si déjà présent
(crontab -l 2>/dev/null | grep -v "mission-control" || true) > /tmp/crontab.tmp
echo "$CRON_ENTRY" >> /tmp/crontab.tmp

# Installer
 crontab /tmp/crontab.tmp
rm /tmp/crontab.tmp

echo ""
echo "✅ Configuration terminée!"
echo ""
echo "📋 Résumé:"
echo "   • Service: $SERVICE_NAME"
echo "   • Fréquence: Toutes les 30 minutes"
echo "   • Log: /var/log/mission-control-deploy.log"
echo "   • Script: $DEPLOY_ALL"
echo ""
echo "🔧 Commandes utiles:"
echo "   Voir les cron: crontab -l"
echo "   Voir les logs: tail -f /var/log/mission-control-deploy.log"
echo "   Test manuel: $DEPLOY_ALL"
echo ""
echo "⚠️  IMPORTANT: Faites le premier déploiement MANUELLEMENT"
echo "   pour obtenir l'URL publique avant que le cron ne démarre."
