import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Check, Copy, Mail, MapPin, Phone, Send } from 'lucide-react';
import { FaLinkedin, FaGithub, FaHackerrank } from 'react-icons/fa';
import SectionHeader from './SectionHeader';
import { portfolioData } from '../data/portfolioData';

const INQUIRY_OPTIONS = [
  'Full-Time SWE Role',
  'AI / ML Opportunity',
  'Freelance Project',
  'Research Collaboration',
];

const Contact = () => {
  const { profile } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(INQUIRY_OPTIONS[0]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: INQUIRY_OPTIONS[0],
    message: '',
  });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSelectInquiry = (option) => {
    setSelectedInquiry(option);
    setForm((prev) => ({
      ...prev,
      subject:
        !prev.subject || INQUIRY_OPTIONS.includes(prev.subject) ? option : prev.subject,
    }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable in insecure contexts
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', text: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: 'error', text: data.error || 'Could not send message.' });
      } else {
        setStatus({
          type: 'success',
          text: 'Message received! Thanks for reaching out — I will get back to you soon.',
        });
        setForm({ name: '', email: '', subject: selectedInquiry, message: '' });
      }
    } catch {
      setStatus({ type: 'error', text: 'Network error while sending message.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="05 // Contact"
          title="Let's Connect"
          subtitle="Open to software engineering, AI/ML engineering, and full-stack opportunities."
        />

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="glass-panel glass-panel-hover rounded-2xl p-5 flex items-center justify-between gap-3">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-4 min-w-0">
                <span className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-300 shrink-0">
                  <Mail className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-slate-400 uppercase">Email</p>
                  <p className="text-sm sm:text-base font-semibold text-white truncate">
                    {profile.email}
                  </p>
                </div>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="px-3 py-2 rounded-lg text-xs font-mono bg-slate-900 border border-cyan-400/25 text-cyan-300 hover:bg-cyan-500/15 transition shrink-0 inline-flex items-center gap-1.5"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <a
              href={profile.phoneHref}
              className="glass-panel glass-panel-hover rounded-2xl p-5 flex items-center gap-4 block"
            >
              <span className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-300 shrink-0">
                <Phone className="w-5 h-5" />
              </span>
              <div>
                <p className="text-xs font-mono text-slate-400 uppercase">Phone</p>
                <p className="text-sm sm:text-base font-semibold text-white">{profile.phone}</p>
              </div>
            </a>

            <div className="glass-panel rounded-2xl p-5 flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-300 shrink-0">
                <MapPin className="w-5 h-5" />
              </span>
              <div>
                <p className="text-xs font-mono text-slate-400 uppercase">Location</p>
                <p className="text-sm sm:text-base font-semibold text-white">{profile.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel glass-panel-hover rounded-2xl p-4 flex items-center gap-3 text-slate-200 hover:text-cyan-300"
              >
                <FaLinkedin className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-sm font-semibold">LinkedIn</span>
              </a>
              <a
                href={profile.hackerrank}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel glass-panel-hover rounded-2xl p-4 flex items-center gap-3 text-slate-200 hover:text-cyan-300"
              >
                <FaHackerrank className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-sm font-semibold">HackerRank</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel glass-panel-hover rounded-2xl p-4 flex items-center gap-3 text-slate-200 hover:text-cyan-300"
              >
                <FaGithub className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold truncate">GitHub (Main)</span>
              </a>
              <a
                href={profile.githubSecondary}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel glass-panel-hover rounded-2xl p-4 flex items-center gap-3 text-slate-200 hover:text-cyan-300"
              >
                <FaGithub className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold truncate">GitHub (.NET)</span>
              </a>
            </div>
          </Motion.div>

          <Motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 space-y-4"
          >
            {/* Simple "How Can I Help?" Pills */}
            <div>
              <p className="text-xs font-mono text-slate-400 uppercase mb-2">
                How can I help?
              </p>
              <div className="flex flex-wrap gap-2">
                {INQUIRY_OPTIONS.map((option) => {
                  const active = selectedInquiry === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      data-cursor="SELECT"
                      onClick={() => handleSelectInquiry(option)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono border transition ${
                        active
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 border-cyan-300 font-semibold shadow-cyber-sm'
                          : 'bg-slate-950/75 text-slate-300 border-slate-700/80 hover:border-cyan-400/45 hover:text-cyan-200'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                Subject
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                placeholder="Opportunity / Collaboration / Question"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            {status.text && (
              <div
                className={`px-4 py-3 rounded-xl text-sm border ${
                  status.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-400/35 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-400/35 text-rose-300'
                }`}
              >
                {status.text}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-cyber-sm hover:shadow-cyber-md hover:scale-[1.01] transition inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </Motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
