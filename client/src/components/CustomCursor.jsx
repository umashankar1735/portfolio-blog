import React, { useEffect, useState } from 'react';
import { motion as Motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return undefined;

    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target;
      if (target instanceof Element) {
        const labeledEl = target.closest('[data-cursor]');
        if (labeledEl) {
          setLabel(labeledEl.getAttribute('data-cursor') || '');
          setHoveringInteractive(true);
          return;
        }
        const clickable = target.closest('a, button, input, textarea, [role="button"]');
        setLabel('');
        setHoveringInteractive(Boolean(clickable));
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [mouseX, mouseY, visible]);

  if (!enabled || !visible) return null;

  const hasLabel = Boolean(label);

  return (
    <>
      {/* Outer spring ring / contextual label pill */}
      <Motion.div
        style={{
          left: ringX,
          top: ringY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          width: hasLabel ? 'auto' : hoveringInteractive ? 46 : 30,
          height: hasLabel ? 32 : hoveringInteractive ? 46 : 30,
          paddingLeft: hasLabel ? 14 : 0,
          paddingRight: hasLabel ? 14 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className={`fixed pointer-events-none z-[90] rounded-full flex items-center justify-center transition-colors duration-200 ${
          hasLabel
            ? 'bg-cyan-400 text-slate-950 font-mono text-[11px] font-bold tracking-widest shadow-cyber-md'
            : hoveringInteractive
              ? 'border border-cyan-300 bg-cyan-400/15 backdrop-blur-xs'
              : 'border border-cyan-400/55 bg-transparent'
        }`}
      >
        {hasLabel && <span>{label}</span>}
      </Motion.div>

      {/* Precision center dot */}
      {!hasLabel && (
        <Motion.div
          style={{
            left: mouseX,
            top: mouseY,
            x: '-50%',
            y: '-50%',
          }}
          className="fixed pointer-events-none z-[91] w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
        />
      )}
    </>
  );
};

export default CustomCursor;
