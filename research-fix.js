// 🔬 RESEARCH PAPERS FIX - Override to use fallback data and correct container
// This fixes CORS issues with arXiv API and container ID mismatch

// Override the loadResearchPapers function
async function loadResearchPapers() {
  try {
    console.log('🔬 Loading research papers (using fallback data)...');
    
    // Use fallback data if available
    if (window.RESEARCH_PAPERS && window.RESEARCH_PAPERS.length > 0) {
      AppState.allResearch = window.RESEARCH_PAPERS;
      displayResearch();
      updateCount('research-count', AppState.allResearch.length);
      console.log(`✅ Loaded ${AppState.allResearch.length} research papers from fallback`);
      return;
    }
    
    // Try arXiv API with CORS proxy as backup
    try {
      const corsProxy = 'https://api.allorigins.win/raw?url=';
      const arxivUrl = encodeURIComponent('https://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.LG+OR+cat:cs.CL&sortBy=submittedDate&sortOrder=descending&max_results=30');
      
      const response = await fetch(corsProxy + arxivUrl, { timeout: 5000 });
      const text = await response.text();
      
      // Parse XML
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      const entries = xml.querySelectorAll('entry');
      
      if (entries.length > 0) {
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
        console.log(`✅ Loaded ${AppState.allResearch.length} research papers from arXiv`);
        return;
      }
    } catch (apiError) {
      console.error('❌ arXiv API failed, using fallback:', apiError);
    }
    
    // Final fallback - use empty array
    AppState.allResearch = [];
    displayResearch();
    
  } catch (error) {
    console.error('❌ Research loading error:', error);
    AppState.allResearch = [];
    displayResearch();
  }
}

// Override displayResearch to use correct container ID
function displayResearch() {
  // Try both possible container IDs
  const container = document.getElementById('research-list') || document.getElementById('research-container');
  
  if (!container) {
    console.error('❌ Research container not found!');
    return;
  }
  
  if (!AppState.allResearch || AppState.allResearch.length === 0) {
    container.innerHTML = '<div class="loading">No research papers available. Using fallback data...</div>';
    
    // Try to load fallback data again
    if (window.RESEARCH_PAPERS && window.RESEARCH_PAPERS.length > 0) {
      AppState.allResearch = window.RESEARCH_PAPERS;
      updateCount('research-count', AppState.allResearch.length);
    } else {
      return;
    }
  }
  
  container.innerHTML = AppState.allResearch.map((paper, idx) => `
    <div class="item item--clickable" onclick="openResearchDetail(${idx})">
      <h3 class="item__title">${sanitizeHTML(paper.title)}</h3>
      <p class="item__description">${sanitizeHTML(paper.summary?.substring(0, 200) || 'No summary available')}...</p>
      <div class="item__meta">
        <span class="tag">👥 ${paper.authors?.length || 0} authors</span>
        ${paper.category ? `<span class="tag">📚 ${sanitizeHTML(paper.category)}</span>` : ''}
      </div>
      <div class="timestamp">${formatTime(new Date(paper.published))}</div>
      <div class="click-hint">Click for full abstract 📖</div>
    </div>
  `).join('');
  
  console.log(`✅ Displayed ${AppState.allResearch.length} research papers`);
}

// Helper function for sanitizing HTML (if not already defined)
if (typeof sanitizeHTML === 'undefined') {
  function sanitizeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

// Helper function for formatting time (if not already defined)
if (typeof formatTime === 'undefined') {
  function formatTime(date) {
    if (!date) return 'Unknown date';
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Invalid date';
    
    const now = new Date();
    const diff = now - d;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 30) return d.toLocaleDateString();
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  }
}

console.log('✅ Research papers fix loaded and ready!');
