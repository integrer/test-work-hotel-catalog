/* eslint-disable @typescript-eslint/no-var-requires */
const configureEnv = require('./webpack-config/env');
const { parseEntries } = require('./webpack-config/parse-args');
const getConfig = require('./webpack-config');

module.exports = function (env, argv) {
  const { mode } = argv;
  configureEnv(mode, __dirname); // .env* files should be placed alongside this file
  const styleSyntax = ['css', 'scss', 'sass'];
  const entries = parseEntries(env.entries);
  return entries.map(entry =>
    getConfig({ mode, entry, projectRoot: __dirname, styleSyntax, serve: env.WEBPACK_SERVE }),
  );
};
