// 🤖 CHAT INTEGRATION - Connect AI with UI
// This script integrates AIChat class with the existing chat UI

// Initialize AI Chat
let aiChatInstance = null;

// Initialize when DOM is ready
function initAIChat() {
  if (window.AIChat) {
    aiChatInstance = new window.AIChat();
    console.log('✅ AI Chat initialized!');
    updateAIStatus('ready');
  } else {
    console.error('❌ AIChat class not found!');
    setTimeout(initAIChat, 500); // Retry
  }
}

// Call init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAIChat);
} else {
  initAIChat();
}

// Update AI status indicator
function updateAIStatus(status) {
  const statusEl = document.getElementById('ai-status');
  if (!statusEl) return;
  
  const statusMessages = {
    ready: '🤖 AI Ready - Ask me anything!',
    thinking: '🤔 AI is thinking...',
    error: '⚠️ AI temporarily unavailable',
    responding: '✍️ AI is responding...'
  };
  
  statusEl.textContent = statusMessages[status] || statusMessages.ready;
}

// Get current context for AI
function getCurrentContext() {
  return {
    room: AppState?.currentRoom || 'general',
    section: getCurrentSection(),
    currentData: getCurrentViewingData()
  };
}

function getCurrentSection() {
  // Determine which section user is viewing
  const panels = document.querySelectorAll('.panel');
  for (const panel of panels) {
    const content = panel.querySelector('.panel__content');
    if (content && !content.classList.contains('hidden')) {
      return panel.id.replace('-panel', '');
    }
  }
  return 'dashboard';
}

function getCurrentViewingData() {
  const section = getCurrentSection();
  
  const sectionNames = {
    'research': 'Research Papers',
    'hacker-news': 'Hacker News',
    'github': 'GitHub Trending',
    'reddit': 'Reddit Tech',
    'satellite': 'Global Tech Labs Map',
    'indian-labs': 'Indian Tech Labs Map',
    'communities': 'Tech Communities',
    'quiz': 'Tech Quiz'
  };
  
  return sectionNames[section] || 'Dashboard';
}

// Enhanced send message function with AI
async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  if (!input) return;
  
  const message = input.value.trim();
  if (!message) return;
  
  // Clear input immediately
  input.value = '';
  
  // Initialize chat messages if needed
  if (!AppState.chatMessages) {
    AppState.chatMessages = {};
  }
  if (!AppState.chatMessages[AppState.currentRoom]) {
    AppState.chatMessages[AppState.currentRoom] = [];
  }
  
  // Add user message to chat
  AppState.chatMessages[AppState.currentRoom].push({
    user: AppState.currentUser || 'You',
    text: sanitizeHTML(message),
    time: Date.now(),
    own: true
  });
  
  displayChatMessages();
  
  // Show thinking status
  updateAIStatus('thinking');
  
  // Get AI response
  try {
    if (!aiChatInstance) {
      aiChatInstance = new window.AIChat();
    }
    
    const context = getCurrentContext();
    const response = await aiChatInstance.sendMessage(message, context);
    
    // Add AI response to chat
    AppState.chatMessages[AppState.currentRoom].push({
      user: 'AI Assistant',
      text: response.text,
      time: Date.now(),
      own: false,
      isAI: true
    });
    
    displayChatMessages();
    updateAIStatus('ready');
    
    // Award XP for chat interaction
    if (window.MissionSystem) {
      window.MissionSystem.awardXP(2, 'chat_message');
    }
    
  } catch (error) {
    console.error('❌ AI response error:', error);
    
    // Add error message
    AppState.chatMessages[AppState.currentRoom].push({
      user: 'AI Assistant',
      text: "Sorry, I'm having trouble right now. Please try again! 🔄",
      time: Date.now(),
      own: false,
      isAI: true
    });
    
    displayChatMessages();
    updateAIStatus('error');
  }
}

// Handle Enter key in chat input
function handleChatKeyPress(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendChatMessage();
  }
}

// Display chat messages
function displayChatMessages() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  
  const currentRoom = AppState.currentRoom || 'general';
  const messages = AppState.chatMessages[currentRoom] || [];
  
  if (messages.length === 0) {
    container.innerHTML = `
      <div class="chat-empty">
        <p>👋 Welcome to ${getRoomName(currentRoom)}!</p>
        <p>Ask me anything about tech, programming, careers, or this site!</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = messages.map(msg => {
    const timeStr = new Date(msg.time).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    const messageClass = msg.own ? 'chat-message chat-message--own' : 'chat-message';
    const aiClass = msg.isAI ? 'chat-message--ai' : '';
    
    return `
      <div class="${messageClass} ${aiClass}">
        <div class="chat-message__header">
          <span class="chat-message__user">${msg.isAI ? '🤖 ' : ''}${sanitizeHTML(msg.user)}</span>
          <span class="chat-message__time">${timeStr}</span>
        </div>
        <div class="chat-message__text">${formatChatMessage(msg.text)}</div>
      </div>
    `;
  }).join('');
  
  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

// Format chat message (preserve formatting, convert markdown-like syntax)
function formatChatMessage(text) {
  if (!text) return '';
  
  // Convert **bold** to <strong>
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Convert line breaks
  text = text.replace(/\n/g, '<br>');
  
  // Convert bullet points
  text = text.replace(/^- (.+)$/gm, '• $1');
  
  return text;
}

// Get room display name
function getRoomName(room) {
  const roomNames = {
    'general': 'General Chat',
    'ai-ml': 'AI/ML Discussion',
    'space': 'Space Tech',
    'coding': 'Coding Help',
    'career': 'Career Advice',
    'india': 'India Tech',
    'quiz': 'Quiz Discussion',
    'research': 'Research Papers'
  };
  return roomNames[room] || room;
}

// Switch chat room
function switchRoom(room) {
  AppState.currentRoom = room;
  
  // Update active button
  document.querySelectorAll('.chat-room').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Update room name display
  const roomNameEl = document.getElementById('current-room-name');
  if (roomNameEl) {
    roomNameEl.textContent = getRoomName(room);
  }
  
  // Initialize room messages if needed
  if (!AppState.chatMessages[room]) {
    AppState.chatMessages[room] = [];
  }
  
  // Display messages for this room
  displayChatMessages();
  
  console.log(`Switched to room: ${room}`);
}

// Initialize chat when app loads
function initChat() {
  if (!AppState.chatMessages) {
    AppState.chatMessages = {};
  }
  
  // Initialize all rooms
  const rooms = ['general', 'ai-ml', 'space', 'coding', 'career', 'india', 'quiz', 'research'];
  rooms.forEach(room => {
    if (!AppState.chatMessages[room]) {
      AppState.chatMessages[room] = [];
    }
  });
  
  // Set default room
  if (!AppState.currentRoom) {
    AppState.currentRoom = 'general';
  }
  
  // Set default user
  if (!AppState.currentUser) {
    AppState.currentUser = 'User';
  }
  
  // Display initial messages
  displayChatMessages();
  
  console.log('✅ Chat initialized!');
}

// Auto-initialize if AppState exists
if (typeof AppState !== 'undefined') {
  initChat();
}

console.log('✅ Chat integration loaded!');
