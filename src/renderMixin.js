import Compile from "./Compile";
import { createElement, createText } from "./vdom";
function renderMixin(vm) {
  vm.prototype._render = function() {
    const render = new Compile(this.$options.template);
    const vnode = render.call(this);
    return vnode;
  };
  vm.prototype._c = function(...args) {
    return createElement(...args);
  };
  vm.prototype._v = function(...args) {
    return createText(...args);
  };

  vm.prototype._s = function(text) {
    const text1 = typeof text === "string" ? text : JSON.stringify(text);
    return text1;
  };
}

export default renderMixin;
