// ── Blau Meer — Main Entry ──
import { addRoute, handleRoute } from './router.js';
import { initLang } from './i18n.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderWhatsApp } from './components/whatsapp.js';
import { renderHomePage } from './pages/home.js';
import { renderToursPage } from './pages/tours.js';
import { renderTourDetailPage } from './pages/tour-detail.js';
import { renderAboutPage, renderContactPage } from './pages/about.js';
import { renderBlogPage, renderBlogPostPage, renderFaqPage } from './pages/blog.js';
import { renderAdminPage } from './pages/admin.js';

// Initialize language
initLang();

// Register routes
addRoute('/', () => renderHomePage());
addRoute('/tours', () => renderToursPage());
addRoute('/tour/:slug', (params) => renderTourDetailPage(params));
addRoute('/about', () => renderAboutPage());
addRoute('/contact', () => renderContactPage());
addRoute('/blog', () => renderBlogPage());
addRoute('/blog/:slug', (params) => renderBlogPostPage(params));
addRoute('/faq', () => renderFaqPage());
addRoute('/admin', () => renderAdminPage());

import { loadTours } from './data/tours.js';
import { loadSettings } from './data/settings.js';

async function bootstrap() {
  await Promise.all([loadTours(), loadSettings()]);

  // Render shell components
  renderNavbar();
  renderFooter();
  renderWhatsApp();

  // Handle initial route
  handleRoute();
}

bootstrap();

// Listen for language changes
window.addEventListener('langchange', () => {
  renderNavbar();
  renderFooter();
  handleRoute();
});
