# 🤖 BOBCAT ENERGY - WhatsApp Bot (Gratuit)

Script Python pour automatiser la prospection WhatsApp d'installateurs.

## ⚡ CE QUE FAIT LE SCRIPT

- ✅ Envoie messages WhatsApp automatiquement
- ✅ Gère 3 niveaux de relances (J0, J+3, J+7)
- ✅ Base de données JSON locale (pas besoin de Google Sheets)
- ✅ Statistiques en temps réel
- ✅ Anti-ban (délais aléatoires, limites de messages)
- ✅ Menu interactif simple

## 📦 PRÉREQUIS

### 1. Python (si pas installé)

**Windows :**
- Va sur https://python.org/downloads
- Télécharge Python 3.10+
- **IMPORTANT :** Coche "Add Python to PATH" lors de l'installation

**Mac :**
```bash
brew install python3
```

**Linux :**
```bash
sudo apt update
sudo apt install python3 python3-pip
```

### 2. Vérifier l'installation

Ouvre un terminal (cmd sur Windows) et tape :
```bash
python --version
```

Tu dois voir : `Python 3.10.x` (ou plus récent)

## 🚀 INSTALLATION

### Étape 1 : Télécharge les fichiers

Place `bobcat_bot.py` dans un dossier (ex: `C:\Bobcat` sur Windows)

### Étape 2 : Configure tes contacts

Le script crée automatiquement un fichier `installateurs.json` avec des exemples.

Modifie ce fichier avec TES vrais contacts :

```json
[
  {
    "id": 1,
    "entreprise": "Dupont Chauffage",
    "prenom": "Jean",
    "telephone": "0612345678",
    "type_installation": "pompes à chaleur",
    "ville": "Paris",
    "statut": "nouveau",
    "date_contact": null,
    "nb_relances": 0,
    "notes": ""
  },
  {
    "id": 2,
    "entreprise": "Isol Pro",
    "prenom": "Marie",
    "telephone": "0687654321",
    "type_installation": "isolation",
    "ville": "Lyon",
    "statut": "nouveau",
    "date_contact": null,
    "nb_relances": 0,
    "notes": ""
  }
]
```

**Format des numéros :**
- ✅ `0612345678`
- ✅ `06 12 34 56 78`
- ✅ `33612345678` (format international)
- ❌ `+33612345678` (évite le +)

### Étape 3 : Configure le script

Ouvre `bobcat_bot.py` avec un éditeur de texte (Notepad, VS Code, etc.)

Modifie la ligne 18 :
```python
TON_NOM = "Léonard"  # ← Mets TON prénom ici
```

### Étape 4 : Lance le script

Dans le terminal :

```bash
# Va dans le dossier du script
cd C:\Bobcat  # (ou le chemin où tu as mis le fichier)

# Lance le script
python bobcat_bot.py
```

## 📱 UTILISATION

### Premier lancement

1. Le script affiche le menu
2. Choisis `1` pour envoyer aux nouveaux contacts
3. **Scanne le QR code** WhatsApp Web avec ton téléphone
4. Le script ouvre automatiquement chaque conversation
5. Tu dois juste appuyer sur **Entrée** dans WhatsApp Web pour envoyer

### Menu principal

```
1️⃣  Envoyer messages initiaux (nouveaux)
2️⃣  Envoyer relances J+3
3️⃣  Envoyer dernière relance J+7
4️⃣  Voir les statistiques
5️⃣  Liste des contacts
6️⃣  Modifier un contact
0️⃣  Quitter
```

### Workflow recommandé

**Jour 1 :**
1. Lance le script
2. Choisis option `1` (nouveaux)
3. Envoie à 20-30 contacts max

**Jour 4 :**
1. Relance ceux qui n'ont pas répondu (option `2`)

**Jour 8 :**
1. Dernière relance (option `3`)

**Quand quelqu'un répond :**
1. Option `6` pour modifier le contact
2. Change le statut en `interesse` ou `rdv`

## ⚙️ PERSONNALISATION

### Modifier les messages

Ouvre `bobcat_bot.py`, cherche la section `MESSAGES` (ligne ~40) :

```python
MESSAGES = {
    "initial": """Ton message ici...""",
    "relance_1": """...""",
    ...
}
```

**Variables disponibles :**
- `{prenom}` → Prénom du contact
- `{entreprise}` → Nom de l'entreprise
- `{type_installation}` → PAC, isolation...
- `{ville}` → Ville
- `{ton_nom}` → Ton prénom (configuré ligne 18)
- `{volume}` → Volume mensuel (si renseigné)

### Changer les délais

Ligne 24-25 :
```python
DELAI_MIN = 35   # Délai minimum en secondes
DELAI_MAX = 60   # Délai maximum en secondes
```

⚠️ **Ne mets pas moins de 30s** (risque de ban)

### Changer la limite de messages

Ligne 21 :
```python
MAX_MESSAGES_JOUR = 30  # Maximum 50 recommandé
```

## 🛡️ ANTI-BAN (IMPORTANT)

Pour éviter que WhatsApp bloque ton numéro :

1. ✅ **Numéro pro** : Utilise un vrai numéro (pas un virtuel)
2. ✅ **Compte actif** : Ton WhatsApp doit avoir +30 jours d'ancienneté
3. ✅ **Délais** : Minimum 30s entre messages (déjà configuré)
4. ✅ **Limite** : Max 50 messages/jour (déjà configuré à 30)
5. ✅ **Photo profil** : Mets une vraie photo sur WhatsApp
6. ✅ **Bio** : Remplis ta bio WhatsApp Business
7. ❌ **Pas de copier-coller** : Le script varie les délais pour paraître humain
8. ✅ **Réponds** : Si quelqu'un répond, réponds dans les 24h

## 📊 SUIVI DES CONTACTS

Le fichier `installateurs.json` contient tous tes contacts avec leur statut :

| Statut | Signification |
|--------|---------------|
| `nouveau` | Jamais contacté |
| `contacte` | Message initial envoyé |
| `relance` | Déjà relancé X fois |
| `interesse` | A répondu positivement |
| `rdv` | Rendez-vous pris |
| `pas_interesse` | A refusé |

## ❌ PROBLÈMES COURANTS

### "python n'est pas reconnu"
**Solution :** Réinstalle Python en cochant "Add Python to PATH"

### WhatsApp Web ne s'ouvre pas
**Solution :** Vérifie que Chrome/Edge/Safari fonctionne

### QR Code ne scanne pas
**Solution :** 
- Rafraîchis la page WhatsApp Web
- Vérifie ta connexion internet sur téléphone
- Réessaie dans 2 minutes

### Message ne s'envoie pas
**Solution :** Le script ouvre WhatsApp Web avec le message pré-rempli. Tu dois :
1. Attendre que le chat charge
2. Cliquer dans la zone de texte
3. Appuyer sur Entrée

### Contact "pas_interesse" mais continue à recevoir
**Solution :** Le script filtre automatiquement. Si un contact passe en `pas_interesse`, il ne recevra plus rien.

## 📈 AMÉLIORATIONS POSSIBLES

Si tu veux aller plus loin (plus tard) :

1. **Connexion Google Sheets** → Export facile vers Excel
2. **Réponses automatiques** → Détection mots-clés avec IA
3. **Planning d'envoi** → Programme les envois à heure fixe
4. **Multi-comptes** → Gère plusieurs numéros WhatsApp

## 🆘 SUPPORT

Si ça ne marche pas :
1. Vérifie que Python est bien installé
2. Vérifie que ton fichier `installateurs.json` est valide
3. Copie l'erreur affichée dans le terminal
4. Demande de l'aide avec le message d'erreur

## ✅ CHECKLIST AVANT DE LANCER

- [ ] Python installé
- [ ] Script téléchargé
- [ ] `TON_NOM` modifié dans le script
- [ ] Fichier `installateurs.json` créé avec tes contacts
- [ ] Numéros de téléphone au bon format
- [ ] WhatsApp Web testé manuellement (scan QR ok)
- [ ] Tu comprends qu'il faut appuyer sur Entrée dans WhatsApp

**Prêt ? Lance :**
```bash
python bobcat_bot.py
```