import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        fintech: {
          navy: "#0a0e27",
          purpleBlack: "#1a0b2e",
          cyan: "#00d4ff",
          blue: "#3b82f6",
          purple: "#8b5cf6",
          pink: "#ec4899",
          success: "#22c55e",
          danger: "#ef4444",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "Vazirmatn", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "app-gradient":
          "linear-gradient(135deg, #0a0e27 0%, #11152f 45%, #1a0b2e 100%)",
        "fintech-radial":
          "radial-gradient(circle at center, rgba(0, 212, 255, 0.14), transparent 65%)",
      },
      boxShadow: {
        glass: "0 20px 60px -20px rgba(0, 0, 0, 0.65)",
        "glow-cyan": "0 0 32px rgba(0, 212, 255, 0.16)",
        "glow-purple": "0 0 32px rgba(139, 92, 246, 0.18)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "blob-drift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(24px, -18px, 0) scale(1.08)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.8s linear infinite",
        "blob-drift": "blob-drift 12s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
