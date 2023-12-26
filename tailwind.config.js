/** @type {import('tailwindcss').Config} */

// If encouter import error. Make sure 'colors.js' is named correctly, then close and reopen VSCode.

const { Color } = require('./src/common/colors.js');

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
