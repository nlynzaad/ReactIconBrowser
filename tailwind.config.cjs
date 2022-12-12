/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        innerMd: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1);'
      },
      height: {
        '90/100': '90%',
        '15/100': '15%',
        '85/100': '85%',
        '75/100': '75%',
        '30': '7.5rem'
      },
      width: {
        '85vw': '85vw',
        '30': '7.5rem',
        '75/100': '75%',
        '85/100': '85%',
      },
      minHeight: {
        '15/100': '15%',
      },
      margin: {
        n1: '-0.25rem',
        n2: '-0.5rem',
        n3: '-0.75rem',
        n4: '-1rem',
        n8: '-2rem'
      },
      fontSize: {
        xxs: ['10px','12px']
      }
    },
  },
  plugins: [],
}
