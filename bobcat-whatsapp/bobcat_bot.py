#!/usr/bin/env python3
"""
🤖 BOBCAT ENERGY - WhatsApp Bot (VERSION GRATUITE)
Automation de prospection WhatsApp pour installateurs

Usage: python bobcat_bot.py
"""

import time
import json
import os
import random
from datetime import datetime

# ───────────────────────────────────────────────────────────
# CONFIGURATION - MODIFIE CES 3 LIGNES
# ───────────────────────────────────────────────────────────

# Ton nom/prénom pour signer les messages
TON_NOM = "Léonard"  # ← MODIFIE ICI

# Nombre de messages max par jour (NE PAS DÉPASSER 50)
MAX_MESSAGES_JOUR = 30  # ← 30 = sécurisé

# Délai entre messages (en secondes) - Minimum 30 recommandé
DELAI_MIN = 35
DELAI_MAX = 60  # Aléatoire entre 35-60s pour paraître humain

# ───────────────────────────────────────────────────────────
# MESSAGE TEMPLATES (personnalisables)
# ───────────────────────────────────────────────────────────

MESSAGES = {
    "initial": """Bonjour {prenom},

Je me permets de vous contacter car j'ai vu que {entreprise} réalise des installations {type_installation}.

Nous travaillons avec un partenaire CEE qui permet aux installateurs de déposer leurs dossiers avec :
• paiement rapide (sous 15 jours)
• accompagnement administratif complet
• conditions avantageuses pour les dossiers de qualité

Si vous réalisez régulièrement des installations, je peux vous expliquer rapidement comment cela fonctionne.

Seriez-vous disponible pour en discuter quelques minutes ?

Bonne journée,
{ton_nom}
Bobcat Energy""",

    "relance_1": """Bonjour {prenom},

Je me permets de relancer mon message concernant notre partenariat CEE.

De nombreux installateurs de {ville} travaillent déjà avec nous et apprécient la rapidité de paiement.

Disponible pour un appel de 5 minutes cette semaine ?

{ton_nom}
Bobcat Energy""",

    "relance_2": """Bonjour {prenom},

Dernier message de ma part. Je comprends que ce ne soit pas la priorité actuellement.

Si un jour vous cherchez un partenaire CEE fiable avec paiement rapide, n'hésitez pas à me recontacter.

Bonne continuation,
{ton_nom}
Bobcat Energy""",

    "reponse_positive": """Merci pour votre réponse {prenom} !

Pour voir si on peut vous accompagner :

1. Vous faites combien d'installations par mois en moyenne ?
2. Vous déposez déjà des dossiers CEE ou c'est nouveau pour vous ?

Selon votre volume, je peux vous faire une proposition adaptée.

{ton_nom}""",

    "proposition_rdv": """Parfait {prenom}, avec {volume} installations par mois, vous êtes exactement le profil qu'on recherche.

Je peux vous appeler rapidement pour vous expliquer :
• Les délais de paiement
• Les tarifs selon volume
• L'accompagnement dossiers

Vous êtes dispo demain ou après-demain pour 10 minutes ?

{ton_nom}
Bobcat Energy"""
}

# ───────────────────────────────────────────────────────────
# BASE DE DONNÉES (fichier JSON local)
# ───────────────────────────────────────────────────────────

DB_FILE = "installateurs.json"

def load_installateurs():
    """Charge la base de données ou crée un exemple"""
    if os.path.exists(DB_FILE):
        with open(DB_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    else:
        # Crée un exemple si fichier inexistant
        exemple = [
            {
                "id": 1,
                "entreprise": "Dupont Chauffage",
                "prenom": "Jean",
                "telephone": "33612345678",
                "type_installation": "pompes à chaleur",
                "ville": "Paris",
                "statut": "nouveau",
                "date_contact": None,
                "nb_relances": 0,
                "notes": ""
            },
            {
                "id": 2,
                "entreprise": "Isol Pro",
                "prenom": "Marie", 
                "telephone": "33687654321",
                "type_installation": "isolation",
                "ville": "Lyon",
                "statut": "nouveau",
                "date_contact": None,
                "nb_relances": 0,
                "notes": ""
            }
        ]
        save_installateurs(exemple)
        print(f"✅ Fichier {DB_FILE} créé avec exemples")
        print("📝 Modifie ce fichier avec TES vrais contacts !\n")
        return exemple

def save_installateurs(data):
    """Sauvegarde la base de données"""
    with open(DB_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def update_statut(installateur_id, nouveau_statut, notes=""):
    """Met à jour le statut d'un installateur"""
    data = load_installateurs()
    for inst in data:
        if inst['id'] == installateur_id:
            inst['statut'] = nouveau_statut
            inst['date_contact'] = datetime.now().strftime('%Y-%m-%d %H:%M')
            if notes:
                inst['notes'] = notes
            if nouveau_statut == 'relance':
                inst['nb_relances'] += 1
            save_installateurs(data)
            return True
    return False

# ───────────────────────────────────────────────────────────
# FONCTIONS WHATSAPP WEB
# ───────────────────────────────────────────────────────────

def envoyer_whatsapp_web(telephone, message):
    """
    Ouvre WhatsApp Web avec le message pré-rempli
    L'utilisateur doit juste appuyer sur Entrée
    """
    import webbrowser
    import urllib.parse
    
    # Formatte le numéro (enlève espaces, ajoute indicatif si besoin)
    tel_clean = telephone.replace(' ', '').replace('-', '')
    if tel_clean.startswith('0'):
        tel_clean = '33' + tel_clean[1:]
    if not tel_clean.startswith('33'):
        tel_clean = '33' + tel_clean
    
    # Encode le message pour l'URL
    msg_encode = urllib.parse.quote(message)
    
    # Crée l'URL WhatsApp Web
    url = f"https://web.whatsapp.com/send?phone={tel_clean}&text={msg_encode}"
    
    # Ouvre le navigateur
    webbrowser.open(url)
    
    return True

def mode_manuel(installateurs, type_message="initial"):
    """
    Mode manuel : ouvre WhatsApp Web pour chaque contact
    Tu dois juste appuyer sur Entrée dans WhatsApp
    """
    print(f"\n🚀 MODE MANUEL - {type_message.upper()}")
    print("=" * 50)
    print(f"📱 {len(installateurs)} contacts à traiter")
    print("⚠️  WhatsApp Web va s'ouvrir pour chaque contact")
    print("⚠️  Tu dois scanner le QR code UNE SEULE FOIS au début")
    print("=" * 50 + "\n")
    
    input("⏳ Appuie sur ENTREE quand WhatsApp Web est prêt...")
    
    for i, inst in enumerate(installateurs, 1):
        print(f"\n{'─' * 50}")
        print(f"📤 {i}/{len(installateurs)} : {inst['prenom']} ({inst['entreprise']})")
        print(f"📞 {inst['telephone']}")
        
        # Prépare le message
        message = MESSAGES[type_message].format(
            prenom=inst['prenom'],
            entreprise=inst['entreprise'],
            type_installation=inst['type_installation'],
            ville=inst['ville'],
            ton_nom=TON_NOM,
            volume=inst.get('volume_mensuel', ' plusieurs')
        )
        
        print(f"\n📝 Message :")
        print(message[:100] + "...")
        
        # Ouvre WhatsApp Web
        envoyer_whatsapp_web(inst['telephone'], message)
        
        # Met à jour le statut
        if type_message == "initial":
            update_statut(inst['id'], 'contacte')
        elif type_message == "relance":
            update_statut(inst['id'], 'relance')
        
        # Attend avant le prochain (sauf si dernier)
        if i < len(installateurs):
            delai = random.randint(DELAI_MIN, DELAI_MAX)
            print(f"\n⏳ Prochain dans {delai}s...")
            print("💡 Laisse WhatsApp ouvert, ne ferme pas l'onglet")
            time.sleep(delai)
    
    print(f"\n{'=' * 50}")
    print("✅ Terminé !")
    print(f"📊 {len(installateurs)} messages envoyés")
    print("=" * 50)

# ───────────────────────────────────────────────────────────
# MENU PRINCIPAL
# ───────────────────────────────────────────────────────────

def afficher_stats():
    """Affiche les statistiques"""
    data = load_installateurs()
    stats = {
        'total': len(data),
        'nouveau': len([x for x in data if x['statut'] == 'nouveau']),
        'contacte': len([x for x in data if x['statut'] == 'contacte']),
        'interesse': len([x for x in data if x['statut'] == 'interesse']),
        'rdv': len([x for x in data if x['statut'] == 'rdv']),
        'pas_interesse': len([x for x in data if x['statut'] == 'pas_interesse']),
        'relance': len([x for x in data if x['statut'] == 'relance'])
    }
    
    print("\n📊 STATISTIQUES")
    print("─" * 40)
    print(f"Total installateurs : {stats['total']}")
    print(f"  🆕 Nouveaux : {stats['nouveau']}")
    print(f"  📤 Contactés : {stats['contacte']}")
    print(f"  🔄 Relances : {stats['relance']}")
    print(f"  💚 Intéressés : {stats['interesse']}")
    print(f"  📅 RDV pris : {stats['rdv']}")
    print(f"  ❌ Pas intéressés : {stats['pas_interesse']}")
    print("─" * 40)

def menu():
    """Menu principal"""
    while True:
        print("\n" + "=" * 50)
        print("🤖 BOBCAT ENERGY - WhatsApp Bot")
        print("=" * 50)
        print("\n1️⃣  Envoyer messages initiaux (nouveaux)")
        print("2️⃣  Envoyer relances J+3")
        print("3️⃣  Envoyer dernière relance J+7")
        print("4️⃣  Voir les statistiques")
        print("5️⃣  Liste des contacts")
        print("6️⃣  Modifier un contact")
        print("0️⃣  Quitter")
        print("\n" + "─" * 50)
        
        choix = input("\n👉 Ton choix : ").strip()
        
        if choix == "1":
            data = load_installateurs()
            nouveaux = [x for x in data if x['statut'] == 'nouveau'][:MAX_MESSAGES_JOUR]
            if nouveaux:
                print(f"\n✅ {len(nouveaux)} nouveaux contacts à envoyer")
                confirm = input("Confirmer l'envoi ? (oui/non) : ").lower()
                if confirm in ['oui', 'o', 'yes']:
                    mode_manuel(nouveaux, "initial")
            else:
                print("\n❌ Aucun nouveau contact à envoyer")
        
        elif choix == "2":
            data = load_installateurs()
            # Contacts contactés il y a 3+ jours, pas de réponse, moins de 2 relances
            relances = [x for x in data if x['statut'] == 'contacte' and x['nb_relances'] < 2][:MAX_MESSAGES_JOUR]
            if relances:
                print(f"\n🔄 {len(relances)} contacts à relancer")
                confirm = input("Confirmer ? (oui/non) : ").lower()
                if confirm in ['oui', 'o']:
                    mode_manuel(relances, "relance_1")
            else:
                print("\n❌ Aucune relance à faire")
        
        elif choix == "3":
            data = load_installateurs()
            # Dernière relance pour ceux qui ont déjà été relancés 1 fois
            derniers = [x for x in data if x['statut'] == 'relance' and x['nb_relances'] == 1][:MAX_MESSAGES_JOUR]
            if derniers:
                print(f"\n📌 {len(derniers)} dernières relances")
                confirm = input("Confirmer ? (oui/non) : ").lower()
                if confirm in ['oui', 'o']:
                    mode_manuel(derniers, "relance_2")
            else:
                print("\n❌ Aucune dernière relance")
        
        elif choix == "4":
            afficher_stats()
        
        elif choix == "5":
            data = load_installateurs()
            print("\n📋 LISTE DES CONTACTS")
            print("─" * 80)
            for inst in data[:10]:  # Affiche les 10 premiers
                print(f"{inst['id']:3d} | {inst['prenom']:10s} | {inst['entreprise']:20s} | {inst['statut']:12s}")
            if len(data) > 10:
                print(f"... et {len(data)-10} autres")
            print("─" * 80)
        
        elif choix == "6":
            try:
                id_modif = int(input("ID du contact à modifier : "))
                nouveau_statut = input("Nouveau statut (interesse/rdv/pas_interesse) : ").lower()
                notes = input("Notes : ")
                if update_statut(id_modif, nouveau_statut, notes):
                    print("✅ Contact mis à jour")
                else:
                    print("❌ Contact non trouvé")
            except:
                print("❌ Erreur de saisie")
        
        elif choix == "0":
            print("\n👋 Au revoir !")
            break
        
        else:
            print("\n❌ Choix invalide")

# ───────────────────────────────────────────────────────────
# POINT D'ENTRÉE
# ───────────────────────────────────────────────────────────

if __name__ == '__main__':
    print("🤖 BOBCAT ENERGY - WhatsApp Bot")
    print("=" * 50)
    print("\n⚠️  IMPORTANT AVANT DE COMMENCER :")
    print("1. Modifie TON_NOM dans le script (ligne 18)")
    print("2. Remplis le fichier installateurs.json avec TES contacts")
    print("3. WhatsApp Web doit être accessible sur ce PC")
    print("4. Respecte les délais (anti-ban WhatsApp)\n")
    
    input("⏳ Appuie sur ENTREE pour continuer...")
    menu()