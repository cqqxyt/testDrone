export function initGlobalAPI(vm) {
  vm.options = {};
  vm.mixin = function(options) {
    vm.options = mergeOptions(vm.options, options);
    return this;
  };

  vm.component = function(id, defineition) {};

  vm.extend = function(options) {
    const Super = this;
    const Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.extend = Super.extend;
    Sub.options = mergeOptions(Super.options, options);
    return Sub;
  };
}

var LIFECYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
  "activated",
  "deactivated",
  "errorCaptured",
  "serverPrefetch",
];

const strats = {};

LIFECYCLE_HOOKS.forEach((hook) => {
  strats[hook] = mergeHook;
});

function mergeHook(parent, child) {
  if (child) {
    if (parent) {
      return parent.concat(child);
    } else {
      return [child];
    }
  } else {
    return parent;
  }
}
function isObject(v) {
  return typeof v === "object";
}

export function callHook(vm, hook) {
  let handlers = vm.$options[hook];
  if (handlers) {
    handlers.forEach((handler) => {
      handler.call(vm);
    });
  }
}
export function mergeOptions(parent, child) {
  var opts = {};
  //obj {a:1} {a:2}->{a:2}
  //{a:1} {} ->{a:1}
  for (let key in parent) {
    mergeField(key);
  }

  for (let key in child) {
    if (!parent.hasOwnProperty(key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    if (strats[key]) {
      return (opts[key] = strats[key](parent[key], child[key]));
    }

    if (isObject(parent[key]) && isObject(child[key])) {
      opts[key] = { ...parent[key], ...child[key] };
    } else {
      if (child[key]) {
        opts[key] = child[key];
      } else {
        opts[key] = parent[key];
      }
    }
  }
  return opts;
}
