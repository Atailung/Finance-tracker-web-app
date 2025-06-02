import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|button|divider|ripple|spinner).js",
  ],
  theme: {
    extend: {
      colors: {
        category: {
          groceries: {
            light: {
              bg: "rgb(209 250 229)", // bg-green-100
              text: "rgb(6 95 70)", // text-green-800
              border: "rgb(167 243 208)", // border-green-200
            },
            dark: {
              bg: "rgba(34, 197, 94, 0.2)", // dark:bg-green-900/20
              text: "rgb(74 222 128)", // dark:text-green-400
            },
          },
          electronics: {
            light: {
              bg: "rgb(219 234 254)", // bg-blue-100
              text: "rgb(30 64 175)", // text-blue-800
              border: "rgb(191 219 254)", // border-blue-200
            },
            dark: {
              bg: "rgba(29, 78, 216, 0.2)", // dark:bg-blue-900/20
              text: "rgb(96, 165, 250)", // dark:text-blue-400
            },
          },
          transportation: {
            light: {
              bg: "rgb(255 237 213)", // bg-orange-100
              text: "rgb(154 52 18)", // text-orange-800
              border: "rgb(254 215 170)", // border-orange-200
            },
            dark: {
              bg: "rgba(249, 115, 22, 0.2)", // dark:bg-orange-900/20
              text: "rgb(251, 146, 60)", // dark:text-orange-400
            },
          },
          dining: {
            light: {
              bg: "rgb(233 213 255)", // bg-purple-100
              text: "rgb(88 28 135)", // text-purple-800
              border: "rgb(216 180 254)", // border-purple-200
            },
            dark: {
              bg: "rgba(107, 33, 168, 0.2)", // dark:bg-purple-900/20
              text: "rgb(167, 139, 250)", // dark:text-purple-400
            },
          },
          healthcare: {
            light: {
              bg: "rgb(254 226 226)", // bg-red-100
              text: "rgb(153 27 27)", // text-red-800
              border: "rgb(252 165 165)", // border-red-200
            },
            dark: {
              bg: "rgba(220, 38, 38, 0.2)", // dark:bg-red-900/20
              text: "rgb(248, 113, 113)", // dark:text-red-400
            },
          },
          shopping: {
            light: {
              bg: "rgb(224 231 255)", // bg-indigo-100
              text: "rgb(55 48 163)", // text-indigo-800
              border: "rgb(199 210 254)", // border-indigo-200
            },
            dark: {
              bg: "rgba(49, 46, 129, 0.2)", // dark:bg-indigo-900/20
              text: "rgb(129, 140, 248)", // dark:text-indigo-400
            },
          },
          entertainment: {
            light: {
              bg: "rgb(252 231 243)", // bg-pink-100
              text: "rgb(157 23 77)", // text-pink-800
              border: "rgb(251 207 232)", // border-pink-200
            },
            dark: {
              bg: "rgba(219, 39, 119, 0.2)", // dark:bg-pink-900/20
              text: "rgb(244, 114, 182)", // dark:text-pink-400
            },
          },
          utilities: {
            light: {
              bg: "rgb(207 250 254)", // bg-cyan-100
              text: "rgb(22 78 99)", // text-cyan-800
              border: "rgb(165 243 252)", // border-cyan-200
            },
            dark: {
              bg: "rgba(6, 182, 212, 0.2)", // dark:bg-cyan-900/20
              text: "rgb(34, 211, 238)", // dark:text-cyan-400
            },
          },
          other: {
            light: {
              bg: "rgb(243 244 246)", // bg-gray-100
              text: "rgb(31 41 55)", // text-gray-800
              border: "rgb(229 231 235)", // border-gray-200
            },
            dark: {
              bg: "rgba(55, 65, 81, 0.2)", // dark:bg-gray-900/20
              text: "rgb(156, 163, 175)", // dark:text-gray-400
            },
          },
        },
        background: "#F6F6F6",
        foreground: "#1A1A1A",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },
        primary: {
          DEFAULT: "#1f4842",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#8CC63F",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#3AB54A",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#F6F6F6",
          foreground: "#6B7280",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      status: {
        processed: {
          light: {
            bg: "rgb(209 250 229)", // bg-emerald-100
            text: "rgb(6 95 70)", // text-emerald-800
            border: "rgb(167 243 208)", // border-emerald-200
          },
          dark: {
            bg: "rgba(16, 185, 129, 0.2)", // dark:bg-emerald-900/20
            text: "rgb(52, 211, 153)", // dark:text-emerald-400
          },
        },
        pending: {
          light: {
            bg: "rgb(254 243 199)", // bg-amber-100
            text: "rgb(146 64 14)", // text-amber-800
            border: "rgb(252 211 77)", // border-amber-200
          },
          dark: {
            bg: "rgba(217, 119, 6, 0.2)", // dark:bg-amber-900/20
            text: "rgb(251, 191, 36)", // dark:text-amber-400
          },
        },
        rejected: {
          light: {
            bg: "rgb(254 226 226)", // bg-red-100
            text: "rgb(153 27 27)", // text-red-800
            border: "rgb(252 165 165)", // border-red-200
          },
          dark: {
            bg: "rgba(220, 38, 38, 0.2)", // dark:bg-red-900/20
            text: "rgb(248, 113, 113)", // dark:text-red-400
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "fade-in-delay-1": "fadeIn 1s ease-out 0.2s",
        "fade-in-delay-2": "fadeIn 1s ease-out 0.4s",
        "fade-in-delay-3": "fadeIn 1s ease-out 0.6s",
      },
      "input-base": {
        height: "3rem",
        transition: "all 200ms ease",
        "background-color": "theme('colors.white')",
        color: "theme('colors.gray.900')",
        border: "2px solid theme('colors.gray.200')",
        "border-radius": "theme('borderRadius.lg')",
        "&:hover": {
          "border-color": "theme('colors.gray.300')",
        },
        "&:focus": {
          "border-color": "theme('colors.emerald.500')",
          "box-shadow": "0 0 0 3px theme('colors.emerald.200')",
        },
        "@apply dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:border-gray-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-800":
          {},
      },
      "input-error": {
        "border-color": "theme('colors.red.300')",
        "&:focus": {
          "border-color": "theme('colors.red.500')",
          "box-shadow": "0 0 0 3px theme('colors.red.200')",
        },
        "@apply dark:border-red-500 dark:focus:border-red-400 dark:focus:ring-red-800":
          {},
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
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        pulse: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.1)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), heroui()],
} satisfies Config;

export default config;
