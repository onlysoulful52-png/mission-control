#!/bin/bash
# deploy-netlify.sh
# Déploiement via Netlify CLI (solution simple sans config complexe)

set -e

NETLIFY_AUTH_TOKEN="${NETLIFY_AUTH_TOKEN:-}"
BUILD_DIR="/tmp/mission-control-build"

echo "🚀 Déploiement Netlify"
echo "======================"

# Préparer le build si nécessaire
if [ [ ! -d "$BUILD_DIR" ]; then
    echo "📦 Préparation du build..."
    /root/.openclaw/workspace/mission-control/deploy.sh > /dev/null
fi

cd "$BUILD_DIR"

# Méthode 1: Netlify CLI si disponible
if command -v netlify &> /dev/null; then
    echo "⬆️  Déploiement via Netlify CLI..."
    
    if [ [ -n "$NETLIFY_AUTH_TOKEN" ]; then
        netlify deploy --prod --dir=. --auth="$NETLIFY_AUTH_TOKEN" 2>&1 | tee /tmp/netlify-deploy.log
        
        URL=$(grep -oP 'Website URL:\s+\K\S+' /tmp/netlify-deploy.log || grep -oP 'https://[a-z0-9-]+\.netlify\.app' /tmp/netlify-deploy.log)
        echo ""
        echo "✅ Déployé sur: $URL"
    else
        echo "⚠️  NETLIFY_AUTH_TOKEN non défini"
        echo "   → Connectez-vous manuellement avec: netlify login"
        netlify deploy --prod --dir=.
    fi
else
    # Méthode 2: Upload manuel via API
    echo "🌐 Netlify CLI non installé. Utilisation de l'API..."
    echo ""
    echo "📋 Instructions manuelles:"
    echo "   1. Allez sur https://app.netlify.com/drop"
    echo "   2. Glissez-déposez ce dossier: $BUILD_DIR"
    echo "   3. Votre site sera live instantanément!"
    echo ""
    echo "📁 Fichiers à uploader:"
    ls -la "$BUILD_DIR"
fi
