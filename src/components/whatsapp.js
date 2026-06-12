import { icons } from './icons.js';

export function renderWhatsApp() {
  document.getElementById('whatsapp-btn-root').innerHTML = `
    <a class="whatsapp-btn" href="https://wa.me/201099071622" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
      ${icons.whatsapp}
    </a>
  `;
}
