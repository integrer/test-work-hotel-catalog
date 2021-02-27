/* eslint-disable @typescript-eslint/no-var-requires */
const configureEnv = require('./webpack-config/env');

module.exports = function (_env, argv) {
  configureEnv(argv.mode); //, process.cwd());
  return require('./webpack-config')[argv.mode === 'production' ? 'prod' : 'dev'];
};
