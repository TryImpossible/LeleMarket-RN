/**
 * 格式化时间
 * @param {*} date
 * @param {*} fmt
 */
export function formate(date = new Date(), fmt = 'yyyy/MM/dd hh:mm') {
  const obj = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  Object.keys(obj).forEach(k => {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? obj[k] : `00${obj[k]}`.substr(`${obj[k]}`.length));
    }
  });
  return fmt;
}

export function isToday(timestamp) {
  let date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  date = new Date();
  if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
    return true;
  }
  return false;
}

export function isCurrentWeek(timestamp) {
  const now = new Date();
  const day = now.getDay();
  const week = '7123456';
  const first = 0 - week.indexOf(day);
  const f = new Date();
  f.setDate(f.getDate() + first);
  const last = 6 - week.indexOf(day);
  const l = new Date();
  l.setDate(l.getDate() + last);
  if (timestamp >= f.getTime() && timestamp <= l.getTime()) {
    return true;
  }
  return false;
}

export function getWeekDay(date = new Date()) {
  const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return week[date.getDay()];
}

export function getCurrentTime() {
  return Date.parse(new Date());
}

export function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}

export function getCurrentMonth() {
  const date = new Date();
  return date.getMonth() + 1;
}
