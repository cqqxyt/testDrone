import { callHook, mergeOptions } from "./initGlobalAPI";
import initState from "./initState";

export function initMixin(vm) {
  vm.prototype._init = function(options) {
    const vm = this;
    vm.$options = mergeOptions(vm.constructor.options, options);
    callHook(vm, "beforeCreate");
    initState(vm);
    callHook(vm, "created");

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
