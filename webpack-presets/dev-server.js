module.exports = (contentBase) => ({
  devServer: {
    contentBase,
    compress: true,
    port: 5000,
  },
});
