/**
 * Rothschild API - Gestion des opportunités business
 * Lead Dev: Aiman
 * Version: 1.0.0
 */

class RothschildAPI {
  constructor() {
    this.dataPath = '../data/business-opportunities.json';
    this.data = null;
    this.lastFetch = null;
    this.cacheDuration = 30000; // 30s
  }

  /**
   * Charge les données depuis le fichier JSON
   */
  async loadData() {
    try {
      const response = await fetch(this.dataPath + '?t=' + Date.now());
      this.data = await response.json();
      this.lastFetch = Date.now();
      return this.data;
    } catch (error) {
      console.error('RothschildAPI: Erreur chargement données', error);
      // Fallback vers données statiques si chargement échoue
      return this.getFallbackData();
    }
  }

  /**
   * Données fallback en cas d'erreur
   */
  getFallbackData() {
    return {
      last_updated: new Date().toISOString(),
      status: 'active',
      metrics: { total: 0, validated: 0, rejected: 0, in_validation: 0, in_research: 0 },
      opportunities: [],
      classement: []
    };
  }

  /**
   * Récupère toutes les opportunités
   */
  async getOpportunities() {
    if (!this.data || this.isCacheExpired()) {
      await this.loadData();
    }
    return this.data?.opportunities || [];
  }

  /**
   * Récupère une opportunité par ID
   */
  async getOpportunityById(id) {
    const opps = await this.getOpportunities();
    return opps.find(opp => opp.id === id);
  }

  /**
   * Récupère les métriques globales
   */
  async getMetrics() {
    if (!this.data || this.isCacheExpired()) {
      await this.loadData();
    }
    return this.data?.metrics || {};
  }

  /**
   * Récupère le classement
   */
  async getClassement() {
    if (!this.data || this.isCacheExpired()) {
      await this.loadData();
    }
    return this.data?.classement || [];
  }

  /**
   * Filtre les opportunités par statut
   */
  async getByStatus(status) {
    const opps = await this.getOpportunities();
    return opps.filter(opp => opp.statut === status);
  }

  /**
   * Récupère les opportunités recommandées
   */
  async getRecommended() {
    const opps = await this.getOpportunities();
    return opps.filter(opp => opp.recommandation === true);
  }

  /**
   * Récupère les opportunités par catégorie
   */
  async getByCategory(categorie) {
    const opps = await this.getOpportunities();
    return opps.filter(opp => opp.categorie === categorie);
  }

  /**
   * Calcule les statistiques par statut
   */
  async getPipelineStats() {
    const opps = await this.getOpportunities();
    return {
      en_recherche: opps.filter(o => o.statut === 'en_recherche').length,
      en_validation: opps.filter(o => o.statut === 'en_validation').length,
      valide: opps.filter(o => o.statut === 'valide').length,
      rejete: opps.filter(o => o.statut === 'rejete').length,
      total: opps.length
    };
  }

  /**
   * Calcule les métriques financières
   */
  async getFinancialMetrics() {
    const opps = await this.getOpportunities();
    const costs = opps.map(o => o.coût_démarrage || 0);
    const scores = opps.map(o => o.score || 0);
    
    return {
      avg_cost: costs.reduce((a, b) => a + b, 0) / costs.length,
      min_cost: Math.min(...costs),
      max_cost: Math.max(...costs),
      avg_score: scores.reduce((a, b) => a + b, 0) / scores.length,
      total_opportunities: opps.length,
      high_potential: opps.filter(o => o.score >= 8).length
    };
  }

  /**
   * Formate une opportunité pour l'affichage
   */
  formatOpportunity(opp) {
    return {
      ...opp,
      score_formatted: `${opp.score}/10`,
      difficulty_stars: '★'.repeat(opp.difficulté) + '☆'.repeat(5 - opp.difficulté),
      confidence_color: this.getConfidenceColor(opp.confiance),
      status_color: this.getStatusColor(opp.statut),
      status_label: this.getStatusLabel(opp.statut),
      cost_formatted: opp.coût_démarrage_range || `€${opp.coût_démarrage}`,
      is_hot: opp.score >= 8.5
    };
  }

  /**
   * Récupère la couleur de confiance
   */
  getConfidenceColor(confiance) {
    const colors = {
      'très haute': '#00ff88',
      'haute': '#00d4ff',
      'moyenne': '#ffd93d',
      'faible': '#ff6b6b'
    };
    return colors[confiance] || '#8892a0';
  }

  /**
   * Récupère la couleur du statut
   */
  getStatusColor(statut) {
    const colors = {
      'en_recherche': '#ffd93d',
      'en_validation': '#00d4ff',
      'valide': '#00ff88',
      'rejete': '#ff6b6b'
    };
    return colors[statut] || '#8892a0';
  }

  /**
   * Récupère le label du statut
   */
  getStatusLabel(statut) {
    const labels = {
      'en_recherche': 'En recherche',
      'en_validation': 'En validation',
      'valide': 'Validé',
      'rejete': 'Rejeté'
    };
    return labels[statut] || statut;
  }

  /**
   * Génère le HTML pour une card d'opportunité
   */
  generateOpportunityCard(opp, view = 'pipeline') {
    const formatted = this.formatOpportunity(opp);
    
    if (view === 'pipeline') {
      return `
        <div class="roth-card ${opp.recommandation ? 'recommended' : ''}" data-id="${opp.id}">
          <div class="roth-card-header">
            <span class="roth-score">${formatted.score_formatted}</span>
            ${opp.recommandation ? '<span class="roth-badge-recommended">★ TOP</span>' : ''}
          </div>
          <h4 class="roth-card-title">${opp.nom}</h4>
          <p class="roth-card-cat">${opp.categorie}</p>
          <div class="roth-card-meta">
            <span class="roth-cost">💰 ${formatted.cost_formatted}</span>
            <span class="roth-diff">${formatted.difficulty_stars}</span>
          </div>
          <div class="roth-card-footer">
            <span class="roth-conf" style="color:${formatted.confidence_color}">● ${opp.confiance}</span>
            <button class="roth-btn-details" onclick="showOpportunityDetails('${opp.id}')">Détails →</button>
          </div>
        </div>
      `;
    }
    
    return '';
  }

  /**
   * Génère le tableau comparatif
   */
  generateComparisonTable(opportunities) {
    const rows = opportunities.map(opp => {
      const formatted = this.formatOpportunity(opp);
      return `
        <tr data-id="${opp.id}" onclick="showOpportunityDetails('${opp.id}')">
          <td><strong>${opp.nom}</strong></td>
          <td>${opp.categorie}</td>
          <td><span class="roth-score-badge" style="background:${this.getScoreColor(opp.score)}">${opp.score}/10</span></td>
          <td>${formatted.cost_formatted}</td>
          <td>${formatted.difficulty_stars}</td>
          <td><span style="color:${formatted.confidence_color}">●</span> ${opp.confiance}</td>
          <td>${opp.temps_implémentation}</td>
          <td>${opp.recommandation ? '★ Recommandé' : ''}</td>
        </tr>
      `;
    }).join('');

    return `
      <table class="roth-comparison-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Score</th>
            <th>Coût</th>
            <th>Difficulté</th>
            <th>Confiance</th>
            <th>Délai</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  /**
   * Récupère la couleur selon le score
   */
  getScoreColor(score) {
    if (score >= 8.5) return 'rgba(0, 255, 136, 0.2)';
    if (score >= 7.5) return 'rgba(0, 212, 255, 0.2)';
    if (score >= 6) return 'rgba(255, 217, 61, 0.2)';
    return 'rgba(255, 107, 107, 0.2)';
  }

  /**
   * Génère la vue détaillée d'une opportunité
   */
  generateDetailView(opp) {
    const formatted = this.formatOpportunity(opp);
    
    return `
      <div class="roth-detail-header">
        <div class="roth-detail-title-section">
          <h2>${opp.nom}</h2>
          <span class="roth-detail-cat">${opp.categorie}</span>
          ${opp.recommandation ? '<span class="roth-badge-top">★ RECOMMANDÉ PAR ROTHSCHILD</span>' : ''}
        </div>
        <div class="roth-detail-score">
          <span class="roth-big-score" style="color:${this.getScoreColor(opp.score)}">${opp.score}</span>
          <span class="roth-score-label">/10</span>
        </div>
      </div>

      <div class="roth-detail-grid">
        <div class="roth-detail-section">
          <h4>📋 Description</h4>
          <p>${opp.description}</p>
        </div>

        <div class="roth-detail-section">
          <h4>🎯 Marché Cible</h4>
          <p>${opp.marché_cible}</p>
          <p class="roth-detail-sub">${opp.taille_marché}</p>
        </div>

        <div class="roth-detail-section roth-metrics-grid">
          <div class="roth-metric">
            <span class="roth-metric-label">Coût de démarrage</span>
            <span class="roth-metric-value">${formatted.cost_formatted}</span>
          </div>
          <div class="roth-metric">
            <span class="roth-metric-label">Potentiel revenus</span>
            <span class="roth-metric-value">${opp.potentiel_revenus}</span>
          </div>
          <div class="roth-metric">
            <span class="roth-metric-label">Marge brute</span>
            <span class="roth-metric-value">${opp.marge_brute}</span>
          </div>
          <div class="roth-metric">
            <span class="roth-metric-label">Temps implémentation</span>
            <span class="roth-metric-value">${opp.temps_implémentation}</span>
          </div>
        </div>

        <div class="roth-detail-section">
          <h4>🔍 Validation Marché</h4>
          <p>${opp.validation_marché}</p>
        </div>

        ${opp.tags ? `
        <div class="roth-detail-section">
          <h4>🏷️ Tags</h4>
          <div class="roth-tags">
            ${opp.tags.map(tag => `<span class="roth-tag">${tag}</span>`).join('')}
          </div>
        </div>
        ` : ''}

        <div class="roth-detail-section roth-confidence-section">
          <h4>📊 Niveau de Confiance</h4>
          <div class="roth-confidence-bar">
            <div class="roth-confidence-fill" style="width:${this.confidenceToPercent(opp.confiance)}%; background:${formatted.confidence_color}"></div>
          </div>
          <span class="roth-confidence-text" style="color:${formatted.confidence_color}">${opp.confiance.toUpperCase()}</span>
        </div>
      </div>
    `;
  }

  /**
   * Convertit la confiance en pourcentage
   */
  confidenceToPercent(confiance) {
    const mapping = {
      'très haute': 95,
      'haute': 80,
      'moyenne': 50,
      'faible': 25
    };
    return mapping[confiance] || 50;
  }

  /**
   * Vérifie si le cache est expiré
   */
  isCacheExpired() {
    return !this.lastFetch || (Date.now() - this.lastFetch) > this.cacheDuration;
  }

  /**
   * Met à jour le statut d'une opportunité
   * (simulation - nécessiterait un backend pour persistance réelle)
   */
  async updateStatus(id, newStatus) {
    const opp = await this.getOpportunityById(id);
    if (opp) {
      opp.statut = newStatus;
      console.log(`RothschildAPI: Statut de ${id} mis à jour vers ${newStatus}`);
      return true;
    }
    return false;
  }
}

// Export pour utilisation
window.RothschildAPI = RothschildAPI;
