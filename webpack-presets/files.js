module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|gif|png|svg|woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: "file-loader",
          options: { esModule: false },
        }],
      },
    ],
  },
});
