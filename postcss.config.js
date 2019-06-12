const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecss({
      content: ['./**/*.html'],
      whitelistPatterns: [/(--(\w|\-)+)$/]
    }),
    require('cssnano')({
      preset: 'default',
    }),
  ],
  browsers: ['> 0.25%', 'ie >= 11']
};