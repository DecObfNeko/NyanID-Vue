module.exports = {
    theme: {
      extend: {
        animation: {
          'fly-in': 'fly-in 0.5s ease-out',
        },
        keyframes: {
          'fly-in': {
            '0%': { transform: 'translateX(100%)', opacity: 0 },
            '100%': { transform: 'translateX(0)', opacity: 1 },
          },
        },
      },
    },
    plugins: [],
  }