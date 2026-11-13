import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Award, Briefcase, Cpu, GraduationCap, Layers, Sparkles } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { portfolioData } from '../data/portfolioData';

function trackSpotlight(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

const About = () => {
  const { profile, skills, skillDomains, education, experience, honors } = portfolioData;

  return (
    <section id="about" className="relative py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="01 // Capabilities & Track Record"
          title="Engineering, Research &"
          italicWord="Experience"
          subtitle="Industry software engineering experience paired with published AI/NLP research and cloud fundamentals."
        />

        {/* Top Bento Grid */}
        <div className="grid lg:grid-cols-12 gap-7">
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            onMouseMove={trackSpotlight}
            className="lg:col-span-7 glass-panel glass-panel-hover spotlight-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-4">
                <Cpu className="w-4 h-4" />
                Developer Profile
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                Building grounded{' '}
                <span className="font-serif italic font-normal text-cyan-300">AI systems</span>{' '}
                &amp; scalable full-stack software.
              </h3>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                {profile.bio}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-cyan-500/15 grid sm:grid-cols-2 gap-4">
              {skillDomains.map((domain) => (
                <div
                  key={domain.title}
                  className="rounded-2xl bg-slate-950/60 border border-cyan-500/15 p-4"
                >
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2.5">
                    <Layers className="w-3.5 h-3.5" />
                    {domain.title}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.items.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-200 bg-cyan-500/10 border border-cyan-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onMouseMove={trackSpotlight}
            className="lg:col-span-5 glass-panel glass-panel-hover spotlight-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="text-cyan-300 font-mono text-xs uppercase tracking-widest mb-2">
                Core Strengths
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-6">
                Technical Focus
              </h3>

              <div className="space-y-5">
                {skills.map((skill, idx) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <div>
                        <span className="font-semibold text-slate-100">{skill.name}</span>
                        <span className="ml-2 text-xs font-mono text-slate-400">
                          · {skill.category}
                        </span>
                      </div>
                      <span className="font-mono text-cyan-300 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-800/90 overflow-hidden border border-slate-700/60">
                      <Motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.85, delay: 0.1 * idx, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.55)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-cyan-500/15 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300">
                <Award className="w-4 h-4" />
                Honors &amp; Publication
              </div>
              {honors.map((h) => (
                <div
                  key={h.title}
                  className="rounded-xl bg-slate-950/70 border border-slate-800/90 p-3.5"
                >
                  <div className="text-[11px] font-mono text-emerald-300 uppercase">
                    {h.badge}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">{h.title}</div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{h.detail}</p>
                  {h.badge.includes('Springer') && (
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-publication-modal'))}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 hover:bg-cyan-500/20 hover:border-cyan-300 transition cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      Inspect Paper &amp; Citation ↗
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Motion.div>
        </div>

        {/* Internship Experience */}
        {experience.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-2.5 text-cyan-300 font-mono text-sm uppercase tracking-widest mb-6">
              <Briefcase className="w-4 h-4" />
              Internship Experience
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {experience.map((item, idx) => (
                <Motion.div
                  key={`${item.company}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  onMouseMove={trackSpotlight}
                  className="glass-panel glass-panel-hover spotlight-card rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/25">
                        {item.period}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{item.mode}</span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-white leading-snug">
                      {item.role}
                    </h4>
                    <p className="text-sm font-semibold text-cyan-300 mt-1">{item.company}</p>
                    <p className="text-sm text-slate-300 mt-3 leading-relaxed">{item.summary}</p>
                  </div>

                  {item.tech && (
                    <div className="mt-5 pt-4 border-t border-cyan-500/15 flex flex-wrap gap-1.5">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-700/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </Motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Education Timeline */}
        <div className="mt-14">
          <div className="flex items-center gap-2.5 text-cyan-300 font-mono text-sm uppercase tracking-widest mb-6">
            <GraduationCap className="w-4 h-4" />
            Education
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {education.map((item, idx) => (
              <Motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                onMouseMove={trackSpotlight}
                className="glass-panel glass-panel-hover spotlight-card rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/25">
                      {item.period}
                    </span>
                    <span className="text-xs font-mono font-semibold text-emerald-300">
                      {item.score}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-sm text-cyan-300 font-medium mt-1">{item.institution}</p>
                  {item.detail && (
                    <p className="text-sm text-slate-400 mt-3 leading-relaxed">{item.detail}</p>
                  )}
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
