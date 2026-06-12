import sqlite3 from 'sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bcrypt from 'bcrypt';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbDir = join(__dirname, 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = join(dbDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database connected.');
    initDb();
  }
});

function initDb() {
  db.serialize(async () => {
    // Admins table
    db.run(`CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )`);

    // Insert default admin if not exists (admin / 123456)
    db.get("SELECT * FROM admins WHERE username = 'admin'", async (err, row) => {
      if (!row) {
        const hash = await bcrypt.hash('123456', 10);
        db.run("INSERT INTO admins (username, password) VALUES (?, ?)", ['admin', hash]);
        console.log('Default admin created: admin / 123456');
      }
    });

    // Tours table (Storing translations as JSON strings)
    db.run(`CREATE TABLE IF NOT EXISTS tours (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE,
      title TEXT,
      description TEXT,
      category TEXT,
      duration TEXT,
      location TEXT,
      price REAL,
      priceType TEXT,
      rating REAL,
      reviewCount INTEGER,
      popular BOOLEAN,
      highlights TEXT,
      itinerary TEXT,
      included TEXT,
      excluded TEXT,
      advantages TEXT
    )`);

    // Settings table
    db.run(`CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )`);

    // Bookings table
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tour_id TEXT,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      phone TEXT,
      hotel TEXT,
      date TEXT,
      adults INTEGER,
      children INTEGER,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  });
}

// Promisify some DB methods for easier async/await usage
export const run = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function (err) {
    if (err) reject(err);
    else resolve(this);
  });
});

export const get = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, result) => {
    if (err) reject(err);
    else resolve(result);
  });
});

export const all = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) reject(err);
    else resolve(rows);
  });
});

export default db;
