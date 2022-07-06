/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      mono: ["Roboto Mono", "monospace"]
    },
    extend: {},
  },
  plugins: [],
}
