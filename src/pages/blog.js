import { t, getLang } from '../i18n.js';
import { icons } from '../components/icons.js';
import { blogPosts, faqData } from '../data/testimonials.js';

const lt = (obj) => obj[getLang()] || obj.en || obj;
const blogImages = ['/images/tour-pyramids.webp', '/images/tour-sea.webp', '/images/tour-desert.webp'];

export function renderBlogPage() {
  return `
    <div class="page-header"><div class="container"><h1>${t('blog_title')}</h1><p>${t('blog_subtitle')}</p></div></div>
    <section class="section"><div class="container">
      <div class="blog-grid">
        ${blogPosts.map((post, i) => `
          <a class="blog-card animate-on-scroll delay-${i+1}" data-route="/blog/${post.id}">
            <div class="blog-card__image"><img src="${blogImages[i]||blogImages[0]}" alt="${lt(post.title)}" loading="lazy"/></div>
            <div class="blog-card__body">
              <div class="blog-card__date">${post.date}</div>
              <h3 class="blog-card__title">${lt(post.title)}</h3>
              <p class="blog-card__excerpt">${lt(post.excerpt)}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </div></section>
  `;
}

export function renderBlogPostPage(params) {
  const post = blogPosts.find(p => p.id === params.slug);
  if (!post) return `<div class="container section"><h1>Post not found</h1></div>`;
  const idx = blogPosts.indexOf(post);
  return `
    <div class="page-header"><div class="container">
      <div class="breadcrumbs" style="justify-content:center">
        <a data-route="/" style="color:rgba(255,255,255,0.7)">${t('nav_home')}</a>
        <span class="breadcrumbs__separator" style="color:rgba(255,255,255,0.4)">›</span>
        <a data-route="/blog" style="color:rgba(255,255,255,0.7)">${t('nav_blog')}</a>
        <span class="breadcrumbs__separator" style="color:rgba(255,255,255,0.4)">›</span>
        <span style="color:#fff">${lt(post.title)}</span>
      </div>
      <h1 style="font-size:var(--text-3xl)">${lt(post.title)}</h1>
    </div></div>
    <div class="blog-post__content">
      <div class="blog-post__meta"><span>${post.date}</span></div>
      <div class="blog-post__hero"><img src="${blogImages[idx]||blogImages[0]}" alt="${lt(post.title)}" style="width:100%;height:100%;object-fit:cover"/></div>
      <p>${lt(post.content)}</p>
      <p>${lt(post.excerpt)}</p>
      <div style="margin-top:var(--space-8);text-align:center"><a class="btn btn--primary" data-route="/blog">← ${t('nav_blog')}</a></div>
    </div>
  `;
}

export function renderFaqPage() {
  return {
    html: `
    <div class="page-header"><div class="container"><h1>${t('faq_title')}</h1><p>${t('faq_subtitle')}</p></div></div>
    <section class="section"><div class="container container--narrow">
      <div class="faq-search animate-on-scroll">${icons.search}<input type="text" placeholder="${t('faq_search')}" id="faq-search-input"/></div>
      <div id="faq-list">
        ${faqData.map(cat=>`
          <div class="faq-category">
            <h3 class="faq-category__title">${lt(cat.category)}</h3>
            ${cat.items.map(item=>`
              <div class="faq-item animate-on-scroll">
                <div class="faq-item__question"><span>${lt(item.q)}</span><span class="faq-item__icon">${icons.chevDown}</span></div>
                <div class="faq-item__answer"><div class="faq-item__answer-inner">${lt(item.a)}</div></div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    </div></section>`,
    init: () => {
      document.querySelectorAll('.faq-item__question').forEach(q => {
        q.addEventListener('click', () => {
          const item = q.closest('.faq-item');
          const wasOpen = item.classList.contains('open');
          document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
          if (!wasOpen) item.classList.add('open');
        });
      });
      document.getElementById('faq-search-input')?.addEventListener('input', e => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.faq-item').forEach(item => { item.style.display = item.textContent.toLowerCase().includes(query) ? '' : 'none'; });
      });
      return () => {};
    }
  };
}
