import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

const flowbite = require("flowbite-react/tailwind");
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        flowbite.content(),
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'base' : colors.stone,
                'primary' : colors.amber
            }
        },
    },

    plugins: [forms,flowbite.plugin(),],
};
