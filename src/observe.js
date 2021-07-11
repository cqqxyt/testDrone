
const oldArrMethods = Array.prototype;
const arrMethods = Object.create(oldArrMethods);
const conMe = ["push", "pop", "splice"];
conMe.forEach(function(fn) {
  arrMethods[fn] = function(...args) {
    switch (fn) {
      case ("push", "pop"):
        this.__ob__.listenArr(args);
        break;
      case "splice":
        this.__ob__.listenArr(args.slice(2));
        break;
    }
    oldArrMethods[fn].apply(this, args);
  };
});

class Observer {
    constructor(dataObj) {
      Object.defineProperty(dataObj, "__ob__", {
        value: this,
        configurable: false,
        enumerable: false,
      });
      if (Array.isArray(dataObj)) {
        dataObj.__proto__ = arrMethods;
        this.listenArr(dataObj);
      } else {
        this.listenObj(dataObj);
      }
    }
    listenArr(arr) {
      arr.forEach((item) => {
        observe(item);
      });
    }
    listenObj(dataObj) {
      for (let key in dataObj) {
        let v = dataObj[key];
        observe(v);
        Object.defineProperty(dataObj, key, {
          enumerable: true, // 可枚举
          configurable: true, // 可修改
          set(value) {
            if (v === value) return;
            observe(value);
            v = value;
          },
          get() {
            return v;
          },
        });
      }
    }
  }
  
  function observe(v) {
    if (typeof v !== "object") {
      return;
    }
    new Observer(v);
  }

  export default observe
  