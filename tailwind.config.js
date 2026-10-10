/** Brand palette — premium Ayurvedic identity */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#244638', deep: '#17372C' },
        sage: { DEFAULT: '#A8B9A0', light: '#DCE5D6', mist: '#EDF1E8' },
        ivory: '#FAF7EF',
        beige: { DEFAULT: '#EAE0CF', light: '#F4EEE1' },
        terracotta: { DEFAULT: '#B97655', dark: '#9A5C3E' },
        gold: { DEFAULT: '#B69A64', light: '#D9C79B' },
        ink: { DEFAULT: '#292F29', muted: '#566056' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Noto Serif Devanagari"', 'Georgia', 'serif'],
        sans: ['Manrope', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        deva: ['"Noto Serif Devanagari"', '"Cormorant Garamond"', 'serif'],
      },
      keyframes: {
        sway: { '0%,100%': { transform: 'rotate(-2.5deg)' }, '50%': { transform: 'rotate(2.5deg)' } },
        spinslow: { to: { transform: 'rotate(360deg)' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
        shimmer: { to: { backgroundPosition: '-200% 0' } },
      },
      animation: {
        sway: 'sway 9s ease-in-out infinite',
        spinslow: 'spinslow 90s linear infinite',
        marquee: 'marquee 60s linear infinite',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
