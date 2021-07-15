// import Vue from "./vue.esm.browser";
// import Actions from "./views/Actions";
import Vue from "./vue";
// import Vue from "./vueO.js";
// 创建构造器
// var Profile = Vue.extend({
//   template: "<p>{{firstName}} {{lastName}} aka {{alias}}</p>",
//   data: function() {
//     return {
//       firstName: "Walter",
//       lastName: "White",
//       alias: "Heisenberg",
//     };
//   },
// });
// console.log(new Profile());
// new Profile().$mount("#test");
const templates = `<div id='templates' style='color:red;font-size:16px;'>
{{dom}}
<div v-bind:style='style'>
{{title}}  {{title}}  111 aa bb {{message[0].name}} {{message}}
<div style="color:blue">{{title}}</div>
</div></div>`;
// const res = Vue.compile(templates);
Vue.mixin({
  props: {
    a: {
      type: String,
      default: "1",
    },
  },
  beforeCreate() {
    console.log(1);
  },
  created() {},
  mounted() {},
});

Vue.mixin({
  props: {
    c: {
      type: String,
      default: "1",
    },
  },
  beforeCreate() {
    console.log(2);
  },
  created() {},
  mounted() {},
});

var MyComponent = Vue.component("my-component", {
  data() {
    return {
      f: 2,
    };
  },
  template: "<button>{{f}}</button>",
});

const app = new Vue({
  el: "#app",
  components: {
    "my-component": {
      data() {
        return {
          g: 1,
        };
      },
      template: "<button>{{g}}</button>",
    },
  },
  props: {
    b: {
      type: String,
      default: "1",
    },
  },
  data() {
    return {
      style: "color:res",
      message: [[{ name: 1 }, 1, 2]],
      title: "Hello Vue",
      test: 1,
      dom: "<span>123</span>",
    };
  },
  beforeCreate() {
    console.log(3);
  },
  created() {},
  mounted() {},
  template: templates,
});

setTimeout(() => {
  console.log(app);
  app.title = "123";
  // app.title = '456'
  // app.message[0].name = 'message'
  // app.$nextTick(()=>{
  //   console.log(document.querySelector("#templates").innerHTML)
  // })
}, 3000);
