const path = require('path');

////////////////////////////////
// Webpack server config
////////////////////////////////

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

////////////////////////////////
// Webpack plugins
////////////////////////////////

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const { styleLoaders, stylePlugins } = require('./styles');

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
    use: styleLoaders(syntax, IS_PRODUCTION),
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
  plugins: [...stylePlugins(), new VueLoaderPlugin()],
};

const mergeStrategy = { 'module.rules.use': 'prepend' };

const cleanWebpackPluginPrefs = {
  cleanOnceBeforeBuildPatterns: [
    ...['build.js', '*.bundle.js', 'style.css', '*.style.css'].flatMap(n => [n, n + '.map']),
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
