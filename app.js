// COMPLETE TECH INTELLIGENCE SYSTEM
let allNews = [];
let map;

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

// BREAKTHROUGHS with expandable details
function displayBreakthroughs() {
  const container = document.getElementById('breakthroughs-container');
  
  container.innerHTML = INTELLIGENCE_DATA.map((item, index) => {
    const impactLevel = item.impact.startsWith('CRITICAL') ? 'critical' : 
                       item.impact.startsWith('HIGH') ? 'high' : '';
    
    return `
      <div class="item ${impactLevel}" onclick="toggleExpand(${index})">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="meta">
          <span class="tag">${item.category}</span>
          <span class="tag">${item.source}</span>
          <span class="tag">${new Date(item.date).toLocaleDateString()}</span>
        </div>
        <div class="impact" style="color:#ff0;font-weight:bold;margin-top:8px">${item.impact}</div>
        <div class="expand-btn">▼ CLICK TO EXPAND FULL INTELLIGENCE REPORT</div>
        
        <div class="details" id="details-${index}">
          <h4 style="color:#0ff;margin:10px 0">📋 EXECUTIVE SUMMARY</h4>
          <p>${item.deepDive.summary}</p>
          
          <h4 style="color:#0ff;margin:15px 0 10px">🔬 TECHNICAL DETAILS</h4>
          ${item.deepDive.technical.map(t => `<p><strong style="color:#0f0">${t.title}:</strong> ${t.detail}</p>`).join('')}
          
          ${item.deepDive.secrets ? `
            <div class="secret">
              <h4>🔐 CLASSIFIED/HIDDEN INFORMATION</h4>
              ${item.deepDive.secrets.map(s => `<p><strong>• ${s.title}:</strong> ${s.detail}</p>`).join('')}
            </div>
          ` : ''}
          
          ${item.deepDive.urgent ? `
            <div class="urgent">
              <h4>⚠️ URGENT CONCERNS & ACTION ITEMS</h4>
              ${item.deepDive.urgent.map(u => `<p><strong>• ${u.title}:</strong> ${u.detail}</p>`).join('')}
            </div>
          ` : ''}
          
          <h4 style="color:#0ff;margin:15px 0 10px">✅ PROOF & VERIFICATION</h4>
          ${item.deepDive.proofs.map(p => `
            <div class="proof">
              <strong style="color:#ff0">${p.type}:</strong> ${p.detail}
              <br><a href="${p.url}" target="_blank" style="color:#0ff">View Source →</a>
            </div>
          `).join('')}
          
          <h4 style="color:#0ff;margin:15px 0 10px">📅 TIMELINE</h4>
          ${item.deepDive.timeline.map(t => `<p><strong style="color:#0ff">${t.date}:</strong> ${t.event}</p>`).join('')}
          
          <h4 style="color:#0ff;margin:15px 0 10px">🎯 IMPLICATIONS</h4>
          <ul style="margin-left:20px">
            ${item.deepDive.implications.map(i => `<li>${i}</li>`).join('')}
          </ul>
          
          <h4 style="color:#0ff;margin:15px 0 10px">🔗 OFFICIAL SOURCES</h4>
          <ul style="margin-left:20px">
            ${item.deepDive.sources.map(s => `<li><a href="${s.url}" target="_blank" style="color:#0ff">${s.name}</a></li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }).join('');
}

function toggleExpand(index) {
  const item = document.getElementById(`details-${index}`).parentElement;
  item.classList.toggle('expanded');
}

// HACKER NEWS
async function loadNews() {
  try {
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
  } catch (error) {
    console.error('News error:', error);
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
      <h3><a href="${item.url}" target="_blank">${item.title}</a></h3>
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

// REDDIT
async function loadReddit() {
  try {
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
    
    document.getElementById('reddit-container').innerHTML = allPosts.slice(0, 30).map(post => `
      <div class="item">
        <h3><a href="${post.url}" target="_blank">${post.title}</a></h3>
        <div>
          <span class="tag">r/${post.subreddit}</span>
          <span class="tag">⬆ ${post.score}</span>
          <span class="tag">💬 ${post.comments}</span>
          <span class="tag">u/${post.author}</span>
        </div>
        <div class="timestamp">${new Date(post.created * 1000).toLocaleString()}</div>
      </div>
    `).join('');
    
    document.getElementById('reddit-count').textContent = allPosts.length;
  } catch (error) {
    console.error('Reddit error:', error);
  }
}

// GITHUB
async function loadGitHub() {
  try {
    const response = await fetch('https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=20');
    const data = await response.json();
    
    document.getElementById('github-container').innerHTML = data.items.map(repo => `
      <div class="item">
        <h3><a href="${repo.html_url}" target="_blank">${repo.full_name}</a></h3>
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
  } catch (error) {
    console.error('GitHub error:', error);
  }
}

// ARXIV
async function loadResearch() {
  try {
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
        <h3><a href="${paper.link}" target="_blank">${paper.title}</a></h3>
        <p>${paper.summary}...</p>
        <div>
          <span class="tag">${paper.category}</span>
        </div>
        <div class="timestamp">${new Date(paper.published).toLocaleString()}</div>
      </div>
    `).join('');
    
    document.getElementById('research-count').textContent = papers.length;
  } catch (error) {
    console.error('ArXiv error:', error);
  }
}

// PROPER SATELLITE MAP with OpenStreetMap
function initMap() {
  try {
    // Initialize map centered on India
    map = L.map('map').setView([20.5937, 78.9629], 5);
    
    // Add OpenStreetMap tiles (clear land/water distinction)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
      minZoom: 2
    }).addTo(map);
    
    // Add satellite layer option
    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri',
      maxZoom: 19
    });
    
    // Layer control
    const baseMaps = {
      "Street Map": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }),
      "Satellite": satellite
    };
    
    L.control.layers(baseMaps).addTo(map);
    
    // Tech hub markers
    const locations = [
      { lat: 28.6139, lng: 77.2090, name: 'New Delhi', desc: 'Tech Hub', color: 'red' },
      { lat: 12.9716, lng: 77.5946, name: 'Bangalore', desc: 'Silicon Valley of India', color: 'red' },
      { lat: 13.7563, lng: 80.2711, name: 'Chennai - ISRO HQ', desc: 'Space Research', color: 'red' },
      { lat: 37.7749, lng: -122.4194, name: 'San Francisco', desc: 'AI Capital', color: 'blue' },
      { lat: 51.5074, lng: -0.1278, name: 'London', desc: 'Tech Hub', color: 'blue' },
      { lat: 35.6762, lng: 139.6503, name: 'Tokyo', desc: 'Robotics Center', color: 'blue' },
      { lat: 31.2304, lng: 121.4737, name: 'Shanghai', desc: 'Manufacturing AI', color: 'blue' }
    ];
    
    locations.forEach(loc => {
      const marker = L.circleMarker([loc.lat, loc.lng], {
        radius: 8,
        fillColor: loc.color,
        color: '#0f0',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);
      
      marker.bindPopup(`<b style="color:#0f0">${loc.name}</b><br><span style="color:#0a0">${loc.desc}</span>`);
    });
    
    console.log('Map initialized with zoom controls');
  } catch (error) {
    console.error('Map error:', error);
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
    `Last updated: ${new Date().toLocaleString()} • Next refresh in 2 minutes`;
  
  await Promise.all([
    loadNews(),
    loadResearch(),
    loadGitHub(),
    loadReddit()
  ]);
  
  displayBreakthroughs();
  console.log('=== REFRESH COMPLETE ===');
}

window.onload = () => {
  console.log('🚀 Tech Intelligence Hub initializing...');
  
  initMatrix();
  initMap();
  displayBreakthroughs();
  refreshAll();
  
  // Auto-refresh every 2 minutes
  setInterval(refreshAll, 120000);
  
  console.log('✅ System online');
};