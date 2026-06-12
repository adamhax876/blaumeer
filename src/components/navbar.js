import { t, getLang, setLang } from '../i18n.js';
import { renderLogo } from './icons.js';
import { handleRoute } from '../router.js';

export function renderNavbar() {
  const lang = getLang();
  const root = document.getElementById('navbar-root');
  root.innerHTML = `
    <nav class="navbar navbar--transparent" id="main-navbar" aria-label="Main navigation">
      <div class="navbar__inner">
        <a class="navbar__logo" data-route="/" id="nav-logo">${renderLogo(true)}
        </a>
        <div class="navbar__links" id="nav-links">
          <a class="navbar__link active" data-route="/">${t('nav_home')}</a>
          <a class="navbar__link" data-route="/tours">${t('nav_tours')}</a>
          <div class="navbar__link navbar__link--dropdown" tabindex="0">
            ${t('nav_categories')} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            <div class="navbar__dropdown" id="nav-categories-dropdown">
              <a data-route="/tours?cat=cultural">${t('cat_cultural')}</a>
              <a data-route="/tours?cat=desert">${t('cat_desert')}</a>
              <a data-route="/tours?cat=sea">${t('cat_sea')}</a>
              <a data-route="/tours?cat=nile">${t('cat_nile')}</a>
              <a data-route="/tours?cat=hamam">${t('cat_hamam')}</a>
              <a data-route="/tours?cat=diving">${t('cat_diving')}</a>
            </div>
          </div>
          <a class="navbar__link" data-route="/about">${t('nav_about')}</a>
          <a class="navbar__link" data-route="/contact">${t('nav_contact')}</a>
          <a class="navbar__link" data-route="/blog">${t('nav_blog')}</a>
          <a class="navbar__link" data-route="/faq">${t('nav_faq')}</a>
        </div>
        <div class="navbar__actions">
          <div class="navbar__lang" id="lang-switcher">
            <button class="navbar__lang-btn ${lang==='en'?'active':''}" data-lang="en">EN</button>
            <button class="navbar__lang-btn ${lang==='ar'?'active':''}" data-lang="ar">AR</button>
            <button class="navbar__lang-btn ${lang==='de'?'active':''}" data-lang="de">DE</button>
          </div>
          <a class="btn btn--accent btn--sm" data-route="/tours" id="nav-book-btn">${t('hero_cta_book')}</a>
          <button class="navbar__hamburger" id="hamburger-btn" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="navbar__mobile-overlay" id="mobile-overlay"></div>
    <div class="navbar__mobile" id="mobile-menu">
      <a data-route="/">${t('nav_home')}</a>
      <a data-route="/tours">${t('nav_tours')}</a>
      <a data-route="/tours?cat=cultural">${t('cat_cultural')}</a>
      <a data-route="/tours?cat=desert">${t('cat_desert')}</a>
      <a data-route="/tours?cat=sea">${t('cat_sea')}</a>
      <a data-route="/tours?cat=nile">${t('cat_nile')}</a>
      <a data-route="/tours?cat=hamam">${t('cat_hamam')}</a>
      <a data-route="/about">${t('nav_about')}</a>
      <a data-route="/contact">${t('nav_contact')}</a>
      <a data-route="/blog">${t('nav_blog')}</a>
      <a data-route="/faq">${t('nav_faq')}</a>
    </div>
  `;

  initNavbar();
}

function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');

  // Scroll behavior
  const onScroll = () => {
    const isHome = window.location.pathname === '/';
    if (window.scrollY > 80) {
      navbar.classList.remove('navbar--transparent');
      navbar.classList.add('navbar--solid');
    } else if (isHome) {
      navbar.classList.remove('navbar--solid');
      navbar.classList.add('navbar--transparent');
    }
  };
  window.addEventListener('scroll', onScroll);
  
  // Set initial state for non-home pages
  if (window.location.pathname !== '/') {
    navbar.classList.remove('navbar--transparent');
    navbar.classList.add('navbar--solid');
  }

  // Hamburger
  const toggleMobile = () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  };
  hamburger.addEventListener('click', toggleMobile);
  overlay.addEventListener('click', toggleMobile);

  // Language switcher
  document.getElementById('lang-switcher').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lang]');
    if (!btn) return;
    setLang(btn.dataset.lang);
    // langchange event dispatched by setLang() handles re-render
  });

  // Update logo colors on scroll
  const logoSvg = document.querySelector('#nav-logo svg');
  const updateLogoOnScroll = () => {
    if (navbar.classList.contains('navbar--solid')) {
      document.getElementById('nav-logo').innerHTML = renderLogo(false);
    } else {
      document.getElementById('nav-logo').innerHTML = renderLogo(true);
    }
  };
  
  const scrollObserver = new MutationObserver(updateLogoOnScroll);
  scrollObserver.observe(navbar, { attributes: true, attributeFilter: ['class'] });
}
