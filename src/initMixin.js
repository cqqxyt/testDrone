import { callHook, mergeOptions } from "./initGlobalAPI";
import initState from "./initState";

export function initMixin(vm) {
  vm.prototype._init = function(options) {
    const vm = this;
    console.log(vm.options);
    vm.$options = mergeOptions(vm.constructor.options, options);
    // vm.$el = options.el ? options.el : "";
    callHook(vm, "beforeCreate");
    initState(vm);
    callHook(vm, "created");

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
