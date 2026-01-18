// 🔍 SEARCH FUNCTIONS FOR ALL SECTIONS
// Provides real-time search functionality

// Search News
function searchNews() {
  const searchTerm = document.getElementById('news-search')?.value?.toLowerCase() || '';
  const container = document.getElementById('news-list');
  
  if (!container || !AppState.allNews) return;
  
  const filtered = AppState.allNews.filter(item => 
    item.title?.toLowerCase().includes(searchTerm)
  );
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="text-center text-secondary">No news found matching your search.</div>';
    return;
  }
  
  container.innerHTML = filtered.map((item, idx) => `
    <div class="item item--clickable" onclick="window.open('${item.url}', '_blank')">
      <h3 class="item__title">${sanitizeHTML(item.title)}</h3>
      <div class="item__meta">
        <span class="tag">👍 ${item.score || 0} points</span>
        <span class="tag">💬 ${item.descendants || 0} comments</span>
      </div>
      <div class="timestamp">by ${sanitizeHTML(item.by || 'Unknown')} • ${formatTime(new Date(item.time * 1000))}</div>
      <div class="click-hint">Click to read on Hacker News 🔗</div>
    </div>
  `).join('');
}

// Search Research Papers
function searchResearch() {
  const searchTerm = document.getElementById('research-search')?.value?.toLowerCase() || '';
  const container = document.getElementById('research-list');
  
  if (!container || !AppState.allResearch) return;
  
  const filtered = AppState.allResearch.filter(paper => 
    paper.title?.toLowerCase().includes(searchTerm) ||
    paper.summary?.toLowerCase().includes(searchTerm) ||
    paper.authors?.some(author => author.toLowerCase().includes(searchTerm))
  );
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="text-center text-secondary">No research papers found matching your search.</div>';
    return;
  }
  
  container.innerHTML = filtered.map((paper, idx) => {
    // Find original index for openResearchDetail
    const originalIdx = AppState.allResearch.indexOf(paper);
    
    return `
      <div class="item item--clickable" onclick="openResearchDetail(${originalIdx})">
        <h3 class="item__title">${sanitizeHTML(paper.title)}</h3>
        <p class="item__description">${sanitizeHTML(paper.summary?.substring(0, 200) || 'No summary available')}...</p>
        <div class="item__meta">
          <span class="tag">👥 ${paper.authors?.length || 0} authors</span>
          ${paper.category ? `<span class="tag">📚 ${sanitizeHTML(paper.category)}</span>` : ''}
        </div>
        <div class="timestamp">${formatTime(new Date(paper.published))}</div>
        <div class="click-hint">Click for full abstract 📖</div>
      </div>
    `;
  }).join('');
}

// Search GitHub Repos
function searchGitHub() {
  const searchTerm = document.getElementById('github-search')?.value?.toLowerCase() || '';
  const container = document.getElementById('github-list');
  
  if (!container || !AppState.allGitHub) return;
  
  const filtered = AppState.allGitHub.filter(repo => 
    repo.name?.toLowerCase().includes(searchTerm) ||
    repo.description?.toLowerCase().includes(searchTerm) ||
    repo.language?.toLowerCase().includes(searchTerm)
  );
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="text-center text-secondary">No repositories found matching your search.</div>';
    return;
  }
  
  container.innerHTML = filtered.map(repo => `
    <div class="item item--clickable" onclick="window.open('${repo.url}', '_blank')">
      <h3 class="item__title">${sanitizeHTML(repo.name)}</h3>
      <p class="item__description">${sanitizeHTML(repo.description || 'No description available')}</p>
      <div class="item__meta">
        <span class="tag">⭐ ${formatNumber(repo.stars)}</span>
        <span class="tag">🔱 ${formatNumber(repo.forks)}</span>
        ${repo.language ? `<span class="tag">💻 ${sanitizeHTML(repo.language)}</span>` : ''}
      </div>
      <div class="click-hint">Click to open on GitHub 🔗</div>
    </div>
  `).join('');
}

// Search Reddit Posts
function searchReddit() {
  const searchTerm = document.getElementById('reddit-search')?.value?.toLowerCase() || '';
  const container = document.getElementById('reddit-list');
  
  if (!container || !AppState.allReddit) return;
  
  const filtered = AppState.allReddit.filter(post => 
    post.title?.toLowerCase().includes(searchTerm) ||
    post.subreddit?.toLowerCase().includes(searchTerm)
  );
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="text-center text-secondary">No Reddit posts found matching your search.</div>';
    return;
  }
  
  container.innerHTML = filtered.map(post => `
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

// Helper: Format number with K/M suffix
function formatNumber(num) {
  if (!num) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

// Helper: Update count display
function updateCount(elementId, count) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = count;
  }
}

console.log('✅ Search functions loaded!');
