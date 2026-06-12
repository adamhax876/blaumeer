import { t, getLang } from '../i18n.js';
import { icons, renderLogo } from './icons.js';
import { siteSettings } from '../data/settings.js';

export function renderFooter() {
  document.getElementById('footer-root').innerHTML = `
    <footer class="footer" id="site-footer">
      <svg class="footer__wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,40 1440,50 L1440,0 L0,0 Z" fill="var(--bg-secondary)"/>
      </svg>
      <div class="footer__grid">
        <div class="footer__brand">
          <div style="width:160px;margin-bottom:var(--space-4)">${renderLogo(true)}</div>
          <p>${t('footer_about')}</p>
          <div class="footer__social">
            ${siteSettings.phone ? `<a href="https://wa.me/${siteSettings.phone.replace(/[^0-9]/g,'')}" target="_blank" aria-label="WhatsApp" title="WhatsApp">${icons.whatsapp}</a>` : ''}
            ${siteSettings.facebook ? `<a href="${siteSettings.facebook}" target="_blank" aria-label="Facebook" title="Facebook">${icons.facebook}</a>` : ''}
            ${siteSettings.instagram ? `<a href="${siteSettings.instagram}" target="_blank" aria-label="Instagram" title="Instagram">${icons.instagram}</a>` : ''}
            ${siteSettings.tripadvisor ? `<a href="${siteSettings.tripadvisor}" target="_blank" aria-label="TripAdvisor" title="TripAdvisor">${icons.tripadvisor}</a>` : ''}
            ${siteSettings.tiktok ? `<a href="${siteSettings.tiktok}" target="_blank" aria-label="TikTok" title="TikTok">${icons.tiktok}</a>` : ''}
            ${siteSettings.youtube ? `<a href="${siteSettings.youtube}" target="_blank" aria-label="YouTube" title="YouTube">${icons.youtube}</a>` : ''}
            ${siteSettings.twitter ? `<a href="${siteSettings.twitter}" target="_blank" aria-label="X (Twitter)" title="X (Twitter)">${icons.twitter}</a>` : ''}
          </div>
        </div>
        <div class="footer__col">
          <h4>${t('footer_quick')}</h4>
          <a data-route="/">${t('nav_home')}</a>
          <a data-route="/tours">${t('nav_tours')}</a>
          <a data-route="/about">${t('nav_about')}</a>
          <a data-route="/contact">${t('nav_contact')}</a>
          <a data-route="/blog">${t('nav_blog')}</a>
          <a data-route="/faq">${t('nav_faq')}</a>
        </div>
        <div class="footer__col">
          <h4>${t('footer_services')}</h4>
          <a data-route="/tours?cat=cultural">${t('cat_cultural')}</a>
          <a data-route="/tours?cat=desert">${t('cat_desert')}</a>
          <a data-route="/tours?cat=sea">${t('cat_sea')}</a>
          <a data-route="/tours?cat=nile">${t('cat_nile')}</a>
          <a data-route="/tours?cat=hamam">${t('cat_hamam')}</a>
          <a data-route="/tours?cat=diving">${t('cat_diving')}</a>
        </div>
        <div class="footer__col">
          <h4>${t('footer_contact')}</h4>
          <div class="footer__contact-item">${icons.phone}<span>${siteSettings.phone || '+20 109 907 1622'}</span></div>
          <div class="footer__contact-item">${icons.mail}<span>${siteSettings.email || 'info@blaumeer.com'}</span></div>
          <div class="footer__contact-item">${icons.mapPin}<span>${{en:'Dahar, next to Primary Court, Hurghada, Red Sea, Egypt',ar:'مصر، البحر الأحمر، الغردقة، الدهار بجوار المحكمة الابتدائية',de:'Dahar, neben dem Amtsgericht, Hurghada, Rotes Meer, Ägypten'}[getLang()]}</span></div>
          <div class="footer__contact-item">${icons.clock}<span>${t('contact_hours_val')}</span></div>
        </div>
      </div>
      <div class="footer__bottom">${t('footer_rights')}</div>
    </footer>
  `;
}
