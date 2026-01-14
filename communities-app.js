// 🌐 COMMUNITIES MODULE - TECH MASTERY LAB

// Initialize Communities
function initCommunities() {
  if (!window.communities) {
    console.error('Communities data not loaded');
    return;
  }
  
  displayCommunities('all');
}

// Display Communities
function displayCommunities(type = 'all') {
  const container = document.getElementById('communities-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  const communitiesData = window.communities;
  
  // Determine which communities to show
  let communitiesToShow = [];
  
  if (type === 'all') {
    // Show all communities from all platforms
    Object.keys(communitiesData).forEach(platform => {
      if (Array.isArray(communitiesData[platform])) {
        communitiesData[platform].forEach(community => {
          communitiesToShow.push({
            ...community,
            platform: platform
          });
        });
      }
    });
  } else {
    // Show specific platform
    if (communitiesData[type] && Array.isArray(communitiesData[type])) {
      communitiesData[type].forEach(community => {
        communitiesToShow.push({
          ...community,
          platform: type
        });
      });
    }
  }
  
  // Create sections by platform
  const platformGroups = {};
  communitiesToShow.forEach(community => {
    if (!platformGroups[community.platform]) {
      platformGroups[community.platform] = [];
    }
    platformGroups[community.platform].push(community);
  });
  
  // Render each platform section
  Object.keys(platformGroups).forEach(platform => {
    const section = document.createElement('div');
    section.className = 'community-section mb-lg';
    
    const platformIcon = getPlatformIcon(platform);
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
    
    section.innerHTML = `
      <h3 class="text-primary mb-md">${platformIcon} ${platformName} Communities (${platformGroups[platform].length})</h3>
      <div class="community-grid">
        ${platformGroups[platform].map(community => createCommunityCard(community, platform)).join('')}
      </div>
    `;
    
    container.appendChild(section);
  });
  
  // Update stats
  const totalCount = communitiesToShow.length;
  console.log(`Displaying ${totalCount} communities`);
}

// Create Community Card
function createCommunityCard(community, platform) {
  const topics = community.topics ? community.topics.slice(0, 3).join(', ') : 'Various Topics';
  const moreTopics = community.topics && community.topics.length > 3 ? ` +${community.topics.length - 3} more` : '';
  
  return `
    <div class="community-card">
      <div class="community-card__header">
        <h4 class="community-card__title">${sanitizeHTML(community.name)}</h4>
        <span class="community-card__badge">${community.members || 'New'}</span>
      </div>
      
      <p class="community-card__description">${sanitizeHTML(community.description)}</p>
      
      <div class="community-card__meta">
        <span class="community-card__language">🌐 ${community.language || 'English'}</span>
        ${community.active ? '<span class="community-card__status">● Active</span>' : ''}
      </div>
      
      <div class="community-card__topics">
        <strong>Topics:</strong> ${sanitizeHTML(topics)}${moreTopics}
      </div>
      
      ${community.note ? `<p class="community-card__note">ℹ️ ${sanitizeHTML(community.note)}</p>` : ''}
      
      <a href="${community.link}" target="_blank" rel="noopener noreferrer" class="btn btn--small btn--full">
        JOIN ${platform.toUpperCase()}
      </a>
    </div>
  `;
}

// Get Platform Icon
function getPlatformIcon(platform) {
  const icons = {
    discord: '💬',
    telegram: '✈️',
    whatsapp: '📱',
    linkedin: '💼',
    reddit: '🔴',
    youtube: '📺',
    github: '💻',
    forums: '📋'
  };
  return icons[platform] || '🌐';
}

// Filter Communities
function filterCommunities(type) {
  // Update active button
  document.querySelectorAll('#communities-panel .btn--small').forEach(btn => {
    btn.classList.remove('btn--active');
  });
  
  event.target.classList.add('btn--active');
  
  // Display filtered communities
  displayCommunities(type);
}

// Sanitize HTML
function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCommunities);
} else {
  initCommunities();
}

// Expose global functions
window.filterCommunities = filterCommunities;
window.displayCommunities = displayCommunities;
