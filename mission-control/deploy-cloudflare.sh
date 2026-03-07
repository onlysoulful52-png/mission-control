#!/bin/bash
# deploy-cloudflare.sh
# Déploiement direct sur Cloudflare Pages via API

set -e

CF_API_TOKEN="${CF_API_TOKEN:-}"
CF_ACCOUNT_ID="${CF_ACCOUNT_ID:-}"
PROJECT_NAME="${CF_PROJECT_NAME:-mission-control-dashboard}"
BUILD_DIR="/tmp/mission-control-build"

echo "🚀 Déploiement Cloudflare Pages"
echo "==============================="

# Validation
if [ -z "$CF_API_TOKEN" ]; then
    echo "❌ Variable CF_API_TOKEN manquante"
    echo "   → Créez un token sur https://dash.cloudflare.com/profile/api-tokens"
    echo "   → Permissions: Cloudflare Pages:Edit"
    exit 1
fi

if [ [ -z "$CF_ACCOUNT_ID" ]; then
    echo "❌ Variable CF_ACCOUNT_ID manquante"
    echo "   → Trouvez-le dans le dashboard Cloudflare (colonne de droite)"
    exit 1
fi

# Vérifier que le build existe
if [ [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Build non trouvé. Exécutez d'abord: ./deploy.sh"
    exit 1
fi

echo "📡 Création/mise à jour du projet '$PROJECT_NAME'..."

# Créer le projet s'il n'existe pas
curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/pages/projects" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$PROJECT_NAME\",\"production_branch\":\"main\"}" > /dev/null 2>&1 || true

# Obtenir l'upload URL
echo "📤 Demande d'URL de déploiement..."
UPLOAD_RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"branch":"main"}')

# Upload direct des fichiers (méthode simple via git)
echo "📦 Alternative: Déploiement via git..."
echo ""

# Méthode alternative: utiliser Wrangler si disponible
if command -v npx &> /dev/null; then
    echo "🛠️  Installation de Wrangler CLI..."
    cd "$BUILD_DIR"
    
    # Créer wrangler.toml
    cat > wrangler.toml << EOF
name = "$PROJECT_NAME"
compatibility_date = "2024-01-01"

[site]
bucket = "."
EOF
    
    echo "⬆️  Déploiement avec Wrangler..."
    CF_API_TOKEN="$CF_API_TOKEN" npx wrangler pages deploy . --project-name="$PROJECT_NAME" --branch=main 2>&1 | tee /tmp/deploy.log || {
        echo ""
        echo "⚠️  Wrangler a échoué. Tentative avec curl direct..."
        MANUAL_DEPLOY
    }
else
    MANUAL_DEPLOY
fi

echo ""
echo "✅ Déploiement terminé!"
echo ""
echo "🌐 URL de votre dashboard:"
echo "   https://$PROJECT_NAME.pages.dev"
echo ""
echo "⏰ Prochaine mise à jour automatique dans 30 minutes"
