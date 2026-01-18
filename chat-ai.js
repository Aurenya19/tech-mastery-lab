// 🤖 COMPLETE AI CHAT SYSTEM - SMART RESPONSES
// Provides intelligent, context-aware responses

class AIChat {
  constructor() {
    this.conversationHistory = [];
    this.maxHistoryLength = 20;
    this.userName = 'User';
  }

  // Main chat function with smart responses
  async sendMessage(userMessage, context = {}) {
    try {
      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage,
        timestamp: Date.now()
      });

      // Get intelligent response
      const response = this.getSmartResponse(userMessage, context);

      // Add AI response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: response.text,
        timestamp: Date.now()
      });

      // Trim history if too long
      if (this.conversationHistory.length > this.maxHistoryLength * 2) {
        this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength * 2);
      }

      return response;
    } catch (error) {
      console.error('❌ AI Chat error:', error);
      return {
        text: "I'm having trouble right now. Please try again! 🔄",
        error: true
      };
    }
  }

  // Smart response generator
  getSmartResponse(message, context) {
    const msg = message.toLowerCase();
    
    // Greetings
    if (this.isGreeting(msg)) {
      return this.getGreetingResponse();
    }
    
    // Help requests
    if (this.isHelpRequest(msg)) {
      return this.getHelpResponse(context);
    }
    
    // Tech questions
    if (this.isTechQuestion(msg)) {
      return this.getTechResponse(msg);
    }
    
    // Quiz related
    if (this.isQuizRelated(msg)) {
      return this.getQuizResponse(msg);
    }
    
    // Research related
    if (this.isResearchRelated(msg)) {
      return this.getResearchResponse(msg);
    }
    
    // News related
    if (this.isNewsRelated(msg)) {
      return this.getNewsResponse(msg);
    }
    
    // GitHub related
    if (this.isGitHubRelated(msg)) {
      return this.getGitHubResponse(msg);
    }
    
    // Communities related
    if (this.isCommunitiesRelated(msg)) {
      return this.getCommunitiesResponse(msg);
    }
    
    // Career advice
    if (this.isCareerRelated(msg)) {
      return this.getCareerResponse(msg);
    }
    
    // Learning resources
    if (this.isLearningRelated(msg)) {
      return this.getLearningResponse(msg);
    }
    
    // Default intelligent response
    return this.getContextualResponse(msg, context);
  }

  // Pattern matching helpers
  isGreeting(msg) {
    return /^(hi|hello|hey|namaste|hola|greetings|good morning|good evening)/i.test(msg);
  }

  isHelpRequest(msg) {
    return /help|guide|how to|what is|explain|tutorial|learn/i.test(msg);
  }

  isTechQuestion(msg) {
    return /python|javascript|java|react|node|ai|ml|machine learning|deep learning|neural|algorithm|data structure|coding|programming/i.test(msg);
  }

  isQuizRelated(msg) {
    return /quiz|question|test|exam|practice|score/i.test(msg);
  }

  isResearchRelated(msg) {
    return /research|paper|arxiv|study|publication|academic/i.test(msg);
  }

  isNewsRelated(msg) {
    return /news|hacker news|article|latest|update|trending/i.test(msg);
  }

  isGitHubRelated(msg) {
    return /github|repository|repo|code|project|open source/i.test(msg);
  }

  isCommunitiesRelated(msg) {
    return /community|communities|join|forum|discussion/i.test(msg);
  }

  isCareerRelated(msg) {
    return /career|job|interview|resume|salary|hire|work|company/i.test(msg);
  }

  isLearningRelated(msg) {
    return /learn|course|tutorial|resource|book|video|study/i.test(msg);
  }

  // Response generators
  getGreetingResponse() {
    const greetings = [
      "Hey there! 👋 Welcome to Tech Mastery Lab! How can I help you today?",
      "Hello! 🚀 Ready to explore some amazing tech content?",
      "Hi! 😊 What would you like to learn about today?",
      "Namaste! 🙏 Let's dive into the world of technology together!",
      "Hey! 🎯 I'm here to help you master tech. What's on your mind?"
    ];
    return { text: greetings[Math.floor(Math.random() * greetings.length)] };
  }

  getHelpResponse(context) {
    return {
      text: `🎯 **TECH MASTERY LAB GUIDE**

📰 **News**: Real-time Hacker News stories
🔬 **Research**: Latest AI/ML papers from arXiv
💻 **GitHub**: Trending repositories
🕵️ **Reddit**: Tech discussions
🌐 **Communities**: 40+ tech communities
🧠 **Quiz**: 100 questions across 8 categories
🗺️ **Maps**: Global & Indian tech labs
💬 **Chat**: AI-powered assistance (that's me!)

**Try asking:**
- "Show me AI research papers"
- "Start a quick quiz"
- "What's trending on GitHub?"
- "Tell me about Python"
- "Career advice for developers"

What would you like to explore? 🚀`
    };
  }

  getTechResponse(msg) {
    if (/python/i.test(msg)) {
      return {
        text: `🐍 **PYTHON**

Python is one of the most popular programming languages! Here's why:

✅ **Easy to Learn**: Clean, readable syntax
✅ **Versatile**: Web, AI/ML, Data Science, Automation
✅ **Huge Community**: Tons of libraries and resources
✅ **High Demand**: Great career opportunities

**Popular Libraries:**
- NumPy, Pandas (Data Science)
- TensorFlow, PyTorch (AI/ML)
- Django, Flask (Web Development)
- Selenium, BeautifulSoup (Automation)

**Learning Path:**
1. Basics (variables, loops, functions)
2. OOP (classes, inheritance)
3. Libraries (NumPy, Pandas)
4. Projects (build real apps!)

Check our Research section for Python-related papers! 🔬`
      };
    }
    
    if (/javascript|js/i.test(msg)) {
      return {
        text: `⚡ **JAVASCRIPT**

The language of the web! Essential for modern development.

✅ **Frontend**: React, Vue, Angular
✅ **Backend**: Node.js, Express
✅ **Mobile**: React Native
✅ **Desktop**: Electron

**Key Concepts:**
- ES6+ features (arrow functions, async/await)
- DOM manipulation
- Promises & async programming
- Frameworks & libraries

**Trending JS Projects:**
Check our GitHub section for hot JavaScript repos! 💻`
      };
    }
    
    if (/ai|ml|machine learning|deep learning/i.test(msg)) {
      return {
        text: `🤖 **AI & MACHINE LEARNING**

The future is here! AI/ML is transforming everything.

**Hot Topics:**
- Large Language Models (GPT, BERT)
- Computer Vision
- Natural Language Processing
- Reinforcement Learning
- Neural Networks

**Getting Started:**
1. Learn Python basics
2. Study math (linear algebra, calculus)
3. Take online courses (Coursera, fast.ai)
4. Build projects!

**Resources on this site:**
📰 Check Hacker News for AI discussions
🔬 Browse Research Papers for latest AI papers
💻 GitHub has amazing AI projects

Want specific AI paper recommendations? 🚀`
      };
    }
    
    return {
      text: `💡 Great question about tech! 

I can help you with:
- Programming languages (Python, JavaScript, Java, etc.)
- AI/ML concepts
- Web development
- Data structures & algorithms
- Career advice

Try browsing our sections:
📰 News for latest tech updates
🔬 Research for academic papers
💻 GitHub for trending projects

What specific topic interests you? 🎯`
    };
  }

  getQuizResponse(msg) {
    return {
      text: `🧠 **TECH QUIZ**

Test your knowledge with 100 questions!

**Categories:**
- Web Development
- AI/ML
- Mobile Development
- Cloud Computing
- Security
- Blockchain
- General Tech

**Modes:**
⚡ Quick (10 questions)
⏱️ Timed (20 questions, race against time!)
📚 Practice (50 questions, learn at your pace)

**Earn XP & Achievements!**
Complete quizzes to level up and unlock achievements! 🏆

Ready to start? Click the Quiz section above! 🎯`
    };
  }

  getResearchResponse(msg) {
    return {
      text: `🔬 **RESEARCH PAPERS**

Access 30+ cutting-edge AI/ML papers from arXiv!

**Featured Papers:**
- Attention Is All You Need (Transformers)
- BERT (Language Understanding)
- GPT-3 (Few-Shot Learning)
- ResNet (Image Recognition)
- GANs (Generative Models)

**How to Use:**
1. Browse the Research section
2. Use search to find specific topics
3. Click any paper for full abstract
4. Read on arXiv for complete paper

**Pro Tip:** Papers auto-update every 6 hours! 🔄

Looking for something specific? Try searching! 🔍`
    };
  }

  getNewsResponse(msg) {
    return {
      text: `📰 **TECH NEWS**

Stay updated with real-time Hacker News!

**What You'll Find:**
- Latest tech breakthroughs
- Startup news
- Programming discussions
- Industry trends
- Product launches

**Features:**
✅ Live API integration
✅ Real-time updates
✅ Search functionality
✅ Direct links to discussions

**Pro Tip:** Check multiple times a day for fresh content! 🔄

Want to see what's trending now? Check the News section! 🚀`
    };
  }

  getGitHubResponse(msg) {
    return {
      text: `💻 **GITHUB TRENDING**

Discover the hottest open-source projects!

**What's Trending:**
- Popular repositories
- Rising stars
- Language-specific projects
- Active development

**Why It Matters:**
✅ Learn from real code
✅ Contribute to open source
✅ Build your portfolio
✅ Network with developers

**Pro Tip:** Star interesting repos and contribute! 🌟

Check the GitHub section for today's trending repos! 🔥`
    };
  }

  getCommunitiesResponse(msg) {
    return {
      text: `🌐 **TECH COMMUNITIES**

Join 40+ active tech communities!

**Categories:**
- Programming Languages
- Frameworks & Tools
- AI & Machine Learning
- Web Development
- Mobile Development
- DevOps & Cloud
- And more!

**Features:**
✅ Live member counts
✅ Activity tracking
✅ Trending communities
✅ Join/unjoin tracking

**Earn XP:** Join communities to earn XP and achievements! 🏆

Explore the Communities section to find your tribe! 🚀`
    };
  }

  getCareerResponse(msg) {
    return {
      text: `💼 **CAREER ADVICE**

Building a successful tech career!

**Key Steps:**
1. **Learn Fundamentals**: Master one language deeply
2. **Build Projects**: Portfolio > Certificates
3. **Contribute**: Open source, GitHub
4. **Network**: Communities, LinkedIn, Twitter
5. **Interview Prep**: LeetCode, System Design

**Hot Career Paths:**
- Full Stack Developer
- AI/ML Engineer
- DevOps Engineer
- Mobile Developer
- Data Scientist

**Resources Here:**
📰 News: Industry trends
🔬 Research: Cutting-edge tech
💻 GitHub: Real projects
🧠 Quiz: Test your skills

**Pro Tip:** Consistency > Intensity. Code daily! 💪

Need specific advice? Ask away! 🎯`
    };
  }

  getLearningResponse(msg) {
    return {
      text: `📚 **LEARNING RESOURCES**

Your path to tech mastery!

**Free Resources:**
- freeCodeCamp (Web Dev)
- CS50 (Computer Science)
- fast.ai (AI/ML)
- The Odin Project (Full Stack)
- Coursera (Various topics)

**Practice Platforms:**
- LeetCode (Algorithms)
- HackerRank (Coding)
- Kaggle (Data Science)
- CodeWars (Challenges)

**On This Site:**
🧠 Quiz: Test knowledge
🔬 Research: Academic papers
📰 News: Stay updated
💻 GitHub: Real projects

**Learning Path:**
1. Pick a goal
2. Learn fundamentals
3. Build projects
4. Get feedback
5. Repeat!

What do you want to learn? 🚀`
    };
  }

  getContextualResponse(msg, context) {
    const responses = [
      `Interesting question! 🤔 Try exploring our sections for more info:
📰 News for latest updates
🔬 Research for deep dives
💻 GitHub for projects
🧠 Quiz to test yourself`,
      
      `Great question! 💡 Here's what I suggest:
1. Browse the relevant section
2. Use search to find specific topics
3. Click items for detailed info
4. Ask me if you need help!`,
      
      `I'm here to help! 🚀 
- Ask about tech topics
- Request quiz recommendations
- Get career advice
- Learn about features

What would you like to know more about?`,
      
      `That's a good question! 🎯
Check out:
📰 News section for latest info
🔬 Research for academic insights
💻 GitHub for code examples
🌐 Communities to discuss

Need something specific? Just ask!`
    ];
    
    return { text: responses[Math.floor(Math.random() * responses.length)] };
  }
}

// Make AIChat available globally
window.AIChat = AIChat;

console.log('✅ AI Chat system loaded!');
