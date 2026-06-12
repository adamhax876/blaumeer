import * as db from './db.js';
import { tours } from '../src/data/tours.js';
import { categories } from '../src/data/categories.js';

async function seed() {
  console.log('Seeding database...');
  
  // Seed settings
  await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES ('phone', '+20 109 907 1622')");
  await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES ('email', 'info@blaumeer.com')");
  await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES ('address_en', 'Dahar, next to Primary Court, Hurghada, Red Sea, Egypt')");
  await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES ('address_ar', 'مصر، البحر الأحمر، الغردقة، الدهار، بجوار المحكمة الابتدائية')");
  
  // Seed tours
  for (const t of tours) {
    const exists = await db.get('SELECT id FROM tours WHERE id = ?', [t.id]);
    if (!exists) {
      await db.run(
        `INSERT INTO tours (id, slug, title, description, category, duration, location, price, priceType, rating, reviewCount, popular, highlights, itinerary, included, excluded, advantages) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          t.id, t.slug, JSON.stringify(t.title), JSON.stringify(t.description), t.category, t.duration, t.location, t.price, t.priceType,
          t.rating, t.reviewCount, t.popular ? 1 : 0, JSON.stringify(t.highlights), JSON.stringify(t.itinerary),
          JSON.stringify(t.included), JSON.stringify(t.excluded), JSON.stringify(t.advantages)
        ]
      );
      console.log(`Seeded tour: ${t.slug}`);
    }
  }
  
  console.log('Seeding complete.');
  process.exit(0);
}

// Wait a bit for db to init
setTimeout(seed, 1000);
