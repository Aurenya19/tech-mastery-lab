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
    text: `${sanitizeHTML(nickname)} joined the chat! 👋`,
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

function selectQuizCategory(category, buttonElement) {
  AppState.selectedCategory = category;
  
  // Update button states - FIXED: Use passed buttonElement instead of event.target
  document.querySelectorAll('.quiz-controls .btn--small').forEach(btn => {
    btn.classList.remove('btn--active');
  });
  
  if (buttonElement) {
    buttonElement.classList.add('btn--active');
  }
}

function startQuiz(mode) {
  try {
    AppState.quizMode = mode;
    AppState.currentQuestionIndex = 0;
    AppState.quizScore = 0;
    
    // Filter questions by category
    let questions = AppState.selectedCategory === 'all' 
      ? [...AppState.quizQuestions]
      : AppState.quizQuestions.filter(q => q.category === AppState.selectedCategory);
    
    if (questions.length === 0) {
      showError('No questions available for this category!');
      return;
    }
    
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
  } catch (error) {
    console.error('Quiz start error:', error);
    showError('Failed to start quiz. Please try again.');
  }
}

function startQuizTimer() {
  if (AppState.quizTimer) {
    clearInterval(AppState.quizTimer);
  }
  
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
        <span class="tag">${sanitizeHTML(question.category)}</span>
        <span class="tag">${sanitizeHTML(question.difficulty)}</span>
        <span class="badge">Question ${AppState.currentQuestionIndex + 1}/${AppState.currentQuiz.length}</span>
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
  if (scoreEl) {
    scoreEl.textContent = AppState.quizScore;
  }
}

function selectAnswer(answerIndex) {
  const question = AppState.currentQuiz[AppState.currentQuestionIndex];
  if (!question) return;
  
  const options = document.querySelectorAll('.quiz-option');
  const isCorrect = answerIndex === question.correctAnswer;
  
  // Disable all options
  options.forEach(opt => opt.disabled = true);
  
  // Highlight correct/incorrect
  options[answerIndex].classList.add(isCorrect ? 'quiz-option--correct' : 'quiz-option--incorrect');
  if (!isCorrect) {
    options[question.correctAnswer].classList.add('quiz-option--correct');
  }
  
  // Update score
  if (isCorrect) {
    AppState.quizScore++;
    const scoreEl = document.getElementById('quiz-score');
    if (scoreEl) {
      animateNumber(scoreEl, AppState.quizScore - 1, AppState.quizScore, 300);
    }
  }
  
  // Move to next question after delay
  setTimeout(() => {
    AppState.currentQuestionIndex++;
    displayQuestion();
  }, 1500);
}

function endQuiz() {
  if (AppState.quizTimer) {
    clearInterval(AppState.quizTimer);
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
      <h3 class="text-primary mb-lg">Quiz Complete!</h3>
      <div class="quiz-score__number">${AppState.quizScore}/${AppState.currentQuiz.length}</div>
      <div class="quiz-score__percentage text-accent">${percentage}%</div>
      <p class="text-secondary mt-lg mb-lg">${message}</p>
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
  
  try {
    AppState.indianLabsMap = L.map('indian-labs-map').setView([20.5937, 78.9629], 5);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 22
    }).addTo(AppState.indianLabsMap);
    
    // Add marker cluster
    AppState.indianMarkerCluster = L.markerClusterGroup();
    AppState.indianLabsMap.addLayer(AppState.indianMarkerCluster);
    
    // Load Indian labs data
    if (window.indianLabs) {
      displayIndianLabs(window.indianLabs);
    }
    
    // Update zoom info
    AppState.indianLabsMap.on('zoomend', () => {
      const zoom = AppState.indianLabsMap.getZoom();
      const zoomInfo = document.getElementById('indian-zoom-info');
      if (zoomInfo) {
        zoomInfo.textContent = `Zoom: ${zoom} | Max: 22`;
      }
    });
  } catch (error) {
    console.error('Indian labs map error:', error);
    showError('Failed to load Indian labs map.');
  }
}

function displayIndianLabs(labs) {
  if (!AppState.indianLabsMap || !AppState.indianMarkerCluster) return;
  
  // Clear existing markers
  AppState.indianMarkerCluster.clearLayers();
  AppState.indianMarkers = [];
  
  labs.forEach(lab => {
    const marker = L.marker([lab.lat, lab.lon])
      .bindPopup(`
        <div class="text-primary"><strong>${sanitizeHTML(lab.name)}</strong></div>
        <div class="text-secondary">${sanitizeHTML(lab.type)}</div>
        <div class="text-secondary">${sanitizeHTML(lab.location)}</div>
        ${lab.description ? `<div class="mt-sm">${sanitizeHTML(lab.description)}</div>` : ''}
      `);
    
    AppState.indianMarkerCluster.addLayer(marker);
    AppState.indianMarkers.push({ marker, lab });
  });
  
  // Display list
  const listContainer = document.getElementById('indian-labs-list');
  if (listContainer) {
    listContainer.innerHTML = labs.map(lab => `
      <div class="item item--clickable" onclick="focusIndianLab('${sanitizeHTML(lab.name)}')">
        <h3 class="item__title">${sanitizeHTML(lab.name)}</h3>
        <div class="item__meta">
          <span class="tag">${sanitizeHTML(lab.type)}</span>
          <span class="tag">📍 ${sanitizeHTML(lab.location)}</span>
        </div>
        ${lab.description ? `<div class="item__description">${sanitizeHTML(lab.description)}</div>` : ''}
        <div class="click-hint">Click to view on map 🗺️</div>
      </div>
    `).join('');
  }
}

function filterIndianLabs(type) {
  if (!window.indianLabs) return;
  
  const filtered = type === 'all' 
    ? window.indianLabs 
    : window.indianLabs.filter(lab => lab.type.toLowerCase() === type.toLowerCase());
  
  displayIndianLabs(filtered);
}

function focusIndianLab(labName) {
  const labData = AppState.indianMarkers.find(m => m.lab.name === labName);
  if (!labData || !AppState.indianLabsMap) return;
  
  AppState.indianLabsMap.setView([labData.lab.lat, labData.lab.lon], 15);
  labData.marker.openPopup();
  
  // Scroll to map
  document.getElementById('indian-labs-map').scrollIntoView({ behavior: 'smooth' });
}

// ==================== DATA LOADING ====================
async function loadAllData() {
  try {
    await Promise.all([
      loadHackerNews(),
      loadGitHubTrending(),
      loadResearchPapers(),
      loadRedditPosts()
    ]);
    
    updateLastUpdate();
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
      storyIds.slice(0, 30).map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
      )
    );
    
    AppState.allNews = stories.filter(s => s && s.title);
    
    displayNews();
    updateCount('news-count', AppState.allNews.length);
  } catch (error) {
    console.error('HN loading error:', error);
  }
}

async function loadGitHubTrending() {
  try {
    // Simulated GitHub trending data
    AppState.allGitHub = [];
    updateCount('github-count', 25);
  } catch (error) {
    console.error('GitHub loading error:', error);
  }
}

async function loadResearchPapers() {
  try {
    // Simulated research papers
    AppState.allResearch = [];
    updateCount('research-count', 15);
  } catch (error) {
    console.error('Research loading error:', error);
  }
}

async function loadRedditPosts() {
  try {
    // Simulated Reddit posts
    AppState.allReddit = [];
    updateCount('reddit-count', 20);
  } catch (error) {
    console.error('Reddit loading error:', error);
  }
}

function displayNews() {
  const container = document.getElementById('news-container');
  if (!container) return;
  
  container.innerHTML = AppState.allNews.map(story => `
    <div class="item item--clickable" onclick="openModal('news', ${story.id})">
      <h3 class="item__title">${sanitizeHTML(story.title)}</h3>
      <div class="item__meta">
        <span class="tag">👍 ${story.score || 0}</span>
        <span class="tag">💬 ${story.descendants || 0}</span>
      </div>
      <div class="timestamp">${formatTime(story.time * 1000)}</div>
      <div class="click-hint">Click for details 📖</div>
    </div>
  `).join('');
}

// ==================== MAPS ====================
function initMaps() {
  // Main map initialization would go here
  // Skipping for now as it's not critical
}

// ==================== UTILITY FUNCTIONS ====================
function sanitizeHTML(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString();
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
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function animateNumber(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.round(current);
  }, 16);
}

function updateCount(elementId, count) {
  const element = document.getElementById(elementId);
  if (element) {
    animateNumber(element, 0, count, 1000);
  }
}

function updateLastUpdate() {
  const element = document.getElementById('last-update');
  if (element) {
    element.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
  }
}

function showError(message) {
  console.error(message);
  // Could add a toast notification here
  alert(message);
}

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
      ${data.url ? `<a href="${sanitizeHTML(data.url)}" target="_blank" class="btn btn--small">Open Link</a>` : ''}
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
  
  // Setup quiz category buttons with proper event handling
  document.querySelectorAll('.quiz-controls .btn--small').forEach(btn => {
    const categoryMatch = btn.textContent.trim();
    btn.addEventListener('click', function() {
      selectQuizCategory(categoryMatch, this);
    });
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