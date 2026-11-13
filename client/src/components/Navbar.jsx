import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, FileText, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const sectionLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const { profile } = portfolioData;
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0);

      if (location.pathname === '/') {
        for (let i = sectionLinks.length - 1; i >= 0; i -= 1) {
          const el = document.getElementById(sectionLinks[i].id);
          if (el && el.getBoundingClientRect().top <= 160) {
            setActiveSection(sectionLinks[i].id);
            break;
          }
        }
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const scrollToSection = (id) => {
    setMobileOpen(false);
    if (!isHome) {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Top scroll progress hairline */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-[width] duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-400/35 text-cyan-300 group-hover:bg-cyan-400/20 group-hover:shadow-cyber-sm transition">
            <Terminal className="w-4 h-4" />
          </span>
          <span className="font-display font-bold tracking-wide text-base sm:text-lg text-white group-hover:text-cyan-300 transition">
            {profile.brand}
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {sectionLinks.map((item) => {
            const isActive =
              (isHome && activeSection === item.id) ||
              (!isHome && item.id === 'blog' && location.pathname.startsWith('/blogs'));

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 shadow-cyber-sm'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <Link
            to="/blogs"
            className={`ml-1 px-3.5 py-1.5 rounded-lg text-sm font-mono transition-all border ${
              location.pathname.startsWith('/blogs')
                ? 'text-cyan-200 border-cyan-400/50 bg-cyan-500/15'
                : 'text-slate-400 border-slate-700/70 hover:text-cyan-300 hover:border-cyan-400/40'
            }`}
          >
            /all-posts
          </Link>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-resume-modal'))}
            className="ml-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-cyber-sm hover:shadow-cyber-md hover:scale-[1.03] transition cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            Resume
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg text-cyan-300 bg-cyan-500/10 border border-cyan-400/30"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#050b18]/95 backdrop-blur-xl border-b border-cyan-500/20 px-5 py-4 space-y-2">
          {sectionLinks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/10 transition"
            >
              {item.label}
            </button>
          ))}
          <Link
            to="/blogs"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-left px-3 py-2.5 rounded-lg text-cyan-300 font-mono hover:bg-cyan-500/10 transition"
          >
            /blogs (All Posts)
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              window.dispatchEvent(new CustomEvent('open-resume-modal'));
            }}
            className="mt-2 flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950"
          >
            <FileText className="w-4 h-4" />
            View Resume
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
