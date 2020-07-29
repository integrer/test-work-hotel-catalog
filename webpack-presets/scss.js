module.exports = (additionalLoaders = [], plugins = []) => ({
  module: {
    rules: [{
      test: /\.(sa|s?c)ss/,
      use: [
        ...additionalLoaders,
        "css-loader",
        "resolve-url-loader",
        "sass-loader",
      ],
    }],
  },
  plugins,
});
