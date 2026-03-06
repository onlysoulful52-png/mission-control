#!/bin/bash
# Script pour ouvrir le dashboard

echo "🚀 Démarrage du Mission Control Dashboard..."

# Vérifier si le fichier existe
if [ ! -f "/root/.openclaw/workspace/mission-control/dashboard.html" ]; then
    echo "❌ Fichier non trouvé"
    exit 1
fi

# Méthode 1: Ouvrir directement avec xdg-open
if command -v xdg-open &> /dev/null; then
    echo "📂 Ouverture avec xdg-open..."
    xdg-open /root/.openclaw/workspace/mission-control/dashboard.html
    exit 0
fi

# Méthode 2: Serveur Python
echo "🌐 Démarrage serveur Python sur http://localhost:8080"
cd /root/.openclaw/workspace/mission-control
python3 -m http.server 8080 &
sleep 2
echo "✅ Dashboard accessible sur: http://localhost:8080/dashboard.html"
