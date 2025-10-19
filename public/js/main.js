document.addEventListener('DOMContentLoaded', () => {
    // Active link highlighting
    highlightCurrentPage();
    
    // Sidebar toggle for mobile
    setupSidebarToggle();
    
    // Add loading indicators
    setupLoadingIndicators();
    
    // Initialize dark mode if applicable
    initDarkMode();
  });
  
  // Highlight the current page in navigation
  function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.parentElement.classList.add('active');
      }
    });
  }
  
  // Mobile sidebar toggle
  function setupSidebarToggle() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('sidebar-active');
      });
      
      // Close sidebar when clicking on main content in mobile view
      mainContent.addEventListener('click', () => {
        if (sidebar.classList.contains('active') && window.innerWidth <= 768) {
          sidebar.classList.remove('active');
          mainContent.classList.remove('sidebar-active');
        }
      });
    }
  }
  
  // Add loading indicators when navigating between pages
  function setupLoadingIndicators() {
    const links = document.querySelectorAll('a[href^="/app/"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        // Don't intercept if using modifier keys
        if (e.ctrlKey || e.shiftKey || e.metaKey) return;
        
        e.preventDefault();
        const href = link.getAttribute('href');
        
        // Show loading animation
        document.body.classList.add('loading');
        
        // Navigate after slight delay to show loading effect
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    });
    
    // Remove loading class once the page is fully loaded
    window.addEventListener('load', () => {
      document.body.classList.remove('loading');
    });
  }
  
  // Dark mode toggle
  function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
    
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
          localStorage.setItem('darkMode', 'enabled');
        } else {
          localStorage.setItem('darkMode', 'disabled');
        }
      });
    }
  }