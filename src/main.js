// import Vue from "vue";
// import Actions from "./views/Actions";
import Vue from "./vue";
// import Vue from "./vueO.js";
const templates =
  "<div id='test' style='color:red;font-size:16px;'>testtest111<div style='color:red'>{{title}}111 aa bb {{message}}  {{a.b}} </div></div>";

const app = new Vue({
  el: "#app",
  data() {
    return {
      message: [1, 2],
      title: "Hello Vue",
      a: { b: 2 },
    };
  },
  template: templates,
  // render: (h) => h(Actions),
}); //.$mount("#app");

console.log(app);
