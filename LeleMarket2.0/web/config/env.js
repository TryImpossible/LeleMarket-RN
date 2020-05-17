'use strict';

const path = require('path');
const dotenv = require('dotenv');
const appDirectory = path.resolve(__dirname, '../../');

function getClientEnvironment(fileName) {
  const { parsed: raw } = dotenv.config({
    path: path.resolve(appDirectory, fileName),
  }) || { parsed: {} };

  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
  return stringified;
}

module.exports = getClientEnvironment;
