export function createAdminModal() {
  const overlay = document.createElement('div');
  overlay.className = 'admin-modal-overlay';
  overlay.innerHTML = `
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h2 id="admin-modal-title">Modal Title</h2>
        <button class="admin-modal-close" id="admin-modal-close">&times;</button>
      </div>
      <div class="admin-modal-body" id="admin-modal-body"></div>
      <div class="admin-modal-footer" id="admin-modal-footer"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const close = () => {
    overlay.classList.remove('open');
    setTimeout(() => overlay.remove(), 200);
  };

  overlay.querySelector('#admin-modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if(e.target === overlay) close(); });

  return {
    open: (title, bodyHtml, footerHtml) => {
      overlay.querySelector('#admin-modal-title').textContent = title;
      overlay.querySelector('#admin-modal-body').innerHTML = bodyHtml;
      overlay.querySelector('#admin-modal-footer').innerHTML = footerHtml;
      overlay.classList.add('open');
    },
    close,
    getElement: () => overlay
  };
}

export function showTourForm(tour, fetchAPI, onSave) {
  const isEdit = !!tour;
  const modal = createAdminModal();
  
  // Default structure
  const t = tour || {
    id: '', slug: '', category: 'family', duration: '1 Day', location: 'Hurghada', price: 0, priceType: 'person', rating: 5, reviewCount: 0, popular: false,
    title: {en:'', ar:'', de:''},
    description: {en:'', ar:'', de:''},
    highlights: [], itinerary: [], included: [], excluded: [], advantages: []
  };

  const toLines = (arr) => {
    if(Array.isArray(arr)) return arr.map(a => typeof a === 'string' ? a : a.t).join('\\n');
    return '';
  };
  
  const fromLines = (str) => str.split('\\n').map(s=>s.trim()).filter(s=>s);

  const body = `
    <form id="tour-form">
      <div class="admin-form-grid">
        <div class="admin-form-group"><label class="form-label">Slug</label><input class="form-input" id="tf-slug" value="${t.slug}" required/></div>
        <div class="admin-form-group"><label class="form-label">Category</label>
          <select class="form-input" id="tf-category">
            <option value="family" ${t.category==='family'?'selected':''}>Family</option>
            <option value="history" ${t.category==='history'?'selected':''}>History</option>
            <option value="sea" ${t.category==='sea'?'selected':''}>Sea Trips</option>
            <option value="safari" ${t.category==='safari'?'selected':''}>Safari</option>
          </select>
        </div>
        <div class="admin-form-group"><label class="form-label">Price</label><input type="number" class="form-input" id="tf-price" value="${t.price}" required/></div>
        <div class="admin-form-group"><label class="form-label">Price Type</label>
          <select class="form-input" id="tf-pricetype">
            <option value="person" ${t.priceType==='person'?'selected':''}>Per Person</option>
            <option value="group" ${t.priceType==='group'?'selected':''}>Per Group</option>
          </select>
        </div>
        <div class="admin-form-group"><label class="form-label">Duration</label><input class="form-input" id="tf-duration" value="${t.duration}"/></div>
        <div class="admin-form-group"><label class="form-label">Location</label><input class="form-input" id="tf-location" value="${t.location}"/></div>
        <div class="admin-form-group"><label class="form-label">Tour Image</label><input type="file" class="form-input" id="tf-image" accept="image/*"/>
          ${t.image ? `<img src="${t.image}" style="height:40px;margin-top:10px;border-radius:4px" />` : ''}
        </div>
        <div class="admin-form-group full" style="display:flex;align-items:center;gap:10px">
          <input type="checkbox" id="tf-popular" ${t.popular?'checked':''}/> <label for="tf-popular" style="margin:0;font-weight:600">Mark as Popular</label>
        </div>
      </div>

      <div class="admin-tabs" style="margin-top:20px">
        <div class="admin-tab active" data-lang="en">English</div>
        <div class="admin-tab" data-lang="ar">Arabic</div>
        <div class="admin-tab" data-lang="de">German</div>
      </div>

      ${['en','ar','de'].map(lang => `
        <div class="admin-tab-content ${lang==='en'?'active':''}" id="tab-${lang}">
          <div class="admin-form-group"><label class="form-label">Title (${lang.toUpperCase()})</label>
            <input class="form-input" id="tf-title-${lang}" value="${t.title[lang]||''}"/>
          </div>
          <div class="admin-form-group"><label class="form-label">Description</label>
            <textarea class="form-input" id="tf-desc-${lang}" rows="3">${t.description[lang]||''}</textarea>
          </div>
          <div class="admin-form-group"><label class="form-label">Highlights (One per line)</label>
            <textarea class="form-input" id="tf-highlights-${lang}" rows="3">${toLines(t.highlights[lang]||t.highlights)}</textarea>
          </div>
          <div class="admin-form-group"><label class="form-label">Included (One per line)</label>
            <textarea class="form-input" id="tf-inc-${lang}" rows="2">${toLines(t.included[lang]||t.included)}</textarea>
          </div>
          <div class="admin-form-group"><label class="form-label">Excluded (One per line)</label>
            <textarea class="form-input" id="tf-exc-${lang}" rows="2">${toLines(t.excluded[lang]||t.excluded)}</textarea>
          </div>
          <div class="admin-form-group"><label class="form-label">Advantages (One per line)</label>
            <textarea class="form-input" id="tf-adv-${lang}" rows="2">${toLines(t.advantages[lang]||t.advantages)}</textarea>
          </div>
        </div>
      `).join('')}
    </form>
  `;

  const footer = `
    <button class="btn btn--secondary" id="tf-cancel">Cancel</button>
    <button class="btn btn--primary" id="tf-save">Save Tour</button>
  `;

  modal.open(isEdit ? 'Edit Tour' : 'Add New Tour', body, footer);

  const el = modal.getElement();
  
  // Tabs logic
  el.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      el.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));
      el.querySelectorAll('.admin-tab-content').forEach(c=>c.classList.remove('active'));
      tab.classList.add('active');
      el.querySelector('#tab-'+tab.dataset.lang).classList.add('active');
    });
  });

  el.querySelector('#tf-cancel').addEventListener('click', () => modal.close());
  
  el.querySelector('#tf-save').addEventListener('click', async () => {
    try {
      const fileInput = document.getElementById('tf-image');
      let imageUrl = t.image || null;
      if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('image', fileInput.files[0]);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('blau_admin_token')}` },
          body: formData
        });
        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      // Collect data
      const payload = {
        id: isEdit ? t.id : document.getElementById('tf-slug').value.toLowerCase().replace(/ /g, '-'),
        slug: document.getElementById('tf-slug').value,
        image: imageUrl,
        category: document.getElementById('tf-category').value,
        price: parseFloat(document.getElementById('tf-price').value),
        priceType: document.getElementById('tf-pricetype').value,
        duration: document.getElementById('tf-duration').value,
        location: document.getElementById('tf-location').value,
        popular: document.getElementById('tf-popular').checked,
        rating: t.rating,
        reviewCount: t.reviewCount,
        title: {}, description: {}, highlights: {}, included: {}, excluded: {}, advantages: {}, itinerary: t.itinerary // keeping itinerary static for now to simplify
      };

      ['en','ar','de'].forEach(l => {
        payload.title[l] = document.getElementById(`tf-title-${l}`).value;
        payload.description[l] = document.getElementById(`tf-desc-${l}`).value;
        payload.highlights[l] = fromLines(document.getElementById(`tf-highlights-${l}`).value);
        payload.included[l] = fromLines(document.getElementById(`tf-inc-${l}`).value);
        payload.excluded[l] = fromLines(document.getElementById(`tf-exc-${l}`).value);
        payload.advantages[l] = fromLines(document.getElementById(`tf-adv-${l}`).value);
      });

      if(isEdit) {
        await fetchAPI('/tours/'+t.id, 'PUT', payload);
      } else {
        await fetchAPI('/tours', 'POST', payload);
      }
      modal.close();
      if(onSave) onSave();
    } catch(err) {
      alert('Error saving tour: ' + err.message);
    }
  });
}
