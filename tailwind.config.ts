import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sora: ["var(--font-sora)", "Sora", "sans-serif"],
      },
      colors: {
        quadra: {
          brand: { DEFAULT: "#055cac", light: "#23a5e6", dark: "#044a8a" },
          success: { DEFAULT: "#107c10", bg: "#f0fdf4", tint: "#f1faf1" },
          danger: { DEFAULT: "#c50f1f", bg: "#fef2f2", tint: "#fdf3f4" },
          warning: { DEFAULT: "#f59e0b", bg: "#fffbeb", text: "#be7c00", tint: "#fef3c7" },
          info: { DEFAULT: "#1d4ed8", bg: "#ebf3fc" },
          text: { primary: "#242424", secondary: "#424242", muted: "#616161", placeholder: "#9ca3af" },
          bg: { page: "#f5f5f5", card: "#ffffff", hover: "#f9fafb" },
          border: { DEFAULT: "#e5e7eb", light: "#f3f4f6" },
        },
      },
      boxShadow: {
        card: "0 2px 4px rgba(0,0,0,0.05)",
        "card-lg": "0 2px 6px rgba(0,0,0,0.06)",
        tab: "0 1px 4px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        card: "12px",
        pill: "25px",
      },
    },
  },
  plugins: [],
};

export default config;
