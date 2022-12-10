/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        'pet-pattern': "url('/images/Background.png')",
      },
      textShadow: {
        default: '0 2px 0 #000',
        sm: '0 3px 3px #77767c',
        md: '0 6px 3px #77767c',
        h2: '5px 5px 8px #422b52, 5px 5px 8px #0000Fc',
        h1: '0 0 px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
      },
    },
  },
  plugins: [require('tailwindcss-textshadow')],
};
