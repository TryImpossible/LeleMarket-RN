// @ts-nocheck

const injectToBrowserStr = `
const messager = {
  hello: () => {
    return Promise.resolve('hello from browser');
  },
};

const callbacks = {};
const promises = {};

const invoker = {
  handler: async ({ data }) => {
    const message = JSON.parse(data);
    const {
      command,
      payload,
      meta: { isReply, id, isError = false },
    } = message;
    if (!isReply) {
      if (!window.ReactNativeWebView) throw Error('invoker is not create');
      if (!messager[command]) {
        throw Error(command + 'is not register');
      }
      const replyMsg = { command, meta: { isReply: true, isError: false, id } };
      try {
        const reuslt = await messager[command](payload);
        Object.assign(replyMsg, { payload: reuslt });
      } catch (error) {
        Object.assign(replyMsg.meta, { isError: true });
        Object.assign(replyMsg, { payload: error });
      }
      window.ReactNativeWebView.postMessage(JSON.stringify(replyMsg));
    } else {
      if (callbacks[id]) {
        const { success, fail } = callbacks[id];
        if (success && !isError) success(payload);
        if (fail && isError) fail(payload);
        delete callbacks[id];
      }
      if (promises[id]) {
        const { resolve, reject } = promises[id];
        if (!isError) resolve(payload);
        if (isError) reject(payload);
        delete promises[id];
      }
    }
  },
  register: (command, fn) => {
    messager[command] = fn;
  },
  unregister: command => {
    if (messager[command]) {
      delete messager[command];
    }
  },
  call: ({ action, data, callback }) => {
    if (!window.ReactNativeWebView) throw Error('invoker is not create');
    const id = Date.now();
    callbacks[id] = callback;
    const message = { command: action, payload: data, meta: { isReply: false, id } };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
    return new Promise((resolve, reject) => (promises[id] = { resolve, reject }));
  },
};

window.invoker = invoker;

document.addEventListener('message', e => invoker.handler(e));
window.addEventListener('message', e => invoker.handler(e));
`;

let webview = null;

const messager = {
  hello: () => {
    return Promise.resolve('hello from native');
  },
};

const callbacks = {};
const promises = {};

const invoker = {
  setup: (ref) => {
    webview = ref;
  },
  inject: () => {
    return `
    (function() {
      window.isAndroid = ${__ANDROID__};
      window.isIOS = ${__IOS__};
      ${injectToBrowserStr}
    })()
  `;
  },
  handler: async ({ nativeEvent: { data } }) => {
    const message = JSON.parse(data);
    const {
      command,
      payload,
      meta: { isReply, id, isError = false },
    } = message;
    if (!isReply) {
      if (!webview) {
        throw Error('invoker is not create');
      }
      if (!messager[command]) {
        throw Error(`${command} is not register`);
      }
      const replyMsg = { command, meta: { isReply: true, isError: false, id } };
      try {
        const reuslt = await messager[command](payload);
        Object.assign(replyMsg, { payload: reuslt });
      } catch (error) {
        Object.assign(replyMsg, { payload: error, meta: { ...replyMsg.meta, isError: true } });
      }
      webview.current?.postMessage(JSON.stringify(replyMsg));
    } else {
      if (callbacks[id]) {
        const { success, fail } = callbacks[id];
        if (success && !isError) {
          success(payload);
        }
        if (fail && isError) {
          fail(payload);
        }
        delete callbacks[id];
      }
      if (promises[id]) {
        const { resolve, reject } = promises[id];
        if (!isError) {
          resolve(payload);
        }
        if (isError) {
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
  call: ({ action, data, callback }) => {
    if (!webview) {
      throw Error('invoker is not create');
    }
    const id = Date.now();
    callbacks[id] = callback;
    const message = { command: action, payload: data, meta: { isReply: false, id } };
    webview.current?.postMessage(JSON.stringify(message));
    return new Promise((resolve, reject) => (promises[id] = { resolve, reject }));
  },
};

export default invoker;
