import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Award, Cloud, ExternalLink, Maximize2, X } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { portfolioData } from '../data/portfolioData';

function trackSpotlight(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

const Certifications = () => {
  const { certifications } = portfolioData;
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section id="certifications" className="relative py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="03 // Credentials"
          title="Verified"
          italicWord="Certifications"
          subtitle="Credentials across AWS Cloud, Advanced SQL, Python, Generative AI, and Geospatial Systems."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, idx) => (
            <Motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              onMouseMove={trackSpotlight}
              className="group glass-panel glass-panel-hover spotlight-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5"
            >
              {cert.image ? (
                <button
                  type="button"
                  data-cursor="PREVIEW"
                  onClick={() => setActiveCert(cert)}
                  className="relative w-full sm:w-36 h-36 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-cyan-500/20 group-hover:border-cyan-400/50 transition"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-cyan-200">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </button>
              ) : (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="VERIFY"
                  className="w-full sm:w-36 h-32 sm:h-28 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-600/20 border border-cyan-400/35 flex flex-col items-center justify-center text-cyan-300 hover:border-cyan-300 transition"
                >
                  <Cloud className="w-8 h-8 mb-1.5" />
                  <span className="text-[11px] font-mono uppercase">AWS Cloud</span>
                </a>
              )}

              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 mb-1.5">
                  <Award className="w-3.5 h-3.5" />
                  {cert.org} · {cert.year}
                </div>
                <h3 className="font-display text-lg font-bold text-white leading-snug">
                  {cert.title}
                </h3>

                <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  {cert.image && (
                    <button
                      type="button"
                      data-cursor="PREVIEW"
                      onClick={() => setActiveCert(cert)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/15 text-cyan-200 border border-cyan-400/35 hover:bg-cyan-400 hover:text-slate-950 transition"
                    >
                      Preview Certificate
                    </button>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="VERIFY"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono text-cyan-200 bg-slate-900 border border-cyan-400/30 hover:border-cyan-300 transition"
                    >
                      Verify Credential
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeCert && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <Motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-3xl max-w-3xl w-full p-5 sm:p-6 border border-cyan-400/35 shadow-cyber-lg"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-mono text-cyan-300">
                    {activeCert.org} · {activeCert.year}
                  </p>
                  <h3 className="font-display text-xl font-bold text-white">{activeCert.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCert(null)}
                  aria-label="Close certificate preview"
                  className="p-2 rounded-full bg-slate-900 text-slate-300 hover:text-cyan-300 border border-cyan-400/25"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  className="w-full max-h-[70vh] object-contain mx-auto"
                />
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
