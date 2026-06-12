export let siteSettings = {
  phone: '+20 109 907 1622',
  email: 'info@blaumeer-tours.com',
  facebook: '',
  instagram: '',
  tripadvisor: '',
  tiktok: '',
  youtube: '',
  twitter: ''
};

export async function loadSettings() {
  try {
    const res = await fetch('/api/settings');
    if (res.ok) {
      const data = await res.json();
      siteSettings = { ...siteSettings, ...data };
    }
  } catch(err) {
    console.error('Failed to load settings', err);
  }
}
