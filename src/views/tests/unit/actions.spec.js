/* eslint-disable no-undef */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import store from "@/store";
import Actions from "@/views/Actions.vue";

describe("Actions.vue", () => {
  const localVue = createLocalVue();
  const wrapper = shallowMount(Actions, { store, localVue });
  it("shwo Hi, You can input text, exchange me.", () => {
    const p = wrapper.find("p");
    expect(store.getters.text).toBe("Hi, You can input text, exchange me.");
    expect(p.text()).toBe("Hi, You can input text, exchange me.");
  });
  it('dispatches "actionInput" when input event value is "input"', () => {
    const input = wrapper.find("input");
    input.element.value = "input";
    input.trigger("input");
    const p = wrapper.find("p");
    expect(p.text()).toBe("input");
    expect(store.getters.text).toBe("input");
  });

  it('does not dispatch "actionInput" when event value is not "input"', () => {
    const input = wrapper.find("input");
    input.element.value = "not input";
    input.trigger("input");
    const p = wrapper.find("p");
    expect(p.text()).toBe("");
    expect(store.getters.text).toBe("");
  });

  it('calls store action "actionClick" when button is clicked', () => {
    wrapper.find("button").trigger("click");
    const p = wrapper.find("p");
    expect(p.text()).toBe("input!!");
    expect(store.getters.text).toBe("input!!");
  });
});
