export default {
  state: {
    text: "Hi, You can input text, exchange me."
  },
  mutations: {
    input(state, inputValue) {
      state.text = inputValue;
    }
  },
  actions: {
    actionClick({ commit }) {
      commit("input", "input!!");
    },
    actionInput({ commit }, { inputValue }) {
      commit("input", inputValue);
    }
  },
  getters: {
    text(state) {
      return state.text;
    }
  }
}