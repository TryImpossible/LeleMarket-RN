const fs = require('fs');
const path = require('path');
const logger = require('../logger');
const { beautify, rewriteExport } = require('./utils');

const SVG_SOURCE_DIR_PATH = path.resolve(__dirname, '../../svg');

const SVG_DEST_DIR_PATH = path.resolve(__dirname, '../../src/resources/svg');

function writeSVGFile() {
  const files = fs.readdirSync(SVG_SOURCE_DIR_PATH);
  files.forEach(file => {
    const content = `export default ${JSON.stringify(fs.readFileSync(path.join(SVG_SOURCE_DIR_PATH, file), 'utf-8'))}`;
    const filepath = path.join(SVG_DEST_DIR_PATH, file.replace(/svg$/i, 'js'));
    fs.writeFileSync(filepath, content);
    beautify(filepath);
  });
}

(function main() {
  writeSVGFile();
  rewriteExport(SVG_DEST_DIR_PATH);
  logger.info('generate satic svgfile successfully');
})();
