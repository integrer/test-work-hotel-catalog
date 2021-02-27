const path = require('path');

////////////////////////////////
// Webpack server config
////////////////////////////////

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

////////////////////////////////
// Webpack plugins
////////////////////////////////

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
  resolve: {
    extensions: ['*', '.js', '.ts', '.vue', ...styleSyntax.map(s => '.' + s)],
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
