const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {
  mergeStrategy, htmlOptions, config: commonCfg, cleanWebpackPluginPrefs,
} = require("./common");


const config = merge.smartStrategy(mergeStrategy)(commonCfg, {
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: "nosources-cheap-source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(cleanWebpackPluginPrefs),
    new MiniCssExtractPlugin({ filename: "style.css" }),
    new HtmlWebpackPlugin(htmlOptions),
  ],
});



module.exports = config;
