const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

// --- Phase 3: Custom Logging Middleware ---
// Ye function har request pe chalega
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${req.method}] ${req.path} - ${timestamp}`);
  next(); // agla step (asli route) chalne do
});

// --- Phase 2: In-Memory Database ---
let blogPosts = [];
let nextId = 1;

// GET all posts
app.get('/posts', (req, res) => {
  res.json(blogPosts);
});

// GET a single post by ID
app.get('/posts/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
});

// POST a new post
app.post('/posts', (req, res) => {
  const newPost = {
    id: nextId++,
    ...req.body
  };
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// PUT (update) a post
app.put('/posts/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  Object.assign(post, req.body);
  res.json(post);
});

// DELETE a post
app.delete('/posts/:id', (req, res) => {
  const index = blogPosts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }
  blogPosts.splice(index, 1);
  res.json({ message: 'Post deleted' });
});

// --- Phase 3: Mock Auth Route ---
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Real app mein yaha DB check hota, abhi sirf mock hai
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  // Fake JWT-jaisa dikhne wala token (asli signing nahi ho rahi)
  const mockToken = `mock.jwt.${Buffer.from(username).toString('base64')}.token`;

  res.json({
    message: 'Login successful',
    token: mockToken
  });
});

app.listen(PORT, () => {
  console.log(`Data Hub server listening on port ${PORT}`);
});