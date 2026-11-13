import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Printer,
  Sparkles,
  Eye,
  CheckCircle2,
} from 'lucide-react';

const RESUME_PLAINTEXT = `KESIREDDI SAI UMA SHANKAR
Email: ksaiumashankar@gmail.com | Phone: +91-9493942499
GitHub: github.com/umashankar1735 | LinkedIn: linkedin.com/in/sai-uma-shankar-kesireddi
HackerRank: @ksaiumashankar | Location: Amaravati / Visakhapatnam, India

OBJECTIVE
AI-focused Computer Science undergraduate with strong hands-on experience in .NET full-stack development
(ASP.NET Core, SQL Server, REST APIs) using React.js and published research in Deep Learning / RAG. Expertise
in Python, C#, DSA, OOPs, and Cloud Computing, with practical industry experience in Agile team environments
and enterprise-grade backend systems.

EDUCATION
Amrita Vishwa Vidyapeetham | Amaravati, India
B.Tech in Computer Science and Engineering | GPA: 8.42 / 10 | Oct 2022 - Aug 2026

Sri Chaitanya Jr College | Visakhapatnam, India
AISSCE | Marks: 386 / 500 | Jun 2020 - Jun 2022

Dr KKR's Gowtham School | Visakhapatnam, India
AISSE | Marks: 459 / 500 | Jun 2019 - Apr 2020

INTERNSHIP EXPERIENCE
Cognizant - Software Development Intern (Onsite)
ASP .NET Full Stack with React | Feb 2026 - Jun 2026
• Developed a full-stack Inventory Replenishment System using React.js and ASP.NET Core Web API.
• Designed responsive React components, integrated RESTful APIs, and implemented Entity Framework Core with SQL Server for data persistence.
• Built scalable backend services for inventory, orders, suppliers, and stock management under Agile sprint cycles.
• Technologies: React.js, ASP.NET Core, C#, Entity Framework Core, REST APIs, SQL Server, Git, Agile.

PUBLICATIONS & KEY RESEARCH
Unified Digital Companion: A Scalable AI Framework for Legal Awareness and Contextual Public Support
Author & Developer | Nov 2025 - Mar 2026
• Publication: Accepted at Confluence 2026 (Springer Lecture Notes in Electrical Engineering - LNEE).
• An intelligent multi-agent system enabling reliable access to legal and institutional procedures with verified grounding.
• Achieved 82.3% grounding accuracy, 94.1% intent routing accuracy, and 0.0% hallucination rate on IndicLegalQA.
• Technologies: Python, InLegalBERT, T5 (RAG), Hybrid Retrieval (BM25 + FAISS), Cross-Encoder Reranker, Ensemble Learning, SQLite.

FLAGSHIP PROJECTS
1. ELYRO - Automated Expense Telemetry & Financial Engine
   • Production-grade automated bank & UPI transaction ingestion via real-time IMAP email streaming (imapflow + mailparser).
   • Persistent storage on libSQL/SQLite with Express 5 REST API and React 19 + Tailwind v4 UI.

2. Spatio-Temporal Video Summarization System (DL Capstone)
   • 29M+ parameter cross-modal fusion model: ResNet-50 spatial CNN + Bidirectional LSTM temporal modeling + Multi-Head Attention.
   • Asynchronous video chunk processing with Flask API and React analytics UI.

3. AI Guardian - Women Safety & Crisis Response Platform
   • Real-time crisis response with red-zone telemetry, SOS sensor fusion, and automated emergency escalation.
   • Technologies: React Native, Expo, FastAPI, Scikit-learn, Socket.IO, Google Maps API.

4. InStoreOptima - Enterprise Retail & Supply Chain ERP
   • 4-layer .NET 8 Clean Architecture with CQRS, MediatR, MSSQL, Redis caching, and Angular 17.

TECHNICAL SKILLS
• Languages: Python, C#, C, SQL (T-SQL, PostgreSQL, SQLite), JavaScript (ES6+), TypeScript
• Full-Stack & Backend: ASP.NET Core Web API, Entity Framework Core, Node.js, Express.js, React.js, React Native, Angular
• AI & Data: PyTorch, TensorFlow, HuggingFace, InLegalBERT, FAISS, BM25, OpenCV, Scikit-Learn, Pandas, NumPy
• Databases & Cloud: Microsoft SQL Server, PostgreSQL, Redis, libSQL, MongoDB, AWS (Certified Cloud Practitioner), Docker, Git

HONORS & LEADERSHIP
• President, Student Council (2023 - 2026) - Led inaugural student government initiatives at Amrita Amaravati.
• Founder & President, Raksha Support & Mentorship Club (2023 - 2026) - Coordinated peer mentoring and student welfare.
• Certifications: AWS Certified Cloud Practitioner, HackerRank SQL Advanced, IIRS ISRO Remote Sensing, NPTEL Python.`;

export default function ResumeModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('pdf'); // 'pdf' | 'text'
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

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(RESUME_PLAINTEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    window.open('/assets/Resume.pdf', '_blank')?.print();
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
            className="relative w-full max-w-5xl h-[92vh] flex flex-col bg-[#0b101b] border border-white/10 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-10"
          >
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-white/10 bg-[#0e1626]/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-medium text-white text-sm sm:text-base tracking-wide">
                      Kesireddi Sai Uma Shankar
                    </h3>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      <CheckCircle2 className="w-2.5 h-2.5" /> ATS-OPTIMIZED
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    Software Development • AI & Systems Engineering • 2026
                  </p>
                </div>
              </div>

              {/* View Switcher Pills */}
              <div className="flex items-center bg-[#070b14] p-1 rounded-xl border border-white/5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('pdf')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'pdf'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Interactive PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('text')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'text'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Plaintext ATS</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {activeTab === 'text' ? (
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Plaintext'}</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handlePrint}
                      title="Print Resume"
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                    <a
                      href="/assets/Resume.pdf"
                      download="Uma_Shankar_Resume.pdf"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  </>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-hidden relative bg-[#070b14]">
              {activeTab === 'pdf' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 bg-[#050811]">
                  <object
                    data="/assets/Resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                    type="application/pdf"
                    className="w-full h-full rounded-lg border border-white/10 shadow-2xl"
                  >
                    <div className="flex flex-col items-center justify-center text-center p-8 gap-4">
                      <p className="text-slate-300 font-sans">
                        PDF preview is not supported directly in this browser viewport.
                      </p>
                      <a
                        href="/assets/Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-semibold font-mono text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open PDF in New Window
                      </a>
                    </div>
                  </object>
                </div>
              ) : (
                <div className="w-full h-full overflow-y-auto p-4 sm:p-8 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-slate-400 text-xs">
                      Formatted for applicant tracking systems (Workday, Greenhouse, Lever, Taleo)
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyText}
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy All'}</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-xs sm:text-xs text-slate-200 select-all p-4 bg-black/40 rounded-xl border border-white/5">
                    {RESUME_PLAINTEXT}
                  </pre>
                </div>
              )}
            </div>

            {/* Bottom Quick-Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-white/10 bg-[#0e1626]/90 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span>📍 Amaravati / Visakhapatnam</span>
                <span className="hidden sm:inline">✉️ ksaiumashankar@gmail.com</span>
                <span className="hidden md:inline">📞 +91-9493942499</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/umashankar1735"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  GitHub ↗
                </a>
                <span className="text-white/20">•</span>
                <a
                  href="https://linkedin.com/in/sai-uma-shankar-kesireddi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
