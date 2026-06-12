import { t, getLang } from '../i18n.js';
import { icons, renderStars } from '../components/icons.js';
import { tours } from '../data/tours.js';
import { categories } from '../data/categories.js';
import { tourImages } from './home.js';

const lt = (obj) => obj[getLang()] || obj.en || obj;

export function renderToursPage() {
  const params = new URLSearchParams(window.location.search);
  const catFilter = params.get('cat');
  const filtered = catFilter ? tours.filter(t => t.category === catFilter) : tours;
  const catName = catFilter ? t('cat_' + catFilter) : t('nav_tours');

  const html = `
    <div class="page-header"><div class="container">
      <div class="breadcrumbs" style="justify-content:center">
        <a data-route="/" style="color:rgba(255,255,255,0.7)">${t('nav_home')}</a>
        <span class="breadcrumbs__separator" style="color:rgba(255,255,255,0.4)">›</span>
        <span class="breadcrumbs__current" style="color:#fff">${catName}</span>
      </div>
      <h1>${catName}</h1><p>${t('section_popular_sub')}</p>
    </div></div>
    <div class="container tours-page">
      <aside class="filters">
        <div class="filters__group">
          <div class="filters__title">${t('nav_categories')}</div>
          <a class="filters__option" data-route="/tours"><div class="filters__checkbox ${!catFilter?'checked':''}"></div><span>${{en:'All Tours',ar:'جميع الجولات',de:'Alle Touren'}[getLang()]}</span></a>
          ${categories.map(cat=>`<a class="filters__option" data-route="/tours?cat=${cat.id}"><div class="filters__checkbox ${catFilter===cat.id?'checked':''}"></div><span>${cat.icon} ${t('cat_'+cat.id)}</span></a>`).join('')}
        </div>
      </aside>
      <div>
        <div class="tours-page__header">
          <span class="tours-page__count">${filtered.length} ${{en:'tours found',ar:'جولة',de:'Touren gefunden'}[getLang()]}</span>
        </div>
        <div class="tours-page__results">
          ${filtered.map((tour,i)=>{
            const img = tour.image || tourImages[tour.id] || '/images/tour-pyramids.webp';
            return `<a class="tour-card animate-on-scroll delay-${(i%3)+1}" data-route="/tour/${tour.slug}">
              <div class="tour-card__image"><img src="${img}" alt="${lt(tour.title)}" loading="lazy"/><span class="tour-card__badge badge badge--primary">${t('cat_'+tour.category)}</span></div>
              <div class="tour-card__body">
                <div class="tour-card__title">${lt(tour.title)}</div>
                <div class="tour-card__meta">
                  <span class="tour-card__meta-item">${icons.clock} ${tour.duration}</span>
                  <span class="tour-card__meta-item">${icons.map} ${tour.location}</span>
                  <span class="tour-card__meta-item">${renderStars(Math.round(tour.rating))} (${tour.reviewCount})</span>
                </div>
                <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:var(--space-3);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${lt(tour.description)}</p>
                <div class="tour-card__footer">
                  <div class="tour-card__price"><span class="tour-card__price-from">${t('tour_from')}</span><span class="tour-card__price-amount">€${tour.price}</span><span class="tour-card__price-unit">/ ${tour.priceType==='person'?t('tour_per_person'):t('tour_private')}</span></div>
                  <span class="btn btn--primary btn--sm">${t('tour_view')}</span>
                </div>
              </div>
            </a>`;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  return { html, init: () => () => {} };
}
