import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope, FaHackerrank } from 'react-icons/fa';
import { ArrowDownRight, FileText, MapPin, Plus, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { portfolioData } from '../data/portfolioData';

const Hero = () => {
  const { profile } = portfolioData;
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const roles = profile.roles;
    const currentRole = roles[roleIndex % roles.length];
    let delay = isDeleting ? 34 : 60;

    if (!isDeleting && typedText === currentRole) {
      delay = 1750;
    } else if (isDeleting && typedText === '') {
      delay = 250;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && typedText === currentRole) {
        setIsDeleting(true);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        const nextLen = typedText.length + (isDeleting ? -1 : 1);
        setTypedText(currentRole.slice(0, nextLen));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex, profile.roles]);

  const handleCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 14, ry: x * 14 });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-5 sm:px-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Editorial Telemetry Bar */}
        <Motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden sm:flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.22em] text-slate-400 border-b border-cyan-500/15 pb-4 mb-10"
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            {profile.availabilityBadge}
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-publication-modal'))}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/20 hover:border-cyan-300 transition cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              SPRINGER LNEE PAPER ACCEPTED ↗
            </button>
            <span>17.6868° N · 83.2185° E · IN</span>
          </div>
        </Motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Monumental Editorial Intro */}
          <Motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.28em] text-cyan-400 mb-4">
              Portfolio // {profile.fullName}
            </p>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.03]">
              Engineering{' '}
              <span className="font-serif italic font-normal bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent pr-1">
                Intelligent
              </span>
              <br />
              Full-Stack Systems.
            </h1>

            {/* Typing role line */}
            <div className="mt-5 min-h-[2.25rem] flex items-center justify-center lg:justify-start">
              <p className="font-mono text-base sm:text-xl text-cyan-300">
                <span className="text-slate-500 mr-2">&gt;</span>
                {typedText}
                <span className="inline-block w-[2px] h-5 ml-1 align-middle bg-cyan-400 typing-caret" />
              </p>
            </div>

            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {profile.headlineSubtitle}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                {profile.location}
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-cyan-300 transition font-mono"
              >
                {profile.email}
              </a>
            </div>

            {/* Magnetic Primary CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <MagneticButton>
                <a
                  href="#projects"
                  data-cursor="EXPLORE"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-cyber-md hover:shadow-cyber-lg transition"
                >
                  Explore Work
                  <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-resume-modal'))}
                  data-cursor="RESUME"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-cyan-200 bg-slate-900/75 border border-cyan-400/35 hover:border-cyan-300 hover:bg-cyan-500/10 hover:shadow-cyber-sm transition cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  Resume PDF
                </button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#contact"
                  data-cursor="TALK"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-slate-300 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-400/40 bg-slate-900/40 transition"
                >
                  Contact
                </a>
              </MagneticButton>
            </div>

            {/* Social Dock */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {[
                { icon: FaGithub, href: profile.github, label: 'GitHub', external: true, cursor: 'GITHUB' },
                { icon: FaLinkedin, href: profile.linkedin, label: 'LinkedIn', external: true, cursor: 'LINKEDIN' },
                { icon: FaHackerrank, href: profile.hackerrank, label: 'HackerRank', external: true, cursor: 'CODE' },
                { icon: FaEnvelope, href: `mailto:${profile.email}`, label: 'Email', external: false, cursor: 'EMAIL' },
                { icon: FaPhone, href: profile.phoneHref, label: 'Phone', external: false, cursor: 'CALL' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    data-cursor={item.cursor}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="w-11 h-11 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 hover:shadow-cyber-sm hover:-translate-y-0.5 transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
              <a
                href={profile.githubSecondary}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                className="h-11 px-4 rounded-full glass-panel flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 transition"
              >
                <FaGithub className="w-4 h-4 text-cyan-400" />
                @Saiumashankar11
              </a>
            </div>
          </Motion.div>

          {/* Right: Interactive 3D Spatial Monolith Portrait */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.14 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div
              onMouseMove={handleCardMove}
              onMouseLeave={resetTilt}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: 'transform 0.18s ease-out',
              }}
              className="relative w-full max-w-[395px] glass-panel rounded-[2rem] p-6 sm:p-7 shadow-cyber-lg"
            >
              {/* Architectural registration crosshairs */}
              <Plus className="absolute top-4 left-4 w-3.5 h-3.5 text-cyan-400/50" />
              <Plus className="absolute top-4 right-4 w-3.5 h-3.5 text-cyan-400/50" />
              <Plus className="absolute bottom-4 left-4 w-3.5 h-3.5 text-cyan-400/50" />
              <Plus className="absolute bottom-4 right-4 w-3.5 h-3.5 text-cyan-400/50" />

              <div className="relative mx-auto w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center my-2">
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/45 animate-spin-slow" />
                <div className="absolute inset-3 rounded-full border border-blue-400/35 border-t-cyan-300 animate-spin-reverse" />
                <div className="absolute inset-5 rounded-full bg-cyan-400/15 blur-xl animate-pulse-glow" />
                <img
                  src={profile.avatar}
                  alt={profile.fullName}
                  className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover border-2 border-cyan-400/70 shadow-cyber-md"
                />
              </div>

              <div className="relative mt-5 text-center">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {profile.brandTag}
                </div>
                <h2 className="font-display text-xl font-bold text-white">{profile.fullName}</h2>

                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  {profile.highlights.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl bg-slate-950/75 border border-cyan-500/20 px-2.5 py-2.5"
                    >
                      <div className="text-[11px] font-mono text-slate-400">{stat.label}</div>
                      <div className="text-xs sm:text-sm font-bold text-cyan-300 mt-0.5">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
