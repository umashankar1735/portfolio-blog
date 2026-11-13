import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
  Award,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Layers,
  Cpu,
  BarChart3,
  Quote,
} from 'lucide-react';

const BIBTEX_CITATION = `@inproceedings{lakshmi2026unified,
  title     = {Unified Digital Companion: A Scalable AI Framework for Legal Awareness and Contextual Public Support},
  author    = {Lakshmi, S. Gani and Himaja, S. Purva and Shankar, K. Sai Uma and Reddy, P. Mohan and Reddy, P. Kushal Shiva Charith},
  booktitle = {15th International Conference on Cloud Computing, Data Science and Engineering (Confluence)},
  series    = {Lecture Notes in Electrical Engineering (LNEE)},
  publisher = {Springer Nature},
  year      = {2026},
  address   = {Amaravati, India}
}`;

const APA_CITATION = `Lakshmi, S. G., Himaja, S. P., Shankar, K. S. U., Reddy, P. M., & Reddy, P. K. S. C. (2026). Unified Digital Companion: A Scalable AI Framework for Legal Awareness and Contextual Public Support. In Proceedings of the 15th International Conference on Cloud Computing, Data Science & Engineering (Confluence 2026). Lecture Notes in Electrical Engineering (LNEE), Springer Nature.`;

const IEEE_CITATION = `S. G. Lakshmi, S. P. Himaja, K. S. U. Shankar, P. M. Reddy, and P. K. S. C. Reddy, "Unified Digital Companion: A Scalable AI Framework for Legal Awareness and Contextual Public Support," in Proc. 15th Int. Conf. Cloud Comput., Data Sci. & Eng. (Confluence), ser. Lecture Notes in Electrical Engineering, Springer Nature, 2026.`;

export default function PublicationModal({ isOpen, onClose }) {
  const [citationFormat, setCitationFormat] = useState('bibtex'); // 'bibtex' | 'apa' | 'ieee'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const currentCitationText =
    citationFormat === 'bibtex'
      ? BIBTEX_CITATION
      : citationFormat === 'apa'
      ? APA_CITATION
      : IEEE_CITATION;

  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(currentCitationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#030712]/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b101b] border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-950/40 overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0e1626]/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                      SPRINGER NATURE • LNEE SERIES
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      CAMERA-READY ACCEPTED
                    </span>
                  </div>
                  <h3 className="font-display font-medium text-white text-base sm:text-lg mt-0.5">
                    Research Publication Spotlight
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close publication modal"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Title & Authors */}
              <div className="space-y-3 pb-6 border-b border-white/10">
                <h2 className="text-xl sm:text-2xl font-serif italic text-slate-100 leading-snug">
                  Unified Digital Companion: A Scalable AI Framework for Legal Awareness and Contextual Public Support
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
                  <span className="text-slate-400">Authors:</span>
                  <span>S. Gani Lakshmi,</span>
                  <span>S. Purva Himaja,</span>
                  <span className="text-cyan-300 font-semibold underline decoration-cyan-500/50 underline-offset-4">
                    K. Sai Uma Shankar*
                  </span>
                  <span>P. Mohan Reddy,</span>
                  <span>P. Kushal Shiva Charith Reddy</span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  School of Computing, Amrita Vishwa Vidyapeetham, Amaravati, India • Confluence 2026
                </p>
              </div>

              {/* Benchmark Telemetry Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-mono uppercase tracking-wider">Grounding Acc</span>
                    <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-display font-semibold text-cyan-400">82.3%</div>
                  <div className="text-[10px] text-slate-400 font-mono">+31.1% vs baseline</div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-mono uppercase tracking-wider">Intent Routing</span>
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="text-2xl font-display font-semibold text-blue-400">94.1%</div>
                  <div className="text-[10px] text-slate-400 font-mono">F1-Score: 0.92</div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-mono uppercase tracking-wider">Hallucination</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-display font-semibold text-emerald-400">0.0%</div>
                  <div className="text-[10px] text-slate-400 font-mono">Strict verification</div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-mono uppercase tracking-wider">Avg Latency</span>
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div className="text-2xl font-display font-semibold text-purple-400">&lt;530ms</div>
                  <div className="text-[10px] text-slate-400 font-mono">FAISS + BM25 Hybrid</div>
                </div>
              </div>

              {/* Official Abstract */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-white/[0.03] to-cyan-500/[0.02] border border-white/10 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase">
                  <Quote className="w-3.5 h-3.5" />
                  <span>Official Abstract</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Introducing the Unified Digital Companion (UDC), a multi-agent system utilizing retrieval-augmented natural
                  language processing to provide legal awareness, public assistance, and institutional guidance within a
                  unified intelligent framework. Using fine-tuned InLegalBERT and T5 models for domain-specific reasoning,
                  we develop a hybrid retrieval architecture that combines dense-sparse vector search with a cross-encoder
                  reranker. Experimental evaluation demonstrates that UDC achieves 82.3% grounding accuracy, 62.4% F1, and
                  94.1% intent-route accuracy on the IndicLegalQA corpus, with zero measured hallucination under strict
                  verification guardrails.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['Legal QA', 'Retrieval-Augmented Generation', 'InLegalBERT', 'IndicLegalQA', 'Hybrid FAISS+BM25', 'Cross-Encoder', 'Explainable AI'].map(
                    (kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/5"
                      >
                        {kw}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* 1-Click Citation Copier */}
              <div className="p-5 rounded-xl bg-[#070b14] border border-white/10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono text-slate-200 uppercase tracking-wider font-semibold">
                      Cite this Publication
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Format Tabs */}
                    <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/10 text-[11px] font-mono">
                      {(['bibtex', 'apa', 'ieee']).map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => setCitationFormat(fmt)}
                          className={`px-2.5 py-1 rounded capitalize transition-all ${
                            citationFormat === fmt
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {fmt.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyCitation}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition-colors shadow-sm shadow-cyan-500/20"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied Citation!' : 'Copy Citation'}</span>
                    </button>
                  </div>
                </div>

                <pre className="font-mono text-[11px] text-slate-300 bg-black/60 p-4 rounded-lg border border-white/5 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                  {currentCitationText}
                </pre>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 bg-[#0e1626]/80 text-xs font-mono text-slate-400">
              <span>Presented at Confluence 2026</span>
              <button
                type="button"
                onClick={onClose}
                className="hover:text-cyan-300 transition-colors"
              >
                Close Spotlight ✕
              </button>
            </div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
