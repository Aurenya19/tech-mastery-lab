// 🇮🇳 TECH MASTERY LAB - OPTIMIZED SYSTEM
'use strict';

// ==================== STATE MANAGEMENT ====================
const AppState = {
  // Data
  allNews: [],
  allReddit: [],
  allGitHub: [],
  allResearch: [],
  
  // Maps
  map: null,
  indianLabsMap: null,
  markers: [],
  indianMarkers: [],
  markerCluster: null,
  indianMarkerCluster: null,
  allLocations: [],
  
  // Pagination
  newsPage: 1,
  isLoading: false,
  
  // Chat
  currentRoom: 'general',
  currentUser: null,
  chatMessages: {},
  
  // Quiz
  quizQuestions: [],
  currentQuiz: [],
  currentQuestionIndex: 0,
  quizScore: 0,
  quizTimer: null,
  quizTimeLeft: 0,
  selectedCategory: 'all',
  quizMode: null
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  try {
    initMatrix();
    initMaps();
    loadAllData();
    initChat();
    initQuiz();
    initIndianLabs();
    setupEventListeners();
  } catch (error) {
    console.error('Initialization error:', error);
    showError('Failed to initialize application. Please refresh the page.');
  }
});

// ==================== MATRIX BACKGROUND ====================
function initMatrix() {
  const canvas = document.getElementById('matrix');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const chars = '01';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);
  
  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  setInterval(draw, 33);
  
  // Resize handler
  window.addEventListener('resize', debounce(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, 250));
}

// ==================== CHAT SYSTEM ====================
function initChat() {
  // Initialize chat rooms
  AppState.chatMessages = {
    general: [{ user: 'System', text: 'Welcome to General Tech Talk! 💬', time: Date.now(), system: true }],
    ai: [{ user: 'System', text: 'Welcome to AI/ML Discussion! 🤖', time: Date.now(), system: true }],
    space: [{ user: 'System', text: 'Welcome to Space & ISRO! 🚀', time: Date.now(), system: true }],
    coding: [{ user: 'System', text: 'Welcome to Coding Help! 💻', time: Date.now(), system: true }],
    career: [{ user: 'System', text: 'Welcome to Career Guidance! 🎓', time: Date.now(), system: true }],
    india: [{ user: 'System', text: 'Welcome to Indian Tech Scene! 🇮🇳', time: Date.now(), system: true }],
    quiz: [{ user: 'System', text: 'Welcome to Quiz Arena! 🎮', time: Date.now(), system: true }],
    research: [{ user: 'System', text: 'Welcome to Research Papers! 🔬', time: Date.now(), system: true }]
  };
  
  // Setup room switching - FIXED SELECTOR
  document.querySelectorAll('.chat-room-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chat-room-btn').forEach(b => b.classList.remove('chat-room-btn--active'));
      btn.classList.add('chat-room-btn--active');
      AppState.currentRoom = btn.dataset.room;
      updateChatRoomTitle();
      displayChatMessages();
    });
  });
  
  // Setup enter key for chat input
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
  
  const nicknameInput = document.getElementById('chat-nickname');
  if (nicknameInput) {
    nicknameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') setNickname();
    });
  }
}

function updateChatRoomTitle() {
  const roomTitles = {
    general: 'General Tech Talk',
    ai: 'AI/ML Discussion',
    space: 'Space & ISRO',
    coding: 'Coding Help',
    career: 'Career Guidance',
    india: 'Indian Tech Scene',
    quiz: 'Quiz Arena',
    research: 'Research Papers'
  };
  
  const titleEl = document.getElementById('current-room');
  if (titleEl) {
    titleEl.textContent = roomTitles[AppState.currentRoom] || 'Chat Room';
  }
}

function setNickname() {
  const input = document.getElementById('chat-nickname');
  const nickname = input.value.trim();
  
  if (!nickname) {
    showError('Please enter a nickname!');
    return;
  }
  
  if (nickname.length < 2) {
    showError('Nickname must be at least 2 characters!');
    return;
  }
  
  AppState.currentUser = nickname;
  
  // Hide nickname input, show chat input
  const nicknameContainer = document.getElementById('nickname-container');
  const messageContainer = document.getElementById('message-container');
  
  if (nicknameContainer) nicknameContainer.classList.add('hidden');
  if (messageContainer) messageContainer.classList.remove('hidden');
  
  // Add welcome message
  AppState.chatMessages[AppState.currentRoom].push({
    user: 'System',
    text: `${nickname} joined the chat! 👋`,
    time: Date.now(),
    system: true
  });
  
  displayChatMessages();
}

function sendMessage() {
  if (!AppState.currentUser) {
    showError('Please set your nickname first!');
    return;
  }
  
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add message to current room
  AppState.chatMessages[AppState.currentRoom].push({
    user: AppState.currentUser,
    text: sanitizeHTML(message),
    time: Date.now(),
    own: true
  });
  
  input.value = '';
  displayChatMessages();
  
  // Simulate bot response
  setTimeout(() => {
    const responses = [
      'Interesting point! 🤔',
      'I agree! 👍',
      'Can you elaborate more?',
      'That\'s a great question!',
      'Thanks for sharing! 🙏',
      'I learned something new today!',
      'Let me think about that...',
      'Good observation! 💡'
    ];
    
    AppState.chatMessages[AppState.currentRoom].push({
      user: 'TechBot',
      text: responses[Math.floor(Math.random() * responses.length)],
      time: Date.now()
    });
    
    displayChatMessages();
  }, 1000 + Math.random() * 2000);
}

function displayChatMessages() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  
  const messages = AppState.chatMessages[AppState.currentRoom] || [];
  
  container.innerHTML = messages.map(msg => `
    <div class="chat-message ${msg.system ? 'chat-message--system' : ''} ${msg.own ? 'chat-message--own' : ''}">
      <div class="chat-message__user">${sanitizeHTML(msg.user)}</div>
      <div class="chat-message__text">${msg.text}</div>
      <div class="chat-message__time">${formatTime(msg.time)}</div>
    </div>
  `).join('');
  
  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
  
  // Update online count (simulated)
  const onlineCount = document.getElementById('online-count');
  if (onlineCount) {
    onlineCount.textContent = `● ${Math.floor(Math.random() * 50) + 10} Online`;
  }
}

// ==================== QUIZ SYSTEM ====================
function initQuiz() {
  // Quiz questions will be loaded from intelligence-data.js
  // This is just the initialization
  AppState.quizQuestions = window.quizQuestions || [];
}

function selectQuizCategory(category) {
  AppState.selectedCategory = category;
  
  // Update button states
  document.querySelectorAll('.quiz-controls .btn--small').forEach(btn => {
    btn.classList.remove('btn--active');
  });
  event.target.classList.add('btn--active');
}

function startQuiz(mode) {
  AppState.quizMode = mode;
  AppState.currentQuestionIndex = 0;
  AppState.quizScore = 0;
  
  // Filter questions by category
  let questions = AppState.selectedCategory === 'all' 
    ? [...AppState.quizQuestions]
    : AppState.quizQuestions.filter(q => q.category === AppState.selectedCategory);
  
  // Shuffle and select questions based on mode
  questions = shuffleArray(questions);
  
  const questionCounts = {
    quick: 10,
    timed: 20,
    practice: 50
  };
  
  AppState.currentQuiz = questions.slice(0, questionCounts[mode] || 10);
  
  // Start timer for timed mode
  if (mode === 'timed') {
    AppState.quizTimeLeft = AppState.currentQuiz.length * 30; // 30 seconds per question
    startQuizTimer();
  }
  
  displayQuestion();
}

function startQuizTimer() {
  if (AppState.quizTimer) clearInterval(AppState.quizTimer);
  
  AppState.quizTimer = setInterval(() => {
    AppState.quizTimeLeft--;
    
    const timerEl = document.getElementById('quiz-timer');
    if (timerEl) {
      const minutes = Math.floor(AppState.quizTimeLeft / 60);
      const seconds = AppState.quizTimeLeft % 60;
      timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    if (AppState.quizTimeLeft <= 0) {
      clearInterval(AppState.quizTimer);
      endQuiz();
    }
  }, 1000);
}

function displayQuestion() {
  const container = document.getElementById('quiz-content');
  if (!container) return;
  
  const question = AppState.currentQuiz[AppState.currentQuestionIndex];
  if (!question) {
    endQuiz();
    return;
  }
  
  container.innerHTML = `
    <div class="quiz-question">
      <div class="quiz-question__meta">
        <span class="badge">${question.category}</span>
        <span class="badge badge--warning">Question ${AppState.currentQuestionIndex + 1}/${AppState.currentQuiz.length}</span>
      </div>
      <div class="quiz-question__text">${sanitizeHTML(question.question)}</div>
      <div class="quiz-options">
        ${question.options.map((option, index) => `
          <button class="quiz-option" onclick="selectAnswer(${index})">
            ${sanitizeHTML(option)}
          </button>
        `).join('')}
      </div>
    </div>
  `;
  
  // Update score display
  const scoreEl = document.getElementById('quiz-score');
  if (scoreEl) scoreEl.textContent = AppState.quizScore;
}

function selectAnswer(answerIndex) {
  const question = AppState.currentQuiz[AppState.currentQuestionIndex];
  const isCorrect = answerIndex === question.correct;
  
  if (isCorrect) {
    AppState.quizScore++;
  }
  
  // Show feedback
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, idx) => {
    opt.disabled = true;
    if (idx === question.correct) {
      opt.classList.add('quiz-option--correct');
    } else if (idx === answerIndex && !isCorrect) {
      opt.classList.add('quiz-option--incorrect');
    }
  });
  
  // Move to next question after delay
  setTimeout(() => {
    AppState.currentQuestionIndex++;
    displayQuestion();
  }, 1500);
}

function endQuiz() {
  if (AppState.quizTimer) {
    clearInterval(AppState.quizTimer);
    AppState.quizTimer = null;
  }
  
  const container = document.getElementById('quiz-content');
  if (!container) return;
  
  const percentage = Math.round((AppState.quizScore / AppState.currentQuiz.length) * 100);
  
  let message = '';
  if (percentage >= 90) message = '🏆 OUTSTANDING! You\'re a tech genius!';
  else if (percentage >= 70) message = '🎉 GREAT JOB! You know your stuff!';
  else if (percentage >= 50) message = '👍 GOOD EFFORT! Keep learning!';
  else message = '📚 KEEP PRACTICING! You\'ll get better!';
  
  container.innerHTML = `
    <div class="quiz-score-display">
      <h3 class="text-primary mb-md">QUIZ COMPLETE!</h3>
      <div class="quiz-score__number">${AppState.quizScore}/${AppState.currentQuiz.length}</div>
      <div class="quiz-score__percentage text-accent mb-lg">${percentage}%</div>
      <p class="text-secondary mb-lg">${message}</p>
      <div class="quiz-controls">
        <button class="btn" onclick="startQuiz('${AppState.quizMode}')">TRY AGAIN</button>
        <button class="btn btn--secondary" onclick="location.reload()">NEW QUIZ</button>
      </div>
    </div>
  `;
}

// ==================== INDIAN LABS ====================
function initIndianLabs() {
  // Initialize Indian labs map
  const mapEl = document.getElementById('indian-labs-map');
  if (!mapEl) return;
  
  AppState.indianLabsMap = L.map('indian-labs-map').setView([20.5937, 78.9629], 5);
  
  L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '© Google'
  }).addTo(AppState.indianLabsMap);
  
  // Add markers (data from indian-labs.js)
  if (window.indianLabs) {
    AppState.indianMarkerCluster = L.markerClusterGroup();
    
    window.indianLabs.forEach(lab => {
      const marker = L.marker([lab.lat, lab.lng])
        .bindPopup(`
          <div class="item">
            <h3 class="item__title">${lab.name}</h3>
            <p class="item__description">${lab.description}</p>
            <div class="item__meta">
              <span class="tag">${lab.type}</span>
              <span class="tag">${lab.location}</span>
            </div>
          </div>
        `);
      
      AppState.indianMarkerCluster.addLayer(marker);
    });
    
    AppState.indianLabsMap.addLayer(AppState.indianMarkerCluster);
    displayIndianLabsList();
  }
  
  // Zoom info
  AppState.indianLabsMap.on('zoomend', () => {
    const zoomEl = document.getElementById('indian-zoom-info');
    if (zoomEl) {
      zoomEl.textContent = `Zoom: ${AppState.indianLabsMap.getZoom()} | Max: 22`;
    }
  });
}

function displayIndianLabsList() {
  const container = document.getElementById('indian-labs-list');
  if (!container || !window.indianLabs) return;
  
  container.innerHTML = window.indianLabs.map(lab => `
    <div class="item item--clickable" onclick="focusIndianLab(${lab.lat}, ${lab.lng})">
      <h3 class="item__title">${sanitizeHTML(lab.name)}</h3>
      <p class="item__description">${sanitizeHTML(lab.description)}</p>
      <div class="item__meta">
        <span class="tag">${sanitizeHTML(lab.type)}</span>
        <span class="tag">${sanitizeHTML(lab.location)}</span>
      </div>
    </div>
  `).join('');
}

function focusIndianLab(lat, lng) {
  if (AppState.indianLabsMap) {
    AppState.indianLabsMap.setView([lat, lng], 15);
    scrollToElement('indian-labs-map');
  }
}

function filterIndianLabs(type) {
  if (!window.indianLabs) return;
  
  const filtered = type === 'all' 
    ? window.indianLabs 
    : window.indianLabs.filter(lab => lab.type.toLowerCase() === type);
  
  const container = document.getElementById('indian-labs-list');
  if (!container) return;
  
  container.innerHTML = filtered.map(lab => `
    <div class="item item--clickable" onclick="focusIndianLab(${lab.lat}, ${lab.lng})">
      <h3 class="item__title">${sanitizeHTML(lab.name)}</h3>
      <p class="item__description">${sanitizeHTML(lab.description)}</p>
      <div class="item__meta">
        <span class="tag">${sanitizeHTML(lab.type)}</span>
        <span class="tag">${sanitizeHTML(lab.location)}</span>
      </div>
    </div>
  `).join('');
}

// ==================== MAPS INITIALIZATION ====================
function initMaps() {
  // Global satellite map
  const mapEl = document.getElementById('map');
  if (mapEl) {
    AppState.map = L.map('map').setView([20, 0], 2);
    
    L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 22,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '© Google'
    }).addTo(AppState.map);
    
    // Load locations from intelligence-data.js
    if (window.secretLocations) {
      AppState.markerCluster = L.markerClusterGroup();
      
      window.secretLocations.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lng])
          .bindPopup(`
            <div class="item">
              <h3 class="item__title">${loc.name}</h3>
              <p class="item__description">${loc.description}</p>
              <div class="item__meta">
                <span class="tag">${loc.type}</span>
                <span class="tag">${loc.country}</span>
              </div>
            </div>
          `);
        
        AppState.markerCluster.addLayer(marker);
      });
      
      AppState.map.addLayer(AppState.markerCluster);
    }
    
    // Zoom info
    AppState.map.on('zoomend', () => {
      const zoomEl = document.getElementById('zoom-info');
      if (zoomEl) {
        zoomEl.textContent = `Zoom: ${AppState.map.getZoom()} | Max: 22 (ULTRA HD)`;
      }
    });
  }
}

// ==================== DATA LOADING ====================
async function loadAllData() {
  try {
    updateLastUpdate();
    
    await Promise.all([
      loadHackerNews(),
      loadReddit(),
      loadGitHub(),
      loadResearch(),
      loadBreakthroughs()
    ]);
    
    updateStats();
  } catch (error) {
    console.error('Data loading error:', error);
    showError('Failed to load some data. Please refresh the page.');
  }
}

async function loadHackerNews() {
  try {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = await response.json();
    
    const stories = await Promise.all(
      storyIds.slice(0, 100).map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
      )
    );
    
    AppState.allNews = stories.filter(s => s && s.title);
    displayNews();
  } catch (error) {
    console.error('Hacker News error:', error);
  }
}

async function loadReddit() {
  try {
    const subreddits = ['technology', 'programming', 'artificial', 'MachineLearning', 'datascience', 
                       'webdev', 'coding', 'learnprogramming', 'cscareerquestions', 'startups'];
    
    const posts = await Promise.all(
      subreddits.map(sub =>
        fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=5`)
          .then(r => r.json())
          .then(data => data.data.children.map(c => ({ ...c.data, subreddit: sub })))
      )
    );
    
    AppState.allReddit = posts.flat();
    displayReddit();
  } catch (error) {
    console.error('Reddit error:', error);
  }
}

async function loadGitHub() {
  try {
    const response = await fetch('https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=50');
    const data = await response.json();
    
    AppState.allGitHub = data.items || [];
    displayGitHub();
  } catch (error) {
    console.error('GitHub error:', error);
  }
}

async function loadResearch() {
  try {
    const categories = ['cs.AI', 'cs.LG', 'cs.CV', 'cs.CL', 'cs.RO'];
    const papers = [];
    
    for (const cat of categories) {
      const response = await fetch(`https://export.arxiv.org/api/query?search_query=cat:${cat}&sortBy=submittedDate&sortOrder=descending&max_results=6`);
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      
      const entries = xml.querySelectorAll('entry');
      entries.forEach(entry => {
        papers.push({
          title: entry.querySelector('title')?.textContent,
          summary: entry.querySelector('summary')?.textContent,
          authors: Array.from(entry.querySelectorAll('author name')).map(a => a.textContent),
          link: entry.querySelector('id')?.textContent,
          published: entry.querySelector('published')?.textContent,
          category: cat
        });
      });
    }
    
    AppState.allResearch = papers;
    displayResearch();
  } catch (error) {
    console.error('Research error:', error);
  }
}

async function loadBreakthroughs() {
  // Breakthroughs will be loaded from breakthrough-detector.js
  if (window.detectBreakthroughs) {
    const breakthroughs = window.detectBreakthroughs(AppState.allNews, AppState.allResearch);
    displayBreakthroughs(breakthroughs);
  }
}

// ==================== DISPLAY FUNCTIONS ====================
function displayNews() {
  const container = document.getElementById('news-container');
  if (!container) return;
  
  container.innerHTML = AppState.allNews.map(story => `
    <div class="item item--clickable" onclick="openModal('news', ${story.id})">
      <h3 class="item__title">${sanitizeHTML(story.title)}</h3>
      <div class="item__meta">
        <span class="tag">👍 ${story.score || 0}</span>
        <span class="tag">💬 ${story.descendants || 0}</span>
        ${story.url ? `<a href="${story.url}" target="_blank" class="tag" onclick="event.stopPropagation()">🔗 Link</a>` : ''}
      </div>
      <div class="timestamp">${formatTime(story.time * 1000)}</div>
      <div class="click-hint">Click for details →</div>
    </div>
  `).join('');
}

function displayReddit() {
  const container = document.getElementById('reddit-container');
  if (!container) return;
  
  container.innerHTML = AppState.allReddit.map(post => `
    <div class="item item--clickable" onclick="window.open('https://reddit.com${post.permalink}', '_blank')">
      <h3 class="item__title">${sanitizeHTML(post.title)}</h3>
      <div class="item__meta">
        <span class="tag">r/${post.subreddit}</span>
        <span class="tag">👍 ${post.ups || 0}</span>
        <span class="tag">💬 ${post.num_comments || 0}</span>
      </div>
      <div class="timestamp">${formatTime(post.created_utc * 1000)}</div>
    </div>
  `).join('');
}

function displayGitHub() {
  const container = document.getElementById('github-container');
  if (!container) return;
  
  container.innerHTML = AppState.allGitHub.map(repo => `
    <div class="item item--clickable" onclick="window.open('${repo.html_url}', '_blank')">
      <h3 class="item__title">${sanitizeHTML(repo.full_name)}</h3>
      <p class="item__description">${sanitizeHTML(repo.description || 'No description')}</p>
      <div class="item__meta">
        <span class="tag">⭐ ${repo.stargazers_count}</span>
        <span class="tag">🔱 ${repo.forks_count}</span>
        <span class="tag">${repo.language || 'Unknown'}</span>
      </div>
    </div>
  `).join('');
}

function displayResearch() {
  const container = document.getElementById('research-container');
  if (!container) return;
  
  container.innerHTML = AppState.allResearch.map(paper => `
    <div class="item item--clickable" onclick="window.open('${paper.link}', '_blank')">
      <h3 class="item__title">${sanitizeHTML(paper.title)}</h3>
      <p class="item__description">${sanitizeHTML(paper.summary?.substring(0, 200))}...</p>
      <div class="item__meta">
        <span class="tag">${paper.category}</span>
        <span class="tag">👥 ${paper.authors?.length || 0} authors</span>
      </div>
      <div class="timestamp">${formatTime(new Date(paper.published).getTime())}</div>
    </div>
  `).join('');
}

function displayBreakthroughs(breakthroughs) {
  const container = document.getElementById('breakthroughs-container');
  if (!container || !breakthroughs) return;
  
  container.innerHTML = breakthroughs.map(item => `
    <div class="item item--${item.priority}" onclick="openModal('breakthrough', '${item.id}')">
      <div class="item__meta">
        <span class="badge badge--danger">${item.priority.toUpperCase()}</span>
        <span class="badge">${item.type}</span>
      </div>
      <h3 class="item__title">${sanitizeHTML(item.title)}</h3>
      <p class="item__description">${sanitizeHTML(item.description)}</p>
      <div class="click-hint">Click for full analysis →</div>
    </div>
  `).join('');
}

// ==================== UTILITY FUNCTIONS ====================
function updateStats() {
  const updates = {
    'news-count': AppState.allNews.length,
    'research-count': AppState.allResearch.length,
    'github-count': AppState.allGitHub.length,
    'reddit-count': AppState.allReddit.length
  };
  
  Object.entries(updates).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) animateNumber(el, value);
  });
}

function animateNumber(element, target) {
  const duration = 1000;
  const start = 0;
  const startTime = Date.now();
  
  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (target - start) * progress);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  update();
}

function updateLastUpdate() {
  const el = document.getElementById('last-update');
  if (el) {
    el.textContent = `Last updated: ${new Date().toLocaleString()}`;
  }
}

function formatTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function sanitizeHTML(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function scrollToElement(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function showError(message) {
  console.error(message);
  // Could add a toast notification here
  alert(message);
}

// ==================== PANEL TOGGLES ====================
function togglePanel(panelName) {
  const panel = document.getElementById(`${panelName}-panel`);
  const button = event.target;
  
  if (!panel) return;
  
  if (panel.style.display === 'none') {
    panel.style.display = 'block';
    button.textContent = `HIDE ${panelName.toUpperCase()}`;
  } else {
    panel.style.display = 'none';
    button.textContent = `SHOW ${panelName.toUpperCase()}`;
  }
}

// ==================== MODAL SYSTEM ====================
function openModal(type, id) {
  const modal = document.getElementById('detail-modal');
  const content = document.getElementById('modal-content');
  
  if (!modal || !content) return;
  
  let data;
  if (type === 'news') {
    data = AppState.allNews.find(n => n.id === id);
  }
  
  if (!data) return;
  
  content.innerHTML = `
    <h2 class="text-primary mb-lg">${sanitizeHTML(data.title)}</h2>
    <div class="item__meta mb-lg">
      <span class="tag">👍 ${data.score || 0}</span>
      <span class="tag">💬 ${data.descendants || 0}</span>
      ${data.url ? `<a href="${data.url}" target="_blank" class="btn btn--small">Open Link</a>` : ''}
    </div>
    <div class="timestamp mb-lg">${formatTime(data.time * 1000)}</div>
    ${data.text ? `<div class="item__description">${sanitizeHTML(data.text)}</div>` : ''}
  `;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('detail-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// ==================== SEARCH & FILTER ====================
function filterNews(query) {
  const filtered = AppState.allNews.filter(story =>
    story.title?.toLowerCase().includes(query.toLowerCase())
  );
  
  const container = document.getElementById('news-container');
  if (!container) return;
  
  container.innerHTML = filtered.map(story => `
    <div class="item item--clickable" onclick="openModal('news', ${story.id})">
      <h3 class="item__title">${sanitizeHTML(story.title)}</h3>
      <div class="item__meta">
        <span class="tag">👍 ${story.score || 0}</span>
        <span class="tag">💬 ${story.descendants || 0}</span>
      </div>
      <div class="timestamp">${formatTime(story.time * 1000)}</div>
    </div>
  `).join('');
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
  // Search inputs
  const newsSearch = document.getElementById('news-search');
  if (newsSearch) {
    newsSearch.addEventListener('input', debounce((e) => {
      filterNews(e.target.value);
    }, 300));
  }
  
  const labSearch = document.getElementById('lab-search');
  if (labSearch) {
    labSearch.addEventListener('input', debounce((e) => {
      // Implement lab search
    }, 300));
  }
  
  const indianLabSearch = document.getElementById('indian-lab-search');
  if (indianLabSearch) {
    indianLabSearch.addEventListener('input', debounce((e) => {
      // Implement Indian lab search
    }, 300));
  }
  
  // Close modal on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ==================== EXPOSE GLOBAL FUNCTIONS ====================
window.togglePanel = togglePanel;
window.openModal = openModal;
window.closeModal = closeModal;
window.filterNews = filterNews;
window.setNickname = setNickname;
window.sendMessage = sendMessage;
window.selectQuizCategory = selectQuizCategory;
window.startQuiz = startQuiz;
window.selectAnswer = selectAnswer;
window.filterIndianLabs = filterIndianLabs;
window.focusIndianLab = focusIndianLab;