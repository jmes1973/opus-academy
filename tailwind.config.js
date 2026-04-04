/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",  // 👈 ESTA LÍNEA ES CLAVE
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        opusBlueMain: "#2e56a6",
        opusBlueSec: "#4b86de",
        opusGrayDark: "#6e6f72",
        opusGrayLight: "#a7a9ac",
      },
      fontFamily: {
        heading: ["Montserrat", "system-ui", "sans-serif"],
        ui: ["Noto Sans", "system-ui", "sans-serif"],
        montserrat: ["Montserrat", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
