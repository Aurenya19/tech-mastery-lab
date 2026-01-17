# 🇮🇳 TECH MASTERY LAB - India's Ultimate Tech Intelligence Hub

[![Live Site](https://img.shields.io/badge/Live-Site-brightgreen)](https://aurenya19.github.io/tech-mastery-lab/)
[![Auto-Update](https://img.shields.io/badge/Auto--Update-Enabled-blue)](https://github.com/Aurenya19/tech-mastery-lab/actions)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Real-time tech intelligence platform with automatic content updates, live APIs, and permanent community links!**

## 🚀 LIVE DEMO

**🔗 https://aurenya19.github.io/tech-mastery-lab/**

---

## ✨ KEY FEATURES

### 🤖 **AUTO-UPDATING CONTENT (No Manual Work!)**

✅ **Research Papers** - Auto-updates every 6 hours from arXiv  
✅ **Tech Breakthroughs** - Auto-updates every 12 hours  
✅ **Hacker News** - Live API, 100+ stories  
✅ **GitHub Trending** - Live scraping, 50+ repos  
✅ **Reddit Posts** - Live API, 50+ posts from 10 subreddits  
✅ **Communities** - Permanent links (Reddit, YouTube, LinkedIn) - **NEVER EXPIRE!**

### 📊 **REAL-TIME DATA SOURCES**

- **📰 Hacker News API** - Top 100 stories, live updates
- **💻 GitHub Trending** - 50+ trending repositories
- **🕵️ Reddit API** - 10 tech subreddits, 50+ posts
- **🔬 arXiv API** - Latest AI/ML/CS research papers
- **🛰️ Satellite Maps** - Esri World Imagery (better zoom!)
- **🇮🇳 Indian Labs** - 50+ ISRO, IIT, DRDO, startups

### 🎯 **INTERACTIVE FEATURES**

- **💬 Live Chat** - 8 chat rooms (General, AI/ML, Space, Coding, Career, India, Quiz, Research)
- **🧠 Tech Quiz** - 100 questions across 8 categories
- **🗺️ Interactive Maps** - Global labs + Indian tech centers
- **🌐 Communities** - 40+ permanent community links

---

## 🤖 AUTO-UPDATE SYSTEM

### **GitHub Actions Workflows:**

#### 1️⃣ **Research Papers** (Every 6 hours)
```yaml
Schedule: 0 */6 * * * (00:00, 06:00, 12:00, 18:00 UTC)
Source: arXiv API (cs.AI, cs.LG, cs.CL)
Updates: research-papers.js
```

#### 2️⃣ **Tech Breakthroughs** (Every 12 hours)
```yaml
Schedule: 0 */12 * * * (00:00, 12:00 UTC)
Source: Curated + Live APIs
Updates: intelligence-data.js
```

### **Manual Trigger:**
You can manually trigger updates from GitHub Actions tab!

---

## 🌐 PERMANENT COMMUNITY LINKS

**NO MORE EXPIRED INVITES!** All community links are permanent:

### **Reddit Communities** (Never Expire!)
- r/programming (6M+ members)
- r/learnprogramming (4.5M+ members)
- r/developersIndia (300K+ members)
- r/MachineLearning (2.8M+ members)
- r/ISRO (100K+ members)
- ...and 5 more!

### **YouTube Channels** (Permanent!)
- CodeWithHarry (5M+ subscribers)
- Apna College (4.5M+ subscribers)
- freeCodeCamp (9M+ subscribers)
- Fireship (3M+ subscribers)
- ISRO Official (3M+ subscribers)
- ...and 5 more!

### **LinkedIn Groups** (Permanent!)
- Indian Developers Community (500K+ members)
- AI & Deep Learning (1M+ members)
- Web Developers (800K+ members)
- ...and 3 more!

### **Discord Servers** (Public Permanent Links)
- The Programmer's Hangout (200K+ members)
- Reactiflux (150K+ members)
- Python Discord (400K+ members)
- ...and 2 more!

---

## 🛠️ TECH STACK

- **Frontend:** Vanilla JavaScript (No frameworks!)
- **Styling:** Custom CSS with Matrix theme
- **Maps:** Leaflet.js + Esri World Imagery
- **APIs:** 
  - Hacker News Firebase API
  - GitHub Trending (scraping)
  - Reddit JSON API
  - arXiv API
- **Automation:** GitHub Actions
- **Hosting:** GitHub Pages

---

## 📈 STATS

- **📰 100+ News Stories** (Auto-updating)
- **🔬 30+ Research Papers** (Auto-updating every 6 hours)
- **💻 50+ GitHub Repos** (Live trending)
- **🕵️ 50+ Reddit Posts** (Live from 10 subreddits)
- **🇮🇳 50+ Indian Labs** (ISRO, IIT, DRDO, startups)
- **🧠 100 Quiz Questions** (8 categories)
- **🌐 40+ Communities** (Permanent links!)
- **💬 8 Chat Rooms** (Live discussions)

---

## 🚀 HOW IT WORKS

### **Auto-Update Flow:**

```
GitHub Actions (Cron Job)
    ↓
Fetch Latest Data (arXiv API, etc.)
    ↓
Parse & Format Data
    ↓
Update JavaScript Files
    ↓
Commit & Push to GitHub
    ↓
GitHub Pages Auto-Deploy
    ↓
Live Site Updated! ✅
```

### **User Experience:**

1. **Visit Site** → Fresh data loads automatically
2. **Click Sections** → Expand/collapse panels
3. **Search** → Filter news, labs, etc.
4. **Click Items** → View detailed modals
5. **Join Communities** → Permanent links, never expire!

---

## 🎨 FEATURES BREAKDOWN

### **📰 Hacker News Section**
- Top 100 stories from Hacker News
- Live API integration
- Search functionality
- Click for full details

### **🔬 Research Papers Section**
- Latest 30 papers from arXiv
- Categories: AI, ML, NLP, Computer Vision
- Auto-updates every 6 hours
- Click for full abstract

### **💻 GitHub Trending Section**
- 50+ trending repositories
- Live scraping
- Stars, forks, language info
- Direct GitHub links

### **🕵️ Reddit Section**
- 10 tech subreddits
- 50+ latest posts
- Upvotes, comments, awards
- Direct Reddit links

### **🛰️ Satellite Maps**
- Global tech labs (Area 51, Google X, SpaceX, etc.)
- Indian labs (ISRO, IIT, DRDO, startups)
- Esri World Imagery (better zoom!)
- Interactive markers with details

### **🧠 Tech Quiz**
- 100 questions across 8 categories
- 3 modes: Quick (10Q), Timed (20Q), Practice (50Q)
- Score tracking
- Timer for timed mode

### **💬 Live Chat**
- 8 chat rooms
- Nickname system
- Real-time messaging (simulated)
- Room switching

### **🌐 Communities**
- 40+ permanent community links
- Filter by platform (Reddit, YouTube, LinkedIn, Discord, Telegram)
- Member counts, topics, language info
- Direct join links

---

## 🔧 SETUP & DEPLOYMENT

### **Local Development:**

```bash
# Clone repository
git clone https://github.com/Aurenya19/tech-mastery-lab.git

# Open in browser
cd tech-mastery-lab
open index.html
```

### **GitHub Pages Deployment:**

1. Fork this repository
2. Go to Settings → Pages
3. Source: Deploy from branch `main`
4. Save
5. Wait 1-2 minutes
6. Visit: `https://YOUR-USERNAME.github.io/tech-mastery-lab/`

### **Enable Auto-Updates:**

GitHub Actions are already configured! They will:
- Run automatically on schedule
- Update research papers every 6 hours
- Update breakthroughs every 12 hours
- Commit changes automatically

---

## 📝 FILE STRUCTURE

```
tech-mastery-lab/
├── index.html              # Main HTML file
├── style.css               # Main stylesheet
├── modal-styles.css        # Modal styling
├── communities.css         # Communities section styling
├── app.js                  # Main JavaScript (APIs, maps, chat, quiz)
├── communities-app.js      # Communities functionality
├── research-papers.js      # Research papers data (auto-updated)
├── intelligence-data.js    # Breakthroughs data (auto-updated)
├── quiz-questions.js       # Quiz questions
├── indian-labs.js          # Indian labs data
├── communities.js          # Communities data (permanent links!)
├── research-fix.js         # Research CORS workaround
├── .github/
│   └── workflows/
│       ├── update-research.yml        # Auto-update research
│       └── update-breakthroughs.yml   # Auto-update breakthroughs
└── README.md               # This file
```

---

## 🎯 ROADMAP

- [x] Real-time APIs integration
- [x] Auto-updating research papers
- [x] Auto-updating breakthroughs
- [x] Permanent community links
- [x] Better satellite imagery
- [ ] User authentication
- [ ] Save preferences
- [ ] Real backend for chat
- [ ] Mobile app

---

## 🤝 CONTRIBUTING

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Add more communities
- Improve auto-update scripts

---

## 📜 LICENSE

MIT License - Feel free to use, modify, and distribute!

---

## 🙏 CREDITS

- **APIs:** Hacker News, GitHub, Reddit, arXiv
- **Maps:** Leaflet.js, Esri, OpenStreetMap
- **Automation:** GitHub Actions
- **Hosting:** GitHub Pages

---

## 📞 CONTACT

- **GitHub:** [@Aurenya19](https://github.com/Aurenya19)
- **Live Site:** [Tech Mastery Lab](https://aurenya19.github.io/tech-mastery-lab/)

---

**Made with ❤️ for the Indian Tech Community 🇮🇳**

**Last Updated:** Auto-updated by GitHub Actions ✨
