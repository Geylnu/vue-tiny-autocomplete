<template>
  <input class="base-input" :value="value" v-on="inputListeners" />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    value: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      isComposing: false,
    };
  },
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        input: this.handleInput,
        compositionstart: () => (this.isComposing = true),
        compositionend: this.handleCompositionend,
      };
    },
  },
  methods: {
    handleInput(e) {
      // 使用输入法键入时不触发, 使用e.isComposing也可以实现，但仅支持现代浏览器
      if (!this.isComposing) {
        this.$emit("input", e.target.value);
      }
    },
    handleCompositionend(e) {
      if (this.isComposing) {
        this.isComposing = false;
        this.$emit("input", e.target.value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.base-input {
  &:focus {
    outline-color: $--color-primary;
  }
}
</style>
