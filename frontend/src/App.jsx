import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const API_BASE_URL = 'http://192.168.19.250:30288/api';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error('Failed to fetch blogs', err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const addBlog = async () => {
    if (!form.title || !form.content) return;
    try {
      await axios.post(`${API_BASE_URL}/blogs`, form);
      setForm({ title: '', content: '' });
      fetchBlogs();
    } catch (err) {
      console.error('Failed to add blog', err);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error('Failed to delete blog', err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">📝 My Blog</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Blog Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Blog Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button onClick={addBlog}>Add Blog</button>
      </div>

      <div className="blog-list">
        {blogs.map((b) => (
          <div key={b._id} className="blog-card">
            <h3>{b.title}</h3>
            <p>{b.content}</p>
            <button onClick={() => deleteBlog(b._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
