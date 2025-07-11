module.exports = {
  plugins: [
    require('postcss-nesting'), // 👈 Add this line before tailwindcss
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
