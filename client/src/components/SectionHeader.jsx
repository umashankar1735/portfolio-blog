import React from 'react';
import { motion as Motion } from 'framer-motion';

const SectionHeader = ({ badge, title, italicWord, subtitle }) => (
  <Motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    className="text-center mb-14"
  >
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 shadow-cyber-sm mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
      {badge}
    </span>
    <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]">
      {title}{' '}
      {italicWord && (
        <span className="font-serif italic font-normal bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
          {italicWord}
        </span>
      )}
    </h2>
    {subtitle && (
      <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
        {subtitle}
      </p>
    )}
  </Motion.div>
);

export default SectionHeader;
