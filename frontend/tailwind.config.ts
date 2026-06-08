import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2AA198",
        "primary-dark": "#1F7F78",
        "deep-teal": "#0F4C5C",
        mint: "#5FD3C6",
        "soft-mint": "#A8E6DF",
        "mint-bg": "#E0F7F5",
        ink: "#102A2D",
        muted: "#5E6F73",
        border: "#D8E7E5",
        surface: "#F7FBFA",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans Arabic", "Cairo", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
