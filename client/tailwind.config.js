/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        obsidian: '#030712',
        cyber: {
          cyan: '#22d3ee',
          sky: '#4acfee',
          blue: '#3b82f6',
          indigo: '#6366f1',
        },
      },
      boxShadow: {
        'cyber-sm': '0 0 20px rgba(34, 211, 238, 0.16)',
        'cyber-md': '0 0 36px rgba(34, 211, 238, 0.24)',
        'cyber-lg': '0 0 60px rgba(59, 130, 246, 0.28)',
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        'spin-reverse': 'spin-reverse 24s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'marquee': 'marquee 32s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
