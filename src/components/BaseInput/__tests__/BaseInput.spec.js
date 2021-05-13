import { shallowMount } from "@vue/test-utils";
import BaseInput from "@/components/BaseInput/index.vue";

describe("BaseInput", () => {
  it("组件能够正确接受初始值", async () => {
    const value = "init value";
    const wrapper = shallowMount(BaseInput, {
      propsData: { value },
    });
    const textInput = wrapper.find(".base-input");
    expect(textInput.element.value).toMatch(value);
  });

  it("组件能够正确响应输入事件", async () => {
    // 测试正常输入
    const value = "";
    const inputValue = "薇尔莉特•伊芙加登";
    const wrapper = shallowMount(BaseInput, {
      propsData: { value },
    });
    const textInput = wrapper.find(".base-input");
    await textInput.setValue(inputValue);
    expect(wrapper.emitted().input[0]).toEqual([inputValue]);

    // 测试输入法输入
    textInput.element.value = "薇尔莉特•伊芙加登w";
    // 理论上不会在input事件前触发compositionend，仅为了测试覆盖
    await textInput.trigger("compositionend");

    // 在输入法输入结束前不触发组件的input事件
    await textInput.trigger("compositionstart");
    await textInput.trigger("input");
    expect(wrapper.emitted().input[1]).toEqual(undefined);

    // 在输入法输入结束后触发组件的input事件
    await textInput.setValue("薇尔莉特•伊芙加登wo");
    textInput.element.value = "薇尔莉特•伊芙加登我";
    await textInput.trigger("compositionend");
    expect(wrapper.emitted().input[1]).toEqual(["薇尔莉特•伊芙加登我"]);
  });

  it("组件能够正常的转发原生属性及原生事件", async () => {
    const handleFocus = jest.fn();
    const wrapper = shallowMount(BaseInput, {
      propsData: { value: "" },
      listeners: {
        focus: handleFocus,
      },
    });
    const textInput = wrapper.find(".base-input");
    textInput.trigger("focus");
    expect(handleFocus).toHaveBeenCalled();
  });
});
