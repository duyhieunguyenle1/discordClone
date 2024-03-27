/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        invalidColor: '#db3c36',
        mainColor:'#a1a6ac',
        textMain:'#949ba4',
        textHover:'#dbdee1'
      },
    },
  },
  plugins: [],
};
