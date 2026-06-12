import { t, getLang } from '../i18n.js';
import { icons, renderStars } from '../components/icons.js';
import { tours } from '../data/tours.js';
import { tourImages } from './home.js';

const lt = (obj) => obj[getLang()] || obj.en || obj;

export function renderTourDetailPage(params) {
  const tour = tours.find(t => t.slug === params.slug);
  if (!tour) return `<div class="container section"><h1>Tour not found</h1><a class="btn btn--primary" data-route="/tours">${t('explore_tours')}</a></div>`;

  const img = tourImages[tour.id] || '/images/tour-pyramids.png';
  const related = tours.filter(t => t.category === tour.category && t.id !== tour.id).slice(0, 3);

  const html = `
    <div class="page-header"><div class="container">
      <div class="breadcrumbs" style="justify-content:center">
        <a data-route="/" style="color:rgba(255,255,255,0.7)">${t('nav_home')}</a>
        <span class="breadcrumbs__separator" style="color:rgba(255,255,255,0.4)">›</span>
        <a data-route="/tours" style="color:rgba(255,255,255,0.7)">${t('nav_tours')}</a>
        <span class="breadcrumbs__separator" style="color:rgba(255,255,255,0.4)">›</span>
        <span style="color:#fff">${lt(tour.title)}</span>
      </div>
      <h1 style="font-size:var(--text-3xl)">${lt(tour.title)}</h1>
    </div></div>
    <div class="container tour-detail">
      <div class="tour-detail__main">
        <div class="gallery" style="margin-bottom:var(--space-8)">
          <div class="gallery__main"><img src="${tour.image || img}" alt="${lt(tour.title)}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-xl)"/></div>
        </div>
        <div class="tour-detail__meta">
          <div class="tour-detail__meta-item">${icons.clock} ${t('tour_duration')}: <strong>${tour.duration}</strong></div>
          <div class="tour-detail__meta-item">${icons.tag} ${t('tour_type')}: <strong>${t('cat_'+tour.category)}</strong></div>
          <div class="tour-detail__meta-item">${icons.map} ${t('tour_location')}: <strong>${tour.location}</strong></div>
          <div class="tour-detail__meta-item">${renderStars(Math.round(tour.rating))} <strong>(${tour.reviewCount})</strong></div>
        </div>
        <div class="tour-detail__section"><h2>${t('detail_intro')}</h2><p>${lt(tour.description)}</p></div>
        <div class="tour-detail__section"><h2>${t('detail_highlights')}</h2><div class="tour-detail__highlights">${lt(tour.highlights).map(h=>`<div class="tour-detail__highlight">${icons.check} ${h}</div>`).join('')}</div></div>
        <div class="tour-detail__section"><h2>${t('detail_itinerary')}</h2>${lt(tour.itinerary).map(item=>`<div class="tour-detail__itinerary-item"><h4>${item.t}</h4><p>${item.d}</p></div>`).join('')}</div>
        <div class="tour-detail__section"><div class="tour-detail__inclusions">
          <div><h3 style="color:var(--color-success);margin-bottom:var(--space-4)">${t('detail_included')}</h3><ul class="tour-detail__list tour-detail__list--included">${lt(tour.included).map(i=>`<li>${icons.check} ${i}</li>`).join('')}</ul></div>
          <div><h3 style="color:var(--color-error);margin-bottom:var(--space-4)">${t('detail_excluded')}</h3><ul class="tour-detail__list tour-detail__list--excluded">${lt(tour.excluded).map(i=>`<li>${icons.x} ${i}</li>`).join('')}</ul></div>
        </div></div>
        <div class="tour-detail__section"><h2>${t('detail_advantages')}</h2><div class="tour-detail__advantages">${lt(tour.advantages).map(a=>`<div class="tour-detail__advantage">${icons.check} <span>${a}</span></div>`).join('')}</div></div>
        <div class="tour-detail__section" id="tour-reviews-container">
          <h2>${t('detail_reviews')}</h2>
          <div style="display:flex;align-items:center;gap:var(--space-4);margin-bottom:var(--space-6);padding:var(--space-5);background:var(--gray-50);border-radius:var(--radius-xl)">
            <div style="font-size:var(--text-5xl);font-weight:800;color:var(--color-primary);font-family:var(--font-heading)">${tour.rating}</div>
            <div>${renderStars(Math.round(tour.rating))}<p style="font-size:var(--text-sm);color:var(--text-secondary);margin-top:var(--space-1)">${tour.reviewCount} ${{en:'reviews',ar:'تقييم',de:'Bewertungen'}[getLang()]}</p></div>
          </div>
          <div id="dynamic-reviews-list"></div>
          <div style="margin-top:var(--space-8);padding:var(--space-6);background:var(--bg-primary);border-radius:var(--radius-xl);box-shadow:var(--shadow-card)">
            <h3 style="margin-bottom:var(--space-4)">${{en:'Write a Review',ar:'اكتب تقييماً',de:'Schreiben Sie eine Bewertung'}[getLang()]}</h3>
            <form id="review-form">
              <div class="form-group"><input type="text" id="rf-name" class="form-input" placeholder="${{en:'Your Name',ar:'اسمك',de:'Ihr Name'}[getLang()]}" required/></div>
              <div class="form-group"><input type="text" id="rf-country" class="form-input" placeholder="${{en:'Your Country',ar:'بلدك',de:'Ihr Land'}[getLang()]}" required/></div>
              <div class="form-group"><select id="rf-rating" class="form-input" required>
                <option value="5">5 Stars</option><option value="4">4 Stars</option><option value="3">3 Stars</option><option value="2">2 Stars</option><option value="1">1 Star</option>
              </select></div>
              <div class="form-group"><textarea id="rf-text" class="form-input form-textarea" placeholder="${{en:'Your Review',ar:'تقييمك',de:'Ihre Bewertung'}[getLang()]}" required></textarea></div>
              <button type="submit" class="btn btn--primary">${{en:'Submit Review',ar:'إرسال التقييم',de:'Bewertung abgeben'}[getLang()]}</button>
            </form>
          </div>
        </div>
        ${related.length?`<div class="tour-detail__section"><h2>${t('detail_related')}</h2><div class="related-tours__grid">${related.map(r=>{
          const rImg = r.image || tourImages[r.id]||'/images/tour-pyramids.png';
          return `<a class="tour-card" data-route="/tour/${r.slug}"><div class="tour-card__image" style="height:160px"><img src="${rImg}" alt="${lt(r.title)}" loading="lazy"/></div><div class="tour-card__body" style="padding:var(--space-4)"><div class="tour-card__title" style="font-size:var(--text-base)">${lt(r.title)}</div><div class="tour-card__footer" style="padding-top:var(--space-3)"><span class="tour-card__price-amount" style="font-size:var(--text-lg)">€${r.price}</span><span class="btn btn--primary btn--sm">${t('tour_view')}</span></div></div></a>`;
        }).join('')}</div></div>`:''}
      </div>
      <div class="tour-detail__sidebar">
        <div class="booking-sidebar">
          <div class="booking-sidebar__price">
            <div class="booking-sidebar__price-label">${t('tour_from')}</div>
            <div class="booking-sidebar__price-amount">€${tour.price}</div>
            <div class="booking-sidebar__price-unit">${tour.priceType==='person'?t('tour_per_person'):t('tour_private')}</div>
          </div>
          <form id="booking-form">
            <div class="form-group"><label class="form-label">${t('book_first_name')}</label><input id="bf-fname" class="form-input" required/></div>
            <div class="form-group"><label class="form-label">${t('book_last_name')}</label><input id="bf-lname" class="form-input" required/></div>
            <div class="form-group"><label class="form-label">${t('book_email')}</label><input id="bf-email" class="form-input" type="email" required/></div>
            <div class="form-group"><label class="form-label">${t('book_phone')}</label><input id="bf-phone" class="form-input" type="tel"/></div>
            <div class="form-group"><label class="form-label">${t('book_hotel')}</label><input id="bf-hotel" class="form-input"/></div>
            <div class="form-group"><label class="form-label">${t('book_date')}</label><input id="bf-date" class="form-input" type="date" required/></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
              <div class="form-group"><label class="form-label">${t('book_adults')}</label><select id="bf-adults" class="form-input form-select">${[1,2,3,4,5,6,7,8].map(n=>`<option>${n}</option>`).join('')}</select></div>
              <div class="form-group"><label class="form-label">${t('book_children')}</label><select id="bf-children" class="form-input form-select">${[0,1,2,3,4,5].map(n=>`<option>${n}</option>`).join('')}</select></div>
            </div>
            <button type="submit" class="btn btn--primary btn--lg" style="width:100%">${t('book_submit')}</button>
            <a href="https://wa.me/201099071622" target="_blank" class="btn btn--secondary" style="width:100%;margin-top:var(--space-2)">${t('detail_inquiry')}</a>
          </form>
        </div>
      </div>
    </div>
  `;
  return { 
    html, 
    init: () => {
      document.getElementById('booking-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
          tour_id: tour.id,
          first_name: document.getElementById('bf-fname').value,
          last_name: document.getElementById('bf-lname').value,
          email: document.getElementById('bf-email').value,
          phone: document.getElementById('bf-phone').value,
          hotel: document.getElementById('bf-hotel').value,
          date: document.getElementById('bf-date').value,
          adults: document.getElementById('bf-adults').value,
          children: document.getElementById('bf-children').value,
        };
        
        // 1. Send to Backend
        try {
          fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          }).catch(err => console.error(err));
        } catch(err) {}

        // 2. Open WhatsApp with pre-filled message
        const lang = getLang();
        let message = '';
        if(lang === 'ar') {
          message = `مرحباً، أود حجز رحلة: \n🚢 *${lt(tour.title)}*\n📅 التاريخ: ${data.date}\n👥 الأفراد: ${data.adults} بالغين، ${data.children} أطفال\n🏨 الفندق: ${data.hotel}\n👤 الاسم: ${data.first_name} ${data.last_name}`;
        } else if(lang === 'de') {
          message = `Hallo, ich möchte eine Tour buchen: \n🚢 *${lt(tour.title)}*\n📅 Datum: ${data.date}\n👥 Personen: ${data.adults} Erwachsene, ${data.children} Kinder\n🏨 Hotel: ${data.hotel}\n👤 Name: ${data.first_name} ${data.last_name}`;
        } else {
          message = `Hello, I would like to book a tour: \n🚢 *${lt(tour.title)}*\n📅 Date: ${data.date}\n👥 People: ${data.adults} Adults, ${data.children} Children\n🏨 Hotel: ${data.hotel}\n👤 Name: ${data.first_name} ${data.last_name}`;
        }
        
        const waLink = `https://wa.me/201099071622?text=${encodeURIComponent(message)}`;
        window.open(waLink, '_blank');
      });

      // Load Reviews
      fetch('/api/reviews?tour_id='+tour.id)
        .then(res => res.json())
        .then(reviews => {
          const container = document.getElementById('dynamic-reviews-list');
          if (reviews && reviews.length > 0) {
            container.innerHTML = reviews.map(r => `
              <div style="padding:var(--space-4);border-bottom:1px solid var(--gray-200);margin-bottom:var(--space-4)">
                <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-2)">
                  <strong>${r.name}</strong> <span style="color:var(--text-secondary);font-size:var(--text-sm)">${r.date}</span>
                </div>
                <div style="margin-bottom:var(--space-2)">${renderStars(r.rating)} <span style="font-size:var(--text-sm);color:var(--text-secondary)">(${r.country})</span></div>
                <p style="color:var(--text-secondary)">${r.text}</p>
              </div>
            `).join('');
          } else {
            container.innerHTML = `<p style="color:var(--text-secondary)">${{en:'No reviews yet. Be the first to review!',ar:'لا توجد تقييمات بعد. كن أول من يقيّم!',de:'Noch keine Bewertungen. Seien Sie der Erste, der eine Bewertung abgibt!'}[getLang()]}</p>`;
          }
        });

      // Submit Review
      document.getElementById('review-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
          tour_id: tour.id,
          name: document.getElementById('rf-name').value,
          country: document.getElementById('rf-country').value,
          rating: parseInt(document.getElementById('rf-rating').value),
          text: document.getElementById('rf-text').value
        };
        try {
          const res = await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          if (res.ok) {
            alert({en:'Thank you! Your review is pending approval.',ar:'شكراً لك! تقييمك قيد المراجعة.',de:'Danke! Ihre Bewertung wird geprüft.'}[getLang()]);
            document.getElementById('review-form').reset();
          } else {
            alert('Error submitting review');
          }
        } catch(err) {
          console.error(err);
        }
      });

      return () => {}; 
    } 
  };
}
