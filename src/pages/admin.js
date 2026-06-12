import { t } from '../i18n.js';
import { icons, renderLogo } from '../components/icons.js';
import { showTourForm } from './admin-tours.js';

let token = localStorage.getItem('blau_admin_token');

async function fetchAPI(endpoint, method = 'GET', body = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  
  const res = await fetch(`/api${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });
  
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem('blau_admin_token');
    token = null;
    window.location.href = '/admin';
  }
  
  return res.json();
}

function renderLogin() {
  return `
    <div class="admin-login">
      <div class="admin-login__card animate-on-scroll">
        <div style="margin-bottom:var(--space-6)">${renderLogo(false)}</div>
        <h1>Admin Login</h1>
        <form id="admin-login-form">
          <div class="form-group"><input type="text" id="admin-user" class="form-input" placeholder="Username" required/></div>
          <div class="form-group"><input type="password" id="admin-pass" class="form-input" placeholder="Password" required/></div>
          <button type="submit" class="btn btn--primary btn--lg" style="width:100%">Login</button>
        </form>
        <p id="admin-error" style="color:var(--color-error);margin-top:var(--space-4);display:none;"></p>
      </div>
    </div>
  `;
}

function renderDashboardLayout(content) {
  return `
    <div class="admin-layout" dir="ltr">
      <aside class="admin-sidebar">
        <div class="admin-sidebar__logo">${renderLogo()}</div>
        <nav class="admin-nav">
          <a class="admin-nav__link" data-admin-view="dashboard">${icons.refresh} Dashboard</a>
          <a class="admin-nav__link" data-admin-view="tours">${icons.map} Manage Tours</a>
          <a class="admin-nav__link" data-admin-view="bookings">${icons.calendar} Bookings</a>
          <a class="admin-nav__link" data-admin-view="reviews">${icons.star} Reviews</a>
          <a class="admin-nav__link" data-admin-view="subscribers" style="display:flex;align-items:center;gap:10px">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Subscribers
          </a>
          <a class="admin-nav__link" data-admin-view="messages" style="display:flex;align-items:center;gap:10px">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg> Messages
          </a>
          <a class="admin-nav__link" data-admin-view="settings">${icons.tag} Settings</a>
          <a class="admin-nav__link" id="admin-logout" style="margin-top:auto;color:var(--color-error)">${icons.x} Logout</a>
        </nav>
      </aside>
      <main class="admin-main" id="admin-content">
        ${content}
      </main>
    </div>
  `;
}

export function renderAdminPage() {
  if (!token) {
    return {
      html: renderLogin(),
      init: () => {
        document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const u = document.getElementById('admin-user').value;
          const p = document.getElementById('admin-pass').value;
          try {
            const res = await fetch('/api/auth/login', {
              method: 'POST',
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify({username:u, password:p})
            });
            const data = await res.json();
            if (data.token) {
              localStorage.setItem('blau_admin_token', data.token);
              token = data.token;
              window.location.href = '/admin';
            } else {
              document.getElementById('admin-error').textContent = data.error || 'Login failed';
              document.getElementById('admin-error').style.display = 'block';
            }
          } catch (err) {
            console.error(err);
          }
        });
        return () => {};
      }
    };
  }

  // If logged in, load dashboard
  const html = renderDashboardLayout(`
    <div class="admin-header">
      <h1>Dashboard Loading...</h1>
    </div>
  `);

  return {
    html,
    init: () => {
      document.getElementById('admin-logout').addEventListener('click', () => {
        localStorage.removeItem('blau_admin_token');
        token = null;
        window.location.href = '/admin';
      });

      // Simple internal router for admin views
      const contentDiv = document.getElementById('admin-content');
      const loadView = async (view) => {
        document.querySelectorAll('.admin-nav__link').forEach(l => l.classList.remove('active'));
        document.querySelector(`[data-admin-view="${view}"]`)?.classList.add('active');

        if (view === 'dashboard') {
          const tours = await fetchAPI('/tours');
          const bookings = await fetchAPI('/bookings');
          contentDiv.innerHTML = `
            <div class="admin-header"><h1>Dashboard</h1></div>
            <div class="stats">
              <div class="admin-card text-center"><h2>${tours.length}</h2><p>Total Tours</p></div>
              <div class="admin-card text-center"><h2>${bookings.length}</h2><p>Total Bookings</p></div>
            </div>
          `;
        } else if (view === 'tours') {
          const tours = await fetchAPI('/tours');
          contentDiv.innerHTML = `
            <div class="admin-header">
              <h1>Manage Tours</h1>
              <button class="btn btn--primary" id="add-tour-btn">+ Add Tour</button>
            </div>
            <div class="admin-card" style="padding:0;overflow:hidden">
              <table class="admin-table">
                <thead><tr><th>ID/Slug</th><th>Title (EN)</th><th>Price</th><th>Actions</th></tr></thead>
                <tbody>
                  ${tours.map(t => `
                    <tr>
                      <td>${t.slug}</td>
                      <td>${t.title.en || t.title}</td>
                      <td>€${t.price}</td>
                      <td>
                        <button class="btn btn--sm btn--secondary edit-tour-btn" data-id="${t.id}">Edit</button>
                        <button class="btn btn--sm del-tour-btn" style="color:red;border-color:red" data-id="${t.id}">Delete</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `;

          contentDiv.querySelector('#add-tour-btn').addEventListener('click', () => {
            showTourForm(null, fetchAPI, () => loadView('tours'));
          });

          contentDiv.querySelectorAll('.edit-tour-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              const id = e.target.dataset.id;
              const tour = tours.find(t => t.id === id);
              showTourForm(tour, fetchAPI, () => loadView('tours'));
            });
          });

          contentDiv.querySelectorAll('.del-tour-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
              if (confirm('Are you sure you want to delete this tour?')) {
                try {
                  await fetchAPI('/tours/' + e.target.dataset.id, 'DELETE');
                  loadView('tours');
                } catch(err) {
                  alert('Delete failed');
                }
              }
            });
          });
        } else if (view === 'bookings') {
          const bookings = await fetchAPI('/bookings');
          contentDiv.innerHTML = `
            <div class="admin-header"><h1>Bookings</h1></div>
            <div class="admin-card" style="padding:0;overflow:hidden">
              <table class="admin-table">
                <thead><tr><th>Date</th><th>Tour ID</th><th>Name</th><th>Phone</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  ${bookings.map(b => `
                    <tr>
                      <td>${new Date(b.created_at).toLocaleDateString()}</td>
                      <td>${b.tour_id}</td>
                      <td>${b.first_name} ${b.last_name}</td>
                      <td>${b.phone}</td>
                      <td><span class="tour-card__badge" style="position:static;background:${b.status==='confirmed'?'#10b981':b.status==='cancelled'?'#ef4444':'#f59e0b'}">${b.status}</span></td>
                      <td>
                        <select class="form-input booking-status-select" data-id="${b.id}" style="padding:4px 8px; font-size:12px; height:auto">
                          <option value="pending" ${b.status==='pending'?'selected':''}>Pending</option>
                          <option value="confirmed" ${b.status==='confirmed'?'selected':''}>Confirmed</option>
                          <option value="cancelled" ${b.status==='cancelled'?'selected':''}>Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `;

          contentDiv.querySelectorAll('.booking-status-select').forEach(sel => {
            sel.addEventListener('change', async (e) => {
              try {
                await fetchAPI('/bookings/' + e.target.dataset.id + '/status', 'PUT', { status: e.target.value });
                loadView('bookings');
              } catch(err) {
                alert('Failed to update booking status');
              }
            });
          });
        } else if (view === 'reviews') {
          const reviews = await fetchAPI('/admin/reviews');
          contentDiv.innerHTML = `
            <div class="admin-header"><h1>Manage Reviews</h1></div>
            <div class="admin-card" style="padding:0;overflow:hidden">
              <table class="admin-table">
                <thead><tr><th>Date</th><th>Tour ID</th><th>Name</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  ${reviews.length ? reviews.map(r => `
                    <tr>
                      <td>${r.date}</td>
                      <td>${r.tour_id}</td>
                      <td>${r.name} (${r.country})</td>
                      <td>${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</td>
                      <td><span class="tour-card__badge" style="position:static;background:${r.approved?'#10b981':'#f59e0b'}">${r.approved?'Approved':'Pending'}</span></td>
                      <td>
                        <button class="btn btn--sm btn--secondary toggle-review-btn" data-id="${r.id}" data-approved="${r.approved}">${r.approved?'Reject':'Approve'}</button>
                        <button class="btn btn--sm del-review-btn" style="color:red;border-color:red" data-id="${r.id}">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="6" style="padding: 10px 20px; font-style: italic; color: var(--text-secondary); border-bottom: 1px solid var(--gray-200); background: #fafafa;">"${r.text}"</td>
                    </tr>
                  `).join('') : '<tr><td colspan="6" style="text-align:center;padding:20px">No reviews found</td></tr>'}
                </tbody>
              </table>
            </div>
          `;

          contentDiv.querySelectorAll('.toggle-review-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
              const id = e.target.dataset.id;
              const currentStatus = e.target.dataset.approved === '1' || e.target.dataset.approved === 'true';
              try {
                await fetchAPI('/admin/reviews/' + id, 'PUT', { approved: !currentStatus });
                loadView('reviews');
              } catch(err) { alert('Update failed'); }
            });
          });

          contentDiv.querySelectorAll('.del-review-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
              if (confirm('Delete this review forever?')) {
                try {
                  await fetchAPI('/admin/reviews/' + e.target.dataset.id, 'DELETE');
                  loadView('reviews');
                } catch(err) { alert('Delete failed'); }
              }
            });
          });
        } else if (view === 'subscribers') {
          const subscribers = await fetchAPI('/admin/subscribers');
          contentDiv.innerHTML = `
            <div class="admin-header"><h1>Newsletter Subscribers</h1></div>
            <div class="admin-card" style="padding:0;overflow:hidden">
              <table class="admin-table">
                <thead><tr><th>Date Subscribed</th><th>Email Address</th></tr></thead>
                <tbody>
                  ${subscribers.length ? subscribers.map(s => `
                    <tr>
                      <td>${new Date(s.created_at).toLocaleDateString()} ${new Date(s.created_at).toLocaleTimeString()}</td>
                      <td style="font-weight:600">${s.email}</td>
                    </tr>
                  `).join('') : '<tr><td colspan="2" style="text-align:center;padding:20px">No subscribers yet</td></tr>'}
                </tbody>
              </table>
            </div>
          `;
        } else if (view === 'messages') {
          const messages = await fetchAPI('/admin/messages');
          contentDiv.innerHTML = `
            <div class="admin-header"><h1>Contact Messages</h1></div>
            <div class="admin-card" style="padding:0;overflow:hidden">
              <table class="admin-table">
                <thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Subject</th><th>Status</th></tr></thead>
                <tbody>
                  ${messages.length ? messages.map(m => `
                    <tr style="background:${m.is_read?'transparent':'#f0fdf4'}; cursor:pointer" class="msg-row" data-id="${m.id}" data-message="${encodeURIComponent(m.message)}">
                      <td>${new Date(m.created_at).toLocaleDateString()}</td>
                      <td style="font-weight:600">${m.name}</td>
                      <td>${m.email}</td>
                      <td>${m.subject || '-'}</td>
                      <td><span class="tour-card__badge" style="position:static;background:${m.is_read?'#9ca3af':'#10b981'}">${m.is_read?'Read':'New'}</span></td>
                    </tr>
                    <tr id="msg-detail-${m.id}" style="display:none">
                      <td colspan="5" style="padding:20px; background:#fafafa; border-bottom:1px solid var(--gray-200)">
                        <strong>Message:</strong>
                        <p style="margin-top:10px; color:var(--text-secondary); white-space:pre-wrap">${m.message}</p>
                        ${!m.is_read ? `<button class="btn btn--sm btn--primary mark-read-btn" data-id="${m.id}" style="margin-top:15px">Mark as Read</button>` : ''}
                      </td>
                    </tr>
                  `).join('') : '<tr><td colspan="5" style="text-align:center;padding:20px">No messages found</td></tr>'}
                </tbody>
              </table>
            </div>
          `;

          contentDiv.querySelectorAll('.msg-row').forEach(row => {
            row.addEventListener('click', () => {
              const detailRow = document.getElementById('msg-detail-' + row.dataset.id);
              detailRow.style.display = detailRow.style.display === 'none' ? 'table-row' : 'none';
            });
          });

          contentDiv.querySelectorAll('.mark-read-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
              e.stopPropagation();
              try {
                await fetchAPI('/admin/messages/' + e.target.dataset.id + '/read', 'PUT');
                loadView('messages');
              } catch(err) {
                alert('Update failed');
              }
            });
          });
        } else if (view === 'settings') {
          const settings = await fetchAPI('/settings');
          contentDiv.innerHTML = `
            <div class="admin-header"><h1>Settings & Security</h1></div>
            <div class="admin-form-grid">
              <div class="admin-card">
                <h3 style="margin-bottom:var(--space-4)">Contact Information</h3>
                <form id="settings-form">
                  <div class="admin-form-group"><label class="form-label">Phone Number (WhatsApp)</label><input class="form-input" id="set-phone" value="${settings.phone||''}"/></div>
                  <div class="admin-form-group"><label class="form-label">Email</label><input class="form-input" id="set-email" value="${settings.email||''}"/></div>
                  <div class="admin-form-group"><label class="form-label">Facebook Link</label><input class="form-input" id="set-fb" value="${settings.facebook||''}"/></div>
                  <div class="admin-form-group"><label class="form-label">Instagram Link</label><input class="form-input" id="set-ig" value="${settings.instagram||''}"/></div>
                  <div class="admin-form-group"><label class="form-label">TripAdvisor Link</label><input class="form-input" id="set-ta" value="${settings.tripadvisor||''}"/></div>
                  <div class="admin-form-group"><label class="form-label">TikTok Link</label><input class="form-input" id="set-tk" value="${settings.tiktok||''}"/></div>
                  <div class="admin-form-group"><label class="form-label">YouTube Link</label><input class="form-input" id="set-yt" value="${settings.youtube||''}"/></div>
                  <div class="admin-form-group"><label class="form-label">X (Twitter) Link</label><input class="form-input" id="set-tw" value="${settings.twitter||''}"/></div>
                  <button type="submit" class="btn btn--primary" style="width:100%;margin-top:10px">Save Settings</button>
                </form>
              </div>
              <div class="admin-card">
                <h3 style="margin-bottom:var(--space-4);color:var(--color-error)">Change Password</h3>
                <form id="password-form">
                  <div class="admin-form-group"><label class="form-label">Current Password</label><input type="password" class="form-input" id="pwd-old" required/></div>
                  <div class="admin-form-group"><label class="form-label">New Password</label><input type="password" class="form-input" id="pwd-new" required minlength="6"/></div>
                  <button type="submit" class="btn btn--primary" style="width:100%;margin-top:10px">Update Password</button>
                </form>
              </div>
            </div>
          `;

          contentDiv.querySelector('#settings-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const phone = document.getElementById('set-phone').value;
            const email = document.getElementById('set-email').value;
            const facebook = document.getElementById('set-fb').value;
            const instagram = document.getElementById('set-ig').value;
            const tripadvisor = document.getElementById('set-ta').value;
            const tiktok = document.getElementById('set-tk').value;
            const youtube = document.getElementById('set-yt').value;
            const twitter = document.getElementById('set-tw').value;
            try {
              await fetchAPI('/settings', 'POST', { phone, email, facebook, instagram, tripadvisor, tiktok, youtube, twitter });
              alert('Settings saved successfully!');
            } catch(err) {
              alert('Error saving settings');
            }
          });

          contentDiv.querySelector('#password-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const oldPassword = document.getElementById('pwd-old').value;
            const newPassword = document.getElementById('pwd-new').value;
            try {
              const res = await fetchAPI('/auth/password', 'PUT', { oldPassword, newPassword });
              if (res.error) {
                alert(res.error);
              } else {
                alert('Password updated successfully! You will need to login again.');
                document.getElementById('admin-logout').click();
              }
            } catch(err) {
              alert('Error updating password');
            }
          });
        }
      };

      document.querySelectorAll('[data-admin-view]').forEach(link => {
        link.addEventListener('click', (e) => loadView(e.target.dataset.adminView));
      });

      // Load default
      loadView('dashboard');
      return () => {};
    }
  };
}
