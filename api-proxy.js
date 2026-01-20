// 🚀 CLIENT-SIDE API PROXY - CORS Workaround
// Uses public CORS proxies to fetch data

const API_CONFIG = {
  corsProxies: [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://api.codetabs.com/v1/proxy?quest='
  ],
  currentProxyIndex: 0
};

// Get current CORS proxy
function getCorsProxy() {
  return API_CONFIG.corsProxies[API_CONFIG.currentProxyIndex];
}

// Rotate to next proxy if current fails
function rotateProxy() {
  API_CONFIG.currentProxyIndex = (API_CONFIG.currentProxyIndex + 1) % API_CONFIG.corsProxies.length;
  console.log('🔄 Rotating to proxy:', getCorsProxy());
}

// Fetch with CORS proxy
async function fetchWithProxy(url, options = {}) {
  const proxy = getCorsProxy();
  const proxiedUrl = proxy + encodeURIComponent(url);
  
  try {
    const response = await fetch(proxiedUrl, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error('❌ Proxy fetch failed:', error);
    rotateProxy();
    throw error;
  }
}

// ==================== HACKER NEWS API ====================
window.fetchHackerNews = async function() {
  try {
    console.log('📰 Fetching Hacker News via proxy...');
    
    // Fetch top stories
    const topStoriesRes = await fetchWithProxy('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = await topStoriesRes.json();
    
    // Fetch first 50 stories (reduced for speed)
    const stories = await Promise.all(
      storyIds.slice(0, 50).map(async (id) => {
        try {
          const res = await fetchWithProxy(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return await res.json();
        } catch (err) {
          return null;
        }
      })
    );
    
    const validStories = stories.filter(s => s && s.title);
    console.log(`✅ Fetched ${validStories.length} stories`);
    return validStories;
    
  } catch (error) {
    console.error('❌ Hacker News fetch failed:', error);
    // Return fallback data
    return getFallbackNews();
  }
};

// ==================== GITHUB TRENDING API ====================
window.fetchGitHubTrending = async function() {
  try {
    console.log('💻 Fetching GitHub trending via proxy...');
    
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dateStr = lastWeek.toISOString().split('T')[0];
    
    const url = `https://api.github.com/search/repositories?q=created:>${dateStr}&sort=stars&order=desc&per_page=50`;
    const response = await fetchWithProxy(url);
    const data = await response.json();
    
    console.log(`✅ Fetched ${data.items?.length || 0} repos`);
    return data.items || [];
    
  } catch (error) {
    console.error('❌ GitHub fetch failed:', error);
    return getFallbackGitHub();
  }
};

// ==================== REDDIT API ====================
window.fetchRedditPosts = async function() {
  try {
    console.log('🕵️ Fetching Reddit posts via proxy...');
    
    const subreddits = ['programming', 'technology', 'webdev'];
    const allPosts = [];
    
    for (const sub of subreddits) {
      try {
        const url = `https://www.reddit.com/r/${sub}/hot.json?limit=15`;
        const response = await fetchWithProxy(url);
        const data = await response.json();
        
        const posts = data.data.children.map(child => ({
          ...child.data,
          subreddit_name: sub
        }));
        
        allPosts.push(...posts);
      } catch (err) {
        console.error(`Failed to fetch r/${sub}:`, err);
      }
    }
    
    console.log(`✅ Fetched ${allPosts.length} posts`);
    return allPosts.slice(0, 50);
    
  } catch (error) {
    console.error('❌ Reddit fetch failed:', error);
    return getFallbackReddit();
  }
};

// ==================== FALLBACK DATA ====================
function getFallbackNews() {
  return [
    {
      id: 1,
      title: "Show HN: I built a real-time tech news aggregator",
      by: "techmaster",
      score: 850,
      time: Date.now() / 1000,
      descendants: 120,
      url: "https://news.ycombinator.com"
    },
    {
      id: 2,
      title: "Ask HN: What are you working on this week?",
      by: "developer",
      score: 450,
      time: Date.now() / 1000,
      descendants: 89,
      type: "ask"
    },
    {
      id: 3,
      title: "New JavaScript framework promises 10x faster rendering",
      by: "jsdev",
      score: 720,
      time: Date.now() / 1000,
      descendants: 156,
      url: "https://example.com/js-framework"
    }
  ];
}

function getFallbackGitHub() {
  return [
    {
      name: "awesome-project",
      full_name: "user/awesome-project",
      description: "An awesome open source project",
      stargazers_count: 15000,
      forks_count: 2500,
      language: "JavaScript",
      html_url: "https://github.com/user/awesome-project"
    },
    {
      name: "cool-tool",
      full_name: "dev/cool-tool",
      description: "A cool developer tool",
      stargazers_count: 8500,
      forks_count: 1200,
      language: "Python",
      html_url: "https://github.com/dev/cool-tool"
    }
  ];
}

function getFallbackReddit() {
  return [
    {
      title: "What's your favorite programming language and why?",
      author: "redditor1",
      subreddit: "programming",
      score: 450,
      num_comments: 89,
      url: "https://reddit.com/r/programming",
      created_utc: Date.now() / 1000,
      subreddit_name: "programming"
    },
    {
      title: "I built a web app in 24 hours - here's what I learned",
      author: "redditor2",
      subreddit: "webdev",
      score: 320,
      num_comments: 67,
      url: "https://reddit.com/r/webdev",
      created_utc: Date.now() / 1000,
      subreddit_name: "webdev"
    }
  ];
}

console.log('✅ API Proxy loaded with CORS workaround!');
