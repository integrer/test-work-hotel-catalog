/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = function (_env, argv) {
  return require('./webpack-config')[argv.mode === 'production' ? 'prod' : 'dev'];
};
