import React from 'react';

const ITEMS = [
  { text: 'SPRINGER LNEE 2026 AUTHOR', accent: true },
  { text: 'EX-COGNIZANT .NET + REACT INTERN', accent: false },
  { text: 'AWS CLOUD PRACTITIONER', accent: true },
  { text: 'LEGAL-BERT RAG · 94.1% ROUTING', accent: false },
  { text: 'INSTORE OPTIMA .NET 8', accent: true },
  { text: 'PYTORCH RESNET-18 & FASTAPI', accent: false },
  { text: 'PRESIDENT · STUDENT COUNCIL', accent: true },
];

const KineticMarquee = () => {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="relative z-10 border-y border-cyan-500/20 bg-slate-950/75 backdrop-blur-md overflow-hidden py-4 select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {track.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 px-6 shrink-0">
            <span
              className={`text-sm sm:text-base tracking-wider whitespace-nowrap ${
                item.accent
                  ? 'font-serif italic text-xl sm:text-2xl text-cyan-300'
                  : 'font-mono text-slate-300 uppercase'
              }`}
            >
              {item.text}
            </span>
            <span className="text-cyan-400/70 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KineticMarquee;
