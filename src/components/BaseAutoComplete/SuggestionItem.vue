<template>
  <div class="base-autocomplete-item">
    <span
      v-for="(item, index) of renderTextList"
      :key="index"
      :class="`base-autocomplete-item__text--${item.class}`"
      >{{ item.text }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      require: true,
    },
    keywords: {
      type: String,
      require: true,
    },
  },
  computed: {
    /**
     * 手动生成需要高亮的文字，避免潜在的xss攻击
     */
    renderTextList() {
      const { keywords, value } = this;
      const renderList = [];

      if (!keywords) {
        renderList.push({
          text: value,
          class: "normal",
        });
        return renderList;
      }
      const regexp = new RegExp(`${keywords}`, "g");
      const matchedItems = value.matchAll(regexp);
      const matchedIndexs = [];
      for (const item of matchedItems) {
        matchedIndexs.push(item.index);
      }

      if (matchedItems.length === 0) {
        renderList.push({
          text: value,
          class: "normal",
        });
        return renderList;
      }
      for (let index = 0; matchedIndexs.length !== 0; ) {
        const matchedIndex = matchedIndexs.shift();
        if (index !== matchedIndex) {
          renderList.push({
            text: value.substring(index, matchedIndex),
            class: "normal",
          });
        }
        renderList.push({
          text: value.substring(matchedIndex, matchedIndex + keywords.length),
          class: "highlight",
        });
        if (
          matchedIndexs.length === 0 &&
          matchedIndex + keywords.length !== value.length
        ) {
          if (index !== value.length - 1) {
            renderList.push({
              text: value.substring(matchedIndex + keywords.length),
              class: "normal",
            });
          }
        }
        index = matchedIndex + keywords.length;
      }
      return renderList;
    },
  },
};
</script>

<style lang="scss" scoped>
.base-autocomplete-item {
  background-color: #ddd;
  padding: 2px;
  &__text--highlight {
    color: $--color-primary;
  }
}
</style>
