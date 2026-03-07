#!/bin/bash
# quick-deploy.sh
# Solution LA PLUS SIMPLE - Build + instructions drag-and-drop

set -e

DASHBOARD_DIR="/root/.openclaw/workspace/mission-control"
BUILD_DIR="/tmp/mission-control-build"

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     🚀 MISSION CONTROL - DÉPLOIEMENT EXPRESS (30s)           ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Étape 1: Build
echo "📦 Étape 1/3: Préparation du build..."
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

cp "$DASHBOARD_DIR/dashboard-v3.html" "$BUILD_DIR/index.html"
cp -r "$DASHBOARD_DIR/data" "$BUILD_DIR/"
cp -r "$DASHBOARD_DIR/js" "$BUILD_DIR/" 2>/dev/null || true
cp -r "$DASHBOARD_DIR/business-plans" "$BUILD_DIR/" 2>/dev/null || true

FILE_COUNT=$(find "$BUILD_DIR" -type f | wc -l)
echo "   ✅ $FILE_COUNT fichiers prêts"

# Étape 2: Créer l'archive
echo ""
echo "📦 Étape 2/3: Création de l'archive..."
cd "$BUILD_DIR"
ARCHIVE="/root/mission-control-deploy.zip"

# Créer le zip
if command -v zip &> /dev/null; then
    zip -rq "$ARCHIVE" .
else
    # Fallback: créer un dossier compressible
    echo "   ⚠️  zip non disponible, utilisation du dossier direct"
    ARCHIVE="$BUILD_DIR"
fi

ARCHIVE_SIZE=$(du -sh "$ARCHIVE" 2>/dev/null | cut -f1 || du -sh "$BUILD_DIR" | cut -f1)
echo "   ✅ Archive: $ARCHIVE_SIZE"

# Étape 3: Instructions
echo ""
echo "🚀 Étape 3/3: Déploiement"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "  ┌─────────────────────────────────────────────────────────┐"
echo "  │  OPTION A: Netlify Drop (RECOMMANDÉ - 30 secondes)     │"
echo "  └─────────────────────────────────────────────────────────┘"
echo ""
echo "     1. Ouvrez:  https://app.netlify.com/drop"
echo "     2. Glissez-déposez ce dossier: $BUILD_DIR"
echo "     3. Votre URL est instantanément active! 🎉"
echo ""
echo "  ┌─────────────────────────────────────────────────────────┐"
echo "  │  OPTION B: Cloudflare Pages (Performance maximale)     │"
echo "  └─────────────────────────────────────────────────────────┘"
echo ""
echo "     1. Allez sur: https://dash.cloudflare.com"
echo "     2. Workers & Pages → Create → Upload assets"
echo "     3. Déposez l'archive: $ARCHIVE"
echo ""
echo "  ┌─────────────────────────────────────────────────────────┐"
echo "  │  OPTION C: Vercel                                      │"
echo "  └─────────────────────────────────────────────────────────┘"
echo ""
echo "     1. Allez sur: https://vercel.com/new"
echo "     2. Import Git... ou glisser-déposer"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📁 Fichiers prêts:"
find "$BUILD_DIR" -type f | head -8 | sed 's/^/   /'
[ $(find "$BUILD_DIR" -type f | wc -l) -gt 8 ] && echo "   ... ($(($(find "$BUILD_DIR" -type f | wc -l) - 8)) fichiers supplémentaires)"
echo ""
echo "💡 CONSEIL: Bookmark votre URL après déploiement!"
echo ""
echo "🔄 Pour activer les mises à jour auto toutes les 30 min:"
echo "   ./setup-auto-deploy.sh"
echo ""
