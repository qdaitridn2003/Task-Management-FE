/** @type {import('tailwindcss').Config} */

const { Color } = require('./src/common/color.js');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: Color.primary,
                secondary: Color.secondary,
                success: Color.success,
                warn: Color.warn,
                danger: Color.danger,
                info: Color.info,
            },
        },
    },
};
