// 🇮🇳 TECH MASTERY LAB - COMPLETE SYSTEM
let allNews = [];
let allReddit = [];
let allGitHub = [];
let allResearch = [];
let map;
let indianLabsMap;
let markers = [];
let indianMarkers = [];
let markerCluster;
let indianMarkerCluster;
let allLocations = [];
let newsPage = 1;
let isLoading = false;

// CHAT SYSTEM
let currentRoom = 'general';
let currentUser = null;
let chatMessages = {};

// QUIZ SYSTEM
let quizQuestions = [];
let currentQuiz = [];
let currentQuestionIndex = 0;
let quizScore = 0;
let quizTimer = null;
let quizTimeLeft = 0;
let selectedCategory = 'all';
let quizMode = null;

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initMatrix();
  initMaps();
  loadAllData();
  initChat();
  initQuiz();
  initIndianLabs();
  setupEventListeners();
});

// Matrix background
function initMatrix() {
  const canvas = document.getElementById('matrix');
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
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(draw, 33);
}

// ==================== CHAT SYSTEM ====================

function initChat() {
  // Initialize chat rooms
  chatMessages = {
    general: [
      { user: 'System', text: 'Welcome to General Tech Talk! 💬', time: Date.now(), system: true }
    ],
    ai: [
      { user: 'System', text: 'Welcome to AI/ML Discussion! 🤖', time: Date.now(), system: true }
    ],
    space: [
      { user: 'System', text: 'Welcome to Space & ISRO! 🚀', time: Date.now(), system: true }
    ],
    coding: [
      { user: 'System', text: 'Welcome to Coding Help! 💻', time: Date.now(), system: true }
    ],
    career: [
      { user: 'System', text: 'Welcome to Career Guidance! 🎓', time: Date.now(), system: true }
    ],
    india: [
      { user: 'System', text: 'Welcome to Indian Tech Scene! 🇮🇳', time: Date.now(), system: true }
    ],
    quiz: [
      { user: 'System', text: 'Welcome to Quiz Arena! 🎮', time: Date.now(), system: true }
    ],
    research: [
      { user: 'System', text: 'Welcome to Research Papers! 🔬', time: Date.now(), system: true }
    ]
  };
  
  // Setup room switching
  document.querySelectorAll('.chat-room').forEach(room => {
    room.addEventListener('click', () => {
      document.querySelectorAll('.chat-room').forEach(r => r.classList.remove('active'));
      room.classList.add('active');
      currentRoom = room.dataset.room;
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

function setNickname() {
  const input = document.getElementById('chat-nickname');
  const nickname = input.value.trim();
  
  if (!nickname) {
    alert('Please enter a nickname!');
    return;
  }
  
  if (nickname.length < 2) {
    alert('Nickname must be at least 2 characters!');
    return;
  }
  
  currentUser = nickname;
  
  // Hide nickname input, show chat input
  input.parentElement.style.display = 'none';
  document.getElementById('chat-input-container').style.display = 'flex';
  
  // Add welcome message
  chatMessages[currentRoom].push({
    user: 'System',
    text: `${nickname} joined the chat! 👋`,
    time: Date.now(),
    system: true
  });
  
  displayChatMessages();
}

function sendMessage() {
  if (!currentUser) {
    alert('Please set your nickname first!');
    return;
  }
  
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add message to current room
  chatMessages[currentRoom].push({
    user: currentUser,
    text: message,
    time: Date.now(),
    own: true
  });
  
  input.value = '';
  displayChatMessages();
  
  // Simulate bot response for demo
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
    
    chatMessages[currentRoom].push({
      user: 'TechBot',
      text: responses[Math.floor(Math.random() * responses.length)],
      time: Date.now()
    });
    
    displayChatMessages();
  }, 1000 + Math.random() * 2000);
}

function displayChatMessages() {
  const container = document.getElementById('chat-messages');
  const messages = chatMessages[currentRoom] || [];
  
  container.innerHTML = messages.map(msg => {
    const timeStr = new Date(msg.time).toLocaleTimeString();
    const ownClass = msg.own ? 'own' : '';
    const systemClass = msg.system ? 'system' : '';
    
    return `
      <div class="chat-message ${ownClass} ${systemClass}">
        <div class="chat-user">${msg.user}</div>
        <div class="chat-text">${msg.text}</div>
        <div class="chat-time">${timeStr}</div>
      </div>
    `;
  }).join('');
  
  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

// ==================== QUIZ SYSTEM ====================

function initQuiz() {
  quizQuestions = QUIZ_QUESTIONS || [];
  
  // Load saved score
  const savedScore = localStorage.getItem('quiz-high-score');
  if (savedScore) {
    document.getElementById('quiz-score').textContent = savedScore;
  }
}

function selectQuizCategory(category) {
  selectedCategory = category;
  
  // Update active tab
  document.querySelectorAll('.tabs .tab').forEach(tab => {
    tab.classList.remove('active');
  });
  event.target.classList.add('active');
}

function startQuiz(mode) {
  quizMode = mode;
  quizScore = 0;
  currentQuestionIndex = 0;
  
  // Filter questions by category
  let questions = selectedCategory === 'all' 
    ? [...quizQuestions]
    : quizQuestions.filter(q => q.category === selectedCategory);
  
  // Shuffle questions
  questions = questions.sort(() => Math.random() - 0.5);
  
  // Select questions based on mode
  if (mode === 'quick') {
    currentQuiz = questions.slice(0, 10);
    quizTimeLeft = 0; // No timer
  } else if (mode === 'timed') {
    currentQuiz = questions.slice(0, 20);
    quizTimeLeft = 600; // 10 minutes
    startQuizTimer();
  } else {
    currentQuiz = questions.slice(0, 50);
    quizTimeLeft = 0; // No timer
  }
  
  displayQuestion();
}

function startQuizTimer() {
  if (quizTimer) clearInterval(quizTimer);
  
  quizTimer = setInterval(() => {
    quizTimeLeft--;
    
    const minutes = Math.floor(quizTimeLeft / 60);
    const seconds = quizTimeLeft % 60;
    document.getElementById('quiz-timer').textContent = 
      `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (quizTimeLeft <= 0) {
      clearInterval(quizTimer);
      endQuiz();
    }
  }, 1000);
}

function displayQuestion() {
  if (currentQuestionIndex >= currentQuiz.length) {
    endQuiz();
    return;
  }
  
  const question = currentQuiz[currentQuestionIndex];
  const content = document.getElementById('quiz-content');
  
  content.innerHTML = `
    <div class="quiz-question">
      <div style="color:#0a0;margin-bottom:15px">
        Question ${currentQuestionIndex + 1} of ${currentQuiz.length} | 
        Category: ${question.category} | 
        Difficulty: ${question.difficulty.toUpperCase()}
      </div>
      
      <div class="question-text">${question.question}</div>
      
      <div class="quiz-options">
        ${question.options.map((option, index) => `
          <div class="quiz-option" onclick="selectAnswer(${index})">
            ${String.fromCharCode(65 + index)}. ${option}
          </div>
        `).join('')}
      </div>
      
      <div id="quiz-explanation" style="display:none"></div>
      
      <div class="quiz-controls">
        <button class="quiz-btn" onclick="skipQuestion()">SKIP</button>
        <button class="quiz-btn" onclick="endQuiz()">END QUIZ</button>
      </div>
    </div>
  `;
  
  // Update score display
  document.getElementById('quiz-score').textContent = quizScore;
}

function selectAnswer(selectedIndex) {
  const question = currentQuiz[currentQuestionIndex];
  const options = document.querySelectorAll('.quiz-option');
  
  // Disable all options
  options.forEach(opt => opt.style.pointerEvents = 'none');
  
  // Show correct/wrong
  options[selectedIndex].classList.add(
    selectedIndex === question.correct ? 'correct' : 'wrong'
  );
  options[question.correct].classList.add('correct');
  
  // Update score
  if (selectedIndex === question.correct) {
    quizScore += question.difficulty === 'easy' ? 10 : 
                  question.difficulty === 'medium' ? 20 : 30;
    document.getElementById('quiz-score').textContent = quizScore;
  }
  
  // Show explanation
  const explanationDiv = document.getElementById('quiz-explanation');
  explanationDiv.innerHTML = `
    <div class="quiz-explanation">
      <strong>Explanation:</strong> ${question.explanation}
    </div>
  `;
  explanationDiv.style.display = 'block';
  
  // Auto-advance after 3 seconds
  setTimeout(() => {
    currentQuestionIndex++;
    displayQuestion();
  }, 3000);
}

function skipQuestion() {
  currentQuestionIndex++;
  displayQuestion();
}

function endQuiz() {
  if (quizTimer) clearInterval(quizTimer);
  
  const percentage = Math.round((quizScore / (currentQuiz.length * 30)) * 100);
  
  // Save high score
  const highScore = parseInt(localStorage.getItem('quiz-high-score') || '0');
  if (quizScore > highScore) {
    localStorage.setItem('quiz-high-score', quizScore);
  }
  
  const content = document.getElementById('quiz-content');
  content.innerHTML = `
    <div style="text-align:center;padding:50px">
      <h2 style="color:#0ff;margin-bottom:20px">🎉 QUIZ COMPLETED!</h2>
      
      <div style="font-size:3em;color:#0f0;margin:30px 0">
        ${quizScore} POINTS
      </div>
      
      <div style="color:#0f0;font-size:1.5em;margin:20px 0">
        ${percentage}% Correct
      </div>
      
      <div style="color:#0a0;margin:20px 0">
        Questions: ${currentQuestionIndex} / ${currentQuiz.length}<br>
        Mode: ${quizMode.toUpperCase()}<br>
        Category: ${selectedCategory === 'all' ? 'ALL' : selectedCategory}
      </div>
      
      ${quizScore > highScore ? `
        <div style="color:#ff0;font-size:1.2em;margin:20px 0">
          🏆 NEW HIGH SCORE! 🏆
        </div>
      ` : ''}
      
      <div class="quiz-controls" style="margin-top:30px">
        <button class="quiz-btn" onclick="startQuiz('${quizMode}')">PLAY AGAIN</button>
        <button class="quiz-btn" onclick="location.reload()">BACK TO MENU</button>
      </div>
    </div>
  `;
}

// ==================== INDIAN LABS SYSTEM ====================

function initIndianLabs() {
  if (!INDIAN_LABS) {
    console.error('Indian labs data not loaded!');
    return;
  }
  
  // Initialize map
  indianLabsMap = L.map('indian-labs-map').setView([20.5937, 78.9629], 5);
  
  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(indianLabsMap);
  
  // Add marker cluster
  indianMarkerCluster = L.markerClusterGroup({
    maxClusterRadius: 50,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false
  });
  
  // Add markers
  INDIAN_LABS.forEach(lab => {
    const color = lab.color || 'blue';
    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background:${color};width:30px;height:30px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 10px ${color}"></div>`,
      iconSize: [30, 30]
    });
    
    const marker = L.marker([lab.lat, lab.lng], { icon })
      .bindPopup(`
        <div style="color:#000;min-width:250px">
          <h3 style="margin-bottom:10px">${lab.name}</h3>
          <p><strong>Location:</strong> ${lab.location}</p>
          <p><strong>Type:</strong> ${lab.type}</p>
          <p><strong>Category:</strong> ${lab.category}</p>
          ${lab.established ? `<p><strong>Est:</strong> ${lab.established}</p>` : ''}
          <button onclick="showLabDetail('${lab.name}')" style="margin-top:10px;padding:8px 15px;background:#0f0;border:none;cursor:pointer;font-weight:bold">
            VIEW DETAILS
          </button>
        </div>
      `);
    
    indianMarkerCluster.addLayer(marker);
    indianMarkers.push({ marker, lab });
  });
  
  indianLabsMap.addLayer(indianMarkerCluster);
  
  // Display labs list
  displayIndianLabsList();
  
  // Setup search
  document.getElementById('indian-lab-search').addEventListener('input', (e) => {
    filterIndianLabsSearch(e.target.value);
  });
  
  // Update zoom info
  indianLabsMap.on('zoomend', () => {
    const zoom = indianLabsMap.getZoom();
    document.getElementById('indian-zoom-info').textContent = `Zoom: ${zoom} | Max: 22`;
  });
}

function displayIndianLabsList(labs = INDIAN_LABS) {
  const container = document.getElementById('indian-labs-list');
  
  container.innerHTML = labs.map(lab => `
    <div class="item clickable" onclick="showLabDetail('${lab.name}')">
      <h3>${lab.name}</h3>
      <div class="meta">
        <span class="tag">${lab.type}</span>
        <span class="tag">${lab.category}</span>
        <span class="tag">📍 ${lab.location}</span>
        ${lab.established ? `<span class="tag">Est. ${lab.established}</span>` : ''}
      </div>
      <p>${lab.description}</p>
      <div class="click-hint">👆 Click for full details</div>
    </div>
  `).join('');
}

function filterIndianLabs(type) {
  // Update active tab
  document.querySelectorAll('.tabs .tab').forEach(tab => {
    tab.classList.remove('active');
  });
  event.target.classList.add('active');
  
  if (type === 'all') {
    displayIndianLabsList(INDIAN_LABS);
    indianLabsMap.addLayer(indianMarkerCluster);
  } else {
    const filtered = INDIAN_LABS.filter(lab => lab.type === type);
    displayIndianLabsList(filtered);
    
    // Update map markers
    indianLabsMap.removeLayer(indianMarkerCluster);
    indianMarkerCluster.clearLayers();
    
    indianMarkers.forEach(({ marker, lab }) => {
      if (lab.type === type) {
        indianMarkerCluster.addLayer(marker);
      }
    });
    
    indianLabsMap.addLayer(indianMarkerCluster);
  }
}

function filterIndianLabsSearch(query) {
  if (!query) {
    displayIndianLabsList(INDIAN_LABS);
    return;
  }
  
  const filtered = INDIAN_LABS.filter(lab => 
    lab.name.toLowerCase().includes(query.toLowerCase()) ||
    lab.location.toLowerCase().includes(query.toLowerCase()) ||
    lab.category.toLowerCase().includes(query.toLowerCase()) ||
    lab.description.toLowerCase().includes(query.toLowerCase())
  );
  
  displayIndianLabsList(filtered);
}

function showLabDetail(labName) {
  const lab = INDIAN_LABS.find(l => l.name === labName);
  if (!lab) return;
  
  const content = `
    <div class="detail-header">
      <h2>${lab.name}</h2>
      <div class="detail-meta">
        <span class="tag">${lab.type}</span>
        <span class="tag">${lab.category}</span>
        <span class="tag">📍 ${lab.location}</span>
        ${lab.established ? `<span class="tag">Est. ${lab.established}</span>` : ''}
        ${lab.employees ? `<span class="tag">👥 ${lab.employees}</span>` : ''}
        ${lab.budget ? `<span class="tag">💰 ${lab.budget}</span>` : ''}
      </div>
    </div>
    
    <div class="detail-body">
      <h3 style="color:#0ff;margin:20px 0 10px">📋 ABOUT</h3>
      <p style="color:#0f0;line-height:1.8">${lab.description}</p>
      
      ${lab.projects ? `
        <h3 style="color:#0ff;margin:20px 0 10px">🚀 CURRENT PROJECTS</h3>
        <div class="meta">
          ${lab.projects.map(p => `<span class="tag">${p}</span>`).join('')}
        </div>
      ` : ''}
      
      ${lab.achievements ? `
        <h3 style="color:#0ff;margin:20px 0 10px">🏆 ACHIEVEMENTS</h3>
        <ul style="color:#0f0;line-height:1.8;margin-left:20px">
          ${lab.achievements.map(a => `<li>${a}</li>`).join('')}
        </ul>
      ` : ''}
      
      ${lab.howToJoin ? `
        <h3 style="color:#0ff;margin:20px 0 10px">💼 HOW TO JOIN</h3>
        <p style="color:#0f0;line-height:1.8">${lab.howToJoin}</p>
      ` : ''}
      
      <h3 style="color:#0ff;margin:20px 0 10px">🔗 LINKS</h3>
      <div>
        ${lab.website ? `<a href="${lab.website}" target="_blank" class="external-link">🌐 Official Website</a>` : ''}
        ${lab.careers ? `<a href="${lab.careers}" target="_blank" class="external-link">💼 Careers Page</a>` : ''}
        ${lab.contact ? `<a href="mailto:${lab.contact}" class="external-link">📧 Contact</a>` : ''}
      </div>
      
      <div style="margin-top:30px;padding:20px;background:rgba(0,255,0,0.1);border:2px solid #0f0">
        <h4 style="color:#0ff;margin-bottom:10px">📍 LOCATION</h4>
        <p style="color:#0f0">Coordinates: ${lab.lat}, ${lab.lng}</p>
        <button onclick="zoomToLab(${lab.lat}, ${lab.lng})" class="external-link" style="margin-top:10px">
          🗺️ VIEW ON MAP
        </button>
      </div>
    </div>
  `;
  
  openModal(content);
}

function zoomToLab(lat, lng) {
  closeModal();
  indianLabsMap.setView([lat, lng], 15, { animate: true });
  
  // Scroll to map
  document.getElementById('indian-labs-panel').scrollIntoView({ behavior: 'smooth' });
}

// ==================== EXISTING FEATURES ====================

// MODAL SYSTEM
function openModal(content) {
  const modal = document.getElementById('detail-modal');
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = content;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('detail-modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// ESC key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Initialize maps
function initMaps() {
  // Global satellite map
  map = L.map('map').setView([37.0902, -95.7129], 2);
  
  // Multiple tile layers
  const googleHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    maxNativeZoom: 21,
    attribution: 'Google Hybrid'
  });
  
  const googleSatellite = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    maxNativeZoom: 21,
    attribution: 'Google Satellite'
  });
  
  const esriSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 22,
    maxNativeZoom: 19,
    attribution: 'ESRI'
  });
  
  const mapboxSatellite = L.tileLayer('https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 22,
    maxNativeZoom: 20,
    attribution: 'Mapbox'
  });
  
  const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,
    maxNativeZoom: 19,
    attribution: 'OpenStreetMap'
  });
  
  // Add default layer
  googleHybrid.addTo(map);
  
  // Layer control
  const baseMaps = {
    "🛰️ Google Hybrid": googleHybrid,
    "🌍 Google Satellite": googleSatellite,
    "📡 ESRI Satellite": esriSatellite,
    "🗺️ Mapbox Satellite": mapboxSatellite,
    "🗺️ Street Map": streetMap
  };
  
  L.control.layers(baseMaps).addTo(map);
  
  // Marker cluster
  markerCluster = L.markerClusterGroup({
    maxClusterRadius: 50,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false
  });
  
  map.addLayer(markerCluster);
  
  // Add locations
  if (typeof SECRET_LOCATIONS !== 'undefined') {
    SECRET_LOCATIONS.forEach(loc => {
      const color = loc.classification === 'TOP SECRET' ? 'red' :
                    loc.classification === 'SECRET' ? 'orange' : 'yellow';
      
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background:${color};width:30px;height:30px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 10px ${color}"></div>`,
        iconSize: [30, 30]
      });
      
      const marker = L.marker([loc.lat, loc.lng], { icon })
        .bindPopup(`
          <div style="color:#000;min-width:250px">
            <h3 style="margin-bottom:10px">${loc.name}</h3>
            <p><strong>Location:</strong> ${loc.location}</p>
            <p><strong>Classification:</strong> ${loc.classification}</p>
            <p><strong>Type:</strong> ${loc.type}</p>
            <button onclick="map.setView([${loc.lat}, ${loc.lng}], 20, {animate:true})" 
                    style="margin-top:10px;padding:8px 15px;background:#0f0;border:none;cursor:pointer;font-weight:bold">
              🔍 ZOOM TO ULTRA HD
            </button>
          </div>
        `);
      
      markerCluster.addLayer(marker);
      markers.push(marker);
    });
  }
  
  // Zoom info
  map.on('zoomend', () => {
    const zoom = map.getZoom();
    document.getElementById('zoom-info').textContent = `Zoom: ${zoom} | Max: 22 (ULTRA HD)`;
    
    if (zoom >= 18) {
      console.log(`🛰️ ULTRA HD MODE: Zoom ${zoom}`);
    }
  });
  
  // Search functionality
  document.getElementById('lab-search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    if (!query) {
      markerCluster.clearLayers();
      markers.forEach(m => markerCluster.addLayer(m));
      return;
    }
    
    markerCluster.clearLayers();
    
    if (typeof SECRET_LOCATIONS !== 'undefined') {
      SECRET_LOCATIONS.forEach((loc, index) => {
        if (loc.name.toLowerCase().includes(query) || 
            loc.location.toLowerCase().includes(query)) {
          markerCluster.addLayer(markers[index]);
        }
      });
    }
  });
}

// Load all data
async function loadAllData() {
  await Promise.all([
    loadHackerNews(),
    loadReddit(),
    loadGitHub(),
    loadResearch()
  ]);
  
  updateStats();
  document.getElementById('last-update').textContent = 
    `Last Updated: ${new Date().toLocaleString()}`;
}

// Load Hacker News
async function loadHackerNews() {
  try {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = await response.json();
    
    const stories = await Promise.all(
      storyIds.slice(0, 100).map(async id => {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return res.json();
      })
    );
    
    allNews = stories.filter(s => s && s.title);
    displayNews(allNews);
  } catch (error) {
    console.error('Error loading Hacker News:', error);
  }
}

// Display news
function displayNews(news) {
  const container = document.getElementById('news-container');
  
  container.innerHTML = news.map(story => `
    <div class="item clickable" onclick="showNewsDetail(${story.id}, '${story.title.replace(/'/g, "\\'")}', '${story.url || ''}', ${story.score}, ${story.descendants || 0}, '${story.by}', ${story.time})">
      <h3>${story.title}</h3>
      <div class="meta">
        <span class="tag">⬆ ${story.score} points</span>
        <span class="tag">💬 ${story.descendants || 0} comments</span>
        <span class="tag">by ${story.by}</span>
      </div>
      <div class="timestamp">${new Date(story.time * 1000).toLocaleString()}</div>
      <div class="click-hint">👆 Click to read comments</div>
    </div>
  `).join('');
}

// Filter news
function filterNews(query) {
  if (!query) {
    displayNews(allNews);
    return;
  }
  
  const filtered = allNews.filter(story => 
    story.title.toLowerCase().includes(query.toLowerCase())
  );
  
  displayNews(filtered);
}

// Show news detail
async function showNewsDetail(storyId, title, url, score, comments, by, time) {
  const content = `
    <div class="detail-header">
      <h2>${title}</h2>
      <div class="detail-meta">
        <span class="tag">⬆ ${score} points</span>
        <span class="tag">💬 ${comments} comments</span>
        <span class="tag">by ${by}</span>
        <span class="tag">${new Date(time * 1000).toLocaleString()}</span>
      </div>
      ${url ? `<a href="${url}" target="_blank" class="external-link">🔗 Read Original Article →</a>` : ''}
    </div>
    
    <div class="detail-body">
      <h3 style="color:#0ff;margin:20px 0 10px">💬 COMMENTS (Loading...)</h3>
      <div id="comments-container">
        <div class="loading">⏳ Loading comments...</div>
      </div>
    </div>
  `;
  
  openModal(content);
  
  // Load comments
  try {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
    const story = await response.json();
    
    if (story.kids && story.kids.length > 0) {
      const commentPromises = story.kids.slice(0, 20).map(async id => {
        try {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return res.json();
        } catch (e) {
          return null;
        }
      });
      
      const comments = await Promise.all(commentPromises);
      const validComments = comments.filter(c => c && c.text);
      
      const commentsHtml = validComments.map(comment => `
        <div class="comment">
          <div class="comment-meta">
            <strong>${comment.by}</strong> • ${new Date(comment.time * 1000).toLocaleString()}
          </div>
          <div class="comment-text">${comment.text}</div>
        </div>
      `).join('');
      
      document.getElementById('comments-container').innerHTML = 
        commentsHtml || '<p style="color:#0a0">No comments yet.</p>';
    } else {
      document.getElementById('comments-container').innerHTML = 
        '<p style="color:#0a0">No comments yet.</p>';
    }
  } catch (error) {
    document.getElementById('comments-container').innerHTML = 
      '<p style="color:#f00">Error loading comments.</p>';
  }
}

// Load Reddit
async function loadReddit() {
  const subreddits = [
    'programming', 'technology', 'artificial', 'MachineLearning',
    'datascience', 'cybersecurity', 'webdev', 'learnprogramming',
    'cscareerquestions', 'startups'
  ];
  
  try {
    const promises = subreddits.map(sub => 
      fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=5`)
        .then(r => r.json())
        .catch(() => null)
    );
    
    const results = await Promise.all(promises);
    
    allReddit = results
      .filter(r => r && r.data && r.data.children)
      .flatMap(r => r.data.children.map(c => c.data))
      .sort((a, b) => b.score - a.score);
    
    displayReddit(allReddit);
  } catch (error) {
    console.error('Error loading Reddit:', error);
  }
}

// Display Reddit
function displayReddit(posts) {
  const container = document.getElementById('reddit-container');
  
  container.innerHTML = posts.map(post => `
    <div class="item">
      <h3>${post.title}</h3>
      <div class="meta">
        <span class="tag">r/${post.subreddit}</span>
        <span class="tag">⬆ ${post.score}</span>
        <span class="tag">💬 ${post.num_comments}</span>
        <span class="tag">by u/${post.author}</span>
      </div>
      ${post.selftext ? `<p>${post.selftext.substring(0, 200)}...</p>` : ''}
      <a href="https://reddit.com${post.permalink}" target="_blank" class="external-link">
        Read on Reddit →
      </a>
    </div>
  `).join('');
}

// Load GitHub
async function loadGitHub() {
  try {
    const response = await fetch('https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=50');
    const data = await response.json();
    
    allGitHub = data.items || [];
    displayGitHub(allGitHub);
  } catch (error) {
    console.error('Error loading GitHub:', error);
  }
}

// Display GitHub
function displayGitHub(repos) {
  const container = document.getElementById('github-container');
  
  container.innerHTML = repos.map(repo => `
    <div class="item">
      <h3>${repo.full_name}</h3>
      <div class="meta">
        <span class="tag">⭐ ${repo.stargazers_count.toLocaleString()}</span>
        <span class="tag">🔱 ${repo.forks_count.toLocaleString()}</span>
        <span class="tag">${repo.language || 'Unknown'}</span>
      </div>
      <p>${repo.description || 'No description'}</p>
      <a href="${repo.html_url}" target="_blank" class="external-link">
        View on GitHub →
      </a>
    </div>
  `).join('');
}

// Load Research
async function loadResearch() {
  try {
    const categories = ['cs.AI', 'cs.LG', 'cs.CL', 'cs.CV'];
    const promises = categories.map(cat =>
      fetch(`https://export.arxiv.org/api/query?search_query=cat:${cat}&sortBy=submittedDate&sortOrder=descending&max_results=10`)
        .then(r => r.text())
        .catch(() => null)
    );
    
    const results = await Promise.all(promises);
    
    allResearch = results
      .filter(r => r)
      .flatMap(parseArxiv)
      .slice(0, 30);
    
    displayResearch(allResearch);
  } catch (error) {
    console.error('Error loading research:', error);
  }
}

// Parse ArXiv XML
function parseArxiv(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const entries = doc.querySelectorAll('entry');
  
  return Array.from(entries).map(entry => ({
    title: entry.querySelector('title')?.textContent?.trim(),
    summary: entry.querySelector('summary')?.textContent?.trim(),
    authors: Array.from(entry.querySelectorAll('author name')).map(a => a.textContent),
    published: entry.querySelector('published')?.textContent,
    link: entry.querySelector('id')?.textContent,
    pdfLink: entry.querySelector('link[title="pdf"]')?.getAttribute('href')
  }));
}

// Display Research
function displayResearch(papers) {
  const container = document.getElementById('research-container');
  
  container.innerHTML = papers.map(paper => `
    <div class="item">
      <h3>${paper.title}</h3>
      <div class="meta">
        <span class="tag">👥 ${paper.authors.slice(0, 3).join(', ')}${paper.authors.length > 3 ? ' et al.' : ''}</span>
        <span class="tag">📅 ${new Date(paper.published).toLocaleDateString()}</span>
      </div>
      <p>${paper.summary?.substring(0, 200)}...</p>
      <div>
        <a href="${paper.link}" target="_blank" class="external-link">Read Abstract →</a>
        ${paper.pdfLink ? `<a href="${paper.pdfLink}" target="_blank" class="external-link">📄 PDF</a>` : ''}
      </div>
    </div>
  `).join('');
}

// Update stats
function updateStats() {
  document.getElementById('news-count').textContent = allNews.length;
  document.getElementById('research-count').textContent = allResearch.length;
  document.getElementById('github-count').textContent = allGitHub.length;
  document.getElementById('reddit-count').textContent = allReddit.length;
}

// Toggle panels
function togglePanel(panelName) {
  const panel = document.getElementById(`${panelName}-panel`);
  const btn = event.target;
  
  if (panel.style.display === 'none') {
    panel.style.display = 'block';
    btn.textContent = `HIDE ${panelName.toUpperCase().replace('-', ' ')}`;
  } else {
    panel.style.display = 'none';
    btn.textContent = `SHOW ${panelName.toUpperCase().replace('-', ' ')}`;
  }
}

// Setup event listeners
function setupEventListeners() {
  // Existing listeners are already set up in init functions
}

// Load breakthroughs
async function loadBreakthroughs() {
  // This would load from your data.js file
  if (typeof BREAKTHROUGHS !== 'undefined') {
    displayBreakthroughs(BREAKTHROUGHS);
  }
}

function displayBreakthroughs(breakthroughs) {
  const container = document.getElementById('breakthroughs-container');
  
  container.innerHTML = breakthroughs.map(item => {
    const classNames = ['item'];
    if (item.classification === 'TOP SECRET') classNames.push('critical');
    else if (item.classification === 'SECRET') classNames.push('high');
    
    return `
      <div class="${classNames.join(' ')}">
        <h3>${item.title}</h3>
        <div class="meta">
          <span class="tag">${item.classification}</span>
          <span class="tag">${item.category}</span>
          <span class="tag">${item.source}</span>
        </div>
        <p>${item.description}</p>
        ${item.impact ? `<div class="impact">⚡ IMPACT: ${item.impact}</div>` : ''}
        <div class="timestamp">${item.date}</div>
      </div>
    `;
  }).join('');
}

// Initialize breakthroughs
setTimeout(loadBreakthroughs, 1000);