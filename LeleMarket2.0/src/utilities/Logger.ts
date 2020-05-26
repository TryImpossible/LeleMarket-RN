// import FS from 'react-native-fs';
// import moment from 'moment';

// const LOG_INFO_PATH = `${FS.ExternalDirectoryPath}/log-info.txt`;

function formatting(data) {
  // const date = moment().format('YYYY-MM-DD HH:mm:ss:SSS');
  // const log = [];
  // log.push(`\n---------------------------${date} logging-start--------------------------\n`);
  // log.push(JSON.stringify(data, null, 2));
  // log.push(`\n---------------------------${date} logging-end--------------------------\n`);
  // return log.join('');
}

class Logger {
  static async info(data) {
    // if (__ANDROID__) {
    //   try {
    //     const isExist = await FS.exists(LOG_INFO_PATH);
    //     if (isExist) {
    //       const result = await FS.stat(LOG_INFO_PATH);
    //       if (result.ctime && moment().diff(result.ctime, 'day') > 1) {
    //         await FS.unlink(LOG_INFO_PATH);
    //       }
    //       await FS.appendFile(LOG_INFO_PATH, formatting(data));
    //     } else {
    //       await FS.write(LOG_INFO_PATH, formatting(data));
    //     }
    //   } catch (error) {}
    // }
  }
}

export default Logger;
