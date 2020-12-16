const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { mergeStrategy, htmlOptions, config: commonCfg, cleanWebpackPluginPrefs } = require('./common');

const client = merge.smartStrategy(mergeStrategy)(commonCfg, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: commonCfg.output.path,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      ...cleanWebpackPluginPrefs,
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin(htmlOptions),
  ],
});

module.exports = client;
