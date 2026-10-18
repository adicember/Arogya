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
        rose: {
          50: "#FDF3F5", 100: "#FAE3E8", 200: "#F3C6CF", 300: "#E7A3AC",
          400: "#D97C8C", 500: "#C45570", 600: "#A83A5A", 700: "#862949",
          800: "#6A203A", 900: "#4A1628",
        },
        ink: {
          100: "#F5F1F3", 200: "#E7E0E3", 300: "#CFC5CA",
          500: "#7A6B73", 700: "#4F4249", 900: "#2A1F24",
        },
        sage: { 50: "#F1F8F6", 100: "#DCEEE9", 300: "#8CC3B8", 500: "#3F8F82", 700: "#2B6A60" },
        paper: "#FFFBFC",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Noto Sans Devanagari", "system-ui", "sans-serif"],
      },
      borderRadius: { md: "12px" },
      boxShadow: { focus: "0 0 0 3px rgba(196,85,112,.35)" },
      width: {
        '80px': '80px',
      },
    },
  },
  variants: {},
  plugins: [],
};
