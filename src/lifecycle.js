import { createDom } from "./vdom";
import Watcher from "./watcher";

export function lifecycle(vm) {
  vm.prototype._update = function(vnode) {
    console.log(this.$el);
    this.$el = patch(this.$el, vnode);
  };
}

function patch(oldDom, vnode) {
  let dom;
  if (oldDom.nodeType) {
    const parent = oldDom.parentNode;
    dom = createDom(vnode);
    parent.insertBefore(dom, oldDom.nextSiblings);
    parent.removeChild(oldDom);
  } else {
    //diff
  }
  return dom;
}
export function mountComponent(vm, el) {
  vm.$el = el;
  let updateComponent = function() {
    vm._update(vm._render());
  };
  new Watcher(vm, updateComponent);
}
