// 🌐 ENHANCED COMMUNITIES SYSTEM
// Live stats, trending indicators, join tracking, interactive features

class EnhancedCommunities {
  constructor() {
    this.communities = window.COMMUNITIES || [];
    this.userJoined = this.loadJoinedCommunities();
    this.init();
  }

  // Load joined communities from localStorage
  loadJoinedCommunities() {
    const saved = localStorage.getItem('joinedCommunities');
    return saved ? JSON.parse(saved) : [];
  }

  // Save joined communities
  saveJoinedCommunities() {
    localStorage.setItem('joinedCommunities', JSON.stringify(this.userJoined));
  }

  // Initialize enhanced communities
  init() {
    this.renderEnhancedCommunities();
    this.setupEventListeners();
  }

  // Get community stats (simulated for demo - can be replaced with real API)
  getCommunityStats(community) {
    // Simulate live stats based on community type and members
    const baseMembers = parseInt(community.members.replace(/[^0-9]/g, '')) || 1000;
    const multiplier = community.members.includes('M') ? 1000000 : 
                      community.members.includes('K') ? 1000 : 1;
    const totalMembers = baseMembers * multiplier;

    return {
      members: this.formatNumber(totalMembers),
      online: this.formatNumber(Math.floor(totalMembers * (Math.random() * 0.05 + 0.02))), // 2-7% online
      trending: Math.random() > 0.7, // 30% chance of trending
      activity: this.getActivityLevel(totalMembers),
      newPosts: Math.floor(Math.random() * 50) + 1,
      joined: this.userJoined.includes(community.url)
    };
  }

  // Format number with K/M suffix
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  // Get activity level
  getActivityLevel(members) {
    if (members > 500000) return 'Very High';
    if (members > 100000) return 'High';
    if (members > 10000) return 'Medium';
    return 'Low';
  }

  // Get category icon
  getCategoryIcon(category) {
    const icons = {
      reddit: '🔴',
      youtube: '📺',
      linkedin: '💼',
      discord: '💬',
      github: '💻',
      twitter: '🐦',
      telegram: '✈️'
    };
    return icons[category] || '🌐';
  }

  // Get activity color
  getActivityColor(activity) {
    const colors = {
      'Very High': '#00ff88',
      'High': '#0ff',
      'Medium': '#ff0',
      'Low': '#f80'
    };
    return colors[activity] || '#0f0';
  }

  // Render enhanced communities
  renderEnhancedCommunities() {
    const container = document.getElementById('communities-content');
    if (!container) return;

    // Group communities by category
    const grouped = this.communities.reduce((acc, community) => {
      if (!acc[community.category]) acc[community.category] = [];
      acc[community.category].push(community);
      return acc;
    }, {});

    // Render with enhanced UI
    container.innerHTML = `
      <div class="communities-enhanced">
        <div class="communities-header">
          <h3>🌐 Tech Communities Hub</h3>
          <div class="communities-stats">
            <span class="stat">
              <span class="stat-icon">👥</span>
              <span class="stat-value">${this.communities.length}</span>
              <span class="stat-label">Communities</span>
            </span>
            <span class="stat">
              <span class="stat-icon">✅</span>
              <span class="stat-value">${this.userJoined.length}</span>
              <span class="stat-label">Joined</span>
            </span>
            <span class="stat">
              <span class="stat-icon">🔥</span>
              <span class="stat-value">${this.getTrendingCount()}</span>
              <span class="stat-label">Trending</span>
            </span>
          </div>
        </div>

        ${Object.entries(grouped).map(([category, communities]) => `
          <div class="community-category">
            <div class="category-header">
              <h4>${this.getCategoryIcon(category)} ${category.toUpperCase()}</h4>
              <span class="category-count">${communities.length} communities</span>
            </div>
            <div class="communities-grid">
              ${communities.map(community => this.renderCommunityCard(community)).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Render individual community card
  renderCommunityCard(community) {
    const stats = this.getCommunityStats(community);
    const activityColor = this.getActivityColor(stats.activity);

    return `
      <div class="community-card ${stats.joined ? 'joined' : ''}" data-url="${community.url}">
        ${stats.trending ? '<div class="trending-badge">🔥 TRENDING</div>' : ''}
        
        <div class="community-card-header">
          <div class="community-icon">${this.getCategoryIcon(community.category)}</div>
          <div class="community-title">
            <h5>${community.name}</h5>
            <p class="community-desc">${community.description}</p>
          </div>
        </div>

        <div class="community-stats-grid">
          <div class="community-stat">
            <span class="stat-icon">👥</span>
            <span class="stat-value">${stats.members}</span>
            <span class="stat-label">Members</span>
          </div>
          <div class="community-stat">
            <span class="stat-icon">🟢</span>
            <span class="stat-value">${stats.online}</span>
            <span class="stat-label">Online</span>
          </div>
          <div class="community-stat">
            <span class="stat-icon">📊</span>
            <span class="stat-value" style="color: ${activityColor}">${stats.activity}</span>
            <span class="stat-label">Activity</span>
          </div>
          <div class="community-stat">
            <span class="stat-icon">📝</span>
            <span class="stat-value">${stats.newPosts}</span>
            <span class="stat-label">New Posts</span>
          </div>
        </div>

        <div class="community-actions">
          <button class="btn-join ${stats.joined ? 'joined' : ''}" onclick="enhancedCommunities.toggleJoin('${community.url}')">
            ${stats.joined ? '✓ Joined' : '+ Join'}
          </button>
          <a href="${community.url}" target="_blank" class="btn-visit" onclick="enhancedCommunities.trackVisit('${community.url}')">
            Visit →
          </a>
        </div>
      </div>
    `;
  }

  // Get trending count
  getTrendingCount() {
    return this.communities.filter(c => this.getCommunityStats(c).trending).length;
  }

  // Toggle join status
  toggleJoin(url) {
    const index = this.userJoined.indexOf(url);
    
    if (index > -1) {
      // Unjoin
      this.userJoined.splice(index, 1);
    } else {
      // Join
      this.userJoined.push(url);
      
      // Track in mission system
      if (window.missionSystem) {
        window.missionSystem.trackAction('community_join');
      }
    }

    this.saveJoinedCommunities();
    this.renderEnhancedCommunities();
  }

  // Track visit
  trackVisit(url) {
    // Track in mission system
    if (window.missionSystem) {
      window.missionSystem.trackAction('community_join');
    }

    // Add to joined if not already
    if (!this.userJoined.includes(url)) {
      this.userJoined.push(url);
      this.saveJoinedCommunities();
    }
  }

  // Setup event listeners
  setupEventListeners() {
    // Refresh stats every 30 seconds
    setInterval(() => {
      this.renderEnhancedCommunities();
    }, 30000);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.enhancedCommunities = new EnhancedCommunities();
  });
} else {
  window.enhancedCommunities = new EnhancedCommunities();
}
