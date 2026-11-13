import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Clock,
  Edit3,
  Lock,
  MessageSquare,
  Plus,
  Trash2,
  Unlock,
  X,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import {
  authHeaders,
  estimateReadTime,
  fetchAuthStatus,
  formatDate,
  getAdminToken,
  setAdminToken,
  stripMarkup,
  verifyAdminPassword,
} from '../utils/blogApi';

const BlogList = ({ standalone = false }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [form, setForm] = useState({ title: '', author_name: '', content: '', image: null });
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const [authRequired, setAuthRequired] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(Boolean(getAdminToken()));
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const loadBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
    fetchAuthStatus().then((data) => setAuthRequired(Boolean(data.authRequired)));
  }, []);

  const ensureAdminReady = (onReady) => {
    if (!authRequired || adminUnlocked) {
      onReady();
      return;
    }
    setAuthError('');
    setPasswordInput('');
    setUnlockModalOpen(true);
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    setAuthError('');
    const valid = await verifyAdminPassword(passwordInput);
    if (!valid) {
      setAuthError('Invalid admin password.');
      return;
    }
    setAdminToken(passwordInput);
    setAdminUnlocked(true);
    setUnlockModalOpen(false);
  };

  const handleLock = () => {
    setAdminToken('');
    setAdminUnlocked(false);
  };

  const handleNewPost = () => {
    ensureAdminReady(() => {
      setEditPost(null);
      setForm({ title: '', author_name: '', content: '', image: null });
      setFormError('');
      setModalOpen(true);
    });
  };

  const handleEdit = (post) => {
    ensureAdminReady(() => {
      setEditPost(post);
      setForm({
        title: post.title || '',
        author_name: post.author_name || '',
        content: post.content || '',
        image: null,
      });
      setFormError('');
      setModalOpen(true);
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author_name.trim() || !form.content.trim()) return;
    setSaving(true);
    setFormError('');

    try {
      const formData = new FormData();
      formData.append('title', form.title.trim());
      formData.append('author_name', form.author_name.trim());
      formData.append('content', form.content.trim());
      if (form.image) {
        formData.append('image', form.image);
      }

      const url = editPost ? `/api/blogs/${editPost.id}` : '/api/blogs';
      const method = editPost ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: formData,
      });

      if (res.status === 401) {
        setModalOpen(false);
        setAdminUnlocked(false);
        setUnlockModalOpen(true);
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setFormError(err.error || 'Could not save blog post.');
        return;
      }

      await loadBlogs();
      setModalOpen(false);
    } catch {
      setFormError('Network error while saving post.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    ensureAdminReady(async () => {
      if (!window.confirm('Delete this post permanently?')) return;
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (res.status === 401) {
        setAdminUnlocked(false);
        setUnlockModalOpen(true);
        return;
      }
      await loadBlogs();
    });
  };

  return (
    <section
      id="blog"
      className={`relative px-5 sm:px-8 ${standalone ? 'pt-28 pb-24 min-h-screen' : 'py-24'}`}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="04 // Technical Blog"
          title="Notes, Builds & Writeups"
          subtitle="Project logs, engineering breakdowns, and live interactive posts."
        />

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <p className="text-sm font-mono text-slate-400">
            {loading ? 'Loading posts...' : `${blogs.length} ${blogs.length === 1 ? 'post' : 'posts'} published`}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {authRequired && (
              <button
                type="button"
                onClick={adminUnlocked ? handleLock : () => setUnlockModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono border border-slate-700 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300 transition"
              >
                {adminUnlocked ? (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                    Admin Unlocked
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    Admin Login
                  </>
                )}
              </button>
            )}

            <Link
              to="/blog-editor"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-cyan-200 bg-slate-900/70 border border-cyan-400/30 hover:border-cyan-300 hover:bg-cyan-500/10 transition"
            >
              <Edit3 className="w-4 h-4" />
              Full Editor
            </Link>

            <button
              type="button"
              onClick={handleNewPost}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-cyber-sm hover:shadow-cyber-md transition"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        {!loading && blogs.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center">
            <p className="text-slate-300 text-lg">No blog posts yet.</p>
            <button
              type="button"
              onClick={handleNewPost}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-cyan-400 text-slate-950"
            >
              <Plus className="w-4 h-4" />
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence>
              {blogs.map((post, idx) => {
                const excerpt = stripMarkup(post.content);
                const commentCount = Array.isArray(post.comments) ? post.comments.length : 0;

                return (
                  <Motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="group glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {post.image_url && (
                        <Link to={`/blogs/${post.id}`} className="block h-44 overflow-hidden bg-slate-900">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                      )}

                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-3">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                            {formatDate(post.timestamp)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            {estimateReadTime(post.content)}
                          </span>
                        </div>

                        <Link
                          to={`/blogs/${post.id}`}
                          className="block font-display text-xl font-bold text-white group-hover:text-cyan-300 transition"
                        >
                          {post.title}
                        </Link>

                        <p className="mt-2.5 text-sm text-slate-300 leading-relaxed line-clamp-3">
                          {excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-4 border-t border-cyan-500/15 flex items-center justify-between gap-2">
                      <div className="text-xs text-slate-400 truncate">
                        By <span className="text-slate-200 font-medium">{post.author_name}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                          <MessageSquare className="w-3 h-3" />
                          {commentCount}
                        </span>

                        {(!authRequired || adminUnlocked) && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleEdit(post)}
                              aria-label="Edit post"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(post.id)}
                              aria-label="Delete post"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        <Link
                          to={`/blogs/${post.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200 ml-1"
                        >
                          Read
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </Motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Create / Edit Post Modal */}
      <AnimatePresence>
        {modalOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <Motion.form
              onSubmit={handleSave}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-4 border border-cyan-400/35 shadow-cyber-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-white">
                  {editPost ? 'Edit Blog Post' : 'New Blog Post'}
                </h3>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close modal"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Post Title"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                required
              />

              <input
                type="text"
                placeholder="Author Name"
                value={form.author_name}
                onChange={(e) => setForm((prev) => ({ ...prev, author_name: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                required
              />

              <textarea
                placeholder="Write your article or project notes (supports ## headings, **bold**, and `code`)..."
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                required
              />

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Cover Image (Optional, max 5MB)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, image: e.target.files?.[0] || null }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-slate-300 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-cyan-500/15 file:text-cyan-300"
                />
              </div>

              {formError && (
                <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2">
                  {formError}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm text-slate-300 border border-slate-700 hover:border-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save Post'}
                </button>
              </div>
            </Motion.form>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Admin Unlock Modal */}
      <AnimatePresence>
        {unlockModalOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <Motion.form
              onSubmit={handleUnlock}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="glass-panel rounded-3xl p-6 w-full max-w-sm space-y-4 border border-cyan-400/35"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-white">Admin Unlock</h3>
                <button
                  type="button"
                  onClick={() => setUnlockModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-400">
                Enter your admin password to create, edit, or delete blog posts.
              </p>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Admin password"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
              {authError && <p className="text-xs text-rose-400">{authError}</p>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUnlockModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm text-slate-300 border border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-cyan-400 text-slate-950"
                >
                  Unlock
                </button>
              </div>
            </Motion.form>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogList;
