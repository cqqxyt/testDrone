const data = [
  {
    id: "1",
    sub: [
      {
        id: "2",
        sub: [
          {
            id: "3",
            sub: null,
          },
          {
            id: "4",
            sub: [
              {
                id: "6",
                sub: null,
              },
            ],
          },
          {
            id: "5",
            sub: null,
          },
        ],
      },
    ],
  },
  {
    id: "7",
    sub: [
      {
        id: "8",
        sub: [
          {
            id: "9",
            sub: null,
          },
        ],
      },
    ],
  },
  {
    id: "10",
    sub: null,
  },
];
function findPath(data, id) {
  const arr = [];

  function get(arr, obj) {
    obj.forEach((item) => {
      arr.push(item.id);
      if (item.id === id) {
        return;
      }
      if (item.sub === null) {
        arr.length = 0;
      }
      if (item.sub !== null) {
        get(arr, item.sub);
      }
    });
    console.log(arr);
    return arr;
  }

  return get(arr, data);
}

// findPath(data, "9");

//id = "1" => ["1"]
// id = "9" => ["7", "8", "9"]
// id = "100"=> []
// PS: id 全局唯一，无序

function getUrlParam(sUrl, sKey) {
  const obj = {};
  const arr = sUrl
    .split("?")[1]
    .split("#")[0]
    .split("&");
  arr.forEach((item) => {
    const key = item.split("=")[0];
    const value = item.split("=")[1];
    if (!(key in obj)) {
      obj[key] = value;
    } else {
      obj[key] = Array.from(obj[key]);
      obj[key].push(value);
    }
  });
  if (!sKey) {
    return obj;
  }
  return obj[sKey] ? obj[sKey] : "";
}
const url = "http://www.nowcoder.com?key=1&key=2&key=3&key=4&test=4#hehe";
// console.log(getUrlParam(url).key);
Array.prototype.uniq = function() {
  const arr = [];
  var hasNaN = false;
  this.forEach(function(item) {
    if (item instanceof Object) {
      arr.push(item);
    } else if (arr.indexOf(item) === -1) {
      if (item !== item) {
        if (!hasNaN) {
          hasNaN = true;
          arr.push(item);
        }
      } else {
        arr.push(item);
      }
    }
  });
  return arr;
};

function test() {
  var a = [
    true,
    false,
    null,
    undefined,
    NaN,
    0,
    1,
    {},
    {},
    "a",
    "a",
    NaN,
  ].uniq();
  console.log(a);
  return (
    a.length === 10 &&
    a[1] === false &&
    a[0] === true &&
    a[3] === undefined &&
    a[2] === null &&
    isNaN(a[4])
  );
}
// console.log(test());

class EventBus {
  constructor() {
    this.eventList = [];
  }

  on(key, fn) {
    if (!this.eventList[key]) {
      this.eventList[key] = [];
    }
    this.eventList[key].push(fn);
  }

  emit() {
    const key = Array.prototype.shift.call(arguments);
    const fns = this.eventList[key];
    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, arguments);
    }
  }
}
const o = new EventBus();
o.on("event1", function(price) {
  console.log(price);
});

o.on("event2", function(price) {
  console.log(price);
});

// o.emit("event1", 88);
// o.trigger(2, 200);

// function deepClone(obj) {
//   if (!obj) {
//     return;
//   }
//   let newObj;
//   if (obj.constructor === Object) {
//     newObj = {};
//   } else if (obj.constructor === Array) {
//     newObj = [];
//   } else if (obj.constructor === Function) {
//     newObj = function() {};
//   }
//   for (let i in obj) {
//     if (obj[i] instanceof Object) {
//       newObj[i] = deepClone(obj[i]);
//     } else {
//       newObj[i] = obj[i];
//     }
//   }
//   return newObj;
// }
// const obj = {
//   g: function() {
//     console.log(1);
//   },
//   a: { name: 1 },
//   b: { c: { d: { v: [1, 2] } } },
// };
// 实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

// 实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

// 实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

// 实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。

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
          console.log("set");
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
class Vue1 {
  constructor(options) {
    const vm = this;
    vm.$options = options;
    vm._data =
      typeof options.data === "function" ? options.data.call(this) : data;
    observe(this._data);

    new Compile(options.template, this._data);
    return vm;
  }
}

export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

// Regular Expressions for parsing tags and attributes
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/;
const conditionalComment = /^<!\[/;
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
class Compile {
  constructor(template, data) {
    this.compileToFunctions(template);
  }
  compileToFunctions(template) {
    parseHTML(template);
  }
}
function parseHTML(html) {
  var index = 0;
  const start = parseStartMatch();

  function advance(n) {
    index += n;
    html = html.substring(n);
  }
  function parseStartMatch() {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
        index: index,
      };
      advance(start[0].length);
      let close, attr;
      while (
        !(close = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        attr.start = index;
        advance(attr[0].length);
        console.log(attr);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (close) {
        advance(close[0].length);
        match.end = index;
      }
      return match;
    }
  }
}

class Watcher {}

class Dep {}
const templates = "<template id='test'><div>{{title}}</div><template>";
const app = new Vue1({
  el: "#test",
  data() {
    return {
      message: [1, 2],
      title: "Hello Vue",
      a: { b: 2 },
    };
  },
  template: templates,
  //   render: (h) => h(templates),
});
app._data.message.splice(0, 0, { name: 1 });
app._data.message[0].name = 1;
// console.log(app._data.message);
