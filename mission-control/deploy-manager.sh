#!/bin/bash
# mission-control-deploy-manager.sh
# Interface interactive de gestion des déploiements

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

show_header() {
    clear
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║        🎯 MISSION CONTROL - MANAGER DE DÉPLOIEMENT           ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
}

show_status() {
    BUILD_DIR="/tmp/mission-control-build"
    if [ -d "$BUILD_DIR" ]; then
        FILE_COUNT=$(find "$BUILD_DIR" -type f | wc -l)
        BUILD_SIZE=$(du -sh "$BUILD_DIR" | cut -f1)
        BUILD_TIME=$(stat -c %y "$BUILD_DIR" 2>/dev/null | cut -d'.' -f1)
        echo "📦 Build status: ✅ PRÊT ($FILE_COUNT fichiers, $BUILD_SIZE)"
        echo "   Dernière build: $BUILD_TIME"
    else
        echo "📦 Build status: ❌ AUCUN BUILD"
    fi
    echo ""
}

quick_deploy() {
    show_header
    ./quick-deploy.sh
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
}

setup_auto() {
    show_header
    ./setup-auto-deploy.sh
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
}

show_logs() {
    show_header
    if [ -f "/var/log/mission-control-deploy.log" ]; then
        echo "📋 Derniers logs de déploiement:"
        echo "═══════════════════════════════════════════════════════════════"
        tail -20 /var/log/mission-control-deploy.log
    else
        echo "ℹ️ Aucun log disponible (le cron n'a pas encore tourné)"
    fi
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
}

force_deploy() {
    show_header
    echo "🚀 Forçage du déploiement..."
    ./deploy.sh
    echo ""
    echo "✅ Build terminé. Prochaine étape: uploader sur votre service."
    echo "   Dossier: /tmp/mission-control-build"
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
}

edit_crontab() {
    show_header
    echo "📝 Édition du crontab..."
    echo ""
    crontab -l 2>/dev/null | grep mission-control || echo "ℹ️ Aucun cron mission-control configuré"
    echo ""
    read -p "Voulez-vous éditer le crontab? [o/N]: " CONFIRM
    if [[ $CONFIRM =~ ^[Oo]$ ]]; then
        crontab -e
    fi
}

main_menu() {
    while true; do
        show_header
        show_status
        
        echo "  [1] 🚀 Déploiement rapide (recommandé)"
        echo "  [2] ⚙️  Configurer mises à jour auto (cron)"
        echo "  [3] 📋 Voir les logs de déploiement"
        echo "  [4] 🔨 Forcer un rebuild"
        echo "  [5] 📝 Gérer le crontab"
        echo ""
        echo "  [0] ❌ Quitter"
        echo ""
        read -p "Choisissez une option [0-5]: " CHOICE
        
        case $CHOICE in
            1) quick_deploy ;;
            2) setup_auto ;;
            3) show_logs ;;
            4) force_deploy ;;
            5) edit_crontab ;;
            0) 
                echo ""
                echo "👋 À bientôt!"
                exit 0
                ;;
            *)
                echo "❌ Option invalide"
                sleep 1
                ;;
        esac
    done
}

# Si argument fourni, exécuter directement
case "${1:-}" in
    quick|q) quick_deploy ;;
    auto|a) setup_auto ;;
    logs|l) show_logs ;;
    build|b) force_deploy ;;
    cron|c) edit_crontab ;;
    *) main_menu ;;
esac
