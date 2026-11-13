import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Binary,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Cpu,
  ExternalLink,
  Github,
  HeartPulse,
  Image as ImageIcon,
  Layers,
  Leaf,
  ScanFace,
  ShieldAlert,
  Sparkles,
  Sprout,
  Workflow,
  X,
} from 'lucide-react';
import SectionHeader from './SectionHeader';
import { portfolioData } from '../data/portfolioData';

const FILTERS = ['All', 'AI & Research', 'Full-Stack & .NET', 'Systems & ML'];

const ARCHITECTURE_FLOWS = {
  'unified-digital-companion': [
    { label: 'Query & Statute', sub: 'IndicLegalQA', badge: 'Client' },
    { label: 'Intent Router', sub: 'BERT + CNN', badge: '94.1% Routing' },
    { label: 'Hybrid Retr.', sub: 'BM25 + InLegalBERT', badge: 'FAISS Index' },
    { label: 'Cross-Encoder', sub: 'ms-marco-MiniLM', badge: 'Top-3 Scored' },
    { label: 'Grounded Output', sub: 'T5 Gate', badge: '82.3% Grounding' },
  ],
  'elyro': [
    { label: 'Bank / UPI Alert', sub: 'HDFC, ICICI, SBI MIME', badge: 'Event Ingest' },
    { label: 'IMAP IDLE Socket', sub: 'imapflow connection', badge: '<40ms Latency' },
    { label: 'Regex AST Parser', sub: 'Amount & Merchant Ext.', badge: 'Zero Loss' },
    { label: 'libSQL Persistence', sub: 'Embedded SQLite', badge: 'ACID Atomic' },
    { label: 'React 19 Telemetry', sub: 'Optimistic State', badge: 'Live UI' },
  ],
  'spatio-temporal-video-summarizer': [
    { label: 'Raw Video Feed', sub: 'MP4, AVI, MOV, MKV', badge: '1080p Stream' },
    { label: 'Spatial Backbone', sub: 'ResNet-50 (24M Param)', badge: '2048D Embed' },
    { label: 'Temporal Sequence', sub: 'BiLSTM (4M Param)', badge: 'Bidirectional' },
    { label: 'Attention Fusion', sub: 'Frame Importance', badge: 'Multi-Head' },
    { label: 'Knapsack Reel', sub: 'Redundancy Filter', badge: '15-20% Budget' },
  ],
  'instore-optima': [
    { label: 'Angular 17 UI', sub: 'Reactive Client', badge: 'Presentation' },
    { label: 'ASP.NET Core API', sub: 'Controllers & Filters', badge: 'Api Layer' },
    { label: 'Application CQRS', sub: 'MediatR Handlers', badge: 'Business Logic' },
    { label: 'Domain Entities', sub: 'Inventory & Billing', badge: 'Core Domain' },
    { label: 'EF Core + MSSQL', sub: 'SQL Server Persistence', badge: 'Infrastructure' },
  ],
  'ai-guardian': [
    { label: 'React Native App', sub: 'TypeScript Client', badge: 'Mobile App' },
    { label: 'Sensor Accelerometer', sub: 'Motion Anomaly', badge: 'Raw Telemetry' },
    { label: 'FastAPI ML Gate', sub: 'Scikit-Learn Filter', badge: 'False Alarm Red.' },
    { label: 'Socket.IO Hub', sub: 'Live Location Rooms', badge: 'Real-Time' },
    { label: 'SOS Alert Dispatch', sub: 'Google Maps API', badge: 'Emergency Out' },
  ],
  'deepfake-detect': [
    { label: 'Video Upload', sub: 'DFDC Benchmark Clip', badge: 'Input Video' },
    { label: 'OpenCV Sampler', sub: 'Face Cropping', badge: 'Frame Extraction' },
    { label: 'ResNet-18 Backbone', sub: 'PyTorch Weights', badge: 'Spatial Mesh' },
    { label: 'Frame Score Fusion', sub: 'Logit Aggregation', badge: 'FastAPI /predict/' },
    { label: 'Authenticity Report', sub: 'Real vs Synthetic', badge: 'Verdict' },
  ],
  'green-harvest': [
    { label: 'Farmer Input', sub: 'Crop & Soil Details', badge: 'User Prompt' },
    { label: 'Weather Telemetry', sub: 'Localized Climate API', badge: 'Live Metrics' },
    { label: 'LangChain Multi-Agent', sub: 'Agro + Soil Agents', badge: 'Orchestrator' },
    { label: 'Hybrid LLM Engine', sub: 'OpenAI / Grok / Ollama', badge: 'Inference' },
    { label: 'Prescription Plan', sub: 'Irrigation & Fertilizer', badge: 'Streamlit UI' },
  ],
};

const ProjectCustomArtwork = ({ visualType, compact }) => {
  switch (visualType) {
    case 'rag-pipeline':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 px-4">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-200">
              Legal-BERT
            </span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-200">
              BM25 + FAISS
            </span>
            {!compact && (
              <>
                <span className="text-cyan-400">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-200">
                  T5 Grounded
                </span>
              </>
            )}
          </div>
          {!compact && (
            <p className="text-[11px] font-mono text-slate-400">
              Cross-Encoder Reranking · 94.1% Routing Accuracy
            </p>
          )}
        </div>
      );

    case 'elyro-stream':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 px-4">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-200">
              IMAP IDLE
            </span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-200">
              AST Parser
            </span>
            {!compact && (
              <>
                <span className="text-cyan-400">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-200">
                  libSQL + React 19
                </span>
              </>
            )}
          </div>
          {!compact && (
            <p className="text-[11px] font-mono text-cyan-300">
              Real-Time Banking Alerts · Sub-40ms Ingestion
            </p>
          )}
        </div>
      );

    case 'video-summarizer':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 px-4">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 border border-blue-400/40 text-blue-200">
              ResNet-50
            </span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-200">
              BiLSTM Attn
            </span>
            {!compact && (
              <>
                <span className="text-cyan-400">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-200">
                  Knapsack Summary
                </span>
              </>
            )}
          </div>
          {!compact && (
            <p className="text-[11px] font-mono text-cyan-300">
              29M+ Parameters · Spatio-Temporal Fusion
            </p>
          )}
        </div>
      );

    case 'dotnet-layers':
      return (
        <div className="w-full max-w-xs space-y-1.5 px-4">
          {['01 · Api (Controllers)', '02 · Application (Services)', '03 · Domain (Entities)', '04 · Infrastructure (EF Core)'].map(
            (layer, i) => (
              <div
                key={layer}
                className="flex items-center justify-between px-3 py-1 rounded-lg bg-slate-950/75 border border-cyan-400/25 text-[10px] sm:text-[11px] font-mono text-cyan-200"
                style={{ opacity: 1 - i * 0.1 }}
              >
                <span className="truncate">{layer}</span>
                <Layers className="w-3 h-3 text-cyan-400 shrink-0 ml-2" />
              </div>
            ),
          )}
        </div>
      );

    case 'safety-sos':
      return (
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-cyan-400/35 animate-ping" />
            <span className="absolute inset-2 rounded-full border border-sky-400/40" />
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-300/50 flex items-center justify-center text-cyan-200">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          {!compact && (
            <p className="mt-2 text-[11px] font-mono text-cyan-300">
              Socket.IO Live SOS · FastAPI ML Filter
            </p>
          )}
        </div>
      );

    case 'deepfake-scanner':
      return (
        <div className="flex flex-col items-center justify-center gap-2 px-4">
          <div className="relative w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-200 shadow-cyber-sm">
            <ScanFace className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>
          </div>
          {!compact && (
            <p className="text-[11px] font-mono text-cyan-300">
              PyTorch ResNet-18 · Face Wireframe Mesh
            </p>
          )}
        </div>
      );

    case 'agri-brain':
      return (
        <div className="flex flex-col items-center justify-center gap-2 px-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-cyber-sm">
            <Sprout className="w-7 h-7" />
          </div>
          {!compact && (
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-emerald-400/30">Weather</span>
              <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-emerald-400/30">Agro-Agent</span>
              <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-emerald-400/30">Market</span>
            </div>
          )}
        </div>
      );

    case 'fitness-pulse':
      return (
        <div className="flex flex-col items-center justify-center gap-2 px-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-300 shadow-cyber-sm">
            <HeartPulse className="w-7 h-7 animate-pulse" />
          </div>
          {!compact && (
            <p className="text-[11px] font-mono text-sky-300">
              MERN · Calorie Scanning · BMI & Workout Vitals
            </p>
          )}
        </div>
      );

    case 'carbon-gauge':
      return (
        <div className="flex flex-col items-center justify-center gap-2 px-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <Leaf className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-300">
            <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-emerald-400/30">Travel</span>
            <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-emerald-400/30">Diet</span>
            <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-emerald-400/30">Energy</span>
          </div>
        </div>
      );

    case 'curve-plot':
      return (
        <div className="w-full max-w-xs px-4">
          <svg viewBox="0 0 240 80" className="w-full h-16 overflow-visible">
            <path
              d="M 8 56 Q 45 10, 82 46 T 156 38 T 232 22"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {[
              [22, 42],
              [52, 24],
              [82, 46],
              [118, 52],
              [156, 38],
              [194, 24],
              [226, 25],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="3.2" fill="#38bdf8" stroke="#030712" strokeWidth="1" />
            ))}
          </svg>
          {!compact && (
            <p className="text-center text-[10px] font-mono text-cyan-300">
              SciPy Bounds-Constrained Fit (θ, M, X)
            </p>
          )}
        </div>
      );

    case 'isr-waveform':
      return (
        <div className="w-full max-w-xs px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 text-cyan-300 text-xs font-mono">
            <Activity className="w-4 h-4" />
            <span>ISR_GPIO_IRQ // DEBOUNCE</span>
          </div>
          <svg viewBox="0 0 240 48" className="w-full h-12">
            <polyline
              points="4,36 36,36 36,10 88,10 88,36 124,36 124,10 176,10 176,36 236,36"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.2"
            />
          </svg>
        </div>
      );

    default:
      return (
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
          <Cpu className="w-6 h-6" />
        </div>
      );
  }
};

const ProjectVisualStage = ({ project, compact = false, zoomed = false, view = 'image' }) => {
  const [imgError, setImgError] = useState(false);

  if (view === 'image' && project.image && !imgError) {
    return (
      <div className="relative w-full h-full bg-slate-950 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            zoomed ? 'scale-105' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b18] via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-slate-900 via-[#07162e] to-cyan-950/80 cyber-grid-bg flex flex-col items-center justify-center text-center transition-transform duration-700 ${
        zoomed ? 'scale-[1.03]' : 'scale-100'
      } ${compact ? 'p-3' : 'p-6'}`}
    >
      <ProjectCustomArtwork visualType={project.visualType} compact={compact} />
      {!compact && (
        <p className="mt-2 font-display font-bold text-lg text-white">{project.title}</p>
      )}
    </div>
  );
};

const Projects = () => {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [modalProject, setModalProject] = useState(null);
  const [isHoveringList, setIsHoveringList] = useState(false);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [stageHover, setStageHover] = useState(false);
  const [stageTilt, setStageTilt] = useState({ rx: 0, ry: 0 });
  const [stageView, setStageView] = useState('image');
  const [modalView, setModalView] = useState('image');

  const visibleProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.filterGroup === activeFilter);

  const stageProject = visibleProjects.find((p) => p.id === activeProject?.id) || visibleProjects[0];

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    const next = filter === 'All' ? projects : projects.filter((p) => p.filterGroup === filter);
    if (next.length > 0) setActiveProject(next[0]);
  };

  const handleStageMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStageTilt({ rx: -y * 8, ry: x * 8 });
  };

  return (
    <section id="projects" className="relative py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="02 // Selected Work"
          title="Projects &"
          italicWord="Research"
          subtitle="Hover any row for a live visual preview, or click to read the full Problem → Build → Result case study."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {FILTERS.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilterChange(filter)}
                data-cursor="FILTER"
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-mono transition ${
                  active
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold shadow-cyber-sm'
                    : 'glass-panel text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Cursor-Following Floating Hover Mini-Preview (Desktop) */}
        <AnimatePresence>
          {isHoveringList && stageProject && !modalProject && (
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.96, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              className="hidden xl:block fixed z-30 pointer-events-none w-56 h-36 rounded-2xl overflow-hidden border border-cyan-400/45 shadow-cyber-lg bg-slate-950"
              style={{
                left: `${hoverPos.x + 28}px`,
                top: `${hoverPos.y - 72}px`,
              }}
            >
              <ProjectVisualStage project={stageProject} compact zoomed />
              <div className="absolute inset-x-0 bottom-0 px-3 py-1.5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] text-cyan-300 truncate">
                  /{stageProject.number} {stageProject.title}
                </span>
                <span className="font-mono text-[10px] text-emerald-300 shrink-0">Case Study</span>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>

        {/* Split Interactive Index + Floating Preview Stage */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Numbered Interactive Editorial Index */}
          <div
            className="lg:col-span-7 border-t border-cyan-500/20"
            onMouseEnter={() => setIsHoveringList(true)}
            onMouseLeave={() => setIsHoveringList(false)}
            onMouseMove={(e) => setHoverPos({ x: e.clientX, y: e.clientY })}
          >
            {visibleProjects.map((project) => {
              const isSelected = stageProject?.id === project.id;
              return (
                <div
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  data-cursor="CASE STUDY"
                  onMouseEnter={() => setActiveProject(project)}
                  onFocus={() => setActiveProject(project)}
                  onClick={() => {
                    setActiveProject(project);
                    setModalProject(project);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveProject(project);
                      setModalProject(project);
                    }
                  }}
                  className={`group relative border-b border-cyan-500/20 py-5 sm:py-6 px-3 sm:px-5 transition-all duration-300 cursor-pointer ${
                    isSelected ? 'bg-cyan-500/[0.07]' : 'hover:bg-cyan-500/[0.04]'
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-300 to-blue-500 transition-opacity duration-300 ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                  />

                  <div className="flex items-start sm:items-center justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                      <span
                        className={`font-mono text-xs sm:text-sm shrink-0 transition-colors ${
                          isSelected ? 'text-cyan-300 font-bold' : 'text-slate-500'
                        }`}
                      >
                        /{project.number}
                      </span>

                      <div className="min-w-0">
                        <h3
                          className={`font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight transition-transform duration-300 ${
                            isSelected
                              ? 'text-white translate-x-1.5'
                              : 'text-slate-200 group-hover:text-white group-hover:translate-x-1.5'
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-mono text-cyan-400/90 mt-1 truncate">
                          {project.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {project.metric && (
                        <span className="hidden xl:inline-block px-3 py-1 rounded-full text-[11px] font-mono bg-slate-900/90 text-emerald-300 border border-emerald-400/25">
                          {project.metric}
                        </span>
                      )}
                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-cyan-400 text-slate-950 border-cyan-300 rotate-45'
                            : 'border-slate-700 text-slate-400 group-hover:border-cyan-400/60 group-hover:text-cyan-300'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Mobile inline summary */}
                  <div className="mt-3 pl-8 sm:pl-10 lg:hidden">
                    <p className="text-sm text-slate-300 line-clamp-2">{project.description}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 bg-slate-900 border border-slate-700/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Spatial Preview Stage with Gentle Tilt & Zoom (Desktop) */}
          <div
            className="hidden lg:block lg:col-span-5 sticky top-24"
            style={{ perspective: 1100 }}
            onMouseEnter={() => setStageHover(true)}
            onMouseMove={handleStageMove}
            onMouseLeave={() => {
              setStageHover(false);
              setStageTilt({ rx: 0, ry: 0 });
            }}
          >
            {stageProject && (
              <AnimatePresence mode="wait">
                <Motion.div
                  key={stageProject.id}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: stageTilt.rx,
                    rotateY: stageTilt.ry,
                  }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-panel spotlight-card rounded-3xl overflow-hidden shadow-cyber-lg border border-cyan-400/30"
                >
                  <div className="relative h-60 bg-slate-900 overflow-hidden">
                    <ProjectVisualStage
                      project={stageProject}
                      zoomed={stageHover || isHoveringList}
                      view={stageView}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060b18] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-slate-950/85 text-cyan-300 border border-cyan-400/30 backdrop-blur-md">
                        PROJECT #{stageProject.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setStageView((prev) => (prev === 'image' ? 'schematic' : 'image'))
                          }
                          data-cursor="TOGGLE"
                          className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-slate-950/85 text-cyan-200 border border-cyan-400/35 hover:bg-cyan-500/15 hover:border-cyan-300 transition backdrop-blur-md inline-flex items-center gap-1.5"
                          title="Switch between 3D rendered visual and technical schematic"
                        >
                          {stageView === 'image' ? (
                            <>
                              <Binary className="w-3 h-3 text-cyan-300" />
                              <span>Schematic</span>
                            </>
                          ) : (
                            <>
                              <ImageIcon className="w-3 h-3 text-cyan-300" />
                              <span>3D Render</span>
                            </>
                          )}
                        </button>
                        {stageProject.metric && (
                          <span className="hidden xl:inline-block px-3 py-1 rounded-full text-[11px] font-mono bg-slate-950/85 text-emerald-300 border border-emerald-400/30 backdrop-blur-md">
                            {stageProject.metric}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-7">
                    <p className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                      {stageProject.subtitle}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-white mt-1">
                      {stageProject.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                      {stageProject.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {stageProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono text-cyan-200 bg-cyan-500/10 border border-cyan-400/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 pt-5 border-t border-cyan-500/15 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setModalProject(stageProject)}
                        data-cursor="CASE STUDY"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-cyber-sm hover:shadow-cyber-md transition"
                      >
                        <Sparkles className="w-4 h-4" />
                        Read Case Study
                      </button>
                      <a
                        href={stageProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="GITHUB"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-cyan-200 bg-slate-900 border border-cyan-400/35 hover:bg-cyan-500/15 transition"
                      >
                        <Github className="w-4 h-4" />
                        Source
                      </a>
                      {stageProject.liveUrl && (
                        <a
                          href={stageProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="LIVE"
                          className="p-2.5 rounded-xl text-cyan-200 bg-slate-900 border border-cyan-400/35 hover:bg-cyan-500/15 transition"
                          aria-label="Open live demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </Motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Rich Case Study Modal (Problem -> Build -> Result) */}
      <AnimatePresence>
        {modalProject && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalProject(null)}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <Motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-3xl max-w-3xl w-full overflow-hidden shadow-cyber-lg border border-cyan-400/35 my-auto max-h-[90vh] flex flex-col"
            >
              <div className="relative h-52 sm:h-60 bg-slate-900 shrink-0">
                <ProjectVisualStage project={modalProject} view={modalView} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b18] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <button
                    type="button"
                    onClick={() =>
                      setModalView((prev) => (prev === 'image' ? 'schematic' : 'image'))
                    }
                    data-cursor="TOGGLE"
                    className="px-3 py-1 rounded-full text-xs font-mono bg-slate-950/85 text-cyan-200 border border-cyan-400/35 hover:bg-cyan-500/15 hover:border-cyan-300 transition backdrop-blur-md inline-flex items-center gap-1.5"
                  >
                    {modalView === 'image' ? (
                      <>
                        <Binary className="w-3.5 h-3.5 text-cyan-300" />
                        <span>View Schematic</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3.5 h-3.5 text-cyan-300" />
                        <span>View 3D Render</span>
                      </>
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setModalProject(null)}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-white border border-cyan-400/30 hover:text-cyan-300 transition z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">
                      #{modalProject.number} // {modalProject.category}
                    </span>
                    {modalProject.metric && (
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-400/30">
                        {modalProject.metric}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">
                    {modalProject.title}
                  </h3>
                  <p className="text-sm text-cyan-200/80 mt-0.5">{modalProject.subtitle}</p>
                </div>

                {modalProject.caseStudy ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-slate-950/75 border border-cyan-500/15 p-4">
                      <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-400 mb-1.5">
                        01 // The Problem
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {modalProject.caseStudy.problem}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-950/75 border border-cyan-500/15 p-4 flex flex-col justify-between">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-400 mb-1.5 flex items-center justify-between">
                          <span>02 // How I Built It</span>
                          <span className="text-[10px] text-slate-500 font-mono">SYSTEM PIPELINE</span>
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed mb-3">
                          {modalProject.caseStudy.solution}
                        </p>
                      </div>

                      {ARCHITECTURE_FLOWS[modalProject.id] && (
                        <div className="mt-2 p-3 rounded-xl bg-black/50 border border-white/5 space-y-2">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                            <Workflow className="w-3 h-3" />
                            <span>Execution Topology</span>
                          </div>
                          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono scrollbar-thin">
                            {ARCHITECTURE_FLOWS[modalProject.id].map((step, idx, arr) => (
                              <React.Fragment key={step.label}>
                                <div className="shrink-0 px-2 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-center min-w-[90px]">
                                  <div className="text-cyan-300 font-semibold truncate">{step.label}</div>
                                  <div className="text-[9px] text-slate-400 truncate">{step.sub}</div>
                                  <div className="mt-0.5 text-[8px] text-emerald-400/90 font-mono">{step.badge}</div>
                                </div>
                                {idx < arr.length - 1 && (
                                  <ChevronRight className="w-3 h-3 text-cyan-500/60 shrink-0" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {modalProject.hasPublication && (
                      <div className="sm:col-span-2 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-950 to-blue-950/40 border border-cyan-400/35 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-cyan-950/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shrink-0">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-cyan-300 font-semibold uppercase tracking-wider bg-cyan-500/15 px-2 py-0.5 rounded">
                                SPRINGER NATURE • LNEE
                              </span>
                              <span className="text-[10px] font-mono text-emerald-400">CAMERA-READY</span>
                            </div>
                            <h4 className="text-sm font-semibold text-white font-display mt-0.5">
                              Confluence 2026 Research Publication
                            </h4>
                            <p className="text-xs text-slate-300 font-mono">
                              82.3% Grounding · 94.1% Routing · Abstract & 1-Click BibTeX/APA
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setModalProject(null);
                            window.dispatchEvent(new CustomEvent('open-publication-modal'));
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition shadow-sm shadow-cyan-500/30 hover:scale-[1.02]"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Inspect Paper & Citation ↗</span>
                        </button>
                      </div>
                    )}
                    <div className="sm:col-span-2 rounded-2xl bg-slate-950/75 border border-emerald-400/20 p-4">
                      <p className="font-mono text-[11px] uppercase tracking-widest text-emerald-300 mb-2">
                        03 // Measurable Results & Takeaways
                      </p>
                      <ul className="space-y-1.5">
                        {modalProject.caseStudy.impact.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-sm text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-300 leading-relaxed">{modalProject.description}</p>
                )}

                <div className="flex flex-wrap gap-2">
                  {modalProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-500/10 text-cyan-200 border border-cyan-400/25"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-cyan-500/15 flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalProject(null)}
                    className="px-4 py-2.5 rounded-xl text-sm text-slate-300 border border-slate-700 hover:border-slate-500 transition"
                  >
                    Close
                  </button>
                  {modalProject.liveUrl && (
                    <a
                      href={modalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-cyan-200 border border-cyan-400/40 bg-cyan-500/10"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={modalProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950"
                  >
                    <Github className="w-4 h-4" />
                    Open on GitHub
                  </a>
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
