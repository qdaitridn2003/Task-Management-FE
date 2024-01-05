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
      },
    },
  },
};
