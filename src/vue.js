import { nextTick } from "./util";
import renderMixin from "./renderMixin";
import { lifecycle, mountComponent } from "./lifecycle";
import { initMixin } from "./initMixin";
import { stateMixin } from "./stateMixin";
import { initGlobalAPI } from "./initGlobalAPI";
function Vue(options) {
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
renderMixin(Vue);
lifecycle(Vue);

initGlobalAPI(Vue);

Vue.prototype.$nextTick = nextTick;
Vue.prototype.$mount = function(el) {
  el = document.querySelector(el);
  this.$el = el;
  return mountComponent(this, el);
};

export default Vue;
