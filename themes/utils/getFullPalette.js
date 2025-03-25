const colors = require("tailwindcss/colors");

const getFullPalette = (name, color) => {
  const shades = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ];
  let palette = {};

  shades.forEach((shade) => {
    palette[`${name}-${shade}`] = colors[color][shade];
  });

  return palette;
};

module.exports = getFullPalette;
