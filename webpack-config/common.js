const path = require("path")
const { VueLoaderPlugin } = require("vue-loader")
require("babel-polyfill")

const clientRules = [
  {
    test: /\.js$/,
    use: { loader: "babel-loader", options: { presets: ["@babel/preset-env"] } },
  },
  {
    test: /\.vue$/,
    use: ["vue-loader"],
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: ["css-loader", "resolve-url-loader", "sass-loader"],
  },
  {
    test: /\.(jpe?g|gif|png|svg|woff|woff2|eot|ttf|otf)$/,
    use: [{ loader: "file-loader", options: { esModule: false } }],
  },
  {
    test: require.resolve("jquery"),
    loader: "expose-loader",
    options: { exposes: ["jQuery", "$"] },
  },
];

const config = {
  target: "web",
  entry: { build: ["./src", "bootstrap"] },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
  },
  module: { rules: clientRules },
  plugins: [new VueLoaderPlugin()],
};

const mergeStrategy = { "module.rules.use": "prepend" };

const htmlOptions = {
  inject: false,
  template: require("html-webpack-template"),

  appMountId: "app",
  lang: "ru",
  title: "Каталог гостиниц",
  mobile: true,
};

module.exports = { config, mergeStrategy, htmlOptions };