// ── SPA Router ──
import { loadTours } from './data/tours.js';
const routes = {};
let currentCleanup = null;

export function addRoute(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.history.pushState({}, '', path);
  handleRoute();
}

export async function handleRoute() {
  await loadTours();
  const path = window.location.pathname;
  const main = document.getElementById('main-content');
  
  // Cleanup previous page
  if (currentCleanup && typeof currentCleanup === 'function') {
    currentCleanup();
    currentCleanup = null;
  }

  // Find matching route
  let handler = null;
  let params = {};

  for (const [pattern, h] of Object.entries(routes)) {
    const match = matchRoute(pattern, path);
    if (match) {
      handler = h;
      params = match;
      break;
    }
  }

  if (!handler) {
    handler = routes['/'] || (() => '<div class="container section"><h1>404 — Page Not Found</h1></div>');
  }

  // Render page with transition
  main.classList.remove('page-enter');
  void main.offsetWidth; // trigger reflow
  main.classList.add('page-enter');
  
  const result = handler(params);
  if (typeof result === 'string') {
    main.innerHTML = result;
  } else if (result && result.html) {
    main.innerHTML = result.html;
    if (result.init) {
      currentCleanup = result.init();
    }
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Init scroll animations
  initScrollAnimations();

  // Update active nav link
  updateActiveNav(path);
}

function matchRoute(pattern, path) {
  // Convert pattern like /tour/:slug to regex
  const paramNames = [];
  const regexStr = pattern.replace(/:([^/]+)/g, (_, name) => {
    paramNames.push(name);
    return '([^/]+)';
  });
  const regex = new RegExp(`^${regexStr}$`);
  const match = path.match(regex);
  if (!match) return null;
  
  const params = {};
  paramNames.forEach((name, i) => {
    params[name] = decodeURIComponent(match[i + 1]);
  });
  return params;
}

function updateActiveNav(path) {
  document.querySelectorAll('.navbar__link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('data-route');
    if (href === path || (href !== '/' && path.startsWith(href))) {
      link.classList.add('active');
    }
  });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Handle link clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-route]');
  if (link) {
    e.preventDefault();
    const path = link.getAttribute('data-route');
    navigate(path);
    // Close mobile menu if open
    document.querySelector('.navbar__mobile')?.classList.remove('open');
    document.querySelector('.navbar__mobile-overlay')?.classList.remove('open');
    document.querySelector('.navbar__hamburger')?.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Handle browser back/forward
window.addEventListener('popstate', handleRoute);
