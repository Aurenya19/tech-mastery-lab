# 🇮🇳 TECH MASTERY LAB - India's Ultimate Tech Intelligence Hub

[![Auto-Update Research](https://github.com/Aurenya19/tech-mastery-lab/actions/workflows/update-research.yml/badge.svg)](https://github.com/Aurenya19/tech-mastery-lab/actions/workflows/update-research.yml)
[![Auto-Update Breakthroughs](https://github.com/Aurenya19/tech-mastery-lab/actions/workflows/update-breakthroughs.yml/badge.svg)](https://github.com/Aurenya19/tech-mastery-lab/actions/workflows/update-breakthroughs.yml)
[![Live Site](https://img.shields.io/badge/Live-Site-00ff00)](https://aurenya19.github.io/tech-mastery-lab/)

> **A comprehensive, auto-updating tech intelligence platform built for the Indian tech community**

---

## 🚀 **LIVE DEMO**

**👉 [https://aurenya19.github.io/tech-mastery-lab/](https://aurenya19.github.io/tech-mastery-lab/)**

---

## ✨ **KEY FEATURES**

### 📰 **Real-Time Tech News**
- **Hacker News** - Live API integration
- **Reddit Tech** - r/technology, r/programming, r/india
- **GitHub Trending** - Latest trending repositories
- All updated on every page load!

### 🔬 **Research Papers (AUTO-UPDATED)**
- **arXiv Integration** - Latest AI/ML/CS papers
- **Auto-updates every 6 hours** via GitHub Actions
- Categories: AI, Machine Learning, Computer Science
- Direct links to papers

### 🤖 **AI-Powered Chat**
- **3-Tier AI System:**
  1. **Bhindi AI** (Primary) - Best quality, internet access
  2. **OpenRouter** (Fallback 1) - Free Gemini 2.0 Flash
  3. **Intelligent Fallback** (Fallback 2) - Context-aware offline responses
- **8 Specialized Rooms:** General, AI/ML, Space Tech, Coding, Career, India Tech, Quiz, Research
- **Context-Aware:** Knows which section you're viewing
- **Conversation History:** Remembers last 10 exchanges

### 🗺️ **Interactive Maps**
- **Global Tech Labs** - Satellite view with Esri imagery
- **Indian Tech Labs** - 50+ locations (ISRO, IIT, IIIT, NIT, etc.)
- **Cluster Markers** - Clean visualization
- **Detailed Info** - Click markers for lab details

### 🌐 **Tech Communities (40+ Permanent Links)**
- **Reddit Communities** - r/india, r/technology, r/programming, etc.
- **YouTube Channels** - Tech education, tutorials, news
- **LinkedIn Groups** - Professional networking
- **Discord Servers** - Real-time discussions
- **All links are permanent** - Never expire!

### 🧠 **Tech Quiz**
- **100 Questions** across 8 categories
- **3 Modes:** Quick (10Q), Timed (20Q), Practice (50Q)
- **Categories:** Web Dev, AI/ML, Mobile, Cloud, Security, Blockchain, General
- **Real-time scoring** and feedback

---

## 🤖 **AUTO-UPDATE SYSTEM**

### **GitHub Actions Workflows:**

#### 1️⃣ **Research Papers** (Every 6 hours)
```yaml
Schedule: 00:00, 06:00, 12:00, 18:00 UTC
Source: arXiv API
Categories: cs.AI, cs.LG, cs.CL
Output: research-papers.js
```

#### 2️⃣ **Tech Breakthroughs** (Every 12 hours)
```yaml
Schedule: 00:00, 12:00 UTC
Source: Multiple tech news APIs
Output: breakthroughs.js
```

**✅ ZERO MANUAL WORK REQUIRED!**

---

## 🎨 **DESIGN & BRANDING**

### **Custom Logo**
- 🇮🇳 Indian theme with tricolor accent
- 🧠 Tech brain with microchip design
- 🛰️ Orbital rings for global reach
- ⚡ Circuit pattern aesthetic
- 💚 Matrix-style green/cyan glow

### **Professional UI**
- Matrix-style background animation
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Clean, modern interface
- Accessibility-focused

---

## 📊 **TECH STACK**

### **Frontend**
- Pure HTML5, CSS3, JavaScript (No frameworks!)
- Leaflet.js for maps
- Custom CSS with BEM methodology
- Responsive grid layout

### **APIs & Data Sources**
- Hacker News API
- Reddit JSON API
- GitHub (scraping)
- arXiv API
- Esri Satellite Imagery

### **Automation**
- GitHub Actions
- Cron-based scheduling
- Automated commits

---

## 🚀 **GETTING STARTED**

### **1. Clone Repository**
```bash
git clone https://github.com/Aurenya19/tech-mastery-lab.git
cd tech-mastery-lab
```

### **2. Open Locally**
```bash
# Just open index.html in browser
open index.html  # Mac
start index.html # Windows
xdg-open index.html # Linux
```

### **3. Deploy to GitHub Pages**
1. Go to repository Settings
2. Navigate to Pages
3. Select `main` branch
4. Save and wait for deployment

---

## 📁 **PROJECT STRUCTURE**

```
tech-mastery-lab/
├── index.html              # Main HTML file
├── style.css               # Main stylesheet
├── chat-fix.css            # Chat system fixes
├── logo-styles.css         # Logo animations
├── communities.css         # Communities styling
├── modal-styles.css        # Modal styling
├── app.js                  # Main application logic
├── chat-ai.js              # AI chat system
├── chat-integration.js     # Chat UI integration
├── communities-app.js      # Communities functionality
├── quiz-questions.js       # Quiz data
├── indian-labs.js          # Indian labs data
├── communities.js          # Communities data
├── research-papers.js      # Research papers (auto-updated)
├── research-fix.js         # Research display logic
├── logo.svg                # Main logo
├── favicon.svg             # Browser icon
├── .github/
│   └── workflows/
│       ├── update-research.yml        # Auto-update research
│       └── update-breakthroughs.yml   # Auto-update breakthroughs
└── README.md               # This file
```

---

## 🔧 **CUSTOMIZATION**

### **Add More Communities**
Edit `communities.js`:
```javascript
{
  name: "Your Community",
  category: "reddit", // or youtube, linkedin, discord
  url: "https://...",
  description: "Description",
  members: "10K+"
}
```

### **Add More Quiz Questions**
Edit `quiz-questions.js`:
```javascript
{
  question: "Your question?",
  options: ["A", "B", "C", "D"],
  correct: 0, // Index of correct answer
  category: "Web Dev",
  difficulty: "medium"
}
```

### **Add More Indian Labs**
Edit `indian-labs.js`:
```javascript
{
  name: "Lab Name",
  lat: 28.6139,
  lng: 77.2090,
  type: "Research",
  description: "Description"
}
```

---

## 🤝 **CONTRIBUTING**

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📝 **TODO / ROADMAP**

### **Phase 1: Core Features** ✅
- [x] Real-time news integration
- [x] Research papers auto-update
- [x] AI chat system
- [x] Interactive maps
- [x] Tech quiz
- [x] Communities section

### **Phase 2: Enhancements** 🚧
- [ ] User authentication
- [ ] Bookmark/save features
- [ ] Dark/light theme toggle
- [ ] Advanced search filters
- [ ] Export data functionality
- [ ] Mobile app (PWA)

### **Phase 3: Advanced** 📋
- [ ] Real-time notifications
- [ ] Personalized recommendations
- [ ] Community forums
- [ ] Job board integration
- [ ] Event calendar
- [ ] Newsletter system

---

## 🐛 **KNOWN ISSUES & FIXES**

### **Chat System**
- ✅ **FIXED:** Chat overflow and overlap issues
- ✅ **FIXED:** Proper scrolling with many messages
- ✅ **FIXED:** Mobile responsiveness

### **Auto-Updates**
- ✅ **WORKING:** Research papers update every 6 hours
- ✅ **WORKING:** Breakthroughs update every 12 hours
- Check Actions tab for workflow status

### **Performance**
- All APIs are cached for better performance
- Lazy loading for images
- Optimized JavaScript execution

---

## 📄 **LICENSE**

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 **AUTHOR**

**Ritika Saini**
- GitHub: [@Aurenya19](https://github.com/Aurenya19)
- Email: ritikasainirits@gmail.com

---

## 🙏 **ACKNOWLEDGMENTS**

- **Hacker News** for news API
- **Reddit** for community data
- **arXiv** for research papers
- **GitHub** for trending repos
- **Esri** for satellite imagery
- **Leaflet.js** for mapping
- **Indian Tech Community** for inspiration

---

## 📊 **STATS**

- **40+ Communities** with permanent links
- **50+ Indian Labs** mapped
- **100 Quiz Questions** across 8 categories
- **Auto-updates** every 6-12 hours
- **3-Tier AI** chat system
- **100% Free** and open source

---

## 🔗 **LINKS**

- **Live Site:** https://aurenya19.github.io/tech-mastery-lab/
- **Repository:** https://github.com/Aurenya19/tech-mastery-lab
- **Issues:** https://github.com/Aurenya19/tech-mastery-lab/issues
- **Discussions:** https://github.com/Aurenya19/tech-mastery-lab/discussions

---

## 💡 **SUPPORT**

If you find this project helpful:
- ⭐ **Star** the repository
- 🐛 **Report** bugs via Issues
- 💬 **Share** with the community
- 🤝 **Contribute** improvements

---

**Made with ❤️ for the Indian Tech Community 🇮🇳**

*Last Updated: January 2025*
