let fs = require('fs');

let rootPath = './src/imgs';

let fileList = fs.readdirSync(rootPath);
let length = fileList.length;
let file = null;

let allSvg = [];
for (let i = 0; i < length; i++) {
    file = fileList[i];
    if (isFile(file) == 1) {
        fileName = file.replace('.jpg', '');
        fileName = file.replace('.png', '');
        allSvg.push({ key: 'imgs/' + file, path: './src/imgs/' + file });
    }
}

function getPageList(rootPath) {
    let fileList = fs.readdirSync(rootPath);
    let length = fileList.length;
    let file = null;
    for (let i = 0; i < length; i++) {
        filePath = fileList[i];
        let status = isFile(filePath);
        if (status == 1) {
            allFile.push({ path: (rootPath + '/' + filePath), src: fs.readFileSync(rootPath + '/' + filePath, 'UTF-8') });
        } else if (status == 0) {
            getPageList(rootPath + '/' + filePath);
        }
    }
}

function isFile(filePath) {
    if (filePath.indexOf('.') != -1) {
        if (filePath.indexOf('.') == 0 || filePath.indexOf('SVGMap') != -1) {
            return 2;
        }
        return 1;
    } else {
        return 0;
    }
}

function indexOfFile(filePath, targetText) {
    let fileContent = fs.readFileSync(filePath, 'UTF-8');
    return fileContent.indexOf(targetText);
}

let allFile = [];
getPageList('./src');
//全部文件 allFile
//全部svg allSvg關鍵字
// console.log(allSvg)

// return;

length = allSvg.length;
count = allFile.length;

let result = [];
let usedList = [];
for (let i = 0; i < length; i++) {
    isUsed = false;
    srcFile = '';
    for (let j = 0; j < count; j++) {
        if (allFile[j].src.indexOf(allSvg[i].key) != -1) {
            isUsed = true;
            srcFile = allFile[j].path;
            break;
        }
    }
    if (!isUsed) {
        result.push({ path: allSvg[i].path, isUsed: isUsed, srcFile: srcFile })
    } else {
        usedList.push({ path: allSvg[i].path, isUsed: isUsed, srcFile: srcFile });
    }
}


console.log(result);
console.log('檢測到' + result.length + '個無用圖片文件，' + usedList.length + '個有用文件');
//搜索 'add_w'

function deleteFile(list) {
    console.log('=====')
    let l = list.length;
    for (let i = 0; i < l; i++) {
        console.log('刪除' + list[i].path);
        fs.unlinkSync(list[i].path);
    }
}

function read(prompt, callback) {
    process.stdout.write(prompt + ':');
    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', function (chunk) {
        process.stdin.pause();
        callback(chunk);
    });
}
// console.log(usedList);
if (result.length != 0) {
    read('是否刪除？(y/n)', (code) => {
        if (code.trim() == 'y') {
            console.log('執行刪除')
            deleteFile(result);
        }
    })
}