require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
require('babel-polyfill');

/////////////
// PostCSS plugins
/////////////

const postCssCssNano = require('cssnano');
const postCssAutoprefixer = require('autoprefixer');
const postCssUrl = require('postcss-url');
const postCssPresetEnv = require('postcss-preset-env');
const postCssFlexBugsFixes = require('postcss-flexbugs-fixes');

////////////////////////////////
// Webpack server config
////////////////////////////////

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

////////////////////////////////
// Webpack plugins
////////////////////////////////

const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

////////////////////////////////
// Misc
////////////////////////////////

const DartSass = require('sass');
const Fibers = require('fibers');

/**
 * Loader chain for style factory
 *
 * @param {'css'|'scss'|'sass'} syntax - Style syntax kind
 * @param {boolean} isExtract - Denotes if css chunks extraction is required
 * @returns {webpack.RuleSetUseItem[]} Loader chain
 */
const styleLoader = (syntax, isExtract = true) => [
  ...(isExtract ? [{ loader: ExtractCssChunks.loader, options: { hmr: !IS_PRODUCTION } }] : []),
  {
    loader: 'css-loader',
    options: {
      sourceMap: !IS_PRODUCTION,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: !IS_PRODUCTION,
      postcssOptions: {
        plugins: [
          postCssFlexBugsFixes(),
          postCssPresetEnv(),
          postCssUrl(),
          postCssAutoprefixer(),
          ...(IS_PRODUCTION ? [postCssCssNano()] : []),
        ],
      },
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: !IS_PRODUCTION,
      implementation: DartSass,
      sassOptions: {
        fiber: Fibers,
        indentedSyntax: syntax === 'sass',
      },
    },
  },
];

const clientRules = [
  {
    test: /\.js$/,
    use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } },
  },
  {
    test: /\.vue$/,
    use: ['vue-loader'],
  },
  ...['sass', 'scss', 'css'].map(syntax => ({
    test: new RegExp(`\\.${syntax}$`),
    use: styleLoader(syntax),
  })),
  {
    test: /\.(jpe?g|gif|png|svg|woff|woff2|eot|ttf|otf)$/,
    use: { loader: 'file-loader', options: { esModule: false } },
  },
];

const config = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: { build: ['./src', 'bootstrap'] },
  output: {
    path: path.resolve(__dirname, process.env['WEBPACK_OUTPUT_PATH'] || '../dist'),
    chunkFilename: 'js/[name].js?[hash]',
    filename: 'js/[name].js?[hash]',
  },
  module: { rules: clientRules },
  plugins: [
    new ExtractCssChunks({
      filename: 'css/[name].css?[hash]',
      chunkFilename: 'css/[name].css?[hash]',
    }),
    new VueLoaderPlugin(),
  ],
};

const mergeStrategy = { 'module.rules.use': 'prepend' };

const cleanWebpackPluginPrefs = {
  cleanOnceBeforeBuildPatterns: [
    'build.js',
    'build.js.map',
    '*.bundle.js',
    '*.bundle.js.map',
    'style.css',
    'style.css.map',
    '*.style.css',
    '*.style.css.map',
    '/css/**',
    'index.html',
  ],
};

const htmlOptions = {
  inject: false,
  template: require('html-webpack-template'),

  appMountId: 'app',
  lang: 'ru',
  title: 'Каталог гостиниц',
  mobile: true,
};

module.exports = {
  config,
  mergeStrategy,
  htmlOptions,
  cleanWebpackPluginPrefs,
};
