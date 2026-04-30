import type { Config } from "tailwindcss";

/**
 * Design tokens — Leeum M1 Rotunda inspired.
 *  canvas    #FAFAF7   gallery wall
 *  ink       #1A1A1A   primary text
 *  concrete  #8B8680   structural gray (mid)
 *  oculus    #B8C9D6   skylight blue
 *  accent    #2C2C2C   labels, rules, deep emphasis
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FAFAF7",
        ink: "#1A1A1A",
        accent: "#2C2C2C",
        concrete: {
          DEFAULT: "#8B8680",
          50: "#FAFAF7",
          100: "#F1F0EC",
          200: "#E2E0D9",
          300: "#C9C6BD",
          400: "#A8A49C",
          500: "#8B8680",
          600: "#6E6A65",
          700: "#52504B",
          800: "#373531",
          900: "#1A1A1A",
        },
        oculus: {
          DEFAULT: "#B8C9D6",
          50: "#F1F5F8",
          100: "#E6EDF2",
          200: "#DCE5EC",
          300: "#B8C9D6",
          500: "#8AA2B5",
          700: "#5C7180",
        },
      },
      fontFamily: {
        serif: [
          "var(--font-noto-serif-kr)",
          "var(--font-cormorant)",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        gallery: "0.32em",
        wall: "0.2em",
      },
      maxWidth: {
        gallery: "84rem",
      },
    },
  },
  plugins: [],
};

export default config;
