const { config } = require('dotenv');
const { resolve } = require('path');

module.exports = (env, projectRoot = './') => {
  // Overwriting -->
  [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env']
    .map(fileName => resolve(projectRoot, fileName))
    .forEach(file => {
      config({ path: file });
    });
};
