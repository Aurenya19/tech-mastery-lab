// ============================================
// TABBED NAVIGATION SYSTEM
// ============================================

console.log('📑 Tabs Navigation Loading...');

// Tab switching function
window.switchTab = function(tabName) {
  console.log(`🔄 Switching to tab: ${tabName}`);
  
  // Hide all tab panels
  const allPanels = document.querySelectorAll('.tab-panel');
  allPanels.forEach(panel => {
    panel.classList.remove('active');
  });
  
  // Remove active class from all tab buttons
  const allButtons = document.querySelectorAll('.tab-btn');
  allButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab panel
  const selectedPanel = document.getElementById(`tab-${tabName}`);
  if (selectedPanel) {
    selectedPanel.classList.add('active');
  }
  
  // Add active class to clicked button
  const clickedButton = event?.target;
  if (clickedButton && clickedButton.classList.contains('tab-btn')) {
    clickedButton.classList.add('active');
  }
  
  // Special handling for map tab - initialize map if not already done
  if (tabName === 'map' && !window.mapInitialized) {
    setTimeout(() => {
      if (window.initMap && typeof window.initMap === 'function') {
        window.initMap();
        window.mapInitialized = true;
      }
    }, 300);
  }
  
  // Special handling for communities tab - initialize if not already done
  if (tabName === 'communities' && !window.communitiesInitialized) {
    setTimeout(() => {
      if (window.initCommunities && typeof window.initCommunities === 'function') {
        window.initCommunities();
        window.communitiesInitialized = true;
      }
    }, 300);
  }
  
  // Scroll to top of tabs container
  const tabsContainer = document.querySelector('.tabs-container');
  if (tabsContainer) {
    tabsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Save current tab to localStorage
  localStorage.setItem('currentTab', tabName);
  
  console.log(`✅ Switched to ${tabName} tab`);
};

// Restore last active tab on page load
function restoreLastTab() {
  const lastTab = localStorage.getItem('currentTab');
  if (lastTab) {
    // Find and click the corresponding tab button
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
      const btnText = btn.textContent.toLowerCase();
      if (btnText.includes(lastTab)) {
        btn.click();
      }
    });
  }
}

// Initialize tabs system
function initTabsSystem() {
  console.log('📑 Initializing Tabs System...');
  
  // Set up click handlers for all tab buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Extract tab name from button text
      const tabMap = {
        'news': 'news',
        'research': 'research',
        'github': 'github',
        'reddit': 'reddit',
        'map': 'map',
        'communities': 'communities',
        'chat': 'chat',
        'quiz': 'quiz'
      };
      
      const btnText = this.textContent.toLowerCase();
      for (const [key, value] of Object.entries(tabMap)) {
        if (btnText.includes(key)) {
          switchTab(value);
          break;
        }
      }
    });
  });
  
  // Restore last tab or default to news
  setTimeout(restoreLastTab, 500);
  
  console.log('✅ Tabs System Ready!');
}

// Keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
  // Alt + Number to switch tabs
  if (e.altKey && e.key >= '1' && e.key <= '8') {
    e.preventDefault();
    const tabIndex = parseInt(e.key) - 1;
    const tabs = ['news', 'research', 'github', 'reddit', 'map', 'communities', 'chat', 'quiz'];
    if (tabs[tabIndex]) {
      switchTab(tabs[tabIndex]);
    }
  }
  
  // Alt + Left/Right to navigate between tabs
  if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
    e.preventDefault();
    const tabs = ['news', 'research', 'github', 'reddit', 'map', 'communities', 'chat', 'quiz'];
    const currentTab = localStorage.getItem('currentTab') || 'news';
    const currentIndex = tabs.indexOf(currentTab);
    
    let newIndex;
    if (e.key === 'ArrowLeft') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else {
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    }
    
    switchTab(tabs[newIndex]);
  }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTabsSystem);
} else {
  initTabsSystem();
}

console.log('✅ Tabs Navigation Loaded!');
console.log('💡 Keyboard shortcuts:');
console.log('   Alt + 1-8: Switch to tab');
console.log('   Alt + ←/→: Navigate between tabs');
