import React, { useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'us_portfolio_preloader_seen';

const Preloader = () => {
  const [visible, setVisible] = useState(() => {
    try {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !reduced && !sessionStorage.getItem(SESSION_KEY);
    } catch {
      return false;
    }
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return undefined;

    let frame = 0;
    const start = performance.now();
    const duration = 950;

    const tick = (now) => {
      const elapsed = now - start;
      const ratio = Math.min(1, elapsed / duration);
      // Ease-out progress curve
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
          // ignore
        }
        window.setTimeout(() => setVisible(false), 220);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <Motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.72, ease: [0.77, 0, 0.175, 1] } }}
          className="fixed inset-0 z-[100] bg-[#02050e] flex flex-col justify-between p-6 sm:p-10 select-none"
        >
          {/* Top telemetry bar */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 tracking-widest uppercase">
            <span>KESIREDDI SAI UMA SHANKAR</span>
            <span className="text-cyan-400">PORTFOLIO // 2026</span>
          </div>

          {/* Center signature */}
          <div className="my-auto text-center">
            <Motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-block"
            >
              <span className="font-mono text-xs tracking-[0.35em] text-cyan-400 uppercase block mb-3">
                Initializing Experience
              </span>
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
                AI <span className="font-serif italic font-normal text-cyan-300">&amp;</span> SYSTEMS
              </h2>
            </Motion.div>
          </div>

          {/* Bottom counter + progress hairline */}
          <div>
            <div className="flex items-end justify-between mb-3">
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="text-xs font-mono text-slate-500 hover:text-cyan-300 transition uppercase tracking-widest"
              >
                Skip Intro &rarr;
              </button>
              <span className="font-display text-5xl sm:text-7xl font-bold tabular-nums text-white leading-none">
                {String(progress).padStart(2, '0')}
                <span className="text-cyan-400 text-2xl sm:text-3xl">%</span>
              </span>
            </div>
            <div className="h-[2px] w-full bg-slate-800 overflow-hidden rounded-full">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-[width] duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
