import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, Bold, Code, Eye, Heading2, Italic, List, Lock, Quote, Send } from 'lucide-react';
import {
  authHeaders,
  fetchAuthStatus,
  getAdminToken,
  setAdminToken,
  verifyAdminPassword,
} from '../utils/blogApi';

const BlogEditor = () => {
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [authRequired, setAuthRequired] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(Boolean(getAdminToken()));
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    fetchAuthStatus().then((data) => setAuthRequired(Boolean(data.authRequired)));
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview('');
      return undefined;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const insertFormatting = (prefix, suffix = '') => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    const selected = content.slice(start, end) || 'text';
    const next = content.slice(0, start) + prefix + selected + suffix + content.slice(end);
    setContent(next);
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    setError('');
    const ok = await verifyAdminPassword(passwordInput);
    if (!ok) {
      setError('Invalid admin password.');
      return;
    }
    setAdminToken(passwordInput);
    setAdminUnlocked(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('author_name', authorName.trim());
      formData.append('content', content.trim());
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: authHeaders(),
        body: formData,
      });

      if (res.status === 401) {
        setAdminUnlocked(false);
        setError('Admin password required to publish.');
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not publish post.');
        return;
      }

      navigate(`/blogs/${data.id}`);
    } catch {
      setError('Network error while publishing post.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative pt-28 pb-24 px-5 sm:px-8 min-h-screen">
      <Motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-4xl mx-auto"
      >
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm font-mono text-cyan-300 hover:text-cyan-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Posts
        </Link>

        <div className="glass-panel rounded-3xl p-6 sm:p-10">
          <h1 className="font-display text-3xl font-bold text-white mb-2">Write a New Blog Post</h1>
          <p className="text-sm text-slate-400 mb-6">
            Publishes directly to your live blog API with optional cover image upload.
          </p>

          {authRequired && !adminUnlocked ? (
            <form onSubmit={handleUnlock} className="space-y-4 max-w-sm">
              <div className="flex items-center gap-2 text-cyan-300 text-sm font-mono">
                <Lock className="w-4 h-4" />
                Admin unlock required to publish
              </div>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
              {error && <p className="text-xs text-rose-400">{error}</p>}
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-cyan-400 text-slate-950"
              >
                Unlock Editor
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Post Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <input
                  type="text"
                  placeholder="Author Name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Formatting Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="flex flex-wrap items-center gap-1">
                  <button
                    type="button"
                    onClick={() => insertFormatting('## ')}
                    className="p-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10"
                    title="Heading"
                  >
                    <Heading2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('**', '**')}
                    className="p-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('*', '*')}
                    className="p-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('`', '`')}
                    className="p-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10"
                    title="Inline code"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('- ')}
                    className="p-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10"
                    title="Bullet list"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('> ')}
                    className="p-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10"
                    title="Quote"
                  >
                    <Quote className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewMode((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition ${
                    previewMode
                      ? 'bg-cyan-500/15 text-cyan-200 border-cyan-400/40'
                      : 'text-slate-300 border-slate-700 hover:border-cyan-400/35'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  {previewMode ? 'Edit' : 'Preview'}
                </button>
              </div>

              {previewMode ? (
                <div className="min-h-[240px] p-5 rounded-2xl bg-slate-950/75 border border-slate-800 text-slate-200 whitespace-pre-line">
                  {content || 'Nothing to preview yet.'}
                </div>
              ) : (
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  required
                  placeholder="Write your article here..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
              )}

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Cover Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-slate-300 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-cyan-500/15 file:text-cyan-300"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    className="mt-3 max-h-52 rounded-xl border border-cyan-500/25 object-cover"
                  />
                )}
              </div>

              {error && (
                <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-cyber-sm hover:shadow-cyber-md transition disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Publishing...' : 'Publish Post'}
              </button>
            </form>
          )}
        </div>
      </Motion.div>
    </section>
  );
};

export default BlogEditor;
