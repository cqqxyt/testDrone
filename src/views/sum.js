// 实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

// 实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

// 实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

// 实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。



class Watcher {}

class Dep {}
const templates =
  "<template id='test'>testtest<div style='color:red'>{{title}}</div></template>";
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
