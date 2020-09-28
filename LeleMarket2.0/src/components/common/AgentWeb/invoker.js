// @ts-nocheck

const injectToBrowserStr = `
const invoker = (function () {
  const messager = {
    hello: () => {
      return Promise.resolve('hello from browser');
    },
  };

  const callbacks = {};
  const promises = {};

  return {
    handler: async ({ data }) => {
      
      const message = JSON.parse(data);
      const {
        command,
        payload = {},
        meta: { isReply, id, fullfilled = false, rejected = false },
      } = message;
      if (!isReply) {
        if (!window.ReactNativeWebView) {
          throw Error('invoker is not create');
        }
        if (!messager[command]) {
          throw Error(command + 'is not register');
        }
        
        const replyMsg = { command, meta: { isReply: true, id } };
        try {
          const reuslt = await messager[command]({
            ...payload,
            onProgress: (p) => {
              Object.assign(replyMsg, { payload: p });
              window.ReactNativeWebView.postMessage(JSON.stringify(replyMsg));
            },
          });
          Object.assign(replyMsg, { payload: reuslt, meta: { ...replyMsg.meta, fullfilled: true } });
        } catch (error) {
          Object.assign(replyMsg, { payload: error, meta: { ...replyMsg.meta, rejected: true } });
        }
        window.ReactNativeWebView.postMessage(JSON.stringify(replyMsg));
      } else {
        if (callbacks[id]) {
          const { success, fail, progress } = callbacks[id];
          if (progress && !fullfilled && !rejected) {
            progress(payload);
          }
          if (success && fullfilled) {
            success(payload);
            delete callbacks[id];
          }
          if (fail && rejected) {
            fail(payload);
            delete callbacks[id];
          }
        }
        if (promises[id]) {
          const { resolve, reject } = promises[id];
          if (resolve && fullfilled) {
            resolve(payload);
          }
          if (reject && rejected) {
            reject(payload);
          }
          delete promises[id];
        }
      }
    },
    register: (command, fn) => {
      messager[command] = fn;
    },
    unregister: (command) => {
      if (messager[command]) {
        delete messager[command];
      }
    },
    call: ({ command, data, callback }) => {
      if (!window.ReactNativeWebView) {
        throw Error('invoker is not create');
      }
      const id = Date.now();
      callbacks[id] = callback;
      const message = { command, payload: data, meta: { isReply: false, id } };
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
      return new Promise((resolve, reject) => (promises[id] = { resolve, reject }));
    },
  };
})();

window.invoker = invoker;

document.addEventListener('message', (e) => invoker.handler(e));
window.addEventListener('message', (e) => invoker.handler(e));
`;

const invoker = (function () {
  let webview = null;

  const messager = {
    hello: () => {
      return Promise.resolve('hello from native');
    },
  };

  const callbacks = {};
  const promises = {};

  return {
    setup: (ref) => {
      webview = ref;
    },
    inject: () => {
      return `
      (function() {
        window.isAndroid = ${__ANDROID__};
        window.isIOS = ${__IOS__};
        window.statusBarHeight = ${Dimens.statusBarHeight}
        ${injectToBrowserStr}
      })()
    `;
    },
    handler: async ({ nativeEvent: { data } }) => {
      const message = JSON.parse(data);
      const {
        command,
        payload = {},
        meta: { isReply, id, fullfilled = false, rejected = false },
      } = message;
      if (!isReply) {
        if (!webview) {
          throw Error('invoker is not create');
        }
        if (!messager[command]) {
          throw Error(`${command} is not register`);
        }
        const replyMsg = { command, meta: { isReply: true, id } };
        try {
          const reuslt = await messager[command]({
            ...payload,
            onProgress: (p) => {
              Object.assign(replyMsg, { payload: p });
              webview.current?.postMessage(JSON.stringify(replyMsg));
            },
          });
          Object.assign(replyMsg, { payload: reuslt, meta: { ...replyMsg.meta, fullfilled: true } });
        } catch (error) {
          Object.assign(replyMsg, { payload: error, meta: { ...replyMsg.meta, rejected: true } });
        }
        webview.current?.postMessage(JSON.stringify(replyMsg));
      } else {
        if (callbacks[id]) {
          const { success, fail, progress } = callbacks[id];
          if (progress && !fullfilled && !rejected) {
            progress(payload);
          }
          if (success && fullfilled) {
            success(payload);
            delete callbacks[id];
          }
          if (fail && rejected) {
            fail(payload);
            delete callbacks[id];
          }
        }
        if (promises[id]) {
          const { resolve, reject } = promises[id];
          if (resolve && fullfilled) {
            resolve(payload);
          }
          if (reject && rejected) {
            reject(payload);
          }
          delete promises[id];
        }
      }
    },
    register: (command, fn) => {
      messager[command] = fn;
    },
    unregister: (command) => {
      if (messager[command]) {
        delete messager[command];
      }
    },
    call: ({ command, data, callback }) => {
      if (!webview) {
        throw Error('invoker is not create');
      }
      const id = Date.now();
      callbacks[id] = callback;
      const message = { command, payload: data, meta: { isReply: false, id } };
      webview.current?.postMessage(JSON.stringify(message));
      return new Promise((resolve, reject) => (promises[id] = { resolve, reject }));
    },
  };
})();

export default invoker;
