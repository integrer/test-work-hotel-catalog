const HtmlWebpackPlugin = require("html-webpack-plugin");
const template = require("html-webpack-template");

module.exports = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      template,
      inject: true,

      appMountId: "app",
      lang: "ru",
      title: "Каталог гостиниц",
      mobile: true,
    }),
  ],
});
