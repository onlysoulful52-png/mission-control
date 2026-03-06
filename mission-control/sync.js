# ═══════════════════════════════════════════════════════════
# SYNC ENGINE - Mission Control Auto-Update
# Synchronise les données entre agents et dashboard
# ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

class MissionControlSync {
    constructor() {
        this.workspaceDir = '/root/.openclaw/workspace';
        this.mcDir = path.join(this.workspaceDir, 'mission-control');
        this.dataDir = path.join(this.mcDir, 'data');
        this.memoryDir = path.join(this.workspaceDir, 'memory');
        this.pmDir = path.join(this.workspaceDir, 'eqdom-premium/project-management');
        
        this.tasksFile = path.join(this.dataDir, 'tasks.json');
        this.historyFile = path.join(this.dataDir, 'history.json');
        this.notificationsFile = path.join(this.dataDir, 'notifications.json');
        
        this.config = this.loadConfig();
        this.lastSync = Date.now();
    }

    loadConfig() {
        const configPath = path.join(this.mcDir, 'config.json');
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }

    // ═══════════════════════════════════════════════════════
    // SYNC PRINCIPAL - Lance toutes les synchronisations
    // ═══════════════════════════════════════════════════════
    syncAll() {
        console.log('🔄 Syncing Mission Control...');
        
        this.syncFromMemory();
        this.syncFromProjectManagement();
        this.syncFromDailyNotes();
        this.updateTimestamps();
        this.checkNotifications();
        
        this.lastSync = Date.now();
        console.log('✅ Sync completed at', new Date().toISOString());
        
        return this.getDashboardData();
    }

    // ═══════════════════════════════════════════════════════
    // 1. SYNC DEPUIS LES FICHIERS MEMORY
    // ═══════════════════════════════════════════════════════
    syncFromMemory() {
        const today = new Date().toISOString().split('T')[0];
        const todayFile = path.join(this.memoryDir, `${today}.md`);
        
        if (!fs.existsSync(todayFile)) return;
        
        const content = fs.readFileSync(todayFile, 'utf8');
        const tasks = this.extractTasksFromMarkdown(content);
        
        tasks.forEach(task => {
            this.addOrUpdateTask({
                id: `mem-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                title: task.title,
                agent: task.agent || 'henry',
                status: task.status || 'todo',
                source: 'memory',
                priority: task.priority || 'medium',
                created: new Date().toISOString(),
                updated: new Date().toISOString()
            });
        });
    }

    // ═══════════════════════════════════════════════════════
    // 2. SYNC DEPUIS LE PROJECT MANAGEMENT
    // ═══════════════════════════════════════════════════════
    syncFromProjectManagement() {
        // Sync daily notes
        const dailyDir = path.join(this.pmDir, 'daily');
        if (fs.existsSync(dailyDir)) {
            const files = fs.readdirSync(dailyDir).filter(f => f.endsWith('.md') && !f.includes('TEMPLATE'));
            files.forEach(file => {
                const content = fs.readFileSync(path.join(dailyDir, file), 'utf8');
                const date = file.replace('.md', '');
                this.extractTasksFromDaily(content, date);
            });
        }
        
        // Sync milestones
        const milestonesFile = path.join(this.pmDir, 'milestones/MILESTONES.md');
        if (fs.existsSync(milestonesFile)) {
            this.updateProjectProgress(milestonesFile);
        }
        
        // Sync issues
        const issuesFile = path.join(this.pmDir, 'risks/ISSUES.md');
        if (fs.existsSync(issuesFile)) {
            this.syncIssuesToTasks(issuesFile);
        }
    }

    // ═══════════════════════════════════════════════════════
    // 3. SYNC DEPUIS LES DAILY NOTES
    // ═══════════════════════════════════════════════════════
    syncFromDailyNotes() {
        const today = new Date().toISOString().split('T')[0];
        const dailyFile = path.join(this.pmDir, `daily/${today}.md`);
        
        if (!fs.existsSync(dailyFile)) return;
        
        const content = fs.readFileSync(dailyFile, 'utf8');
        
        // Extract "Objectifs Demain"
        const tomorrowMatch = content.match(/## 🎯 Objectifs Demain\n([\s\S]*?)(?=##|$)/);
        if (tomorrowMatch) {
            const tasks = tomorrowMatch[1]
                .split('\n')
                .filter(line => line.trim().startsWith('1.') || line.trim().startsWith('2.') || line.trim().startsWith('3.'))
                .map(line => line.replace(/^\d+\.\s*/, '').trim())
                .filter(line => line.length > 0);
            
            tasks.forEach((taskTitle, idx) => {
                this.addOrUpdateTask({
                    id: `daily-${today}-${idx}`,
                    title: taskTitle,
                    agent: 'junior',
                    status: 'todo',
                    source: 'daily-planning',
                    priority: 'high',
                    created: new Date().toISOString(),
                    updated: new Date().toISOString()
                });
            });
        }
    }

    // ═══════════════════════════════════════════════════════
    // EXTRACTEURS
    // ═══════════════════════════════════════════════════════
    extractTasksFromMarkdown(content) {
        const tasks = [];
        
        // Pattern: - [ ] ou - [x] pour tâches
        const taskPattern = /^\s*-\s*\[([ x])\]\s*(.+)$/gm;
        let match;
        
        while ((match = taskPattern.exec(content)) !== null) {
            const isDone = match[1] === 'x';
            const title = match[2].trim();
            
            // Détecte l'agent mentionné
            let agent = 'henry';
            if (title.toLowerCase().includes('aiman') || title.toLowerCase().includes('code') || title.toLowerCase().includes('dev')) {
                agent = 'aiman';
            } else if (title.toLowerCase().includes('junior') || title.toLowerCase().includes('pm') || title.toLowerCase().includes('doc')) {
                agent = 'junior';
            }
            
            tasks.push({
                title: title.replace(/@(henry|aiman|junior)\s*/i, ''),
                status: isDone ? 'done' : 'todo',
                agent: agent
            });
        }
        
        return tasks;
    }

    extractTasksFromDaily(content, date) {
        // Extract "En cours" et "Bloqué"
        const inProgressMatch = content.match(/### 🔨 En cours\n([\s\S]*?)(?=###|$)/);
        const blockedMatch = content.match(/### ⏸️ Bloqué\n([\s\S]*?)(?=###|$)/);
        
        if (inProgressMatch) {
            const tasks = this.extractTasksFromMarkdown(inProgressMatch[1]);
            tasks.forEach(task => {
                this.addOrUpdateTask({
                    id: `daily-${date}-${Buffer.from(task.title).toString('base64').substr(0, 8)}`,
                    title: task.title,
                    agent: task.agent,
                    status: 'progress',
                    source: 'daily-tracker',
                    priority: 'medium',
                    created: date,
                    updated: new Date().toISOString()
                });
            });
        }
    }

    updateProjectProgress(milestonesFile) {
        const content = fs.readFileSync(milestonesFile, 'utf8');
        
        // Count milestones by status
        const done = (content.match(/✅ Done/g) || []).length;
        const wip = (content.match(/🟡 In Progress/g) || []).length;
        const total = done + wip + (content.match(/🔴 Not Started/g) || []).length;
        
        const progress = total > 0 ? Math.round((done / total) * 100) : 0;
        
        // Update config
        const eqdomProject = this.config.projects.find(p => p.id === 'eqdom');
        if (eqdomProject) {
            eqdomProject.progress = progress;
            this.saveConfig();
        }
    }

    syncIssuesToTasks(issuesFile) {
        const content = fs.readFileSync(issuesFile, 'utf8');
        
        // Extract 🔴 Bloquant issues
        const criticalMatch = content.match(/## 🔴 Bloquant[\s\S]*?(?=## 🟡|$)/);
        if (criticalMatch) {
            const lines = criticalMatch[0].split('\n').filter(l => l.includes('|') && !l.includes('ID'));
            lines.forEach(line => {
                const parts = line.split('|').map(p => p.trim()).filter(p => p);
                if (parts.length >= 2) {
                    this.addOrUpdateTask({
                        id: `issue-${parts[0]}`,
                        title: parts[1],
                        agent: 'junior',
                        status: 'todo',
                        source: 'risk-register',
                        priority: 'critical',
                        created: new Date().toISOString(),
                        updated: new Date().toISOString()
                    });
                }
            });
        }
    }

    // ═══════════════════════════════════════════════════════
    // GESTION DES TÂCHES
    // ═══════════════════════════════════════════════════════
    addOrUpdateTask(newTask) {
        const tasks = this.loadTasks();
        const existingIndex = tasks.findIndex(t => t.title === newTask.title && t.agent === newTask.agent);
        
        if (existingIndex >= 0) {
            // Update existing
            tasks[existingIndex] = { ...tasks[existingIndex], ...newTask, updated: new Date().toISOString() };
        } else {
            // Add new
            tasks.push(newTask);
            this.addNotification('new_task', `Nouvelle tâche: ${newTask.title}`, newTask.agent);
        }
        
        this.saveTasks(tasks);
    }

    loadTasks() {
        if (!fs.existsSync(this.tasksFile)) return [];
        return JSON.parse(fs.readFileSync(this.tasksFile, 'utf8'));
    }

    saveTasks(tasks) {
        if (!fs.existsSync(this.dataDir)) fs.mkdirSync(this.dataDir, { recursive: true });
        fs.writeFileSync(this.tasksFile, JSON.stringify(tasks, null, 2));
    }

    saveConfig() {
        fs.writeFileSync(path.join(this.mcDir, 'config.json'), JSON.stringify(this.config, null, 2));
    }

    // ═══════════════════════════════════════════════════════
    // NOTIFICATIONS
    // ═══════════════════════════════════════════════════════
    checkNotifications() {
        const tasks = this.loadTasks();
        const now = new Date();
        
        tasks.forEach(task => {
            // Notif si tâche bloquée depuis +2 jours
            if (task.status === 'progress') {
                const updated = new Date(task.updated);
                const daysDiff = (now - updated) / (1000 * 60 * 60 * 24);
                
                if (daysDiff > 2) {
                    this.addNotification('blocked', `Tâche bloquée depuis ${Math.floor(daysDiff)} jours: ${task.title}`, task.agent);
                }
            }
            
            // Notif si nouvelle tâche critique
            if (task.priority === 'critical' && task.status === 'todo') {
                const created = new Date(task.created);
                const hoursDiff = (now - created) / (1000 * 60 * 60);
                
                if (hoursDiff < 1) { // Nouvelle (moins d'1h)
                    this.addNotification('critical', `🚨 Tâche critique: ${task.title}`, task.agent);
                }
            }
        });
    }

    addNotification(type, message, agent) {
        const notifications = this.loadNotifications();
        
        // Évite les doublons
        if (notifications.some(n => n.message === message && n.read === false)) return;
        
        notifications.push({
            id: Date.now().toString(),
            type,
            message,
            agent,
            timestamp: new Date().toISOString(),
            read: false
        });
        
        this.saveNotifications(notifications);
    }

    loadNotifications() {
        if (!fs.existsSync(this.notificationsFile)) return [];
        return JSON.parse(fs.readFileSync(this.notificationsFile, 'utf8'));
    }

    saveNotifications(notifications) {
        fs.writeFileSync(this.notificationsFile, JSON.stringify(notifications, null, 2));
    }

    // ═══════════════════════════════════════════════════════
    // TIMELINE / HISTORIQUE
    // ═══════════════════════════════════════════════════════
    addHistoryEvent(event) {
        const history = this.loadHistory();
        history.push({
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...event
        });
        
        // Garde seulement les 100 derniers événements
        if (history.length > 100) history.shift();
        
        fs.writeFileSync(this.historyFile, JSON.stringify(history, null, 2));
    }

    loadHistory() {
        if (!fs.existsSync(this.historyFile)) return [];
        return JSON.parse(fs.readFileSync(this.historyFile, 'utf8'));
    }

    updateTimestamps() {
        this.addHistoryEvent({
            type: 'sync',
            message: 'Mission Control synchronized',
            agent: 'system'
        });
    }

    // ═══════════════════════════════════════════════════════
    // API POUR LE DASHBOARD
    // ═══════════════════════════════════════════════════════
    getDashboardData() {
        return {
            agents: this.config.agents,
            projects: this.config.projects,
            tasks: this.loadTasks(),
            notifications: this.loadNotifications().filter(n => !n.read),
            history: this.loadHistory().slice(-20),
            lastSync: this.lastSync
        };
    }

    // ═══════════════════════════════════════════════════════
    // CRON - Auto-sync toutes les 5 minutes
    // ═══════════════════════════════════════════════════════
    startAutoSync(intervalMs = 300000) {
        console.log('🚀 Auto-sync started (every 5 min)');
        this.syncAll();
        
        setInterval(() => {
            this.syncAll();
        }, intervalMs);
    }
}

// Export pour utilisation
module.exports = MissionControlSync;

// Si exécuté directement
if (require.main === module) {
    const sync = new MissionControlSync();
    sync.syncAll();
    console.log(JSON.stringify(sync.getDashboardData(), null, 2));
}
