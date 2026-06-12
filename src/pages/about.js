import { t, getLang } from '../i18n.js';
import { icons } from '../components/icons.js';

const lt = (obj) => obj[getLang()] || obj.en || obj;

export function renderAboutPage() {
  return `
    <div class="page-header"><div class="container"><h1>${t('about_title')}</h1><p>${t('about_subtitle')}</p></div></div>
    <section class="section"><div class="container">
      <div class="about-story animate-on-scroll">
        <div class="about-story__image"><img src="/images/tour-sea.png" alt="Blau Meer" style="width:100%;height:400px;object-fit:cover;border-radius:var(--radius-2xl)"/></div>
        <div class="about-story__content">
          <h2>${t('about_story_title')}</h2>
          <p>${t('about_story_p1')}</p>
          <p>${t('about_story_p2')}</p>
          <a class="btn btn--primary" data-route="/tours">${t('explore_tours')}</a>
        </div>
      </div>
    </div></section>
    <section class="section section--gray"><div class="container">
      <div class="mission-cards">
        ${[{icon:icons.compass,key:'mission'},{icon:icons.eye,key:'vision'},{icon:icons.heart,key:'values'}].map((m,i)=>`
          <div class="mission-card animate-on-scroll delay-${i+1}"><div class="mission-card__icon">${m.icon}</div><h3>${t('about_'+m.key)}</h3><p>${t('about_'+m.key+'_desc')}</p></div>
        `).join('')}
      </div>
    </div></section>
    <section class="section section--ocean"><div class="container">
      <div class="stats animate-on-scroll">
        ${[{n:'500+',l:{en:'Tours Completed',ar:'جولة مكتملة',de:'Touren'}},{n:'3,000+',l:{en:'Happy Clients',ar:'عميل سعيد',de:'Kunden'}},{n:'25+',l:{en:'Destinations',ar:'وجهة',de:'Reiseziele'}},{n:'5+',l:{en:'Years Experience',ar:'سنوات خبرة',de:'Jahre'}}].map(s=>`
          <div class="stat"><div class="stat__number">${s.n}</div><div class="stat__label">${lt(s.l)}</div></div>
        `).join('')}
      </div>
    </div></section>
    </div></section>
  `;
}

import { siteSettings } from '../data/settings.js';

export function renderContactPage() {
  return {
    html: `
    <div class="page-header"><div class="container"><h1>${t('contact_title')}</h1><p>${t('contact_subtitle')}</p></div></div>
    <section class="section"><div class="container">
      <div class="contact-grid">
        <div class="contact-form animate-on-scroll">
          <h3 style="margin-bottom:var(--space-6)">${t('contact_form_submit')}</h3>
          <form onsubmit="return false" id="contact-form">
            <div class="form-group"><label class="form-label">${t('contact_form_name')}</label><input class="form-input" id="cf-name" required/></div>
            <div class="form-group"><label class="form-label">${t('contact_form_email')}</label><input class="form-input" type="email" id="cf-email" required/></div>
            <div class="form-group"><label class="form-label">${t('contact_form_subject')}</label><input class="form-input" id="cf-subject"/></div>
            <div class="form-group"><label class="form-label">${t('contact_form_message')}</label><textarea class="form-input form-textarea" id="cf-message" required></textarea></div>
            <button class="btn btn--primary btn--lg" type="submit">${icons.send} ${t('contact_form_submit')}</button>
          </form>
        </div>
        <div class="contact-info-cards animate-on-scroll delay-2">
          ${[{icon:icons.phone,title:t('contact_phone'),val:siteSettings.phone||'+20 109 907 1622'},{icon:icons.mail,title:t('contact_email'),val:siteSettings.email||'info@blaumeer.com'},{icon:icons.mapPin,title:t('contact_address'),val:{en:'Dahar, next to Primary Court, Hurghada, Red Sea, Egypt',ar:'مصر، البحر الأحمر، الغردقة، الدهار، بجوار المحكمة الابتدائية',de:'Dahar, neben dem Amtsgericht, Hurghada, Rotes Meer, Ägypten'}[getLang()]},{icon:icons.clock,title:t('contact_hours'),val:t('contact_hours_val')}].map(c=>`
            <div class="contact-info-card"><div class="contact-info-card__icon">${c.icon}</div><div><h4>${c.title}</h4><p>${c.val}</p></div></div>
          `).join('')}
          <a href="${siteSettings.phone ? `https://wa.me/${siteSettings.phone.replace(/[^0-9]/g,'')}` : 'https://wa.me/201099071622'}" target="_blank" class="btn btn--accent btn--lg" style="width:100%;display:flex;align-items:center;justify-content:center;gap:10px">
            <span style="width:24px;height:24px;display:flex">${icons.whatsapp}</span> WhatsApp
          </a>
        </div>
      </div>
      <div class="contact-map animate-on-scroll" style="margin-top:var(--space-12);height:400px;border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-card)">
        <iframe 
          src="https://www.google.com/maps?q=7R37%2BWC4%20Hurghada&output=embed" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div></section>`,
    init: () => {
      document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Sending...';
        btn.disabled = true;

        const data = {
          name: document.getElementById('cf-name').value,
          email: document.getElementById('cf-email').value,
          subject: document.getElementById('cf-subject').value,
          message: document.getElementById('cf-message').value
        };

        try {
          await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          alert({en:'Thank you! We have received your message and will get back to you soon.',ar:'شكراً لك! لقد استلمنا رسالتك وسنتواصل معك قريباً.',de:'Danke! Wir haben Ihre Nachricht erhalten und melden uns bald bei Ihnen.'}[getLang()]);
          e.target.reset();
        } catch(err) {
          alert('Error sending message. Please try again.');
        } finally {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }
      });
      return () => {};
    }
  };
}
