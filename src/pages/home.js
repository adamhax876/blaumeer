import { t, getLang } from '../i18n.js';
import { icons, renderStars, renderLogo } from '../components/icons.js';
import { tours } from '../data/tours.js';
import { categories } from '../data/categories.js';
import { testimonials, blogPosts } from '../data/testimonials.js';

const lt = (obj) => obj[getLang()] || obj.en || obj;

const heroSlides = [
  { img: '/images/hero-1.webp', title: () => t('hero_title'), sub: () => t('hero_subtitle') },
  { img: '/images/hero-2.webp', title: () => ({ en:'Crystal Clear Waters', ar:'مياه صافية كالكريستال', de:'Kristallklares Wasser'}[getLang()]), sub: () => ({ en:'Discover the Red Sea\'s hidden paradises', ar:'اكتشف جنات البحر الأحمر المخفية', de:'Entdecken Sie die verborgenen Paradiese des Roten Meeres'}[getLang()]) },
  { img: '/images/hero-3.webp', title: () => ({ en:'Desert Adventures', ar:'مغامرات صحراوية', de:'Wüstenabenteuer'}[getLang()]), sub: () => ({ en:'Experience the magic of the Sahara under the stars', ar:'عش سحر الصحراء تحت النجوم', de:'Erleben Sie die Magie der Sahara unter den Sternen'}[getLang()]) },
];

const catImages = { cultural: '/images/tour-pyramids.webp', desert: '/images/tour-desert.webp', sea: '/images/tour-sea.webp', nile: '/images/tour-nile.webp', hamam: '/images/tour-hamam.webp', diving: '/images/tour-sea.webp' };
const tourImages = { 'pyramids-cairo-day-trip': '/images/tour-pyramids.webp', 'luxor-valley-kings': '/images/tour-luxor.webp', 'desert-safari-hurghada': '/images/tour-desert.webp', 'orange-bay-island': '/images/tour-sea.webp', 'nile-cruise-3-nights': '/images/tour-nile.webp', 'hamam-massage-hurghada': '/images/tour-hamam.webp' };
const blogImages = ['/images/tour-pyramids.webp', '/images/tour-sea.webp', '/images/tour-desert.webp'];

export function renderHomePage() {
  const popularTours = tours.filter(t => t.popular);
  const html = `
    <!-- Hero Section -->
    <section class="hero" id="hero-section">
      <div class="hero__slides" id="hero-slides">
        ${heroSlides.map((h, i) => `
          <div class="hero__slide ${i === 0 ? 'active' : ''}">
            <img src="${h.img}" alt="Blau Meer Hero" loading="${i===0?'eager':'lazy'}" />
          </div>
        `).join('')}
      </div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <div class="hero__badge">${t('hero_badge')}</div>
        <h1 class="hero__title" id="hero-title">${heroSlides[0].title()}</h1>
        <p class="hero__subtitle" id="hero-subtitle">${heroSlides[0].sub()}</p>
        <div class="hero__cta">
          <a class="btn btn--primary btn--lg" data-route="/tours">${t('hero_cta_tours')}</a>
          <a class="btn btn--glass btn--lg" data-route="/contact">${t('hero_cta_book')}</a>
        </div>
      </div>
      <div class="hero__dots" id="hero-dots">
        ${heroSlides.map((_, i) => `<button class="hero__dot ${i === 0 ? 'active' : ''}" data-slide="${i}" aria-label="Slide ${i+1}"></button>`).join('')}
      </div>
      <div class="hero__arrows">
        <button class="hero__arrow" id="hero-prev" aria-label="Previous">${icons.chevLeft}</button>
        <button class="hero__arrow" id="hero-next" aria-label="Next">${icons.chevRight}</button>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section" id="categories-section">
      <div class="container">
        <div class="section-header animate-on-scroll"><h2>${t('section_categories')}</h2><p>${t('section_categories_sub')}</p></div>
        <div class="featured-categories">
          ${categories.map((cat, i) => `
            <a class="category-card animate-on-scroll delay-${i % 5 + 1}" data-route="/tours?cat=${cat.id}">
              <img src="${catImages[cat.id]}" alt="${t('cat_' + cat.id)}" loading="lazy" />
              <div class="category-card__overlay">
                <span class="category-card__icon">${cat.icon}</span>
                <span class="category-card__title">${t('cat_' + cat.id)}</span>
                <span class="category-card__count">${cat.count} ${t('nav_tours')}</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Popular Tours Section -->
    <section class="section section--gray" id="popular-section">
      <div class="container">
        <div class="section-header animate-on-scroll"><h2>${t('section_popular')}</h2><p>${t('section_popular_sub')}</p></div>
        <div class="popular-tours__grid">
          ${popularTours.map((tour, i) => renderTourCard(tour, i)).join('')}
        </div>
        <div style="text-align:center;margin-top:var(--space-10)">
          <a class="btn btn--primary btn--lg animate-on-scroll" data-route="/tours">${t('view_all')} →</a>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section" id="why-section">
      <div class="container">
        <div class="section-header animate-on-scroll"><h2>${t('section_why')}</h2><p>${t('section_why_sub')}</p></div>
        <div class="value-props__grid">
          ${[{icon:icons.clock2,key:'service'},{icon:icons.award,key:'guides'},{icon:icons.dollar,key:'prices'},{icon:icons.refresh,key:'cancel'}].map((v,i)=>`
            <div class="value-card animate-on-scroll delay-${i+1}">
              <div class="value-card__icon">${v.icon}</div>
              <h4 class="value-card__title">${t('value_'+v.key)}</h4>
              <p class="value-card__text">${t('value_'+v.key+'_desc')}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="section section--ocean" id="stats-section">
      <div class="container">
        <div class="stats animate-on-scroll">
          ${[{n:'500+',l:{en:'Tours Completed',ar:'جولة مكتملة',de:'Touren'}},{n:'3,000+',l:{en:'Happy Clients',ar:'عميل سعيد',de:'Kunden'}},{n:'25+',l:{en:'Destinations',ar:'وجهة',de:'Reiseziele'}},{n:'5+',l:{en:'Years Experience',ar:'سنوات خبرة',de:'Jahre Erfahrung'}}].map(s=>`
            <div class="stat"><div class="stat__number">${s.n}</div><div class="stat__label">${lt(s.l)}</div></div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section" id="testimonials-section">
      <div class="container">
        <div class="section-header animate-on-scroll"><h2>${t('section_testimonials')}</h2><p>${t('section_testimonials_sub')}</p></div>
        <div class="testimonials__track" id="home-testimonials">
          <!-- Dynamic reviews loaded via JS -->
        </div>
      </div>
    </section>

    <!-- Blog Preview -->
    <section class="section section--gray" id="blog-section">
      <div class="container">
        <div class="section-header animate-on-scroll"><h2>${t('section_blog')}</h2><p>${t('section_blog_sub')}</p></div>
        <div class="blog-preview__grid">
          ${blogPosts.map((post,i)=>`
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
        <div style="text-align:center;margin-top:var(--space-8)"><a class="btn btn--secondary" data-route="/blog">${t('view_all')} →</a></div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="section section--ocean newsletter" id="newsletter-section">
      <div class="container" style="text-align:center">
        <h2 class="animate-on-scroll" style="color:#fff;margin-bottom:var(--space-3)">${t('section_newsletter')}</h2>
        <p class="animate-on-scroll" style="color:rgba(255,255,255,0.85);margin-bottom:var(--space-8)">${t('section_newsletter_sub')}</p>
        <div class="newsletter__inner animate-on-scroll">
          <input type="email" class="newsletter__input" placeholder="${t('footer_newsletter_placeholder')}" />
          <button class="btn btn--accent btn--lg">${t('footer_subscribe')}</button>
        </div>
      </div>
    </section>
  `;

  return {
    html,
    init: () => {
      initHeroSlider();
      const navbar = document.getElementById('main-navbar');
      if (navbar && window.scrollY < 80) {
        navbar.classList.remove('navbar--solid');
        navbar.classList.add('navbar--transparent');
        document.getElementById('nav-logo').innerHTML = renderLogo(true);
      }

      // Fetch latest 3 approved 5-star reviews
      fetch('/api/reviews')
        .then(res => res.json())
        .then(reviews => {
          const section = document.getElementById('testimonials-section');
          const container = document.getElementById('home-testimonials');
          if(container && reviews && reviews.length > 0) {
            const topReviews = reviews.filter(r => r.rating === 5).slice(0, 3);
            if(topReviews.length === 0) topReviews.push(...reviews.slice(0,3));
            container.innerHTML = topReviews.map((tm,i) => `
              <div class="testimonial-card animate-on-scroll delay-${i+1} is-visible" style="opacity:1;transform:none">
                <div class="testimonial-card__quote">"</div>
                <div class="testimonial-card__stars">${renderStars(tm.rating)}</div>
                <p class="testimonial-card__text">"${tm.text}"</p>
                <div class="testimonial-card__author">
                  <div class="testimonial-card__avatar" style="background:var(--color-primary);color:#fff">${tm.name.charAt(0)}</div>
                  <div><div class="testimonial-card__name">${tm.name}</div><div class="testimonial-card__role">${tm.country}</div></div>
                </div>
              </div>
            `).join('');
          } else if(section) {
            section.style.display = 'none';
          }
        })
        .catch(err => console.error(err));

      // Handle Newsletter Submit
      const newsletterBtn = document.querySelector('.newsletter__inner button');
      if (newsletterBtn) {
        newsletterBtn.addEventListener('click', async () => {
          const input = document.querySelector('.newsletter__input');
          const email = input.value;
          if (email && email.includes('@')) {
            try {
              await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
              });
              alert({en:'Thank you for subscribing!', ar:'شكراً لاشتراكك في النشرة البريدية!', de:'Danke für das Abonnieren!'}[getLang()]);
              input.value = '';
            } catch(err) {
              console.error(err);
            }
          } else {
            alert({en:'Please enter a valid email.', ar:'يرجى إدخال بريد إلكتروني صحيح.', de:'Bitte geben Sie eine gültige E-Mail-Adresse ein.'}[getLang()]);
          }
        });
      }

      return () => {};
    }
  };
}

function renderTourCard(tour, index) {
  const img = tour.image || tourImages[tour.id] || '/images/tour-pyramids.webp';
  return `
    <a class="tour-card animate-on-scroll delay-${(index%3)+1}" data-route="/tour/${tour.slug}">
      <div class="tour-card__image">
        <img src="${img}" alt="${lt(tour.title)}" loading="lazy" />
        <span class="tour-card__badge badge badge--primary">${t('cat_'+tour.category)}</span>
      </div>
      <div class="tour-card__body">
        <div class="tour-card__title">${lt(tour.title)}</div>
        <div class="tour-card__meta">
          <span class="tour-card__meta-item">${icons.clock} ${tour.duration}</span>
          <span class="tour-card__meta-item">${icons.map} ${tour.location}</span>
          <span class="tour-card__meta-item">${renderStars(Math.round(tour.rating))}</span>
        </div>
        <div class="tour-card__footer">
          <div class="tour-card__price">
            <span class="tour-card__price-from">${t('tour_from')}</span>
            <span class="tour-card__price-amount">€${tour.price}</span>
            <span class="tour-card__price-unit">/ ${tour.priceType==='person'?t('tour_per_person'):t('tour_private')}</span>
          </div>
          <span class="btn btn--primary btn--sm">${t('tour_view')}</span>
        </div>
      </div>
    </a>
  `;
}

function initHeroSlider() {
  let current = 0;
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');
  const titleEl = document.getElementById('hero-title');
  const subEl = document.getElementById('hero-subtitle');
  if (!slides.length) return;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    if (titleEl) titleEl.textContent = heroSlides[current].title();
    if (subEl) subEl.textContent = heroSlides[current].sub();
  }

  document.getElementById('hero-prev')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('hero-next')?.addEventListener('click', () => goTo(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => goTo(parseInt(dot.dataset.slide))));
  setInterval(() => goTo(current + 1), 6000);
}

export { renderTourCard, tourImages };
