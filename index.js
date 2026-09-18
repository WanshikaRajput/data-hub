const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());



app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${req.method}] ${req.path} - ${timestamp}`);
  next(); 
});


let blogPosts = [];
let nextId = 1;


app.get('/posts', (req, res) => {
  res.json(blogPosts);
});


app.get('/posts/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
});


app.post('/posts', (req, res) => {
  const newPost = {
    id: nextId++,
    ...req.body
  };
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});


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


app.post('/login', (req, res) => {
  const { username, password } = req.body;

 
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  
  const mockToken = `mock.jwt.${Buffer.from(username).toString('base64')}.token`;

  res.json({
    message: 'Login successful',
    token: mockToken
  });
});

app.listen(PORT, () => {
  console.log(`Data Hub server listening on port ${PORT}`);
});
