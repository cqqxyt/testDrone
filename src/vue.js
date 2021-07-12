import observe from "./observe";
import Compile from "./Compile";
function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    get() {
      return target[sourceKey][key];
    },
    set(value) {
      target[sourceKey][key] = value;
    },
  });
}
class Vue {
  constructor(options) {
    const vm = this;
    vm.$options = options;
    this.initState(vm);
    const render = new Compile(options.template);
    this.$options.render = render;
    const vnode = render.call(vm);
    this.createRealElement(options.el, vnode);
    return vm;
  }
  initState(vm) {
    var data = vm.$options.data;
    data = vm._data =
      typeof vm.$options.data === "function"
        ? vm.$options.data.call(vm, vm)
        : vm.$options.data;
    for (let key in data) {
      proxy(vm, "_data", key);
    }
    observe(vm);
  }

  createRealElement(el, vnode) {
    var oldDom = document.querySelector(el);
    const parent = oldDom.parentNode;
    const dom = this.patch(oldDom, vnode);
    parent.insertBefore(dom, oldDom.nextSiblings);
    parent.removeChild(oldDom);
  }
  patch(oldDom, vnode) {
    console.log(oldDom.nodeType);
    let root;
    if (oldDom.nodeType) {
      root = this.createDom(vnode);
    }
    return root;
  }
  createDom(node) {
    let { tag, children, text, data } = node;
    if (typeof tag === "string") {
      node.el = document.createElement(tag);
      Object.keys(data).map((item) => {
        node.el.setAttribute(item, data[item]);
      });
      children.forEach((child) => {
        node.el.appendChild(this.createDom(child));
      });
    } else {
      node.el = document.createTextNode(text);
    }
    return node.el;
  }
  $mount(el) {
    const root = document.querySelector(el);
    this.$el = el;
    root.appendChild(this.vdom);
  }
  _c(...args) {
    return createElement(...args);
  }

  _v(...args) {
    return createText(...args);
  }

  _s(text) {
    return typeof text === "string" ? text : JSON.stringify(text);
  }
}

function createElement(tag, data = {}, ...children) {
  return VNode(tag, data, children);
}

function createText(text) {
  return VNode(undefined, undefined, undefined, text);
}

function VNode(
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  return {
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory,
  };
}

export default Vue;
