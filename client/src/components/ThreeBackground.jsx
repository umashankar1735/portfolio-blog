import React, { useEffect, useRef } from 'react';

const ThreeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

    const NODE_COUNT = width < 768 ? 48 : 88;
    const MAX_LINK_DIST = width < 768 ? 135 : 175;
    const FOV = 520;

    const nodes = Array.from({ length: NODE_COUNT }, (_, idx) => {
      const z = Math.random() * 680 - 240;
      return {
        x: (Math.random() - 0.5) * width * 1.35,
        y: (Math.random() - 0.5) * height * 1.35,
        z,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        vz: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 1.1,
        hue: idx % 3 === 0 ? '59, 130, 246' : '34, 211, 238',
      };
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / width - 0.5) * 2;
      mouse.targetY = (e.clientY / height - 0.5) * 2;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth camera parallax toward cursor
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      const camOffsetX = mouse.x * 75;
      const camOffsetY = mouse.y * 55;
      const halfW = width / 2;
      const halfH = height / 2;

      const projected = [];

      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          n.z += n.vz;

          const boundX = width * 0.72;
          const boundY = height * 0.72;
          if (n.x > boundX || n.x < -boundX) n.vx *= -1;
          if (n.y > boundY || n.y < -boundY) n.vy *= -1;
          if (n.z > 440 || n.z < -260) n.vz *= -1;
        }

        const depth = FOV + n.z;
        if (depth <= 40) continue;

        const scale = FOV / depth;
        const sx = halfW + (n.x - camOffsetX * (scale * 0.7)) * scale;
        const sy = halfH + (n.y - camOffsetY * (scale * 0.7)) * scale;

        if (sx < -80 || sx > width + 80 || sy < -80 || sy > height + 80) continue;

        projected.push({
          sx,
          sy,
          scale,
          alpha: Math.min(0.95, Math.max(0.15, scale * 0.72)),
          radius: Math.max(0.9, n.radius * scale),
          hue: n.hue,
        });
      }

      // Draw 3D constellation edges
      for (let i = 0; i < projected.length; i += 1) {
        const a = projected[i];
        for (let j = i + 1; j < projected.length; j += 1) {
          const b = projected[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_LINK_DIST) {
            const linkAlpha = (1 - dist / MAX_LINK_DIST) * Math.min(a.alpha, b.alpha) * 0.36;
            ctx.strokeStyle = `rgba(34, 211, 238, ${linkAlpha.toFixed(3)})`;
            ctx.lineWidth = Math.min(1.4, (a.scale + b.scale) * 0.45);
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      // Cursor neural link highlight
      if (mouse.active) {
        const cursorPx = (mouse.targetX * 0.5 + 0.5) * width;
        const cursorPy = (mouse.targetY * 0.5 + 0.5) * height;
        for (let i = 0; i < projected.length; i += 1) {
          const a = projected[i];
          const dist = Math.hypot(a.sx - cursorPx, a.sy - cursorPy);
          if (dist < 190) {
            const linkAlpha = (1 - dist / 190) * 0.45;
            ctx.strokeStyle = `rgba(74, 207, 238, ${linkAlpha.toFixed(3)})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(cursorPx, cursorPy);
            ctx.stroke();
          }
        }
      }

      // Draw glowing 3D nodes
      for (let i = 0; i < projected.length; i += 1) {
        const p = projected[i];
        ctx.fillStyle = `rgba(${p.hue}, ${p.alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.radius > 1.7) {
          ctx.fillStyle = `rgba(${p.hue}, ${(p.alpha * 0.16).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, p.radius * 3.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        animationId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      if (animationId) window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Subtle ambient cyber radial glows */}
      <div
        className="absolute -top-48 left-1/4 w-[540px] h-[540px] rounded-full blur-[130px] opacity-25"
        style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-160px] right-1/5 w-[520px] h-[520px] rounded-full blur-[140px] opacity-20"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 cyber-grid-bg opacity-55" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Vignette edge fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 48%, rgba(3, 7, 18, 0.72) 100%)',
        }}
      />
    </div>
  );
};

export default ThreeBackground;
