/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        green: {
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
        },
        blue: {
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
        },
        purple: {
          400: '#a78bfa',
          500: '#8b5cf6',
          900: '#581c87',
        },
        pink: {
          500: '#ec4899',
        },
        cyan: {
          500: '#06b6d4',
        },
        teal: {
          500: '#14b8a6',
        },
        orange: {
          500: '#f97316',
        },
        red: {
          500: '#ef4444',
        },
        gray: {
          300: '#d1d5db',
          400: '#9ca3af',
          700: '#374151',
        }
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' }
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
          }
        }
      },
      backdropBlur: {
        'sm': '4px',
        'md': '12px',
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
      transitionDelay: {
        '200': '200ms',
      }
    },
  },
  plugins: [],
  safelist: [
    // Gradient classes
    'from-green-400',
    'via-blue-400',
    'to-purple-400',
    'to-blue-400',
    'to-black',
    'via-purple-900',
    'from-purple-500',
    'to-pink-500',
    'from-blue-500',
    'to-cyan-500',
    'from-green-500',
    'to-teal-500',
    'from-orange-500',
    'to-red-500',
    // Background with opacity
    'bg-black/20',
    'bg-green-400/5',
    'bg-green-400/10',
    'bg-green-400/20',
    'bg-blue-400/5',
    'bg-blue-400/10',
    // Border with opacity
    'border-green-400/20',
    'border-green-400/40',
    // Hover effects
    'hover:shadow-green-400/50',
    // Text colors
    'text-transparent',
    'bg-clip-text',
  ]
}