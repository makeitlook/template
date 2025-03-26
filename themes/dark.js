const colors = require("tailwindcss/colors");
const tinycolor = require("tinycolor2");

const getFullPalette = require("./utils/getFullPalette");
const getInstance = require("./utils/getInstance");
const instance = getInstance();

// Custom color palette based on provided colors
const customColors = {
  black: "#000000",
  oxfordBlue: "#14213d",
  orange: "#fca311",
  whiteSmoke: "#f2f2f2",
  white: "#ffffff",
};

// Map custom colors to theme
const primary = "orange"; // Using standard tailwind orange as closest match
const secondary = "slate"; // Using slate to complement oxford blue
const success = "emerald";
const error = "red";
const info = "blue";
const warning = "orange";
const progress = "yellow";
const neutral = "slate"; // Using slate for neutrals to complement oxford blue

const dark = {
  value: "dark",
  type: "dark",
  label: "Dark",
  selectors: [".dark"],
  theme: {
    colors: {
      // Primary and Secondary colours - using custom orange
      "elements-primary-dimmed": tinycolor(customColors.orange)
        .darken(5)
        .toString(),
      "elements-primary-main": customColors.orange,
      "elements-primary-shadow": tinycolor(customColors.orange)
        .darken(10)
        .toString(),
      "elements-primary-shadow-heavy": tinycolor(customColors.orange)
        .darken(15)
        .toString(),
      "elements-primary-highlight": tinycolor(customColors.orange)
        .lighten(10)
        .toString(),
      "elements-primary-contrastText": customColors.black,
      "elements-primary-light": tinycolor(customColors.orange)
        .lighten(5)
        .toString(),
      "elements-primary-bg": tinycolor(customColors.orange)
        .darken(10)
        .toString(),

      // Secondary colors - using oxford blue
      "elements-secondary-dimmed": tinycolor(customColors.oxfordBlue)
        .lighten(20)
        .toString(),
      "elements-secondary-main": tinycolor(customColors.oxfordBlue)
        .lighten(10)
        .toString(),
      "elements-secondary-shadow": customColors.oxfordBlue,
      "elements-secondary-shadow-heavy": tinycolor(customColors.oxfordBlue)
        .darken(5)
        .toString(),
      "elements-secondary-highlight": tinycolor(customColors.oxfordBlue)
        .lighten(30)
        .toString(),
      "elements-secondary-contrastText": customColors.white,
      ...getFullPalette("elements-secondary", secondary),

      // Alert
      "helpers-error-dimmed": tinycolor(customColors.black)
        .lighten(15)
        .toString(),
      "helpers-error-main": colors[error]["400"],
      "helpers-error-button": colors[error]["600"],
      "helpers-error-button-hover": colors[error]["500"],

      "helpers-warning-dimmed": tinycolor(customColors.black)
        .lighten(15)
        .toString(),
      "helpers-warning-main": colors[warning]["400"],
      "helpers-warning-button": colors[warning]["500"],
      "helpers-warning-button-hover": colors[warning]["400"],

      "helpers-remove-button": tinycolor(customColors.oxfordBlue)
        .lighten(10)
        .toString(),
      "helpers-remove-button-hover": tinycolor(customColors.oxfordBlue)
        .lighten(20)
        .toString(),

      "helpers-success-dimmed": tinycolor(customColors.black)
        .lighten(15)
        .toString(),
      "helpers-success-main": colors[success]["400"],
      "helpers-success-button":
        instance === "default" ? colors[success]["500"] : customColors.orange,
      "helpers-success-button-hover":
        instance === "default"
          ? colors[success]["400"]
          : tinycolor(customColors.orange).lighten(10).toString(),

      "helpers-info-dimmed": tinycolor(customColors.black)
        .lighten(15)
        .toString(),
      "helpers-info-main": colors[info]["400"],
      "helpers-info-button": colors[info]["500"],
      "helpers-info-button-hover": colors[info]["400"],

      "helpers-progress-dimmed": tinycolor(customColors.black)
        .lighten(15)
        .toString(),
      "helpers-progress-main": colors[progress]["500"],

      // Invalid
      "helpers-invalid-dimmed": tinycolor(customColors.black)
        .lighten(15)
        .toString(),
      "helpers-invalid-main": tinycolor(customColors.whiteSmoke)
        .darken(20)
        .toString(),
      "helpers-invalid-button": tinycolor(customColors.whiteSmoke)
        .darken(30)
        .toString(),
      "helpers-invalid-button-hover": tinycolor(customColors.whiteSmoke)
        .darken(40)
        .toString(),

      // Text
      "text-primary": "#ffffff",
      "text-secondary": colors[neutral]["300"],
      "text-tertiary": colors[neutral]["400"],
      "text-dimmed": colors[neutral]["500"],
      "text-disabled": colors[neutral]["600"],
      "text-theme": "#e2dde9",

      // Divider
      "divider-shadow-heavy": tinycolor(customColors.black)
        .lighten(15)
        .toString(),
      "divider-shadow": tinycolor(customColors.black).lighten(12).toString(),
      "divider-main": tinycolor(customColors.black).lighten(10).toString(),
      "divider-dimmed": tinycolor(customColors.black).lighten(8).toString(),

      // Border
      "border-shadow": tinycolor(customColors.black).lighten(12).toString(),
      "border-main": tinycolor(customColors.black).lighten(10).toString(),
      "border-white": customColors.white,
      "border-dimmed": tinycolor(customColors.black).lighten(8).toString(),

      "button-hover": tinycolor(customColors.oxfordBlue).lighten(5).toString(),

      // Backgrounds
      "main-background": customColors.black,
      "card-background": customColors.oxfordBlue,
      "modal-background": tinycolor(customColors.oxfordBlue)
        .lighten(5)
        .toString(),

      "neutral-dimmed-heavy": tinycolor(customColors.oxfordBlue)
        .lighten(10)
        .toString(),
      "neutral-dimmed": tinycolor(customColors.oxfordBlue)
        .lighten(5)
        .toString(),
      neutral: customColors.oxfordBlue,
      "neutral-shadow": tinycolor(customColors.black).lighten(5).toString(),
      "neutral-shadow-heavy": customColors.black,
    },
  },
  muiThemeBase: {
    palette: {
      mode: "dark",
      primary: {
        main: customColors.orange,
      },
      secondary: {
        main: tinycolor(customColors.oxfordBlue).lighten(20).toString(),
      },
      error: {
        main: colors[error]["400"],
      },
      text: {
        disabled: tinycolor(customColors.whiteSmoke).darken(40).toString(),
        icon: "rgba(255, 255, 255, 0.5)",
        primary: customColors.white,
        secondary: tinycolor(customColors.whiteSmoke).darken(10).toString(),
      },
      background: {
        default: customColors.black,
        paper: customColors.oxfordBlue,
      },
    },
  },
};

module.exports = dark;
