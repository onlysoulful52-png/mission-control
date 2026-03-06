#!/usr/bin/env node
/**
 * Postmark Email Webhook Receiver
 * Pour Rothschild - Mission Control
 * 
 * Ce serveur reçoit les webhooks de Postmark Inbound,
 * classifie les emails et les prépare pour analyse.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const CONFIG = {
  PORT: process.env.PORT || 3099,
  LOG_DIR: path.join(__dirname, 'data', 'emails'),
  LOG_FILE: path.join(__dirname, 'data', 'emails', 'email-log.jsonl'),
  // Mot-clés pour classification
  CLASSIFIERS: {
    eqdom: ['eqdom', 'crédit', 'crédits', 'cndp', 'prêt', 'prêts', 'simulation', 'financement', 'maroc'],
    bobcat: ['bobcat', 'energy', 'cee', 'c2e', 'chèque', 'cheque', 'énergie', 'prime', 'renovation', 'rénover'],
    urgent: ['urgent', 'asap', 'immédiat', 'critique', 'action requise', 'important', 'attention'],
    spam: ['viagra', 'crypto', 'bitcoin', 'loterie', 'gagné', 'gratuit', 'cliquez ici', 'argent facile']
  }
};

// S'assurer que le dossier de logs existe
if (!fs.existsSync(CONFIG.LOG_DIR)) {
  fs.mkdirSync(CONFIG.LOG_DIR, { recursive: true });
}

/**
 * Classifie un email selon son contenu
 */
function classifyEmail(email) {
  const textToAnalyze = [
    email.Subject || '',
    email.TextBody || '',
    email.From || '',
    email.FromName || ''
  ].join(' ').toLowerCase();

  const categories = [];
  const scores = {};

  for (const [category, keywords] of Object.entries(CONFIG.CLASSIFIERS)) {
    let score = 0;
    for (const keyword of keywords) {
      const regex = new RegExp(keyword, 'gi');
      const matches = textToAnalyze.match(regex);
      if (matches) {
        score += matches.length;
      }
    }
    scores[category] = score;
    if (score > 0) {
      categories.push(category);
    }
  }

  // Si aucune catégorie trouvée, marquer comme "other"
  if (categories.length === 0) {
    categories.push('other');
  }

  // Déterminer la catégorie principale (highest score)
  const primaryCategory = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .find(([_, score]) => score > 0)?.[0] || 'other';

  return { categories, primaryCategory, scores };
}

/**
 * Extrait les pièces jointes importantes
 */
function processAttachments(attachments) {
  if (!attachments || !Array.isArray(attachments) || attachments.length === 0) {
    return [];
  }

  return attachments.map(att => ({
    name: att.Name || 'unknown',
    contentType: att.ContentType || 'application/octet-stream',
    contentLength: att.ContentLength || 0,
    hasContent: !!att.Content,
    contentId: att.ContentID || null
  }));
}

/**
 * Sauvegarde un email dans le log
 */
function saveEmail(emailData) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    id: crypto.randomUUID(),
    timestamp,
    receivedAt: timestamp,
    ...emailData
  };

  // Append au fichier JSONL
  fs.appendFileSync(CONFIG.LOG_FILE, JSON.stringify(logEntry) + '\n');

  // Sauvegarder aussi un fichier individuel pour faciliter l'accès
  const individualFile = path.join(CONFIG.LOG_DIR, `${logEntry.id}.json`);
  fs.writeFileSync(individualFile, JSON.stringify(logEntry, null, 2));

  return logEntry;
}

/**
 * Crée un résumé pour Rothschild
 */
function createSummary(email, classification) {
  const summary = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    from: email.From,
    fromName: email.FromName,
    to: email.To,
    subject: email.Subject,
    receivedAt: email.Date,
    classification: classification.primaryCategory,
    categories: classification.categories,
    urgencyScore: classification.scores.urgent || 0,
    hasAttachments: (email.Attachments?.length || 0) > 0,
    attachmentCount: email.Attachments?.length || 0,
    bodyPreview: (email.TextBody || '').substring(0, 200).replace(/\s+/g, ' '),
    actionRequired: classification.scores.urgent > 0 || classification.primaryCategory === 'eqdom',
    recommendedAction: getRecommendedAction(classification)
  };

  return summary;
}

/**
 * Détermine l'action recommandée selon la classification
 */
function getRecommendedAction(classification) {
  const actions = {
    eqdom: 'ROUTER_VERS_EQDOM - Nouvelle demande de crédit à traiter',
    bobcat: 'ROUTER_VERS_BOBCAT - Lead CEE à qualifier',
    urgent: 'PRIORITAIRE - Action immédiate requise',
    spam: 'IGNORER - Marquer comme spam',
    other: 'REVIEW - Analyse manuelle nécessaire'
  };

  return actions[classification.primaryCategory] || actions.other;
}

/**
 * Parse le corps de la requête JSON
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}

/**
 * Log avec timestamp
 */
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

// Créer le serveur HTTP
const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // Endpoint health check
  if (url.pathname === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      service: 'postmark-webhook-receiver',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }));
    return;
  }

  // Endpoint principal pour les webhooks Postmark
  if (url.pathname === '/webhook/postmark' && req.method === 'POST') {
    try {
      const email = await parseBody(req);
      
      log(`📧 Email reçu de: ${email.From} - Sujet: ${email.Subject?.substring(0, 50)}...`);

      // Classifier l'email
      const classification = classifyEmail(email);
      log(`🏷️  Classification: ${classification.primaryCategory} (${classification.categories.join(', ')})`);

      // Traiter les pièces jointes
      const attachments = processAttachments(email.Attachments);

      // Préparer les données complètes
      const emailData = {
        raw: email,
        classification,
        attachments,
        summary: createSummary(email, classification)
      };

      // Sauvegarder
      const saved = saveEmail(emailData);
      log(`💾 Email sauvegardé: ${saved.id}`);

      // Répondre à Postmark (doit être 200 OK)
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        id: saved.id,
        classification: classification.primaryCategory,
        message: 'Email processed successfully'
      }));

      // Log résumé pour Rothschild
      console.log('\n' + '='.repeat(60));
      console.log('📨 EMAIL POUR ROTHSHILD');
      console.log('='.repeat(60));
      console.log(`De:      ${email.FromName} <${email.From}>`);
      console.log(`Sujet:   ${email.Subject}`);
      console.log(`Cat:     ${classification.primaryCategory.toUpperCase()}`);
      console.log(`Action:  ${emailData.summary.recommendedAction}`);
      console.log(`Urgence: ${emailData.summary.urgencyScore > 0 ? '⚠️ URGENT' : 'Normal'}`);
      console.log('='.repeat(60) + '\n');

    } catch (error) {
      log(`❌ Erreur traitement: ${error.message}`, 'ERROR');
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
    return;
  }

  // Endpoint pour lister les emails reçus (pour debug)
  if (url.pathname === '/emails' && req.method === 'GET') {
    try {
      const limit = parseInt(url.searchParams.get('limit')) || 10;
      
      if (!fs.existsSync(CONFIG.LOG_FILE)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ emails: [], total: 0 }));
        return;
      }

      const content = fs.readFileSync(CONFIG.LOG_FILE, 'utf8');
      const emails = content
        .trim()
        .split('\n')
        .filter(line => line)
        .map(line => JSON.parse(line))
        .reverse()
        .slice(0, limit);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        emails: emails.map(e => e.summary || e),
        total: emails.length
      }));

    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

// Démarrer le serveur
server.listen(CONFIG.PORT, () => {
  log('='.repeat(60));
  log('🚀 Postmark Webhook Receiver - Démarré');
  log('='.repeat(60));
  log(`📡 Port:     ${CONFIG.PORT}`);
  log(`📁 Logs:     ${CONFIG.LOG_DIR}`);
  log(`🔗 Webhook:  http://localhost:${CONFIG.PORT}/webhook/postmark`);
  log(`❤️  Health:   http://localhost:${CONFIG.PORT}/health`);
  log(`📨 Emails:   http://localhost:${CONFIG.PORT}/emails`);
  log('='.repeat(60));
  log('');
  log('Configuration Postmark:');
  log('1. Créer un Inbound Stream sur https://postmarkapp.com');
  log('2. Configurer le Webhook URL:');
  log(`   → http://VOTRE_IP:${CONFIG.PORT}/webhook/postmark`);
  log('3. Forwarder vos emails pro vers l\'adresse Postmark');
  log('='.repeat(60));
});

// Gestion gracieuse de l'arrêt
process.on('SIGINT', () => {
  log('\n👋 Arrêt du serveur...', 'INFO');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});
