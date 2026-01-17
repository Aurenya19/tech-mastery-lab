// 🔬 RESEARCH PAPERS FIX - Override to use fallback data
// This fixes CORS issues with arXiv API

async function loadResearchPapers() {
  try {
    console.log('🔬 Loading research papers (using fallback data)...');
    
    // Use fallback data if available
    if (window.RESEARCH_PAPERS) {
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
      
      const response = await fetch(corsProxy + arxivUrl);
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
      }
    } catch (apiError) {
      console.error('❌ arXiv API failed, using fallback:', apiError);
      // Fallback to empty if no data available
      AppState.allResearch = [];
      displayResearch();
    }
    
  } catch (error) {
    console.error('❌ Research loading error:', error);
    AppState.allResearch = [];
    displayResearch();
  }
}

console.log('✅ Research papers fix loaded!');
