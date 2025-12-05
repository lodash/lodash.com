(function(root) {
  'use strict';

  var STORAGE_KEY = 'lodash-dark-mode';
  var DARK_MODE_CLASS = 'dark-mode';
  var rootEl = document.documentElement;

  // Check system preference
  function prefersDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Get saved preference or default to system preference
  function getDarkModePreference() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      return saved === 'true';
    }
    return prefersDarkMode();
  }

  // Save preference
  function saveDarkModePreference(isDark) {
    try {
      localStorage.setItem(STORAGE_KEY, isDark.toString());
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  }

  // Apply dark mode
  function applyDarkMode(isDark) {
    if (isDark) {
      rootEl.classList.add(DARK_MODE_CLASS);
    } else {
      rootEl.classList.remove(DARK_MODE_CLASS);
    }
  }

  // Initialize dark mode early (before DOM is ready to prevent flash)
  function initDarkModeEarly() {
    var isDark = getDarkModePreference();
    applyDarkMode(isDark);
  }

  // Set up toggle button
  function setupToggle() {
    var toggle = document.querySelector('.dark-mode-toggle');
    if (!toggle) {
      return;
    }

    var isDark = getDarkModePreference();
    applyDarkMode(isDark);

    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      var currentDark = rootEl.classList.contains(DARK_MODE_CLASS);
      var newDark = !currentDark;
      applyDarkMode(newDark);
      saveDarkModePreference(newDark);
    });
  }

  // Listen for system preference changes
  function setupSystemPreferenceListener() {
    if (window.matchMedia) {
      var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', function(e) {
        // Only apply system preference if user hasn't manually set a preference
        if (localStorage.getItem(STORAGE_KEY) === null) {
          applyDarkMode(e.matches);
        }
      });
    }
  }

  // Initialize early to prevent flash
  initDarkModeEarly();

  // Set up toggle and listeners when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setupToggle();
      setupSystemPreferenceListener();
    });
  } else {
    setupToggle();
    setupSystemPreferenceListener();
  }

  // Export for manual control if needed
  root.lodashDarkMode = {
    toggle: function() {
      var isDark = rootEl.classList.contains(DARK_MODE_CLASS);
      applyDarkMode(!isDark);
      saveDarkModePreference(!isDark);
    },
    enable: function() {
      applyDarkMode(true);
      saveDarkModePreference(true);
    },
    disable: function() {
      applyDarkMode(false);
      saveDarkModePreference(false);
    },
    isEnabled: function() {
      return rootEl.classList.contains(DARK_MODE_CLASS);
    }
  };
}(this));

