# EQDOM — CINÉMATIQUE COMPLÈTE
## Parcours Client avec Tous les Scénarios

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    POINT D'ENTRÉE                                        │
│                                                                                          │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│   │  LANDING    │ or │  QR CODE    │ or │ LIEN SMS    │ or │  BANNER AD  │             │
│   │   (SEO)     │    │   (AGENCE)  │    │  (CAMPAGNE) │    │  (RETARGET) │             │
│   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘    └──────┬──────┘             │
│          └──────────────────┴───────────────────┴──────────────────┘                     │
│                                      │                                                   │
│                                      ▼                                                   │
│   ╔══════════════════════════════════════════════════════════════════════════════╗      │
│   ║  0. CHECK DOSSIER EXISTANT                                                   ║      │
│   ║                                                                              ║      │
│   ║  Cookie ?  ──OUI──►  ┌─────────────────────┐                                ║      │
│   ║  LocalStorage ?      │  REPRISE DOSSIER    │                                ║      │
│   ║  Token URL ?         │                     │                                ║      │
│   ║                      │  "Bonjour Sarah,     │                                ║      │
│   ║                      │   vous aviez commencé│                                ║      │
│   ║                      │   un crédit auto"    │                                ║      │
│   ║                      │                     │                                ║      │
│   ║                      │  [ Reprendre ]      │                                ║      │
│   ║                      │  [ Nouveau dossier ]│                                ║      │
│   ║                      └──────────┬──────────┘                                ║      │
│   ║                                 │                                            ║      │
│   ║  NON ───────────────────────────┘                                            ║      │
│   ╚══════════════════════════════════════════════════════════════════════════════╝      │
│                                      │                                                   │
│                                      ▼                                                   │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                              PHASE 1: SIMULATION (Synchrone)                             │
│                                                                                          │
│   ┌─────────────────────────────────────────────────────────────────────────────┐       │
│   │  1. HERO SECTION                                                             │       │
│   │                                                                              │       │
│   │     "Votre projet, notre financement"                                        │       │
│   │                                                                              │       │
│   │     [ Démarrer ] ────────EXIT POINT 1: Bounce (ferme l'onglet)              │       │
│   │                            └──► Sauvegarde: Aucune (pas encore commencé)    │       │
│   └─────────────────────────────────┬───────────────────────────────────────────┘       │
│                                     │                                                    │
│                                     ▼                                                    │
│   ┌─────────────────────────────────────────────────────────────────────────────┐       │
│   │  2. SIMULATION                                                               │       │
│   │                                                                              │       │
│   │     Montant: [50 000 DH]                                                    │       │
│   │     Durée:   [24 mois]                                                      │       │
│   │     Mensualité: 2 396 DH                                                    │       │
│   │                                                                              │       │
│   │     ┌─────────────────────────────────────────────────────────────┐         │       │
│   │     │  SAUVEGARDE AUTO : BROUILLON créé dans localStorage        │         │       │
│   │     │  Token: EQD-BROUILLON-XXXX                                 │         │       │
│   │     └─────────────────────────────────────────────────────────────┘         │       │
│   │                                                                              │       │
│   │     [ Continuer ] ───────EXIT POINT 2: Quitte pendant simu                  │       │
│   │                       └──► Reprise possible pendant 7 jours                 │       │
│   └─────────────────────────────────┬───────────────────────────────────────────┘       │
│                                     │                                                    │
│                                     ▼                                                    │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                         PHASE 2: IDENTITÉ LÉGÈRE (Synchrone)                            │
│                                                                                          │
│   ┌─────────────────────────────────────────────────────────────────────────────┐       │
│   │  3. CONTACT MINIMAL                                                          │       │
│   │                                                                              │       │
│   │     Prénom*:    [Sarah________]                                             │       │
│   │     Nom*:       [Benali_______]                                             │       │
│   │     Téléphone*: [06XX-XXX-XXX]                                              │       │
│   │     Email:      [optionnel____]                                             │       │
│   │                                                                              │       │
│   │     ┌─────────────────────────────────────────────────────────────┐         │       │
│   │     │  CONSENTEMENTS CNDP (obligatoire pour continuer)           │         │       │
│   │     │                                                              │         │       │
│   │     │  [✓] J'accepte la vérification d'identité                    │         │       │
│   │     │  [✓] J'accepte la consultation du Bureau de Crédit           │         │       │
│   │     │  [✓] J'accepte le traitement de mes données personnelles     │         │       │
│   │     └─────────────────────────────────────────────────────────────┘         │       │
│   │                                                                              │       │
│   │     [ Continuer ] ───────EXIT POINT 3: Quitte après contact                 │       │
│   │                       └──► Relance SMS J+1: "N'oubliez pas vos docs"       │       │
│   └─────────────────────────────────┬───────────────────────────────────────────┘       │
│                                     │                                                    │
│                                     ▼                                                    │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                         PHASE 3: DOCUMENTS (Asynchrone débute)                          │
│                                                                                          │
│   ┌─────────────────────────────────────────────────────────────────────────────┐       │
│   │  4. UPLOAD DOCUMENTS                                                         │       │
│   │                                                                              │       │
│   │     Obligatoires:                     Optionnels:                           │       │
│   │     ┌─────────────┐                   ┌─────────────┐                       │       │
│   │     │ CIN Recto   │                   │ Fiche paie  │                       │       │
│   │     │ 🟡 Upload   │                   │ ⚪ Upload   │                       │       │
│   │     └─────────────┘                   └─────────────┘                       │       │
│   │     ┌─────────────┐                   ┌─────────────┐                       │       │
│   │     │ CIN Verso   │                   │ Facture     │                       │       │
│   │     │ 🟡 Upload   │                   │ (si auto)   │                       │       │
│   │     └─────────────┘                   └─────────────┘                       │       │
│   │     ┌─────────────┐                                                         │       │
│   │     │ RIB         │                                                         │       │
│   │     │ 🟡 Upload   │                                                         │       │
│   │     └─────────────┘                                                         │       │
│   │                                                                              │       │
│   │     ─────────────────────────────────────────────────────────────           │       │
│   │     LÉGENDE: 🟡 Uploadé / ⚪ Manquant / 🟢 Validé / 🔴 Rejeté              │       │
│   │     ─────────────────────────────────────────────────────────────           │       │
│   │                                                                              │       │
│   │     ┌─────────────────────────────────────────────────────────────────┐     │       │
│   │     │  OPTIONS DE SORTIE:                                            │     │       │
│   │     │                                                                 │     │       │
│   │     │  A) [ Soumettre les documents ]                                │     │       │
│   │     │     └──► Min: 2 docs obligatoires                              │     │       │
│   │     │     └──► ÉTAT: EN ATTENTE DE VÉRIFICATION                      │     │       │
│   │     │                                                                │     │       │
│   │     │  B) [ Sauvegarder et reprendre plus tard ]                     │     │       │
│   │     │     └──► EXIT POINT 4: Sauvegarde partielle                    │     │       │
│   │     │     └──► SMS de rappel J+1 avec lien magique                   │     │       │
│   │     │     └──► Expiration: 7 jours                                   │     │       │
│   │     │                                                                │     │       │
│   │     │  C) [ Quitter sans sauvegarder ]                               │     │       │
│   │     │     └──► EXIT POINT 5: Abandon                                 │     │       │
│   │     │     └──► Email relance J+2                                     │     │       │
│   │     └─────────────────────────────────────────────────────────────────┘     │       │
│   └─────────────────────────────────┬───────────────────────────────────────────┘       │
│                                     │                                                    │
│                                     ▼ (Si option A choisie)                              │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                         PHASE 4: VÉRIFICATION (Asynchrone Backend)                      │
│                                                                                          │
│   ┌─────────────────────────────────────────────────────────────────────────────┐       │
│   │  5. EN ATTENTE DE VÉRIFICATION                                               │       │
│   │                                                                              │       │
│   │     Votre dossier: EQD-78432                                                │       │
│   │                                                                              │       │
│   │     ┌─────────────────────────────────────────────────────────────┐         │       │
│   │     │  PROGRESSION:                                              │         │       │
│   │     │                                                            │         │       │
│   │     │  1. Documents reçus       ████████████ ✓                   │         │       │
│   │     │  2. Vérification OCR      █████████░░░ ⏳ (4h-24h)         │         │       │
│   │     │  3. Analyse crédit        ░░░░░░░░░░░░ ⏳                  │         │       │
│   │     │  4. Décision finale       ░░░░░░░░░░░░ ⏳                  │         │       │
│   │     │                                                            │         │       │
│   │     └─────────────────────────────────────────────────────────────┘         │       │
│   │                                                                              │       │
│   │     [ 🔔 Me notifier ]  [ 📤 Ajouter des documents ]                        │       │
│   │                                                                              │       │
│   │     EXIT POINT 6: Fermer et attendre                                        │       │
│   │     └──► Notification SMS quand résultat prêt                               │       │
│   │     └──► Lien: eqdom.ma/suivi/EQD-78432                                     │       │
│   └─────────────────────────────────┬───────────────────────────────────────────┘       │
│                                     │                                                    │
│                                     ▼ (Backend process)                                   │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                              DÉCISION BACKEND (Branching)                                │
│                                                                                          │
│                         ┌─────────────────────┐                                          │
│                         │   VÉRIFICATION      │                                          │
│                         │     TERMINÉE        │                                          │
│                         └──────────┬──────────┘                                          │
│                                    │                                                     │
│              ┌─────────────────────┼─────────────────────┐                                │
│              │                     │                     │                                │
│              ▼                     ▼                     ▼                                │
│    ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐                        │
│    │  SCÉNARIO A     │   │  SCÉNARIO B     │   │  SCÉNARIO C     │                        │
│    │  DOCS OK        │   │  DOCS INCOMPLETS│   │  DOCS INVALIDES │                        │
│    │  Scoring OK     │   │  Scoring OK     │   │  OU Scoring NOK │                        │
│    │                 │   │                 │   │                 │                        │
│    │  🟢 APPROUVÉ    │   │  🟡 À COMPLÉTER │   │  🔴 REFUSÉ      │                        │
│    │                 │   │                 │   │  (ou à étudier) │                        │
│    └────────┬────────┘   └────────┬────────┘   └────────┬────────┘                        │
│             │                     │                     │                                 │
│             ▼                     ▼                     ▼                                 │
│    ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐                        │
│    │ NOTIFICATION:   │   │ NOTIFICATION:   │   │ NOTIFICATION:   │                        │
│    │ "Offre prête"   │   │ "Docs manquants"│   │ "Dossier étudié"│                        │
│    │ SMS + Email     │   │ SMS + Email     │   │ SMS + Email     │                        │
│    └────────┬────────┘   └────────┬────────┘   └────────┬────────┘                        │
│             │                     │                     │                                 │
└─────────────┼─────────────────────┼─────────────────────┼─────────────────────────────────┘
              │                     │                     │
              ▼                     ▼                     ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              PHASE 5: REPRISE & RÉSOLUTION                               │
│                                                                                          │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐                        │
│   │  SCÉNARIO A     │   │  SCÉNARIO B     │   │  SCÉNARIO C     │                        │
│   │  OFFRE          │   │  COMPLETION     │   │  REFUS /        │                        │
│   │  PRÉSENTÉE      │   │  DEMANDÉE       │   │  CONTRE-PROP    │                        │
│   │                 │   │                 │   │                 │                        │
│   │  Montant:       │   │  Documents      │   │  Motif:         │                        │
│   │  50 000 DH      │   │  manquants:     │   │  "Ratio          │                        │
│   │  TAEG: 4.9%     │   │                 │   │   endettement   │                        │
│   │                 │   │  • Fiche paie   │   │   trop élevé"   │                        │
│   │  [ Voir le      │   │  • Justif dom   │   │                 │                        │
│   │    contrat ]    │   │                 │   │  [ Consulter    │                        │
│   │                 │   │  [ Compléter    │   │    la décision ]│                        │
│   │  [ Accepter ]   │   │    maintenant ] │   │                 │                        │
│   │  [ Négocier ]   │   │                 │   │  OU             │                        │
│   │                 │   │  Délai: 5 jours │   │  Contre-propo-  │                        │
│   │  EXIT POINT 7:  │   │  restants       │   │  sition avec    │                        │
│   │  Acceptation    │   │                 │   │  montant réduit │                        │
│   │  └──► Phase 6   │   │  EXIT POINT 8:  │   │                 │                        │
│   │                 │   │  Completion     │   │  [ Voir contre- │                        │
│   │                 │   │  └──► Retour    │   │   proposition ] │                        │
│   │                 │   │      étape 4    │   │                 │                        │
│   │                 │   │                 │   │  EXIT POINT 9:  │                        │
│   │                 │   │                 │   │  Abandon défini │                        │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘                        │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
              │
              ▼ (Si Scénario A accepté)
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              PHASE 6: SIGNATURE (Synchrone)                              │
│                                                                                          │
│   ┌─────────────────────────────────────────────────────────────────────────────┐       │
│   │  6. CONTRAT & SIGNATURE                                                      │       │
│   │                                                                              │       │
│   │     ┌─────────────────────────────────────────────────────────────────┐      │       │
│   │     │  RÉCAPITULATIF                                                 │      │       │
│   │     │                                                                │      │       │
│   │     │  Crédit: 50 000 DH                                             │      │       │
│   │     │  Durée: 24 mois                                                │      │       │
│   │     │  Mensualité: 2 396 DH                                          │      │       │
│   │     │  TAEG: 4.9%                                                    │      │       │
│   │     │  Coût total: XX XXX DH                                         │      │       │
│   │     │  Assurance: Incluse                                            │      │       │
│   │     │                                                                │      │       │
│   │     │  [ 📄 Télécharger le contrat (PDF) ]                           │      │       │
│   │     └─────────────────────────────────────────────────────────────────┘      │       │
│   │                                                                              │       │
│   │     ┌─────────────────────────────────────────────────────────────────┐      │       │
│   │     │  SIGNATURE ÉLECTRONIQUE                                        │      │       │
│   │     │                                                                │      │       │
│   │     │  ┌─────────────────────────────────────────┐                   │      │       │
│   │     │  │                                         │                   │      │       │
│   │     │  │         ✍️ (canvas signature)          │                   │      │       │
│   │     │  │                                         │                   │      │       │
│   │     │  └─────────────────────────────────────────┘                   │      │       │
│   │     │                                                                │      │       │
│   │     │  [ Effacer ]          [ Valider la signature ]                 │      │       │
│   │     └─────────────────────────────────────────────────────────────────┘      │       │
│   │                                                                              │       │
│   │     ┌─────────────────────────────────────────────────────────────────┐      │       │
│   │     │  DROIT DE RÉTRACTATION                                         │      │       │
│   │     │  Vous disposez de 14 jours pour annuler sans frais.            │      │       │
│   │     └─────────────────────────────────────────────────────────────────┘      │       │
│   │                                                                              │       │
│   │     EXIT POINT 10: Abandon avant signature                                  │       │
│   │     └──► Dossier annulé, email confirmation                                 │       │
│   └─────────────────────────────────┬───────────────────────────────────────────┘       │
│                                     │                                                    │
│                                     ▼                                                    │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                              PHASE 7: CONFIRMATION (Finale)                              │
│                                                                                          │
│   ┌─────────────────────────────────────────────────────────────────────────────┐       │
│   │  7. VALIDATION FINALE                                                        │       │
│   │                                                                              │       │
│   │         ✓                                                                    │       │
│   │    CRÉDIT APPROUVÉ !                                                         │       │
│   │                                                                              │       │
│   │    Référence: EQD-78432                                                      │       │
│   │                                                                              │       │
│   │    ┌─────────────────────────────────────────────────────────────┐          │       │
│   │    │  TIMELINE DÉBLOCAGE                                        │          │       │
│   │    │                                                             │          │       │
│   │    │  Signature ✓ ──► Virement ──► 24-48h ──► 💰               │          │       │
│   │    │                                                             │          │       │
│   │    │  [ Suivre mon virement ]                                    │          │       │
│   │    └─────────────────────────────────────────────────────────────┘          │       │
│   │                                                                              │       │
│   │    [ Télécharger contrat signé ]                                             │       │
│   │    [ Ajouter à mon calendrier ]                                              │       │
│   │    [ Parrainer un ami ]                                                      │       │
│   │                                                                              │       │
│   │    EXIT POINT 11: Parcours terminé avec succès                              │       │
│   │    └──► NPS Survey J+7                                                      │       │
│   │    └──► Programme fidélité proposé                                          │       │
│   └─────────────────────────────────────────────────────────────────────────────┘       │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════════════════
                                      RÉCAPITULATIF EXIT POINTS
═══════════════════════════════════════════════════════════════════════════════════════════

EXIT 1: Bounce landing (aucune sauvegarde)
EXIT 2: Quitte simulation → Relance email J+1
EXIT 3: Quitte contact → Relance SMS J+1
EXIT 4: Sauvegarde partielle docs → Lien magique + Relance J+1
EXIT 5: Abandon docs → Email J+2
EXIT 6: Attente vérification → Notification SMS quand résultat
EXIT 7: Acceptation offre → Phase signature
EXIT 8: Completion docs demandée → Retour étape 4
EXIT 9: Refus accepté → Fin
EXIT 10: Abandon signature → Annulation
EXIT 11: Succès → Fidélisation


═══════════════════════════════════════════════════════════════════════════════════════════
                                      RELANCES PROGRAMMÉES
═══════════════════════════════════════════════════════════════════════════════════════════

T+0 (Immédiat): Confirmation email si docs soumis
T+1h: Si brouillon simu → Email "Votre simulation vous attend"
T+24h: Si docs partiels → SMS "Il vous manque 2 documents"
T+48h: Si attente sans news → Email "Votre dossier avance"
T+5j: Si docs incomplets → SMS "Dernier jour pour compléter"
T+7j: Expiration → Email "Votre dossier expire aujourd'hui"
T+7j+1: Archivage → "Nouveau dossier nécessaire"


═══════════════════════════════════════════════════════════════════════════════════════════
                                      ÉTATS TECHNIQUES
═══════════════════════════════════════════════════════════════════════════════════════════

BROUILLON          → LocalStorage uniquement, pas de backend
EN_COURS           → Backend créé, token actif, TTL 7 jours
EN_ATTENTE         → Backend verrouillé, traitement interne
A_COMPLETER        → Backend déverrouillé, docs rejetés listés
APPROUVE           → Offre générée, attente signature
REFUSE             → Décision finalisée, archivage 30j
SIGNÉ              → Contrat en cours, déblocage programmé
COMPLET            → Crédit actif, support client
