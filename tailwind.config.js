/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#643fdb',
        secondary: '#ff8a00',
        success: '#198754',
        warn: '#ffc107',
        danger: '#dc3545',
        info: '#0dcaf0',
        neutral1: '#1c1243',
        neutral2: '#a29eb6',
        neutral3: '#eff1f3',
        neutral4: '#fff',
        semanticRed: '#ff5d4f',
        semanticGreen: '#47c272',
      },
    },
  },
};
