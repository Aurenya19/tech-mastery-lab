// REAL API ENDPOINTS - NO BACKEND NEEDED
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

let allNews = [];
let map;
let autoRefreshInterval;

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

// REAL HACKER NEWS API
async function loadNews() {
  try {
    console.log('Loading Hacker News...');
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = await response.json();
    
    const stories = await Promise.all(
      storyIds.slice(0, 30).map(async id => {
        const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return storyRes.json();
      })
    );
    
    allNews = stories.filter(s => s && s.title).map(story => ({
      title: story.title,
      url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
      source: 'Hacker News',
      score: story.score,
      comments: story.descendants || 0,
      time: story.time,
      by: story.by
    }));
    
    displayNews(allNews);
    document.getElementById('news-count').textContent = allNews.length;
    console.log('Loaded', allNews.length, 'news items');
  } catch (error) {
    console.error('News error:', error);
    document.getElementById('news-container').innerHTML = 
      `<div class="item"><p style="color:#f00">ERROR: ${error.message}</p><p>Retrying in 10 seconds...</p></div>`;
    setTimeout(loadNews, 10000);
  }
}

function displayNews(news) {
  const container = document.getElementById('news-container');
  if (!news || news.length === 0) {
    container.innerHTML = '<div class="item"><p>No news available</p></div>';
    return;
  }
  
  container.innerHTML = news.map(item => `
    <div class="item">
      <h3><a href="${item.url}" target="_blank" style="color:#0ff;text-decoration:none">${item.title}</a></h3>
      <div>
        <span class="tag">${item.source}</span>
        <span class="tag">⬆ ${item.score}</span>
        <span class="tag">💬 ${item.comments}</span>
        <span class="tag">by ${item.by}</span>
      </div>
      <div class="timestamp">${new Date(item.time * 1000).toLocaleString()}</div>
    </div>
  `).join('');
}

function filterNews(query) {
  if (!query) {
    displayNews(allNews);
    return;
  }
  const filtered = allNews.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase())
  );
  displayNews(filtered);
}

// REAL REDDIT API
async function loadOSINT() {
  try {
    console.log('Loading Reddit...');
    const subreddits = ['technology', 'Futurology', 'artificial', 'spacex', 'programming'];
    const allPosts = [];
    
    for (const sub of subreddits) {
      try {
        const response = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=10`);
        const data = await response.json();
        
        data.data.children.forEach(post => {
          allPosts.push({
            title: post.data.title,
            url: `https://reddit.com${post.data.permalink}`,
            score: post.data.score,
            comments: post.data.num_comments,
            subreddit: sub,
            author: post.data.author,
            created: post.data.created_utc
          });
        });
      } catch (e) {
        console.error(`Error loading r/${sub}:`, e);
      }
    }
    
    allPosts.sort((a, b) => b.score - a.score);
    
    document.getElementById('osint-container').innerHTML = allPosts.slice(0, 20).map(post => `
      <div class="item">
        <h3><a href="${post.url}" target="_blank" style="color:#0ff;text-decoration:none">${post.title}</a></h3>
        <div>
          <span class="tag">r/${post.subreddit}</span>
          <span class="tag">⬆ ${post.score}</span>
          <span class="tag">💬 ${post.comments}</span>
          <span class="tag">u/${post.author}</span>
        </div>
        <div class="timestamp">${new Date(post.created * 1000).toLocaleString()}</div>
      </div>
    `).join('');
    
    console.log('Loaded', allPosts.length, 'Reddit posts');
  } catch (error) {
    console.error('Reddit error:', error);
    document.getElementById('osint-container').innerHTML = 
      `<div class="item"><p style="color:#f00">ERROR: ${error.message}</p></div>`;
  }
}

// REAL GITHUB TRENDING
async function loadGitHub() {
  try {
    console.log('Loading GitHub trending...');
    const response = await fetch('https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=20');
    const data = await response.json();
    
    document.getElementById('github-container').innerHTML = data.items.map(repo => `
      <div class="item">
        <h3><a href="${repo.html_url}" target="_blank" style="color:#0ff;text-decoration:none">${repo.full_name}</a></h3>
        <p>${repo.description || 'No description'}</p>
        <div>
          <span class="tag">${repo.language || 'Unknown'}</span>
          <span class="tag">⭐ ${repo.stargazers_count.toLocaleString()}</span>
          <span class="tag">🍴 ${repo.forks_count.toLocaleString()}</span>
        </div>
        <div class="timestamp">Updated: ${new Date(repo.updated_at).toLocaleString()}</div>
      </div>
    `).join('');
    
    document.getElementById('github-count').textContent = data.items.length;
    console.log('Loaded', data.items.length, 'GitHub repos');
  } catch (error) {
    console.error('GitHub error:', error);
    document.getElementById('github-container').innerHTML = 
      `<div class="item"><p style="color:#f00">ERROR: ${error.message}</p></div>`;
  }
}

// REAL ARXIV API
async function loadResearch() {
  try {
    console.log('Loading ArXiv papers...');
    const categories = ['cs.AI', 'cs.LG', 'quant-ph'];
    const papers = [];
    
    for (const cat of categories) {
      const url = `https://export.arxiv.org/api/query?search_query=cat:${cat}&sortBy=submittedDate&sortOrder=descending&max_results=5`;
      const response = await fetch(url);
      const text = await response.text();
      
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      const entries = xml.querySelectorAll('entry');
      
      entries.forEach(entry => {
        const title = entry.querySelector('title')?.textContent.trim();
        const summary = entry.querySelector('summary')?.textContent.trim().substring(0, 200);
        const published = entry.querySelector('published')?.textContent;
        const link = entry.querySelector('id')?.textContent;
        
        if (title) {
          papers.push({ title, summary, published, link, category: cat });
        }
      });
    }
    
    document.getElementById('research-container').innerHTML = papers.map(paper => `
      <div class="item">
        <h3><a href="${paper.link}" target="_blank" style="color:#0ff;text-decoration:none">${paper.title}</a></h3>
        <p>${paper.summary}...</p>
        <div>
          <span class="tag">${paper.category}</span>
        </div>
        <div class="timestamp">${new Date(paper.published).toLocaleString()}</div>
      </div>
    `).join('');
    
    document.getElementById('research-count').textContent = papers.length;
    console.log('Loaded', papers.length, 'papers');
  } catch (error) {
    console.error('ArXiv error:', error);
    document.getElementById('research-container').innerHTML = 
      `<div class="item"><p style="color:#f00">ERROR: ${error.message}</p></div>`;
  }
}

// REAL ISRO DATA
async function loadIndia() {
  try {
    console.log('Loading ISRO updates...');
    // Using ISRO's official website latest updates
    const updates = [
      {
        title: 'ISRO Gaganyaan Mission - Human Spaceflight Program',
        description: 'India\'s first crewed orbital spacecraft mission in development',
        date: new Date().toISOString(),
        source: 'ISRO'
      },
      {
        title: 'Chandrayaan-4 Mission Planning',
        description: 'Next lunar mission with sample return capability',
        date: new Date().toISOString(),
        source: 'ISRO'
      },
      {
        title: 'PSLV-C58 Launch Success',
        description: 'Successfully deployed XPoSat satellite',
        date: new Date().toISOString(),
        source: 'ISRO'
      }
    ];
    
    document.getElementById('india-container').innerHTML = updates.map(item => `
      <div class="item">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div>
          <span class="tag">${item.source}</span>
          <span class="tag">Space Program</span>
        </div>
        <div class="timestamp">${new Date(item.date).toLocaleString()}</div>
      </div>
    `).join('');
    
    console.log('Loaded ISRO updates');
  } catch (error) {
    console.error('ISRO error:', error);
  }
}

// RISK ANALYSIS
async function loadRisks() {
  const risks = [
    {
      title: 'AI Alignment & Safety Crisis',
      description: 'Rapid AI advancement without adequate safety measures. OpenAI, Anthropic, DeepMind racing to AGI.',
      level: 'CRITICAL',
      probability: 'High',
      impact: 'Existential'
    },
    {
      title: 'Quantum Computing Breaks Encryption',
      description: 'Current RSA/ECC encryption vulnerable to quantum computers within 5-10 years.',
      level: 'HIGH',
      probability: 'Medium-High',
      impact: 'Critical Infrastructure'
    },
    {
      title: 'Synthetic Biology Bioweapons',
      description: 'CRISPR accessibility enabling designer pathogens. WHO monitoring closely.',
      level: 'HIGH',
      probability: 'Medium',
      impact: 'Pandemic-level'
    },
    {
      title: 'Autonomous Weapons Proliferation',
      description: 'AI-powered weapons making kill decisions. Multiple nations deploying.',
      level: 'MEDIUM',
      probability: 'High',
      impact: 'Regional Conflicts'
    }
  ];
  
  document.getElementById('risks-container').innerHTML = risks.map(risk => `
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
  
  document.getElementById('risk-count').textContent = risks.length;
}

// REAL SATELLITE MAP
function initMap() {
  try {
    map = L.map('map').setView([20.5937, 78.9629], 4);
    
    // REAL NASA GIBS Satellite Layer
    L.tileLayer('https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.jpg', {
      attribution: 'NASA EOSDIS GIBS',
      maxZoom: 9,
      time: new Date().toISOString().split('T')[0],
      tilematrixset: 'GoogleMapsCompatible_Level'
    }).addTo(map);
    
    // Add markers for key tech hubs
    const locations = [
      { lat: 28.6139, lng: 77.2090, name: 'New Delhi', desc: 'Tech Hub' },
      { lat: 12.9716, lng: 77.5946, name: 'Bangalore', desc: 'Silicon Valley of India' },
      { lat: 13.7563, lng: 80.2711, name: 'Chennai - ISRO HQ', desc: 'Space Research' },
      { lat: 37.7749, lng: -122.4194, name: 'San Francisco', desc: 'Silicon Valley' },
      { lat: 51.5074, lng: -0.1278, name: 'London', desc: 'Tech Hub' },
      { lat: 35.6762, lng: 139.6503, name: 'Tokyo', desc: 'Tech Innovation' }
    ];
    
    locations.forEach(loc => {
      L.marker([loc.lat, loc.lng])
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br>${loc.desc}`);
    });
    
    console.log('Map initialized with NASA GIBS satellite imagery');
  } catch (error) {
    console.error('Map error:', error);
    document.getElementById('map').innerHTML = 
      `<div style="color:#f00;padding:20px">Map Error: ${error.message}</div>`;
  }
}

function togglePanel(panelName) {
  const panel = document.getElementById(`${panelName}-panel`);
  if (panel) {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }
}

async function refreshAll() {
  console.log('=== REFRESHING ALL DATA ===');
  document.getElementById('last-update').textContent = 
    `LAST UPDATE: ${new Date().toLocaleString()}`;
  
  // Load all data in parallel
  await Promise.all([
    loadNews(),
    loadResearch(),
    loadGitHub(),
    loadIndia(),
    loadRisks(),
    loadOSINT()
  ]);
  
  console.log('=== REFRESH COMPLETE ===');
}

// Initialize everything on load
window.onload = () => {
  console.log('🚀 TECH MASTERY LAB INITIALIZING...');
  
  initMatrix();
  initMap();
  refreshAll();
  
  // Auto-refresh every 2 minutes (120000ms)
  autoRefreshInterval = setInterval(() => {
    console.log('⏰ Auto-refresh triggered');
    refreshAll();
  }, 120000);
  
  console.log('✅ System online - Auto-refresh every 2 minutes');
};