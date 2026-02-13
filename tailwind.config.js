/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0E1114',
          secondary: '#161A1E',
          tertiary: '#1C2126',
        },
        border: {
          primary: '#2A3038',
          secondary: '#1E252C',
        },
        text: {
          primary: '#E8EAED',
          secondary: '#9BA1A8',
          tertiary: '#6B7280',
        },
        accent: {
          green: '#22C55E',
          'green-hover': '#16A34A',
          'green-light': 'rgba(34, 197, 94, 0.1)',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Courier New', 'monospace'],
      },
      animation: {
        'slide-down': 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse': 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
