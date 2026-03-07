# 🤖 BOBCAT ENERGY - SOLUTION GRATUITE (€0)

## ⚡ STACK 100% GRATUIT

| Composant | Solution | Coût |
|-----------|----------|------|
| **WhatsApp** | WhatsApp Web (téléphone) | €0 |
| **Automation** | Python + Playwright | €0 |
| **CRM** | Google Sheets | €0 |
| **Hébergement** | Ton PC / Raspberry Pi | €0 |
| **Total** | | **€0** |

---

## 🛠️ ARCHITECTURE GRATUITE

```
┌─────────────────────────────────────────┐
│           TON ORDINATEUR               │
│  (ou Raspberry Pi / VPS gratuit)        │
│                                         │
│  ┌──────────────┐    ┌──────────────┐  │
│  │ Google Sheet │◄───│   Script     │  │
│  │ Installateurs│    │   Python     │  │
│  └──────────────┘    └──────┬───────┘  │
│                             │          │
│                        ┌────┴────┐     │
│                        │WhatsApp │     │
│                        │  Web    │     │
│                        │(QR Code)│     │
│                        └─────────┘     │
└─────────────────────────────────────────┘
```

---

## 📱 SOLUTION 1 : WHATSAPP WEB + PYTHON

### Ce que ça fait :
- ✅ Scanne QR code une fois
- ✅ Envoie messages automatiquement
- ✅ Lit les réponses
- ✅ Met à jour Google Sheets
- ❌ Pas de webhook temps réel (vérification toutes les 5 min)

### Prérequis :
- Un téléphone Android/iPhone avec WhatsApp
- Un PC (Windows/Mac/Linux)
- Python installé
- Compte Google (pour Sheets)

---

## 💻 SCRIPT PYTHON COMPLET

Crée un fichier `bobcat_bot.py` :

```python
#!/usr/bin/env python3
"""
Bobcat Energy - WhatsApp Automation (GRATUIT)
Envoi automatique de messages WhatsApp
"""

import time
import json
import gspread
from playwright.sync_api import sync_playwright
from oauth2client.service_account import ServiceAccountCredentials

# ═══════════════════════════════════════════════════════════
# CONFIGURATION - MODIFIE CES VALEURS
# ═══════════════════════════════════════════════════════════

# Message template (personnalisable)
MESSAGE_TEMPLATE = """Bonjour {prenom},

Je me permets de vous contacter car j'ai vu que {entreprise} réalise des installations {type}.

Nous travaillons avec un partenaire CEE qui permet aux installateurs de :
• Paiement rapide des dossiers
• Accompagnement administratif
• Tarifs avantageux selon volume

Si vous faites plusieurs installations par mois, je peux vous expliquer rapidement.

Disponible pour 5 minutes cette semaine ?

Léonard
Bobcat Energy"""

# Délai entre messages (éviter le ban)
DELAI_ENTRE_MESSAGES = 30  # secondes
MAX_MESSAGES_PAR_JOUR = 30

# ═══════════════════════════════════════════════════════════
# FONCTIONS GOOGLE SHEETS
# ═══════════════════════════════════════════════════════════

def get_installateurs():
    """Récupère les installateurs depuis Google Sheets"""
    scope = ['https://spreadsheets.google.com/feeds',
             'https://www.googleapis.com/auth/drive']
    
    # Fichier credentials à créer (voir instructions ci-dessous)
    creds = ServiceAccountCredentials.from_json_keyfile_name(
        'credentials.json', scope)
    client = gspread.authorize(creds)
    
    sheet = client.open('Bobcat_Installateurs').sheet1
    data = sheet.get_all_records()
    
    return data

def update_status(telephone, statut):
    """Met à jour le statut dans Sheets"""
    scope = ['https://spreadsheets.google.com/feeds',
             'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name(
        'credentials.json', scope)
    client = gspread.authorize(creds)
    
    sheet = client.open('Bobcat_Installateurs').sheet1
    
    # Trouve la ligne par téléphone
    cell = sheet.find(telephone)
    if cell:
        sheet.update_cell(cell.row, 6, statut)  # Colonne F = Statut
        sheet.update_cell(cell.row, 7, time.strftime('%Y-%m-%d %H:%M'))

# ═══════════════════════════════════════════════════════════
# FONCTIONS WHATSAPP
# ═══════════════════════════════════════════════════════════

def envoyer_message(page, telephone, message):
    """Envoie un message WhatsApp via Web"""
    
    # Ouvre la conversation
    page.goto(f'https://web.whatsapp.com/send?phone={telephone}&text={message}')
    
    # Attend le chargement du chat (max 60s)
    page.wait_for_selector('[data-testid="conversation-panel-wrapper"]', 
                          timeout=60000)
    
    time.sleep(3)  # Petit délai pour être sûr
    
    # Appuie sur Entrée pour envoyer
    page.keyboard.press('Enter')
    
    time.sleep(2)  # Attend l'envoi
    
    return True

def lire_reponses(page):
    """Lit les dernières réponses"""
    messages = page.query_selector_all('.message-in')
    
    reponses = []
    for msg in messages[-5:]:  # 5 derniers messages
        texte = msg.inner_text()
        reponses.append(texte)
    
    return reponses

# ═══════════════════════════════════════════════════════════
# SCRIPT PRINCIPAL
# ═══════════════════════════════════════════════════════════

def main():
    print("🤖 Bobcat Energy - WhatsApp Bot")
    print("════════════════════════════════\n")
    
    # 1. Récupère les installateurs
    print("📋 Récupération des installateurs...")
    installateurs = get_installateurs()
    
    # Filtre ceux à contacter (statut = "Nouveau")
    a_contacter = [i for i in installateurs if i.get('Statut') == 'Nouveau']
    
    print(f"✅ {len(a_contacter)} installateurs à contacter")
    
    if not a_contacter:
        print("Rien à faire !")
        return
    
    # 2. Lance WhatsApp Web
    print("\n📱 Ouverture WhatsApp Web...")
    print("⚠️  SCANNE LE QR CODE AVEC TON TÉLÉPHONE")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # headless=False = visible
        page = browser.new_page()
        
        # Va sur WhatsApp Web
        page.goto('https://web.whatsapp.com')
        
        # Attend la connexion (QR code scan)
        print("\n⏳ En attente du scan QR...")
        page.wait_for_selector('[data-testid="chat-list"]', timeout=120000)
        print("✅ Connecté !\n")
        
        # 3. Envoie les messages
        count = 0
        for installateur in a_contacter[:MAX_MESSAGES_PAR_JOUR]:
            if count >= MAX_MESSAGES_PAR_JOUR:
                print(f"\n⏹️ Limite de {MAX_MESSAGES_PAR_JOUR} messages atteinte")
                break
            
            # Prépare le message personnalisé
            message = MESSAGE_TEMPLATE.format(
                prenom=installateur['Prenom'],
                entreprise=installateur['Entreprise'],
                type=installateur['Type_Installation']
            )
            
            telephone = installateur['Telephone']
            
            print(f"📤 Envoi à {installateur['Prenom']} ({telephone})...")
            
            try:
                envoyer_message(page, telephone, message)
                update_status(telephone, 'Contacté')
                count += 1
                print(f"✅ Envoyé ! ({count}/{MAX_MESSAGES_PAR_JOUR})\n")
                
                # Attend avant le prochain
                if count < len(a_contacter):
                    print(f"⏳ Pause {DELAI_ENTRE_MESSAGES}s...")
                    time.sleep(DELAI_ENTRE_MESSAGES)
                    
            except Exception as e:
                print(f"❌ Erreur: {e}\n")
                update_status(telephone, 'Erreur')
        
        print(f"\n🎉 Terminé ! {count} messages envoyés.")
        browser.close()

if __name__ == '__main__':
    main()
```

---

## 📊 GOOGLE SHEETS - STRUCTURE

Crée une feuille nommée **"Bobcat_Installateurs"** :

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| **Entreprise** | **Prenom** | **Telephone** | **Type_Installation** | **Ville** | **Statut** | **Date_Contact** |
| Dupont Chauffage | Jean | 33612345678 | PAC | Paris | Nouveau | |
| Isol Pro | Marie | 33687654321 | Isolation | Lyon | Nouveau | |
| Eco Habitat | Pierre | 33611223344 | Chauffage | Marseille | Contacté | 2024-03-04 |

**Statuts possibles :**
- `Nouveau` → À contacter
- `Contacté` → Message envoyé
- `Interesse` → Réponse positive
- `RDV` → Rendez-vous pris
- `Pas_Interesse` → Refus
- `Erreur` → Numéro invalide

---

## 🔧 INSTALLATION PAS À PAS

### 1. Installe Python (si pas déjà fait)
```bash
# Windows : https://python.org/downloads
# Mac : brew install python
# Linux : sudo apt install python3
```

### 2. Installe les bibliothèques
```bash
pip install playwright gspread oauth2client
playwright install
```

### 3. Configure Google Sheets API (GRATUIT)

1. Va sur [Google Cloud Console](https://console.cloud.google.com/)
2. Crée un projet (nom : "Bobcat Bot")
3. Active l'API Google Sheets
4. Crée un compte de service (Service Account)
5. Télécharge le fichier JSON → renomme-le `credentials.json`
6. Partage ta feuille Google Sheets avec l'email du compte de service

### 4. Lance le script
```bash
python bobcat_bot.py
```

**Première fois :**
- Un navigateur s'ouvre
- Scanne le QR code avec ton téléphone WhatsApp
- Le script démarre automatiquement

---

## 🔄 SOLUTION 2 : WHATSAPP BUSINESS APP (MANUEL)

Si le script te fait peur, solution 100% manuelle mais organisée :

### Outils gratuits :
- **WhatsApp Business** (app gratuite sur téléphone)
- **Google Sheets** (sur PC pour le suivi)
- **Messages rapides** (templates WhatsApp Business)

### Workflow :
1. Tu crées 3 templates dans WhatsApp Business :
   - Message initial
   - Relance J+3
   - Relance J+7
2. Tu copies-colles depuis Google Sheets
3. Tu mets à jour le statut à la main

**Temps nécessaire :** ~2h pour 50 contacts/jour

---

## 🎯 COMPARAISON SOLUTIONS

| Critère | Script Python | WhatsApp Business Manuel |
|---------|--------------|-------------------------|
| **Coût** | €0 | €0 |
| **Temps** | 5 min setup puis auto | 2h/jour |
| **Évolutivité** | ✅ 50+/jour | ❌ 20-30/jour max |
| **Relances** | ✅ Auto | ❌ Manuel |
| **Risque ban** | ⚠️ Faible (si respect délais) | ✅ Nul |
| **Technicité** | ⚠️ Moyenne | ✅ Facile |

---

## ⚠️ RÈGLES ANTI-BAN (IMPORTANT)

Pour éviter que WhatsApp bloque ton numéro :

1. **Nouveau numéro** : Attends 1 semaine avant d'automatiser
2. **Délais** : Minimum 30s entre messages
3. **Limite** : Max 50 messages/jour
4. **Variété** : Change un peu les messages (j'ai mis des variables)
5. **Réponses** : Réponds aux messages reçus rapidement
6. **STOP** : Si quelqu'un dit "stop", arrête immédiatement

---

## 🚀 PROCHAINES ÉTAPES

**Tu veux quelle solution ?**

- **A** → Je t'aide à setup le script Python (je te guide pas à pas)
- **B** → Je crée les templates WhatsApp Business pour faire manuel
- **C** → Je cherche une solution encore plus simple (mais moins puissante)

**Réponds A, B ou C**