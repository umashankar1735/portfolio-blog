import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KineticMarquee from './components/KineticMarquee';
import About from './components/About';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ResumeModal from './components/ResumeModal';
import PublicationModal from './components/PublicationModal';
import BlogList from './pages/BlogList';
import BlogView from './pages/BlogView';
import BlogEditor from './pages/BlogEditor';

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (targetId) {
      window.setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  }, [location.state]);

  return (
    <Motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.25 }}
    >
      <Hero />
      <KineticMarquee />
      <About />
      <Projects />
      <Certifications />
      <BlogList />
      <Contact />
    </Motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/blogs"
          element={
            <Motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.25 }}
            >
              <BlogList standalone />
            </Motion.div>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <Motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.25 }}
            >
              <BlogView />
            </Motion.div>
          }
        />
        <Route
          path="/blog-editor"
          element={
            <Motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.25 }}
            >
              <BlogEditor />
            </Motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [resumeModalOpen, setResumeModalOpen] = React.useState(false);
  const [publicationModalOpen, setPublicationModalOpen] = React.useState(false);

  useEffect(() => {
    const handleOpenResume = () => setResumeModalOpen(true);
    const handleOpenPublication = () => setPublicationModalOpen(true);

    window.addEventListener('open-resume-modal', handleOpenResume);
    window.addEventListener('open-publication-modal', handleOpenPublication);

    return () => {
      window.removeEventListener('open-resume-modal', handleOpenResume);
      window.removeEventListener('open-publication-modal', handleOpenPublication);
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 relative overflow-x-hidden">
        <Preloader />
        <CustomCursor />
        <div className="film-grain" aria-hidden="true" />
        <ThreeBackground />
        <Navbar />
        <main className="relative z-10 flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
        <ResumeModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
        />
        <PublicationModal
          isOpen={publicationModalOpen}
          onClose={() => setPublicationModalOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
