<template>
  <div class="text-align-center">
    <label>xxxx<input type="text" @input="actionInputIfTrue" /></label>
    <button @click="actionClick()">Click</button>
    <p>{{ $store.getters.text }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["actionClick"]),
    actionInputIfTrue: function actionInputIfTrue(event) {
      const inputValue = event.target.value;
      if (inputValue === "input")
        this.$store.dispatch("actionInput", { inputValue });
      else this.$store.dispatch("actionInput", { inputValue: "" });
    }
  }
};
</script>
