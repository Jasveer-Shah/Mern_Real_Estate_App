/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // ...
  ],
}

// When we make a change in config file, we need to restart the client server

