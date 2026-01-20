// 🎯 TECH MASTERY LAB - COMPLETE WORKING VERSION
'use strict';

// ==================== STATE MANAGEMENT ====================
const AppState = {
  allNews: [],
  allReddit: [],
  allGitHub: [],
  allResearch: [],
  currentRoom: 'general',
  chatMessages: {},
  quizQuestions: [],
  currentQuiz: [],
  currentQuestionIndex: 0,
  quizScore: 0,
  selectedCategory: 'all',
  quizMode: null,
  userXP: parseInt(localStorage.getItem('userXP')) || 0,
  userLevel: parseInt(localStorage.getItem('userLevel')) || 1
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Tech Mastery Lab Starting...');
  
  initMatrix();
  loadAllData();
  initChat();
  initQuiz();
  initCommunities();
  
  console.log('✅ All systems ready!');
});

// ==================== MATRIX BACKGROUND ====================
function initMatrix() {
  const canvas = document.getElementById('matrix');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const chars = '01アイウエオカキクケコサシスセソタチツテト';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);
  
  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
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
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ==================== DATA LOADING ====================
async function loadAllData() {
  console.log('📊 Loading all data...');
  
  updateLastUpdate();
  
  await Promise.all([
    loadHackerNews(),
    loadGitHubTrending(),
    loadRedditPosts(),
    loadResearchPapers()
  ]);
  
  console.log('✅ All data loaded!');
}

function updateLastUpdate() {
  const el = document.getElementById('last-update');
  if (el) {
    el.textContent = `Last Updated: ${new Date().toLocaleString()}`;
  }
}

// ==================== HACKER NEWS ====================
async function loadHackerNews() {
  try {
    console.log('📰 Loading Hacker News...');
    
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = await response.json();
    
    const stories = await Promise.all(
      storyIds.slice(0, 50).map(async id => {
        try {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return await res.json();
        } catch {
          return null;
        }
      })
    );
    
    AppState.allNews = stories.filter(s => s && s.title);
    displayNews(AppState.allNews);
    updateCount('news-count', AppState.allNews.length);
    
  } catch (error) {
    console.log('Using fallback news data');
    AppState.allNews = getFallbackNews();
    displayNews(AppState.allNews);
    updateCount('news-count', AppState.allNews.length);
  }
}

function getFallbackNews() {
  return [
    {
      id: 1,
      title: "Show HN: I built a real-time tech intelligence platform",
      by: "techbuilder",
      score: 1250,
      time: Date.now() / 1000,
      descendants: 180,
      url: "https://news.ycombinator.com"
    },
    {
      id: 2,
      title: "Ask HN: What's the best way to learn system design?",
      by: "learner",
      score: 890,
      time: Date.now() / 1000 - 3600,
      descendants: 145,
      type: "ask"
    },
    {
      id: 3,
      title: "New JavaScript framework achieves 10x faster rendering",
      by: "jsdev",
      score: 2100,
      time: Date.now() / 1000 - 7200,
      descendants: 320,
      url: "https://example.com/js-framework"
    },
    {
      id: 4,
      title: "Show HN: Open source alternative to Notion built with React",
      by: "opensource",
      score: 1580,
      time: Date.now() / 1000 - 10800,
      descendants: 210,
      url: "https://github.com/example/notion-clone"
    },
    {
      id: 5,
      title: "How we reduced our AWS costs by 80% with simple optimizations",
      by: "cloudeng",
      score: 1920,
      time: Date.now() / 1000 - 14400,
      descendants: 156,
      url: "https://blog.example.com/aws-optimization"
    }
  ];
}

function displayNews(news) {
  const container = document.getElementById('news-list');
  if (!container) return;
  
  container.innerHTML = news.map(item => `
    <div class="list-item" onclick="showNewsDetail(${item.id})">
      <div class="list-item__header">
        <h3 class="list-item__title">${item.title}</h3>
        <span class="list-item__score">⭐ ${item.score || 0}</span>
      </div>
      <div class="list-item__meta">
        <span>👤 ${item.by || 'Anonymous'}</span>
        <span>💬 ${item.descendants || 0} comments</span>
        <span>🕐 ${formatTime(item.time)}</span>
      </div>
    </div>
  `).join('');
}

window.showNewsDetail = function(id) {
  const item = AppState.allNews.find(n => n.id === id);
  if (!item) return;
  
  const modal = document.getElementById('detail-modal');
  const modalBody = document.getElementById('modal-body');
  
  const hostname = item.url ? new URL(item.url).hostname : 'news.ycombinator.com';
  
  modalBody.innerHTML = `
    <div class="modal-detail">
      <h2>${item.title}</h2>
      <div class="modal-detail__meta">
        <span>👤 ${item.by || 'Anonymous'}</span>
        <span>⭐ ${item.score || 0} points</span>
        <span>💬 ${item.descendants || 0} comments</span>
      </div>
      
      ${item.url ? `
        <div class="modal-detail__info">
          <p>📰 This is a link post. Click "Read Full Article" below to view the complete content on the original website.</p>
          <p class="modal-detail__url">🔗 Source: ${hostname}</p>
        </div>
      ` : item.text ? `
        <div class="modal-detail__text">${item.text}</div>
      ` : ''}
      
      <div class="modal-detail__actions">
        ${item.url ? `
          <a href="${item.url}" target="_blank" class="btn btn--primary btn--large">📖 Read Full Article</a>
        ` : ''}
        <a href="https://news.ycombinator.com/item?id=${item.id}" target="_blank" class="btn btn--secondary">
          💬 View Discussion (${item.descendants || 0} comments)
        </a>
      </div>
    </div>
  `;
  
  modal.classList.add('modal--active');
  addXP(2, 'Read news article');
};

// ==================== GITHUB TRENDING ====================
async function loadGitHubTrending() {
  try {
    console.log('💻 Loading GitHub trending...');
    
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dateStr = lastWeek.toISOString().split('T')[0];
    
    const response = await fetch(`https://api.github.com/search/repositories?q=created:>${dateStr}&sort=stars&order=desc&per_page=50`);
    const data = await response.json();
    
    AppState.allGitHub = data.items || [];
    displayGitHub(AppState.allGitHub);
    updateCount('github-count', AppState.allGitHub.length);
    
  } catch (error) {
    console.log('Using fallback GitHub data');
    AppState.allGitHub = getFallbackGitHub();
    displayGitHub(AppState.allGitHub);
    updateCount('github-count', AppState.allGitHub.length);
  }
}

function getFallbackGitHub() {
  return [
    {
      name: "awesome-ai-tools",
      full_name: "developer/awesome-ai-tools",
      description: "A curated list of awesome AI tools and resources for developers",
      stargazers_count: 25000,
      forks_count: 3500,
      language: "Python",
      html_url: "https://github.com/developer/awesome-ai-tools",
      topics: ["ai", "machine-learning", "tools"]
    },
    {
      name: "react-super-components",
      full_name: "reactdev/react-super-components",
      description: "Beautiful, accessible React components for modern web apps",
      stargazers_count: 18500,
      forks_count: 2200,
      language: "TypeScript",
      html_url: "https://github.com/reactdev/react-super-components",
      topics: ["react", "components", "ui"]
    },
    {
      name: "rust-web-framework",
      full_name: "rustlang/rust-web-framework",
      description: "Fast and secure web framework built with Rust",
      stargazers_count: 15000,
      forks_count: 1800,
      language: "Rust",
      html_url: "https://github.com/rustlang/rust-web-framework",
      topics: ["rust", "web", "framework"]
    }
  ];
}

function displayGitHub(repos) {
  const container = document.getElementById('github-list');
  if (!container) return;
  
  container.innerHTML = repos.map(repo => `
    <div class="list-item" onclick="showGitHubDetail('${repo.full_name}')">
      <div class="list-item__header">
        <h3 class="list-item__title">${repo.name}</h3>
        <span class="list-item__score">⭐ ${repo.stargazers_count.toLocaleString()}</span>
      </div>
      <p class="list-item__description">${repo.description || 'No description'}</p>
      <div class="list-item__meta">
        <span>💻 ${repo.language || 'Unknown'}</span>
        <span>🔱 ${repo.forks_count.toLocaleString()} forks</span>
      </div>
    </div>
  `).join('');
}

window.showGitHubDetail = function(fullName) {
  const repo = AppState.allGitHub.find(r => r.full_name === fullName);
  if (!repo) return;
  
  const modal = document.getElementById('detail-modal');
  const modalBody = document.getElementById('modal-body');
  
  modalBody.innerHTML = `
    <div class="modal-detail">
      <h2>${repo.name}</h2>
      <p class="modal-detail__text">${repo.description || 'No description available'}</p>
      
      <div class="modal-detail__meta">
        <span>⭐ ${repo.stargazers_count.toLocaleString()} stars</span>
        <span>🔱 ${repo.forks_count.toLocaleString()} forks</span>
        <span>💻 ${repo.language || 'Unknown'}</span>
      </div>
      
      <div class="modal-detail__actions">
        <a href="${repo.html_url}" target="_blank" class="btn btn--primary btn--large">
          📖 View on GitHub
        </a>
      </div>
    </div>
  `;
  
  modal.classList.add('modal--active');
  addXP(2, 'Viewed GitHub repo');
};

// ==================== REDDIT ====================
async function loadRedditPosts() {
  try {
    console.log('🕵️ Loading Reddit posts...');
    
    const subreddits = ['programming', 'technology', 'webdev'];
    const allPosts = [];
    
    for (const sub of subreddits) {
      try {
        const response = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=15`);
        const data = await response.json();
        
        data.data.children.forEach(child => {
          allPosts.push({
            ...child.data,
            subreddit_name: sub
          });
        });
      } catch (err) {
        console.log(`Failed to fetch r/${sub}`);
      }
    }
    
    AppState.allReddit = allPosts.slice(0, 50);
    displayReddit(AppState.allReddit);
    updateCount('reddit-count', AppState.allReddit.length);
    
  } catch (error) {
    console.log('Using fallback Reddit data');
    AppState.allReddit = getFallbackReddit();
    displayReddit(AppState.allReddit);
    updateCount('reddit-count', AppState.allReddit.length);
  }
}

function getFallbackReddit() {
  return [
    {
      title: "What's your favorite programming language and why?",
      author: "dev_enthusiast",
      subreddit: "programming",
      score: 1250,
      num_comments: 340,
      url: "https://reddit.com/r/programming",
      created_utc: Date.now() / 1000,
      subreddit_name: "programming"
    },
    {
      title: "I built a full-stack app in 48 hours - here's what I learned",
      author: "weekend_coder",
      subreddit: "webdev",
      score: 890,
      num_comments: 156,
      url: "https://reddit.com/r/webdev",
      created_utc: Date.now() / 1000 - 3600,
      subreddit_name: "webdev"
    },
    {
      title: "The future of AI: What developers need to know in 2025",
      author: "ai_researcher",
      subreddit: "technology",
      score: 2100,
      num_comments: 420,
      url: "https://reddit.com/r/technology",
      created_utc: Date.now() / 1000 - 7200,
      subreddit_name: "technology"
    }
  ];
}

function displayReddit(posts) {
  const container = document.getElementById('reddit-list');
  if (!container) return;
  
  container.innerHTML = posts.map(post => `
    <div class="list-item">
      <div class="list-item__header">
        <h3 class="list-item__title">${post.title}</h3>
        <span class="list-item__score">⬆️ ${post.score}</span>
      </div>
      <div class="list-item__meta">
        <span>👤 u/${post.author}</span>
        <span>📍 r/${post.subreddit_name}</span>
        <span>💬 ${post.num_comments} comments</span>
      </div>
      <div class="list-item__actions">
        <a href="https://reddit.com${post.permalink || ''}" target="_blank" class="btn btn--small">View Post</a>
      </div>
    </div>
  `).join('');
}

// ==================== RESEARCH PAPERS ====================
function loadResearchPapers() {
  console.log('🔬 Loading research papers...');
  
  if (window.RESEARCH_PAPERS && window.RESEARCH_PAPERS.length > 0) {
    AppState.allResearch = window.RESEARCH_PAPERS;
    displayResearch(AppState.allResearch);
    updateCount('research-count', AppState.allResearch.length);
  }
}

function displayResearch(papers) {
  const container = document.getElementById('research-list');
  if (!container) return;
  
  container.innerHTML = papers.map((paper, index) => `
    <div class="list-item" onclick="showResearchDetail(${index})">
      <div class="list-item__header">
        <h3 class="list-item__title">${paper.title}</h3>
        <span class="list-item__badge">${paper.year}</span>
      </div>
      <p class="list-item__description">${paper.authors.join(', ')}</p>
      <div class="list-item__meta">
        <span>📚 ${paper.category}</span>
        <span>🎓 ${paper.venue}</span>
      </div>
    </div>
  `).join('');
}

window.showResearchDetail = function(index) {
  const paper = AppState.allResearch[index];
  if (!paper) return;
  
  const modal = document.getElementById('detail-modal');
  const modalBody = document.getElementById('modal-body');
  
  modalBody.innerHTML = `
    <div class="modal-detail">
      <h2>${paper.title}</h2>
      
      <div class="modal-detail__authors">
        <strong>Authors:</strong> ${paper.authors.join(', ')}
      </div>
      
      <div class="modal-detail__meta">
        <span>📅 ${paper.year}</span>
        <span>📚 ${paper.category}</span>
        <span>🎓 ${paper.venue}</span>
      </div>
      
      <div class="modal-detail__text">
        <h4>Abstract:</h4>
        <p>${paper.abstract}</p>
      </div>
      
      ${paper.impact ? `
        <div class="modal-detail__section">
          <h4>Impact:</h4>
          <p>${paper.impact}</p>
        </div>
      ` : ''}
      
      <div class="modal-detail__actions">
        ${paper.arxiv ? `
          <a href="${paper.arxiv}" target="_blank" class="btn btn--primary">📄 Read on arXiv</a>
        ` : ''}
        ${paper.pdf ? `
          <a href="${paper.pdf}" target="_blank" class="btn btn--secondary">📥 Download PDF</a>
        ` : ''}
      </div>
    </div>
  `;
  
  modal.classList.add('modal--active');
  addXP(3, 'Read research paper');
};

// ==================== CHAT SYSTEM ====================
function initChat() {
  console.log('💬 Initializing chat...');
  
  // Initialize chat rooms
  const rooms = ['general', 'ai-ml', 'space', 'coding', 'career', 'india', 'quiz', 'research'];
  rooms.forEach(room => {
    AppState.chatMessages[room] = [];
  });
  
  // Add welcome message
  addChatMessage('general', 'system', 'Welcome to Tech Mastery Lab! Ask me anything about tech, programming, AI, or use commands like "quiz", "news", "research"!');
}

window.switchRoom = function(room) {
  AppState.currentRoom = room;
  
  // Update UI
  document.querySelectorAll('.chat-room').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  document.getElementById('current-room-name').textContent = room.charAt(0).toUpperCase() + room.slice(1);
  
  displayChatMessages();
};

window.sendChatMessage = function() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  addChatMessage(AppState.currentRoom, 'user', message);
  input.value = '';
  
  // Generate AI response
  setTimeout(() => {
    const response = generateAIResponse(message);
    addChatMessage(AppState.currentRoom, 'ai', response);
    addXP(2, 'Chat message');
  }, 500);
};

window.handleChatKeyPress = function(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
};

function addChatMessage(room, sender, text) {
  AppState.chatMessages[room].push({
    sender,
    text,
    time: new Date().toLocaleTimeString()
  });
  
  if (room === AppState.currentRoom) {
    displayChatMessages();
  }
}

function displayChatMessages() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  
  const messages = AppState.chatMessages[AppState.currentRoom] || [];
  
  container.innerHTML = messages.map(msg => `
    <div class="chat-message chat-message--${msg.sender}">
      <div class="chat-message__header">
        <span class="chat-message__sender">${msg.sender === 'user' ? 'You' : msg.sender === 'ai' ? '🤖 AI Assistant' : 'System'}</span>
        <span class="chat-message__time">${msg.time}</span>
      </div>
      <div class="chat-message__text">${msg.text}</div>
    </div>
  `).join('');
  
  container.scrollTop = container.scrollHeight;
}

function generateAIResponse(message) {
  const lower = message.toLowerCase();
  
  // Greetings
  if (lower.match(/^(hi|hello|hey|namaste)/)) {
    return "Hello! 👋 I'm your AI assistant. I can help you with tech questions, programming concepts, career advice, or guide you through our features like quiz, news, and research papers. What would you like to know?";
  }
  
  // Quiz
  if (lower.includes('quiz')) {
    return "🧠 Ready for a quiz? Head to the Quiz tab and choose from 8 categories: Web Dev, AI/ML, Mobile, Cloud, Security, Blockchain, and more! You can try Quick (10Q), Timed (20Q), or Practice (50Q) modes. Each correct answer earns you XP!";
  }
  
  // News
  if (lower.includes('news')) {
    return "📰 Check out the News tab for the latest from Hacker News! We have top tech stories updated every 5 minutes. Click any story to read the full article and join discussions. You earn 2 XP for each article you read!";
  }
  
  // Research
  if (lower.includes('research') || lower.includes('paper')) {
    return "🔬 Explore the Research tab for 30 famous computer science papers! From Turing's foundational work to modern deep learning breakthroughs. Each paper includes full abstracts and links to arXiv. Reading papers earns you 3 XP!";
  }
  
  // GitHub
  if (lower.includes('github')) {
    return "💻 Visit the GitHub tab to discover trending repositories! We show the hottest repos from the past week with stars, forks, and languages. Great for finding new projects to contribute to or learn from!";
  }
  
  // Communities
  if (lower.includes('communit')) {
    return "🌐 Join 40+ tech communities in the Communities tab! From Hacker News to Dev.to, Reddit to Stack Overflow. Each community you join earns you 5 XP. Build your network and stay connected!";
  }
  
  // Programming help
  if (lower.includes('learn') || lower.includes('how to')) {
    return "📚 Great question! For learning resources, I recommend:\n\n1. **FreeCodeCamp** - Interactive coding lessons\n2. **MDN Web Docs** - Best web development reference\n3. **LeetCode** - Practice coding problems\n4. **YouTube** - Tons of free tutorials\n5. **Our Research tab** - Read foundational CS papers\n\nWhat specific topic are you interested in?";
  }
  
  // Career advice
  if (lower.includes('career') || lower.includes('job')) {
    return "💼 Career advice:\n\n1. **Build projects** - Nothing beats hands-on experience\n2. **Contribute to open source** - Check our GitHub tab\n3. **Network** - Join communities from our Communities tab\n4. **Keep learning** - Take our quizzes, read research papers\n5. **Stay updated** - Follow tech news daily\n\nWhat aspect of your career would you like to focus on?";
  }
  
  // AI/ML
  if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('ml')) {
    return "🤖 AI/ML is fascinating! Here's what I recommend:\n\n1. **Start with basics** - Python, NumPy, Pandas\n2. **Learn theory** - Check our Research tab for foundational papers\n3. **Practice** - Kaggle competitions\n4. **Stay updated** - Follow AI news in our News tab\n5. **Take our AI/ML quiz** - Test your knowledge!\n\nWant specific resource recommendations?";
  }
  
  // Default responses
  const responses = [
    "That's an interesting question! Based on current tech trends, I'd say it's important to focus on fundamentals while staying updated with new technologies. What specific aspect would you like to explore?",
    "Great point! In the tech world, continuous learning is key. Have you checked out our Quiz section to test your knowledge? Or browse the Research tab for deep dives into CS concepts?",
    "I can help with that! Tech Mastery Lab has everything you need - from latest news to research papers, GitHub trends to community connections. Which area interests you most?",
    "Excellent question! The best way to learn is by doing. Try building projects, contributing to open source (check our GitHub tab), and staying curious. Want some specific project ideas?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// ==================== QUIZ SYSTEM ====================
function initQuiz() {
  console.log('🧠 Initializing quiz...');
  
  if (window.QUIZ_QUESTIONS) {
    AppState.quizQuestions = window.QUIZ_QUESTIONS;
    updateCount('quiz-count', AppState.quizQuestions.length);
  }
}

window.selectQuizCategory = function(category, button) {
  AppState.selectedCategory = category;
  
  document.querySelectorAll('.quiz-categories .btn').forEach(btn => {
    btn.classList.remove('btn--active');
  });
  button.classList.add('btn--active');
};

window.startQuiz = function(mode) {
  AppState.quizMode = mode;
  AppState.currentQuestionIndex = 0;
  AppState.quizScore = 0;
  
  // Filter questions by category
  let questions = AppState.selectedCategory === 'all' 
    ? AppState.quizQuestions 
    : AppState.quizQuestions.filter(q => q.category === AppState.selectedCategory);
  
  // Shuffle and select questions based on mode
  questions = shuffleArray(questions);
  
  const questionCount = mode === 'quick' ? 10 : mode === 'timed' ? 20 : 50;
  AppState.currentQuiz = questions.slice(0, questionCount);
  
  // Start timer for timed mode
  if (mode === 'timed') {
    AppState.quizTimeLeft = 600; // 10 minutes
    startQuizTimer();
  }
  
  displayQuestion();
};

function displayQuestion() {
  const container = document.getElementById('quiz-content');
  const question = AppState.currentQuiz[AppState.currentQuestionIndex];
  
  if (!question) {
    showQuizResults();
    return;
  }
  
  container.innerHTML = `
    <div class="quiz-question">
      <div class="quiz-progress">
        Question ${AppState.currentQuestionIndex + 1} of ${AppState.currentQuiz.length}
      </div>
      
      <h3 class="quiz-question__text">${question.question}</h3>
      
      <div class="quiz-options">
        ${question.options.map((option, index) => `
          <button class="quiz-option" onclick="selectAnswer(${index})">
            ${option}
          </button>
        `).join('')}
      </div>
    </div>
  `;
  
  document.getElementById('quiz-score').textContent = AppState.quizScore;
}

window.selectAnswer = function(selectedIndex) {
  const question = AppState.currentQuiz[AppState.currentQuestionIndex];
  const isCorrect = selectedIndex === question.correct;
  
  if (isCorrect) {
    AppState.quizScore++;
    addXP(10, 'Correct quiz answer');
  }
  
  // Show feedback
  const options = document.querySelectorAll('.quiz-option');
  options[selectedIndex].classList.add(isCorrect ? 'correct' : 'wrong');
  options[question.correct].classList.add('correct');
  
  // Disable all options
  options.forEach(opt => opt.disabled = true);
  
  // Next question after delay
  setTimeout(() => {
    AppState.currentQuestionIndex++;
    displayQuestion();
  }, 1500);
};

function showQuizResults() {
  const container = document.getElementById('quiz-content');
  const percentage = Math.round((AppState.quizScore / AppState.currentQuiz.length) * 100);
  
  container.innerHTML = `
    <div class="quiz-results">
      <h2>🎉 Quiz Complete!</h2>
      <div class="quiz-results__score">
        <div class="score-big">${AppState.quizScore} / ${AppState.currentQuiz.length}</div>
        <div class="score-percentage">${percentage}%</div>
      </div>
      <p class="quiz-results__message">
        ${percentage >= 80 ? '🌟 Excellent work!' : percentage >= 60 ? '👍 Good job!' : '💪 Keep practicing!'}
      </p>
      <button class="btn btn--primary" onclick="location.reload()">Take Another Quiz</button>
    </div>
  `;
  
  addXP(50, 'Completed quiz');
}

function startQuizTimer() {
  const display = document.getElementById('quiz-timer-display');
  display.style.display = 'block';
  
  AppState.quizTimer = setInterval(() => {
    AppState.quizTimeLeft--;
    
    const minutes = Math.floor(AppState.quizTimeLeft / 60);
    const seconds = AppState.quizTimeLeft % 60;
    document.getElementById('quiz-timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (AppState.quizTimeLeft <= 0) {
      clearInterval(AppState.quizTimer);
      showQuizResults();
    }
  }, 1000);
}

// ==================== COMMUNITIES ====================
function initCommunities() {
  console.log('🌐 Initializing communities...');
  
  if (window.COMMUNITIES) {
    displayCommunities(window.COMMUNITIES);
  }
}

function displayCommunities(communities) {
  const container = document.getElementById('communities-content');
  if (!container) return;
  
  container.innerHTML = `
    <div class="communities-grid">
      ${communities.map(comm => `
        <div class="community-card">
          <div class="community-card__header">
            <h3>${comm.name}</h3>
            <span class="community-card__badge">${comm.category}</span>
          </div>
          <p class="community-card__description">${comm.description}</p>
          <div class="community-card__stats">
            <span>👥 ${comm.members}</span>
          </div>
          <div class="community-card__actions">
            <a href="${comm.url}" target="_blank" class="btn btn--primary btn--small">Visit</a>
            <button class="btn btn--secondary btn--small" onclick="joinCommunity('${comm.name}')">Join</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

window.joinCommunity = function(name) {
  addXP(5, `Joined ${name}`);
  alert(`✅ Joined ${name}! +5 XP`);
};

// ==================== UTILITIES ====================
function updateCount(id, count) {
  const el = document.getElementById(id);
  if (el) el.textContent = count;
}

function formatTime(timestamp) {
  const now = Date.now() / 1000;
  const diff = now - timestamp;
  
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function addXP(amount, reason) {
  AppState.userXP += amount;
  localStorage.setItem('userXP', AppState.userXP);
  
  // Check level up
  const newLevel = Math.floor(AppState.userXP / 100) + 1;
  if (newLevel > AppState.userLevel) {
    AppState.userLevel = newLevel;
    localStorage.setItem('userLevel', AppState.userLevel);
    showLevelUp(newLevel);
  }
  
  console.log(`+${amount} XP: ${reason}`);
}

function showLevelUp(level) {
  alert(`🎉 Level Up! You're now Level ${level}!`);
}

window.closeModal = function() {
  const modal = document.getElementById('detail-modal');
  modal.classList.remove('modal--active');
};

// Search functions
window.searchNews = function() {
  const query = document.getElementById('news-search').value.toLowerCase();
  const filtered = AppState.allNews.filter(item => 
    item.title.toLowerCase().includes(query)
  );
  displayNews(filtered);
};

window.searchResearch = function() {
  const query = document.getElementById('research-search').value.toLowerCase();
  const filtered = AppState.allResearch.filter(paper => 
    paper.title.toLowerCase().includes(query) || 
    paper.authors.some(a => a.toLowerCase().includes(query))
  );
  displayResearch(filtered);
};

window.searchGitHub = function() {
  const query = document.getElementById('github-search').value.toLowerCase();
  const filtered = AppState.allGitHub.filter(repo => 
    repo.name.toLowerCase().includes(query) || 
    (repo.description && repo.description.toLowerCase().includes(query))
  );
  displayGitHub(filtered);
};

window.searchReddit = function() {
  const query = document.getElementById('reddit-search').value.toLowerCase();
  const filtered = AppState.allReddit.filter(post => 
    post.title.toLowerCase().includes(query)
  );
  displayReddit(filtered);
};

console.log('✅ Tech Mastery Lab Ready!');
