// 🎯 MISSION SYSTEM - GAMIFICATION ENGINE
// Transforms Tech Mastery Lab into an engaging mission-based experience

class MissionSystem {
  constructor() {
    this.userData = this.loadUserData();
    this.achievements = this.initAchievements();
    this.dailyMissions = this.generateDailyMissions();
    this.init();
  }

  // Initialize user data
  loadUserData() {
    const defaultData = {
      xp: 0,
      level: 1,
      streak: 0,
      lastVisit: null,
      achievements: [],
      completedMissions: [],
      stats: {
        newsRead: 0,
        papersRead: 0,
        quizzesTaken: 0,
        quizScore: 0,
        communitiesJoined: 0,
        chatMessages: 0,
        daysActive: 0
      }
    };

    const saved = localStorage.getItem('techMasteryUserData');
    return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
  }

  // Save user data
  saveUserData() {
    localStorage.setItem('techMasteryUserData', JSON.stringify(this.userData));
  }

  // Initialize achievements
  initAchievements() {
    return [
      // Beginner Achievements
      { id: 'first_visit', name: '🎯 First Mission', desc: 'Visit Tech Mastery Lab', xp: 10, unlocked: false },
      { id: 'first_news', name: '📰 News Hunter', desc: 'Read your first news article', xp: 20, unlocked: false },
      { id: 'first_paper', name: '🔬 Research Rookie', desc: 'Read your first research paper', xp: 30, unlocked: false },
      { id: 'first_quiz', name: '🧠 Quiz Starter', desc: 'Complete your first quiz', xp: 50, unlocked: false },
      { id: 'first_community', name: '🌐 Community Explorer', desc: 'Join your first community', xp: 25, unlocked: false },
      
      // Intermediate Achievements
      { id: 'news_10', name: '📰 News Addict', desc: 'Read 10 news articles', xp: 100, unlocked: false },
      { id: 'papers_5', name: '🔬 Research Scholar', desc: 'Read 5 research papers', xp: 150, unlocked: false },
      { id: 'quiz_5', name: '🧠 Quiz Master', desc: 'Complete 5 quizzes', xp: 200, unlocked: false },
      { id: 'communities_5', name: '🌐 Community Leader', desc: 'Join 5 communities', xp: 125, unlocked: false },
      { id: 'chat_50', name: '💬 Chatty Cathy', desc: 'Send 50 chat messages', xp: 100, unlocked: false },
      
      // Advanced Achievements
      { id: 'streak_7', name: '🔥 Week Warrior', desc: '7-day login streak', xp: 300, unlocked: false },
      { id: 'streak_30', name: '🔥 Month Master', desc: '30-day login streak', xp: 1000, unlocked: false },
      { id: 'quiz_perfect', name: '💯 Perfect Score', desc: 'Get 100% on a quiz', xp: 500, unlocked: false },
      { id: 'level_10', name: '⭐ Level 10 Legend', desc: 'Reach level 10', xp: 1000, unlocked: false },
      { id: 'all_categories', name: '🎓 Category Conqueror', desc: 'Complete quiz in all categories', xp: 750, unlocked: false },
      
      // Expert Achievements
      { id: 'news_100', name: '📰 News Guru', desc: 'Read 100 news articles', xp: 1500, unlocked: false },
      { id: 'papers_50', name: '🔬 Research Professor', desc: 'Read 50 research papers', xp: 2000, unlocked: false },
      { id: 'quiz_50', name: '🧠 Quiz Legend', desc: 'Complete 50 quizzes', xp: 2500, unlocked: false },
      { id: 'communities_all', name: '🌐 Community Champion', desc: 'Join all 40+ communities', xp: 3000, unlocked: false },
      { id: 'streak_365', name: '🔥 Year Warrior', desc: '365-day login streak', xp: 10000, unlocked: false }
    ];
  }

  // Generate daily missions
  generateDailyMissions() {
    const today = new Date().toDateString();
    const savedMissions = localStorage.getItem('dailyMissions');
    const savedDate = localStorage.getItem('dailyMissionsDate');

    if (savedMissions && savedDate === today) {
      return JSON.parse(savedMissions);
    }

    // Generate new missions for today
    const missions = [
      { id: 'daily_news', name: '📰 Read 3 News Articles', progress: 0, target: 3, xp: 50, completed: false },
      { id: 'daily_paper', name: '🔬 Read 1 Research Paper', progress: 0, target: 1, xp: 75, completed: false },
      { id: 'daily_quiz', name: '🧠 Complete 1 Quiz', progress: 0, target: 1, xp: 100, completed: false },
      { id: 'daily_chat', name: '💬 Send 10 Chat Messages', progress: 0, target: 10, xp: 40, completed: false },
      { id: 'daily_community', name: '🌐 Visit 2 Communities', progress: 0, target: 2, xp: 60, completed: false }
    ];

    localStorage.setItem('dailyMissions', JSON.stringify(missions));
    localStorage.setItem('dailyMissionsDate', today);
    return missions;
  }

  // Initialize system
  init() {
    this.checkStreak();
    this.updateLevel();
    this.renderMissionDashboard();
    this.setupEventListeners();
  }

  // Check and update streak
  checkStreak() {
    const today = new Date().toDateString();
    const lastVisit = this.userData.lastVisit;

    if (!lastVisit) {
      // First visit
      this.userData.streak = 1;
      this.userData.stats.daysActive = 1;
      this.unlockAchievement('first_visit');
    } else {
      const lastDate = new Date(lastVisit);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Consecutive day
        this.userData.streak++;
        this.userData.stats.daysActive++;
        this.checkStreakAchievements();
      } else if (diffDays > 1) {
        // Streak broken
        this.userData.streak = 1;
        this.userData.stats.daysActive++;
      }
      // Same day - no change
    }

    this.userData.lastVisit = today;
    this.saveUserData();
  }

  // Check streak achievements
  checkStreakAchievements() {
    if (this.userData.streak >= 7) this.unlockAchievement('streak_7');
    if (this.userData.streak >= 30) this.unlockAchievement('streak_30');
    if (this.userData.streak >= 365) this.unlockAchievement('streak_365');
  }

  // Update level based on XP
  updateLevel() {
    const xpPerLevel = 500;
    const newLevel = Math.floor(this.userData.xp / xpPerLevel) + 1;
    
    if (newLevel > this.userData.level) {
      this.userData.level = newLevel;
      this.showLevelUp(newLevel);
      
      if (newLevel >= 10) this.unlockAchievement('level_10');
    }
  }

  // Add XP
  addXP(amount, reason) {
    this.userData.xp += amount;
    this.updateLevel();
    this.saveUserData();
    this.showXPGain(amount, reason);
    this.renderMissionDashboard();
  }

  // Unlock achievement
  unlockAchievement(achievementId) {
    if (this.userData.achievements.includes(achievementId)) return;

    const achievement = this.achievements.find(a => a.id === achievementId);
    if (!achievement) return;

    this.userData.achievements.push(achievementId);
    achievement.unlocked = true;
    this.addXP(achievement.xp, `Achievement: ${achievement.name}`);
    this.showAchievementUnlock(achievement);
  }

  // Track action
  trackAction(action, data = {}) {
    switch(action) {
      case 'news_read':
        this.userData.stats.newsRead++;
        this.updateDailyMission('daily_news', 1);
        if (this.userData.stats.newsRead === 1) this.unlockAchievement('first_news');
        if (this.userData.stats.newsRead === 10) this.unlockAchievement('news_10');
        if (this.userData.stats.newsRead === 100) this.unlockAchievement('news_100');
        this.addXP(5, 'Read news article');
        break;

      case 'paper_read':
        this.userData.stats.papersRead++;
        this.updateDailyMission('daily_paper', 1);
        if (this.userData.stats.papersRead === 1) this.unlockAchievement('first_paper');
        if (this.userData.stats.papersRead === 5) this.unlockAchievement('papers_5');
        if (this.userData.stats.papersRead === 50) this.unlockAchievement('papers_50');
        this.addXP(10, 'Read research paper');
        break;

      case 'quiz_complete':
        this.userData.stats.quizzesTaken++;
        this.userData.stats.quizScore += data.score || 0;
        this.updateDailyMission('daily_quiz', 1);
        if (this.userData.stats.quizzesTaken === 1) this.unlockAchievement('first_quiz');
        if (this.userData.stats.quizzesTaken === 5) this.unlockAchievement('quiz_5');
        if (this.userData.stats.quizzesTaken === 50) this.unlockAchievement('quiz_50');
        if (data.score === 100) this.unlockAchievement('quiz_perfect');
        this.addXP(data.score || 50, 'Completed quiz');
        break;

      case 'community_join':
        this.userData.stats.communitiesJoined++;
        this.updateDailyMission('daily_community', 1);
        if (this.userData.stats.communitiesJoined === 1) this.unlockAchievement('first_community');
        if (this.userData.stats.communitiesJoined === 5) this.unlockAchievement('communities_5');
        if (this.userData.stats.communitiesJoined >= 40) this.unlockAchievement('communities_all');
        this.addXP(15, 'Joined community');
        break;

      case 'chat_message':
        this.userData.stats.chatMessages++;
        this.updateDailyMission('daily_chat', 1);
        if (this.userData.stats.chatMessages === 50) this.unlockAchievement('chat_50');
        this.addXP(2, 'Sent chat message');
        break;
    }

    this.saveUserData();
    this.renderMissionDashboard();
  }

  // Update daily mission progress
  updateDailyMission(missionId, progress) {
    const mission = this.dailyMissions.find(m => m.id === missionId);
    if (!mission || mission.completed) return;

    mission.progress += progress;
    if (mission.progress >= mission.target) {
      mission.progress = mission.target;
      mission.completed = true;
      this.addXP(mission.xp, `Daily Mission: ${mission.name}`);
      this.showMissionComplete(mission);
    }

    localStorage.setItem('dailyMissions', JSON.stringify(this.dailyMissions));
  }

  // Render mission dashboard
  renderMissionDashboard() {
    const dashboard = document.getElementById('mission-dashboard');
    if (!dashboard) return;

    const xpToNextLevel = ((this.userData.level) * 500) - this.userData.xp;
    const levelProgress = ((this.userData.xp % 500) / 500) * 100;

    dashboard.innerHTML = `
      <div class="mission-header">
        <div class="mission-title">
          <h2>🎯 MISSION CONTROL</h2>
          <p class="mission-subtitle">Your Tech Mastery Journey</p>
        </div>
        <div class="mission-stats-grid">
          <div class="mission-stat">
            <span class="stat-value">Level ${this.userData.level}</span>
            <span class="stat-label">Current Level</span>
          </div>
          <div class="mission-stat">
            <span class="stat-value">${this.userData.xp.toLocaleString()} XP</span>
            <span class="stat-label">Total Experience</span>
          </div>
          <div class="mission-stat">
            <span class="stat-value">${this.userData.streak} Days</span>
            <span class="stat-label">Current Streak 🔥</span>
          </div>
          <div class="mission-stat">
            <span class="stat-value">${this.userData.achievements.length}/${this.achievements.length}</span>
            <span class="stat-label">Achievements</span>
          </div>
        </div>
      </div>

      <div class="level-progress">
        <div class="progress-header">
          <span>Level ${this.userData.level}</span>
          <span>${xpToNextLevel} XP to Level ${this.userData.level + 1}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${levelProgress}%"></div>
        </div>
      </div>

      <div class="daily-missions">
        <h3>📋 Daily Missions</h3>
        <div class="missions-list">
          ${this.dailyMissions.map(mission => `
            <div class="mission-item ${mission.completed ? 'completed' : ''}">
              <div class="mission-info">
                <span class="mission-name">${mission.name}</span>
                <span class="mission-progress">${mission.progress}/${mission.target}</span>
              </div>
              <div class="mission-reward">+${mission.xp} XP</div>
              <div class="mission-progress-bar">
                <div class="mission-progress-fill" style="width: ${(mission.progress / mission.target) * 100}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="achievements-section">
        <h3>🏆 Recent Achievements</h3>
        <div class="achievements-grid">
          ${this.achievements.filter(a => a.unlocked).slice(-6).reverse().map(achievement => `
            <div class="achievement-card unlocked">
              <div class="achievement-icon">${achievement.name.split(' ')[0]}</div>
              <div class="achievement-details">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.desc}</div>
                <div class="achievement-xp">+${achievement.xp} XP</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Show XP gain animation
  showXPGain(amount, reason) {
    const notification = document.createElement('div');
    notification.className = 'xp-notification';
    notification.innerHTML = `
      <div class="xp-amount">+${amount} XP</div>
      <div class="xp-reason">${reason}</div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Show level up animation
  showLevelUp(level) {
    const modal = document.createElement('div');
    modal.className = 'level-up-modal';
    modal.innerHTML = `
      <div class="level-up-content">
        <div class="level-up-icon">⭐</div>
        <h2>LEVEL UP!</h2>
        <div class="level-up-number">Level ${level}</div>
        <p>You've reached a new level of mastery!</p>
        <button onclick="this.closest('.level-up-modal').remove()">Continue</button>
      </div>
    `;
    document.body.appendChild(modal);

    setTimeout(() => modal.classList.add('show'), 10);
  }

  // Show achievement unlock
  showAchievementUnlock(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-unlock-icon">🏆</div>
      <div class="achievement-unlock-details">
        <div class="achievement-unlock-title">Achievement Unlocked!</div>
        <div class="achievement-unlock-name">${achievement.name}</div>
        <div class="achievement-unlock-xp">+${achievement.xp} XP</div>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // Show mission complete
  showMissionComplete(mission) {
    const notification = document.createElement('div');
    notification.className = 'mission-notification';
    notification.innerHTML = `
      <div class="mission-complete-icon">✅</div>
      <div class="mission-complete-details">
        <div class="mission-complete-title">Mission Complete!</div>
        <div class="mission-complete-name">${mission.name}</div>
        <div class="mission-complete-xp">+${mission.xp} XP</div>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // Setup event listeners
  setupEventListeners() {
    // Track news clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('.news-item')) {
        this.trackAction('news_read');
      }
      if (e.target.closest('.research-item')) {
        this.trackAction('paper_read');
      }
      if (e.target.closest('.community-link')) {
        this.trackAction('community_join');
      }
    });

    // Track quiz completion
    window.addEventListener('quizComplete', (e) => {
      this.trackAction('quiz_complete', { score: e.detail.score });
    });

    // Track chat messages
    window.addEventListener('chatMessage', () => {
      this.trackAction('chat_message');
    });
  }
}

// Initialize mission system when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.missionSystem = new MissionSystem();
  });
} else {
  window.missionSystem = new MissionSystem();
}
