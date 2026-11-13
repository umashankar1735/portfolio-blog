import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MessageSquare, Send, User } from 'lucide-react';
import { estimateReadTime, formatDate } from '../utils/blogApi';

// Safe lightweight inline markdown/text renderer (avoids raw HTML injection)
function renderFormattedInline(text) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/25 font-mono text-sm text-cyan-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function renderContentBlocks(raw = '') {
  const cleaned = String(raw).replace(/\r\n/g, '\n').trim();
  if (!cleaned) return null;

  return cleaned.split(/\n{2,}/).map((block, idx) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={idx} className="font-display text-2xl font-bold text-cyan-200 mt-8 mb-3">
          {trimmed.slice(3)}
        </h2>
      );
    }
    if (trimmed.startsWith('# ')) {
      return (
        <h2 key={idx} className="font-display text-2xl font-bold text-white mt-8 mb-3">
          {trimmed.slice(2)}
        </h2>
      );
    }
    if (trimmed.startsWith('> ')) {
      return (
        <blockquote
          key={idx}
          className="my-5 pl-4 border-l-2 border-cyan-400 text-slate-300 italic"
        >
          {renderFormattedInline(trimmed.slice(2))}
        </blockquote>
      );
    }
    const lines = trimmed.split('\n');
    if (lines.every((l) => l.trim().startsWith('- '))) {
      return (
        <ul key={idx} className="my-4 list-disc pl-6 space-y-2 text-slate-300">
          {lines.map((line, lIdx) => (
            <li key={lIdx}>{renderFormattedInline(line.trim().slice(2))}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={idx} className="my-4 text-slate-300 leading-relaxed text-base sm:text-lg whitespace-pre-line">
        {renderFormattedInline(trimmed)}
      </p>
    );
  });
}

const BlogView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [authorName, setAuthorName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);

    fetch(`/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        if (active) setPost(data);
      })
      .catch(() => {
        if (active) setNotFound(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmitting(true);
    setCommentError('');

    try {
      const res = await fetch(`/api/blogs/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: authorName.trim() || 'Reader',
          comment: newComment.trim(),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setCommentError(err.error || 'Could not post comment.');
        return;
      }
      const updated = await res.json();
      setPost(updated);
      setNewComment('');
    } catch {
      setCommentError('Network error while posting comment.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="relative pt-28 pb-24 px-5 sm:px-8 min-h-screen">
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-10 text-center text-slate-400 font-mono">
          Loading post...
        </div>
      </section>
    );
  }

  if (notFound || !post) {
    return (
      <section className="relative pt-28 pb-24 px-5 sm:px-8 min-h-screen">
        <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-10 text-center">
          <h1 className="font-display text-2xl font-bold text-white mb-2">Blog Post Not Found</h1>
          <p className="text-slate-400 mb-6">
            This post may have been removed or the URL is incorrect.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-cyan-400 text-slate-950"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Posts
          </Link>
        </div>
      </section>
    );
  }

  const comments = Array.isArray(post.comments) ? post.comments : [];

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

        <article className="glass-panel rounded-3xl overflow-hidden p-6 sm:p-10">
          {post.image_url && (
            <div className="mb-8 rounded-2xl overflow-hidden bg-slate-900 border border-cyan-500/20">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full max-h-[420px] object-cover"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-4">
            <span className="inline-flex items-center gap-1.5 text-cyan-300">
              <User className="w-3.5 h-3.5" />
              {post.author_name}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {formatDate(post.timestamp)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {estimateReadTime(post.content)}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="border-t border-cyan-500/15 pt-6">
            {renderContentBlocks(post.content)}
          </div>
        </article>

        {/* Persistent Comments Section */}
        <div className="mt-10 glass-panel rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-white font-display text-xl font-bold mb-6">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            Comments ({comments.length})
          </div>

          {comments.length === 0 ? (
            <p className="text-sm text-slate-400 mb-6">No comments yet. Be the first to share a thought!</p>
          ) : (
            <ul className="space-y-4 mb-8">
              {comments.map((c, idx) => {
                const isObj = c && typeof c === 'object';
                const text = isObj ? c.comment : String(c);
                const author = isObj && c.author ? c.author : 'Reader';
                const date = isObj && c.timestamp ? formatDate(c.timestamp) : '';

                return (
                  <li
                    key={isObj && c.id ? c.id : idx}
                    className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                      <span className="text-cyan-300 font-semibold">{author}</span>
                      {date && <span>{date}</span>}
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">{text}</p>
                  </li>
                );
              })}
            </ul>
          )}

          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Your Name (optional)"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave a comment..."
              rows={3}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            {commentError && <p className="text-xs text-rose-400">{commentError}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        </div>
      </Motion.div>
    </section>
  );
};

export default BlogView;
