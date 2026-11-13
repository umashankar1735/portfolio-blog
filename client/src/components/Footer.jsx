import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope, FaHackerrank } from 'react-icons/fa';
import MagneticButton from './MagneticButton';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
  const { profile, footer } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-cyan-500/20 bg-[#020611]/90 backdrop-blur-xl pt-16 pb-10 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Statement Band */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-cyan-500/15">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400">
              Available for Full-Time &amp; R&amp;D Roles
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Let&apos;s Build Something{' '}
              <span className="font-serif italic font-normal text-cyan-300">Remarkable.</span>
            </h2>
          </div>

          <MagneticButton>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="EMAIL"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-cyber-md hover:shadow-cyber-lg transition"
            >
              {profile.email}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </MagneticButton>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="font-display font-bold text-white text-base">
              {profile.fullName}{' '}
              <span className="text-cyan-400 font-mono text-xs">{profile.brandTag}</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">{footer.tagline}</p>
            <p className="text-xs text-slate-500 mt-1">
              {footer.copyright} &copy; {new Date().getFullYear()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-cursor="GITHUB"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-300 transition"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-cursor="LINKEDIN"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-300 transition"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href={profile.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HackerRank"
              data-cursor="CODE"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-300 transition"
            >
              <FaHackerrank className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              data-cursor="EMAIL"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-300 transition"
            >
              <FaEnvelope className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              data-cursor="TOP"
              className="ml-2 w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-400/35 text-cyan-300 flex items-center justify-center hover:bg-cyan-400 hover:text-slate-950 transition"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
