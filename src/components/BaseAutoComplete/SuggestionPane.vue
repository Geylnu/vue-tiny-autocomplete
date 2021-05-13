<template>
  <ul class="base-autocomplete-pane">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "SuggestionPane",
};
</script>

<style lang="scss" scoped>
.base-autocomplete-pane {
  margin: 0px;
  position: absolute;
  width: 100%;
  overflow: hidden;
  z-index: 10;
  padding: 0px;
  box-sizing: border-box;
}
</style>
