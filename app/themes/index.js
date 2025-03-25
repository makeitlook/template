const light = require("./light");
const dark = require("./dark");

// IMPORTANT: At least one theme must have the name 'base' to be used as a default
// See https://github.com/crswll/tailwindcss-theme-swapper for more information
// Themes use the same configuration as tailwind.config.js theming

const themes = [light, dark];

module.exports = themes;
