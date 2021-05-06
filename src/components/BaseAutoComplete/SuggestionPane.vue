<template>
  <div class="base-autocomplete-pane">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SuggestionPane",
};
</script>

<style lang="scss" scoped>
.base-autocomplete-pane {
  position: absolute;
  width: 100%;
  overflow: hidden;
  z-index: 10;
}
</style>
