// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),  // Utilise la version correcte de tailwindcss
    require('autoprefixer'),  // Assure que ton CSS est bien préfixé pour tous les navigateurs
  ],
};
