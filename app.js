const API_BASE = '/api';
let allNews = [];
let map;

// Matrix background animation
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
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 33);
}

// Load news from all sources
async function loadNews() {
  try {
    const response = await fetch(`${API_BASE}/news/latest`);
    const data = await response.json();
    if (data.success) {
      allNews = data.data;
      displayNews(data.data);
      document.getElementById('news-count').textContent = data.count;
    }
  } catch (error) {
    document.getElementById('news-container').innerHTML = 
      '<div class="item"><p>ERROR: ' + error.message + '</p></div>';
  }
}

function displayNews(news) {
  const container = document.getElementById('news-container');
  container.innerHTML = news.map(item => `
    <div class="item">
      <h3>${item.title}</h3>
      <p>${item.description || 'No description'}</p>
      <div>
        <span class="tag">${item.source}</span>
        <span class="tag">${item.category}</span>
      </div>
      <div class="timestamp">${new Date(item.date).toLocaleString()}</div>
    </div>
  `).join('');
}

function filterNews(query) {
  const filtered = allNews.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description?.toLowerCase().includes(query.toLowerCase())
  );
  displayNews(filtered);
}

// Load research papers from ArXiv
async function loadResearch() {
  try {
    const response = await fetch(`${API_BASE}/research/arxiv`);
    const data = await response.json();
    if (data.success) {
      document.getElementById('research-container').innerHTML = data.data.map(paper => `
        <div class="item">
          <h3>${paper.title}</h3>
          <p>${paper.summary}</p>
          <div>
            <span class="tag">${paper.category}</span>
            <span class="tag">${paper.authors.length} AUTHORS</span>
          </div>
          <div class="timestamp">${new Date(paper.published).toLocaleString()}</div>
        </div>
      `).join('');
      document.getElementById('research-count').textContent = data.count;
    }
  } catch (error) {
    document.getElementById('research-container').innerHTML = 
      '<div class="item"><p>ERROR: ' + error.message + '</p></div>';
  }
}

// Load GitHub trending repos
async function loadGitHub() {
  try {
    const response = await fetch(`${API_BASE}/github/trending`);
    const data = await response.json();
    if (data.success) {
      document.getElementById('github-container').innerHTML = data.data.map(repo => `
        <div class="item">
          <h3>${repo.name}</h3>
          <p>${repo.description || 'No description'}</p>
          <div>
            <span class="tag">${repo.language || 'Unknown'}</span>
            <span class="tag">⭐ ${repo.stars}</span>
          </div>
        </div>
      `).join('');
      document.getElementById('github-count').textContent = data.count;
    }
  } catch (error) {
    document.getElementById('github-container').innerHTML = 
      '<div class="item"><p>ERROR: ' + error.message + '</p></div>';
  }
}

// Load India tech updates
async function loadIndia() {
  try {
    const response = await fetch(`${API_BASE}/india/isro`);
    const data = await response.json();
    if (data.success) {
      document.getElementById('india-container').innerHTML = data.data.map(item => `
        <div class="item">
          <h3>${item.title}</h3>
          <p>${item.description || ''}</p>
          <div>
            <span class="tag">${item.source}</span>
            <span class="tag">${item.category}</span>
          </div>
          <div class="timestamp">${new Date(item.date).toLocaleString()}</div>
        </div>
      `).join('');
    }
  } catch (error) {
    document.getElementById('india-container').innerHTML = 
      '<div class="item"><p>ERROR: ' + error.message + '</p></div>';
  }
}

// Load risk analysis
async function loadRisks() {
  try {
    const response = await fetch(`${API_BASE}/risks/current`);
    const data = await response.json();
    if (data.success) {
      document.getElementById('risks-container').innerHTML = data.data.map(risk => `
        <div class="item risk-${risk.level.toLowerCase()}">
          <h3>${risk.title}</h3>
          <p>${risk.description}</p>
          <div>
            <span class="tag">LEVEL: ${risk.level}</span>
            <span class="tag">PROB: ${risk.probability}</span>
            <span class="tag">IMPACT: ${risk.impact}</span>
          </div>
        </div>
      `).join('');
      document.getElementById('risk-count').textContent = data.data.length;
    }
  } catch (error) {
    document.getElementById('risks-container').innerHTML = 
      '<div class="item"><p>ERROR: ' + error.message + '</p></div>';
  }
}

// Load OSINT data
async function loadOSINT() {
  try {
    const response = await fetch(`${API_BASE}/osint/reddit-tech`);
    const data = await response.json();
    if (data.success) {
      document.getElementById('osint-container').innerHTML = data.data.map(post => `
        <div class="item">
          <h3>${post.title}</h3>
          <div>
            <span class="tag">r/${post.subreddit}</span>
            <span class="tag">⬆ ${post.score}</span>
            <span class="tag">💬 ${post.comments}</span>
          </div>
          <div class="timestamp">${new Date(post.created).toLocaleString()}</div>
        </div>
      `).join('');
    }
  } catch (error) {
    document.getElementById('osint-container').innerHTML = 
      '<div class="item"><p>ERROR: ' + error.message + '</p></div>';
  }
}

// Initialize satellite map
function initMap() {
  map = L.map('map').setView([20.5937, 78.9629], 5);
  
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Esri',
    maxZoom: 18
  }).addTo(map);
  
  // Add markers for key locations
  L.marker([28.6139, 77.2090]).addTo(map).bindPopup('<b>New Delhi</b><br>Tech Hub');
  L.marker([12.9716, 77.5946]).addTo(map).bindPopup('<b>Bangalore</b><br>Silicon Valley of India');
  L.marker([13.7563, 100.5018]).addTo(map).bindPopup('<b>ISRO HQ</b><br>Space Research');
}

function togglePanel(panelName) {
  const panel = document.getElementById(`${panelName}-panel`);
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

async function refreshAll() {
  document.getElementById('last-update').textContent = 
    `LAST UPDATE: ${new Date().toLocaleString()}`;
  
  await Promise.all([
    loadNews(),
    loadResearch(),
    loadGitHub(),
    loadIndia(),
    loadRisks(),
    loadOSINT()
  ]);
}

// Initialize everything on load
window.onload = () => {
  initMatrix();
  initMap();
  refreshAll();
  
  // Auto-refresh every 5 minutes
  setInterval(refreshAll, 300000);
};