const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { beautify } = require('../utils/utils');

const ENV_DIR_PATH = path.resolve(__dirname, '../../'); // env文件所在目录

const CONFIG_FILE_PATH = path.resolve(__dirname, '../../src/config.temp.js'); // config.js文件路径

(function () {
  // 通过系统变量，读取文件
  let envfile = process.env.ENVFILE || '.env';
  if (envfile === '.env') {
    // dev环境下，优先使用.env.local文件
    if (fs.existsSync(path.join(ENV_DIR_PATH, '.env.local'))) {
      envfile = '.env.local';
    }
  }

  const rl = readline.createInterface({ input: fs.createReadStream(path.join(ENV_DIR_PATH, envfile)) });
  const config = ["// don't edit this file manually\n\n\n"];
  // 逐行读取env文件
  rl.on('line', (input) => {
    const matcher = input.match(/^\s*(?:export\s+|)([\w\d\.\-_]+)\s*=\s*['"]?(.*?)?['"]?\s*$/);
    if (matcher && matcher.length >= 3) {
      config.push(`export const ${matcher[1].replace(/\s/g, '')} = ${JSON.stringify(matcher[2])};\n`);
    } else {
      config.push(input + '\n');
    }
  });
  rl.on('close', () => {
    fs.writeFileSync(CONFIG_FILE_PATH, config.join(''));
    beautify(CONFIG_FILE_PATH);
    process.exit();
  });
})();
