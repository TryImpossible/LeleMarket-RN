let fs = require('fs');

let rootPath = './src/pages';

function getPageListFromDir(path) {
    let relativePath = path.replace('./src', '..');
    let pageList = [];
    let fileList = fs.readdirSync(path);
    let length = fileList.length;
    let file = null;
    for (let i = 0; i < length; i++) {
        file = fileList[i];
        if (file.indexOf('Page.js') != -1) {
            pageList.push({ name: file.substring(0, file.length - 3), path: relativePath + '/' + file });
        } else if (file.indexOf('DS_Store') == -1 && file.indexOf('.svn') == -1 && fs.statSync(path + '/' + file).isDirectory()) {
            dirPath = path + '/' + file;
            child = getPageListFromDir(dirPath);
            pageList = pageList.concat(child);
        } else {
            console.warn('忽略', path + '/' + file);
        }
    }
    return pageList;
}

try {
    let list = getPageListFromDir(rootPath);
    let start = "";

    let importPage = "";
    let pageMap = "const PAGES = [\n";

    // import WelcomePage from './page/user/WelcomePage';
    // static const PAGES = [{ name: 'CommonH5Page', page: CommonH5Page }];
    let length = list.length;
    for (let i = 1; i < length; i++) {
        importPage += `import ${list[i].name} from '${list[i].path}';\n`;
        pageMap += `\t{ name: '${list[i].name}', page: ${list[i].name} }${i == length - 1 ? '' : ','}\n`;
    }

    pageMap += "];";

    start += importPage;


    let end = pageMap
        + "\n export default PAGES;"

    fs.writeFileSync('./src/constants/PageRouter.js', start + end);
    console.log('SceneRoute 写入成功, 共' + list.length + '个Page');
} catch (e) {
    console.log(e)
}
//以文件名路由 在./src/page目录下，以Page.js 结尾的文件Page文件 执行命令 npm run init