import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0a0e27',
        'navy-deep': '#111735',
        'navy-soft': '#1a2148',
        gold: '#f5c542',
        pink: '#ff8fb1',
        cream: '#fff5e1',
        'cream-muted': '#c9c2b0',
      },
    },
  },
  plugins: [],
} satisfies Config
