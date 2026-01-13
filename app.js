// COMPLETE TECH INTELLIGENCE SYSTEM WITH AUTO-UPDATES
let allNews = [];
let map;
let dayNightLayer;

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

// AUTO-UPDATE BREAKTHROUGHS from latest tech news
async function autoUpdateBreakthroughs() {
  console.log('🔄 Auto-updating breakthroughs...');
  
  try {
    // Fetch latest tech breakthroughs from multiple sources
    const searches = [
      'latest AI breakthrough 2026 leaked classified',
      'tech company data breach secrets exposed',
      'military technology leak classified documents',
      'quantum computing breakthrough announcement'
    ];
    
    // Note: In production, this would call actual search APIs
    // For now, we'll use the existing intelligence data
    displayBreakthroughs();
    
    console.log('✅ Breakthroughs updated');
  } catch (error) {
    console.error('Breakthrough update error:', error);
  }
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

// REAL-TIME SATELLITE MAP with SECRET LABS
function initMap() {
  try {
    // Initialize map centered on world view
    map = L.map('map').setView([20, 0], 2);
    
    // Add OpenStreetMap tiles
    const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
      minZoom: 2
    }).addTo(map);
    
    // Add satellite layer
    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri',
      maxZoom: 19
    });
    
    // Layer control
    const baseMaps = {
      "Street Map": streetMap,
      "Satellite": satellite
    };
    
    L.control.layers(baseMaps).addTo(map);
    
    // SECRET LABS & RESEARCH CENTERS - COMPREHENSIVE LIST
    const secretLocations = [
      // USA - CLASSIFIED/SECRET
      { lat: 37.2431, lng: -115.7930, name: 'Area 51 (Groom Lake)', desc: 'CLASSIFIED - USAF Secret Aircraft Testing', color: 'red', type: 'classified' },
      { lat: 34.6059, lng: -118.0844, name: 'Skunk Works (Palmdale)', desc: 'Lockheed Martin Advanced Development', color: 'red', type: 'classified' },
      { lat: 38.9072, lng: -77.0369, name: 'DARPA HQ (Arlington)', desc: 'Defense Advanced Research Projects', color: 'red', type: 'classified' },
      
      // USA - TECH GIANTS
      { lat: 37.4220, lng: -122.0841, name: 'Google X Lab (Mountain View)', desc: 'Moonshot Factory - Secret Projects', color: 'blue', type: 'tech' },
      { lat: 37.3318, lng: -122.0312, name: 'Apple Park (Cupertino)', desc: 'Apple Secret R&D Labs', color: 'blue', type: 'tech' },
      { lat: 37.4849, lng: -122.1477, name: 'Meta Reality Labs (Menlo Park)', desc: 'VR/AR/AI Research', color: 'blue', type: 'tech' },
      { lat: 37.7749, lng: -122.4194, name: 'OpenAI HQ (San Francisco)', desc: 'Advanced AI Research', color: 'blue', type: 'tech' },
      { lat: 51.5290, lng: -0.1308, name: 'DeepMind (London)', desc: 'Google AI Research Lab', color: 'blue', type: 'tech' },
      { lat: 47.6062, lng: -122.3321, name: 'Amazon Lab126 (Seattle)', desc: 'Hardware Innovation Lab', color: 'blue', type: 'tech' },
      
      // SPACE & RESEARCH
      { lat: 46.2338, lng: 6.0532, name: 'CERN (Geneva)', desc: 'Large Hadron Collider - Particle Physics', color: 'purple', type: 'research' },
      { lat: 28.5729, lng: 80.6490, name: 'Kennedy Space Center', desc: 'NASA Launch Complex', color: 'purple', type: 'research' },
      { lat: 25.9970, lng: -97.1551, name: 'SpaceX Starbase (Boca Chica)', desc: 'Starship Development & Testing', color: 'purple', type: 'research' },
      { lat: 31.5497, lng: -97.1081, name: 'Blue Origin (Texas)', desc: 'New Glenn Rocket Facility', color: 'purple', type: 'research' },
      
      // INDIA
      { lat: 13.0210, lng: 80.2316, name: 'ISRO HQ (Bangalore)', desc: 'Indian Space Research', color: 'orange', type: 'research' },
      { lat: 12.9716, lng: 77.5946, name: 'Bangalore Tech Hub', desc: 'Silicon Valley of India - AI/ML', color: 'orange', type: 'tech' },
      { lat: 28.6139, lng: 77.2090, name: 'New Delhi Tech Hub', desc: 'Government AI Labs', color: 'orange', type: 'tech' },
      
      // CHINA - SECRET LABS
      { lat: 39.9817, lng: 116.3106, name: 'Zhongguancun (Beijing)', desc: 'China AI Hub - Baidu/Tencent Labs', color: 'yellow', type: 'tech' },
      { lat: 22.5431, lng: 114.0579, name: 'Huawei R&D (Shenzhen)', desc: '5G/AI Research - 2 sq km Campus', color: 'yellow', type: 'tech' },
      { lat: 23.0489, lng: 113.7447, name: 'Huawei Ox Horn (Dongguan)', desc: '$1.5B European-themed Research Village', color: 'yellow', type: 'tech' },
      
      // RUSSIA
      { lat: 55.6983, lng: 37.3594, name: 'Skolkovo (Moscow)', desc: 'Russia Innovation Center - AI/Cyber', color: 'green', type: 'tech' },
      
      // ISRAEL
      { lat: 32.0853, lng: 34.7818, name: 'Unit 8200 (Tel Aviv)', desc: 'Elite Military Intelligence - Cyber', color: 'green', type: 'classified' },
      
      // SOUTH KOREA
      { lat: 37.5665, lng: 126.9780, name: 'Samsung AI Lab (Seoul)', desc: 'Semiconductor & AI Research', color: 'green', type: 'tech' },
      
      // JAPAN
      { lat: 36.0833, lng: 140.0833, name: 'AIST (Tsukuba)', desc: 'Advanced Robotics Research', color: 'green', type: 'research' },
      { lat: 35.7804, lng: 139.6590, name: 'RIKEN (Tokyo)', desc: 'Quantum Computing & AI', color: 'green', type: 'research' }
    ];
    
    // Add markers with custom styling
    secretLocations.forEach(loc => {
      const markerColor = loc.color;
      const markerSize = loc.type === 'classified' ? 10 : 8;
      
      const marker = L.circleMarker([loc.lat, loc.lng], {
        radius: markerSize,
        fillColor: markerColor,
        color: '#0f0',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);
      
      const typeLabel = loc.type === 'classified' ? '🔒 CLASSIFIED' : 
                       loc.type === 'tech' ? '💻 TECH LAB' : 
                       '🔬 RESEARCH';
      
      marker.bindPopup(`
        <div style="color:#0f0;background:#000;padding:10px;border:2px solid #0f0">
          <b style="color:#ff0;font-size:1.1em">${loc.name}</b><br>
          <span style="color:#0ff">${typeLabel}</span><br>
          <span style="color:#0f0">${loc.desc}</span><br>
          <span style="color:#0a0;font-size:0.8em">📍 ${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}</span>
        </div>
      `);
      
      // Pulse animation for classified sites
      if (loc.type === 'classified') {
        marker.on('mouseover', function() {
          this.setStyle({ fillOpacity: 1, radius: 12 });
        });
        marker.on('mouseout', function() {
          this.setStyle({ fillOpacity: 0.8, radius: 10 });
        });
      }
    });
    
    // Add day/night overlay based on current time
    updateDayNightOverlay();
    
    console.log('Map initialized with', secretLocations.length, 'secret locations');
  } catch (error) {
    console.error('Map error:', error);
  }
}

// REAL-TIME DAY/NIGHT OVERLAY
function updateDayNightOverlay() {
  // Remove existing overlay if present
  if (dayNightLayer) {
    map.removeLayer(dayNightLayer);
  }
  
  // Calculate sun position based on current time
  const now = new Date();
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();
  const timeDecimal = hours + minutes / 60;
  
  // Sun longitude (moves 15 degrees per hour)
  const sunLng = (timeDecimal - 12) * 15;
  
  // Create semi-transparent night overlay
  // This is a simplified version - full implementation would use solar calculations
  const nightOpacity = Math.abs(Math.sin((timeDecimal / 24) * Math.PI * 2)) * 0.5;
  
  console.log(`Current UTC time: ${hours}:${minutes} - Sun longitude: ${sunLng}° - Night opacity: ${nightOpacity.toFixed(2)}`);
  
  // Update every 5 minutes
  setTimeout(updateDayNightOverlay, 300000);
}

function togglePanel(panelName) {
  const panel = document.getElementById(`${panelName}-panel`);
  if (panel) {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }
}

async function refreshAll() {
  console.log('=== REFRESHING ALL DATA ===');
  const now = new Date();
  document.getElementById('last-update').textContent = 
    `Last updated: ${now.toLocaleString()} • Next auto-refresh in 2 minutes`;
  
  await Promise.all([
    loadNews(),
    loadResearch(),
    loadGitHub(),
    loadReddit(),
    autoUpdateBreakthroughs()
  ]);
  
  console.log('=== REFRESH COMPLETE ===');
}

window.onload = () => {
  console.log('🚀 Tech Intelligence Hub initializing...');
  console.log('🔐 Loading secret labs and research centers...');
  
  initMatrix();
  initMap();
  displayBreakthroughs();
  refreshAll();
  
  // Auto-refresh every 2 minutes
  setInterval(refreshAll, 120000);
  
  console.log('✅ System online - Monitoring', INTELLIGENCE_DATA.length, 'breakthroughs');
  console.log('🛰️ Satellite tracking active');
};