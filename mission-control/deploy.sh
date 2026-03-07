#!/bin/bash
# deploy-mission-control.sh
# Script de déploiement automatisé pour Mission Control sur Cloudflare Pages

set -e

PROJECT_NAME="mission-control"
DASHBOARD_DIR="/root/.openclaw/workspace/mission-control"
BUILD_DIR="/tmp/mission-control-build"
CF_API_TOKEN="${CF_API_TOKEN:-}"  # À configurer
CF_ACCOUNT_ID="${CF_ACCOUNT_ID:-}"  # À configurer

echo "🚀 Mission Control Deployment Script"
echo "====================================="

# Vérifier les prérequis
if ! command -v curl &> /dev/null; then
    echo "❌ curl requis"
    exit 1
fi

# Nettoyer et créer le build
echo "📦 Préparation du build..."
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Copier les fichiers essentiels
echo "📁 Copie des fichiers..."
cp "$DASHBOARD_DIR/dashboard-v3.html" "$BUILD_DIR/index.html"
cp -r "$DASHBOARD_DIR/data" "$BUILD_DIR/"
cp -r "$DASHBOARD_DIR/js" "$BUILD_DIR/" 2>/dev/null || true
cp -r "$DASHBOARD_DIR/business-plans" "$BUILD_DIR/" 2>/dev/null || true

# Vérifier le contenu
echo "✅ Fichiers dans le build:"
find "$BUILD_DIR" -type f | head -20

# Compter les fichiers
FILE_COUNT=$(find "$BUILD_DIR" -type f | wc -l)
echo "📊 Total: $FILE_COUNT fichiers"

# Créer l'archive pour upload
if command -v zip &> /dev/null; then
    (cd "$BUILD_DIR" && zip -r "$BUILD_DIR/mission-control.zip" . > /dev/null)
    echo "📦 Archive créée: $(ls -lh "$BUILD_DIR/mission-control.zip" 2>/dev/null | awk '{print $5}')"
else
    (cd "$BUILD_DIR" && tar -czf "$BUILD_DIR/mission-control.tar.gz" .)
    echo "📦 Archive créée: $(ls -lh "$BUILD_DIR/mission-control.tar.gz" | awk '{print $5}')"
fi

echo ""
echo "✨ Build prêt!"
echo ""
echo "📝 Prochaines étapes:"
echo "   1. Créer un compte sur https://dash.cloudflare.com"
echo "   2. Générer un API Token avec permission 'Cloudflare Pages:Edit'"
echo "   3. Récupérer votre Account ID (dans le dashboard à droite)"
echo "   4. Exporter: export CF_API_TOKEN='votre-token'"
echo "   5. Exporter: export CF_ACCOUNT_ID='votre-account-id'"
echo "   6. Exécuter: ./deploy-cloudflare.sh"
echo ""
echo "📁 Build disponible dans: $BUILD_DIR"
