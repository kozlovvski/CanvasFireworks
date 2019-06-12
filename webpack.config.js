const env = process.env.NODE_ENV;

module.exports = env => {
  console.log(`🛠️  Ahoy there! Building with ${env} mode using ./webpack/webpack.${env}.js 🛠️  `);
  return require(`./webpack/webpack.${env}.js`);
};