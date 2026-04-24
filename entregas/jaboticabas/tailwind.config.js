/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        jaboticaba: { DEFAULT: '#2A0E1C', 900: '#1A0611', 800: '#2A0E1C', 700: '#3D1828' },
        brasa:      { DEFAULT: '#E85D2E', 400: '#F27749', 500: '#E85D2E', 600: '#C94A1E', 700: '#A73A12' },
        creme:      { DEFAULT: '#FAF3E7', 100: '#FDF9F1', 200: '#FAF3E7', 300: '#F2E8D3' },
        carvao:     { DEFAULT: '#1A1210', 800: '#1A1210', 700: '#2B201C' },
        ouro:       { DEFAULT: '#D4A44B', 400: '#DFB767', 500: '#D4A44B', 700: '#9F7A32', 800: '#7A5A23' },
        zap:        { DEFAULT: '#075E54', 500: '#128C7E', 600: '#064D45', bright: '#25D366', dark: '#043830' },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        ember: '0 10px 40px -12px rgba(232,93,46,.45)',
        card:  '0 20px 60px -20px rgba(26,18,16,.25)',
      },
      animation: {
        'scroll-hint': 'scrollHint 1.8s ease-in-out infinite',
        'fade-up':     'fadeUp .8s ease-out both',
        'glow':        'glow 3s ease-in-out infinite',
      },
      keyframes: {
        scrollHint: { '0%,100%': { transform: 'translateY(0)', opacity: '.4' }, '50%': { transform: 'translateY(8px)', opacity: '1' } },
        fadeUp:     { 'from': { opacity: '0', transform: 'translateY(24px)' }, 'to': { opacity: '1', transform: 'translateY(0)' } },
        glow:       { '0%,100%': { boxShadow: '0 0 30px -5px rgba(232,93,46,.5)' }, '50%': { boxShadow: '0 0 50px -5px rgba(232,93,46,.8)' } },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
