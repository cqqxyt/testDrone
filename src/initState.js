import observe from "./observe";
function initState(vm) {
  const opts = vm.$options;

  if (opts.data) {
    initData(vm);
  }
}

function initData(vm) {
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

export default initState;
