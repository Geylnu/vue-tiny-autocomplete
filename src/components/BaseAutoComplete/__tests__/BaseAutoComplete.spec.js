import { mount } from "@vue/test-utils";
import BaseAutoComplete from "@/components/BaseAutoComplete/index.vue";
import BaseInput from "@/components/BaseInput/index.vue";
import SuggestionItem from "@/components/BaseAutoComplete/SuggestionItem";
import SuggestionPane from "@/components/BaseAutoComplete/SuggestionPane";
/**
 * TODO: 能够正响应点击
 * TODO: 点击后能够正确关闭悬浮窗并且筛选项仅一个
 * TODO: 高亮逻辑正确
 */
describe("BaseAutoComplete", () => {
  it("组件能够正确接受初始值", async () => {
    const value = "init value";
    const fetchSuggestions = () => [{ value: "test" }];
    const wrapper = mount(BaseAutoComplete, {
      propsData: { value, fetchSuggestions },
    });
    expect(wrapper.findComponent(BaseInput).props().value).toMatch(value);
  });
  /**
   * TODO: 逻辑最好拆分成为多个小的测试用例
   */
  it("输入匹配能够匹配到正确的值", async () => {
    const value = "";
    const suggestions = [{ value: "test" }, { value: "test12" }];
    const fetchSuggestions = () => suggestions;
    const wrapper = mount(BaseAutoComplete, {
      propsData: { value, fetchSuggestions },
    });
    // 输入聚焦展示输入建议浮窗
    const baseInput = wrapper.findComponent(BaseInput);
    expect(baseInput.exists()).toBe(true);
    await baseInput.trigger("focus");
    const suggestionPane = wrapper.findComponent(SuggestionPane);
    expect(suggestionPane.exists()).toBe(true);
    const suggestionItems = wrapper.findAllComponents(SuggestionItem);
    // 组件能够正确接受值
    for (let index = 0; index < suggestionItems.length; index++) {
      const item = suggestionItems.at(index);
      expect(item.props().value).toBe(suggestions[index].value);
    }
    // 组件输入能够正确匹配建议项
    await baseInput.vm.$emit("input", "test1");
    expect(wrapper.emitted().input[0]).toEqual(["test1"]);
    const newSuggestionItems = wrapper.findAllComponents(SuggestionItem);
    expect(newSuggestionItems.length).toBe(1);
    const matchedItem = newSuggestionItems.at(0);
    expect(matchedItem.props().value).toBe("test12");
    // TODO: 这里还应该触发一些鼠标移动的时间来正确模拟
    await matchedItem.trigger("click");
    expect(wrapper.emitted().input[1]).toEqual(["test12"]);
  });
});
