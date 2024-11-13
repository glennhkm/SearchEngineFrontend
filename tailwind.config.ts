import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import colors from "tailwindcss/colors"
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"


export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1.4s infinite",
      },
    },
  },
  plugins: [
    addVariablesForColors,
  ],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}