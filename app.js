// ENHANCED TECH INTELLIGENCE SYSTEM - MAXIMUM CONTENT
let allNews = [];
let allReddit = [];
let allGitHub = [];
let allResearch = [];
let map;
let markers = [];
let markerCluster;
let allLocations = [];
let newsPage = 1;
let isLoading = false;

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

// LOADING INDICATOR
function showLoading(containerId) {
  const container = document.getElementById(containerId);
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'loading';
  loadingDiv.innerHTML = '⏳ Loading fresh data...';
  container.appendChild(loadingDiv);
}

function hideLoading(containerId) {
  const container = document.getElementById(containerId);
  const loading = container.querySelector('.loading');
  if (loading) loading.remove();
}

// AUTO-UPDATE BREAKTHROUGHS
async function autoUpdateBreakthroughs() {
  console.log('🔄 Auto-updating breakthroughs...');
  displayBreakthroughs();
  console.log('✅ Breakthroughs updated');
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

// ENHANCED HACKER NEWS - 100+ STORIES
async function loadNews() {
  if (isLoading) return;
  isLoading = true;
  
  try {
    showLoading('news-container');
    console.log('📰 Loading Hacker News (100+ stories)...');
    
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = await response.json();
    
    // Load 100 stories instead of 30
    const stories = await Promise.all(
      storyIds.slice(0, 100).map(async id => {
        try {
          const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return storyRes.json();
        } catch (e) {
          console.error('Story fetch error:', e);
          return null;
        }
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
    
    hideLoading('news-container');
    displayNews(allNews);
    document.getElementById('news-count').textContent = allNews.length;
    console.log(`✅ Loaded ${allNews.length} news stories`);
  } catch (error) {
    console.error('News error:', error);
    hideLoading('news-container');
    document.getElementById('news-container').innerHTML = 
      '<div class="item"><p style="color:#f00">⚠️ Error loading news. Retrying in 30 seconds...</p></div>';
    setTimeout(loadNews, 30000);
  } finally {
    isLoading = false;
  }
}

function displayNews(news) {
  const container = document.getElementById('news-container');
  if (!news || news.length === 0) {
    container.innerHTML = '<div class="item"><p>No news available</p></div>';
    return;
  }
  
  container.innerHTML = news.map((item, index) => `
    <div class="item" style="animation: slideIn 0.3s ease ${index * 0.02}s both">
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
  document.getElementById('news-count').textContent = filtered.length;
}

// ENHANCED REDDIT - 50+ POSTS from 10 SUBREDDITS
async function loadReddit() {
  try {
    showLoading('reddit-container');
    console.log('🕵️ Loading Reddit (50+ posts from 10 subreddits)...');
    
    const subreddits = [
      'technology', 'Futurology', 'artificial', 'spacex', 'programming',
      'MachineLearning', 'datascience', 'cybersecurity', 'startups', 'gadgets'
    ];
    
    allReddit = [];
    
    for (const sub of subreddits) {
      try {
        const response = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=10`);
        const data = await response.json();
        
        data.data.children.forEach(post => {
          allReddit.push({
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
    
    allReddit.sort((a, b) => b.score - a.score);
    
    hideLoading('reddit-container');
    document.getElementById('reddit-container').innerHTML = allReddit.map((post, index) => `
      <div class="item" style="animation: slideIn 0.3s ease ${index * 0.02}s both">
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
    
    document.getElementById('reddit-count').textContent = allReddit.length;
    console.log(`✅ Loaded ${allReddit.length} Reddit posts`);
  } catch (error) {
    console.error('Reddit error:', error);
    hideLoading('reddit-container');
  }
}

// ENHANCED GITHUB - 50+ REPOS
async function loadGitHub() {
  try {
    showLoading('github-container');
    console.log('💻 Loading GitHub (50+ trending repos)...');
    
    // Multiple queries to get more repos
    const queries = [
      'stars:>1000 created:>2024-01-01',
      'stars:>5000 pushed:>2024-01-01',
      'stars:>10000'
    ];
    
    allGitHub = [];
    
    for (const query of queries) {
      try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=20`);
        const data = await response.json();
        
        if (data.items) {
          data.items.forEach(repo => {
            // Avoid duplicates
            if (!allGitHub.find(r => r.id === repo.id)) {
              allGitHub.push(repo);
            }
          });
        }
      } catch (e) {
        console.error('GitHub query error:', e);
      }
    }
    
    hideLoading('github-container');
    document.getElementById('github-container').innerHTML = allGitHub.slice(0, 50).map((repo, index) => `
      <div class="item" style="animation: slideIn 0.3s ease ${index * 0.02}s both">
        <h3><a href="${repo.html_url}" target="_blank">${repo.full_name}</a></h3>
        <p>${repo.description || 'No description'}</p>
        <div>
          <span class="tag">${repo.language || 'Unknown'}</span>
          <span class="tag">⭐ ${repo.stargazers_count.toLocaleString()}</span>
          <span class="tag">🍴 ${repo.forks_count.toLocaleString()}</span>
          <span class="tag">👁️ ${repo.watchers_count.toLocaleString()}</span>
        </div>
        <div class="timestamp">Updated: ${new Date(repo.updated_at).toLocaleString()}</div>
      </div>
    `).join('');
    
    document.getElementById('github-count').textContent = allGitHub.length;
    console.log(`✅ Loaded ${allGitHub.length} GitHub repos`);
  } catch (error) {
    console.error('GitHub error:', error);
    hideLoading('github-container');
  }
}

// ENHANCED ARXIV - 30+ PAPERS from MULTIPLE CATEGORIES
async function loadResearch() {
  try {
    showLoading('research-container');
    console.log('🔬 Loading ArXiv (30+ research papers)...');
    
    const categories = ['cs.AI', 'cs.LG', 'cs.CV', 'cs.CL', 'cs.RO', 'quant-ph'];
    allResearch = [];
    
    for (const cat of categories) {
      const url = `https://export.arxiv.org/api/query?search_query=cat:${cat}&sortBy=submittedDate&sortOrder=descending&max_results=10`;
      try {
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
          const authors = Array.from(entry.querySelectorAll('author name')).map(a => a.textContent).join(', ');
          
          if (title) {
            allResearch.push({ title, summary, published, link, category: cat, authors });
          }
        });
      } catch (e) {
        console.error(`ArXiv ${cat} error:`, e);
      }
    }
    
    hideLoading('research-container');
    document.getElementById('research-container').innerHTML = allResearch.map((paper, index) => `
      <div class="item" style="animation: slideIn 0.3s ease ${index * 0.02}s both">
        <h3><a href="${paper.link}" target="_blank">${paper.title}</a></h3>
        <p>${paper.summary}...</p>
        <div>
          <span class="tag">${paper.category}</span>
          <span class="tag">👥 ${paper.authors.split(',').length} authors</span>
        </div>
        <div class="timestamp">${new Date(paper.published).toLocaleString()}</div>
      </div>
    `).join('');
    
    document.getElementById('research-count').textContent = allResearch.length;
    console.log(`✅ Loaded ${allResearch.length} research papers`);
  } catch (error) {
    console.error('ArXiv error:', error);
    hideLoading('research-container');
  }
}

// ENHANCED SATELLITE MAP
function initMap() {
  try {
    map = L.map('map', {
      center: [20, 0],
      zoom: 2,
      maxZoom: 20,
      minZoom: 2,
      zoomControl: true
    });
    
    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri',
      maxZoom: 20,
      maxNativeZoom: 19
    }).addTo(map);
    
    const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 20,
      maxNativeZoom: 19
    });
    
    const labels = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Labels © Esri',
      maxZoom: 20,
      maxNativeZoom: 19
    });
    
    const baseMaps = {
      "🛰️ Satellite (High-Res)": satellite,
      "🗺️ Street Map": streetMap
    };
    
    const overlays = {
      "🏷️ Labels": labels
    };
    
    L.control.layers(baseMaps, overlays).addTo(map);
    
    map.on('zoomend', function() {
      const zoom = map.getZoom();
      document.getElementById('zoom-info').textContent = `Zoom: ${zoom} | Max: 20`;
      if (zoom >= 15) console.log('🔍 Street-level view active');
    });
    
    markerCluster = L.markerClusterGroup({
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true
    });
    
    allLocations = [
      { lat: 37.2431, lng: -115.7930, name: 'Area 51 (Groom Lake)', desc: 'CLASSIFIED - USAF Secret Aircraft Testing Facility. Restricted airspace R-4808N. Home to classified projects including stealth aircraft development.', color: 'red', type: 'classified', keywords: 'area 51 groom lake nevada classified secret' },
      { lat: 34.6059, lng: -118.0844, name: 'Skunk Works (Palmdale)', desc: 'Lockheed Martin Advanced Development Programs. Developed SR-71 Blackbird, F-117 Nighthawk, F-22 Raptor, F-35 Lightning II.', color: 'red', type: 'classified', keywords: 'skunk works lockheed martin palmdale classified' },
      { lat: 38.9072, lng: -77.0369, name: 'DARPA HQ (Arlington)', desc: 'Defense Advanced Research Projects Agency. Develops emerging technologies: AI, quantum computing, hypersonics, biotechnology.', color: 'red', type: 'classified', keywords: 'darpa defense research arlington classified' },
      { lat: 37.4220, lng: -122.0841, name: 'Google X Lab (Mountain View)', desc: 'Moonshot Factory - Secret experimental projects. Self-driving cars (Waymo), Project Loon, smart contact lenses, delivery drones.', color: 'blue', type: 'tech', keywords: 'google x lab mountain view moonshot' },
      { lat: 37.3318, lng: -122.0312, name: 'Apple Park (Cupertino)', desc: 'Apple Secret R&D Labs. AR/VR headsets, Apple Silicon chips, autonomous vehicle project (Project Titan), health sensors.', color: 'blue', type: 'tech', keywords: 'apple park cupertino secret labs' },
      { lat: 37.4849, lng: -122.1477, name: 'Meta Reality Labs (Menlo Park)', desc: 'VR/AR/AI Research. Metaverse development, Quest headsets, neural interfaces, haptic gloves, photorealistic avatars.', color: 'blue', type: 'tech', keywords: 'meta reality labs menlo park vr ar' },
      { lat: 37.7749, lng: -122.4194, name: 'OpenAI HQ (San Francisco)', desc: 'Advanced AI Research. GPT models, DALL-E, AGI research, reinforcement learning, AI safety protocols.', color: 'blue', type: 'tech', keywords: 'openai san francisco gpt ai' },
      { lat: 51.5290, lng: -0.1308, name: 'DeepMind (London)', desc: 'Google AI Research Lab. AlphaGo, AlphaFold (protein folding), AlphaZero, healthcare AI, energy optimization.', color: 'blue', type: 'tech', keywords: 'deepmind london google ai alphago' },
      { lat: 47.6062, lng: -122.3321, name: 'Amazon Lab126 (Seattle)', desc: 'Hardware Innovation Lab. Kindle, Echo, Alexa, Ring, Fire TV, drone delivery (Prime Air), cashierless stores.', color: 'blue', type: 'tech', keywords: 'amazon lab126 seattle kindle echo' },
      { lat: 46.2338, lng: 6.0532, name: 'CERN (Geneva)', desc: 'Large Hadron Collider - World\'s largest particle accelerator. Higgs boson discovery, antimatter research, dark matter studies.', color: 'purple', type: 'research', keywords: 'cern geneva lhc particle physics higgs' },
      { lat: 28.5729, lng: 80.6490, name: 'Kennedy Space Center', desc: 'NASA Launch Complex. Artemis Moon missions, ISS operations, Mars rover launches, commercial crew program.', color: 'purple', type: 'research', keywords: 'kennedy space center nasa florida launch' },
      { lat: 25.9970, lng: -97.1551, name: 'SpaceX Starbase (Boca Chica)', desc: 'Starship Development & Testing. Mars colonization vehicle, Super Heavy booster, orbital launches, rapid reusability testing.', color: 'purple', type: 'research', keywords: 'spacex starbase boca chica starship mars' },
      { lat: 31.5497, lng: -97.1081, name: 'Blue Origin (Texas)', desc: 'New Glenn Rocket Facility. Orbital launch systems, BE-4 engines, lunar lander development, space tourism.', color: 'purple', type: 'research', keywords: 'blue origin texas new glenn rocket' },
      { lat: 13.0210, lng: 80.2316, name: 'ISRO HQ (Bangalore)', desc: 'Indian Space Research Organisation. Chandrayaan lunar missions, Gaganyaan human spaceflight, Mars Orbiter, satellite launches.', color: 'orange', type: 'research', keywords: 'isro bangalore india space chandrayaan' },
      { lat: 12.9716, lng: 77.5946, name: 'Bangalore Tech Hub', desc: 'Silicon Valley of India. AI/ML startups, IT services, R&D centers for Google, Microsoft, Amazon, Apple.', color: 'orange', type: 'tech', keywords: 'bangalore india tech hub silicon valley' },
      { lat: 28.6139, lng: 77.2090, name: 'New Delhi Tech Hub', desc: 'Government AI Labs. National AI strategy, digital India initiatives, cybersecurity research, quantum computing.', color: 'orange', type: 'tech', keywords: 'delhi india government ai labs' },
      { lat: 39.9817, lng: 116.3106, name: 'Zhongguancun (Beijing)', desc: 'China Silicon Valley - AI Hub. Baidu AI labs, Tencent research, ByteDance (TikTok), facial recognition, social credit systems.', color: 'yellow', type: 'tech', keywords: 'zhongguancun beijing china ai baidu tencent' },
      { lat: 22.5431, lng: 114.0579, name: 'Huawei R&D (Shenzhen)', desc: '5G/AI Research - 2 sq km campus. 40,000+ engineers, telecommunications, AI chips, autonomous driving, cloud computing.', color: 'yellow', type: 'tech', keywords: 'huawei shenzhen china 5g research' },
      { lat: 23.0489, lng: 113.7447, name: 'Huawei Ox Horn (Dongguan)', desc: '$1.5B European-themed Research Village. 12 architectural styles, advanced labs, 25,000 employees, secretive projects.', color: 'yellow', type: 'tech', keywords: 'huawei ox horn dongguan china research' },
      { lat: 55.6983, lng: 37.3594, name: 'Skolkovo (Moscow)', desc: 'Russia Innovation Center. AI research, cybersecurity, biotech, space technology, government-backed tech hub.', color: 'green', type: 'tech', keywords: 'skolkovo moscow russia innovation ai' },
      { lat: 32.0853, lng: 34.7818, name: 'Unit 8200 (Tel Aviv)', desc: 'Elite Military Intelligence - Cyber warfare unit. NSO Group origins, Pegasus spyware, cybersecurity startups, signal intelligence.', color: 'green', type: 'classified', keywords: 'unit 8200 israel tel aviv cyber intelligence' },
      { lat: 37.5665, lng: 126.9780, name: 'Samsung AI Lab (Seoul)', desc: 'Semiconductor & AI Research. 3nm chip fabrication, neural processors, Bixby AI, robotics, quantum dot displays.', color: 'green', type: 'tech', keywords: 'samsung seoul korea ai semiconductor' },
      { lat: 36.0833, lng: 140.0833, name: 'AIST (Tsukuba)', desc: 'Advanced Industrial Science & Technology. Humanoid robots, automation systems, AI research, materials science.', color: 'green', type: 'research', keywords: 'aist tsukuba japan robotics research' },
      { lat: 35.7804, lng: 139.6590, name: 'RIKEN (Tokyo)', desc: 'Quantum Computing & AI. Fugaku supercomputer (world\'s fastest), quantum algorithms, brain science, genomics.', color: 'green', type: 'research', keywords: 'riken tokyo japan quantum fugaku supercomputer' }
    ];
    
    allLocations.forEach((loc, index) => {
      const markerColor = loc.color;
      const markerSize = loc.type === 'classified' ? 12 : 10;
      
      const marker = L.circleMarker([loc.lat, loc.lng], {
        radius: markerSize,
        fillColor: markerColor,
        color: '#0f0',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.8
      });
      
      const typeLabel = loc.type === 'classified' ? '🔒 CLASSIFIED' : 
                       loc.type === 'tech' ? '💻 TECH LAB' : 
                       '🔬 RESEARCH';
      
      marker.bindPopup(`
        <div style="color:#0f0;background:#000;padding:15px;border:2px solid #0f0;min-width:250px">
          <b style="color:#ff0;font-size:1.2em">${loc.name}</b><br><br>
          <span style="color:#0ff;font-weight:bold">${typeLabel}</span><br><br>
          <span style="color:#0f0;line-height:1.6">${loc.desc}</span><br><br>
          <span style="color:#0a0;font-size:0.85em">📍 ${loc.lat.toFixed(4)}°N, ${Math.abs(loc.lng).toFixed(4)}°${loc.lng >= 0 ? 'E' : 'W'}</span><br>
          <button onclick="zoomToLocation(${loc.lat}, ${loc.lng})" style="margin-top:10px;background:#0f0;color:#000;border:none;padding:8px 15px;cursor:pointer;font-weight:bold">
            🔍 ZOOM TO STREET LEVEL
          </button>
        </div>
      `);
      
      if (loc.type === 'classified') {
        marker.on('mouseover', function() {
          this.setStyle({ fillOpacity: 1, radius: 15, weight: 4 });
        });
        marker.on('mouseout', function() {
          this.setStyle({ fillOpacity: 0.8, radius: 12, weight: 3 });
        });
      } else {
        marker.on('mouseover', function() {
          this.setStyle({ fillOpacity: 1, radius: 13, weight: 4 });
        });
        marker.on('mouseout', function() {
          this.setStyle({ fillOpacity: 0.8, radius: 10, weight: 3 });
        });
      }
      
      markerCluster.addLayer(marker);
      markers.push({ marker, location: loc, index });
    });
    
    map.addLayer(markerCluster);
    
    document.getElementById('lab-search').addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      
      if (!query) {
        map.setView([20, 0], 2);
        return;
      }
      
      const matches = allLocations.filter(loc => 
        loc.keywords.includes(query) || 
        loc.name.toLowerCase().includes(query) ||
        loc.desc.toLowerCase().includes(query)
      );
      
      if (matches.length > 0) {
        const firstMatch = matches[0];
        map.setView([firstMatch.lat, firstMatch.lng], 15);
        
        markers.forEach(m => {
          if (m.location.name === firstMatch.name) {
            m.marker.openPopup();
          }
        });
      }
    });
    
    console.log('✅ Map initialized with', allLocations.length, 'secret locations');
  } catch (error) {
    console.error('Map error:', error);
  }
}

function zoomToLocation(lat, lng) {
  map.setView([lat, lng], 18, {
    animate: true,
    duration: 1
  });
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
    `Last updated: ${now.toLocaleString()} • Next auto-refresh in 1 minute`;
  
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
  console.log('📊 Loading 100+ news, 50+ Reddit posts, 50+ GitHub repos, 30+ papers');
  
  initMatrix();
  initMap();
  displayBreakthroughs();
  refreshAll();
  
  // Auto-refresh every 1 minute (60 seconds)
  setInterval(refreshAll, 60000);
  
  console.log('✅ System online - Auto-refresh every 60 seconds');
};