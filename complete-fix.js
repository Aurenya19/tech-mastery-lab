// 🔧 COMPLETE FIX - All Issues Resolved
console.log('🔧 Complete Fix Loading...');

// ==================== FIX 1: MODAL SYSTEM ====================
// Ensure modal opens for news, research, etc.

window.openModal = function(type, data) {
  const modal = document.getElementById('detail-modal');
  const modalBody = document.getElementById('modal-body');
  
  if (!modal || !modalBody) {
    console.error('Modal elements not found');
    return;
  }
  
  // Set modal content based on type
  if (type === 'news') {
    // For Hacker News, most stories don't have text content
    // The main action is to read the article or view discussion
    const hasUrl = data.url && data.url.trim() !== '';
    const hasText = data.text && data.text.trim() !== '';
    
    modalBody.innerHTML = `
      <div class="modal-detail">
        <h2>${sanitizeHTML(data.title)}</h2>
        <div class="modal-detail__meta">
          <span class="tag">👤 ${sanitizeHTML(data.by || 'Unknown')}</span>
          <span class="tag">⭐ ${data.score || 0} points</span>
          <span class="tag">💬 ${data.descendants || 0} comments</span>
        </div>
        
        ${hasText ? `
          <div class="modal-detail__text">
            ${sanitizeHTML(data.text)}
          </div>
        ` : `
          <div class="modal-detail__info">
            <p>📰 This is a link post. Click "Read Full Article" below to view the complete content on the original website.</p>
            ${hasUrl ? `<p class="modal-detail__url">🔗 <strong>Source:</strong> ${sanitizeHTML(new URL(data.url).hostname)}</p>` : ''}
          </div>
        `}
        
        <div class="modal-detail__actions">
          ${hasUrl ? `
            <a href="${data.url}" target="_blank" class="btn btn--primary btn--large">
              📖 Read Full Article
            </a>
          ` : ''}
          <a href="https://news.ycombinator.com/item?id=${data.id}" target="_blank" class="btn ${hasUrl ? '' : 'btn--primary'}">
            💬 View Discussion (${data.descendants || 0} comments)
          </a>
        </div>
      </div>
    `;
  } else if (type === 'research') {
    modalBody.innerHTML = data.content || '<p>No content available</p>';
  } else if (type === 'github') {
    modalBody.innerHTML = `
      <div class="modal-detail">
        <h2>${sanitizeHTML(data.name)}</h2>
        <div class="modal-detail__meta">
          <span class="tag">⭐ ${formatNumber(data.stars)} stars</span>
          <span class="tag">🔱 ${formatNumber(data.forks)} forks</span>
          ${data.language ? `<span class="tag">💻 ${sanitizeHTML(data.language)}</span>` : ''}
        </div>
        <div class="modal-detail__text">
          ${sanitizeHTML(data.description || 'No description available.')}
        </div>
        <div class="modal-detail__actions">
          <a href="${data.url}" target="_blank" class="btn btn--primary">🔗 View on GitHub</a>
        </div>
      </div>
    `;
  }
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
  const modal = document.getElementById('detail-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

// Close modal on outside click
window.addEventListener('click', function(event) {
  const modal = document.getElementById('detail-modal');
  if (event.target === modal) {
    closeModal();
  }
});

// ==================== FIX 2: NEWS DISPLAY WITH CLICK ====================
window.displayNews = function() {
  const list = document.getElementById('news-list');
  if (!list) return;
  
  if (!AppState.allNews || AppState.allNews.length === 0) {
    list.innerHTML = '<div class="loading">Loading Hacker News...</div>';
    return;
  }
  
  list.innerHTML = AppState.allNews.map((story, idx) => `
    <div class="item item--clickable" onclick="openNewsDetail(${idx})">
      <h3 class="item__title">${sanitizeHTML(story.title)}</h3>
      <div class="item__meta">
        <span class="tag">👤 ${sanitizeHTML(story.by || 'Unknown')}</span>
        <span class="tag">⭐ ${story.score || 0}</span>
        <span class="tag">💬 ${story.descendants || 0}</span>
      </div>
      <div class="timestamp">${formatTime(story.time * 1000)}</div>
      <div class="click-hint">Click to read article 📖</div>
    </div>
  `).join('');
};

window.openNewsDetail = function(idx) {
  const story = AppState.allNews[idx];
  if (!story) return;
  
  openModal('news', story);
};

// ==================== FIX 3: RESEARCH DISPLAY WITH CLICK ====================
window.displayResearch = function() {
  const list = document.getElementById('research-list');
  if (!list) return;
  
  // Use RESEARCH_PAPERS from research-papers.js
  if (window.RESEARCH_PAPERS && window.RESEARCH_PAPERS.length > 0) {
    AppState.allResearch = window.RESEARCH_PAPERS;
  }
  
  if (!AppState.allResearch || AppState.allResearch.length === 0) {
    list.innerHTML = '<div class="loading">Loading research papers...</div>';
    return;
  }
  
  list.innerHTML = AppState.allResearch.map((paper, idx) => `
    <div class="item item--clickable" onclick="openResearchDetail(${idx})">
      <h3 class="item__title">${sanitizeHTML(paper.title)}</h3>
      <p class="item__description">${sanitizeHTML(paper.summary?.substring(0, 200) || paper.description?.substring(0, 200) || '')}...</p>
      <div class="item__meta">
        <span class="tag">👥 ${paper.authors?.join(', ').substring(0, 50) || 'Unknown'}</span>
        ${paper.year ? `<span class="tag">📅 ${paper.year}</span>` : ''}
      </div>
      <div class="click-hint">Click for full abstract 📖</div>
    </div>
  `).join('');
  
  updateCount('research-count', AppState.allResearch.length);
};

window.openResearchDetail = function(idx) {
  const paper = AppState.allResearch[idx];
  if (!paper) return;
  
  openModal('research', {
    content: `
      <div class="modal-detail">
        <h2>${sanitizeHTML(paper.title)}</h2>
        <div class="modal-detail__meta">
          ${paper.year ? `<span class="tag">📅 ${paper.year}</span>` : ''}
          <span class="tag">👥 ${paper.authors?.length || 0} authors</span>
        </div>
        
        <div class="modal-detail__authors">
          <strong>Authors:</strong> ${paper.authors?.map(a => sanitizeHTML(a)).join(', ') || 'Unknown'}
        </div>
        
        <div class="modal-detail__text">
          <strong>Abstract:</strong><br>
          ${sanitizeHTML(paper.summary || paper.description || 'No abstract available.')}
        </div>
        
        ${paper.arxiv ? `
          <div class="modal-detail__actions">
            <a href="${paper.arxiv}" target="_blank" class="btn btn--primary">📄 Read Full Paper on arXiv</a>
          </div>
        ` : ''}
      </div>
    `
  });
};

// ==================== FIX 4: GITHUB DISPLAY WITH CLICK ====================
window.displayGitHub = function() {
  const list = document.getElementById('github-list');
  if (!list) return;
  
  if (!AppState.allGitHub || AppState.allGitHub.length === 0) {
    list.innerHTML = '<div class="loading">Loading GitHub trending...</div>';
    return;
  }
  
  list.innerHTML = AppState.allGitHub.map((repo, idx) => `
    <div class="item item--clickable" onclick="openGitHubDetail(${idx})">
      <h3 class="item__title">${sanitizeHTML(repo.name)}</h3>
      <p class="item__description">${sanitizeHTML(repo.description || 'No description')}</p>
      <div class="item__meta">
        <span class="tag">⭐ ${formatNumber(repo.stars)}</span>
        <span class="tag">🔱 ${formatNumber(repo.forks)}</span>
        ${repo.language ? `<span class="tag">💻 ${sanitizeHTML(repo.language)}</span>` : ''}
      </div>
      <div class="click-hint">Click for details 🔗</div>
    </div>
  `).join('');
};

window.openGitHubDetail = function(idx) {
  const repo = AppState.allGitHub[idx];
  if (!repo) return;
  
  openModal('github', repo);
};

// ==================== FIX 5: REDDIT DISPLAY ====================
window.displayReddit = function() {
  const list = document.getElementById('reddit-list');
  if (!list) return;
  
  if (!AppState.allReddit || AppState.allReddit.length === 0) {
    list.innerHTML = '<div class="loading">Loading Reddit posts...</div>';
    return;
  }
  
  list.innerHTML = AppState.allReddit.map(post => `
    <div class="item item--clickable" onclick="window.open('https://reddit.com${post.permalink}', '_blank')">
      <h3 class="item__title">${sanitizeHTML(post.title)}</h3>
      <div class="item__meta">
        <span class="tag">🔴 r/${sanitizeHTML(post.subreddit)}</span>
        <span class="tag">👍 ${formatNumber(post.ups)}</span>
        <span class="tag">💬 ${post.num_comments}</span>
      </div>
      <div class="timestamp">by u/${sanitizeHTML(post.author)} • ${formatTime(post.created_utc * 1000)}</div>
      <div class="click-hint">Click to view on Reddit 🔗</div>
    </div>
  `).join('');
};

// ==================== FIX 6: COMMUNITIES DISPLAY ====================
function initCommunities() {
  console.log('🌐 Initializing communities...');
  
  const content = document.getElementById('communities-content');
  if (!content) {
    console.error('Communities content not found');
    return;
  }
  
  // Check if COMMUNITIES data exists
  if (!window.COMMUNITIES || window.COMMUNITIES.length === 0) {
    content.innerHTML = '<div class="loading">No communities data available</div>';
    return;
  }
  
  // Create categories
  const categories = [...new Set(window.COMMUNITIES.map(c => c.category))];
  
  let html = '<div class="communities-grid">';
  
  categories.forEach(category => {
    const communitiesInCategory = window.COMMUNITIES.filter(c => c.category === category);
    
    html += `
      <div class="community-category">
        <h3 class="community-category__title">${category}</h3>
        <div class="community-cards">
    `;
    
    communitiesInCategory.forEach(community => {
      const joined = localStorage.getItem(`community_${community.name}`) === 'true';
      
      html += `
        <div class="community-card ${community.trending ? 'community-card--trending' : ''}">
          <div class="community-card__header">
            <h4 class="community-card__name">${sanitizeHTML(community.name)}</h4>
            ${community.trending ? '<span class="badge badge--trending">🔥 Trending</span>' : ''}
          </div>
          <p class="community-card__description">${sanitizeHTML(community.description)}</p>
          <div class="community-card__meta">
            <span class="tag">👥 ${community.members}</span>
            <span class="tag">📚 ${category}</span>
          </div>
          <div class="community-card__actions">
            <button class="btn btn--small ${joined ? 'btn--secondary' : 'btn--primary'}" 
                    onclick="toggleCommunity('${community.name}', this)">
              ${joined ? '✓ Joined' : '+ Join'}
            </button>
            <a href="${community.url}" target="_blank" class="btn btn--small">Visit 🔗</a>
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  
  content.innerHTML = html;
  updateCount('communities-count', window.COMMUNITIES.length);
  
  console.log(`✅ Loaded ${window.COMMUNITIES.length} communities`);
}

window.toggleCommunity = function(name, button) {
  const joined = localStorage.getItem(`community_${name}`) === 'true';
  
  if (joined) {
    localStorage.removeItem(`community_${name}`);
    button.textContent = '+ Join';
    button.classList.remove('btn--secondary');
    button.classList.add('btn--primary');
  } else {
    localStorage.setItem(`community_${name}`, 'true');
    button.textContent = '✓ Joined';
    button.classList.remove('btn--primary');
    button.classList.add('btn--secondary');
    
    // Award XP
    if (window.MissionSystem) {
      window.MissionSystem.addXP(10, 'Joined community');
    }
  }
};

// ==================== FIX 7: QUIZ SYSTEM ====================
window.startQuiz = function(mode) {
  console.log(`🧠 Starting quiz in ${mode} mode...`);
  
  if (!window.QUIZ_QUESTIONS || window.QUIZ_QUESTIONS.length === 0) {
    alert('Quiz questions not loaded!');
    return;
  }
  
  AppState.quizMode = mode;
  
  // Filter by selected category
  let questions = window.QUIZ_QUESTIONS;
  if (AppState.selectedCategory && AppState.selectedCategory !== 'all') {
    questions = questions.filter(q => q.category === AppState.selectedCategory);
  }
  
  // Shuffle and select questions based on mode
  questions = shuffleArray([...questions]);
  
  switch(mode) {
    case 'quick':
      AppState.currentQuiz = questions.slice(0, 10);
      break;
    case 'timed':
      AppState.currentQuiz = questions.slice(0, 20);
      AppState.quizTimeLeft = 600; // 10 minutes
      startQuizTimer();
      break;
    case 'practice':
      AppState.currentQuiz = questions.slice(0, 50);
      break;
  }
  
  AppState.currentQuestionIndex = 0;
  AppState.quizScore = 0;
  
  displayQuizQuestion();
};

function displayQuizQuestion() {
  const content = document.getElementById('quiz-content');
  if (!content) return;
  
  const question = AppState.currentQuiz[AppState.currentQuestionIndex];
  if (!question) {
    endQuiz();
    return;
  }
  
  content.innerHTML = `
    <div class="quiz-question">
      <div class="quiz-progress">
        Question ${AppState.currentQuestionIndex + 1} of ${AppState.currentQuiz.length}
      </div>
      
      <h3 class="quiz-question__text">${sanitizeHTML(question.question)}</h3>
      
      <div class="quiz-options">
        ${question.options.map((option, idx) => `
          <button class="quiz-option" onclick="selectQuizAnswer(${idx})">
            ${String.fromCharCode(65 + idx)}. ${sanitizeHTML(option)}
          </button>
        `).join('')}
      </div>
      
      <div class="quiz-meta">
        <span class="tag">📚 ${question.category}</span>
        <span class="tag">⚡ ${question.difficulty}</span>
      </div>
    </div>
  `;
  
  document.getElementById('quiz-score').textContent = AppState.quizScore;
}

window.selectQuizAnswer = function(answerIdx) {
  const question = AppState.currentQuiz[AppState.currentQuestionIndex];
  
  if (answerIdx === question.correct) {
    AppState.quizScore++;
    showFeedback('✅ Correct!', 'success');
  } else {
    showFeedback(`❌ Wrong! Correct answer: ${question.options[question.correct]}`, 'error');
  }
  
  setTimeout(() => {
    AppState.currentQuestionIndex++;
    displayQuizQuestion();
  }, 1500);
};

function endQuiz() {
  const content = document.getElementById('quiz-content');
  const percentage = Math.round((AppState.quizScore / AppState.currentQuiz.length) * 100);
  
  let xpReward = 0;
  switch(AppState.quizMode) {
    case 'quick': xpReward = 50; break;
    case 'timed': xpReward = 100; break;
    case 'practice': xpReward = 200; break;
  }
  
  if (window.MissionSystem) {
    window.MissionSystem.addXP(xpReward, `Completed ${AppState.quizMode} quiz`);
  }
  
  content.innerHTML = `
    <div class="quiz-results">
      <h2>🎉 Quiz Complete!</h2>
      <div class="quiz-results__score">
        <div class="score-big">${AppState.quizScore} / ${AppState.currentQuiz.length}</div>
        <div class="score-percentage">${percentage}%</div>
      </div>
      <div class="quiz-results__xp">
        +${xpReward} XP Earned! 🏆
      </div>
      <button class="btn btn--primary" onclick="location.reload()">Take Another Quiz</button>
    </div>
  `;
  
  if (AppState.quizTimer) {
    clearInterval(AppState.quizTimer);
  }
}

function startQuizTimer() {
  const display = document.getElementById('quiz-timer-display');
  if (display) display.style.display = 'block';
  
  AppState.quizTimer = setInterval(() => {
    AppState.quizTimeLeft--;
    
    const minutes = Math.floor(AppState.quizTimeLeft / 60);
    const seconds = AppState.quizTimeLeft % 60;
    
    const timerEl = document.getElementById('quiz-timer');
    if (timerEl) {
      timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    if (AppState.quizTimeLeft <= 0) {
      clearInterval(AppState.quizTimer);
      endQuiz();
    }
  }, 1000);
}

window.selectQuizCategory = function(category, button) {
  AppState.selectedCategory = category;
  
  // Update button states
  document.querySelectorAll('.quiz-categories .btn').forEach(btn => {
    btn.classList.remove('btn--active');
  });
  button.classList.add('btn--active');
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showFeedback(message, type) {
  const feedback = document.createElement('div');
  feedback.className = `feedback feedback--${type}`;
  feedback.textContent = message;
  feedback.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(feedback);
  
  setTimeout(() => {
    feedback.remove();
  }, 1500);
}

// ==================== FIX 8: REMOVE INDIAN LABS MAP ====================
function hideIndianLabsMap() {
  const panel = document.getElementById('indian-labs-panel');
  if (panel) {
    panel.style.display = 'none';
    console.log('✅ Indian labs map hidden');
  }
}

// ==================== HELPER FUNCTIONS ====================
function sanitizeHTML(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatNumber(num) {
  if (!num) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function formatTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function updateCount(id, count) {
  const el = document.getElementById(id);
  if (el) el.textContent = count;
}

// ==================== INITIALIZATION ====================
function initCompleteFixSystem() {
  console.log('🔧 Initializing Complete Fix System...');
  
  // Wait for DOM and AppState
  if (document.readyState === 'loading' || typeof AppState === 'undefined') {
    setTimeout(initCompleteFixSystem, 500);
    return;
  }
  
  // Hide Indian labs map
  hideIndianLabsMap();
  
  // Initialize communities
  setTimeout(initCommunities, 1000);
  
  // Ensure research papers are loaded
  if (window.RESEARCH_PAPERS) {
    AppState.allResearch = window.RESEARCH_PAPERS;
    displayResearch();
  }
  
  console.log('✅ Complete Fix System Ready!');
}

// Start initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCompleteFixSystem);
} else {
  initCompleteFixSystem();
}

console.log('✅ Complete Fix Loaded!');
