/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          dark: '#383e26', // artists & footer background
          DEFAULT: '#40472b', // hero, header & intro background
          light: '#4b5333',
        },
        gold: {
          light: '#f5e49e',
          DEFAULT: '#e7c76a', // primary gold accent
          dark: '#cda847',
          badge: '#e9d580',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
