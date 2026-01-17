// 🇮🇳 TECH MASTERY LAB - FULLY WORKING VERSION
'use strict';

// ==================== STATE MANAGEMENT ====================
const AppState = {
  // Data
  allNews: [],
  allReddit: [],
  allGitHub: [],
  allResearch: [],
  allBreakthroughs: [],
  
  // Maps
  map: null,
  indianLabsMap: null,
  markers: [],
  indianMarkers: [],
  markerCluster: null,
  indianMarkerCluster: null,
  
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
  console.log('🚀 Initializing Tech Mastery Lab...');
  
  try {
    initMatrix();
    initChat();
    initQuiz();
    initIndianLabs();
    initMaps();
    loadAllData();
    setupEventListeners();
    
    console.log('✅ Initialization complete!');
  } catch (error) {
    console.error('❌ Initialization error:', error);
    showError('Failed to initialize. Please refresh.');
  }
});

// ==================== DATA LOADING ====================
async function loadAllData() {
  console.log('📊 Loading all data...');
  
  // Update last update time
  const updateEl = document.getElementById('last-update');
  if (updateEl) {
    updateEl.textContent = `Last Updated: ${new Date().toLocaleString()}`;
  }
  
  // Load all data in parallel
  await Promise.all([
    loadHackerNews(),
    loadGitHubTrending(),
    loadRedditPosts(),
    loadResearchPapers(),
    loadBreakthroughs()
  ]);
  
  console.log('✅ All data loaded!');
}

// ==================== HACKER NEWS (REAL API) ====================
async function loadHackerNews() {
  try {
    console.log('📰 Loading Hacker News...');
    
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = await response.json();
    
    // Load first 100 stories
    const stories = await Promise.all(
      storyIds.slice(0, 100).map(async id => {
        try {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return await res.json();
        } catch (err) {
          return null;
        }
      })
    );
    
    AppState.allNews = stories.filter(s => s && s.title);
    
    displayNews();
    updateCount('news-count', AppState.allNews.length);
    
    console.log(`✅ Loaded ${AppState.allNews.length} news stories`);
  } catch (error) {
    console.error('❌ HN loading error:', error);
    showError('Failed to load news');
  }
}

function displayNews() {
  const container = document.getElementById('news-container');
  if (!container) return;
  
  if (AppState.allNews.length === 0) {
    container.innerHTML = '<div class="text-center text-secondary">Loading news...</div>';
    return;
  }
  
  container.innerHTML = AppState.allNews.map(story => `
    <div class="item item--clickable" onclick="openNewsDetail(${story.id})">
      <h3 class="item__title">${sanitizeHTML(story.title)}</h3>
      <div class="item__meta">
        <span class="tag">👍 ${story.score || 0} points</span>
        <span class="tag">💬 ${story.descendants || 0} comments</span>
        ${story.by ? `<span class="tag">👤 ${sanitizeHTML(story.by)}</span>` : ''}
      </div>
      <div class="timestamp">${formatTime(story.time * 1000)}</div>
      ${story.url ? `<a href="${story.url}" target="_blank" class="item__link" onclick="event.stopPropagation()">🔗 Read Article</a>` : ''}
      <div class="click-hint">Click for HN discussion 💬</div>
    </div>
  `).join('');
}

function openNewsDetail(storyId) {
  const story = AppState.allNews.find(s => s.id === storyId);
  if (!story) return;
  
  const hnUrl = `https://news.ycombinator.com/item?id=${storyId}`;
  
  openModal('news', {
    title: story.title,
    content: `
      <div class="modal-detail">
        <div class="modal-detail__meta">
          <span class="tag">👍 ${story.score || 0} points</span>
          <span class="tag">💬 ${story.descendants || 0} comments</span>
          <span class="tag">⏰ ${formatTime(story.time * 1000)}</span>
          ${story.by ? `<span class="tag">👤 by ${sanitizeHTML(story.by)}</span>` : ''}
        </div>
        
        ${story.text ? `<div class="modal-detail__text">${story.text}</div>` : ''}
        
        <div class="modal-detail__actions">
          ${story.url ? `<a href="${story.url}" target="_blank" class="btn">📖 Read Original Article</a>` : ''}
          <a href="${hnUrl}" target="_blank" class="btn btn--secondary">💬 View HN Discussion</a>
        </div>
      </div>
    `
  });
}

// ==================== GITHUB TRENDING (REAL API) ====================
async function loadGitHubTrending() {
  try {
    console.log('💻 Loading GitHub Trending...');
    
    // Using GitHub search API for trending repos
    const response = await fetch('https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=50');
    const data = await response.json();
    
    AppState.allGitHub = data.items || [];
    
    displayGitHub();
    updateCount('github-count', AppState.allGitHub.length);
    
    console.log(`✅ Loaded ${AppState.allGitHub.length} GitHub repos`);
  } catch (error) {
    console.error('❌ GitHub loading error:', error);
    showError('Failed to load GitHub data');
  }
}

function displayGitHub() {
  const container = document.getElementById('github-container');
  if (!container) return;
  
  if (AppState.allGitHub.length === 0) {
    container.innerHTML = '<div class="text-center text-secondary">Loading GitHub repos...</div>';
    return;
  }
  
  container.innerHTML = AppState.allGitHub.map(repo => `
    <div class="item item--clickable" onclick="window.open('${repo.html_url}', '_blank')">
      <h3 class="item__title">${sanitizeHTML(repo.full_name)}</h3>
      <p class="item__description">${sanitizeHTML(repo.description || 'No description')}</p>
      <div class="item__meta">
        <span class="tag">⭐ ${formatNumber(repo.stargazers_count)}</span>
        <span class="tag">🍴 ${formatNumber(repo.forks_count)}</span>
        ${repo.language ? `<span class="tag">💻 ${sanitizeHTML(repo.language)}</span>` : ''}
      </div>
      <div class="click-hint">Click to open on GitHub 🔗</div>
    </div>
  `).join('');
}

// ==================== REDDIT (REAL API) ====================
async function loadRedditPosts() {
  try {
    console.log('🕵️ Loading Reddit posts...');
    
    const subreddits = ['technology', 'programming', 'artificial', 'MachineLearning', 'datascience', 
                        'cybersecurity', 'webdev', 'learnprogramming', 'coding', 'tech'];
    
    const posts = [];
    
    for (const sub of subreddits.slice(0, 5)) {
      try {
        const response = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=10`);
        const data = await response.json();
        
        if (data.data && data.data.children) {
          posts.push(...data.data.children.map(child => ({
            ...child.data,
            subreddit: sub
          })));
        }
      } catch (err) {
        console.error(`Failed to load r/${sub}:`, err);
      }
    }
    
    AppState.allReddit = posts;
    
    displayReddit();
    updateCount('reddit-count', AppState.allReddit.length);
    
    console.log(`✅ Loaded ${AppState.allReddit.length} Reddit posts`);
  } catch (error) {
    console.error('❌ Reddit loading error:', error);
    showError('Failed to load Reddit data');
  }
}

function displayReddit() {
  const container = document.getElementById('reddit-container');
  if (!container) return;
  
  if (AppState.allReddit.length === 0) {
    container.innerHTML = '<div class="text-center text-secondary">Loading Reddit posts...</div>';
    return;
  }
  
  container.innerHTML = AppState.allReddit.map(post => `
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
}

// ==================== RESEARCH PAPERS (REAL API) ====================
async function loadResearchPapers() {
  try {
    console.log('🔬 Loading research papers...');
    
    // Using arXiv API
    const response = await fetch('https://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.LG+OR+cat:cs.CL&sortBy=submittedDate&sortOrder=descending&max_results=30');
    const text = await response.text();
    
    // Parse XML
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const entries = xml.querySelectorAll('entry');
    
    AppState.allResearch = Array.from(entries).map(entry => ({
      title: entry.querySelector('title')?.textContent?.trim(),
      summary: entry.querySelector('summary')?.textContent?.trim(),
      authors: Array.from(entry.querySelectorAll('author name')).map(a => a.textContent),
      published: entry.querySelector('published')?.textContent,
      link: entry.querySelector('id')?.textContent,
      category: entry.querySelector('category')?.getAttribute('term')
    }));
    
    displayResearch();
    updateCount('research-count', AppState.allResearch.length);
    
    console.log(`✅ Loaded ${AppState.allResearch.length} research papers`);
  } catch (error) {
    console.error('❌ Research loading error:', error);
    showError('Failed to load research papers');
  }
}

function displayResearch() {
  const container = document.getElementById('research-container');
  if (!container) return;
  
  if (AppState.allResearch.length === 0) {
    container.innerHTML = '<div class="text-center text-secondary">Loading research papers...</div>';
    return;
  }
  
  container.innerHTML = AppState.allResearch.map((paper, idx) => `
    <div class="item item--clickable" onclick="openResearchDetail(${idx})">
      <h3 class="item__title">${sanitizeHTML(paper.title)}</h3>
      <p class="item__description">${sanitizeHTML(paper.summary?.substring(0, 200))}...</p>
      <div class="item__meta">
        <span class="tag">👥 ${paper.authors?.length || 0} authors</span>
        ${paper.category ? `<span class="tag">📚 ${sanitizeHTML(paper.category)}</span>` : ''}
      </div>
      <div class="timestamp">${formatTime(new Date(paper.published))}</div>
      <div class="click-hint">Click for full abstract 📖</div>
    </div>
  `).join('');
}

function openResearchDetail(idx) {
  const paper = AppState.allResearch[idx];
  if (!paper) return;
  
  openModal('research', {
    title: paper.title,
    content: `
      <div class="modal-detail">
        <div class="modal-detail__meta">
          <span class="tag">📅 ${formatTime(new Date(paper.published))}</span>
          <span class="tag">👥 ${paper.authors?.length || 0} authors</span>
          ${paper.category ? `<span class="tag">📚 ${sanitizeHTML(paper.category)}</span>` : ''}
        </div>
        
        <div class="modal-detail__authors">
          <strong>Authors:</strong> ${paper.authors?.map(a => sanitizeHTML(a)).join(', ')}
        </div>
        
        <div class="modal-detail__text">
          <strong>Abstract:</strong><br>
          ${sanitizeHTML(paper.summary)}
        </div>
        
        <div class="modal-detail__actions">
          <a href="${paper.link}" target="_blank" class="btn">📄 Read Full Paper on arXiv</a>
        </div>
      </div>
    `
  });
}

// ==================== BREAKTHROUGHS ====================
async function loadBreakthroughs() {
  try {
    console.log('🚨 Loading breakthroughs...');
    
    // Use intelligence data if available
    if (window.INTELLIGENCE_DATA) {
      AppState.allBreakthroughs = window.INTELLIGENCE_DATA;
      displayBreakthroughs();
      console.log(`✅ Loaded ${AppState.allBreakthroughs.length} breakthroughs`);
    }
  } catch (error) {
    console.error('❌ Breakthroughs loading error:', error);
  }
}

function displayBreakthroughs() {
  const container = document.getElementById('breakthroughs-container');
  if (!container) return;
  
  if (AppState.allBreakthroughs.length === 0) {
    container.innerHTML = '<div class="text-center text-secondary">No breakthroughs data available</div>';
    return;
  }
  
  container.innerHTML = AppState.allBreakthroughs.map((item, idx) => `
    <div class="item item--clickable" onclick="openBreakthroughDetail(${idx})">
      <h3 class="item__title">${sanitizeHTML(item.title)}</h3>
      <p class="item__description">${sanitizeHTML(item.description)}</p>
      <div class="item__meta">
        <span class="tag tag--danger">${sanitizeHTML(item.impact)}</span>
        <span class="tag">📅 ${sanitizeHTML(item.date)}</span>
        <span class="tag">📚 ${sanitizeHTML(item.category)}</span>
      </div>
      <div class="click-hint">Click for deep dive 🔍</div>
    </div>
  `).join('');
}

function openBreakthroughDetail(idx) {
  const item = AppState.allBreakthroughs[idx];
  if (!item) return;
  
  let content = `
    <div class="modal-detail">
      <div class="modal-detail__meta">
        <span class="tag tag--danger">${sanitizeHTML(item.impact)}</span>
        <span class="tag">📅 ${sanitizeHTML(item.date)}</span>
        <span class="tag">📚 ${sanitizeHTML(item.category)}</span>
        <span class="tag">📰 ${sanitizeHTML(item.source)}</span>
      </div>
      
      <div class="modal-detail__text">
        ${sanitizeHTML(item.description)}
      </div>
  `;
  
  if (item.deepDive) {
    content += `
      <div class="modal-detail__section">
        <h4>🔍 Deep Dive Summary</h4>
        <p>${sanitizeHTML(item.deepDive.summary)}</p>
      </div>
    `;
    
    if (item.deepDive.technical) {
      content += `
        <div class="modal-detail__section">
          <h4>⚙️ Technical Details</h4>
          ${item.deepDive.technical.map(t => `
            <div class="modal-detail__subsection">
              <strong>${sanitizeHTML(t.title)}:</strong>
              <p>${sanitizeHTML(t.detail)}</p>
            </div>
          `).join('')}
        </div>
      `;
    }
    
    if (item.deepDive.secrets) {
      content += `
        <div class="modal-detail__section">
          <h4>🔐 Classified Information</h4>
          ${item.deepDive.secrets.map(s => `
            <div class="modal-detail__subsection">
              <strong>${sanitizeHTML(s.title)}:</strong>
              <p>${sanitizeHTML(s.detail)}</p>
            </div>
          `).join('')}
        </div>
      `;
    }
  }
  
  content += `
      <div class="modal-detail__actions">
        <a href="${item.url}" target="_blank" class="btn">🔗 Read Full Report</a>
      </div>
    </div>
  `;
  
  openModal('breakthrough', {
    title: item.title,
    content: content
  });
}

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
  
  window.addEventListener('resize', debounce(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, 250));
}

// ==================== CHAT SYSTEM ====================
function initChat() {
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
  
  // Setup room buttons
  document.querySelectorAll('.chat-room-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const room = btn.dataset.room;
      switchChatRoom(room);
    });
  });
}

function switchChatRoom(room) {
  AppState.currentRoom = room;
  
  // Update button states
  document.querySelectorAll('.chat-room-btn').forEach(btn => {
    btn.classList.remove('chat-room-btn--active');
    if (btn.dataset.room === room) {
      btn.classList.add('chat-room-btn--active');
    }
  });
  
  // Update room name
  const roomNames = {
    general: 'General Tech Talk',
    ai: 'AI/ML Discussion',
    space: 'Space & ISRO',
    coding: 'Coding Help',
    career: 'Career Guidance',
    india: 'Indian Tech Scene',
    quiz: 'Quiz Arena',
    research: 'Research Papers'
  };
  
  const roomEl = document.getElementById('current-room');
  if (roomEl) {
    roomEl.textContent = roomNames[room] || room;
  }
  
  displayChatMessages();
}

function setNickname() {
  const input = document.getElementById('chat-nickname');
  if (!input) return;
  
  const nickname = input.value.trim();
  if (!nickname) {
    alert('Please enter a nickname!');
    return;
  }
  
  AppState.currentUser = nickname;
  
  // Hide nickname container, show message container
  document.getElementById('nickname-container')?.classList.add('hidden');
  document.getElementById('message-container')?.classList.remove('hidden');
  
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
  const input = document.getElementById('chat-input');
  if (!input) return;
  
  const message = input.value.trim();
  if (!message) return;
  
  // Add message
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
  
  container.scrollTop = container.scrollHeight;
  
  const onlineCount = document.getElementById('online-count');
  if (onlineCount) {
    onlineCount.textContent = `● ${Math.floor(Math.random() * 50) + 10} Online`;
  }
}

// ==================== QUIZ SYSTEM ====================
function initQuiz() {
  AppState.quizQuestions = window.quizQuestions || [];
  console.log(`📝 Loaded ${AppState.quizQuestions.length} quiz questions`);
  
  // Setup category buttons
  document.querySelectorAll('.quiz-controls .btn--small[data-category]').forEach(btn => {
    btn.addEventListener('click', function() {
      selectQuizCategory(this.dataset.category, this);
    });
  });
}

function selectQuizCategory(category, buttonElement) {
  AppState.selectedCategory = category;
  
  document.querySelectorAll('.quiz-controls .btn--small[data-category]').forEach(btn => {
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
    
    let questions = AppState.selectedCategory === 'all' 
      ? [...AppState.quizQuestions]
      : AppState.quizQuestions.filter(q => q.category === AppState.selectedCategory);
    
    if (questions.length === 0) {
      showError('No questions available for this category!');
      return;
    }
    
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
    showError('Failed to start quiz');
  }
}

function displayQuestion() {
  if (AppState.currentQuestionIndex >= AppState.currentQuiz.length) {
    endQuiz();
    return;
  }
  
  const question = AppState.currentQuiz[AppState.currentQuestionIndex];
  const container = document.getElementById('quiz-content');
  if (!container) return;
  
  container.innerHTML = `
    <div class="quiz-question">
      <div class="quiz-question__meta">
        <span class="tag">Question ${AppState.currentQuestionIndex + 1}/${AppState.currentQuiz.length}</span>
        <span class="tag">${sanitizeHTML(question.category)}</span>
        <span class="tag">${sanitizeHTML(question.difficulty)}</span>
      </div>
      
      <h3 class="quiz-question__text">${sanitizeHTML(question.question)}</h3>
      
      <div class="quiz-options">
        ${question.options.map((option, idx) => `
          <button class="quiz-option" onclick="selectAnswer(${idx})">
            ${String.fromCharCode(65 + idx)}. ${sanitizeHTML(option)}
          </button>
        `).join('')}
      </div>
    </div>
  `;
  
  // Update score display
  document.getElementById('quiz-score').textContent = AppState.quizScore;
}

function selectAnswer(selectedIdx) {
  const question = AppState.currentQuiz[AppState.currentQuestionIndex];
  const isCorrect = selectedIdx === question.correctAnswer;
  
  if (isCorrect) {
    AppState.quizScore++;
  }
  
  // Show feedback
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, idx) => {
    opt.disabled = true;
    if (idx === question.correctAnswer) {
      opt.classList.add('quiz-option--correct');
    } else if (idx === selectedIdx && !isCorrect) {
      opt.classList.add('quiz-option--wrong');
    }
  });
  
  // Move to next question
  setTimeout(() => {
    AppState.currentQuestionIndex++;
    displayQuestion();
  }, 1500);
}

function startQuizTimer() {
  if (AppState.quizTimer) {
    clearInterval(AppState.quizTimer);
  }
  
  AppState.quizTimer = setInterval(() => {
    AppState.quizTimeLeft--;
    
    const minutes = Math.floor(AppState.quizTimeLeft / 60);
    const seconds = AppState.quizTimeLeft % 60;
    
    document.getElementById('quiz-timer').textContent = 
      `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (AppState.quizTimeLeft <= 0) {
      clearInterval(AppState.quizTimer);
      endQuiz();
    }
  }, 1000);
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
  const mapEl = document.getElementById('indian-labs-map');
  if (!mapEl) return;
  
  try {
    AppState.indianLabsMap = L.map('indian-labs-map').setView([20.5937, 78.9629], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 22
    }).addTo(AppState.indianLabsMap);
    
    AppState.indianMarkerCluster = L.markerClusterGroup();
    AppState.indianLabsMap.addLayer(AppState.indianMarkerCluster);
    
    if (window.indianLabs) {
      displayIndianLabs(window.indianLabs);
    }
    
    AppState.indianLabsMap.on('zoomend', () => {
      const zoom = AppState.indianLabsMap.getZoom();
      const zoomInfo = document.getElementById('indian-zoom-info');
      if (zoomInfo) {
        zoomInfo.textContent = `Zoom: ${zoom} | Max: 22`;
      }
    });
    
    // Setup search
    const searchInput = document.getElementById('indian-lab-search');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        filterIndianLabsBySearch(e.target.value);
      }, 300));
    }
  } catch (error) {
    console.error('Indian labs map error:', error);
  }
}

function displayIndianLabs(labs) {
  if (!AppState.indianLabsMap || !AppState.indianMarkerCluster) return;
  
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
  
  const listContainer = document.getElementById('indian-labs-list');
  if (listContainer) {
    listContainer.innerHTML = labs.map(lab => `
      <div class="item item--clickable" onclick="focusIndianLab('${sanitizeHTML(lab.name)}')">
        <h3 class="item__title">${sanitizeHTML(lab.name)}</h3>
        <p class="item__description">${sanitizeHTML(lab.description || lab.type)}</p>
        <div class="item__meta">
          <span class="tag">${sanitizeHTML(lab.type)}</span>
          <span class="tag">📍 ${sanitizeHTML(lab.location)}</span>
        </div>
      </div>
    `).join('');
  }
}

function filterIndianLabs(type) {
  if (!window.indianLabs) return;
  
  const filtered = type === 'all' 
    ? window.indianLabs 
    : window.indianLabs.filter(lab => lab.type.toLowerCase().includes(type.toLowerCase()));
  
  displayIndianLabs(filtered);
}

function filterIndianLabsBySearch(query) {
  if (!window.indianLabs) return;
  
  const filtered = query 
    ? window.indianLabs.filter(lab => 
        lab.name.toLowerCase().includes(query.toLowerCase()) ||
        lab.location.toLowerCase().includes(query.toLowerCase()) ||
        lab.description?.toLowerCase().includes(query.toLowerCase())
      )
    : window.indianLabs;
  
  displayIndianLabs(filtered);
}

function focusIndianLab(name) {
  const labData = AppState.indianMarkers.find(m => m.lab.name === name);
  if (!labData) return;
  
  AppState.indianLabsMap.setView([labData.lab.lat, labData.lab.lon], 15);
  labData.marker.openPopup();
}

// ==================== GLOBAL MAPS ====================
function initMaps() {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;
  
  try {
    AppState.map = L.map('map').setView([20, 0], 2);
    
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Esri',
      maxZoom: 22
    }).addTo(AppState.map);
    
    AppState.markerCluster = L.markerClusterGroup();
    AppState.map.addLayer(AppState.markerCluster);
    
    AppState.map.on('zoomend', () => {
      const zoom = AppState.map.getZoom();
      const zoomInfo = document.getElementById('zoom-info');
      if (zoomInfo) {
        zoomInfo.textContent = `Zoom: ${zoom} | Max: 22 (ULTRA HD)`;
      }
    });
  } catch (error) {
    console.error('Global map error:', error);
  }
}

// ==================== MODAL ====================
function openModal(type, data) {
  const modal = document.getElementById('detail-modal');
  const content = document.getElementById('modal-content');
  
  if (!modal || !content) return;
  
  if (typeof data === 'object' && data.title && data.content) {
    content.innerHTML = `
      <h2 class="text-primary mb-lg">${data.title}</h2>
      ${data.content}
    `;
  } else {
    content.innerHTML = '<div class="text-secondary">Loading...</div>';
  }
  
  modal.classList.add('modal--active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('detail-modal');
  if (modal) {
    modal.classList.remove('modal--active');
    document.body.style.overflow = '';
  }
}

// ==================== PANEL TOGGLE ====================
function togglePanel(panelId) {
  const panel = document.getElementById(`${panelId}-panel`);
  if (!panel) return;
  
  const isHidden = panel.style.display === 'none';
  panel.style.display = isHidden ? 'block' : 'none';
  
  const btn = event.target;
  if (btn) {
    btn.textContent = isHidden ? `HIDE ${panelId.toUpperCase()}` : `SHOW ${panelId.toUpperCase()}`;
  }
}

function filterNews(query) {
  const filtered = query 
    ? AppState.allNews.filter(story => 
        story.title.toLowerCase().includes(query.toLowerCase())
      )
    : AppState.allNews;
  
  const container = document.getElementById('news-container');
  if (!container) return;
  
  container.innerHTML = filtered.map(story => `
    <div class="item item--clickable" onclick="openNewsDetail(${story.id})">
      <h3 class="item__title">${sanitizeHTML(story.title)}</h3>
      <div class="item__meta">
        <span class="tag">👍 ${story.score || 0} points</span>
        <span class="tag">💬 ${story.descendants || 0} comments</span>
      </div>
      <div class="timestamp">${formatTime(story.time * 1000)}</div>
      ${story.url ? `<a href="${story.url}" target="_blank" class="item__link" onclick="event.stopPropagation()">🔗 Read Article</a>` : ''}
    </div>
  `).join('');
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

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
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

function updateCount(elementId, count) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = count;
  }
}

function showError(message) {
  console.error(message);
  alert(message);
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  
  // Enter key sends chat message
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
  
  // Enter key sets nickname
  const nicknameInput = document.getElementById('chat-nickname');
  if (nicknameInput) {
    nicknameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') setNickname();
    });
  }
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
window.openNewsDetail = openNewsDetail;
window.openResearchDetail = openResearchDetail;
window.openBreakthroughDetail = openBreakthroughDetail;

console.log('✅ Tech Mastery Lab - Fully Loaded!');
