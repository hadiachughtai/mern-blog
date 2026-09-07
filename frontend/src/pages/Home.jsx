import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
      } catch (err) {
        setError('Could not load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center text-slate-400 mt-16">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-accent mt-16">{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Latest Posts</h1>

      {posts.length === 0 ? (
        <p className="text-slate-400 text-center mt-10">No posts yet. Be the first to write one!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link
              to={`/posts/${post._id}`}
              key={post._id}
              className="block bg-white p-5 rounded-xl border border-indigo-50 shadow-sm hover:shadow-md hover:border-primary transition-all"
            >
              <h2 className="text-lg font-semibold text-slate-800">{post.title}</h2>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">{post.content}</p>
              <p className="text-xs text-slate-400 mt-2">
                By {post.authorName} · {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
