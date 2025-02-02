// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure the correct paths are set here
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        pcosPink: "#E7A3AC",
        customPink: '#862949', // Custom color name and value
      },
      width: {
        '80px': '80px',
      },
    },
  },
  variants: {},
  plugins: [],
};
