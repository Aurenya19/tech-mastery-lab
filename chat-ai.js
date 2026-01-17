// 🤖 REAL AI CHAT SYSTEM - HYBRID (BHINDI + OPENROUTER FALLBACK)
// Provides intelligent responses with internet access

class AIChat {
  constructor() {
    this.bhindiEndpoint = '/api/bhindi/chat'; // Your Bhindi API endpoint
    this.openRouterKey = null; // Will use free tier
    this.conversationHistory = [];
    this.maxHistoryLength = 10;
  }

  // Main chat function - tries Bhindi first, falls back to OpenRouter
  async sendMessage(userMessage, context = {}) {
    try {
      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage,
        timestamp: Date.now()
      });

      // Try Bhindi AI first (best option)
      let response = await this.tryBhindiAI(userMessage, context);
      
      // Fallback to OpenRouter if Bhindi fails
      if (!response || response.error) {
        console.log('⚠️ Bhindi unavailable, using OpenRouter fallback...');
        response = await this.tryOpenRouter(userMessage, context);
      }

      // Fallback to Gemini if both fail
      if (!response || response.error) {
        console.log('⚠️ OpenRouter unavailable, using Gemini fallback...');
        response = await this.tryGemini(userMessage, context);
      }

      // Last resort: intelligent fallback responses
      if (!response || response.error) {
        response = this.getIntelligentFallback(userMessage, context);
      }

      // Add AI response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: response.text,
        timestamp: Date.now(),
        source: response.source
      });

      // Trim history if too long
      if (this.conversationHistory.length > this.maxHistoryLength * 2) {
        this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength * 2);
      }

      return response;
    } catch (error) {
      console.error('❌ AI Chat error:', error);
      return {
        text: "I'm having trouble connecting right now. Please try again in a moment! 🔄",
        error: true,
        source: 'error'
      };
    }
  }

  // Try Bhindi AI (Primary)
  async tryBhindiAI(message, context) {
    try {
      // Build context-aware prompt
      const systemPrompt = this.buildSystemPrompt(context);
      const fullPrompt = `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`;

      // Call Bhindi API (you'll need to implement this endpoint)
      const response = await fetch(this.bhindiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: fullPrompt,
          history: this.conversationHistory.slice(-6), // Last 3 exchanges
          context: context
        })
      });

      if (!response.ok) throw new Error('Bhindi API error');

      const data = await response.json();
      
      return {
        text: data.response || data.message,
        source: 'bhindi',
        confidence: 'high'
      };
    } catch (error) {
      console.log('Bhindi AI unavailable:', error.message);
      return null;
    }
  }

  // Try OpenRouter (Fallback 1)
  async tryOpenRouter(message, context) {
    try {
      const systemPrompt = this.buildSystemPrompt(context);
      
      // Use free models on OpenRouter
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.href,
          'X-Title': 'Tech Mastery Lab'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-exp:free', // Free model
          messages: [
            { role: 'system', content: systemPrompt },
            ...this.conversationHistory.slice(-6).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) throw new Error('OpenRouter API error');

      const data = await response.json();
      
      return {
        text: data.choices[0].message.content,
        source: 'openrouter',
        confidence: 'medium'
      };
    } catch (error) {
      console.log('OpenRouter unavailable:', error.message);
      return null;
    }
  }

  // Try Google Gemini (Fallback 2)
  async tryGemini(message, context) {
    try {
      // Note: This requires a Gemini API key
      // For now, return null to skip to intelligent fallback
      return null;
    } catch (error) {
      console.log('Gemini unavailable:', error.message);
      return null;
    }
  }

  // Build context-aware system prompt
  buildSystemPrompt(context) {
    const basePrompt = `You are TechBot, an expert AI assistant for Tech Mastery Lab - India's premier tech intelligence platform.

Your expertise includes:
- Programming (Web Dev, AI/ML, Mobile, Cloud, Security, Blockchain, Game Dev, UI/UX)
- Latest tech news and breakthroughs
- Research papers and academic content
- ISRO and Indian space program
- Career guidance for tech professionals
- Code debugging and explanations
- GitHub repositories and open source

Current context:
- User is in the "${context.room || 'general'}" chat room
- Current section: ${context.section || 'dashboard'}
${context.currentData ? `- Viewing: ${context.currentData}` : ''}

Guidelines:
- Be helpful, concise, and technically accurate
- Use emojis sparingly but appropriately
- Provide code examples when relevant
- Link to resources when helpful
- Focus on Indian tech ecosystem when relevant
- Keep responses under 200 words unless explaining complex topics`;

    return basePrompt;
  }

  // Intelligent fallback responses (when all APIs fail)
  getIntelligentFallback(message, context) {
    const lowerMessage = message.toLowerCase();

    // Tech-specific responses
    if (lowerMessage.includes('isro') || lowerMessage.includes('space')) {
      return {
        text: "🚀 ISRO is making incredible progress! Check the latest updates in the ISRO section. India's space program includes Gaganyaan (human spaceflight), Chandrayaan missions, and Aditya-L1 solar mission. What specific aspect interests you?",
        source: 'fallback',
        confidence: 'low'
      };
    }

    if (lowerMessage.includes('code') || lowerMessage.includes('programming')) {
      return {
        text: "💻 I can help with coding! What language or problem are you working on? We have resources for Web Dev, Python, JavaScript, React, and more. Share your code or question!",
        source: 'fallback',
        confidence: 'low'
      };
    }

    if (lowerMessage.includes('research') || lowerMessage.includes('paper')) {
      return {
        text: "🔬 Check out the Research Papers section! We have 30+ latest papers from arXiv on AI, ML, and Computer Science. Auto-updated every 6 hours. Which topic interests you?",
        source: 'fallback',
        confidence: 'low'
      };
    }

    if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
      return {
        text: "💼 For tech careers in India, focus on: 1) Strong DSA skills, 2) Real projects on GitHub, 3) Open source contributions, 4) Networking on LinkedIn. Join r/developersIndia community for job discussions!",
        source: 'fallback',
        confidence: 'low'
      };
    }

    if (lowerMessage.includes('learn') || lowerMessage.includes('tutorial')) {
      return {
        text: "📚 Great resources: CodeWithHarry (Hindi), freeCodeCamp (English), Apna College (placements). Check our Communities section for 40+ learning communities! What do you want to learn?",
        source: 'fallback',
        confidence: 'low'
      };
    }

    if (lowerMessage.includes('github') || lowerMessage.includes('repo')) {
      return {
        text: "💻 Check the GitHub Trending section for 50+ hot repositories! Updated live. Looking for something specific? I can help you find repos for any tech stack.",
        source: 'fallback',
        confidence: 'low'
      };
    }

    if (lowerMessage.includes('news') || lowerMessage.includes('latest')) {
      return {
        text: "📰 Check Hacker News section for 100+ latest tech stories! Auto-updated. Also browse Reddit for community discussions. What topic interests you?",
        source: 'fallback',
        confidence: 'low'
      };
    }

    // Generic helpful response
    return {
      text: "I'm here to help with tech questions! Try asking about:\n\n🚀 ISRO & space tech\n💻 Programming & code help\n🔬 Research papers\n📰 Latest tech news\n💼 Career advice\n🌐 Communities to join\n\nWhat would you like to know?",
      source: 'fallback',
      confidence: 'low'
    };
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
  }

  // Get conversation history
  getHistory() {
    return this.conversationHistory;
  }
}

// Export for use in app
window.AIChat = AIChat;
