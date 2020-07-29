const path = require("path");
const merge = require("webpack-merge");

const presets = require("./webpack-presets");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const contentBase = path.join(__dirname, "dist");

const common = merge(
  {
    target: "web",
    entry: { build: "./src" },
    output: {
      path: contentBase,
      filename: "[name].js",
    },
  },
  presets.js(),
  presets.vue(),
  presets.files(),
  presets.html(),
);

module.exports = function(_env, argv) {
  if (argv.mode === "production") {
    return merge(
      common,
      presets.prod(),
      presets.scss(
        [MiniCssExtractPlugin.loader],
        [new MiniCssExtractPlugin({ filename: "style.css" })],
      ),
    )
  }
  if (argv.mode === "development") {
    return merge(
      common,
      presets.dev(),
      presets.scss(["vue-style-loader"]),
      presets.devServer(contentBase),
    )
  }
}
