// Theme Switcher
(function() {
  'use strict';

  // Get theme list from injected global variable and parse if it's a string
  let themes = window.THEME_LIST || ['darkpaper', 'paper', 'blue', 'green', 'orange', 'pink', 'red'];
  if (typeof themes === 'string') {
    try {
      themes = JSON.parse(themes);
    } catch (e) {
      console.warn('Failed to parse theme list:', e);
      themes = ['darkpaper', 'paper', 'blue', 'green', 'orange', 'pink', 'red'];
    }
  }
  
  const STORAGE_KEY = 'preferred-theme';
  
  // Theme color mappings
  const themeColors = {
    'darkpaper': { accent: '#fefcfa', background: '#0a0a0a' },
    'paper': { accent: '#1d1e28' },
    'blue': { accent: '#23b0ff' },
    'green': { accent: '#78e2a0' },
    'orange': { accent: '#ffa86a' },
    'pink': { accent: '#ee72f1' },
    'red': { accent: '#ff6266' }
  };
  
  let currentThemeIndex = 0;

  // Initialize theme switcher
  function init() {
    createThemeSwitcherButton();
    loadPreferredTheme();
  }

  // Create the floating theme switcher button
  function createThemeSwitcherButton() {
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    
    const button = document.createElement('button');
    button.className = 'theme-switcher__button';
    button.setAttribute('aria-label', 'Switch theme');
    button.innerHTML = `
      <span class="icon"></span>
      <span class="text">Theme</span>
    `;
    
    button.addEventListener('click', cycleTheme);
    
    themeSwitcher.appendChild(button);
    document.body.appendChild(themeSwitcher);
  }

  // Load preferred theme from storage
  function loadPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY) || 
                      (document.cookie.match(/preferred-theme=([^;]+)/) || [])[1];
    
    if (savedTheme && themes.includes(savedTheme)) {
      currentThemeIndex = themes.indexOf(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Use current theme from body class or default
      const bodyClassTheme = Array.from(document.body.classList)
        .find(cls => themes.includes(cls));
      
      if (bodyClassTheme && themes.includes(bodyClassTheme)) {
        currentThemeIndex = themes.indexOf(bodyClassTheme);
      }
    }
  }

  // Cycle to next theme
  function cycleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    applyTheme(newTheme);
    savePreferredTheme(newTheme);
  }

  // Apply theme
  function applyTheme(theme) {
    // Remove all theme classes from body
    themes.forEach(t => document.body.classList.remove(t));
    
    // Add new theme class
    document.body.classList.add(theme);
    
    // Update CSS custom properties
    updateThemeVariables(theme);
  }

  // Update CSS variables for the theme
  function updateThemeVariables(theme) {
    const root = document.documentElement;
    const themeConfig = themeColors[theme];
    
    if (themeConfig) {
      // Update accent color
      root.style.setProperty('--accent', themeConfig.accent);
      
      // Handle specific theme configurations
      if (theme === 'darkpaper') {
        // Dark theme with custom background
        root.style.setProperty('--background', themeConfig.background);
        root.style.setProperty('--color', 'white');
        root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--accent-contrast-color', 'black');
        root.style.setProperty('--menu-color', 'white');
        
        // Dark theme syntax colors
        root.style.setProperty('--syntax-func-color', 'color-mix(in srgb, var(--accent) 70%, #999 30%)');
        root.style.setProperty('--syntax-var-color', 'color-mix(in srgb, var(--accent) 90%, transparent)');
        root.style.setProperty('--syntax-punctuation-color', 'white');
        root.style.setProperty('--syntax-value-color', 'color-mix(in srgb, var(--accent), white)');
        root.style.setProperty('--syntax-comment-color', 'rgba(255, 255, 255, 0.3)');
        root.style.setProperty('--syntax-code-border-color', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--syntax-code-copy-button-color', '#bbb');
        
      } else if (theme === 'paper') {
        // Light theme
        root.style.setProperty('--background', 'color-mix(in srgb, var(--accent) 2%, #fefcfa 98%)');
        root.style.setProperty('--color', 'black');
        root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.1)');
        root.style.setProperty('--accent-contrast-color', 'white');
        root.style.setProperty('--menu-color', 'black');
        
        // Light theme syntax colors
        root.style.setProperty('--syntax-func-color', 'color-mix(in srgb, var(--accent) 70%, #000 30%)');
        root.style.setProperty('--syntax-var-color', 'color-mix(in srgb, var(--accent) 90%, #000)');
        root.style.setProperty('--syntax-punctuation-color', 'black');
        root.style.setProperty('--syntax-value-color', 'color-mix(in srgb, var(--accent), black)');
        root.style.setProperty('--syntax-comment-color', 'rgba(0, 0, 0, 0.3)');
        root.style.setProperty('--syntax-code-border-color', 'rgba(0, 0, 0, 0.1)');
        root.style.setProperty('--syntax-code-copy-button-color', '#444');
        
      } else if (theme === 'green') {
        // Green theme - light accent, so use dark background with light text
        root.style.setProperty('--background', 'color-mix(in srgb, var(--accent) 2%, #1d1e28 98%)');
        root.style.setProperty('--color', 'white');
        root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--accent-contrast-color', 'black');
        root.style.setProperty('--menu-color', 'white');
        
        // Dark theme syntax colors for green
        root.style.setProperty('--syntax-func-color', 'color-mix(in srgb, var(--accent) 70%, #999 30%)');
        root.style.setProperty('--syntax-var-color', 'color-mix(in srgb, var(--accent) 90%, transparent)');
        root.style.setProperty('--syntax-punctuation-color', 'white');
        root.style.setProperty('--syntax-value-color', 'color-mix(in srgb, var(--accent), white)');
        root.style.setProperty('--syntax-comment-color', 'rgba(255, 255, 255, 0.3)');
        root.style.setProperty('--syntax-code-border-color', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--syntax-code-copy-button-color', '#bbb');
        
      } else {
        // Dark themes with colored accents
        root.style.setProperty('--background', 'color-mix(in srgb, var(--accent) 2%, #1d1e28 98%)');
        root.style.setProperty('--color', 'white');
        root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--accent-contrast-color', 'black');
        root.style.setProperty('--menu-color', 'white');
        
        // Dark theme syntax colors
        root.style.setProperty('--syntax-func-color', 'color-mix(in srgb, var(--accent) 70%, #999 30%)');
        root.style.setProperty('--syntax-var-color', 'color-mix(in srgb, var(--accent) 90%, transparent)');
        root.style.setProperty('--syntax-punctuation-color', 'white');
        root.style.setProperty('--syntax-value-color', 'color-mix(in srgb, var(--accent), white)');
        root.style.setProperty('--syntax-comment-color', 'rgba(255, 255, 255, 0.3)');
        root.style.setProperty('--syntax-code-border-color', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--syntax-code-copy-button-color', '#bbb');
      }
      
      // Update theme title in button
      updateButtonText(theme);
    }
  }

  // Update button text to show current theme
  function updateButtonText(theme) {
    const button = document.querySelector('.theme-switcher__button .text');
    if (button) {
      button.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    }
  }

  // Save preferred theme
  function savePreferredTheme(theme) {
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Fallback to cookies if localStorage is not available
      document.cookie = `preferred-theme=${theme}; expires=${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();