/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        moodle: {
          primary: '#f98012',
          secondary: '#1e3a5f',
          accent: '#7ab800',
        },
      },
    },
  },
  plugins: [],
};
