import Vue from "vue";
import Actions from "./views/Actions";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(Actions)
}).$mount("#app");
