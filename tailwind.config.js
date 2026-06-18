/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'f3-black':      '#000000',
        'f3-dark':       '#0a0a0a',
        'f3-darker':     '#050505',
        'f3-red':        '#C1121F',
        'f3-red-accent': '#FF2D2D',
        'f3-red-light':  '#ff4444',
        'f3-white':      '#FFFFFF',
        'f3-gray':       '#1a1a1a',
        'f3-gray-mid':   '#333333',
        'f3-gray-light': '#888888',
        'f3-silver':     '#c0c0c0',
      },
      fontFamily: {
        'display': ['"Bebas Neue"', 'sans-serif'],
        'heading': ['"Barlow Condensed"', 'sans-serif'],
        'body':    ['Barlow', 'sans-serif'],
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
        '108': '1.08',
      },
      animation: {
        'spin-slow':  'spin 10s linear infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-18px)' },
        },
      },
    },
  },
  plugins: [],
}
