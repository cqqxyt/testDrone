/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */

import { shallowMount } from "@vue/test-utils";
import Index from "@/views/index.vue";

describe("Actions.vue", () => {
  const wrapper = shallowMount(Index);
  it("shwo Hi, You can input text, exchange me.", () => {
    expect(wrapper.find("p").text()).toBe("1");
  });
});
