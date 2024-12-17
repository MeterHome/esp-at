/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily:{
      inter:['Inter', 'sans-serif']

    },
  
    extend: {
      colors:{
        'azure':{
          DEFAULT:  '#2B5678',
          200:'#3f7eb0',
          300:'#38719e',
          400:'#32638b',
          500:'#2b5678',
          600:'#244965',
          800:'#1e3b52',
          900:'#172e40' 
      },
      'mh-white': '#FAF9F5',
      }
    },
  },
  plugins: [],
}

