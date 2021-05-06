<template>
  <div class="base-autocomplete">
    <BaseInput
      :value="value"
      @input="handleInput"
      @focus="handleFocus"
      @blur="suggestionVisible = false"
    />
    <SuggestionPane v-if="suggestionVisible">
      <template #default>
        <ul>
          <SuggestionItem></SuggestionItem>
          <li v-for="suggestion of suggestions" :key="suggestion[valueKey]">
            {{ suggestion[valueKey] }}
          </li>
        </ul>
      </template>
    </SuggestionPane>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import SuggestionPane from "./SuggestionPane";
import SuggestionItem from "./SuggestionItem";

export default {
  name: "BaseAutoComplete",
  components: {
    BaseInput,
    SuggestionPane,
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
    valueKey: {
      type: String,
      default: "value",
    },
  },
  data() {
    return {
      suggestions: [],
      suggestionVisible: false,
    };
  },
  methods: {
    handleInput(e) {
      this.updateSuggestions(e);
      this.$emit("input", e);
    },
    handleFocus() {
      this.suggestionVisible = true;
      this.updateSuggestions(this.value);
    },
    updateSuggestions(keywords) {
      const suggestions = this.fetchSuggestions(keywords);
      if (!Array.isArray(suggestions)) {
        return console.warn(
          `${this.$options.name}: The 'fetchSuggestions' method must return an Array!`
        );
      }
      this.suggestions = suggestions;
    },
  },
};
</script>

<style lang="scss" scoped>
.base-autocomplete {
  position: relative;
}
</style>
