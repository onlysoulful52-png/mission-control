# 📋 DOSSIER D'ARCHITECTURE SÉCURISÉE (DAS)
# Projet Eqdom - Parcours Crédit Digital

**Version :** 1.0  
**Date :** 04/03/2026  
**Destinataire :** DSSi (Délégation à la Sécurité des Systèmes d'Information)  
**Projet :** Eqdom - Plateforme de demande de crédit en ligne  

---

## 1. RÉFÉRENTIELS ET NORMES APPLICABLES

### 1.1 Cadre légal marocain

| Référence | Description | Application |
|-----------|-------------|-------------|
| **Loi 09-08** | Protection des données personnelles | ✅ Obligatoire - Traitement des données clients |
| **Dahir du 18 février 2017** | Création du DSSi | ✅ Obligatoire - Sécurité des systèmes d'information |
| **Loi 05-20** | Lutte contre la cybercriminalité | ✅ Obligatoire - Protection contre les attaques |
| **Circulaire DSSi** | Bonnes pratiques de sécurité | ✅ Recommandé - Hardening système |

### 1.2 Référentiels internationaux

| Référentiel | Description | Conformité |
|-------------|-------------|------------|
| **ISO 27001:2022** | Management de la sécurité de l'information | ✅ Cible certification |
| **ISO 27017** | Sécurité cloud | ✅ Applicable si cloud utilisé |
| **OWASP Top 10** | Risques applicatifs web | ✅ Audit obligatoire |
| **PCI DSS** | Sécurité paiement | ⚠️ Si paiement en ligne intégré |

---

## 2. CLASSIFICATION DES DONNÉES

### 2.1 Données traitées

| Type de donnée | Classification | Sensibilité | Base légale |
|----------------|----------------|-------------|-------------|
| **CIN (recto/verso)** | 🔴 Donnée sensible | Très haute | Loi 09-08 Art. 3 |
| **Revenus / Patrimoine** | 🔴 Donnée sensible | Très haute | Loi 09-08 Art. 3 |
| **IBAN / RIB** | 🟡 Donnée sensible | Haute | Loi 09-08 Art. 3 |
| **Nom, Prénom, Téléphone** | 🟢 Donnée personnelle | Moyenne | Loi 09-08 Art. 1 |
| **Historique crédit** | 🔴 Donnée sensible | Très haute | Loi 09-08 Art. 3 |
| **Données de connexion** | 🟢 Donnée technique | Faible | Conservation légale |

### 2.2 Durée de conservation (Conformité Loi 09-08)

| Donnée | Durée maximale | Justification |
|--------|----------------|---------------|
| CIN (scan) | **30 jours** post-signature | Art. 9 - Conservation limitée |
| Données client | **5 ans** post-remboursement | Obligations comptables/fiscales |
| Données de connexion | **1 an** | Circulaire DSSi |
| Contrats signés | **10 ans** | Droit commercial |

---

## 3. ARCHITECTURE TECHNIQUE SÉCURISÉE

### 3.1 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ARCHITECTURE EQDOM                              │
│                      (Vue logique sécurisée)                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────────────┐   │
│   │   CLIENT     │────▶│   WAF/AWS    │────▶│  SERVEURS APPLICATIFS│   │
│   │  (Browser)   │HTTPS│   CloudFlare │     │     (Maroc 🇲🇦)       │   │
│   └──────────────┘     └──────────────┘     └──────────────────────┘   │
│                              │                     │                    │
│                              ▼                     ▼                    │
│                        ┌──────────┐      ┌──────────────────┐          │
│                        │  DDoS    │      │   API GATEWAY    │          │
│                        │Protection│      │   (Rate Limit)   │          │
│                        └──────────┘      └──────────────────┘          │
│                                                   │                     │
│              ┌────────────────────────────────────┼────────────────┐   │
│              ▼                                    ▼                │   │
│   ┌─────────────────────┐              ┌──────────────────────┐    │   │
│   │   AUTHENTIFICATION  │              │   TRAITEMENT MÉTIER  │    │   │
│   │   - JWT Tokens      │              │   - Scoring          │    │   │
│   │   - 2FA (optionnel) │              │   - Documents        │    │   │
│   │   - Session mgmt    │              │   - Notifications    │    │   │
│   └─────────────────────┘              └──────────────────────┘    │   │
│              │                                    │                │   │
│              └────────────────────────────────────┼────────────────┘   │
│                                                   ▼                    │
│   ┌──────────────────────────────────────────────────────────────┐    │
│   │                    BASE DE DONNÉES                          │    │
│   │  ┌──────────────────────────────────────────────────────┐  │    │
│   │  │  🔐 DONNÉES CHIFFRÉES (AES-256)                      │  │    │
│   │  │  - PostgreSQL / MySQL (chiffrement TDE)             │  │    │
│   │  │  - Backup chiffrés quotidiens                       │  │    │
│   │  │  - Réplication temps réel (site secondaire)         │  │    │
│   │  └──────────────────────────────────────────────────────┘  │    │
│   │                                                              │    │
│   │  ┌──────────────────────────────────────────────────────┐  │    │
│   │  │  📄 STOCKAGE DOCUMENTS (CIN, RIB)                    │  │    │
│   │  │  - Serveur SFTP sécurisé (chiffrement au repos)     │  │    │
│   │  │  - Accès restreint (ACL strictes)                   │  │    │
│   │  │  - Suppression auto J+30                            │  │    │
│   │  └──────────────────────────────────────────────────────┘  │    │
│   └──────────────────────────────────────────────────────────────┘    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Localisation des données

| Composant | Localisation | Justification |
|-----------|--------------|---------------|
| **Serveurs applicatifs** | Maroc (Casablanca/Rabat) | ⚠️ OBLIGATOIRE - Données CIN ne quittent pas le territoire |
| **Base de données** | Maroc (hébergeur agréé) | ⚠️ OBLIGATOIRE - Loi 09-08 Art. 43 |
| **Backup** | Maroc (site secondaire) | Redondance géographique nationale |
| **CDN (static assets)** | CloudFlare/CloudFront | ✅ Acceptable - Pas de données perso |

**⚠️ ATTENTION :** Les données CIN ne peuvent PAS être stockées sur des serveurs hors du Maroc (AWS US, Azure EU, etc.) sans autorisation de la CNDP.

---

## 4. MESURES DE SÉCURITÉ TECHNIQUES

### 4.1 Chiffrement

| Couche | Algorithme | Usage |
|--------|------------|-------|
| **Transport (TLS)** | TLS 1.3 minimum | Toutes les communications HTTPS |
| **Base de données** | AES-256-GCM | Chiffrement TDE (Transparent Data Encryption) |
| **Fichiers (CIN)** | AES-256-CBC | Chiffrement au repos des scans CIN |
| **Backup** | AES-256 | Backup chiffrés avant stockage |
| **Mots de passe** | Argon2id | Hashage fort avec salt |

### 4.2 Authentification et autorisation

| Mécanisme | Implémentation | Conformité |
|-----------|----------------|------------|
| **Authentification admin** | 2FA obligatoire (TOTP) | ✅ DSSi - Accès privilégiés |
| **Session utilisateur** | JWT + refresh tokens | ✅ Stateless, sécurisé |
| **Durée session** | 15 min inactivité | ✅ DSSi - Minimisation risque |
| **Rôles** | RBAC (Admin, Agent, Auditeur) | ✅ Principe moindre privilège |

### 4.3 Protection applicative (OWASP)

| Risque | Contre-mesure | Implémentation |
|--------|---------------|----------------|
| **Injection SQL** | Requêtes paramétrées | ORM Sequelize/TypeORM |
| **XSS** | Échappement output | React/Vue auto-escape |
| **CSRF** | Tokens CSRF | Double-submit cookie |
| **IDOR** | Vérification ownership | Middleware authorization |
| **Rate Limiting** | 100 req/min par IP | NGINX + Redis |
| **File Upload** | Validation type/taille | Magic numbers, pas extension |

### 4.4 Sécurité documents CIN

| Exigence | Implémentation |
|----------|----------------|
| **Chiffrement au repos** | AES-256, clés dans HSM/KMS |
| **Chiffrement en transit** | SFTP/HTTPS uniquement |
| **Contrôle d'accès** | ACL : lecture seule pour scoring, écriture admin uniquement |
| **Journalisation** | Logs d'accès conservés 1 an (qui a vu quelle CIN quand) |
| **Anonymisation** | Hash irreversible après J+30 |
| **Suppression** | Effacement sécurisé (DoD 5220.22-M) |

---

## 5. ORGANISATION DE LA SÉCURITÉ

### 5.1 Rôles et responsabilités

| Rôle | Responsabilité | Formation |
|------|----------------|-----------|
| **DPO (Data Protection Officer)** | Conformité Loi 09-08, relation CNDP | DPO certifié |
| **RSSI (Responsable Sécurité)** | Implémentation DSSi, audits | ISO 27001 Lead Implementer |
| **Administrateurs système** | Hardening, patching, backup | SecOps, Linux |
| **Développeurs** | Secure coding, revue de code | OWASP, formation sécurité |
| **Agents crédit** | Utilisation conforme, signalement | Sensibilisation données |

### 5.2 Politiques de sécurité

| Politique | Fréquence | Responsable |
|-----------|-----------|-------------|
| **Gestion des vulnerabilités** | Patch critique sous 24h | RSSI |
| **Backup et restauration** | Quotidien + test mensuel | Admin sys |
| **Revue de code sécurisée** | Avant chaque merge | Lead Dev |
| **Audit de sécurité** | Annuel + pentest bi-annuel | RSSI externe |
| **Sensibilisation équipe** | Trimestriel | RSSI |

---

## 6. CONFORMITÉ LOI 09-08 (CNDP)

### 6.1 Droits des personnes (Art. 8)

| Droit | Implémentation technique | Statut |
|-------|--------------------------|--------|
| **Droit d'accès** | Portail client : voir mes données | ✅ Implémenté |
| **Droit de rectification** | Formulaire de modification | ✅ Implémenté |
| **Droit d'opposition** | Opt-out marketing dans consentements | ✅ Implémenté |
| **Droit d'effacement** | "Supprimer mon compte" + confirmation email | ✅ Implémenté |

### 6.2 Consentements (Art. 4 et 5)

| Consentement | Collecte | Finalité | Durée |
|--------------|----------|----------|-------|
| **Vérification identité** | CIN | Prévention fraude | 30 jours |
| **Consultation Bureau Crédit** | Autorisation | Évaluation risque | Durée analyse |
| **Traitement données** | Checkbox explicite | Gestion crédit | Durée relation |
| **Offres commerciales** | Checkbox séparée | Marketing | 3 ans ou révocation |

**⚠️ Conformité :** Les 3 consentements sont obligatoires et doivent être **granulaires** (pas un seul checkbox global).

### 6.3 Déclaration CNDP

| Élément | Statut |
|---------|--------|
| **Déclaration traitement** | ✅ À faire avant mise en production |
| **DPO désigné** | ✅ Obligatoire (>2000 personnes concernées/an) |
| **Registre des traitements** | ✅ Maintenu à jour |
| **PAI (Privacy Impact Assessment)** | ⚠️ Recommandé avant lancement |

---

## 7. PLAN DE CONTINUITE ET REPRISE D'ACTIVITÉ (PCA/PRA)

### 7.1 Objectifs

| Indicateur | Valeur | Description |
|------------|--------|-------------|
| **RPO** | 4 heures | Perte de données maximale acceptable |
| **RTO** | 8 heures | Temps de reprise d'activité |

### 7.2 Mesures

| Scénario | Contre-mesure |
|----------|---------------|
| **Panne serveur principal** | Bascule automatique sur site secondaire |
| **Corruption base de données** | Restore depuis backup J-1 (chiffré) |
| **Ransomware** | Isolation réseau + restore backup offline |
| **Déni de service** | CloudFlare + scaling auto + rate limiting |

---

## 8. AUDIT ET CONTRÔLE

### 8.1 Audits planifiés

| Type | Fréquence | Portée | Prestataire |
|------|-----------|--------|-------------|
| **Audit interne** | Semestriel | Processus, accès, logs | RSSI interne |
| **Pentest web** | Annuel | OWASP Top 10 | Prestataire externe |
| **Audit code** | Avant MEP | Vulnérabilités applicatives | Équipe sécurité |
| **Audit conformité** | Annuel | Loi 09-08, DSSi | Cabinet spécialisé |

### 8.2 Indicateurs de sécurité (KPI)

| KPI | Objectif | Seuil d'alerte |
|-----|----------|----------------|
| **Temps de patch critique** | < 24h | > 48h |
| **Taux de coverage tests sécu** | > 80% | < 60% |
| **Incidents de sécurité** | 0 critique | 1 majeur |
| **Backup testés** | 100% mensuel | < 100% |

---

## 9. ANNEXES

### Annexe A : Schéma de chiffrement CIN

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Upload CIN │────▶│  Virus Scan │────▶│  Chiffrement│
│  (HTTPS)    │     │  (ClamAV)   │     │  AES-256    │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Stockage   │
                                        │  Sécurisé   │
                                        │  (SFTP)     │
                                        └─────────────┘
```

### Annexe B : Flux de suppression J+30

```
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│  Cron Journalier│────▶│  Scan fichiers │────▶│  Suppression  │
│  (2h du matin) │     │  J+30          │     │  Sécurisée    │
└────────────────┘     └────────────────┘     │  (DoD 5220)   │
                                              └───────────────┘
```

### Annexe C : Checklist conformité DSSi

- [ ] Politique de sécurité documentée
- [ ] Inventaire des actifs
- [ ] Classification des données
- [ ] Gestion des accès (RBAC)
- [ ] Chiffrement des données sensibles
- [ ] Backup et plan de restauration
- [ ] Journalisation des accès
- [ ] Sensibilisation utilisateurs
- [ ] Plan de continuité d'activité
- [ ] Procédure de gestion d'incidents

---

## 10. VALIDATION ET APPROBATIONS

| Fonction | Nom | Signature | Date |
|----------|-----|-----------|------|
| **Directeur de projet** | | | |
| **RSSI** | | | |
| **DPO** | | | |
| **DSI Eqdom** | | | |

---

**Document confidentiel - Ne pas diffuser**  
*Conforme aux exigences DSSi et Loi 09-08 (CNDP)*