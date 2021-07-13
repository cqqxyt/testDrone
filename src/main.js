// import Vue from "vue";
// import Actions from "./views/Actions";
import Vue from "./vue";
// import Vue from "./vueO.js";
const templates =
  "<div id='templates' style='color:red;font-size:16px;'>testtest111<div style='color:red'>{{title}}  {{title}}  111 aa bb {{message[0].name}} {{message}} {{a.b}} </div></div>";

const app = new Vue({
  el: "#app",
  data() {
    return {
      message: [[{name:1},1, 2]],
      title: "Hello Vue",
      a: { b: 2 },
      test:1
    };
  },
  template: templates,
  // render: (h) => h(Actions),
}); //.$mount("#app");
setTimeout(()=>{
  // app.title = '123'
  // app.title = '456'

  app.message[0].push('test')
  // app.message[0].name = 'message'

  // app.$nextTick(()=>{
  //   console.log(document.querySelector("#templates").innerHTML)
  // })
},1000)


