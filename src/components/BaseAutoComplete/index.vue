<template>
  <div class="base-autocomplete">
    <BaseInput
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      :placeholder="placeholder"
      @input="handleInput"
      @focus="handleFocus"
      @blur="inputFocus = false"
      class="base-autocomplete-input"
    />
    <SuggestionPane
      @mouseenter.native="paneFocus = true"
      @mouseleave.native="paneFocus = false"
      class="suggestion-pane"
      v-if="suggestionVisible"
    >
      <li
        class="base-autocomplete-item"
        v-for="suggestion of suggestions"
        :key="suggestion[valueKey]"
        @click="handleItemClick(suggestion)"
      >
        <slot :item="suggestion">
          <SuggestionItem :value="suggestion[valueKey]" :keywords="value" />
        </slot>
      </li>
    </SuggestionPane>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import SuggestionPane from "./SuggestionPane";
import SuggestionItem from "./SuggestionItem";

export default {
  name: "BaseAutoComplete",
  inheritAttrs: false,
  components: {
    BaseInput,
    SuggestionPane,
    SuggestionItem,
  },
  props: {
    value: {
      type: String,
      require: true,
    },
    fetchSuggestions: {
      type: Function,
      require: true,
    },
    filterMethod: {
      type: Function,
    },
    valueKey: {
      type: String,
      default: "value",
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
  },
  data() {
    return {
      suggestions: [],
      inputFocus: false,
      paneFocus: false,
    };
  },
  computed: {
    suggestionVisible() {
      return this.inputFocus || this.paneFocus;
    },
  },
  methods: {
    handleInput(e) {
      this.updateSuggestions(e);
      this.$emit("input", e);
    },
    handleFocus() {
      this.inputFocus = true;
      this.updateSuggestions(this.value);
    },
    handleItemClick(suggestion) {
      console.log("item-click", suggestion[this.valueKey]);
      this.$emit("input", suggestion[this.valueKey]);
      this.paneFocus = false;
      this.suggestions = [suggestion];
    },
    updateSuggestions(keywords) {
      const suggestions = this.fetchSuggestions(keywords);
      if (!Array.isArray(suggestions)) {
        return console.warn(
          `${this.$options.name}: The 'fetchSuggestions' method must return an Array!`
        );
      }
      const filterMethod = this.filterMethod || this.defaultFilterMethod;
      const filteredSuggestions = suggestions.filter((item) =>
        filterMethod(item, keywords)
      );
      this.suggestions = filteredSuggestions;
    },
    defaultFilterMethod(item, keywords) {
      if (!keywords) {
        return true;
      } else {
        const regexp = new RegExp(`${keywords}`, "g");
        console.log(item[this.valueKey], item[this.valueKey].match(regexp));
        return item[this.valueKey].match(regexp);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.base-autocomplete {
  position: relative;
  &-input {
    outline: none;
    border: none;
    font-size: 16px;
    min-width: 300px;
    border-bottom: #333 2px solid;
    background-color: $--background-color;
    transition: border-bottom-color 0.25s;
    &:focus {
      border-bottom-color: $--color-primary;
    }
  }
  &-item {
    list-style: none;
    cursor: pointer;
    &:hover {
      background-color: rgb(175, 175, 175);
    }
  }
}
</style>
