export class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (value) => {
          state[key] = value;
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach((observer) => {
              if (observer) observer(value);
            });
          }
        },
      });
    }
  }

  subscribe(key, callback) {
    Array.isArray(this.observers[key])
      ? this.observers[key].push(callback)
      : (this.observers[key] = [callback]);
    const indexKey = this.observers[key].length - 1;
    return indexKey;
  }
  unSubscribe(key, indexKey) {
    this.observers[key][indexKey] = null;
  }
}
