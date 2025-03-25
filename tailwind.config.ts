import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const themeSwapper = require("tailwindcss-theme-swapper");
const { flatten } = require("lodash");
const themes = require("./themes");

const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const safelist = flatten(
  themes.map(({ selectors }: { selectors: string[] }) => selectors)
)
  .filter((selector: string) => selector !== ":root")
  .map((selector: string) => selector.replace(".", "").replace("#", ""));

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: safelist,
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1150px", // change the value of lg to 1150px
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      blue: "#0066FF",
      lightblue: "#d9e8ff",
      darkpurple: "#241A24",
      lightgrey: "#F4F5F6",
      navyblue: "#00224A",
      darkblue: "#1E013A",
      offwhite: "rgba(255, 255, 255, 0.75)",
      lightblack: "rgba(0, 0, 0, 0.55)",
      bluish: "rgba(14, 13, 13, 0.75)",
      testColor: "rgba(54, 54, 54, 0.75)",
      grey: "#909090",
      bgblue: "#02398A",
      darkgrey: "#747474",
      faqblue: "#0861FF",
      gold: "#FAAF38",
      hoblue: "#0000FF",
      btnblue: "#267dff",
      bggrey: "#DDDDDD",
      footer: "rgba(226, 223, 223, 0.75)",
      linegrey: "#C4C4C4",
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
      "65xl": ["65px", { lineHeight: "1" }],
      "80xl": ["80px", { lineHeight: "6rem" }],
    },
    extend: {
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
      keyframes: {
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },
    },
  },
  plugins: [
    themeSwapper({
      themes,
    }),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-dot-thick": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
