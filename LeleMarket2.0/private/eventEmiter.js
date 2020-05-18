// 简单实现了一下 subscribe 和 dispatch
const EventEmitter = {
  _events: {},
  dispatch(event, data) {
    if (!this._events[event]) {
      // 没有监听事件
      return;
    }
    for (let i = 0; i < this._events[event].length; i++) {
      console.log(this._events[event][i]);
      console.log('类型', typeof this._events[event][i]);
      this._events[event][i](data);
    }
  },
  subscribe(event, callback) {
    // 创建一个新事件数组
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(callback);
  }
};

EventEmitter.subscribe('namechanged', data => {
  console.log(data.name);
});
EventEmitter.subscribe('namechanged', data => {
  console.log(data.name);
});
EventEmitter.dispatch('namechanged', { name: 'John' });
