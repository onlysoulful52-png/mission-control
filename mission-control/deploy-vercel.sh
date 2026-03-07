#!/bin/bash
# deploy-vercel.sh
# Déploiement via Vercel CLI

set -e

VERCEL_TOKEN="${VERCEL_TOKEN:-}"
BUILD_DIR="/tmp/mission-control-build"

echo "🚀 Déploiement Vercel"
echo "====================="

# Préparer le build
if [ [ ! -d "$BUILD_DIR" ]; then
    echo "📦 Préparation du build..."
    /root/.openclaw/workspace/mission-control/deploy.sh > /dev/null
fi

cd "$BUILD_DIR"

# Créer vercel.json pour config statique
cat > vercel.json << 'EOF'
{
  "version": 2,
  "public": true,
  "github": {
    "enabled": false
  }
}
EOF

if command -v vercel && [ [ -n "$VERCEL_TOKEN" ]; then
    echo "⬆️  Déploiement via Vercel CLI..."
    vercel --token="$VERCEL_TOKEN" --prod --yes 2>&1 | tee /tmp/vercel-deploy.log
    
    URL=$(grep -oP 'https://[a-z0-9-]+-[^.]+\.vercel\.app' /tmp/vercel-deploy.log | head -1)
    echo ""
    echo "✅ Déployé sur: $URL"
elif command -v npx &> /dev/null; then
    echo "📥 Installation de Vercel CLI..."
    npx vercel@latest --token="$VERCEL_TOKEN" --prod --yes 2>&1 || {
        echo ""
        echo "⚠️  Échec du déploiement auto. Manuel:"
        echo "   1. npx vercel login"
        echo "   2. npx vercel --prod"
    }
else
    echo "📋 Manuel: https://vercel.com/new"
    echo "   Glissez-déposez: $BUILD_DIR"
fi
