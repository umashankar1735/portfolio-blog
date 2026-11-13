const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Persistent data root (set DATA_DIR to a mounted volume in production)
const DATA_DIR = process.env.DATA_DIR || __dirname;
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const BLOGS_PATH = path.join(DATA_DIR, 'blogs.json');
const MESSAGES_PATH = path.join(DATA_DIR, 'messages.json');
const SEED_BLOGS_PATH = path.join(__dirname, 'blogs.json');

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

if (!fs.existsSync(BLOGS_PATH)) {
  if (BLOGS_PATH !== SEED_BLOGS_PATH && fs.existsSync(SEED_BLOGS_PATH)) {
    fs.copyFileSync(SEED_BLOGS_PATH, BLOGS_PATH);
  } else {
    fs.writeFileSync(BLOGS_PATH, '[]');
  }
}

app.use('/uploads', express.static(UPLOADS_DIR));

const ALLOWED_IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const base = path
      .basename(file.originalname || 'image', ext)
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .slice(0, 48);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${base}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    if (file.mimetype?.startsWith('image/') && ALLOWED_IMAGE_EXTS.has(ext)) {
      return cb(null, true);
    }
    return cb(new Error('Only PNG, JPG, JPEG, WEBP, and GIF images are allowed.'));
  },
});

function readJsonArray(filePath) {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeJsonArray(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function normalizeComment(raw) {
  if (typeof raw === 'string') {
    const text = raw.trim();
    return text ? { id: Date.now(), author: 'Reader', comment: text, timestamp: Date.now() } : null;
  }
  if (raw && typeof raw === 'object') {
    const text = String(raw.comment || '').trim();
    if (!text) return null;
    const author = String(raw.author || 'Reader').trim().slice(0, 60) || 'Reader';
    return {
      id: raw.id || Date.now(),
      author,
      comment: text.slice(0, 1000),
      timestamp: raw.timestamp || Date.now(),
    };
  }
  return null;
}

function requireAdmin(req, res, next) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return next();
  const provided = req.headers['x-admin-token'];
  if (provided === adminPassword) return next();
  return res.status(401).json({ error: 'Admin password required.' });
}

// Auth status for blog editor controls
app.get('/api/auth/status', (req, res) => {
  res.json({ authRequired: Boolean(process.env.ADMIN_PASSWORD) });
});

app.post('/api/auth/verify', (req, res) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return res.json({ valid: true });
  const provided = String(req.body?.password || '');
  if (provided && provided === adminPassword) {
    return res.json({ valid: true });
  }
  return res.status(401).json({ valid: false, error: 'Invalid admin password.' });
});

// Get all blogs
app.get('/api/blogs', (req, res) => {
  const blogs = readJsonArray(BLOGS_PATH).map((b) => ({
    ...b,
    comments: Array.isArray(b.comments) ? b.comments : [],
  }));
  res.json(blogs);
});

// Get single blog
app.get('/api/blogs/:id', (req, res) => {
  const blogs = readJsonArray(BLOGS_PATH);
  const blog = blogs.find((b) => b.id === parseInt(req.params.id, 10));
  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  return res.json({
    ...blog,
    comments: Array.isArray(blog.comments) ? blog.comments : [],
  });
});

// Add new blog with optional image upload
app.post('/api/blogs', requireAdmin, upload.single('image'), (req, res) => {
  const title = String(req.body?.title || '').trim();
  const authorName = String(req.body?.author_name || '').trim();
  const content = String(req.body?.content || '').trim();
  if (!title || !authorName || !content) {
    return res.status(400).json({ error: 'Title, author name, and content are required.' });
  }

  const blogs = readJsonArray(BLOGS_PATH);
  const image_url = req.file ? `/uploads/${req.file.filename}` : '';
  const newBlog = {
    id: blogs.length ? Math.max(...blogs.map((b) => Number(b.id) || 0)) + 1 : 1,
    title,
    author_name: authorName,
    timestamp: Date.now(),
    content,
    image_url,
    comments: [],
  };
  blogs.unshift(newBlog);
  writeJsonArray(BLOGS_PATH, blogs);
  return res.status(201).json(newBlog);
});

// Edit blog with optional image upload
app.put('/api/blogs/:id', requireAdmin, upload.single('image'), (req, res) => {
  const blogs = readJsonArray(BLOGS_PATH);
  const blog = blogs.find((b) => b.id === parseInt(req.params.id, 10));
  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  if (req.body?.title && String(req.body.title).trim()) {
    blog.title = String(req.body.title).trim();
  }
  if (req.body?.author_name && String(req.body.author_name).trim()) {
    blog.author_name = String(req.body.author_name).trim();
  }
  if (req.body?.content && String(req.body.content).trim()) {
    blog.content = String(req.body.content).trim();
  }

  if (req.file) {
    blog.image_url = `/uploads/${req.file.filename}`;
  } else if (typeof req.body?.image_url === 'string' && req.body.image_url) {
    blog.image_url = req.body.image_url;
  }

  writeJsonArray(BLOGS_PATH, blogs);
  return res.json(blog);
});

// Delete blog
app.delete('/api/blogs/:id', requireAdmin, (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  const blogs = readJsonArray(BLOGS_PATH);
  const next = blogs.filter((b) => b.id !== targetId);
  if (next.length === blogs.length) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  writeJsonArray(BLOGS_PATH, next);
  return res.json({ result: 'Deleted' });
});

// Add comment to a blog post
app.post('/api/blogs/:id/comments', (req, res) => {
  const blogs = readJsonArray(BLOGS_PATH);
  const blog = blogs.find((b) => b.id === parseInt(req.params.id, 10));
  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  const normalized = normalizeComment(
    req.body?.author ? { author: req.body.author, comment: req.body.comment } : req.body?.comment
  );
  if (!normalized) {
    return res.status(400).json({ error: 'Comment text is required.' });
  }

  if (!Array.isArray(blog.comments)) blog.comments = [];
  blog.comments.push(normalized);
  writeJsonArray(BLOGS_PATH, blogs);
  return res.status(201).json(blog);
});

// Save contact message
app.post('/api/contact', (req, res) => {
  const name = String(req.body?.name || '').trim();
  const email = String(req.body?.email || '').trim();
  const subject = String(req.body?.subject || '').trim();
  const message = String(req.body?.message || '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const messages = readJsonArray(MESSAGES_PATH);
  const entry = {
    id: Date.now(),
    name: name.slice(0, 120),
    email: email.slice(0, 160),
    subject: subject.slice(0, 200) || 'Portfolio Inquiry',
    message: message.slice(0, 4000),
    timestamp: Date.now(),
  };
  messages.unshift(entry);
  writeJsonArray(MESSAGES_PATH, messages);
  return res.status(201).json({ ok: true, id: entry.id });
});

app.get('/api/contact', requireAdmin, (req, res) => {
  res.json(readJsonArray(MESSAGES_PATH));
});

// Return JSON 404 for unknown API paths before SPA fallback
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Multer & server error handler
app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ error: err.message || 'Request failed' });
  }
  return next();
});

// Serve client static build if it exists (single-origin API + SPA)
const CLIENT_DIST = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.get('*', (req, res) => {
    res.sendFile(path.join(CLIENT_DIST, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
