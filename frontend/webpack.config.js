/* eslint-disable @typescript-eslint/no-var-requires */
const configureEnv = require('./webpack-config/env');

module.exports = function (_env, argv) {
  configureEnv(argv.mode, __dirname); // .env* files should be placed alongside this file
  return require('./webpack-config')[argv.mode === 'production' ? 'prod' : 'dev'];
};
