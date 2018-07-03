let fs = require('fs');

let rootPath = './svg';

let fileList = fs.readdirSync(rootPath);
let length = fileList.length;
let file = null;

let cst = "export default class SVGMap { \n";
let ret = "\tstatic _SVG_MAP = { ";
for (let i = 0; i < length; i++) {
    file = fileList[i];
    if (file.indexOf('.svg') != -1) {
        fileName = file.replace('.svg', '');
        fileContent = fs.readFileSync(rootPath + '/' + file, 'UTF-8');
        fileContent = fileContent.replace('<?xml version="1.0" standalone="no"?>', '');
        fileContent = fileContent.replace('<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">', '');
        fileContent = fileContent.replace('xmlns="http://www.w3.org/2000/svg"', '');
        fileContent = fileContent.replace('xmlns:xlink="http://www.w3.org/1999/xlink"', '');
        fileContent = fileContent.replace(/\n/g, '');
        fileContent = JSON.stringify(fileContent);
        cst += "\tstatic " + fileName + " = " + fileContent + ";" + "\n";
        ret += "'" + fileName + "' : SVGMap." + fileName + ",";
    } else {
        console.warn('忽略', file);
    }
}
ret += "}\n";
cst += ret;
cst += "}";
fs.writeFileSync('./src/constants/SVGMap.js', cst);
console.log('svg 写入成功')
//以文件名路由 在./svg目录下，以.svg 结尾的文件Page文件 执行命令 npm run init