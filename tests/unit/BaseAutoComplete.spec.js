import { shallowMount } from "@vue/test-utils";
import BaseAutoComplete from "@/components/AutoComplete/BaseAutoComplete.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(BaseAutoComplete, {
      propsData: { msg }, 
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
