/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        cream: "#FFFBF0",
        primary: {
          DEFAULT: "#FFC400",
          dark: "#D99A00",
        },
        text: {
          main: "#171717",
          muted: "#606060",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};
