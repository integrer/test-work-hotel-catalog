const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { mergeStrategy, htmlOptions, config: commonCfg, cleanWebpackPluginPrefs } = require('./common');

const config = merge.smartStrategy(mergeStrategy)(commonCfg, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: 'nosources-cheap-source-map',
  plugins: [new CleanWebpackPlugin(cleanWebpackPluginPrefs), new HtmlWebpackPlugin(htmlOptions)],
});

module.exports = config;
