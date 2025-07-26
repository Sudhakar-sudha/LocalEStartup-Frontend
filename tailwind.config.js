/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        underlineGrow: {
          '0%': { width: '10%' }, // start from half width
          '100%': { width: '100%' }, // expand to full
        },
      },
      animation: {
        underlineGrow: 'underlineGrow 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}

