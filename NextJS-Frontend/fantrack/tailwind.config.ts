import {heroui} from '@heroui/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|button|divider|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "#F6F6F6", // Light gray
        foreground: "#1A1A1A", // Deep text

        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },

        primary: {
          DEFAULT: "#1f4842", // Deep teal green (fnantrack green)
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#8CC63F", // eSewa green
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#3AB54A", // Accent green
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#F6F6F6",
          foreground: "#6B7280", // Tailwind gray-500
        },
        destructive: {
          DEFAULT: "#FF4C4C",
          foreground: "#ffffff",
        },
        border: "#E0E0E0",
        input: "#FFFFFF",
        ring: "#8CC63F",

        chart: {
          "1": "#1f4842",
          "2": "#3AB54A",
          "3": "#8CC63F",
          "4": "#F6F6F6",
          "5": "#FF4C4C",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in-delay-1': 'fadeIn 1s ease-out 0.2s',
        'fade-in-delay-2': 'fadeIn 1s ease-out 0.4s',
        'fade-in-delay-3': 'fadeIn 1s ease-out 0.6s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), heroui()],
} satisfies Config;

export default config;
