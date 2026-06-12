import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as db from './db.js';

const app = express();
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'))
});
const upload = multer({ storage });
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'blau-meer-super-secret-key-2026';

// --- SECURITY MIDDLEWARES ---
app.use(helmet({
  crossOriginResourcePolicy: false, // allow images to be served
}));
app.use(cors()); // In production, restrict to frontend domain
app.use(express.json());

// Rate Limiting for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per window
  message: { error: 'Too many login attempts, please try again after 15 minutes' }
});

// General API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, 
});
app.use('/api', apiLimiter);

// --- AUTH MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// ================= ROUTES =================

app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: '/uploads/' + req.file.filename });
});

// --- AUTH ROUTES ---
app.post('/api/auth/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await db.get('SELECT * FROM admins WHERE username = ?', [username]);
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Protected: Update admin password
app.put('/api/auth/password', authenticateToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const admin = await db.get('SELECT * FROM admins WHERE id = ?', [req.user.id]);
    
    const validPassword = await bcrypt.compare(oldPassword, admin.password);
    if (!validPassword) return res.status(401).json({ error: 'Incorrect old password' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.run('UPDATE admins SET password = ? WHERE id = ?', [hashed, req.user.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- TOURS ROUTES ---
// Public: Get all tours
app.get('/api/tours', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM tours');
    // Parse JSON strings back to objects
    const tours = rows.map(r => ({
      ...r,
      title: JSON.parse(r.title || '{}'),
      description: JSON.parse(r.description || '{}'),
      highlights: JSON.parse(r.highlights || '[]'),
      itinerary: JSON.parse(r.itinerary || '[]'),
      included: JSON.parse(r.included || '[]'),
      excluded: JSON.parse(r.excluded || '[]'),
      advantages: JSON.parse(r.advantages || '[]'),
      popular: r.popular === 1
    }));
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected: Add a tour
app.post('/api/tours', authenticateToken, async (req, res) => {
  try {
    const t = req.body;
    await db.run(
      `INSERT INTO tours (id, slug, image, title, description, category, duration, location, price, priceType, rating, reviewCount, popular, highlights, itinerary, included, excluded, advantages) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        t.id, t.slug, t.image, JSON.stringify(t.title), JSON.stringify(t.description), t.category, t.duration, t.location, t.price, t.priceType,
        t.rating, t.reviewCount, t.popular ? 1 : 0, JSON.stringify(t.highlights), JSON.stringify(t.itinerary),
        JSON.stringify(t.included), JSON.stringify(t.excluded), JSON.stringify(t.advantages)
      ]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected: Update a tour
app.put('/api/tours/:id', authenticateToken, async (req, res) => {
  try {
    const t = req.body;
    await db.run(
      `UPDATE tours SET slug=?, image=?, title=?, description=?, category=?, duration=?, location=?, price=?, priceType=?, rating=?, reviewCount=?, popular=?, highlights=?, itinerary=?, included=?, excluded=?, advantages=? WHERE id=?`,
      [
        t.slug, t.image, JSON.stringify(t.title), JSON.stringify(t.description), t.category, t.duration, t.location, t.price, t.priceType,
        t.rating, t.reviewCount, t.popular ? 1 : 0, JSON.stringify(t.highlights), JSON.stringify(t.itinerary),
        JSON.stringify(t.included), JSON.stringify(t.excluded), JSON.stringify(t.advantages), req.params.id
      ]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected: Delete a tour
app.delete('/api/tours/:id', authenticateToken, async (req, res) => {
  try {
    await db.run('DELETE FROM tours WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- REVIEWS ROUTES ---
// Public: Submit a review
app.post('/api/reviews', async (req, res) => {
  try {
    const { tour_id, name, country, rating, text } = req.body;
    const date = new Date().toISOString().split('T')[0];
    const id = Date.now().toString() + '-' + Math.floor(Math.random()*1000);
    await db.run(
      `INSERT INTO reviews (id, tour_id, name, country, rating, text, date, approved) VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
      [id, tour_id, name, country, rating, text, date]
    );
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: Get approved reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const { tour_id } = req.query;
    let query = 'SELECT * FROM reviews WHERE approved = 1 ORDER BY date DESC';
    let params = [];
    if (tour_id) {
      query = 'SELECT * FROM reviews WHERE approved = 1 AND tour_id = ? ORDER BY date DESC';
      params = [tour_id];
    }
    const reviews = await db.all(query, params);
    res.json(reviews);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected: Admin get all reviews
app.get('/api/admin/reviews', authenticateToken, async (req, res) => {
  try {
    const reviews = await db.all('SELECT * FROM reviews ORDER BY date DESC');
    res.json(reviews);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected: Admin approve review
app.put('/api/admin/reviews/:id', authenticateToken, async (req, res) => {
  try {
    const approved = req.body.approved ? 1 : 0;
    await db.run('UPDATE reviews SET approved = ? WHERE id = ?', [approved, req.params.id]);
    
    const review = await db.get('SELECT tour_id FROM reviews WHERE id = ?', [req.params.id]);
    if (review && review.tour_id) {
      const stats = await db.get('SELECT COUNT(*) as count, AVG(rating) as avg FROM reviews WHERE tour_id = ? AND approved = 1', [review.tour_id]);
      const avg = stats.avg ? parseFloat(stats.avg.toFixed(1)) : 5.0;
      await db.run('UPDATE tours SET reviewCount = ?, rating = ? WHERE id = ?', [stats.count, avg, review.tour_id]);
    }
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected: Admin delete review
app.delete('/api/admin/reviews/:id', authenticateToken, async (req, res) => {
  try {
    const review = await db.get('SELECT tour_id FROM reviews WHERE id = ?', [req.params.id]);
    await db.run('DELETE FROM reviews WHERE id = ?', [req.params.id]);
    
    if (review && review.tour_id) {
      const stats = await db.get('SELECT COUNT(*) as count, AVG(rating) as avg FROM reviews WHERE tour_id = ? AND approved = 1', [review.tour_id]);
      const avg = stats.avg ? parseFloat(stats.avg.toFixed(1)) : 5.0;
      await db.run('UPDATE tours SET reviewCount = ?, rating = ? WHERE id = ?', [stats.count, avg, review.tour_id]);
    }
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SUBSCRIBERS ROUTES ---
app.post('/api/subscribe', async (req, res) => {
  try {
    await db.run('INSERT OR IGNORE INTO subscribers (email) VALUES (?)', [req.body.email]);
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/subscribers', authenticateToken, async (req, res) => {
  try {
    const subscribers = await db.all('SELECT * FROM subscribers ORDER BY created_at DESC');
    res.json(subscribers);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// --- MESSAGES ROUTES ---
app.post('/api/messages', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    await db.run('INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)', [name, email, subject, message]);
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/messages', authenticateToken, async (req, res) => {
  try {
    const messages = await db.all('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(messages);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/messages/:id/read', authenticateToken, async (req, res) => {
  try {
    await db.run('UPDATE messages SET is_read = 1 WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// --- BOOKINGS ROUTES ---
// Public: Create a booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { tour_id, first_name, last_name, email, phone, hotel, date, adults, children } = req.body;
    await db.run(
      `INSERT INTO bookings (tour_id, first_name, last_name, email, phone, hotel, date, adults, children) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [tour_id, first_name, last_name, email, phone, hotel, date, adults, children]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected: Get all bookings
app.get('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await db.all('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected: Update booking status
app.put('/api/bookings/:id/status', authenticateToken, async (req, res) => {
  try {
    await db.run('UPDATE bookings SET status = ? WHERE id = ?', [req.body.status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SETTINGS ROUTES ---
// Public: Get settings
app.get('/api/settings', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM settings');
    const settings = rows.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected: Update settings
app.post('/api/settings', authenticateToken, async (req, res) => {
  try {
    for (const [key, value] of Object.entries(req.body)) {
      await db.run('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?', [key, value, value]);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend static files in production
app.use(express.static(path.join(process.cwd(), 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend API running securely on port ${PORT}`);
});
