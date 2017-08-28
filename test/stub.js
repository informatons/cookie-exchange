
class EventTarget {

  constructor() {
    this._listeners = [];
  }

  addListener(fn) {
    this._listeners.push(fn);
  }

  removeListener(fn) {
    for (var i = 0, len = this._listeners.length; i < len; i++) {
      if (this._listeners[i] === fn) {
        return this._listeners.splice(i, 1);
      }
    }
  }

  nofifyListeners(...args) {
    this._listeners.forEach(i => i.apply(this, args));
  }
}

class Port {
  constructor() {
    this.onDisconnect = new EventTarget();
    this.onMessage = new EventTarget();
    this.calledCount = 0;
  }

  get calledOnce() {
    return this.calledCount === 1;
  }

  postMessage() {
    this.calledCount++;
  }
}
window.chrome = window.chrome || {};
window.chrome.runtime = window.chrome.runtime || {};
window.chrome.runtime.onMessageExternal = new EventTarget();
window.chrome.runtime.connect = () => {
  return new Port();
};
