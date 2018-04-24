
import { NetInfo } from "react-native";



const delay = (timeout = 3000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('请求超时');
    }, timeout);
  });
}

export const get = (action, params = {}, callback, pageName) => {

  NetInfo.isConnected.fetch().then(isConnected => {
    // console.warn('First, is ' + (isConnected ? 'online' : 'offline'));
    // console.warn(isConnected);
  });

  let url = `${Const.HOST}${action}?`;
  params && Object.keys(params).forEach(key => {
    url += `${key}=${params[key]}&`;
  });
  url = url.slice(0, url.length - 1);

  // 1.Tips: Body not allowed for GET or HEAD request,
  const init = {
    credentials: 'include', // 请求带上cookies，是每次请求保持会话一直 
    method: 'GET',
    mode: ' cors',
    cache: 'no-cache',
    headers: new Headers({
      // 'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'content-type': 'application/x-www-from-urlencoded',
    }),
  };

  Promise.race([fetch(url, init), delay()])
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return { code: -1, message: response.statusText };
      }
    })
    .then(responseData => callback && callback(responseData))
    .catch((error) => {
      callback({ code: -1, message: '错误，请检查!!!' });
    });
}

export const post = (action, form = null, callback, pageName) => {
  let url = `${Const.HOST}${action}`;
  const init = {
    credentials: 'include', // 请求带上cookies，是每次请求保持会话一直 
    body: form, // must match 'Content-Type' header
    // body: JSON.stringify(params), //must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    // headers: new Headers({
    //   'content-type': 'application/json',
    //   'Content-Type':'multipart/form-data', 
    //   'Access-Control-Allow-Origin': '*'
    // }),
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  };
  // 上传文件，FormData
  // let file = {uri: params.path, type: 'application/octet-stream', name: 'image.jpg'}

  Promise.race([fetch(url, init), delay()])
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return { code: -1, message: response.statusText };
      }
    })
    .then(responseData => callback && callback(responseData))
    .catch((error) => {
      callback && callback({ code: -1, message: '错误，请检查!!!' });
    });
}

// method: GET/POST...
// headers: 和其他header设置一样，主要设置Content-type和自定义header；
// body: 要传递的数据
// mode: cors / no-cors / same-origin，默认为 no-cors
// credentials: omit / same-origin / include
// cache: default / no-store / reload / no-cache / force-cache / only-if-cached
// redirect: follow / error / manual
// referrer: no-referrer / client / 
// referrerPolicy: no-referrer / no-referrer-when-downgrade / origin /  origin-when-cross-origin / unsafe-url
// integrity:

// if(response.ok){  //避免404与500这样的响应
//   return response.json();
// } else {
// console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
// }

// Fetch常见坑
// Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
// 服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。

