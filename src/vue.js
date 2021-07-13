import observe from "./observe";
import Compile from "./Compile";
import Watcher from "./watcher";
import { nextTick } from "./util";

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

function mountComponent(vm){
  let updateComponent = function(){
    vm._update(vm._render())
  }

  new Watcher(vm,updateComponent)
}
class Vue {
  constructor(options) {
    const vm = this;
    vm.$options = options;
    this.$options.$el = document.querySelector(options.el)
    this.$nextTick = nextTick
    this.initState(vm);
    mountComponent(vm)
    return vm;
  }
  _update(vnode){
   this.$options.$el = this.patch(this.$options.$el,vnode) 
  }

  _render(){
    const render = new Compile(this.$options.template);
    const vnode =  render.call(this);
    return vnode
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
    observe(vm._data);
  }
   patch(oldDom, vnode) {
     console.log('patch')
     console.log(oldDom,oldDom.nodeType)
    let dom;
    if (oldDom.nodeType) {
    const parent = oldDom.parentNode;
      dom = this.createDom(vnode);
      parent.insertBefore(dom, oldDom.nextSiblings);
      parent.removeChild(oldDom);
    }else{
      //diff
    }
    return dom;
  }
  createRealElement(el, vnode) {
    var oldDom = document.querySelector(el);
    const parent = oldDom.parentNode;
    const dom = this.patch(oldDom, vnode);
    parent.insertBefore(dom, oldDom.nextSiblings);
    parent.removeChild(oldDom);
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
    const text1 =  typeof text === "string" ? text : JSON.stringify(text);
    return text1
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
