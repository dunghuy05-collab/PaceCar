export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dce8ff",
          200: "#bfd3ff",
          300: "#91b3ff",
          400: "#5c8cff",
          500: "#386cf5",
          600: "#2452df",
          700: "#203fc0",
          800: "#20379b",
          900: "#20327b",
          950: "#111a3a",
        },
        // Figma "EXE" file tokens (Login frame 2:3530)
        pace: {
          blue: "#1769ff",
          ink: "#0a0a0b",
          muted: "#65686f",
          line: "#d9dadd",
          tab: "#f2f5fa",
          sky: "#8fafff",
          dark: "#111112",
          page: "#e7e8eb",
          ice: "#edf3ff",
          hint: "#8994a7",
          pale: "#9dbdf8",
          car: "#72a4ff",
          tag: "#aeb0b5",
          "foot-link": "#c7cede",
          "foot-text": "#b9c1d3",
          star: "#dc201d",
          err: "#e41616",
        },
        signal: {
          50: "#fff8e8",
          100: "#ffefc2",
          400: "#f7b938",
          500: "#e69a13",
          700: "#98600c",
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', "Impact", "sans-serif"],
        ui: ["Manrope", '"Be Vietnam Pro"', "sans-serif"],
      },
      boxShadow: {
        "card-pop": "0 24px 30px rgba(0,0,0,.28)",
        tab: "0 2px 3.5px rgba(18,34,74,.12)",
        soft: "0 14px 45px rgba(17,26,58,.08)",
        lift: "0 22px 55px rgba(17,26,58,.14)",
        focus: "0 0 0 4px rgba(56,108,245,.2)",
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [],
};
