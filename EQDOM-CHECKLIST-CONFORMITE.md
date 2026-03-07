# 📋 CHECKLIST CONFORMITÉ DSSi / CNDP - PROJET EQDOM

**Résumé exécutif pour validation architecture**

---

## ✅ POINTS CRITIQUES VALIDÉS

### 1. LOCALISATION DES DONNÉES

| Exigence | Statut | Justification |
|----------|--------|---------------|
| Données CIN au Maroc | ✅ **CONFORME** | Serveurs hébergés à Casablanca/Rabat |
| Données hors Maroc | ✅ **AUCUNE** | Pas de cloud US/EU pour données perso |
| Backup géo-redondant | ✅ **CONFORME** | Site secondaire au Maroc uniquement |

**⚠️ ATTENTION CRITIQUE :**  
Les scans CIN ne peuvent JAMAIS transiter par des serveurs AWS US, Azure EU, ou Google Cloud US (Patriot Act risque).

---

### 2. CHIFFREMENT

| Couche | Algorithme | Conformité |
|--------|------------|------------|
| Transport | TLS 1.3 | ✅ DSSi |
| Base de données | AES-256-GCM | ✅ DSSi |
| Fichiers CIN | AES-256-CBC | ✅ DSSi |
| Backup | AES-256 | ✅ DSSi |

---

### 3. DURÉE CONSERVATION (Loi 09-08)

| Donnée | Durée | Art. Loi 09-08 |
|--------|-------|----------------|
| CIN (scan) | **30 jours max** | ✅ Art. 9 |
| Données client | 5 ans | ✅ Art. 11 |
| Logs connexion | 1 an | ✅ Circulaire DSSi |
| Contrats | 10 ans | ✅ Droit commercial |

**✅ Automatisation :** Script de suppression J+30 configuré

---

### 4. CONSENTEMENTS CNDP

| Consentement | Type | Granulaire |
|--------------|------|------------|
| Vérification identité | **Obligatoire** | ✅ Checkbox séparé |
| Consultation Bureau Crédit | **Obligatoire** | ✅ Checkbox séparé |
| Offres commerciales | **Optionnel** | ✅ Checkbox séparé |

**⚠️ INTERDICTION :** Pas de case "J'accepte tout" globale

---

### 5. ARCHITECTURE SÉCURISÉE

```
Client ──TLS──▶ WAF ──▶ App Server (Maroc) ──▶ DB (Maroc)
                  │
                  └──▶ Fichiers CIN (chiffrés AES-256)
                  │
                  └──▶ Backup (Maroc, chiffré)
```

**Points de contrôle :**
- ✅ Pas de données perso hors Maroc
- ✅ Chiffrement end-to-end
- ✅ WAF + Rate limiting
- ✅ Authentification forte admin (2FA)

---

## ⚠️ POINTS À VALIDER AVANT MEP

### Avant mise en production

| # | Action | Responsable | Deadline |
|---|--------|-------------|----------|
| 1 | Déclaration traitement CNDP | DPO | MEP - 1 mois |
| 2 | Audit de sécurité (pentest) | Prestataire externe | MEP - 2 semaines |
| 3 | Désignation DPO officielle | Direction | MEP - 1 mois |
| 4 | Contrat sous-traitant hébergeur | Juridique | MEP - 1 mois |
| 5 | Procédure incident de sécurité | RSSI | MEP - 2 semaines |
| 6 | Test restore backup | Admin Sys | MEP - 1 semaine |

---

## 📋 DOCUMENTS À PRODUIRE

### Obligatoires (CNDP)

- [ ] **Déclaration de traitement** (formulaire CNDP)
- [ ] **Registre des activités de traitement** (RAT)
- [ ] **Désignation DPO** (attestation)
- [ ] **Politique de confidentialité** (publique)
- [ ] **Mentions légales** (site web)

### Recommandés (DSSi)

- [ ] **PAI** (Privacy Impact Assessment)
- [ ] **Politique de sécurité** (interne)
- [ ] **Plan de continuité** (PCA/PRA)
- [ ] **Procédure de gestion d'incidents**

---

## 🚨 RISQUES IDENTIFIÉS ET MITIGATION

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Fuite CIN | Faible | Critique | Chiffrement + accès restreints |
| Ransomware | Moyenne | Majeur | Backup offline + antivirus |
| Déni de service | Moyenne | Majeur | WAF + CDN + scaling |
| Non-conformité CNDP | Faible | Critique | DPO + déclaration préalable |

---

## ✅ VALIDATION FINALE

| Critère | Statut |
|---------|--------|
| Architecture conforme DSSi | ✅ **OUI** |
| Conformité Loi 09-08 | ✅ **OUI** |
| Hébergement 100% Maroc | ✅ **OUI** |
| Chiffrement adéquat | ✅ **OUI** |
| Durées conservation OK | ✅ **OUI** |
| Consentements granulaires | ✅ **OUI** |

**Décision :** ✅ **ARCHITECTURE VALIDÉE** pour soumission DSSi/CNDP

---

## 📞 CONTACTS UTILES

| Organisation | Rôle | Contact |
|--------------|------|---------|
| **CNDP** | Déclaration traitement | www.cnpd.ma |
| **DSSi** | Sécurité systèmes | www.dssi.gov.ma |
| **AMMC** | Contrôle bancaire | www.ammc.ma |

---

**Prochaine étape :** Déposer la déclaration CNDP et planifier l'audit sécurité.