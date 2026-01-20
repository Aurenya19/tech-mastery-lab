// 🚀 MASTER INITIALIZATION SCRIPT
// Ensures all data is loaded and all systems are initialized properly

console.log('🚀 Master Init Starting...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('📊 DOM Ready - Checking data...');
  
  // Check if data files are loaded
  if (typeof window.COMMUNITIES === 'undefined') {
    console.error('❌ COMMUNITIES data not loaded!');
  } else {
    console.log('✅ COMMUNITIES loaded:', window.COMMUNITIES.length, 'communities');
  }
  
  if (typeof window.QUIZ_QUESTIONS === 'undefined') {
    console.error('❌ QUIZ_QUESTIONS data not loaded!');
  } else {
    console.log('✅ QUIZ_QUESTIONS loaded:', window.QUIZ_QUESTIONS.length, 'questions');
  }
  
  // Force re-render communities if needed
  setTimeout(() => {
    if (window.enhancedCommunities && window.COMMUNITIES) {
      console.log('🔄 Re-initializing communities...');
      window.enhancedCommunities.communities = window.COMMUNITIES;
      window.enhancedCommunities.renderEnhancedCommunities();
    }
  }, 500);
  
  console.log('✅ Master Init Complete!');
});
