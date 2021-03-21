const path = require('path');

////////////////////////////////
// Webpack plugins
////////////////////////////////

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

const { styleLoaders, stylePlugins } = require('./styles');

/**
 * @param root0
 * @param root0.mode
 * @param root0.styleSyntax
 * @param root0.entry
 * @param root0.projectRoot
 * @param root0.serve
 */
function getConfig({ mode = 'production', styleSyntax, entry, projectRoot = './', serve = false } = {}) {
  const isProduction = mode === 'production';

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
      use: styleLoaders(syntax, isProduction),
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

  return {
    mode,
    entry: path.resolve(projectRoot, 'src', entry),
    // browserslist prevents live reload in dev server
    target: serve ? 'web' : `browserslist:${isProduction ? entry : 'development'}`,
    devtool: isProduction ? 'inline-source-map' : 'nosources-cheap-source-map',
    output: {
      path: process.env['WEBPACK_OUTPUT_PATH'] || path.resolve(projectRoot, 'dist', entry),
      chunkFilename: 'js/[name].[contenthash].js',
      filename: 'js/[name].[contenthash].js',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: 1,
            name: 'vendors',
            chunks: 'initial',
            enforce: true,
          },
        },
      },
    },
    resolve: {
      extensions: ['*', '.js', '.ts', '.vue', ...styleSyntax.map(s => '.' + s)],
    },
    module: { rules: clientRules },
    plugins: [
      ...stylePlugins(),
      new VueLoaderPlugin(),
      new CleanWebpackPlugin(
        isProduction
          ? cleanWebpackPluginPrefs
          : {
              ...cleanWebpackPluginPrefs,
              cleanStaleWebpackAssets: false,
            },
      ),
      ...(serve ? [new webpack.HotModuleReplacementPlugin()] : []),
      new HtmlWebpackPlugin(htmlOptions),
    ],
  };
}

const cleanWebpackPluginPrefs = { cleanOnceBeforeBuildPatterns: ['/js/**', '/css/**', 'index.html'] };

const htmlOptions = {
  template: require('html-webpack-template'),

  appMountId: 'app',
  lang: 'ru',
  title: 'Каталог гостиниц',
  mobile: true,
};

module.exports = getConfig;
