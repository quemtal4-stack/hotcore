import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
    },

    extend: {
      colors: {
        hotcore: {
          red: "#E63946",
          redDark: "#C92D3A",
          yellow: "#FFB703",
          yellowDark: "#E0A000",
          blue: "#E8F4F8",
          dark: "#1A1A2E",
          gray: "#6B7280",
          light: "#F8FAFC",
          white: "#FFFFFF",
          success: "#16A34A",
          warning: "#F59E0B",
          danger: "#DC2626",
        },

        primary: {
          DEFAULT: "#E63946",
          foreground: "#FFFFFF",
        },

        secondary: {
          DEFAULT: "#FFB703",
          foreground: "#1A1A2E",
        },

        background: "#E8F4F8",
        foreground: "#1A1A2E",

        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A2E",
        },

        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },

        border: "#E2E8F0",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },

      borderRadius: {
        hotcore: "12px",
        card: "16px",
        button: "999px",
      },

      boxShadow: {
        hotcore: "0 4px 20px rgba(230, 57, 70, 0.15)",
        card: "0 2px 10px rgba(0, 0, 0, 0.08)",
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
        button: "0 6px 18px rgba(230, 57, 70, 0.25)",
      },

      backgroundImage: {
        "hotcore-gradient":
          "linear-gradient(135deg, #E63946 0%, #FFB703 100%)",
        "hotcore-soft":
          "linear-gradient(135deg, #E8F4F8 0%, #FFFFFF 100%)",
      },

      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(16px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        pulseHotcore: {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(230, 57, 70, 0.35)",
          },
          "50%": {
            boxShadow: "0 0 0 10px rgba(230, 57, 70, 0)",
          },
        },
      },

      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        slideUp: "slideUp 0.35s ease-out",
        pulseHotcore: "pulseHotcore 1.8s infinite",
      },
    },
  },

  plugins: [],
};

export default config;
