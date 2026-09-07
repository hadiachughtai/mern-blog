import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api.js';

export default function PostForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      api.get(`/posts/${id}`).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
    }
  }, [id, isEditing]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Please fill in both title and content.');
      return;
    }

    try {
      if (isEditing) {
        await api.put(`/posts/${id}`, { title, content });
        navigate(`/posts/${id}`);
      } else {
        const res = await api.post('/posts', { title, content });
        navigate(`/posts/${res.data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-white p-8 rounded-2xl border border-indigo-50 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          {isEditing ? 'Edit Post' : 'Write a New Post'}
        </h1>

        {error && <p className="bg-red-50 text-accent text-sm p-3 rounded-lg mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
          />
          <textarea
            placeholder="Write your post here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary resize-none"
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white py-2 rounded-lg font-medium hover:bg-primarydark transition-colors"
          >
            {isEditing ? 'Save Changes' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
}
