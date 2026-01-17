// 🤖 CHAT INTEGRATION - Replace fake bot with real AI
// This script integrates AIChat class with the existing chat UI

// Initialize AI Chat
let aiChatInstance = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.AIChat) {
    aiChatInstance = new window.AIChat();
    console.log('✅ AI Chat initialized!');
    updateAIStatus('ready');
  } else {
    console.error('❌ AIChat class not found!');
    updateAIStatus('error');
  }
});

// Update AI status indicator
function updateAIStatus(status) {
  const statusEl = document.getElementById('ai-status');
  if (!statusEl) return;
  
  const statusMessages = {
    ready: '🤖 AI Ready (Bhindi + OpenRouter fallback)',
    thinking: '🤔 AI is thinking...',
    error: '⚠️ AI temporarily unavailable (using fallback)',
    bhindi: '✅ Connected to Bhindi AI',
    openrouter: '🔄 Using OpenRouter fallback',
    fallback: '💡 Using intelligent fallback'
  };
  
  statusEl.textContent = statusMessages[status] || statusMessages.ready;
}

// Get current context for AI
function getCurrentContext() {
  return {
    room: AppState.currentRoom,
    section: getCurrentSection(),
    currentData: getCurrentViewingData()
  };
}

function getCurrentSection() {
  // Determine which section user is viewing
  const panels = document.querySelectorAll('.panel');
  for (const panel of panels) {
    if (panel.querySelector('.panel__content:not(.hidden)')) {
      return panel.id.replace('-panel', '');
    }
  }
  return 'dashboard';
}

function getCurrentViewingData() {
  // Get context about what user is currently viewing
  const section = getCurrentSection();
  
  if (section === 'research') {
    return 'Research Papers section';
  } else if (section === 'hacker-news') {
    return 'Hacker News section';
  } else if (section === 'github') {
    return 'GitHub Trending section';
  } else if (section === 'reddit') {
    return 'Reddit Tech section';
  } else if (section === 'satellite' || section === 'indian-labs') {
    return 'Tech Labs Map section';
  } else if (section === 'communities') {
    return 'Communities section';
  } else if (section === 'quiz') {
    return 'Tech Quiz section';
  }
  
  return 'Dashboard';
}

// Enhanced send message function with AI
async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  if (!input) return;
  
  const message = input.value.trim();
  if (!message) return;
  
  // Add user message to chat
  AppState.chatMessages[AppState.currentRoom].push({
    user: AppState.currentUser || 'You',
    text: sanitizeHTML(message),
    time: Date.now(),
    own: true
  });
  
  input.value = '';
  displayChatMessages();
  
  // Show thinking status
  updateAIStatus('thinking');
  
  try {
    // Get AI response
    const context = getCurrentContext();
    const response = await aiChatInstance.sendMessage(message, context);
    
    // Update status based on source
    if (response.source === 'bhindi') {
      updateAIStatus('bhindi');
    } else if (response.source === 'openrouter') {
      updateAIStatus('openrouter');
    } else if (response.source === 'fallback') {
      updateAIStatus('fallback');
    }
    
    // Add AI response to chat
    AppState.chatMessages[AppState.currentRoom].push({
      user: 'TechBot AI',
      text: response.text,
      time: Date.now(),
      ai: true,
      source: response.source
    });
    
    displayChatMessages();
    
    // Reset status after 3 seconds
    setTimeout(() => updateAIStatus('ready'), 3000);
    
  } catch (error) {
    console.error('Chat error:', error);
    
    // Add error message
    AppState.chatMessages[AppState.currentRoom].push({
      user: 'System',
      text: 'Sorry, I encountered an error. Please try again! 🔄',
      time: Date.now(),
      system: true
    });
    
    displayChatMessages();
    updateAIStatus('error');
  }
}

// Handle Enter key in chat input
function handleChatKeyPress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

// Override the old sendMessage function
if (typeof window.sendMessage !== 'undefined') {
  window.sendMessage = sendChatMessage;
}

console.log('✅ Chat integration loaded!');
