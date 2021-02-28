const path = require('path');

////////////////////////////////
// Webpack server config
////////////////////////////////

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

////////////////////////////////
// Webpack plugins
////////////////////////////////

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const { styleLoaders, stylePlugins } = require('./styles');
const styleSyntax = ['sass', 'scss', 'css'];

const clientRules = [
  {
    test: /\.[jt]s$/,
    use: ['babel-loader'],
  },
  {
    test: /\.vue$/,
    use: ['vue-loader'],
  },
  ...styleSyntax.map(syntax => ({
    test: new RegExp(`\\.${syntax}$`),
    use: styleLoaders(syntax, IS_PRODUCTION),
  })),
  {
    test: /\.(jpe?g|gif|png|svg)$/,
    use: {
      loader: 'file-loader',
      options: {
        esModule: false,
        outputPath: 'images',
      },
    },
  },
  {
    test: /\.(woff2?|eot|ttf|otf)$/,
    use: {
      loader: 'file-loader',
      options: {
        esModule: false,
        outputPath: 'fonts',
      },
    },
  },
];

const cleanWebpackPluginPrefs = { cleanOnceBeforeBuildPatterns: ['/js/**', '/css/**', 'index.html'] };

const htmlOptions = {
  appMountId: 'app',
  lang: 'ru',
  title: 'Каталог гостиниц',
  mobile: true,
};

const config = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: './src',
  devtool: IS_PRODUCTION ? 'inline-source-map' : 'nosources-cheap-source-map',
  output: {
    path: path.resolve(__dirname, process.env['WEBPACK_OUTPUT_PATH'] || '../dist'),
    chunkFilename: 'js/[name].[contenthash].js',
    filename: 'js/[name].[contenthash].js',
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.vue', ...styleSyntax.map(s => '.' + s)],
  },
  module: { rules: clientRules },
  plugins: [
    ...stylePlugins(),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(
      IS_PRODUCTION
        ? cleanWebpackPluginPrefs
        : {
            ...cleanWebpackPluginPrefs,
            cleanStaleWebpackAssets: false,
          },
    ),
    new HtmlWebpackPlugin(htmlOptions),
  ],
};

module.exports = config;
