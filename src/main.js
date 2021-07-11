// import Vue from "vue";
// import Actions from "./views/Actions";
import Vue from "./vue";
const templates =
  "<template id='test' style='color:red;font-size:16px;'>testtest<div style='color:red'>{{title}} aa bb {{message}}</div></template>";

new Vue({
  data() {
    return {
      message: [1, 2],
      title: "Hello Vue",
      a: { b: 2 },
    };
  },
  template: templates,
  // render: (h) => h(Actions),
}).$mount("#app");
