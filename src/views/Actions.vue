<template>
  <div class="text-align-center">
    <label>xxxx<input type="text" @input="actionInputIfTrue"/></label>
    <button @click="test1">Click1211Click1211Click1211</button>
    <p>{{ $store.getters.text }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import sum from "@/views/sum";
import debounce from "@/views/promise";

export default {
  methods: {
    ...mapActions(["actionClick"]),
    actionInputIfTrue: function actionInputIfTrue(event) {
      const inputValue = event.target.value;
      if (inputValue === "input")
        this.$store.dispatch("actionInput", { inputValue });
      else this.$store.dispatch("actionInput", { inputValue: "" });
    },
    test() {},
    test1: debounce(function() {
      console.log("test1");
    }, 500),
  },
};
</script>
