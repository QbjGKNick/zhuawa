function EventEmitter() {
  this._events = {};
}

EventEmitter.prototype.on = function (eventName, cb) {
  if (!this._events) this._events = {};
  let eventList = this._events[eventName] || (this._events[eventName] = []);
  eventList.push(cb);
};

EventEmitter.prototype.emit = function (eventName, ...rest) {
  this._events[eventName] &&
    this._events[eventName].forEach((cb) => cb(...rest));
};

// emit 和 on 是不是无耦合的。
// 观察者，是有耦合的。

EventEmitter.prototype.off = function (eventName, cb) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(
      (item) => item !== cb && item.cb !== cb
    );
  }
};

EventEmitter.prototype.once = function (eventName, cb) {
  const once = (...rest) => {
    cb(...rest);
    this.off(eventName, once);
  };

  once.cb = cb;
  this.on(eventName, once);
};

const e = new EventEmitter();
const handle1 = function (msg) {
  console.log(`hello1 ${msg}`);
};

const handle2 = function (msg) {
  console.log(`hello2 ${msg}`);
};

e.on("data", handle1);
e.once("data", handle2);

e.off("data", handle2);

setTimeout(() => {
  e.emit("data", "jqb");
  e.emit("data", "nick");
});
