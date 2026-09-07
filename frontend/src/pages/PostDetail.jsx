import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError('Post not found.');
      }
    }
    fetchPost();
  }, [id]);

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete post.');
    }
  }

  if (error) return <p className="text-center text-accent mt-16">{error}</p>;
  if (!post) return <p className="text-center text-slate-400 mt-16">Loading...</p>;

  const isAuthor = user && post.author === user.id;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link to="/" className="text-sm text-primary mb-4 inline-block">← Back to all posts</Link>

      <div className="bg-white p-8 rounded-2xl border border-indigo-50 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">{post.title}</h1>
        <p className="text-xs text-slate-400 mb-6">
          By {post.authorName} · {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{post.content}</p>

        {isAuthor && (
          <div className="flex gap-3 mt-8">
            <Link
              to={`/edit/${post._id}`}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primarydark transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
