const HtmlWebpackPlugin = require("html-webpack-plugin");
const template = require("html-webpack-template");

module.exports = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      template,
      inject: false,

      appMountId: "app",
      lang: "ru",
      title: "Каталог гостиниц",
      mobile: true,
    }),
  ],
});
