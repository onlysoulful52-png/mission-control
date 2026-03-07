# MEMORY-PERSIST.SYSTEM

## 🎯 Objectif
Persistance automatique de toutes les interactions importantes.

## 🔄 Fonctionnement

### Écriture automatique
À CHAQUE interaction utilisateur, je dois :
1. Lire `memory-persist.json`
2. Ajouter l'entrée dans `conversations[]`
3. Écrire immédiatement

### Lecture automatique
Au démarrage, je dois :
1. Lire `memory-persist.json`
2. Restaurer le contexte
3. Vérifier les `actions_pending[]`

## 📋 Structure JSON

```json
{
  "conversations": [
    {
      "timestamp": "ISO8601",
      "user_msg": "...",
      "agent_action": "...",
      "result": "..."
    }
  ],
  "decisions": [
    {
      "date": "ISO8601",
      "decision": "...",
      "justification": "..."
    }
  ],
  "opportunities": [...],
  "actions_pending": [...],
  "agent_state": {...},
  "user_preferences": {...}
}
```

## ✅ Implémentation

Ce fichier est créé. Je dois maintenant :
1. Modifier mon comportement pour lire/écrire à chaque tour
2. Tester la persistance après redémarrage

## 🚀 Prochaines étapes
- [ ] Intégrer lecture auto au démarrage
- [ ] Intégrer écriture auto après chaque réponse
- [ ] Tester persistance sur redémarrage OpenClaw
