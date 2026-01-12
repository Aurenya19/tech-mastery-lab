const express = require('express');
const cors = require('cors');
const axios = require('axios');
const Parser = require('rss-parser');
const cheerio = require('cheerio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const parser = new Parser();

// ============ NEWS AGGREGATION ============

app.get('/api/news/latest', async (req, res) => {
  try {
    const sources = await Promise.allSettled([
      fetchTechCrunch(),
      fetchHackerNews(),
      fetchMITTechReview(),
      fetchWired()
    ]);
    
    const allNews = sources
      .filter(r => r.status === 'fulfilled')
      .flatMap(r => r.value)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 50);
    
    res.json({ success: true, count: allNews.length, data: allNews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

async function fetchTechCrunch() {
  const feed = await parser.parseURL('https://techcrunch.com/feed/');
  return feed.items.slice(0, 10).map(item => ({
    title: item.title,
    description: item.contentSnippet || item.content?.substring(0, 200),
    url: item.link,
    source: 'TechCrunch',
    category: 'Tech News',
    date: item.pubDate || item.isoDate,
    image: item.enclosure?.url
  }));
}

async function fetchHackerNews() {
  const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
  const topIds = response.data.slice(0, 10);
  const stories = await Promise.all(
    topIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
  );
  return stories.map(s => s.data).map(story => ({
    title: story.title,
    description: story.text || 'No description',
    url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
    source: 'Hacker News',
    category: 'Tech Discussion',
    date: new Date(story.time * 1000).toISOString(),
    score: story.score
  }));
}

async function fetchMITTechReview() {
  const feed = await parser.parseURL('https://www.technologyreview.com/feed/');
  return feed.items.slice(0, 10).map(item => ({
    title: item.title,
    description: item.contentSnippet || item.content?.substring(0, 200),
    url: item.link,
    source: 'MIT Tech Review',
    category: 'Deep Tech',
    date: item.pubDate || item.isoDate
  }));
}

async function fetchWired() {
  const feed = await parser.parseURL('https://www.wired.com/feed/rss');
  return feed.items.slice(0, 10).map(item => ({
    title: item.title,
    description: item.contentSnippet || item.content?.substring(0, 200),
    url: item.link,
    source: 'Wired',
    category: 'Tech Culture',
    date: item.pubDate || item.isoDate
  }));
}

// ============ ARXIV RESEARCH PAPERS ============

app.get('/api/research/arxiv', async (req, res) => {
  try {
    const categories = ['cs.AI', 'cs.LG', 'cs.CR', 'quant-ph', 'physics.space-ph'];
    const papers = [];
    
    for (const cat of categories) {
      const url = `http://export.arxiv.org/api/query?search_query=cat:${cat}&sortBy=submittedDate&sortOrder=descending&max_results=5`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data, { xmlMode: true });
      
      $('entry').each((i, entry) => {
        papers.push({
          title: $(entry).find('title').text().trim(),
          summary: $(entry).find('summary').text().trim().substring(0, 300),
          authors: $(entry).find('author name').map((i, el) => $(el).text()).get(),
          url: $(entry).find('id').text(),
          category: cat,
          published: $(entry).find('published').text(),
          source: 'ArXiv'
        });
      });
    }
    
    res.json({ success: true, count: papers.length, data: papers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ GITHUB TRENDING ============

app.get('/api/github/trending', async (req, res) => {
  try {
    const response = await axios.get('https://github.com/trending', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const $ = cheerio.load(response.data);
    const repos = [];
    
    $('article.Box-row').each((i, elem) => {
      if (i < 20) {
        const repo = $(elem).find('h2 a').attr('href');
        const description = $(elem).find('p').text().trim();
        const stars = $(elem).find('svg.octicon-star').parent().text().trim();
        const language = $(elem).find('[itemprop="programmingLanguage"]').text();
        
        repos.push({
          name: repo,
          url: `https://github.com${repo}`,
          description,
          stars,
          language,
          source: 'GitHub Trending'
        });
      }
    });
    
    res.json({ success: true, count: repos.length, data: repos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ INDIA TECH - ISRO ============

app.get('/api/india/isro', async (req, res) => {
  try {
    const feed = await parser.parseURL('https://www.isro.gov.in/rss.xml');
    const updates = feed.items.slice(0, 15).map(item => ({
      title: item.title,
      description: item.contentSnippet || item.content,
      url: item.link,
      date: item.pubDate || item.isoDate,
      source: 'ISRO Official',
      category: 'Space Program'
    }));
    
    res.json({ success: true, count: updates.length, data: updates });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ OSINT - SOCIAL MONITORING ============

app.get('/api/osint/reddit-tech', async (req, res) => {
  try {
    const subreddits = ['technology', 'Futurology', 'artificial', 'spacex'];
    const posts = [];
    
    for (const sub of subreddits) {
      const response = await axios.get(`https://www.reddit.com/r/${sub}/hot.json?limit=5`);
      response.data.data.children.forEach(post => {
        posts.push({
          title: post.data.title,
          url: `https://reddit.com${post.data.permalink}`,
          score: post.data.score,
          comments: post.data.num_comments,
          subreddit: sub,
          created: new Date(post.data.created_utc * 1000).toISOString(),
          source: 'Reddit'
        });
      });
    }
    
    res.json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ RISK ANALYSIS ============

app.get('/api/risks/current', async (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        title: 'AI Alignment & Safety',
        description: 'Rapid AI advancement without adequate safety measures',
        level: 'CRITICAL',
        probability: 'High',
        impact: 'Existential',
        sources: ['OpenAI', 'Anthropic', 'DeepMind']
      },
      {
        id: 2,
        title: 'Quantum Cryptography Threat',
        description: 'Current encryption vulnerable to quantum computers',
        level: 'HIGH',
        probability: 'Medium (5-10 years)',
        impact: 'Critical Infrastructure',
        sources: ['IBM', 'Google Quantum AI']
      },
      {
        id: 3,
        title: 'Synthetic Biology Risks',
        description: 'CRISPR accessibility enabling bioweapon development',
        level: 'HIGH',
        probability: 'Medium',
        impact: 'Pandemic-level',
        sources: ['WHO', 'CDC']
      }
    ]
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`\n🚀 TECH MASTERY LAB - ONLINE`);
  console.log(`🌐 http://localhost:${PORT}\n`);
});