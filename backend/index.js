const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/blogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Blog = mongoose.model('Blog', BlogSchema);

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.status(201).json(blog);
});

app.delete('/api/blogs/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
